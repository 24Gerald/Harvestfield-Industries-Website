import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { MediaFeed } from '@/components/media-feed'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { news } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Media',
  description: 'News, press releases and stories from Harvestfield Industries, from the Harvestfield Free Trade Zone to Aflasafe and Roll Back Malaria.',
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

      <section className="mx-auto max-w-[1320px] px-5 py-12 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Latest" title={<>From the <em className="font-serif font-normal text-hf-moss">newsroom.</em></>} className="mb-6 sm:mb-10" />
        <MediaFeed />
      </section>

      <section className="bg-hf-sand px-5 py-12 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading eyebrow="Highlights" title={<>Milestones along <em className="font-serif font-normal text-hf-moss">the way.</em></>} className="mb-6 sm:mb-10" />
          <div className="grid gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {news.map((story, index) => (
              <Link key={story.title} href={story.href} className="hf-reveal hf-card hf-spotlight hf-spotlight-light group flex flex-col rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-white/60 p-5 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)] sm:p-7" style={stagger(index % 3, 90)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-hf-lime/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:px-3 sm:py-1.5 sm:text-[11px]">{story.tag}</span>
                  <span className="text-xs font-semibold text-hf-sage">{story.date}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-[1.15] tracking-[-0.03em] sm:mt-6 sm:text-2xl">{story.title}</h3>
                <p className="mt-2 flex-1 text-[1rem] leading-6 text-hf-sage sm:mt-4 sm:text-base sm:leading-7">{story.text}</p>
                <span className="mt-4 flex h-9 w-9 items-center justify-center self-end rounded-full border border-hf-line transition-all duration-300 group-hover:rotate-45 group-hover:border-hf-forest group-hover:bg-hf-forest group-hover:text-white sm:mt-6 sm:h-11 sm:w-11"><ArrowUpRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Press & media" title={<>Telling the <em className="font-serif font-normal text-hf-lime">Harvestfield story?</em></>} text="For interviews, images or more on the Harvestfield Free Trade Zone and Harvestfield Healthcare FZE, our team is happy to help." href="/contact?topic=press" label="Media enquiries" />
    </>
  )
}
