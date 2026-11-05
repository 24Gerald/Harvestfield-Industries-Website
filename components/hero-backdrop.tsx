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
  /** Extra classes for the layer holding the video, e.g. a z-index when the backdrop sits behind unpositioned content */
  layerClassName?: string
  /** Wait until the backdrop is close to the screen before loading the video (for backdrops further down a page) */
  lazy?: boolean
  /** Only load and play while true, e.g. while the menu holding the backdrop is open. Pauses when it turns false. */
  active?: boolean
}

const typeOf = (src: string) => (src.endsWith('.webm') ? 'video/webm' : 'video/mp4')

/**
 * Full-bleed background: the looping field video, with a still of its first frame showing while it loads.
 * Visitors who prefer reduced motion or have data saver on keep the still. The video pauses when scrolled away.
 */
export function HeroBackdrop({ className, image, alt = '', style, layerClassName, lazy = false, active = true }: HeroBackdropProps) {
  const posterRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [motionOk, setMotionOk] = useState(false)
  const [near, setNear] = useState(!lazy)
  // Stays true once the video has been asked for, so closing a menu pauses it instead of throwing it away
  const [wanted, setWanted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!heroVideo) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (!reduceMotion && !saveData) setMotionOk(true)
  }, [])

  useEffect(() => {
    const poster = posterRef.current
    if (!motionOk || near || !poster) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNear(true) }, { rootMargin: '300px 0px' })
    observer.observe(poster)
    return () => observer.disconnect()
  }, [motionOk, near])

  useEffect(() => {
    if (motionOk && near && active) setWanted(true)
  }, [motionOk, near, active])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true // set as a property too: some browsers only autoplay when it is
    if (!active) {
      video.pause()
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [wanted, active])

  if (!heroVideo) return <img src={image} alt={alt} className={cn('hf-hero-image', className)} style={style} />

  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={heroVideo.posterMobile} />
        <img ref={posterRef} src={heroVideo.poster} alt={alt} className={className} style={style} />
      </picture>
      {wanted && (
        <div aria-hidden className={cn('absolute inset-0 transition-opacity duration-1000', layerClassName, playing ? 'opacity-100' : 'opacity-0')}>
          <video
            ref={videoRef}
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
