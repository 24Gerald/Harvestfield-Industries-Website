import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { news } from '@/lib/site-data'
import { cn, stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'News',
  description: 'News and milestones from Harvestfield Industries, from the Harvestfield Free Trade Zone to Aflasafe and Roll Back Malaria.',
}

export default function NewsPage() {
  const [featured, ...stories] = news

  return (
    <>
      <PageHero
        crumb="News"
        eyebrow="Newsroom"
        title={<>News &amp; <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">milestones.</em></>}
        description="The latest from Harvestfield Industries: licences, partnerships and the programmes we are proud to be part of."
        focus="40% 25%"
      />

      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-24">
        <Link href={featured.href} className="hf-reveal hf-spotlight group grid overflow-hidden rounded-[32px] bg-hf-deep text-white shadow-[0_40px_80px_-40px_rgba(16,47,37,.7)] lg:grid-cols-[1.1fr_0.9fr]" data-reveal="zoom">
          <div className="relative min-h-[280px] overflow-hidden">
            <img src="/harvest-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-[65%_40%] transition-transform duration-1000 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-hf-deep/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-hf-deep" />
            <span className="hf-glass-dark absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold"><span className="hf-ping h-2 w-2 rounded-full bg-hf-lime text-hf-lime" /> Latest</span>
          </div>
          <div className="hf-grain relative flex flex-col p-8 sm:p-12">
            <div aria-hidden className="hf-aurora opacity-60" />
            <div className="relative flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]"><span className="text-hf-lime">{featured.tag}</span><span className="h-1 w-1 rounded-full bg-white/40" /><span className="text-white/60">{featured.date}</span></div>
            <h2 className="relative mt-6 text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl">{featured.title}</h2>
            <p className="relative mt-5 leading-7 text-white/65">{featured.text}</p>
            <span className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-hf-lime">Read about the Free Trade Zone <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
          </div>
        </Link>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <Link key={story.title} href={story.href} className={cn('hf-reveal hf-card hf-spotlight hf-spotlight-light group flex flex-col rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-white/60 p-7 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)]', index === stories.length - 1 && 'md:col-span-2')} style={stagger(index % 3, 90)}>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-hf-lime/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">{story.tag}</span>
                <span className="text-xs font-semibold text-hf-sage">{story.date}</span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold leading-[1.15] tracking-[-0.03em]">{story.title}</h3>
              <p className="mt-4 flex-1 leading-7 text-hf-sage">{story.text}</p>
              <span className="mt-8 flex h-11 w-11 items-center justify-center self-end rounded-full border border-hf-line transition-all duration-300 group-hover:rotate-45 group-hover:border-hf-forest group-hover:bg-hf-forest group-hover:text-white"><ArrowUpRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand eyebrow="Press & media" title={<>Telling the <em className="font-serif font-normal text-hf-lime">Harvestfield story?</em></>} text="For interviews, images or more on the Harvestfield Free Trade Zone and SNG Health, our team is happy to help." href="/contact?topic=press" label="Media enquiries" />
    </>
  )
}
