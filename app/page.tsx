import Link from 'next/link'
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react'
import { SafeImg } from '@/components/safe-img'
import { StoryVideoButton } from '@/components/story-video'
import { contact, distributionPartners, ftzBenefits, ftzStats, heroImage, nepzaQuote, offices, products } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export default function Page() {
  return (
    <div className="overflow-hidden bg-[#f5f5ed] text-[#173c2b]">
      <section id="top" className="relative flex min-h-[35rem] items-end overflow-hidden bg-[#28583a] px-5 pb-7 pt-32 sm:min-h-[760px] sm:pb-16 sm:pt-44 lg:min-h-[820px] lg:px-10 lg:pb-24">
        <img src={heroImage} alt="Farmer standing in a green crop field" className="hf-hero-image absolute inset-0 h-full w-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102f25]/90 via-[#173c2b]/45 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#102f25]/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="max-w-[760px]">
            <p className="hf-rise mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7e36b] sm:mb-6"><span className="h-px w-10 bg-[#d7e36b]" /> Growing a better tomorrow</p>
            <h1 className="hf-rise max-w-[760px] text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-7xl lg:text-[86px]" style={stagger(1, 110)}>Protecting Nigerian <em className="font-serif font-normal tracking-[-0.02em] text-[#d7e36b]">agriculture.</em></h1>
            <p className="hf-rise mt-5 max-w-[520px] text-[1rem] leading-6 text-white/75 sm:mt-7 sm:text-base sm:leading-7" style={stagger(2, 110)}>We distribute agrochemicals, vector-control products and farming equipment across all six geopolitical zones of Nigeria. Now we are building the infrastructure to manufacture the health products Nigeria needs at home.</p>
            <div className="hf-rise mt-6 flex flex-wrap items-center gap-2 sm:mt-9 sm:gap-4" style={stagger(3, 110)}>
              <Link href="/products" className="hf-btn hf-btn-lime px-6 py-4 text-sm">Explore our products <ArrowUpRight size={16} /></Link>
              <StoryVideoButton />
            </div>
          </div>
          <div className="hf-rise mt-8 flex items-start gap-6 border-t border-white/20 pt-4 text-white/80 sm:mt-16 sm:gap-8 sm:pt-5 lg:absolute lg:items-center lg:bottom-0 lg:right-0 lg:mt-0 lg:gap-0 lg:divide-x lg:divide-white/15 lg:rounded-2xl lg:border lg:border-white/20 lg:bg-white/10 lg:px-2 lg:py-4 lg:shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_20px_50px_-20px_rgba(0,0,0,.5)] lg:backdrop-blur-md" style={stagger(5, 110)}>
            <div className="lg:px-6"><strong className="block text-xl text-white sm:text-2xl">26</strong><span className="block text-[10px] uppercase leading-4 tracking-wider sm:text-[11px] sm:leading-6">Offices & warehouses</span></div>
            <div className="lg:px-6"><strong className="block text-xl text-white sm:text-2xl">6</strong><span className="block text-[10px] uppercase leading-4 tracking-wider sm:text-[11px] sm:leading-6">Geopolitical zones</span></div>
            <div className="lg:px-6"><strong className="block text-xl text-white sm:text-2xl">2000</strong><span className="block text-[10px] uppercase leading-4 tracking-wider sm:text-[11px] sm:leading-6">Established</span></div>
          </div>
        </div>
      </section>

      <section className="hf-reveal bg-[#0d2f20] text-white" aria-label="Company facts and certifications">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 lg:grid-cols-4">
          <div className="hf-gloss border-r border-white/10 px-5 py-5 sm:px-6 sm:py-8 lg:px-10"><strong className="block text-4xl font-bold tracking-[-0.04em] sm:text-5xl" data-count>26</strong><span className="mt-1 block text-[13px] text-white/55 sm:mt-2 sm:text-sm">Offices and warehouses</span></div>
          <div className="hf-gloss border-r border-white/10 px-5 py-5 sm:px-6 sm:py-8 lg:px-10"><strong className="block text-4xl font-bold tracking-[-0.04em] sm:text-5xl" data-count>6</strong><span className="mt-1 block text-[13px] text-white/55 sm:mt-2 sm:text-sm">Geopolitical zones covered</span></div>
          <div className="hf-gloss border-r border-white/10 px-5 py-5 sm:px-6 sm:py-8 lg:px-10"><strong className="block text-4xl font-bold tracking-[-0.04em] sm:text-5xl" data-count>26+</strong><span className="mt-1 block text-[13px] text-white/55 sm:mt-2 sm:text-sm">Years in the field</span></div>
          <div className="hf-gloss px-5 py-5 sm:px-6 sm:py-8 lg:px-10"><strong className="block bg-gradient-to-r from-[#e6b04a] to-[#d39522] bg-clip-text text-2xl sm:text-3xl font-bold text-transparent">NAFDAC</strong><span className="mt-1 block text-[13px] text-white/55 sm:mt-2 sm:text-sm">Certified products only</span></div>
        </div>
      </section>

      <section id="partners" aria-label="Authorized distribution partners" className="border-b border-[#dfe7df] bg-[#f7faf7] py-5 sm:py-7">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-3 px-5 sm:gap-5 md:flex-row md:gap-10 lg:px-10">
          <Link href="/partners" className="eyebrow shrink-0 text-[#86a891] transition-colors hover:text-[#173c2b]">Authorized distributor for</Link>
          <div className="hf-marquee w-full">
            <div className="hf-marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-10 pr-10 text-[#213d2b] sm:gap-16 sm:pr-16">
                  {[...distributionPartners, ...distributionPartners].map((partner, index) => <strong key={`${partner}-${index}`} className="whitespace-nowrap text-xl tracking-[-0.02em] sm:text-2xl opacity-80 transition-opacity hover:opacity-100">{partner}</strong>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-[1320px] gap-5 px-5 py-14 sm:gap-12 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-32">
        <div className="hf-reveal" data-reveal="left"><p className="eyebrow">Who we are</p><h2 className="mt-3 max-w-md text-[1.875rem] font-semibold leading-tight tracking-[-0.05em] sm:mt-5 sm:text-5xl">From the soil, <em className="font-serif font-normal text-[#839b2f]">with purpose.</em></h2></div>
        <div className="hf-reveal max-w-2xl" style={stagger(1, 120)}>
          <p className="text-lg leading-7 text-[#466252] sm:text-xl sm:leading-8">Harvestfield Industries Limited began as an agrochemical importer with a simple belief: Nigerian farmers deserve world-class inputs at fair prices.</p>
          <p className="mt-4 text-[1rem] leading-6 text-[#6b7d71] sm:mt-6 sm:text-base sm:leading-7">Twenty-six years later, we represent major names in global agriculture, distribute across Nigeria, hold the national Aflasafe licence, and are a founding member of the Food Convergence Initiative.</p>
          <Link href="/about" className="hf-link mt-6 text-sm sm:mt-8">Learn more about us <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section id="products" className="bg-[#e8eadb] px-5 py-14 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="hf-reveal flex flex-col justify-between gap-3 sm:gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow">What we do</p><h2 className="mt-3 text-[1.875rem] font-semibold tracking-[-0.05em] sm:mt-5 sm:text-5xl">The right input for every <em className="font-serif font-normal text-[#839b2f]">stage.</em></h2></div>
            <Link href="/products" className="hf-link text-sm">View all products <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-7 grid gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <Link key={product.name} href={`/products#${product.slug}`} className="hf-reveal block" style={stagger(index % 3, 110)}>
                  <article className="hf-card hf-spotlight hf-spotlight-light group h-full rounded-[22px] p-2 hover:bg-white/60 max-md:flex max-md:items-center max-md:gap-4 max-md:bg-white/45">
                    <div className="relative aspect-[1.05] overflow-hidden rounded-2xl bg-gradient-to-br from-[#28583a] to-[#102f25] max-md:aspect-square max-md:w-[6.5rem] max-md:shrink-0 max-md:rounded-xl">
                      <Icon aria-hidden size={56} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15" />
                      <SafeImg src={product.image} alt={product.name} loading="lazy" className="relative h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#102f25]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#f5f5ed]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#173c2b] backdrop-blur-sm max-md:hidden">{product.type}</span>
                    </div>
                    <div className="min-w-0 flex-1 py-1 pr-2 md:px-2 md:pb-3 md:pt-5">
                      <p className="eyebrow mb-1 text-[10px] md:hidden">{product.type}</p>
                      <div className="flex items-center justify-between gap-2"><h3 className="text-lg font-semibold tracking-[-0.03em] md:text-xl">{product.name}</h3><span className="flex h-8 w-8 shrink-0 items-center md:h-9 md:w-9 justify-center rounded-full border border-[#a9b29f] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#173c2b] group-hover:bg-[#173c2b] group-hover:text-white"><ArrowUpRight size={15} /></span></div>
                      <p className="mt-1 text-[13px] leading-5 text-[#6b7d71] md:mt-3 md:text-sm md:leading-6">{product.text}</p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="hf-grain relative overflow-hidden bg-[#173c2b] px-5 py-14 text-white sm:py-20 lg:px-10 lg:py-24">
        <div aria-hidden className="hf-aurora opacity-70" />
        <div className="relative mx-auto max-w-[1320px]">
          <div className="hf-reveal flex flex-col justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <p className="eyebrow text-[#d7e36b]">Why locate in the Harvestfield FTZ</p>
            <Link href="/free-trade-zone" className="hf-link text-sm text-[#d7e36b]">Explore the Free Trade Zone <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {ftzBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="hf-reveal hf-glass-dark hf-spotlight flex gap-4 rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1 sm:block sm:p-6" style={stagger(index, 70)}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d7e36b]/15 text-[#d7e36b] ring-1 ring-[#d7e36b]/25"><Icon size={18} /></span>
                  <div>
                    <h3 className="font-semibold sm:mt-5">{benefit.title}</h3>
                    <p className="mt-1 text-[13px] leading-5 text-white/60 sm:mt-2 sm:text-sm sm:leading-6">{benefit.short}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <blockquote className="hf-reveal mt-8 max-w-3xl border-l-2 border-[#d7e36b] pl-4 text-base leading-7 text-white/80 sm:mt-12 sm:pl-5 sm:text-xl sm:leading-8">&ldquo;{nepzaQuote.text}&rdquo;<cite className="mt-3 block text-sm not-italic text-[#d7e36b]">{nepzaQuote.author}, {nepzaQuote.role}</cite></blockquote>
        </div>
      </section>

      <section id="offices" className="mx-auto max-w-[1320px] px-5 py-14 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-7 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="hf-reveal" data-reveal="left">
            <p className="eyebrow">Our offices</p>
            <h2 className="mt-3 text-[1.875rem] font-semibold leading-tight tracking-[-0.05em] sm:mt-5 sm:text-5xl">We are already <em className="font-serif font-normal text-[#839b2f]">in your state.</em></h2>
            <p className="mt-3 max-w-sm text-[1rem] leading-6 text-[#6b7d71] sm:mt-5 sm:text-base sm:leading-7">26 offices across all six geopolitical zones. Walk in, call ahead, or send us a message and someone will get back to you the same day.</p>
            <Link href="/offices" className="hf-link mt-5 text-sm sm:mt-8">Find your nearest office <ArrowUpRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {offices.map(({ region, cities }, index) => (
              <Link key={region} href="/offices" className="hf-reveal hf-spotlight hf-spotlight-light group rounded-2xl border border-[#d6dccf] bg-white/40 p-3.5 transition-all sm:p-5 duration-500 hover:-translate-y-1 hover:border-[#a9b29f] hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(23,60,43,.35)]" style={stagger(index, 70)}>
                <div className="flex items-center justify-between"><p className="eyebrow">{region}</p><MapPin size={15} className="text-[#a9b29f] transition-colors group-hover:text-[#d39522] max-sm:hidden" /></div>
                <p className="mt-1.5 text-[13px] font-semibold leading-5 sm:mt-3 sm:text-base sm:leading-normal">{cities.join(' · ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8eadb] px-5 py-12 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-5 sm:gap-8 md:grid-cols-3">
          <div className="hf-reveal"><p className="eyebrow">Who we are</p><h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:mt-4 sm:text-3xl">Started in 2000.<br /><em className="font-serif text-3xl font-normal sm:text-4xl text-[#839b2f]">Still at it.</em></h2></div>
          <div className="hf-reveal border-t border-[#c9d0bf] pt-4 sm:pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0" style={stagger(1, 120)}><h3 className="font-semibold">Roll Back Malaria Programme</h3><p className="mt-2 text-sm leading-6 text-[#6b7d71]">Malaria vector control products distributed across Nigeria as part of the national programme since we opened.</p></div>
          <div className="hf-reveal border-t border-[#c9d0bf] pt-4 sm:pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0" style={stagger(2, 120)}><h3 className="font-semibold">Food Convergence Initiative</h3><p className="mt-2 text-sm leading-6 text-[#6b7d71]">Founding member, working with government and development partners on food safety and aflatoxin control.</p></div>
        </div>
      </section>

      <section id="news" className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:gap-12 sm:py-24 lg:grid-cols-2 lg:items-start lg:px-10 lg:py-28">
        <div className="hf-reveal">
          <p className="eyebrow">Free Trade Zone</p>
          <h2 className="mt-3 max-w-xl text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.05em] sm:mt-5 sm:text-6xl">Nigeria&apos;s newest NEPZA-licensed medical manufacturing zone. And it is <em className="font-serif font-normal text-[#839b2f]">open for business.</em></h2>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#a9d9bc] bg-[#eef8f0] px-4 py-2.5 text-[10.5px] sm:mt-12 sm:px-5 sm:py-3 sm:text-xs font-bold uppercase tracking-wider text-[#28613d] shadow-[inset_0_1px_0_#fff]"><span className="hf-ping h-2 w-2 rounded-full bg-[#28a35a] text-[#28a35a]" /> NEPZA declaration &amp; operation licence, February 2026</div>
          <p className="mt-5 max-w-xl text-[1rem] leading-7 text-[#557260] sm:mt-8 sm:text-lg sm:leading-9">In February 2026, the Nigeria Export Processing Zones Authority formally presented Harvestfield Industries with both the Declaration of Licence and the Operation Licence for the Harvestfield Free Trade Zone focused on medical products in Ogun State, and one of the few in Nigeria dedicated entirely to healthcare manufacturing.</p>
          <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#557260] sm:mt-5 sm:text-lg sm:leading-9">The anchor operation in the zone is Harvestfield Healthcare FZE, and its production creates immediate demand for packaging, logistics, raw materials and ancillary services within the zone.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-5"><Link href="/free-trade-zone" className="hf-btn hf-btn-forest px-7 py-4">Enquire about the FTZ <ArrowUpRight size={16} /></Link><Link href="/contact?topic=ftz" className="hf-link">Talk to our team <ArrowUpRight size={16} /></Link></div>
          <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-4">
            {ftzStats.map(({ value, label }, index) => (
              <div key={value} className="hf-reveal hf-spotlight hf-spotlight-light rounded-2xl border border-[#d8e3d9] bg-gradient-to-b from-white to-[#f2f7f2] p-3 shadow-[inset_0_1px_0_#fff] sm:p-5" style={stagger(index, 100)}>
                <strong className="block text-2xl font-bold tracking-[-0.04em] sm:text-4xl" data-count>{value}</strong>
                <span className="mt-1 block text-[11.5px] leading-4 text-[#65806e] sm:mt-2 sm:text-sm sm:leading-5">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <h3 className="hf-reveal text-lg font-bold uppercase tracking-wide sm:text-xl">Why locate in the Harvestfield FTZ</h3>
          <ul className="mt-5 space-y-4 sm:mt-8 sm:space-y-7">
            {ftzBenefits.map(({ title, text }, index) => (
              <li key={title} className="hf-reveal group relative pl-7 sm:pl-8" style={stagger(index, 70)}>
                <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full sm:top-2 bg-[#d39522] ring-4 ring-[#d39522]/15 transition-transform duration-300 group-hover:scale-125" />
                <strong className="block text-base sm:text-lg">{title}</strong>
                <span className="mt-1 block text-sm leading-6 text-[#5d7866] sm:mt-2 sm:text-base sm:leading-7">{text}</span>
              </li>
            ))}
          </ul>
          <blockquote className="hf-reveal mt-7 rounded-r-2xl border-l-2 border-[#d39522] bg-[#f1f5ef] p-5 text-sm italic leading-6 text-[#557260] sm:mt-10 sm:p-6 sm:text-base sm:leading-7">&ldquo;{nepzaQuote.text}&rdquo;<cite className="mt-3 block font-semibold not-italic">— {nepzaQuote.author}, {nepzaQuote.role}</cite></blockquote>
        </div>
      </section>

      <section id="impact" className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-14 sm:gap-12 sm:pb-24 sm:pt-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:pb-32">
        <div className="hf-reveal hf-grain hf-spotlight relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1f5136] via-[#173c2b] to-[#102f25] p-7 text-white shadow-[0_40px_80px_-40px_rgba(16,47,37,.8)] sm:p-10 lg:min-h-[440px] lg:p-14" data-reveal="zoom">
          <div aria-hidden className="hf-aurora opacity-80" />
          <span className="absolute -right-10 -top-16 font-serif text-[10rem] sm:text-[220px] leading-none text-white/5">&ldquo;</span>
          <p className="eyebrow relative text-[#d7e36b]">Our impact</p>
          <h2 className="relative mt-5 max-w-md text-[1.875rem] font-semibold leading-tight tracking-[-0.05em] sm:mt-8 sm:text-5xl">Better farms.<br /><em className="font-serif font-normal text-[#d7e36b]">Better futures.</em></h2>
          <p className="relative mt-4 max-w-sm text-[1rem] leading-6 text-white/65 sm:mt-6 sm:text-base sm:leading-7">Our Aflasafe biocontrol product cuts aflatoxin in maize and groundnut by up to 99%. Our vector-control work supports the Roll Back Malaria programme across Nigeria.</p>
          <div className="relative mt-7 flex gap-8 sm:mt-12">
            <div><strong className="block text-3xl text-[#d7e36b]" data-count>99%</strong><span className="text-xs text-white/60">Aflatoxin reduction</span></div>
            <div><strong className="block text-3xl text-[#d7e36b]" data-count>26+</strong><span className="text-xs text-white/60">Years supporting Roll Back Malaria</span></div>
          </div>
        </div>
        <div id="contact" className="hf-reveal" style={stagger(1, 120)}>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 text-[1.875rem] font-semibold leading-tight tracking-[-0.05em] sm:mt-5 sm:text-5xl">Ready to grow <em className="font-serif font-normal text-[#839b2f]">with us?</em></h2>
          <p className="mt-4 max-w-md text-[1rem] leading-6 text-[#6b7d71] sm:mt-6 sm:text-base sm:leading-7">Whether you need inputs for this season, want to stock our products, or are exploring a place in the Harvestfield Free Trade Zone, our team across 26 offices will get back to you the same day.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            <Link href="/contact" className="hf-btn hf-btn-forest px-6 py-4 text-sm">Start a conversation <ArrowUpRight size={16} /></Link>
            <Link href="/offices" className="hf-btn hf-btn-outline px-6 py-4 text-sm"><MapPin size={15} /> Find an office</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold sm:mt-8">
            <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-[#d39522]"><Phone size={15} /> {contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-[#d39522]"><Mail size={15} /> {contact.email}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
