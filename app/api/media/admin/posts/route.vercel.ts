import { isAdmin } from '@/lib/admin-auth'
import { cleanPost } from '@/lib/media'
import { deletePost, getAllPosts, savePost } from '@/lib/media-store'

export const dynamic = 'force-dynamic'

const denied = () => Response.json({ error: 'Please sign in again.' }, { status: 401 })

export async function GET() {
  if (!(await isAdmin())) return denied()
  return Response.json({ posts: await getAllPosts() })
}

/** Create or update a post */
export async function PUT(request: Request) {
  if (!(await isAdmin())) return denied()
  const result = cleanPost(await request.json().catch(() => null))
  if ('error' in result) return Response.json({ error: result.error }, { status: 400 })
  try {
    return Response.json({ post: await savePost(result.post) })
  } catch (error) {
    console.error('media: saving post failed', error)
    return Response.json({ error: 'The post could not be saved. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return denied()
  const id = new URL(request.url).searchParams.get('id') ?? ''
  if (!(await deletePost(id))) return Response.json({ error: 'That post no longer exists.' }, { status: 404 })
  return Response.json({ ok: true })
}
