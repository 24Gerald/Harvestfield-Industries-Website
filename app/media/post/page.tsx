import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MediaArticle } from '@/components/media-article'

export const metadata: Metadata = {
  title: 'Media',
}

export default function MediaPostPage() {
  return (
    <Suspense>
      <MediaArticle />
    </Suspense>
  )
}
