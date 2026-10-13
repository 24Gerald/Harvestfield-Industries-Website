'use client'

import { useSearchParams } from 'next/navigation'
import { type FormEvent, Suspense, useState } from 'react'
import { ArrowUpRight, CircleCheck, Send } from 'lucide-react'
import { contact, contactTopics } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const field = 'w-full rounded-2xl border border-hf-line bg-white/80 px-4 py-3 text-[16px] text-hf-forest sm:py-3.5 sm:text-[15px] shadow-[inset_0_1px_2px_rgba(23,60,43,.05)] outline-none transition-all duration-300 placeholder:text-hf-sage/60 hover:border-hf-sage/50 focus:border-hf-gold focus:bg-white focus:ring-4 focus:ring-hf-gold/15'
const label = 'mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-hf-slate sm:mb-2'

/** No backend yet: the form opens the visitor's email app with the message ready to send. */
export function ContactForm({ topic, item }: { topic?: string; item?: string }) {
  const [sent, setSent] = useState(false)
  const initialTopic = contactTopics.some((option) => option.value === topic) ? topic : 'general'

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (key: string) => String(data.get(key) ?? '').trim()
    const topicLabel = contactTopics.find((option) => option.value === value('topic'))?.label ?? 'General enquiry'
    const lines = [`Name: ${value('name')}`, `Email: ${value('email')}`]
    if (value('phone')) lines.push(`Phone: ${value('phone')}`)
    if (value('organisation')) lines.push(`Organisation: ${value('organisation')}`)
    lines.push('', value('message'))
    const body = lines.join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`${topicLabel}: website enquiry`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="hf-pop flex min-h-[23.75rem] flex-col sm:min-h-[520px] items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-hf-lime text-hf-forest shadow-[0_20px_40px_-15px_rgba(215,227,107,.9)]"><CircleCheck size={28} /></span>
        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Almost there</h3>
        <p className="mt-3 max-w-sm leading-7 text-hf-sage">Your email app should now be open with your message ready to send. If it didn&apos;t open, email us at <a href={`mailto:${contact.email}`} className="font-bold text-hf-forest underline decoration-hf-gold underline-offset-4">{contact.email}</a> or call <a href={contact.phoneHref} className="font-bold text-hf-forest">{contact.phone}</a>.</p>
        <button type="button" onClick={() => setSent(false)} className="hf-btn hf-btn-outline mt-8 px-6 py-3.5 text-sm">Write another message</button>
      </div>
    )
  }

  return (
    <form key={`${topic}-${item}`} onSubmit={onSubmit} className="grid gap-5 sm:gap-6">
      <fieldset>
        <legend className={label}>What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((option) => (
            <label key={option.value} className="cursor-pointer">
              <input type="radio" name="topic" value={option.value} defaultChecked={option.value === initialTopic} className="peer sr-only" />
              <span className={cn('block rounded-full border border-hf-line bg-white/70 px-3.5 py-2 text-[13px] font-semibold sm:px-4 sm:py-2.5 sm:text-sm transition-all duration-300 hover:border-hf-sage/60', 'peer-checked:border-hf-forest peer-checked:bg-hf-forest peer-checked:text-white peer-checked:shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_8px_20px_-10px_rgba(23,60,43,.8)] peer-focus-visible:ring-4 peer-focus-visible:ring-hf-gold/30')}>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div><label htmlFor="name" className={label}>Full name</label><input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} /></div>
        <div><label htmlFor="email" className={label}>Email</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} /></div>
        <div><label htmlFor="phone" className={label}>Phone <span className="font-medium normal-case tracking-normal text-hf-sage">(optional)</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0800 000 0000" className={field} /></div>
        <div><label htmlFor="organisation" className={label}>Farm or company <span className="font-medium normal-case tracking-normal text-hf-sage">(optional)</span></label><input id="organisation" name="organisation" autoComplete="organization" placeholder="Where you work" className={field} /></div>
      </div>
      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required rows={5} defaultValue={item ? `I'd like to know more about ${item}.` : ''} placeholder="Tell us what you grow, what you need, or how we can help." className={cn(field, 'resize-y')} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs leading-5 text-hf-sage">Someone will get back to you the same day.</p>
        <button type="submit" className="hf-btn hf-btn-gold px-7 py-4 text-sm"><Send size={15} /> Send message <ArrowUpRight size={15} /></button>
      </div>
    </form>
  )
}

function ContactFormFromQuery() {
  const params = useSearchParams()
  return <ContactForm topic={params.get('topic') ?? undefined} item={params.get('item') ?? undefined} />
}

/** Pre-fills the form from links like /contact?topic=products&item=Herbicides, read in the browser so the page can be static. */
export function ContactFormWithQuery() {
  return (
    <Suspense fallback={<ContactForm />}>
      <ContactFormFromQuery />
    </Suspense>
  )
}
