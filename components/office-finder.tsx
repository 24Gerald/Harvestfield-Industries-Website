'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { contact, offices } from '@/lib/site-data'
import { cn, stagger } from '@/lib/utils'

// Rough north-to-south arrangement of the six zones; a schematic, not a map.
const tilePlacement: Record<string, string> = {
  'North West': 'col-span-3',
  'North East': 'col-span-3',
  'North Central': 'col-span-6',
  'South West': 'col-span-2',
  'South South': 'col-span-2',
  'South East': 'col-span-2',
}
const tileOrder = ['North West', 'North East', 'North Central', 'South West', 'South South', 'South East']

export function OfficeFinder() {
  const [selected, setSelected] = useState('South West')
  const zone = offices.find((office) => office.region === selected) ?? offices[0]
  const zoneNumber = offices.indexOf(zone) + 1

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hf-grain relative overflow-hidden rounded-[28px] bg-gradient-to-br from-hf-forest to-hf-night p-3 sm:rounded-[32px] sm:p-6">
        <div aria-hidden className="hf-aurora opacity-60" />
        <div aria-hidden className="hf-gridlines" />
        <p className="relative mb-3 px-2 pt-1 text-xs font-bold uppercase sm:mb-4 sm:pt-0 tracking-[0.2em] text-white/50">Choose your zone</p>
        <div role="group" aria-label="Geopolitical zones" className="relative grid grid-cols-6 gap-2.5 sm:gap-3">
          {tileOrder.map((region) => {
            const active = region === selected
            const office = offices.find((item) => item.region === region)
            return (
              <button
                key={region}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(region)}
                className={cn(
                  'group relative flex min-h-[84px] flex-col justify-between overflow-hidden rounded-2xl border p-3 text-left transition-all duration-500 sm:min-h-[140px] sm:p-5',
                  tilePlacement[region],
                  active
                    ? 'border-hf-lime/60 bg-gradient-to-br from-hf-lime to-[#b9c94a] text-hf-forest shadow-[inset_0_1px_0_rgba(255,255,255,.6),0_20px_40px_-15px_rgba(215,227,107,.55)]'
                    : 'border-white/10 bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/[0.12]',
                )}
              >
                <MapPin size={16} className={cn('transition-transform duration-500 group-hover:-translate-y-0.5', active ? 'text-hf-forest' : 'text-hf-lime')} />
                <span>
                  <span className="block text-sm font-bold leading-tight sm:text-lg">{region}</span>
                  <span className={cn('mt-1 hidden text-xs sm:block', active ? 'text-hf-forest/70' : 'text-white/50')}>{office?.cities.join(' · ')}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div key={zone.region} className="hf-pop hf-glass flex flex-col rounded-[28px] p-5 sm:rounded-[32px] sm:p-10" aria-live="polite">
        <p className="eyebrow">Zone 0{zoneNumber} of 06</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:mt-4 sm:text-5xl">{zone.region}</h3>
        <p className="mt-3 text-[15px] leading-6 text-hf-sage sm:mt-4 sm:text-base sm:leading-7">Walk in to one of our offices, call ahead to check stock, or send us a message and someone will get back to you the same day.</p>
        <ul className="mt-5 grid gap-2 sm:mt-8 sm:gap-3">
          {zone.cities.map((city, index) => (
            <li key={city} className="hf-pop flex items-center gap-3 rounded-2xl border border-hf-line bg-white/70 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-4" style={stagger(index, 70, 120)}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hf-forest text-hf-lime sm:h-9 sm:w-9"><MapPin size={15} /></span>
              <span className="text-base font-semibold sm:text-lg">{city}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-6 sm:pt-8">
          <a href={contact.phoneHref} className="hf-btn hf-btn-forest px-6 py-3.5 text-sm"><Phone size={15} /> Call ahead</a>
          <Link href={`/contact?topic=offices&item=${encodeURIComponent(zone.region)}`} className="hf-btn hf-btn-outline px-6 py-3.5 text-sm">Send a message <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
