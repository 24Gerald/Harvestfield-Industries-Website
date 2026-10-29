import type { Metadata } from 'next'
import { RedirectTo } from '@/components/redirect-to'

export const metadata: Metadata = {
  title: 'Media',
  robots: { index: false },
}

/** News now lives on the Media page. On Vercel, next.config.mjs redirects /news before this renders. */
export default function NewsPage() {
  return <RedirectTo href="/media" label="Go to Media" />
}
