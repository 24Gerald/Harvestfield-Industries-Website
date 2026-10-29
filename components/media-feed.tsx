'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Newspaper } from 'lucide-react'
import { excerptOf, formatDate, mediaApi, type MediaPost, postHref } from '@/lib/media'
import { heroImage } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

type FeedState = { status: 'loading' | 'ready' | 'error'; posts: MediaPost[] }

/** Published posts from the media API, newest first. */
export function useMediaPosts() {
  const [state, setState] = useState<FeedState>({ status: 'loading', posts: [] })
  useEffect(() => {
    let alive = true
    fetch(`${mediaApi}/posts`, { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => alive && setState({ status: 'ready', posts: Array.isArray(data?.posts) ? data.posts : [] }))
      .catch(() => alive && setState({ status: 'error', posts: [] }))
    return () => { alive = false }
  }, [])
  return state
}

export function PostCard({ post, index = 0 }: { post: MediaPost; index?: number }) {
  return (
    <Link href={postHref(post.slug)} className="hf-pop hf-card group flex flex-col overflow-hidden rounded-[26px] border border-white/80 bg-white p-2 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)]" style={stagger(index % 3, 90)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-gradient-to-br from-hf-leaf to-hf-night">
        <Newspaper aria-hidden size={44} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15" />
        {post.cover && <img src={post.cover} alt="" loading="lazy" className="relative h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4 sm:pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-hf-lime/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px]">{post.tag}</span>
          <span className="text-xs font-semibold text-hf-sage">{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-[1.2] tracking-[-0.03em] sm:mt-4 sm:text-xl">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-6 text-hf-sage sm:text-[15px]">{excerptOf(post)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-hf-forest">Read story <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" /></span>
      </div>
    </Link>
  )
}

function FeaturedPost({ post }: { post: MediaPost }) {
  return (
    <Link href={postHref(post.slug)} className="hf-pop hf-spotlight group grid overflow-hidden rounded-[28px] bg-hf-deep text-white shadow-[0_40px_80px_-40px_rgba(16,47,37,.7)] sm:rounded-[32px] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative min-h-[12.5rem] overflow-hidden sm:min-h-[320px]">
        <img src={post.cover ?? heroImage} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-hf-deep/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-hf-deep" />
        <span className="hf-glass-dark absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold sm:left-5 sm:top-5 sm:px-4 sm:py-2"><span className="hf-ping h-2 w-2 rounded-full bg-hf-lime text-hf-lime" /> Latest</span>
      </div>
      <div className="hf-grain relative flex flex-col p-6 sm:p-12">
        <div aria-hidden className="hf-aurora opacity-60" />
        <div className="relative flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs"><span className="text-hf-lime">{post.tag}</span><span className="h-1 w-1 rounded-full bg-white/40" /><span className="text-white/60">{formatDate(post.date)}</span></div>
        <h2 className="relative mt-4 text-2xl font-semibold leading-[1.1] tracking-[-0.04em] sm:mt-6 sm:text-4xl">{post.title}</h2>
        <p className="relative mt-3 line-clamp-4 text-[1rem] leading-6 text-white/65 sm:mt-5 sm:text-base sm:leading-7">{excerptOf(post, 260)}</p>
        <span className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-hf-lime sm:pt-8">Read the full story <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  )
}

/** The Media page's post list: the newest post featured, the rest in a grid. */
export function MediaFeed() {
  const { status, posts } = useMediaPosts()

  if (status === 'loading') {
    return (
      <div aria-busy className="grid gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-80 animate-pulse rounded-[26px] bg-white/70" />)}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-hf-line bg-white/50 px-6 py-10 text-center sm:py-14">
        <Newspaper aria-hidden size={28} className="mx-auto text-hf-moss" />
        <p className="mt-3 text-lg font-semibold tracking-[-0.02em]">{status === 'error' ? 'Stories could not be loaded right now.' : 'New stories are on the way.'}</p>
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-hf-sage">News, press releases and updates from Harvestfield will appear here. In the meantime, see our highlights below.</p>
      </div>
    )
  }

  const [featured, ...rest] = posts
  return (
    <div>
      <FeaturedPost post={featured} />
      {rest.length > 0 && (
        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
        </div>
      )}
    </div>
  )
}
