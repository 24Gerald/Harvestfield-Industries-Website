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
      <div role="group" aria-label="Filter products" className="hf-glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
        {filters.map((name) => {
          const count = name === 'All' ? products.length : products.filter((product) => product.type === name).length
          return (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={cn('flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300', filter === name ? 'bg-hf-forest text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_8px_20px_-10px_rgba(23,60,43,.8)]' : 'text-hf-leaf hover:bg-hf-forest/[0.06]')}
            >
              {name}
              <span className={cn('rounded-full px-1.5 text-[11px] tabular-nums', filter === name ? 'bg-white/15 text-hf-lime' : 'bg-hf-forest/[0.07]')}>{count}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => {
          const Icon = product.icon
          return (
            <article key={`${filter}-${product.slug}`} id={product.slug} className="hf-pop hf-card hf-spotlight hf-spotlight-light group flex flex-col rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-white/60 p-2.5 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)]" style={stagger(index, 70)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-gradient-to-br from-hf-leaf to-hf-night">
                <Icon aria-hidden size={56} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15" />
                <SafeImg src={product.image} alt={product.name} loading="lazy" className="relative h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-hf-cream/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">{product.type}</span>
                <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-hf-forest shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon size={19} /></span>
              </div>
              <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{product.name}</h3>
                <p className="mt-3 flex-1 leading-7 text-hf-sage">{product.text}</p>
                <Link href={`/contact?topic=products&item=${encodeURIComponent(product.name)}`} className="mt-6 inline-flex items-center justify-between rounded-2xl border border-hf-line bg-hf-cream/60 px-5 py-3.5 text-sm font-bold transition-all duration-300 hover:border-hf-forest hover:bg-hf-forest hover:text-white">
                  Enquire about {product.name.toLowerCase()} <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
