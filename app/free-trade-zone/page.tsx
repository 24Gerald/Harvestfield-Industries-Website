import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Anchor, Phone, Route, ShieldCheck } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { contact, ftzAudiences, ftzBenefits, ftzStats, heroImage, nepzaQuote } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Free Trade Zone',
  description: 'The Harvestfield Free Trade Zone in Ogun State: Nigeria’s newest NEPZA-licensed medical manufacturing zone, open for business.',
}

export default function FreeTradeZonePage() {
  return (
    <>
      <PageHero
        crumb="Free Trade Zone"
        eyebrow="Harvestfield FTZ · Ogun State"
        title={<>Nigeria&apos;s newest NEPZA-licensed <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">medical manufacturing zone.</em></>}
        description="One of the few free zones in Nigeria dedicated entirely to healthcare manufacturing. And it is open for business."
        focus="85% 20%"
        aside={
          <div className="hf-glass-dark rounded-3xl p-6">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-hf-lime"><span className="hf-ping h-2 w-2 rounded-full bg-hf-lime text-hf-lime" /> Licensed · February 2026</div>
            <p className="mt-4 leading-7 text-white/75">NEPZA Declaration of Licence and Operation Licence, presented to Harvestfield Industries.</p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-white/60"><ShieldCheck size={16} className="text-hf-lime" /> Nigeria Export Processing Zones Authority</div>
          </div>
        }
      >
        <Link href="/contact?topic=ftz" className="hf-btn hf-btn-lime px-6 py-4 text-sm">Enquire about the FTZ <ArrowUpRight size={16} /></Link>
        <a href={contact.phoneHref} className="hf-btn hf-btn-glass px-6 py-4 text-sm"><Phone size={15} /> Talk to our team</a>
      </PageHero>

      <section className="relative z-10 mx-auto -mt-12 max-w-[1320px] px-5 lg:-mt-16 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {ftzStats.map(({ value, label }, index) => (
            <div key={value} className="hf-reveal hf-glass hf-spotlight hf-spotlight-light rounded-3xl p-7" style={stagger(index, 100)}>
              <strong className="block text-5xl font-bold tracking-[-0.05em]" data-count>{value}</strong>
              <span className="mt-2 block text-sm text-hf-sage">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="hf-reveal" data-reveal="left">
          <p className="eyebrow">The licence</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">Built to close Nigeria&apos;s <em className="font-serif font-normal text-hf-moss">health product gap.</em></h2>
          <p className="mt-8 text-lg leading-9 text-hf-slate">In February 2026, the Nigeria Export Processing Zones Authority formally presented Harvestfield Industries with both the Declaration of Licence and the Operation Licence for the Harvestfield Free Trade Zone focused on medical products in Ogun State, and one of the few in Nigeria dedicated entirely to healthcare manufacturing.</p>
        </div>
        <div id="sng-health" className="hf-reveal hf-grain hf-spotlight relative overflow-hidden rounded-[32px] bg-gradient-to-br from-hf-fern via-hf-forest to-hf-night p-8 text-white shadow-[0_40px_80px_-40px_rgba(16,47,37,.7)] sm:p-12" style={stagger(1, 140)}>
          <div aria-hidden className="hf-aurora opacity-80" />
          <p className="eyebrow relative text-hf-lime">Anchor operation</p>
          <h3 className="relative mt-5 text-4xl font-semibold tracking-[-0.05em]">SNG Health</h3>
          <p className="relative mt-5 leading-7 text-white/70">Our joint venture with Vestergaard, the world&apos;s largest insecticide-treated net manufacturer, producing 10 million dual-insecticide nets annually and supplying 30% of Nigeria&apos;s net demand from day one.</p>
          <div className="relative mt-10 grid grid-cols-2 gap-4">
            <div className="hf-glass-dark rounded-2xl p-5"><strong className="block text-4xl font-bold tracking-[-0.04em] text-hf-lime" data-count>10M</strong><span className="mt-1 block text-xs text-white/60">Dual-insecticide nets a year</span></div>
            <div className="hf-glass-dark rounded-2xl p-5"><strong className="block text-4xl font-bold tracking-[-0.04em] text-hf-lime" data-count>30%</strong><span className="mt-1 block text-xs text-white/60">Of Nigeria&apos;s net demand</span></div>
          </div>
        </div>
      </section>

      <section className="bg-hf-sand px-5 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading eyebrow="Why locate in the Harvestfield FTZ" title={<>Six reasons to <em className="font-serif font-normal text-hf-moss">build here.</em></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ftzBenefits.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="hf-reveal hf-card hf-spotlight hf-spotlight-light group rounded-3xl border border-white/80 bg-gradient-to-b from-white/95 to-white/55 p-7 shadow-[inset_0_1px_0_#fff]" style={stagger(index, 80)}>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hf-forest to-hf-leaf text-hf-lime shadow-[inset_0_1px_0_rgba(255,255,255,.2)] transition-transform duration-500 group-hover:-rotate-6"><Icon size={20} /></span>
                  <span className="font-serif text-3xl italic text-hf-gold/70">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 leading-7 text-hf-sage">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
        <div>
          <SectionHeading eyebrow="Who it is for" title={<>Designed for the whole <em className="font-serif font-normal text-hf-moss">health supply chain.</em></>} text="SNG Health's anchor production creates immediate demand for packaging, logistics, raw materials and ancillary services within the zone." />
          <div className="mt-10 grid grid-cols-2 gap-3">
            {ftzAudiences.map(({ icon: Icon, title }, index) => (
              <div key={title} className="hf-reveal hf-spotlight hf-spotlight-light flex items-center gap-3 rounded-2xl border border-hf-line bg-white/60 p-4 transition-colors duration-300 hover:bg-white" style={stagger(index, 70)}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-hf-lime/40 text-hf-forest"><Icon size={18} /></span>
                <span className="text-sm font-bold">{title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hf-reveal relative overflow-hidden rounded-[32px]" data-reveal="zoom">
          <img src={heroImage} alt="Green farmland at golden hour" className="hf-hero-image aspect-[5/4] w-full object-cover object-[20%_40%]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-hf-night/80 via-hf-night/10 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 grid gap-3 sm:grid-cols-2">
            <div className="hf-glass-dark rounded-2xl p-4 text-white"><Route size={18} className="text-hf-lime" /><p className="mt-3 text-sm font-bold">Lagos-Ibadan corridor</p><p className="mt-1 text-xs text-white/60">Road, port and customs connectivity built in</p></div>
            <div className="hf-glass-dark rounded-2xl p-4 text-white"><Anchor size={18} className="text-hf-lime" /><p className="mt-3 text-sm font-bold">West Africa export gateway</p><p className="mt-1 text-xs text-white/60">A ready regional and international market</p></div>
          </div>
        </div>
      </section>

      <section className="hf-grain relative overflow-hidden bg-hf-deep px-5 py-24 text-white lg:px-10 lg:py-32">
        <div aria-hidden className="hf-aurora" />
        <figure className="hf-reveal relative mx-auto max-w-4xl text-center">
          <span aria-hidden className="block font-serif text-[120px] leading-[0.5] text-hf-lime/40">&ldquo;</span>
          <blockquote className="mt-6 font-serif text-3xl leading-[1.25] tracking-[-0.01em] sm:text-5xl">{nepzaQuote.text}</blockquote>
          <figcaption className="mt-10 text-sm">
            <strong className="block text-hf-lime">{nepzaQuote.author}</strong>
            <span className="text-white/60">{nepzaQuote.role}</span>
          </figcaption>
        </figure>
      </section>

      <CtaBand eyebrow="Open for business" title={<>Secure your place <em className="font-serif font-normal text-hf-lime">in the zone.</em></>} text="Manufacturers, packagers, logistics providers and healthcare MSMEs: talk to us about locating in the Harvestfield Free Trade Zone." href="/contact?topic=ftz" label="Enquire about the FTZ" />
    </>
  )
}
