'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Link2 } from 'lucide-react'
import { PostCard, useMediaPosts } from '@/components/media-feed'
import { PageHero } from '@/components/page-hero'
import { PostBody } from '@/components/post-body'
import { excerptOf, formatDate } from '@/lib/media'

/** One Media post, chosen by ?slug= so the page also works on the static GitHub Pages copy. */
export function MediaArticle() {
  const slug = useSearchParams().get('slug')
  const { status, posts } = useMediaPosts()
  const post = posts.find((p) => p.slug === slug)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (post) document.title = `${post.title} | Harvestfield`
  }, [post])

  if (status === 'loading') {
    return (
      <>
        <PageHero crumb="Media" eyebrow="Media" title={<span className="inline-block h-[1em] w-2/3 animate-pulse rounded-xl bg-white/10" />} />
        <div aria-busy className="mx-auto max-w-3xl space-y-4 px-5 py-12 sm:py-20">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-5 animate-pulse rounded-full bg-hf-forest/[0.07]" style={{ width: `${95 - i * 12}%` }} />)}
        </div>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <PageHero crumb="Media" eyebrow="Media" title={<>Story not <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">found.</em></>} description={status === 'error' ? 'Stories could not be loaded right now. Please try again shortly.' : 'This story may have been moved or taken down.'} />
        <div className="mx-auto max-w-3xl px-5 py-12 sm:py-20">
          <Link href="/media" className="hf-btn hf-btn-forest px-6 py-3.5 text-sm"><ArrowLeft size={16} /> All stories</Link>
        </div>
      </>
    )
  }

  const more = posts.filter((p) => p.id !== post.id).slice(0, 3)
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <>
      <PageHero
        crumb="Media"
        eyebrow={`${post.tag} · ${formatDate(post.date)}`}
        title={post.title}
        description={excerptOf(post, 220)}
        image={post.cover}
        focus="50% 45%"
      />

      <article className="mx-auto max-w-3xl px-5 py-10 sm:py-16 lg:py-20">
        {post.cover && <img src={post.cover} alt="" className="hf-pop mb-8 w-full rounded-3xl object-cover shadow-[0_30px_60px_-35px_rgba(16,47,37,.6)] sm:mb-12" />}
        <PostBody blocks={post.blocks} />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-hf-line pt-6 sm:mt-14">
          <Link href="/media" className="hf-link text-sm"><ArrowLeft size={15} /> All stories</Link>
          <button type="button" onClick={share} className="hf-btn hf-btn-outline px-4 py-2.5 text-[13px]">
            {copied ? <><Check size={15} /> Link copied</> : <><Link2 size={15} /> Copy link</>}
          </button>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-hf-sand px-5 py-12 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-[1320px]">
            <p className="eyebrow">Keep reading</p>
            <h2 className="mt-3 text-[1.875rem] font-semibold tracking-[-0.05em] sm:mt-4 sm:text-4xl">More from <em className="font-serif font-normal text-hf-moss">Harvestfield.</em></h2>
            <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {more.map((p, index) => <PostCard key={p.id} post={p} index={index} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
