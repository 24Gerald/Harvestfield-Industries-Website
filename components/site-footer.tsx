import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact, logoUrl, navLinks, products } from '@/lib/site-data'

const companyLinks = [...navLinks, { href: '/contact', label: 'Contact' }]
const productLinks = products.map((product) => ({ href: `/products#${product.slug}`, label: product.name }))

/** Links spaced out on a line, wrapping onto the next, for the phone footer. */
function InlineLinks({ children }: { children: ReactNode }) {
  return <ul className="flex flex-wrap gap-x-3.5 gap-y-0.5">{children}</ul>
}
const inlineLink = 'text-white/75 transition-colors hover:text-white'
const label = 'pt-px text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-hf-lime'

export function SiteFooter() {
  return (
    <footer className="hf-grain relative overflow-hidden bg-hf-night text-white">
      <div aria-hidden className="hf-aurora opacity-50" />
      <div aria-hidden className="hf-gridlines" />

      {/* Phones: a compact footer (about a quarter of the screen), links wrapping in a small label/links table */}
      <div className="relative px-4 pb-3.5 pt-4 sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="Harvestfield Industries Limited home" className="shrink-0 rounded-lg bg-white px-2 py-1">
            <img src={logoUrl} alt="Harvestfield Industries Limited" className="h-6 w-auto object-contain" />
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10.5px] font-bold text-hf-lime"><ShieldCheck size={12} /> NAFDAC certified products</span>
        </div>
        <dl className="mt-3.5 grid grid-cols-[4.75rem_1fr] gap-x-3 gap-y-2.5 text-[12px] leading-[1.15rem]">
          <dt className={label}>Company</dt>
          <dd>
            <nav aria-label="Company">
              <InlineLinks>{companyLinks.map((link) => <li key={link.href}><Link href={link.href} className={inlineLink}>{link.label}</Link></li>)}</InlineLinks>
            </nav>
          </dd>
          <dt className={label}>Products</dt>
          <dd>
            <nav aria-label="Products">
              <InlineLinks>{productLinks.map((link) => <li key={link.href}><Link href={link.href} className={inlineLink}>{link.label}</Link></li>)}</InlineLinks>
            </nav>
          </dd>
          <dt className={label}>Contact</dt>
          <dd>
            <InlineLinks>
              <li><a href={contact.phoneHref} className={inlineLink}>{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className={inlineLink}>{contact.email}</a></li>
              <li><Link href="/offices" className={inlineLink}>26 offices in 6 zones</Link></li>
            </InlineLinks>
          </dd>
        </dl>
        <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-[11px] text-white/45">
          <p>© 2026 Harvestfield Industries Limited</p>
          <a href="#top" className="inline-flex shrink-0 items-center gap-1 font-bold text-hf-lime">Back to top <ArrowUp size={12} /></a>
        </div>
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
