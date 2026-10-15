'use client'

import { type CSSProperties, useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { type Leader, leaderPhoto } from '@/lib/leadership'
import { cn } from '@/lib/utils'

const roleClass = 'text-[10px] font-extrabold uppercase tracking-[0.14em] text-hf-moss sm:text-[11px]'

/** A short card (photo, role, name, one-line intro); "Read more" opens the full profile in a dialog. */
export function LeaderCard({ leader, className, style }: { leader: Leader; className?: string; style?: CSSProperties }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const photo = leaderPhoto(leader.slug)
  const nameId = `${leader.slug}-name`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const unlock = () => { document.documentElement.style.overflow = '' }
    dialog.addEventListener('close', unlock)
    return () => dialog.removeEventListener('close', unlock)
  }, [])

  const open = () => {
    document.documentElement.style.overflow = 'hidden'
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()

  return (
    <article
      className={cn('hf-reveal hf-card hf-spotlight hf-spotlight-light group flex w-full flex-col rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-white/60 p-2.5 shadow-[inset_0_1px_0_#fff,0_20px_40px_-30px_rgba(23,60,43,.4)] max-sm:flex-row max-sm:items-center max-sm:gap-4 max-sm:rounded-3xl', className)}
      style={style}
    >
      <button type="button" onClick={open} aria-label={`Read ${leader.name}’s profile`} className="relative aspect-square overflow-hidden rounded-[22px] bg-hf-forest max-sm:aspect-[4/5] max-sm:w-[5.5rem] max-sm:shrink-0 max-sm:rounded-2xl">
        <img src={photo} alt={leader.name} loading="lazy" className="h-full w-full object-cover object-[center_25%] transition duration-700 group-hover:scale-105" />
      </button>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 max-sm:min-w-0 max-sm:p-0 max-sm:pr-1">
        <p className={roleClass}>{leader.role}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-[-0.02em] sm:mt-2 sm:text-xl">{leader.name}</h3>
        {leader.credentials && <p className="text-xs font-semibold text-hf-sage">{leader.credentials}</p>}
        <p className="mt-2 flex-1 text-[13px] leading-5 text-hf-sage max-sm:line-clamp-3 sm:text-sm sm:leading-6">{leader.intro}</p>
        <button type="button" onClick={open} className="hf-link mt-3 w-fit text-[13px] sm:mt-4 sm:text-sm">
          Read more <ArrowUpRight size={15} />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={nameId}
        onClick={(event) => { if (event.target === event.currentTarget) close() }}
        className="m-auto max-h-[min(90vh,52rem)] w-[min(58rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-[28px] border-0 bg-hf-cream p-0 text-hf-forest shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)] backdrop:bg-hf-night/70 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 open:duration-300 max-sm:mb-0 max-sm:max-h-[88dvh] max-sm:w-full max-sm:rounded-b-none max-sm:open:slide-in-from-bottom-10 max-sm:open:zoom-in-100"
      >
        {/* Portrait sits at the top of a full-height brand column; only the text column scrolls */}
        <div className="flex max-h-[inherit]">
          <div className="hidden w-64 shrink-0 bg-gradient-to-b from-hf-forest to-hf-night p-5 sm:block">
            <img src={photo} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover object-[center_25%] shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/15" />
          </div>
          <div className="relative min-w-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 sm:px-10 sm:pb-10">
            <div className="sticky top-0 z-10 -mx-5 flex justify-end bg-gradient-to-b from-hf-cream via-hf-cream/95 to-hf-cream/0 px-3 pb-3 pt-3 sm:-mx-10 sm:px-5 sm:pt-5">
              <button type="button" onClick={close} aria-label="Close profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-hf-forest/[0.07] text-hf-forest transition-colors hover:bg-hf-forest hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4 sm:block">
              <img src={photo} alt="" className="h-16 w-16 shrink-0 rounded-2xl object-cover object-[center_25%] sm:hidden" />
              <div>
                <p className={roleClass}>{leader.role}</p>
                <h3 id={nameId} className="mt-1.5 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:mt-3 sm:text-4xl">{leader.name}</h3>
                {leader.credentials && <p className="mt-1 text-sm font-semibold text-hf-sage">{leader.credentials}</p>}
              </div>
            </div>
            <div className="mt-5 space-y-4 border-t border-hf-line pt-5 text-[1rem] leading-7 text-hf-slate sm:mt-7 sm:pt-7 sm:text-[0.9375rem]">
              {leader.bio.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </dialog>
    </article>
  )
}
