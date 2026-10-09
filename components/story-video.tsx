'use client'

import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'

export function StoryVideoButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(true)} className="group flex items-center gap-3 px-3 py-3 text-sm font-semibold text-white">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-hf-lime group-hover:bg-hf-lime group-hover:text-hf-forest">
          <span aria-hidden className="hf-ping absolute inset-0 rounded-full text-white/25" />
          <Play size={14} fill="currentColor" className="relative" />
        </span>
        See our story
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex animate-in items-center justify-center bg-hf-night/90 p-5 backdrop-blur-sm fade-in duration-300" role="dialog" aria-modal="true" aria-label="Our story" onClick={() => setOpen(false)}>
          <div className="relative aspect-video w-full max-w-3xl animate-in overflow-hidden rounded-3xl bg-hf-leaf shadow-2xl zoom-in-95 duration-500" onClick={(event) => event.stopPropagation()}>
            <img src="/harvest-hero.png" alt="Harvestfield farm story" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-hf-lime text-hf-forest"><Play fill="currentColor" /></span>
              <p className="mt-4 text-sm font-bold">Our story is growing</p>
            </div>
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50" aria-label="Close story" autoFocus><X size={20} /></button>
          </div>
        </div>
      )}
    </>
  )
}
