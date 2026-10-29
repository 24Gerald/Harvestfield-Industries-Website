/**
 * Server-only storage for Media posts and images.
 *
 * On Vercel, everything lives in Vercel Blob (BLOB_READ_WRITE_TOKEN is set when a Blob store is connected).
 * Each save writes a new, uniquely named copy of the post list, so no visitor is ever served a stale cached
 * file; the public read is cached by Next.js and cleared on every save, so new posts show up straight away.
 * Without a token (local development) it falls back to the .media-dev folder.
 */
import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { del, list, put } from '@vercel/blob'
import { revalidateTag, unstable_cache } from 'next/cache'
import { type MediaPost, slugify, sortPosts } from '@/lib/media'

const TAG = 'media-posts'
const PREFIX = 'media/posts/'
const KEEP_VERSIONS = 5
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const devDir = path.join(process.cwd(), '.media-dev')

const versionOf = (pathname: string) => Number(pathname.slice(PREFIX.length).replace(/\.json$/, '')) || 0

async function readAll(): Promise<MediaPost[]> {
  if (!useBlob()) {
    try {
      return JSON.parse(await fs.readFile(path.join(devDir, 'posts.json'), 'utf8'))
    } catch {
      return []
    }
  }
  const { blobs } = await list({ prefix: PREFIX, limit: 100 })
  if (!blobs.length) return []
  const latest = blobs.reduce((a, b) => (versionOf(b.pathname) > versionOf(a.pathname) ? b : a))
  const res = await fetch(latest.url)
  if (!res.ok) throw new Error(`Could not read posts (${res.status})`)
  return res.json()
}

async function writeAll(posts: MediaPost[]) {
  if (!useBlob()) {
    await fs.mkdir(devDir, { recursive: true })
    await fs.writeFile(path.join(devDir, 'posts.json'), JSON.stringify(posts, null, 2))
  } else {
    await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(posts), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
    })
    // Keep a few previous versions as a safety net and remove the rest
    const { blobs } = await list({ prefix: PREFIX, limit: 100 })
    const old = blobs.sort((a, b) => versionOf(b.pathname) - versionOf(a.pathname)).slice(KEEP_VERSIONS)
    if (old.length) await del(old.map((blob) => blob.url))
  }
  revalidateTag(TAG, { expire: 0 })
}

/** Published posts, newest first. Cached until the next save. */
export const getPublishedPosts = unstable_cache(
  async () => sortPosts((await readAll()).filter((post) => post.published)),
  ['media-published-posts'],
  { tags: [TAG] },
)

/** Every post including drafts, for the admin panel (never cached). */
export async function getAllPosts() {
  return sortPosts(await readAll())
}

export async function savePost(input: Omit<MediaPost, 'slug' | 'updatedAt'> & { slug?: string }) {
  const posts = await readAll()
  const existing = input.id ? posts.find((post) => post.id === input.id) : undefined
  const id = existing?.id ?? randomUUID()
  // Keep a post's address stable once it exists; new posts get one from the title
  let slug = existing?.slug ?? slugify(input.title)
  if (!existing) {
    const taken = new Set(posts.map((post) => post.slug))
    for (let n = 2; taken.has(slug); n++) slug = `${slugify(input.title)}-${n}`
  }
  const post: MediaPost = { ...input, id, slug, updatedAt: new Date().toISOString() }
  await writeAll(existing ? posts.map((p) => (p.id === id ? post : p)) : [post, ...posts])
  return post
}

export async function deletePost(id: string) {
  const posts = await readAll()
  if (!posts.some((post) => post.id === id)) return false
  await writeAll(posts.filter((post) => post.id !== id))
  return true
}

const imageTypes: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024

export async function saveImage(file: File) {
  const ext = imageTypes[file.type]
  if (!ext) throw new Error('Use a JPG, PNG, WebP or GIF image.')
  if (file.size > MAX_IMAGE_BYTES) throw new Error('That image is too large (4 MB maximum).')
  const name = `${randomUUID()}.${ext}`
  if (!useBlob()) {
    await fs.mkdir(path.join(devDir, 'images'), { recursive: true })
    await fs.writeFile(path.join(devDir, 'images', name), Buffer.from(await file.arrayBuffer()))
    return `/api/media/dev-image/${name}`
  }
  const { url } = await put(`media/images/${name}`, file, { access: 'public', contentType: file.type, addRandomSuffix: false })
  return url
}

/** Local development only: serves images saved to .media-dev. */
export async function readDevImage(name: string) {
  if (useBlob() || !/^[\w-]+\.(jpg|png|webp|gif)$/.test(name)) return null
  try {
    const data = await fs.readFile(path.join(devDir, 'images', name))
    const type = Object.entries(imageTypes).find(([, ext]) => name.endsWith(`.${ext}`))?.[0] ?? 'application/octet-stream'
    return { data, type }
  } catch {
    return null
  }
}
