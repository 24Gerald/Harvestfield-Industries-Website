import { isAdmin } from '@/lib/admin-auth'
import { saveImage } from '@/lib/media-store'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: 'Please sign in again.' }, { status: 401 })
  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) return Response.json({ error: 'No image was received.' }, { status: 400 })
  try {
    return Response.json({ url: await saveImage(file) })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Upload failed.' }, { status: 400 })
  }
}
