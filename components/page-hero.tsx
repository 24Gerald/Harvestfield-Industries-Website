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
  /** Background photo; defaults to the field team still. Inner pages never play the video: that is kept for the homepage. */
  image?: string
  children?: ReactNode
  aside?: ReactNode
}

/** Dark, glossy hero shared by every inner page: about half a screen tall over a still photo, so it reads differently from the homepage's full-screen video. */
export function PageHero({ eyebrow, title, description, crumb, focus = '70% 35%', image, children, aside }: PageHeroProps) {
  return (
    <section id="top" className="hf-grain relative flex min-h-[50svh] items-end overflow-hidden rounded-b-[32px] bg-hf-deep px-5 pb-10 pt-32 text-white sm:pb-14 sm:pt-36 lg:rounded-b-[48px] lg:px-10 lg:pb-16 lg:pt-40">
      <img src={image ?? heroImage} alt="" className="hf-hero-image absolute inset-0 h-full w-full object-cover opacity-50" style={{ objectPosition: focus }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-hf-deep via-hf-deep/80 to-hf-deep/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-hf-deep via-transparent to-transparent" />
      <div aria-hidden className="hf-aurora" />
      <div aria-hidden className="hf-gridlines" />
      <div className="relative mx-auto grid w-full max-w-[1320px] gap-7 sm:gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <nav aria-label="Breadcrumb" className="hf-rise mb-5 flex items-center gap-2 text-xs font-semibold text-white/55 sm:mb-6">
            <Link href="/" className="transition-colors hover:text-hf-lime">Home</Link>
            <ChevronRight size={13} />
            <span aria-current="page" className="text-white/85">{crumb}</span>
          </nav>
          <p className="hf-rise mb-4 flex items-center gap-3 text-[11px] sm:mb-6 font-bold uppercase tracking-[0.24em] text-hf-lime" style={stagger(1)}><span className="h-px w-10 bg-hf-lime" /> {eyebrow}</p>
          <h1 className="hf-rise max-w-[820px] text-[2.125rem] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-5xl sm:leading-[1.02] lg:text-[60px]" style={stagger(2)}>{title}</h1>
          {description && <p className="hf-rise mt-4 max-w-[560px] text-[1rem] leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8" style={stagger(3)}>{description}</p>}
          {children && <div className="hf-rise mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4" style={stagger(4)}>{children}</div>}
        </div>
        {aside && <div className="hf-rise" style={stagger(5)}>{aside}</div>}
      </div>
    </section>
  )
}
