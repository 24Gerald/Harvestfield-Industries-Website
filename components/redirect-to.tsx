'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/** Client-side redirect for the static GitHub Pages copy, which can't send server redirects. */
export function RedirectTo({ href, label }: { href: string; label: string }) {
  const router = useRouter()
  useEffect(() => router.replace(href), [router, href])
  return (
    <div className="mx-auto max-w-xl px-5 pb-20 pt-40 text-center">
      <p className="text-hf-sage">This page has moved.</p>
      <Link href={href} className="hf-link mt-3 text-sm">{label}</Link>
    </div>
  )
}
