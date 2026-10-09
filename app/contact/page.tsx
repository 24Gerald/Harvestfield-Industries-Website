import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { ContactFormWithQuery } from '@/components/contact-form'
import { PageHero } from '@/components/page-hero'
import { contact } from '@/lib/site-data'
import { stagger } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to Harvestfield Industries about products, partnerships or the Harvestfield Free Trade Zone.',
}

const channels = [
  { icon: Phone, label: 'Call us', value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: 'Email us', value: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: 'Visit us', value: '26 offices in 6 zones', href: '/offices' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title={<>Let&apos;s grow <em className="font-serif font-normal tracking-[-0.02em] text-hf-lime">together.</em></>}
        description="Walk in, call ahead, or send us a message and someone will get back to you the same day."
        focus="75% 30%"
      />

      <section className="relative z-10 mx-auto -mt-14 grid max-w-[1320px] gap-6 px-5 pb-24 lg:-mt-20 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:pb-32">
        <div className="grid content-start gap-4">
          {channels.map(({ icon: Icon, label, value, href }, index) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-hf-forest to-hf-leaf text-hf-lime transition-transform duration-500 group-hover:-rotate-6"><Icon size={19} /></span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-hf-sage">{label}</span>
                  <span className="mt-1 block truncate text-lg font-semibold">{value}</span>
                </span>
                <ArrowUpRight size={18} className="ml-auto shrink-0 text-hf-sage transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hf-forest" />
              </>
            )
            const className = 'hf-rise hf-glass hf-spotlight hf-spotlight-light group flex items-center gap-4 rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1'
            return href.startsWith('/')
              ? <Link key={label} href={href} className={className} style={stagger(index + 3, 90)}>{inner}</Link>
              : <a key={label} href={href} className={className} style={stagger(index + 3, 90)}>{inner}</a>
          })}
          <div className="hf-rise hf-grain relative overflow-hidden rounded-3xl bg-hf-deep p-7 text-white" style={stagger(6, 90)}>
            <div aria-hidden className="hf-aurora opacity-70" />
            <p className="eyebrow relative text-hf-lime">Free Trade Zone enquiries</p>
            <p className="relative mt-3 leading-7 text-white/70">Manufacturers, packagers, logistics providers and healthcare MSMEs looking at the Harvestfield FTZ: choose &ldquo;Free Trade Zone&rdquo; in the form and we will route you to the right team.</p>
          </div>
        </div>

        <div className="hf-rise hf-glass rounded-[32px] p-6 sm:p-10" style={stagger(4, 90)}>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Send us a message</h2>
          <p className="mb-8 mt-2 text-hf-sage">Fields marked as optional can be left blank.</p>
          <ContactFormWithQuery />
        </div>
      </section>
    </>
  )
}
