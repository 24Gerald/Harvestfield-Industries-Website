import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact, logoUrl, navLinks, products } from '@/lib/site-data'

const companyLinks = [...navLinks, { href: '/contact', label: 'Contact' }]
const productLinks = products.map((product) => ({ href: `/products#${product.slug}`, label: product.name }))

/** One swipeable row of links for the phone footer, fading out on the right to hint there is more. */
function FooterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <nav aria-label={label} className="-mx-4 mt-2.5 [mask-image:linear-gradient(90deg,#000_82%,transparent)]">
      <ul className="flex items-center gap-1.5 overflow-x-auto px-4 pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0 pr-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-hf-lime">{label}</li>
        {children}
      </ul>
    </nav>
  )
}

const chip = 'flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12.5px] text-white/75 transition-colors hover:border-hf-lime/50 hover:text-white'

export function SiteFooter() {
  return (
    <footer className="hf-grain relative overflow-hidden bg-hf-night text-white">
      <div aria-hidden className="hf-aurora opacity-50" />
      <div aria-hidden className="hf-gridlines" />

      {/* Phones: a compact footer, about a quarter of the screen, with each group on one horizontal row */}
      <div className="relative px-4 pb-4 pt-5 sm:hidden">
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <Link href="/" aria-label="Harvestfield Industries Limited home" className="shrink-0 rounded-xl bg-white px-2 py-1.5">
            <img src={logoUrl} alt="Harvestfield Industries Limited" className="h-7 w-auto object-contain" />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10.5px] font-bold text-hf-lime"><ShieldCheck size={12} /> NAFDAC certified</span>
          <a href="#top" aria-label="Back to top" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hf-lime/40 text-hf-lime"><ArrowUp size={14} /></a>
        </div>
        <FooterRow label="Company">
          {companyLinks.map((link) => <li key={link.href} className="shrink-0"><Link href={link.href} className={chip}>{link.label}</Link></li>)}
        </FooterRow>
        <FooterRow label="Products">
          {productLinks.map((link) => <li key={link.href} className="shrink-0"><Link href={link.href} className={chip}>{link.label}</Link></li>)}
        </FooterRow>
        <FooterRow label="Contact">
          <li className="shrink-0"><a href={contact.phoneHref} className={chip}><Phone size={12} className="text-hf-lime" />{contact.phone}</a></li>
          <li className="shrink-0"><a href={`mailto:${contact.email}`} className={chip}><Mail size={12} className="text-hf-lime" />{contact.email}</a></li>
          <li className="shrink-0"><Link href="/offices" className={chip}><MapPin size={12} className="text-hf-lime" />26 offices in 6 zones</Link></li>
        </FooterRow>
        <p className="mt-3.5 border-t border-white/10 pt-3 text-[11px] text-white/45">© 2026 Harvestfield Industries Limited.<span className="max-[389px]:hidden"> Growing a better tomorrow.</span></p>
      </div>

      {/* Tablet and desktop */}
      <div className="relative mx-auto hidden max-w-[1320px] px-5 pt-20 sm:block lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="Harvestfield Industries Limited home" className="inline-block rounded-2xl bg-white px-3 py-2 shadow-[inset_0_-2px_0_rgba(23,60,43,.08)] transition-transform duration-300 hover:-translate-y-0.5">
              <img src={logoUrl} alt="Harvestfield Industries Limited" className="h-11 w-auto object-contain" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">Agrochemicals, vector-control products and farming equipment across all six geopolitical zones of Nigeria, since 2000.</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-hf-lime"><ShieldCheck size={14} /> NAFDAC certified products only</p>
          </div>
          <nav aria-label="Company">
            <p className="eyebrow text-hf-lime">Company</p>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-white/70 transition-colors hover:text-white">{link.label}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Products">
            <p className="eyebrow text-hf-lime">Products</p>
            <ul className="mt-5 space-y-3 text-sm">
              {productLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-white/70 transition-colors hover:text-white">{link.label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-hf-lime">Get in touch</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li><a href={contact.phoneHref} className="group flex items-center gap-3 text-white/80 hover:text-white"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-hf-lime/60"><Phone size={14} /></span>{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="group flex items-center gap-3 text-white/80 hover:text-white"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-hf-lime/60"><Mail size={14} /></span>{contact.email}</a></li>
              <li><Link href="/offices" className="group flex items-center gap-3 text-white/80 hover:text-white"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-hf-lime/60"><MapPin size={14} /></span>26 offices in 6 zones</Link></li>
            </ul>
            <Link href="/contact" className="hf-btn hf-btn-lime mt-7 px-6 py-3.5 text-sm">Start a conversation <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <p aria-hidden className="pointer-events-none mt-16 select-none bg-gradient-to-b from-white/[0.13] to-white/0 bg-clip-text text-center text-[17vw] font-bold leading-[0.8] tracking-[-0.07em] text-transparent lg:text-[200px]">Harvestfield</p>

        <div className="flex flex-row items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-white/50">
          <p>© 2026 Harvestfield Industries Limited. Growing a better tomorrow.</p>
          <a href="#top" className="group inline-flex items-center gap-2 font-bold text-hf-lime">Back to top <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hf-lime/40 transition-transform duration-300 group-hover:-translate-y-1"><ArrowUp size={14} /></span></a>
        </div>
      </div>
    </footer>
  )
}
