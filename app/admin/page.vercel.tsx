import type { Metadata } from 'next'
import { MediaAdmin } from '@/components/media-admin'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Media admin',
  robots: { index: false, follow: false },
}

/** Only built on Vercel (see pageExtensions in next.config.mjs); the static GitHub Pages copy has no admin. */
export default function AdminPage() {
  return (
    <>
      <PageHero crumb="Admin" eyebrow="Media admin" title={<>Post to the <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">Media page.</em></>} description="Write news and stories with images and tables. Published posts go live on the site straight away." />
      <MediaAdmin />
    </>
  )
}
