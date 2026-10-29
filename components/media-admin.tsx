'use client'

import Link from 'next/link'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Eye, Heading2, ImagePlus, Loader2, LogOut, Pencil, Plus, Table2, Trash2, Type, X } from 'lucide-react'
import { PostBody } from '@/components/post-body'
import { formatDate, mediaApi, type MediaBlock, type MediaPost, mediaTags, parseTable, postHref, tableToText } from '@/lib/media'
import { cn } from '@/lib/utils'

type Draft = Omit<MediaPost, 'slug' | 'updatedAt'> & { slug?: string; updatedAt?: string }
type Notice = { kind: 'ok' | 'error'; text: string } | null

const field = 'w-full rounded-2xl border border-hf-line bg-white px-4 py-3 text-[16px] text-hf-forest outline-none transition-all placeholder:text-hf-sage/60 hover:border-hf-sage/50 focus:border-hf-gold focus:ring-4 focus:ring-hf-gold/15 sm:text-[15px]'
const label = 'mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-hf-slate'
const card = 'rounded-[26px] border border-hf-line bg-white/80 p-4 shadow-[0_20px_40px_-34px_rgba(23,60,43,.5)] sm:p-6'
const smallBtn = 'inline-flex items-center gap-1.5 rounded-full border border-hf-line bg-white px-3 py-1.5 text-[12px] font-bold text-hf-forest transition-colors hover:border-hf-forest/40 disabled:opacity-40'

