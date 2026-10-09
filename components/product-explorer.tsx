'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SafeImg } from '@/components/safe-img'
import { products, productTypes } from '@/lib/site-data'
import { cn, stagger } from '@/lib/utils'

const filters = ['All', ...productTypes]

export function ProductExplorer() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? products : products.filter((product) => product.type === filter)

  return (
    <div>
      <div role="group" aria-label="Filter products" className="hf-glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 sm:p-1.5">
        {filters.map((name) => {
          const count = name === 'All' ? products.length : products.filter((product) => product.type === name).length
          return (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={cn('flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm', filter === name ? 'bg-hf-forest text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_8px_20px_-10px_rgba(23,60,43,.8)]' : 'text-hf-leaf hover:bg-hf-forest/[0.06]')}
            >
              {name}
              <span className={cn('rounded-full px-1.5 text-[11px] tabular-nums', filter === name ? 'bg-white/15 text-hf-lime' : 'bg-hf-forest/[0.07]')}>{count}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {visible.map((product, index) => {
          const Icon = product.icon
          return (
            <article key={`${filter}-${product.slug}`} id={product.slug} className="hf-pop hf-card hf-spotlight hf-spotlight-light group flex flex-col rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-white/60 p-2.5 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)] max-sm:grid max-sm:grid-cols-[96px_1fr] max-sm:gap-x-4 max-sm:gap-y-3 max-sm:rounded-3xl" style={stagger(index, 70)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-gradient-to-br from-hf-leaf to-hf-night max-sm:aspect-square max-sm:rounded-2xl">
                <Icon aria-hidden size={56} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15" />
                <SafeImg src={product.image} alt={product.name} loading="lazy" className="relative h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-hf-cream/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm max-sm:hidden">{product.type}</span>
                <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-hf-forest shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 max-sm:hidden"><Icon size={19} /></span>
              </div>
              <div className="flex flex-1 flex-col px-3 pt-6 max-sm:justify-center max-sm:p-0 max-sm:pr-1">
                <p className="eyebrow mb-1 text-[10px] sm:hidden">{product.type}</p>
                <h3 className="text-lg font-semibold tracking-[-0.03em] sm:text-2xl">{product.name}</h3>
                <p className="mt-1 flex-1 text-[13px] leading-5 text-hf-sage sm:mt-3 sm:text-base sm:leading-7">{product.text}</p>
              </div>
              <Link href={`/contact?topic=products&item=${encodeURIComponent(product.name)}`} className="mx-3 mb-3 mt-6 inline-flex items-center justify-between rounded-2xl border border-hf-line bg-hf-cream/60 px-5 py-3.5 text-sm font-bold transition-all duration-300 hover:border-hf-forest hover:bg-hf-forest hover:text-white max-sm:col-span-2 max-sm:m-0 max-sm:px-4 max-sm:py-2.5 max-sm:text-[13px]">
                Enquire about {product.name.toLowerCase()} <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
