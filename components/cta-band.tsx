import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { contact } from '@/lib/site-data'

type CtaBandProps = {
  eyebrow?: string
  title?: ReactNode
  text?: string
  href?: string
  label?: string
}

export function CtaBand({
  eyebrow = 'Get in touch',
  title = <>Ready to grow <em className="font-serif font-normal text-hf-lime">with us?</em></>,
  text = 'Walk in, call ahead, or send us a message and someone will get back to you the same day.',
  href = '/contact',
  label = 'Start a conversation',
}: CtaBandProps) {
  return (
    <section className="px-5 py-12 sm:py-20 lg:px-10 lg:py-28">
      <div className="hf-reveal hf-grain hf-spotlight relative mx-auto max-w-[1320px] overflow-hidden rounded-[32px] bg-gradient-to-br from-hf-fern via-hf-forest to-hf-night px-6 py-9 text-white shadow-[0_40px_80px_-40px_rgba(16,47,37,.7)] sm:px-12 sm:py-14 lg:rounded-[44px] lg:px-16 lg:py-20" data-reveal="zoom">
        <div aria-hidden className="hf-aurora" />
        <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
        <div aria-hidden className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
        <div className="relative flex flex-col justify-between gap-6 sm:gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-hf-lime">{eyebrow}</p>
            <h2 className="mt-3 max-w-2xl text-[30px] font-semibold leading-[1.05] tracking-[-0.05em] sm:mt-5 sm:text-6xl">{title}</h2>
            <p className="mt-3 max-w-lg text-[15px] leading-6 text-white/70 sm:mt-6 sm:text-base sm:leading-7">{text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href={href} className="hf-btn hf-btn-lime px-7 py-4 text-sm">{label} <ArrowUpRight size={16} /></Link>
            <a href={contact.phoneHref} className="hf-btn hf-btn-glass px-6 py-4 text-sm"><Phone size={15} /> {contact.phone}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
