import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { distributionPartners, strategicPartners } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Harvestfield is the authorized Nigerian distributor for BAYER, BASF, Dow, East-West Seeds and IITA, and partners with Vestergaard, NEPZA and national programmes.',
}

const reasons = [
  { value: '26', label: 'Offices and warehouses to reach farmers in every state' },
  { value: '6', label: 'Geopolitical zones covered by one distribution network' },
  { value: '26+', label: 'Years of trusted relationships in Nigerian agriculture' },
]

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumb="Partners"
        eyebrow="Our partners"
        title={<>Global names, <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">local reach.</em></>}
        description="We are the authorized Nigerian distributor for some of the most trusted names in global agriculture, and we work alongside public bodies to protect food and health."
        focus="50% 40%"
      >
        <Link href="/contact?topic=partnerships" className="hf-btn hf-btn-lime px-6 py-4 text-sm">Become a partner <ArrowUpRight size={16} /></Link>
      </PageHero>

      <section className="border-b border-hf-line bg-hf-mist py-10">
        <div className="hf-marquee">
          <div className="hf-marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-20 pr-20">
                {[...distributionPartners, 'Vestergaard', 'NEPZA', ...distributionPartners, 'Vestergaard', 'NEPZA'].map((name, index) => <span key={`${name}-${index}`} className="whitespace-nowrap text-3xl font-bold tracking-[-0.03em] text-hf-forest/70">{name}</span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-24 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Authorized distributor for" title={<>The brands farmers <em className="font-serif font-normal text-hf-moss">already trust.</em></>} text="Genuine products, sourced directly and distributed through our own network, so Nigerian farmers get world-class inputs at fair prices." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {distributionPartners.map((name, index) => (
            <div key={name} className="hf-reveal hf-card hf-spotlight hf-spotlight-light group flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white to-hf-sand/60 p-6 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.45)] lg:aspect-[5/4]" style={stagger(index, 80)}>
              <span aria-hidden className="pointer-events-none absolute -right-3 -top-10 font-serif text-[150px] italic leading-none text-hf-forest/[0.05] transition-transform duration-700 group-hover:-translate-x-2 group-hover:scale-110">{name[0]}</span>
              <BadgeCheck size={20} className="relative text-hf-moss transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              <div className="relative">
                <p className="text-3xl font-bold tracking-[-0.04em]">{name}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-hf-sage">Authorized distributor</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hf-grain relative overflow-hidden bg-hf-forest px-5 py-24 text-white lg:px-10 lg:py-28">
        <div aria-hidden className="hf-aurora opacity-70" />
        <div className="relative mx-auto max-w-[1320px]">
          <SectionHeading dark eyebrow="Strategic partnerships" title={<>Working together for <em className="font-serif font-normal text-hf-lime">food and health.</em></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {strategicPartners.map(({ icon: Icon, name, role, text }, index) => (
              <article key={name} className="hf-reveal hf-glass-dark hf-spotlight group rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9" style={stagger(index, 90)}>
                <div className="flex items-start justify-between gap-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-hf-lime/15 text-hf-lime ring-1 ring-hf-lime/25 transition-transform duration-500 group-hover:-rotate-6"><Icon size={20} /></span>
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-hf-lime">{role}</span>
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">{name}</h3>
                <p className="mt-3 max-w-md leading-7 text-white/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Why partner with Harvestfield" title={<>A route to every <em className="font-serif font-normal text-hf-moss">Nigerian farm.</em></>} text="Looking for a distribution partner in Nigeria? Our network puts your products within reach of farmers in every geopolitical zone, and we carry NAFDAC-certified products only." />
        <div className="grid gap-4">
          {reasons.map(({ value, label }, index) => (
            <div key={label} className="hf-reveal hf-spotlight hf-spotlight-light flex items-center gap-8 rounded-3xl border border-hf-line bg-white/50 p-6 sm:p-8" style={stagger(index, 90)} data-reveal="right">
              <strong className="w-28 shrink-0 text-5xl font-bold tracking-[-0.05em] sm:text-6xl" data-count>{value}</strong>
              <span className="text-lg leading-7 text-hf-slate">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <CtaBand eyebrow="Partnerships" title={<>Let&apos;s bring your products <em className="font-serif font-normal text-hf-lime">to Nigeria.</em></>} text="Manufacturers, development partners and programmes: talk to us about distribution, joint ventures, or a place in the Harvestfield Free Trade Zone." href="/contact?topic=partnerships" label="Talk partnerships" />
    </>
  )
}
