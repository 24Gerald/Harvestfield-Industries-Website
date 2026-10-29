import { getPublishedPosts } from '@/lib/media-store'

export const dynamic = 'force-dynamic'

// Public: anyone (including the GitHub Pages copy of the site) may read published posts
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Cache-Control': 'no-store',
}

export async function GET() {
  try {
    return Response.json({ posts: await getPublishedPosts() }, { headers: cors })
  } catch (error) {
    console.error('media: reading posts failed', error)
    return Response.json({ posts: [], error: 'Posts are unavailable right now.' }, { status: 503, headers: cors })
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: cors })
}
