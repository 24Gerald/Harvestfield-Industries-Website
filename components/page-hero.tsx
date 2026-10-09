import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { heroImage } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  crumb: string
  /** Where to focus the background photo, e.g. "70% 30%". */
  focus?: string
  children?: ReactNode
  aside?: ReactNode
}

/** Dark, glossy hero shared by every inner page. */
export function PageHero({ eyebrow, title, description, crumb, focus = '70% 35%', children, aside }: PageHeroProps) {
  return (
    <section id="top" className="hf-grain relative overflow-hidden rounded-b-[32px] bg-hf-deep px-5 pb-20 pt-40 text-white sm:pt-44 lg:rounded-b-[56px] lg:px-10 lg:pb-28 lg:pt-52">
      <img src={heroImage} alt="" className="hf-hero-image absolute inset-0 h-full w-full object-cover opacity-30" style={{ objectPosition: focus }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-hf-deep via-hf-deep/85 to-hf-deep/30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-hf-deep via-transparent to-transparent" />
      <div aria-hidden className="hf-aurora" />
      <div aria-hidden className="hf-gridlines" />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <nav aria-label="Breadcrumb" className="hf-rise mb-8 flex items-center gap-2 text-xs font-semibold text-white/55">
            <Link href="/" className="transition-colors hover:text-hf-lime">Home</Link>
            <ChevronRight size={13} />
            <span aria-current="page" className="text-white/85">{crumb}</span>
          </nav>
          <p className="hf-rise mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-hf-lime" style={stagger(1)}><span className="h-px w-10 bg-hf-lime" /> {eyebrow}</p>
          <h1 className="hf-rise max-w-[820px] text-[44px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[76px]" style={stagger(2)}>{title}</h1>
          {description && <p className="hf-rise mt-7 max-w-[560px] text-base leading-8 text-white/70 sm:text-lg" style={stagger(3)}>{description}</p>}
          {children && <div className="hf-rise mt-9 flex flex-wrap items-center gap-4" style={stagger(4)}>{children}</div>}
        </div>
        {aside && <div className="hf-rise" style={stagger(5)}>{aside}</div>}
      </div>
    </section>
  )
}
