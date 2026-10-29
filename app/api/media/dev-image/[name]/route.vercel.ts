import { readDevImage } from '@/lib/media-store'

/** Local development only (no Blob store connected): serves uploaded images from .media-dev */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const image = await readDevImage((await params).name)
  if (!image) return new Response('Not found', { status: 404 })
  return new Response(new Uint8Array(image.data), { headers: { 'Content-Type': image.type, 'Cache-Control': 'public, max-age=31536000, immutable' } })
}
