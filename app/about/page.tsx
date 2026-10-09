import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin, ShieldCheck, Sprout, Factory } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { distributionPartners, milestones } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About us',
  description: 'Since 2000, Harvestfield Industries has brought world-class agricultural inputs to Nigerian farmers at fair prices.',
}

const stats = [
  { value: '26', label: 'Offices and warehouses' },
  { value: '6', label: 'Geopolitical zones covered' },
  { value: '26+', label: 'Years in the field' },
  { value: '99%', label: 'Aflatoxin reduction with Aflasafe' },
]

const values = [
  { icon: Sprout, title: 'World-class inputs, fair prices', text: 'The belief we started with in 2000, and the one we still hold every Nigerian farmer to.' },
  { icon: ShieldCheck, title: 'Certified products only', text: 'Everything we distribute is NAFDAC certified, from crop protection to vector control.' },
  { icon: MapPin, title: 'Close to every farm', text: '26 offices and warehouses across all six geopolitical zones keep stock near the people who need it.' },
  { icon: Factory, title: 'Made in Nigeria, next', text: 'We are building the infrastructure to manufacture the health products Nigeria needs at home.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Harvestfield"
        title={<>From the soil, <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">with purpose.</em></>}
        description="We distribute agrochemicals, vector-control products and farming equipment across all six geopolitical zones of Nigeria. Now we are building the infrastructure to manufacture the health products Nigeria needs at home."
        focus="72% 30%"
      >
        <Link href="/products" className="hf-btn hf-btn-lime px-6 py-4 text-sm">Explore our products <ArrowUpRight size={16} /></Link>
        <Link href="/contact" className="hf-btn hf-btn-glass px-6 py-4 text-sm">Talk to our team</Link>
      </PageHero>

      <section className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        <div className="hf-reveal relative" data-reveal="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(16,47,37,.6)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img src="/harvest-hero.png" alt="A Nigerian farmer in his crop field at golden hour" className="hf-hero-image h-full w-full object-cover object-[68%_50%]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-hf-night/50 via-transparent to-white/10" />
          </div>
          <div className="hf-glass hf-float absolute -bottom-6 left-5 rounded-2xl px-6 py-5 sm:-left-6">
            <p className="eyebrow">Established</p>
            <p className="mt-1 text-4xl font-bold tracking-[-0.05em]">2000</p>
          </div>
          <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-hf-night/70 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-hf-lime" />NAFDAC certified products
          </div>
        </div>
        <div className="hf-reveal" style={stagger(1, 140)}>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">A simple belief, <em className="font-serif font-normal text-hf-moss">twenty-six years on.</em></h2>
          <p className="mt-8 text-xl leading-8 text-hf-slate">Harvestfield Industries Limited began as an agrochemical importer with a simple belief: Nigerian farmers deserve world-class inputs at fair prices.</p>
          <p className="mt-6 leading-7 text-hf-sage">Twenty-six years later, we represent major names in global agriculture, distribute across Nigeria, hold the national Aflasafe licence, and are a founding member of the Food Convergence Initiative.</p>
          <p className="mt-6 leading-7 text-hf-sage">Today we are going further. With the Harvestfield Free Trade Zone in Ogun State, and SNG Health, our joint venture with Vestergaard, we are building the capacity to manufacture the health products Nigeria needs at home.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {distributionPartners.map((partner) => <span key={partner} className="rounded-full border border-hf-line bg-white/60 px-4 py-2 text-xs font-bold tracking-wide">{partner}</span>)}
          </div>
        </div>
      </section>

      <section className="hf-grain relative overflow-hidden bg-hf-deep text-white" aria-label="Harvestfield in numbers">
        <div aria-hidden className="hf-aurora opacity-60" />
        <div className="relative mx-auto grid max-w-[1320px] grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="hf-reveal border-white/10 px-6 py-12 lg:px-10 [&:not(:last-child)]:border-r" style={stagger(index, 90)}>
              <strong className="block text-5xl font-bold tracking-[-0.05em] sm:text-6xl" data-count>{stat.value}</strong>
              <span className="mt-3 block text-sm text-white/55">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading className="lg:sticky lg:top-32 lg:self-start" eyebrow="Milestones" title={<>Started in 2000. <em className="font-serif font-normal text-hf-moss">Still at it.</em></>} text="From importer to national distributor to manufacturing partner: the moments that shaped Harvestfield." />
          <ol className="relative">
            <span aria-hidden className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-hf-gold via-hf-moss/50 to-transparent" />
            {milestones.map((milestone, index) => (
              <li key={milestone.title} className="hf-reveal group relative pb-12 pl-14 last:pb-0" style={stagger(index, 90)}>
                <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-hf-cream ring-1 ring-hf-gold/40"><span className="h-2.5 w-2.5 rounded-full bg-hf-gold transition-transform duration-300 group-hover:scale-150" /></span>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-hf-gold">{milestone.marker}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{milestone.title}</h3>
                <p className="mt-3 max-w-xl leading-7 text-hf-sage">{milestone.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-hf-sand px-5 py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading eyebrow="What we stand for" title={<>Built on trust, <em className="font-serif font-normal text-hf-moss">grown in the field.</em></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="hf-reveal hf-card hf-spotlight hf-spotlight-light rounded-3xl border border-white/80 bg-gradient-to-b from-white/90 to-white/50 p-7 shadow-[inset_0_1px_0_#fff]" style={stagger(index, 90)}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hf-forest to-hf-leaf text-hf-lime shadow-[inset_0_1px_0_rgba(255,255,255,.2)]"><Icon size={20} /></span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-hf-sage">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
