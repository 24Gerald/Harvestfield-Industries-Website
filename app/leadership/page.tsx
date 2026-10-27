import type { Metadata } from 'next'
import { CtaBand } from '@/components/cta-band'
import { LeaderCard } from '@/components/leader-card'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { board, type Leader, management } from '@/lib/leadership'
import { cn, stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'Meet the board of directors and executive management of Harvestfield Industries Limited.',
}

/** Three across on laptops; a group of four sits four across on wide screens rather than leaving one card on its own row. */
function LeaderGrid({ leaders }: { leaders: Leader[] }) {
  const four = leaders.length === 4
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-5">
      {leaders.map((leader, index) => (
        <LeaderCard key={leader.slug} leader={leader} className={cn('sm:w-[calc(50%-0.625rem)] lg:w-[calc((100%-2.5rem)/3)]', four && 'xl:w-[calc((100%-3.75rem)/4)]')} style={stagger(index % (four ? 4 : 3), 90)} />
      ))}
    </div>
  )
}

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        crumb="Leadership"
        eyebrow="Our leadership"
        title={<>The people behind <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">Harvestfield.</em></>}
        description="Our board of directors and executive management bring decades of experience across agriculture, public health, banking, finance and manufacturing."
        focus="65% 30%"
      />

      <section className="px-5 py-12 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading eyebrow="Governance" title={<>Board of <em className="font-serif font-normal text-hf-moss">Directors.</em></>} />
          <LeaderGrid leaders={board} />
        </div>
      </section>

      <section className="bg-hf-sand px-5 py-12 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading eyebrow="Leadership team" title={<>Executive <em className="font-serif font-normal text-hf-moss">Management.</em></>} />
          <LeaderGrid leaders={management} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
