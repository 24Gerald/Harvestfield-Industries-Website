'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { heroVideo } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type HeroBackdropProps = {
  /** Positioning, fit and strength (e.g. opacity) of the backdrop */
  className: string
  /** The still image used when there is no video (or for visitors who keep the still) */
  image: string
  alt?: string
  style?: CSSProperties
}

const typeOf = (src: string) => (src.endsWith('.webm') ? 'video/webm' : 'video/mp4')

/**
 * Full-bleed hero background: the looping field video, with a still of its first frame showing while it loads.
 * Visitors who prefer reduced motion or have data saver on keep the still. The video pauses when scrolled away.
 */
export function HeroBackdrop({ className, image, alt = '', style }: HeroBackdropProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!heroVideo) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (!reduceMotion && !saveData) setEnabled(true)
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true // set as a property too: some browsers only autoplay when it is
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [enabled])

  if (!heroVideo) return <img src={image} alt={alt} className={cn('hf-hero-image', className)} style={style} />

  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={heroVideo.posterMobile} />
        <img src={heroVideo.poster} alt={alt} className={className} style={style} />
      </picture>
      {enabled && (
        <div aria-hidden className={cn('absolute inset-0 transition-opacity duration-1000', playing ? 'opacity-100' : 'opacity-0')}>
          <video
            ref={ref}
            className={className}
            style={style}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setPlaying(true)}
          >
            <source src={heroVideo.mobile} type={typeOf(heroVideo.mobile)} media="(max-width: 767px)" />
            <source src={heroVideo.desktop} type={typeOf(heroVideo.desktop)} />
          </video>
        </div>
      )}
    </>
  )
}
