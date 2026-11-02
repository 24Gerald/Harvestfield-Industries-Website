/**
 * Server-only storage for Media posts and images.
 *
 * On Vercel, everything lives in Vercel Blob (BLOB_READ_WRITE_TOKEN is set when a Blob store is connected).
 * Each post is its own JSON file (media/posts/<id>.json), so saving or deleting one post only ever touches
 * that post's file and can never overwrite another post, however quickly saves follow each other.
 * The public read is cached by Next.js and cleared on every save, so new posts show up straight away.
 * Without a token (local development) it falls back to the .media-dev folder.
 */
import { randomUUID } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { del, get, list, put } from '@vercel/blob'
import { revalidateTag, unstable_cache } from 'next/cache'
import { type MediaPost, slugify, sortPosts } from '@/lib/media'

const TAG = 'media-posts'
const POSTS = 'media/posts/'
const LEGACY_FILE = 'media/posts.json' // the earlier single-file format, moved into per-post files on first read
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const devDir = path.join(process.cwd(), '.media-dev')
const devPosts = path.join(devDir, 'posts')
const json = { access: 'public', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 } as const

async function readBlobJson(pathname: string) {
  const result = await get(pathname, { access: 'public', useCache: false })
  if (!result) return null
  if (result.statusCode !== 200) throw new Error(`Could not read ${pathname} (${result.statusCode})`)
  return JSON.parse(await new Response(result.stream).text())
}

async function migrateLegacy() {
  const legacy = await readBlobJson(LEGACY_FILE).catch(() => null)
  if (!Array.isArray(legacy)) return
  await Promise.all(legacy.map((post: MediaPost) => put(`${POSTS}${post.id}.json`, JSON.stringify(post), json)))
  await del(LEGACY_FILE)
  const { blobs } = await list({ prefix: 'media/backups/', limit: 1000 })
  if (blobs.length) await del(blobs.map((blob) => blob.url))
}

async function readAll(): Promise<MediaPost[]> {
  if (!useBlob()) {
    const names = await fs.readdir(devPosts).catch(() => [] as string[])
    return Promise.all(names.filter((n) => n.endsWith('.json')).map(async (n) => JSON.parse(await fs.readFile(path.join(devPosts, n), 'utf8'))))
  }
  await migrateLegacy()
  const blobs = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: POSTS, limit: 1000, cursor })
    blobs.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  const posts = await Promise.all(blobs.map((blob) => readBlobJson(blob.pathname)))
  return posts.filter((post): post is MediaPost => Boolean(post && typeof post === 'object' && post.id))
}

async function writePost(post: MediaPost) {
  if (!useBlob()) {
    await fs.mkdir(devPosts, { recursive: true })
    await fs.writeFile(path.join(devPosts, `${post.id}.json`), JSON.stringify(post, null, 2))
  } else {
    await put(`${POSTS}${post.id}.json`, JSON.stringify(post), json)
  }
  revalidateTag(TAG, { expire: 0 })
}

/** Published posts, newest first. Cached until the next save (and refreshed at least every minute). */
export const getPublishedPosts = unstable_cache(
  async () => sortPosts((await readAll()).filter((post) => post.published)),
  ['media-published-posts'],
  { tags: [TAG], revalidate: 60 },
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
  await writePost(post)
  return post
}

export async function deletePost(id: string) {
  if (!/^[\w-]{1,60}$/.test(id)) return false
  if (!useBlob()) {
    const ok = await fs.rm(path.join(devPosts, `${id}.json`)).then(() => true, () => false)
    if (ok) revalidateTag(TAG, { expire: 0 })
    return ok
  }
  const pathname = `${POSTS}${id}.json`
  const { blobs } = await list({ prefix: pathname, limit: 1 })
  if (!blobs.some((blob) => blob.pathname === pathname)) return false
  await del(pathname)
  revalidateTag(TAG, { expire: 0 })
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
