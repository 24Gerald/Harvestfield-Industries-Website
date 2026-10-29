/** Shared by the Media pages, the admin panel and the media API. */

export type MediaBlock =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; text: string }
  | { id: string; type: 'image'; url: string; caption?: string }
  | { id: string; type: 'table'; rows: string[][]; header: boolean; caption?: string }

export type MediaPost = {
  id: string
  slug: string
  title: string
  tag: string
  /** yyyy-mm-dd */
  date: string
  cover?: string
  excerpt?: string
  blocks: MediaBlock[]
  published: boolean
  updatedAt: string
}

export const mediaTags = ['News', 'Press release', 'Event', 'Article', 'Announcement']

/**
 * Where the media API lives. Empty on Vercel (same site); the GitHub Pages copy sets NEXT_PUBLIC_MEDIA_API
 * to the Vercel address so it shows the same posts.
 */
export const mediaApi = `${(process.env.NEXT_PUBLIC_MEDIA_API ?? '').replace(/\/$/, '')}/api/media`

export const postHref = (slug: string) => `/media/post?slug=${encodeURIComponent(slug)}`

export function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function excerptOf(post: Pick<MediaPost, 'excerpt' | 'blocks'>, length = 180) {
  if (post.excerpt?.trim()) return post.excerpt.trim()
  const first = post.blocks.find((block) => block.type === 'paragraph' && block.text.trim())
  const text = first && first.type === 'paragraph' ? first.text.trim().replace(/\s+/g, ' ') : ''
  return text.length > length ? `${text.slice(0, length).replace(/\s+\S*$/, '')}…` : text
}

export function slugify(title: string) {
  return title.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'post'
}

/** Turns text pasted from Excel or Google Sheets (tabs), or typed with | or commas between cells, into rows. */
export function parseTable(text: string): string[][] {
  const lines = text.replace(/\r/g, '').split('\n').filter((line) => line.trim())
  const splitter = lines.some((line) => line.includes('\t')) ? '\t' : lines.some((line) => line.includes('|')) ? '|' : ','
  const rows = lines.map((line) => {
    let cells = line.split(splitter).map((cell) => cell.trim())
    if (splitter === '|') {
      if (cells[0] === '') cells = cells.slice(1)
      if (cells[cells.length - 1] === '') cells = cells.slice(0, -1)
    }
    return cells
  }).filter((cells) => !(splitter === '|' && cells.every((cell) => /^:?-{2,}:?$/.test(cell)))) // skip markdown divider rows
  const width = Math.max(0, ...rows.map((row) => row.length))
  return rows.map((row) => [...row, ...Array(width - row.length).fill('')])
}

export const tableToText = (rows: string[][]) => rows.map((row) => row.join('\t')).join('\n')

const isSafeImage = (url: unknown): url is string =>
  typeof url === 'string' && url.length < 1200 && (/^https:\/\/[^\s"'<>]+$/.test(url) || /^\/api\/media\/dev-image\/[\w.-]+$/.test(url))

const str = (value: unknown, max: number) => (typeof value === 'string' ? value.slice(0, max) : '')

/** Validates and tidies a post coming from the admin panel. Returns an error message when it can't be saved. */
export function cleanPost(input: unknown): { post: Omit<MediaPost, 'slug' | 'updatedAt'> & { slug?: string } } | { error: string } {
  if (!input || typeof input !== 'object') return { error: 'Invalid post.' }
  const raw = input as Record<string, unknown>
  const title = str(raw.title, 200).trim()
  if (!title) return { error: 'Add a title.' }
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(raw.date)) ? String(raw.date) : new Date().toISOString().slice(0, 10)
  const rawBlocks = Array.isArray(raw.blocks) ? raw.blocks.slice(0, 200) : []
  const blocks: MediaBlock[] = []
  for (const value of rawBlocks) {
    if (!value || typeof value !== 'object') continue
    const block = value as Record<string, unknown>
    const id = str(block.id, 60) || Math.random().toString(36).slice(2, 10)
    if (block.type === 'paragraph' || block.type === 'heading') {
      const text = str(block.text, block.type === 'heading' ? 300 : 20000)
      if (text.trim()) blocks.push({ id, type: block.type, text })
    } else if (block.type === 'image') {
      if (isSafeImage(block.url)) blocks.push({ id, type: 'image', url: block.url, caption: str(block.caption, 500).trim() || undefined })
    } else if (block.type === 'table') {
      const rows = (Array.isArray(block.rows) ? block.rows : []).slice(0, 200).map((row) =>
        (Array.isArray(row) ? row : []).slice(0, 20).map((cell) => str(cell, 500)),
      ).filter((row) => row.some((cell) => cell.trim()))
      if (rows.length) blocks.push({ id, type: 'table', rows, header: block.header !== false, caption: str(block.caption, 500).trim() || undefined })
    }
  }
  return {
    post: {
      id: str(raw.id, 60),
      slug: str(raw.slug, 80) || undefined,
      title,
      tag: mediaTags.includes(String(raw.tag)) ? String(raw.tag) : mediaTags[0],
      date,
      cover: isSafeImage(raw.cover) ? raw.cover : undefined,
      excerpt: str(raw.excerpt, 600).trim() || undefined,
      blocks,
      published: raw.published === true,
    },
  }
}

export const sortPosts = (posts: MediaPost[]) =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt))
