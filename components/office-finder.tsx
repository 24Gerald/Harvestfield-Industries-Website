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
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hf-grain relative overflow-hidden rounded-[32px] bg-gradient-to-br from-hf-forest to-hf-night p-4 sm:p-6">
        <div aria-hidden className="hf-aurora opacity-60" />
        <div aria-hidden className="hf-gridlines" />
        <p className="relative mb-4 px-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Choose your zone</p>
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
                  'group relative flex min-h-[110px] flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 sm:min-h-[140px] sm:p-5',
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

      <div key={zone.region} className="hf-pop hf-glass flex flex-col rounded-[32px] p-7 sm:p-10" aria-live="polite">
        <p className="eyebrow">Zone 0{zoneNumber} of 06</p>
        <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{zone.region}</h3>
        <p className="mt-4 leading-7 text-hf-sage">Walk in to one of our offices, call ahead to check stock, or send us a message and someone will get back to you the same day.</p>
        <ul className="mt-8 grid gap-3">
          {zone.cities.map((city, index) => (
            <li key={city} className="hf-pop flex items-center gap-4 rounded-2xl border border-hf-line bg-white/70 px-5 py-4" style={stagger(index, 70, 120)}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hf-forest text-hf-lime"><MapPin size={15} /></span>
              <span className="text-lg font-semibold">{city}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a href={contact.phoneHref} className="hf-btn hf-btn-forest px-6 py-3.5 text-sm"><Phone size={15} /> Call ahead</a>
          <Link href={`/contact?topic=offices&item=${encodeURIComponent(zone.region)}`} className="hf-btn hf-btn-outline px-6 py-3.5 text-sm">Send a message <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
