import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin, ShieldCheck, Handshake } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { ProductExplorer } from '@/components/product-explorer'
import { SectionHeading } from '@/components/section-heading'
import { stagger } from '@/lib/utils'
import { heroImage } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Herbicides, insecticides, fungicides, store fumigants, vector control and spraying equipment, distributed across Nigeria.',
}

const assurances = [
  { icon: ShieldCheck, title: 'NAFDAC certified', text: 'Certified products only, across every category we carry.' },
  { icon: Handshake, title: 'Authorized distributor', text: 'Genuine products from BAYER, BASF, Dow, East-West Seeds and IITA.' },
  { icon: MapPin, title: 'Stock near you', text: '26 offices and warehouses in all six geopolitical zones.' },
]

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="What we do"
        title={<>The right input for every <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">stage.</em></>}
        description="From germination to harvest to storage, and from the farm to public health: field-proven products that Nigerian farmers have relied on for over two decades."
        focus="30% 60%"
        aside={
          <ul className="grid gap-3">
            {assurances.map(({ icon: Icon, title, text }) => (
              <li key={title} className="hf-glass-dark flex items-start gap-4 rounded-2xl p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-hf-lime/15 text-hf-lime ring-1 ring-hf-lime/25"><Icon size={18} /></span>
                <span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-[13px] leading-5 text-white/60">{text}</span></span>
              </li>
            ))}
          </ul>
        }
      />

      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Our range" title={<>Six categories. <em className="font-serif font-normal text-hf-moss">One trusted supplier.</em></>} className="mb-10" />
        <ProductExplorer />
      </section>

      <section id="aflasafe" className="px-5 lg:px-10">
        <div className="hf-grain relative mx-auto grid max-w-[1320px] overflow-hidden rounded-[32px] bg-hf-deep text-white lg:grid-cols-2 lg:rounded-[44px]">
          <div aria-hidden className="hf-aurora" />
          <div className="hf-reveal relative p-8 sm:p-12 lg:p-16" data-reveal="left">
            <p className="eyebrow text-hf-lime">Featured · National licence holder</p>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-6xl">Aflasafe <em className="font-serif font-normal text-hf-lime">biocontrol.</em></h2>
            <p className="mt-6 max-w-md leading-7 text-white/70">Aflatoxin makes maize and groundnut unsafe to eat and hard to sell. As the national Aflasafe licence holder, we supply the biocontrol product that cuts aflatoxin in both crops by up to 99%.</p>
            <div className="mt-10 flex flex-wrap items-end gap-10">
              <div><strong className="block bg-gradient-to-br from-hf-lime to-[#a9c23a] bg-clip-text text-7xl font-bold tracking-[-0.06em] text-transparent sm:text-8xl" data-count>99%</strong><span className="text-sm text-white/60">Aflatoxin reduction</span></div>
              <Link href="/contact?topic=products&item=Aflasafe" className="hf-btn hf-btn-lime mb-2 px-6 py-4 text-sm">Enquire about Aflasafe <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-full">
            <img src={heroImage} alt="Healthy crops in a Nigerian field" className="absolute inset-0 h-full w-full object-cover object-[15%_70%]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-hf-deep via-hf-deep/30 to-transparent max-lg:bg-gradient-to-t" />
            <div className="hf-glass hf-float absolute bottom-6 right-6 max-w-[240px] rounded-2xl p-5 text-hf-forest">
              <p className="eyebrow">Crops protected</p>
              <p className="mt-2 text-lg font-semibold">Maize · Groundnut</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pt-24 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['01', 'Tell us what you grow', 'Crop, acreage and the problem you are seeing in the field.'],
            ['02', 'Get the right recommendation', 'Our team matches you with certified products for your stage of the season.'],
            ['03', 'Collect near you', 'Pick up from one of 26 offices and warehouses across Nigeria.'],
          ].map(([step, title, text], index) => (
            <div key={step} className="hf-reveal border-t border-hf-line pt-6" style={stagger(index, 100)}>
              <span className="font-serif text-5xl italic text-hf-gold">{step}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 leading-7 text-hf-sage">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand eyebrow="Need advice?" title={<>Not sure what <em className="font-serif font-normal text-hf-lime">your crop needs?</em></>} text="Tell us what you are growing and what you are seeing in the field. Our team will recommend the right certified product and the nearest place to collect it." href="/contact?topic=products" label="Ask our team" />
    </>
  )
}
