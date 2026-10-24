'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { SafeImg } from '@/components/safe-img'
import { catalogue, catalogueGroups, type CatalogueItem, packshot } from '@/lib/catalogue'
import { cn, stagger } from '@/lib/utils'

const chip = 'flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm'
const chipOn = 'border-hf-forest bg-hf-forest text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_8px_20px_-10px_rgba(23,60,43,.8)]'
const chipOff = 'border-hf-line bg-white/60 text-hf-leaf hover:border-hf-forest/30 hover:bg-white'

function matches(item: CatalogueItem, query: string) {
  return !query || `${item.name} ${item.composition} ${item.use}`.toLowerCase().includes(query)
}

/** The product range, grouped by category, with a category filter and a search box. */
export function ProductExplorer() {
  const [group, setGroup] = useState('all')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const found = catalogue.filter((item) => matches(item, q))
  const groups = catalogueGroups
    .filter((g) => group === 'all' || g.slug === group)
    .map((g) => ({ ...g, items: found.filter((item) => item.group === g.slug) }))
    .filter((g) => g.items.length > 0)

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5 sm:gap-2">
          {[{ slug: 'all', name: 'All' }, ...catalogueGroups].map(({ slug, name }) => {
            const count = slug === 'all' ? found.length : found.filter((item) => item.group === slug).length
            const on = group === slug
            return (
              <button key={slug} type="button" aria-pressed={on} onClick={() => setGroup(slug)} className={cn(chip, on ? chipOn : chipOff)}>
                {name}
                <span className={cn('rounded-full px-1.5 text-[11px] tabular-nums', on ? 'bg-white/15 text-hf-lime' : 'bg-hf-forest/[0.07]')}>{count}</span>
              </button>
            )
          })}
        </div>
        <label className="relative block lg:w-80">
          <span className="sr-only">Search products</span>
          <Search aria-hidden size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-hf-sage" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, ingredient or crop"
            className="w-full rounded-full border border-hf-line bg-white/70 py-3 pl-11 pr-10 text-[16px] text-hf-forest outline-none transition-colors placeholder:text-hf-sage/80 focus:border-hf-forest/40 focus:bg-white sm:text-sm [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-hf-sage hover:bg-hf-forest/[0.06] hover:text-hf-forest">
              <X size={15} />
            </button>
          )}
        </label>
      </div>

      {/* Groups with one or two products sit side by side on wide screens, at the same card size as the rest */}
      <div className="grid lg:grid-cols-4 lg:gap-x-5 xl:grid-cols-5">
      {groups.map(({ slug, name, text, icon: Icon, items }) => (
        <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className={cn('mt-9 sm:mt-14', items.length > 2 ? 'lg:col-span-4 xl:col-span-5' : 'lg:col-span-2')}>
          <div className="flex items-center gap-3 border-b border-hf-line pb-3 sm:gap-4 sm:pb-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hf-lime/70 to-hf-lime/15 text-hf-forest shadow-[inset_0_1px_0_rgba(255,255,255,.7)] ring-1 ring-hf-forest/10 sm:h-12 sm:w-12 sm:rounded-2xl">
              <Icon size={19} />
            </span>
            <div className="min-w-0">
              <h3 id={`${slug}-title`} className="flex items-baseline gap-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                {name}
                <span className="text-sm font-semibold tabular-nums text-hf-sage">{items.length}</span>
              </h3>
              <p className="text-[13px] leading-5 text-hf-sage sm:text-sm">{text}</p>
            </div>
          </div>

          <div className={cn('mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-4 md:grid-cols-3 lg:gap-5', items.length > 2 ? 'lg:grid-cols-4 xl:grid-cols-5' : 'lg:grid-cols-2')}>
            {items.map((item, index) => (
              <article
                key={`${group}-${q}-${item.slug}`}
                id={item.slug}
                className="hf-pop hf-card group flex flex-col rounded-[22px] border border-white/80 bg-white p-1.5 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)] sm:rounded-[26px] sm:p-2"
                style={stagger(index % 8, 45)}
              >
                <div className="relative aspect-[6/5] overflow-hidden rounded-[18px] sm:aspect-square bg-gradient-to-b from-white to-hf-cream sm:rounded-[20px]">
                  <SafeImg src={packshot(item.slug)} alt={`${item.name} pack`} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-700 group-hover:scale-[1.04]" />
                  {item.pack && <span className="absolute left-2 top-2 rounded-full bg-hf-forest/[0.07] px-2 py-0.5 text-[10px] font-bold text-hf-leaf sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]">{item.pack}</span>}
                </div>
                <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3 sm:px-2.5 sm:pb-2 sm:pt-4">
                  <h4 className="text-[15px] font-semibold leading-tight tracking-[-0.02em] sm:text-lg">{item.name}</h4>
                  <p className="mt-1 text-[11px] font-semibold leading-4 text-hf-moss sm:text-xs sm:leading-5">{item.composition}</p>
                  <p className="mt-2 flex-1 text-[12px] leading-[1.125rem] text-hf-sage sm:text-[13px] sm:leading-5">{item.use}</p>
                  <Link href={`/contact?topic=products&item=${encodeURIComponent(item.name)}`} className="mt-3 inline-flex w-fit items-center gap-1.5 text-[12px] font-bold text-hf-forest underline decoration-hf-line decoration-2 underline-offset-4 transition-colors hover:decoration-hf-gold sm:mt-4 sm:text-[13px]">
                    Enquire <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      </div>

      {groups.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-hf-line bg-white/50 px-6 py-10 text-center sm:mt-14">
          <p className="text-base font-semibold">No products match “{query.trim()}”.</p>
          <p className="mt-1 text-sm text-hf-sage">Try a product name, an active ingredient or a crop, or ask our team.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => { setQuery(''); setGroup('all') }} className={cn(chip, chipOff)}>Clear search</button>
            <Link href="/contact?topic=products" className={cn(chip, chipOn)}>Ask our team <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      )}
    </div>
  )
}
