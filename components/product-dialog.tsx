'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { catalogueGroups, type CatalogueItem, formulationOf, packshot } from '@/lib/catalogue'

/**
 * Full-screen product view: the pack shot takes most of the space (about 5:2 against the details),
 * with the facts in a narrow column beside it, or below it on phones.
 */
export function ProductDialog({ items, slug, onChange }: { items: CatalogueItem[]; slug: string | null; onChange: (slug: string | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const index = slug ? items.findIndex((item) => item.slug === slug) : -1
  const item = index >= 0 ? items[index] : null

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (item && !dialog.open) {
      document.documentElement.style.overflow = 'hidden'
      dialog.showModal()
    } else if (!item && dialog.open) {
      dialog.close()
    }
  }, [item])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const onClose = () => {
      document.documentElement.style.overflow = ''
      onChange(null)
    }
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [onChange])

  const step = (by: number) => {
    if (index < 0 || items.length < 2) return
    onChange(items[(index + by + items.length) % items.length].slug)
  }

  const group = item ? catalogueGroups.find((g) => g.slug === item.group) : undefined
  const formulation = item ? formulationOf(item) : undefined
  const facts = item
    ? ([
        ['Active ingredients', item.composition],
        ['Formulation', formulation],
        ['Pack size', item.pack],
        ['Application rate', item.dose ?? 'Follow the label, or ask our team for the right rate for your crop.'],
      ].filter(([, value]) => value) as [string, string][])
    : []

  return (
    <dialog
      ref={ref}
      aria-label={item ? `${item.name} details` : 'Product details'}
      onClick={(event) => { if (event.target === event.currentTarget) ref.current?.close() }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
      className="m-auto h-[min(92dvh,48rem)] w-[min(78rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-[28px] border-0 bg-white p-0 text-hf-forest shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)] backdrop:bg-hf-night/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-300 max-sm:h-[100dvh] max-sm:max-h-none max-sm:w-full max-sm:rounded-none"
    >
      {item && (
        <div className="grid h-full grid-rows-[minmax(0,5fr)_minmax(0,3fr)] sm:grid-cols-[minmax(0,5fr)_minmax(16rem,2fr)] sm:grid-rows-1">
          {/* Pack shot */}
          <div className="relative min-h-0 bg-[radial-gradient(ellipse_at_center,#fff_35%,#f3f3ea_100%)]">
            <img
              key={item.slug}
              src={packshot(item.slug)}
              alt={`${item.name} pack`}
              className="absolute inset-0 h-full w-full object-contain p-4 mix-blend-multiply animate-in fade-in zoom-in-95 duration-500 sm:p-10"
            />
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous product" className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hf-forest shadow-[0_8px_24px_-10px_rgba(23,60,43,.5)] ring-1 ring-hf-forest/10 transition hover:bg-hf-forest hover:text-white sm:left-5 sm:h-12 sm:w-12">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next product" className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-hf-forest shadow-[0_8px_24px_-10px_rgba(23,60,43,.5)] ring-1 ring-hf-forest/10 transition hover:bg-hf-forest hover:text-white sm:right-5 sm:h-12 sm:w-12">
                  <ChevronRight size={20} />
                </button>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-hf-forest/[0.06] px-3 py-1 text-[11px] font-bold tabular-nums text-hf-leaf sm:bottom-5">
                  {index + 1} / {items.length}
                </span>
              </>
            )}
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-hf-forest ring-1 ring-hf-forest/10 transition hover:bg-hf-forest hover:text-white sm:hidden">
              <X size={18} />
            </button>
          </div>

          {/* Details */}
          <aside className="flex min-h-0 flex-col overflow-y-auto overscroll-contain border-hf-line bg-hf-cream/60 px-5 pb-5 pt-4 max-sm:border-t sm:border-l sm:px-6 sm:pb-6 sm:pt-5">
            <div className="flex items-start justify-between gap-3">
              <p className="eyebrow pt-2 text-[10px]">{group?.name}</p>
              <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hf-forest/[0.07] text-hf-forest transition-colors hover:bg-hf-forest hover:text-white sm:flex">
                <X size={18} />
              </button>
            </div>
            <h2 className="mt-1 text-xl font-semibold leading-tight tracking-[-0.03em] sm:mt-2 sm:text-2xl">{item.name}</h2>
            <p className="mt-2 text-[13px] leading-5 text-hf-slate">{item.use}</p>

            <dl className="mt-4 divide-y divide-hf-line border-y border-hf-line text-[12px] leading-5 sm:mt-5">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5">
                  <dt className="font-bold text-hf-sage">{label}</dt>
                  <dd className={label === 'Application rate' && !item.dose ? 'text-hf-sage' : 'font-semibold text-hf-forest'}>{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-[11px] leading-4 text-hf-sage">Always read the label and follow the safety advice before use.</p>

            <div className="mt-auto pt-5">
              <Link href={`/contact?topic=products&item=${encodeURIComponent(item.name)}`} className="hf-btn hf-btn-gold w-full justify-center px-5 py-3 text-[13px]">
                Enquire about {item.name} <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </dialog>
  )
}
