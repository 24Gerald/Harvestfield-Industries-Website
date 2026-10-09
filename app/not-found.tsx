import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { heroImage } from '@/lib/site-data'

export default function NotFound() {
  return (
    <section className="hf-grain relative flex min-h-[90vh] items-center overflow-hidden rounded-b-[32px] bg-hf-deep px-5 pb-20 pt-40 text-white lg:rounded-b-[56px] lg:px-10">
      <img src={heroImage} alt="" className="hf-hero-image absolute inset-0 h-full w-full object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-hf-deep via-hf-deep/80 to-hf-deep/30" />
      <div aria-hidden className="hf-aurora" />
      <div className="relative mx-auto w-full max-w-[1320px]">
        <p className="hf-rise eyebrow text-hf-lime">Error 404</p>
        <h1 className="hf-rise mt-6 max-w-3xl text-5xl font-semibold leading-[1] tracking-[-0.05em] sm:text-7xl">This field is <em className="font-serif font-normal text-hf-lime">still fallow.</em></h1>
        <p className="hf-rise mt-6 max-w-md leading-7 text-white/70">The page you are looking for has moved or never existed. Let&apos;s get you back to solid ground.</p>
        <div className="hf-rise mt-9 flex flex-wrap gap-4">
          <Link href="/" className="hf-btn hf-btn-lime px-6 py-4 text-sm">Back to home <ArrowUpRight size={16} /></Link>
          <Link href="/contact" className="hf-btn hf-btn-glass px-6 py-4 text-sm">Contact us</Link>
        </div>
      </div>
    </section>
  )
}
