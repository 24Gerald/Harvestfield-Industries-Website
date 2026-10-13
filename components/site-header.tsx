'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Mail, Phone } from 'lucide-react'
import { contact, heroImage, logoUrl, navLinks, products } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`)
const mobileLinks = [{ href: '/', label: 'Home' }, ...navLinks, { href: '/contact', label: 'Contact' }]
const easing = 'ease-[cubic-bezier(.22,1,.36,1)]'

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const [pillReady, setPillReady] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const progressRef = useRef<HTMLSpanElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  // Close everything when the route changes (back/forward included).
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
    setProductsOpen(false)
    setHidden(false)
  }

  const activeIndex = navLinks.findIndex((link) => isActive(pathname, link.href))
  const pillIndex = hovered ?? (activeIndex >= 0 ? activeIndex : null)

  // Compact on scroll, hide while scrolling down, reveal on scroll up, and track reading progress.
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`)
      setScrolled(y > 24)
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > 240)
        lastY = y
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  // Slide the highlight pill to the hovered (or current) nav item.
  useLayoutEffect(() => {
    const measure = () => {
      const item = pillIndex == null ? null : itemRefs.current[pillIndex]
      setPill(item ? { left: item.offsetLeft, width: item.offsetWidth } : null)
    }
    measure()
    const frame = requestAnimationFrame(() => setPillReady(true))
    const observer = new ResizeObserver(measure)
    if (navRef.current) observer.observe(navRef.current)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [pillIndex])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      setProductsOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [menuOpen])

  const openProducts = () => {
    window.clearTimeout(closeTimer.current)
    setProductsOpen(true)
  }
  const closeProductsSoon = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 180)
  }

  const tucked = hidden && !menuOpen && !productsOpen

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-hf-forest">Skip to content</a>

      <header ref={headerRef} className={cn('fixed inset-x-0 top-0 z-50 transition-transform duration-500', easing, tucked && '-translate-y-[130%]')}>
        {/* Announcement strip, folds away once the page scrolls */}
        <div className={cn('grid transition-[grid-template-rows] duration-500', easing, scrolled || menuOpen ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]')}>
          <div className="overflow-hidden">
            <div className="relative overflow-hidden bg-hf-deep text-white/85">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/4 animate-[hf-shimmer_9s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="relative mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-2 text-[12px] lg:px-10">
                <Link href="/free-trade-zone" className="group flex min-w-0 items-center gap-2.5 font-semibold hover:text-white">
                  <span className="hf-ping h-2 w-2 shrink-0 rounded-full bg-hf-lime text-hf-lime" />
                  <span className="truncate"><span className="hidden sm:inline">NEPZA licence granted: </span>the Harvestfield Free Trade Zone is open for business</span>
                  <ArrowUpRight size={13} className="shrink-0 text-hf-lime transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <div className="hidden shrink-0 items-center gap-6 md:flex">
                  <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-hf-lime"><Phone size={12} /> {contact.phone}</a>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-hf-lime"><Mail size={12} /> {contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cn('px-3 transition-[padding] duration-500 sm:px-5', scrolled ? 'pt-2' : 'pt-3')}>
          <div className="relative mx-auto max-w-[1320px]">
            <div className={cn('hf-glass relative flex items-center justify-between gap-3 rounded-2xl pl-4 pr-2 transition-[padding] duration-500 sm:pl-5 lg:rounded-full lg:pl-6', scrolled ? 'py-1.5' : 'py-2 sm:py-2.5')}>
              <Link href="/" aria-label="Harvestfield Industries Limited home" className="shrink-0 transition-transform duration-300 hover:scale-[1.03]">
                <img src={logoUrl} alt="Harvestfield Industries Limited" className={cn('w-auto object-contain transition-[height] duration-500', scrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-12')} />
              </Link>

              <nav aria-label="Main" className="hidden xl:block">
                <ul ref={navRef} className="relative flex items-center" onPointerLeave={() => setHovered(null)}>
                  <span
                    aria-hidden
                    className={cn('absolute top-1/2 h-10 -translate-y-1/2 rounded-full bg-hf-forest/[0.07] ring-1 ring-hf-forest/[0.06]', easing, pillReady && 'transition-[left,width,opacity] duration-500')}
                    style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
                  />
                  {navLinks.map((link, index) => {
                    const active = index === activeIndex
                    const isProducts = link.href === '/products'
                    return (
                      <li
                        key={link.href}
                        ref={(el) => { itemRefs.current[index] = el }}
                        className="relative z-10 flex items-center"
                        onPointerEnter={() => {
                          setHovered(index)
                          if (isProducts) openProducts()
                        }}
                        onPointerLeave={isProducts ? closeProductsSoon : undefined}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? 'page' : undefined}
                          className={cn('relative block whitespace-nowrap py-2.5 text-[15px] font-semibold transition-colors duration-300', isProducts ? 'pl-4' : 'px-4', active ? 'text-hf-forest' : 'text-hf-leaf/75 hover:text-hf-forest')}
                        >
                          {link.label}
                          {active && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-hf-gold" />}
                        </Link>
                        {isProducts && (
                          <button
                            type="button"
                            aria-label="Show product categories"
                            aria-expanded={productsOpen}
                            aria-controls="products-menu"
                            onClick={() => (productsOpen ? setProductsOpen(false) : openProducts())}
                            className="flex h-9 items-center pl-1 pr-3.5 text-hf-leaf/70 transition-colors hover:text-hf-forest"
                          >
                            <ChevronDown size={15} className={cn('transition-transform duration-300', productsOpen && 'rotate-180')} />
                          </button>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="flex items-center gap-2">
                <Link href="/contact" className="hf-btn hf-btn-gold hidden px-6 py-3 text-[14px] lg:inline-flex">
                  Get in touch <ArrowUpRight size={15} />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full bg-hf-forest text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)] transition-transform active:scale-95 xl:hidden"
                >
                  <span className={cn('absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300', menuOpen ? 'rotate-45' : '-translate-y-[4px]')} />
                  <span className={cn('absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300', menuOpen ? '-rotate-45' : 'translate-y-[4px]')} />
                </button>
              </div>

              {/* Reading progress */}
              <span aria-hidden className="pointer-events-none absolute inset-x-8 bottom-0 h-[2px] overflow-hidden rounded-full">
                <span ref={progressRef} className="block h-full origin-left bg-gradient-to-r from-hf-gold via-hf-lime to-hf-gold" style={{ transform: 'scaleX(0)' }} />
              </span>
            </div>

            {/* Products mega menu: a sibling of the bar, since a backdrop blur nested inside another can't see the page */}
            <div
              id="products-menu"
              onPointerEnter={openProducts}
              onPointerLeave={closeProductsSoon}
              className={cn(
                'hf-glass absolute left-1/2 top-[calc(100%+12px)] hidden w-[min(900px,calc(100vw-48px))] -translate-x-1/2 grid-cols-[1.55fr_1fr] gap-3 rounded-[28px] p-3 transition-[opacity,translate,visibility] duration-300 before:absolute before:inset-x-0 before:-top-4 before:h-4 xl:grid',
                easing,
                productsOpen ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0',
              )}
            >
              <ul className="grid content-center grid-cols-2 gap-1 p-1">
                {products.map((product, index) => {
                  const Icon = product.icon
                  return (
                    <li key={product.slug} className={cn('transition-[opacity,translate] duration-500', easing, productsOpen ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0')} style={{ transitionDelay: productsOpen ? `${60 + index * 35}ms` : '0ms' }}>
                      <Link href={`/products#${product.slug}`} onClick={() => setProductsOpen(false)} className="group flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-hf-forest/[0.05]">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hf-lime/70 to-hf-lime/15 text-hf-forest shadow-[inset_0_1px_0_rgba(255,255,255,.7)] ring-1 ring-hf-forest/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                          <Icon size={19} />
                        </span>
                        <span>
                          <span className="block text-[15px] font-bold text-hf-forest">{product.name}</span>
                          <span className="mt-0.5 block text-[12.5px] text-hf-sage">{product.type}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <Link href="/products#aflasafe" onClick={() => setProductsOpen(false)} className="group relative isolate flex min-h-[240px] flex-col justify-end overflow-hidden rounded-[22px] bg-hf-forest p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.15)]">
                <img src={heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_30%] opacity-60 transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-hf-deep via-hf-deep/75 to-hf-deep/10" />
                <span className="eyebrow text-hf-lime">Featured</span>
                <strong className="mt-3 block text-2xl font-semibold tracking-[-0.03em]">Aflasafe biocontrol</strong>
                <span className="mt-2 block text-sm leading-6 text-white/75">Cuts aflatoxin in maize and groundnut by up to 99%.</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-hf-lime">See Aflasafe <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu: opens as a circle growing out of the menu button */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn('fixed inset-0 z-40 transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] xl:hidden', !menuOpen && 'pointer-events-none')}
        style={{ clipPath: `circle(${menuOpen ? '150%' : '0%'} at calc(100% - 2.75rem) 2.75rem)` }}
      >
        <div className="hf-grain relative flex h-full flex-col overflow-y-auto bg-hf-deep px-6 pb-8 pt-28 text-white">
          <div aria-hidden className="hf-aurora opacity-80" />
          <nav aria-label="Mobile" className="relative">
            <ul>
              {mobileLinks.map((link, index) => {
                const active = link.href === '/' ? pathname === '/' : isActive(pathname, link.href)
                return (
                  <li
                    key={link.href}
                    className={cn('border-b border-white/10 transition-[opacity,translate] duration-700', easing, menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0')}
                    style={{ transitionDelay: menuOpen ? `${180 + index * 55}ms` : '0ms' }}
                  >
                    <Link href={link.href} onClick={() => setMenuOpen(false)} aria-current={active ? 'page' : undefined} className="group flex items-center gap-4 py-3">
                      <span className="w-6 text-[11px] font-bold tabular-nums text-hf-lime/70">0{index + 1}</span>
                      <span className={cn('text-[1.625rem] font-semibold tracking-[-0.03em] transition-colors', active ? 'text-hf-lime' : 'text-white group-hover:text-hf-lime')}>{link.label}</span>
                      <ArrowUpRight size={20} className="ml-auto text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hf-lime" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className={cn('relative mt-auto pt-10 transition-[opacity,translate] delay-500 duration-700', easing, menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0')}>
            <p className="eyebrow text-hf-lime">Talk to us</p>
            <a href={contact.phoneHref} className="mt-4 flex items-center gap-3 text-lg font-semibold"><Phone size={18} className="text-hf-lime" /> {contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="mt-2 flex items-center gap-3 text-white/75"><Mail size={18} className="text-hf-lime" /> {contact.email}</a>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="hf-btn hf-btn-gold mt-7 w-full px-6 py-4 text-[15px]">Get in touch <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </>
  )
}
