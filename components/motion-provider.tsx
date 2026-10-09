'use client'

import { useEffect } from 'react'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/** Counts the number inside an element (e.g. "$30M+") up from zero, keeping its prefix/suffix. */
function countUp(el: HTMLElement) {
  const match = (el.textContent ?? '').match(/^(\D*)([\d,]+)(.*)$/)
  if (!match) return
  const [, prefix, digits, suffix] = match
  const target = Number(digits.replace(/,/g, ''))
  const grouped = digits.includes(',')
  const duration = 1600
  const start = performance.now()
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const value = Math.round(target * easeOutExpo(progress))
    el.textContent = `${prefix}${grouped ? value.toLocaleString('en-US') : value}${suffix}`
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/**
 * Site-wide motion: reveals `.hf-reveal` elements as they scroll into view, counts up `[data-count]`
 * numbers, and feeds the pointer position to `.hf-spotlight` cards. Watches the DOM so content
 * mounted after a client-side navigation is picked up too.
 */
export function MotionProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        countObserver.unobserve(entry.target)
        if (!reduceMotion) countUp(entry.target as HTMLElement)
      })
    }, { threshold: 0.6 })

    const scan = (root: ParentNode) => {
      root.querySelectorAll('.hf-reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el))
      root.querySelectorAll('[data-count]:not([data-counted])').forEach((el) => {
        el.setAttribute('data-counted', '')
        countObserver.observe(el)
      })
    }
    scan(document)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return
        if (node.matches('.hf-reveal, [data-count]')) scan(node.parentElement ?? document)
        else scan(node)
      }))
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.('.hf-spotlight') as HTMLElement | null
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      revealObserver.disconnect()
      countObserver.disconnect()
      mutationObserver.disconnect()
      document.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return null
}
