import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { MediaSections } from '@/components/media-feed'
import { PageHero } from '@/components/page-hero'
import { news } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Media',
  description: 'News, events and press releases from Harvestfield Industries, from the Harvestfield Free Trade Zone to Aflasafe and Roll Back Malaria.',
}

export default function MediaPage() {
  return (
    <>
      <PageHero
        crumb="Media"
        eyebrow="Media"
        title={<>News, stories &amp; <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">updates.</em></>}
        description="The latest from Harvestfield Industries: announcements, press releases, events and the programmes we are proud to be part of."
        focus="40% 25%"
      />

      <MediaSections />

      <section aria-labelledby="highlights-title" className="border-t border-hf-line px-5 py-10 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="eyebrow">Highlights</p>
              <h2 id="highlights-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:mt-3 sm:text-3xl">Milestones along <em className="font-serif font-normal text-hf-moss">the way.</em></h2>
            </div>
          </div>
          <ul className="mt-5 grid gap-x-10 sm:mt-7 md:grid-cols-2">
            {news.map((story) => (
              <li key={story.title} className="border-t border-hf-line">
                <Link href={story.href} className="group flex items-center gap-4 py-3.5 sm:py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-hf-moss sm:text-[11px]">{story.tag} <span className="text-hf-sage">· {story.date}</span></p>
                    <p className="mt-1 font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-hf-leaf">{story.title}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hf-line transition-all duration-300 group-hover:rotate-45 group-hover:border-hf-forest group-hover:bg-hf-forest group-hover:text-white"><ArrowUpRight size={14} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand eyebrow="Press & media" title={<>Telling the <em className="font-serif font-normal text-hf-lime">Harvestfield story?</em></>} text="For interviews, images or more on the Harvestfield Free Trade Zone and Harvestfield Healthcare FZE, our team is happy to help." href="/contact?topic=press" label="Media enquiries" />
    </>
  )
}