const newId = () => (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)).slice(0, 12)
const today = () => new Date().toISOString().slice(0, 10)
const emptyDraft = (): Draft => ({ id: '', title: '', tag: mediaTags[0], date: today(), blocks: [{ id: newId(), type: 'paragraph', text: '' }], published: true })

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${mediaApi}${path}`, { cache: 'no-store', ...init })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error ?? `Something went wrong (${res.status}).`)
  return data as T
}

/** Shrinks big photos in the browser before upload so they load fast on the site (and stay under the upload limit). */
async function prepareImage(file: File): Promise<Blob> {
  const kinds = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (kinds.includes(file.type) && (file.type === 'image/gif' || file.size <= 1.5 * 1024 * 1024)) return file
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error('This image type is not supported here. Please use a JPG or PNG.')
  }
  const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not process the image.'))), 'image/jpeg', 0.85))
}

async function uploadImage(file: File) {
  const blob = await prepareImage(file)
  const body = new FormData()
  body.append('file', blob, blob === file ? file.name : file.name.replace(/\.\w+$/, '') + '.jpg')
  const { url } = await api<{ url: string }>('/admin/upload', { method: 'POST', body })
  return url
}

function ImagePicker({ onPicked, onError, children, className }: { onPicked: (url: string) => void; onError: (message: string) => void; children: ReactNode; className?: string }) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  return (
    <>
      <button type="button" disabled={busy} onClick={() => input.current?.click()} className={className}>
        {busy ? <><Loader2 size={15} className="animate-spin" /> Uploading…</> : children}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={async (event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (!file) return
          setBusy(true)
          try {
            onPicked(await uploadImage(file))
          } catch (error) {
            onError(error instanceof Error ? error.message : 'Upload failed.')
          } finally {
            setBusy(false)
          }
        }}
      />
    </>
  )
}

function TableEditor({ block, onChange }: { block: Extract<MediaBlock, { type: 'table' }>; onChange: (block: MediaBlock) => void }) {
  const [text, setText] = useState(() => tableToText(block.rows))
  return (
    <div className="grid gap-3">
      <textarea
        value={text}
        onChange={(event) => { setText(event.target.value); onChange({ ...block, rows: parseTable(event.target.value) }) }}
        rows={5}
        placeholder={'Paste cells from Excel or Google Sheets, or type one row per line with | between cells:\nProduct | Pack size | Price\nClearweed | 1 L | ₦…'}
        className={cn(field, 'resize-y font-mono text-[14px] sm:text-[13px]')}
      />
      <div className="flex flex-wrap items-center gap-4 text-[13px]">
        <label className="inline-flex items-center gap-2 font-semibold">
          <input type="checkbox" checked={block.header} onChange={(event) => onChange({ ...block, header: event.target.checked })} className="h-4 w-4 accent-hf-forest" />
          First row is the heading
        </label>
        <span className="text-hf-sage">{block.rows.length} rows × {block.rows[0]?.length ?? 0} columns</span>
      </div>
      <input value={block.caption ?? ''} onChange={(event) => onChange({ ...block, caption: event.target.value })} placeholder="Caption (optional)" className={field} />
      {block.rows.length > 0 && <PostBody blocks={[block]} />}
    </div>
  )
}

const blockMeta = {
  paragraph: { name: 'Paragraph', icon: Type },
  heading: { name: 'Heading', icon: Heading2 },
  image: { name: 'Image', icon: ImagePlus },
  table: { name: 'Table', icon: Table2 },
} as const

function BlockEditor({ block, index, count, onChange, onMove, onRemove, onError }: {
  block: MediaBlock; index: number; count: number
  onChange: (block: MediaBlock) => void; onMove: (by: number) => void; onRemove: () => void; onError: (message: string) => void
}) {
  const { name, icon: Icon } = blockMeta[block.type]
  return (
    <div className="rounded-2xl border border-hf-line bg-hf-cream/50 p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-hf-leaf"><Icon size={15} /> {name}</span>
        <span className="flex gap-1">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up" className={smallBtn}><ArrowUp size={14} /></button>
          <button type="button" onClick={() => onMove(1)} disabled={index === count - 1} aria-label="Move down" className={smallBtn}><ArrowDown size={14} /></button>
          <button type="button" onClick={onRemove} aria-label="Remove block" className={cn(smallBtn, 'hover:border-red-300 hover:text-red-700')}><Trash2 size={14} /></button>
        </span>
      </div>
      {block.type === 'paragraph' && (
        <textarea value={block.text} onChange={(event) => onChange({ ...block, text: event.target.value })} rows={5} placeholder="Write here. Press Enter for a new line." className={cn(field, 'resize-y leading-7')} />
      )}
      {block.type === 'heading' && (
        <input value={block.text} onChange={(event) => onChange({ ...block, text: event.target.value })} placeholder="Section heading" className={cn(field, 'text-lg font-semibold')} />
      )}
      {block.type === 'image' && (
        <div className="grid gap-3">
          {block.url ? <img src={block.url} alt="" className="max-h-80 w-full rounded-xl bg-white object-contain" /> : <p className="text-[13px] text-hf-sage">No image yet.</p>}
          <div className="flex flex-wrap gap-2">
            <ImagePicker onPicked={(url) => onChange({ ...block, url })} onError={onError} className="hf-btn hf-btn-outline px-4 py-2.5 text-[13px]">
              <ImagePlus size={15} /> {block.url ? 'Replace image' : 'Upload image'}
            </ImagePicker>
          </div>
          <input value={block.caption ?? ''} onChange={(event) => onChange({ ...block, caption: event.target.value })} placeholder="Caption (optional)" className={field} />
        </div>
      )}
      {block.type === 'table' && <TableEditor block={block} onChange={onChange} />}
    </div>
  )
}

function Editor({ initial, onDone, onNotice }: { initial: Draft; onDone: (saved?: MediaPost) => void; onNotice: (notice: Notice) => void }) {
  const [draft, setDraft] = useState<Draft>(initial)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }))
  const setBlock = (i: number, block: MediaBlock) => setDraft((d) => ({ ...d, blocks: d.blocks.map((b, j) => (j === i ? block : b)) }))
  const move = (i: number, by: number) => setDraft((d) => {
    const blocks = [...d.blocks]
    const [b] = blocks.splice(i, 1)
    blocks.splice(i + by, 0, b)
    return { ...d, blocks }
  })
  const add = (type: MediaBlock['type']) => setDraft((d) => ({
    ...d,
    blocks: [...d.blocks, type === 'table' ? { id: newId(), type, rows: [], header: true } : type === 'image' ? { id: newId(), type, url: '' } : { id: newId(), type, text: '' }],
  }))
  const error = (text: string) => onNotice({ kind: 'error', text })

  const save = async () => {
    if (!draft.title.trim()) return error('Add a title before saving.')
    setSaving(true)
    try {
      const { post } = await api<{ post: MediaPost }>('/admin/posts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      onNotice({ kind: 'ok', text: post.published ? 'Published. It is live on the Media page now.' : 'Saved as a draft (not visible on the site).' })
      onDone(post)
    } catch (e) {
      error(e instanceof Error ? e.message : 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{initial.id ? 'Edit post' : 'New post'}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPreview((p) => !p)} className="hf-btn hf-btn-outline px-4 py-2.5 text-[13px]">
            {preview ? <><Pencil size={15} /> Edit</> : <><Eye size={15} /> Preview</>}
          </button>
          <button type="button" onClick={() => onDone()} className="hf-btn hf-btn-outline px-4 py-2.5 text-[13px]"><X size={15} /> Cancel</button>
        </div>
      </div>

      {preview ? (
        <div className={card}>
          <p className="eyebrow">{draft.tag} · {formatDate(draft.date)}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">{draft.title || 'Untitled'}</h1>
          {draft.cover && <img src={draft.cover} alt="" className="mt-6 w-full rounded-3xl object-cover" />}
          <div className="mt-8 max-w-3xl"><PostBody blocks={draft.blocks} /></div>
        </div>
      ) : (
        <>
          <div className={cn(card, 'grid gap-4 sm:gap-5')}>
            <div>
              <label htmlFor="post-title" className={label}>Title</label>
              <input id="post-title" value={draft.title} onChange={(event) => set({ title: event.target.value })} placeholder="e.g. Harvestfield opens a new warehouse in Kano" className={cn(field, 'text-lg font-semibold')} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="post-tag" className={label}>Type</label>
                <select id="post-tag" value={draft.tag} onChange={(event) => set({ tag: event.target.value })} className={field}>
                  {mediaTags.map((tag) => <option key={tag}>{tag}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="post-date" className={label}>Date</label>
                <input id="post-date" type="date" value={draft.date} onChange={(event) => set({ date: event.target.value })} className={field} />
              </div>
            </div>
            <div>
              <span className={label}>Cover image</span>
              <div className="flex flex-wrap items-center gap-3">
                {draft.cover && <img src={draft.cover} alt="" className="h-20 w-32 rounded-xl object-cover" />}
                <ImagePicker onPicked={(url) => set({ cover: url })} onError={error} className="hf-btn hf-btn-outline px-4 py-2.5 text-[13px]">
                  <ImagePlus size={15} /> {draft.cover ? 'Replace' : 'Upload cover'}
                </ImagePicker>
                {draft.cover && <button type="button" onClick={() => set({ cover: undefined })} className={smallBtn}><X size={13} /> Remove</button>}
              </div>
            </div>
            <div>
              <label htmlFor="post-excerpt" className={label}>Summary <span className="font-semibold normal-case tracking-normal text-hf-sage">(optional, shown on the Media page; leave blank to use the first paragraph)</span></label>
              <textarea id="post-excerpt" value={draft.excerpt ?? ''} onChange={(event) => set({ excerpt: event.target.value })} rows={2} className={cn(field, 'resize-y')} />
            </div>
          </div>

          <div className={cn(card, 'grid gap-3')}>
            <span className={label}>Content</span>
            {draft.blocks.map((block, i) => (
              <BlockEditor
                key={block.id}
                block={block}
                index={i}
                count={draft.blocks.length}
                onChange={(b) => setBlock(i, b)}
                onMove={(by) => move(i, by)}
                onRemove={() => setDraft((d) => ({ ...d, blocks: d.blocks.filter((_, j) => j !== i) }))}
                onError={error}
              />
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {(Object.keys(blockMeta) as MediaBlock['type'][]).map((type) => {
                const { name, icon: Icon } = blockMeta[type]
                return <button key={type} type="button" onClick={() => add(type)} className="hf-btn hf-btn-outline px-4 py-2.5 text-[13px]"><Plus size={14} /><Icon size={15} /> {name}</button>
              })}
            </div>
          </div>
        </>
      )}

      <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-hf-line bg-white/95 p-3 shadow-[0_20px_40px_-20px_rgba(23,60,43,.45)] backdrop-blur sm:p-4">
        <label className="inline-flex items-center gap-2.5 text-sm font-semibold">
          <input type="checkbox" checked={draft.published} onChange={(event) => set({ published: event.target.checked })} className="h-5 w-5 accent-hf-forest" />
          Show on the website
        </label>
        <button type="button" onClick={save} disabled={saving} className="hf-btn hf-btn-gold px-6 py-3 text-sm disabled:opacity-60">
          {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : draft.published ? <><Check size={16} /> Publish</> : <><Check size={16} /> Save draft</>}
        </button>
      </div>
    </div>
  )
}

function Login({ configured, onSignedIn }: { configured: boolean; onSignedIn: () => void }) {
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  return (
    <form
      className={cn(card, 'mx-auto grid w-full max-w-md gap-4')}
      onSubmit={async (event) => {
        event.preventDefault()
        setBusy(true)
        setMessage('')
        try {
          await api('/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
          onSignedIn()
        } catch (e) {
          setMessage(e instanceof Error ? e.message : 'Could not sign in.')
        } finally {
          setBusy(false)
        }
      }}
    >
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">Sign in</h2>
      {!configured && <p className="rounded-xl bg-amber-50 px-3 py-2 text-[13px] text-amber-800">The admin password has not been set up on the server yet.</p>}
      <div>
        <label htmlFor="admin-password" className={label}>Password</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={field} />
      </div>
      {message && <p role="alert" className="text-[13px] font-semibold text-red-700">{message}</p>}
      <button type="submit" disabled={busy || !configured} className="hf-btn hf-btn-forest px-6 py-3.5 text-sm disabled:opacity-60">
        {busy ? <><Loader2 size={16} className="animate-spin" /> Checking…</> : 'Sign in'}
      </button>
    </form>
  )
}

/** The Media admin panel: sign in, then write, edit, publish or delete posts. */
export function MediaAdmin() {
  const [session, setSession] = useState<{ admin: boolean; configured: boolean } | null>(null)
  const [posts, setPosts] = useState<MediaPost[] | null>(null)
  const [editing, setEditing] = useState<Draft | null>(null)
  const [notice, setNotice] = useState<Notice>(null)

  const load = useCallback(async () => {
    try {
      setPosts((await api<{ posts: MediaPost[] }>('/admin/posts')).posts)
    } catch (e) {
      setNotice({ kind: 'error', text: e instanceof Error ? e.message : 'Could not load posts.' })
      setSession((s) => (s ? { ...s, admin: false } : s))
    }
  }, [])

  useEffect(() => {
    api<{ admin: boolean; configured: boolean }>('/session').then(setSession).catch(() => setSession({ admin: false, configured: false }))
  }, [])
  useEffect(() => { if (session?.admin) load() }, [session?.admin, load])
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), notice.kind === 'ok' ? 4000 : 7000)
    return () => clearTimeout(timer)
  }, [notice])

  const remove = async (post: MediaPost) => {
    if (!window.confirm(`Delete “${post.title}”? This can't be undone.`)) return
    try {
      await api(`/admin/posts?id=${encodeURIComponent(post.id)}`, { method: 'DELETE' })
      setNotice({ kind: 'ok', text: 'Post deleted.' })
      load()
    } catch (e) {
      setNotice({ kind: 'error', text: e instanceof Error ? e.message : 'Could not delete.' })
    }
  }

  const signOut = async () => {
    await api('/session', { method: 'DELETE' }).catch(() => {})
    setSession((s) => (s ? { ...s, admin: false } : s))
    setPosts(null)
    setEditing(null)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
      {notice && (
        <div role="status" className={cn('fixed inset-x-4 top-24 z-50 mx-auto flex max-w-lg items-start gap-3 rounded-2xl px-4 py-3 text-sm font-semibold shadow-xl sm:top-28', notice.kind === 'ok' ? 'bg-hf-forest text-white' : 'bg-red-50 text-red-800 ring-1 ring-red-200')}>
          <span className="flex-1">{notice.text}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss"><X size={16} /></button>
        </div>
      )}

      {!session ? (
        <p className="flex items-center justify-center gap-2 py-10 text-hf-sage"><Loader2 size={18} className="animate-spin" /> Loading…</p>
      ) : !session.admin ? (
        <Login configured={session.configured} onSignedIn={() => setSession({ admin: true, configured: true })} />
      ) : editing ? (
        <Editor initial={editing} onNotice={setNotice} onDone={(saved) => { setEditing(null); if (saved) load() }} />
      ) : (
        <div className="grid gap-4 sm:gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Posts</h2>
              <p className="text-sm text-hf-sage">Published posts appear on the <Link href="/media" className="font-semibold text-hf-forest underline underline-offset-4">Media page</Link> as soon as you save.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(emptyDraft())} className="hf-btn hf-btn-gold px-5 py-3 text-sm"><Plus size={16} /> New post</button>
              <button type="button" onClick={signOut} className="hf-btn hf-btn-outline px-4 py-3 text-sm"><LogOut size={15} /> Sign out</button>
            </div>
          </div>

          {!posts ? (
            <p className="flex items-center gap-2 py-6 text-hf-sage"><Loader2 size={18} className="animate-spin" /> Loading posts…</p>
          ) : posts.length === 0 ? (
            <div className={cn(card, 'py-10 text-center')}>
              <p className="text-lg font-semibold">No posts yet.</p>
              <p className="mt-1 text-sm text-hf-sage">Write your first story with “New post”.</p>
            </div>
          ) : (
            <ul className="grid gap-2.5">
              {posts.map((post) => (
                <li key={post.id} className={cn(card, 'flex items-center gap-3 p-3 sm:gap-4 sm:p-3')}>
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-hf-leaf to-hf-night sm:h-20 sm:w-28">
                    {post.cover && <img src={post.cover} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-hf-sage">
                      <span className={cn('rounded-full px-2 py-0.5', post.published ? 'bg-hf-lime/50 text-hf-forest' : 'bg-hf-forest/[0.07]')}>{post.published ? 'Live' : 'Draft'}</span>
                      {post.tag} · {formatDate(post.date)}
                    </p>
                    <p className="mt-1 truncate text-base font-semibold tracking-[-0.02em] sm:text-lg">{post.title}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                    {post.published && <Link href={postHref(post.slug)} className={smallBtn} target="_blank"><ArrowUpRight size={14} /><span className="max-sm:hidden">View</span></Link>}
                    <button type="button" onClick={() => setEditing(post)} className={smallBtn}><Pencil size={14} /><span className="max-sm:hidden">Edit</span></button>
                    <button type="button" onClick={() => remove(post)} className={cn(smallBtn, 'hover:border-red-300 hover:text-red-700')}><Trash2 size={14} /><span className="max-sm:hidden">Delete</span></button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
