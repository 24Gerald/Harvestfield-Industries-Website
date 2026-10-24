import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin, ShieldCheck, Handshake } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { PageHero } from '@/components/page-hero'
import { ProductExplorer } from '@/components/product-explorer'
import { SafeImg } from '@/components/safe-img'
import { SectionHeading } from '@/components/section-heading'
import { catalogue } from '@/lib/catalogue'
import { stagger } from '@/lib/utils'
import { heroImage, products } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Herbicides, insecticides, fungicides, vector control and fertilisers, plus store fumigants and spraying equipment, distributed across Nigeria.',
}

/** Lines we supply that don't have individual products listed yet */
const alsoAvailable = products.filter((product) => product.slug === 'store-fumigants' || product.slug === 'spraying-equipment')

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
          <ul className="grid gap-2 sm:gap-3">
            {assurances.map(({ icon: Icon, title, text }) => (
              <li key={title} className="hf-glass-dark flex items-start gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-hf-lime/15 text-hf-lime ring-1 ring-hf-lime/25"><Icon size={18} /></span>
                <span><strong className="block text-sm">{title}</strong><span className="mt-1 block text-[13px] leading-5 text-white/60">{text}</span></span>
              </li>
            ))}
          </ul>
        }
      />

      <section className="mx-auto max-w-[1320px] px-5 py-12 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Our range"
          title={<>{catalogue.length} products, <em className="font-serif font-normal text-hf-moss">by category.</em></>}
          text="Filter by category or search by product name, active ingredient or crop. Every product is NAFDAC certified."
          className="mb-6 sm:mb-10"
        />
        <ProductExplorer />

        <div className="mt-12 sm:mt-20">
          <div className="flex items-end justify-between gap-4 border-b border-hf-line pb-3 sm:pb-4">
            <div>
              <p className="eyebrow">Also available</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">Store fumigants and spraying equipment</h3>
            </div>
          </div>
          <div className="mt-4 grid gap-2.5 sm:mt-6 sm:gap-5 md:grid-cols-2">
            {alsoAvailable.map(({ slug, name, type, text, image, icon: Icon }, index) => (
              <article key={slug} id={slug} className="hf-reveal hf-card group flex items-center gap-4 rounded-[22px] border border-white/80 bg-white/70 p-2 pr-4 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)] sm:gap-5 sm:rounded-[26px] sm:p-2.5 sm:pr-6" style={stagger(index, 100)}>
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[18px] bg-gradient-to-br from-hf-leaf to-hf-night sm:h-32 sm:w-32 sm:rounded-[20px]">
                  <Icon aria-hidden size={36} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15" />
                  <SafeImg src={image} alt={name} loading="lazy" className="relative h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="min-w-0 py-1">
                  <p className="eyebrow text-[10px]">{type}</p>
                  <h4 className="mt-1 text-lg font-semibold tracking-[-0.02em] sm:text-xl">{name}</h4>
                  <p className="mt-1 text-[13px] leading-5 text-hf-sage sm:text-sm sm:leading-6">{text}</p>
                  <Link href={`/contact?topic=products&item=${encodeURIComponent(name)}`} className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-hf-forest underline decoration-hf-line decoration-2 underline-offset-4 transition-colors hover:decoration-hf-gold sm:mt-3 sm:text-[13px]">
                    Ask about {name.toLowerCase()} <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aflasafe" className="px-5 lg:px-10">
        <div className="hf-grain relative mx-auto grid max-w-[1320px] overflow-hidden rounded-[28px] bg-hf-deep text-white sm:rounded-[32px] lg:grid-cols-2 lg:rounded-[44px]">
          <div aria-hidden className="hf-aurora" />
          <div className="hf-reveal relative p-6 sm:p-12 lg:p-16" data-reveal="left">
            <p className="eyebrow text-hf-lime">Featured · National licence holder</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.05em] sm:mt-6 sm:text-6xl">Aflasafe <em className="font-serif font-normal text-hf-lime">biocontrol.</em></h2>
            <p className="mt-4 max-w-md text-[1rem] leading-6 text-white/70 sm:mt-6 sm:text-base sm:leading-7">Aflatoxin makes maize and groundnut unsafe to eat and hard to sell. As the national Aflasafe licence holder, we supply the biocontrol product that cuts aflatoxin in both crops by up to 99%.</p>
            <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4 sm:mt-10 sm:gap-10">
              <div><strong className="block bg-gradient-to-br from-hf-lime to-[#a9c23a] bg-clip-text text-6xl font-bold tracking-[-0.06em] text-transparent sm:text-8xl" data-count>99%</strong><span className="text-sm text-white/60">Aflatoxin reduction</span></div>
              <Link href="/contact?topic=products&item=Aflasafe" className="hf-btn hf-btn-lime mb-2 px-6 py-4 text-sm">Enquire about Aflasafe <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="relative min-h-[12.5rem] sm:min-h-[320px] lg:min-h-full">
            <img src={heroImage} alt="Healthy crops in a Nigerian field" className="absolute inset-0 h-full w-full object-cover object-[15%_70%]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-hf-deep via-hf-deep/30 to-transparent max-lg:bg-gradient-to-t" />
            <div className="hf-glass hf-float absolute bottom-4 right-4 max-w-[240px] rounded-2xl p-4 text-hf-forest sm:bottom-6 sm:right-6 sm:p-5">
              <p className="eyebrow">Crops protected</p>
              <p className="mt-1 text-base font-semibold sm:mt-2 sm:text-lg">Maize · Groundnut</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pt-12 sm:pt-24 lg:px-10">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {[
            ['01', 'Tell us what you grow', 'Crop, acreage and the problem you are seeing in the field.'],
            ['02', 'Get the right recommendation', 'Our team matches you with certified products for your stage of the season.'],
            ['03', 'Collect near you', 'Pick up from one of 26 offices and warehouses across Nigeria.'],
          ].map(([step, title, text], index) => (
            <div key={step} className="hf-reveal border-t border-hf-line pt-4 max-sm:flex max-sm:gap-4 sm:pt-6" style={stagger(index, 100)}>
              <span className="font-serif text-4xl italic leading-none text-hf-gold sm:text-5xl">{step}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] sm:mt-4 sm:text-xl">{title}</h3>
                <p className="mt-1 text-[1rem] leading-6 text-hf-sage sm:mt-2 sm:text-base sm:leading-7">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand eyebrow="Need advice?" title={<>Not sure what <em className="font-serif font-normal text-hf-lime">your crop needs?</em></>} text="Tell us what you are growing and what you are seeing in the field. Our team will recommend the right certified product and the nearest place to collect it." href="/contact?topic=products" label="Ask our team" />
    </>
  )
}
