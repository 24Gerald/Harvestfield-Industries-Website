import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin, MessageSquare, Phone } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { OfficeFinder } from '@/components/office-finder'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { contact } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Our offices',
  description: '26 Harvestfield offices and warehouses across all six geopolitical zones of Nigeria.',
}

const ways = [
  { icon: MapPin, title: 'Walk in', text: 'Visit any of our 26 offices and warehouses across Nigeria.', action: 'Choose your zone', href: '#finder' },
  { icon: Phone, title: 'Call ahead', text: 'Check stock and pricing before you travel.', action: contact.phone, href: contact.phoneHref },
  { icon: MessageSquare, title: 'Send a message', text: 'Someone will get back to you the same day.', action: 'Write to us', href: '/contact?topic=offices' },
]

export default function OfficesPage() {
  return (
    <>
      <PageHero
        crumb="Our offices"
        eyebrow="Our offices"
        title={<>We are already <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">in your state.</em></>}
        description="26 offices across all six geopolitical zones. Walk in, call ahead, or send us a message and someone will get back to you the same day."
        focus="60% 70%"
        aside={
          <div className="grid grid-cols-2 gap-3">
            <div className="hf-glass-dark rounded-3xl p-6"><strong className="block text-5xl font-bold tracking-[-0.05em]" data-count>26</strong><span className="mt-1 block text-sm text-white/60">Offices & warehouses</span></div>
            <div className="hf-glass-dark rounded-3xl p-6"><strong className="block text-5xl font-bold tracking-[-0.05em]" data-count>6</strong><span className="mt-1 block text-sm text-white/60">Geopolitical zones</span></div>
          </div>
        }
      />

      <section id="finder" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Find us" title={<>Six zones. <em className="font-serif font-normal text-hf-moss">One team.</em></>} text="Select your geopolitical zone to see the cities where we operate." className="mb-10" />
        <div className="hf-reveal"><OfficeFinder /></div>
      </section>

      <section className="bg-hf-sand px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading eyebrow="Three ways to reach us" title={<>However suits you <em className="font-serif font-normal text-hf-moss">best.</em></>} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ways.map(({ icon: Icon, title, text, action, href }, index) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hf-forest to-hf-leaf text-hf-lime"><Icon size={20} /></span>
                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 leading-7 text-hf-sage">{text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">{action} <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </>
              )
              const className = 'hf-reveal hf-card hf-spotlight hf-spotlight-light group block rounded-3xl border border-white/80 bg-gradient-to-b from-white/95 to-white/55 p-8 shadow-[inset_0_1px_0_#fff]'
              return href.startsWith('/')
                ? <Link key={title} href={href} className={className} style={stagger(index, 90)}>{content}</Link>
                : <a key={title} href={href} className={className} style={stagger(index, 90)}>{content}</a>
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
