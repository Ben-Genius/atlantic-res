'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Phone, ArrowRight } from 'lucide-react'
import { navigation } from '@/lib/constants'
import { cn } from '@/lib/utils'

const navImages: Record<string, string> = {
  '/': '/images/hero-main.png',
  '/expertise': '/images/hero-expertise.png',
  '/services': '/images/hero-services.png',
  '/news-updates': '/images/hero-news.png',
  '/portfolio': '/images/hero-portfolio.png',
  '/impact': '/images/hero-impact.png',
  '/contact': '/images/hero-contact.png',
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const overlayRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({})
  const activeImg = useRef<string>('/')
  const hasOpened = useRef(false)

  /* ─── scroll listener ───────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ─── build open/close timeline ─────────────────────────── */
  useGSAP(() => {
    if (!overlayRef.current) return

    // Hide overlay: slide it fully above the viewport
    gsap.set(overlayRef.current, { yPercent: -100 })
    gsap.set('.menu-nav-inner', { yPercent: -115 })
    gsap.set('.menu-image-panel', { scale: 1.06, opacity: 0 })
    gsap.set('.menu-meta', { opacity: 0, y: 22 })

    const tl = gsap.timeline({ paused: true })

    tl.to(overlayRef.current, {
      yPercent: 0,
      duration: 0.85,
      ease: 'power4.out',
    })
      .to('.menu-nav-inner', {
        yPercent: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
      }, '-=0.45')
      .to('.menu-image-panel', {
        scale: 1, opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
      }, '-=0.75')
      .to('.menu-meta', {
        opacity: 1, y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
      }, '-=0.35')

    tlRef.current = tl
  }, { scope: overlayRef })

  /* ─── play / reverse + lenis stop/start ─────────────────── */
  useEffect(() => {
    if (!tlRef.current) return

    let resetId: ReturnType<typeof setTimeout> | undefined

    if (isMenuOpen) {
      hasOpened.current = true
      tlRef.current.play()
      window.dispatchEvent(new Event('lenis:stop'))
    } else {
      // skip reverse on initial mount — timeline has never played
      if (!hasOpened.current) return
      tlRef.current.reverse()
      window.dispatchEvent(new Event('lenis:start'))

      // after reverse finishes, silently reset image + hover state
      resetId = setTimeout(() => {
        setHoveredItem(null)
        if (activeImg.current !== '/') {
          const prev = imageRefs.current[activeImg.current]
          const def = imageRefs.current['/']
          if (prev) gsap.set(prev, { opacity: 0, scale: 1 })
          if (def) gsap.set(def, { opacity: 1, scale: 1 })
          activeImg.current = '/'
        }
      }, 1100)
    }

    return () => clearTimeout(resetId)
  }, [isMenuOpen])

  /* ─── image crossfade ────────────────────────────────────── */
  const changeImage = useCallback((href: string) => {
    const target = navImages[href] ? href : '/'
    if (target === activeImg.current) return

    const prev = imageRefs.current[activeImg.current]
    const next = imageRefs.current[target]

    if (prev) gsap.to(prev, { opacity: 0, scale: 1.04, duration: 0.45, ease: 'power2.inOut' })
    if (next) gsap.fromTo(next,
      { opacity: 0, scale: 1.07 },
      { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }
    )
    activeImg.current = target
  }, [])

  /* ─── nav hover handlers ─────────────────────────────────── */
  const handleNavEnter = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setHoveredItem(href)
    changeImage(href)
    gsap.to(e.currentTarget, { x: 18, duration: 0.45, ease: 'power3.out' })
  }, [changeImage])

  const handleNavLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.75)' })
  }, [])

  const handleNavGroupLeave = useCallback(() => {
    setHoveredItem(null)
    changeImage('/')
  }, [changeImage])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {/* ─── Fixed header bar ─────────────────────────── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div className="mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between py-4">

            <Link href="/" onClick={closeMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <object
                data="/svg/logoA.svg"
                type="image/svg+xml"
                aria-label="Atlantic Catering & Logistics"
                style={{ width: 130, height: 78, pointerEvents: 'none', display: 'block' }}
              />
            </Link>

            <button
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="rounded-md bg-green"
              style={{ border: 'none', cursor: 'pointer', padding: '7px', lineHeight: 0 }}
            >
              <svg
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  'h-6 w-6 transform origin-center transition-transform duration-300 ease-linear',
                  isMenuOpen ? 'rotate-45' : ''
                )}
                style={{ color: isMenuOpen ? 'white' : scrolled ? 'white' : 'white' }}
              >
                <path d="M12.0005 5.49894V6.99894H8.50047V5.49894H12.0005Z" fill="currentColor" />
                <path d="M3.5 5.49756V6.99756L0 6.99756L6.55637e-08 5.49756L3.5 5.49756Z" fill="currentColor" />
                <path d="M6.50106 11.9982H5.00106V8.49824H6.50106V11.9982Z" fill="currentColor" />
                <path d="M6.49968 3.49777L4.99968 3.49777L4.99968 -0.00222778L6.49968 -0.00222759L6.49968 3.49777Z" fill="currentColor" />
              </svg>
            </button>

            <div className="hidden md:flex items-center">
              <Link
                href="tel:+233501502441"
                className={cn(
                  'relative flex items-center justify-between gap-3 p-2 overflow-hidden group/btn rounded-md',
                  'bg-green text-white font-bold uppercase tracking-[0.2em] text-[11px]',
                  'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  'hover:bg-gold'
                )}
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <span className="flex items-center gap-2">
                  eCommerce
                </span>
                <div className="relative w-7 h-7 flex items-center justify-center bg-white/20 rounded-sm overflow-hidden">
                  <ArrowRight size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                  <ArrowRight size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Full-screen menu overlay ─────────────────────── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: '#fef6e6ff',
          display: 'flex', overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Left — nav items */}
        <div style={{
          flex: '0 0 50%',
          display: 'flex', flexDirection: 'column',
          padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 4vw, 4rem) 3rem clamp(2rem, 7vw, 7rem)',
        }}>

          <nav
            style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}
            onMouseLeave={handleNavGroupLeave}
          >
            {navigation.map((item) => (
              <div key={item.href} style={{ overflow: 'hidden' }}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="menu-nav-inner block"
                  style={{
                    fontFamily: 'Antonio, sans-serif',
                    fontSize: '5.7vw',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    letterSpacing: '-0.35vw',
                    lineHeight: '120%',
                    marginTop: 0,
                    marginBottom: 0,
                    color: hoveredItem === item.href ? '#35b435' : '#35b435',
                    opacity: hoveredItem === null ? 1 : hoveredItem === item.href ? 1 : 0.2,
                    textDecoration: 'none',
                    display: 'block',
                    paddingBottom: '0.15em',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                    transition: 'color 0.22s ease, opacity 0.22s ease',
                    willChange: 'transform',
                  }}
                  onMouseEnter={(e) => handleNavEnter(e, item.href)}
                  onMouseLeave={handleNavLeave}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Footer row */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '1.75rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(0,0,0,0.09)', flexWrap: 'wrap',
          }}>
            {['YouTube', 'Instagram', 'LinkedIn'].map(s => (
              <a
                key={s}
                href="#"
                className="menu-meta"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.13em', textTransform: 'uppercase',
                  color: 'rgba(26,26,26,0.45)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#35b435' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.45)' }}
              >
                {s}
              </a>
            ))}
            <span className="menu-meta" style={{
              marginLeft: 'auto',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem', fontWeight: 400,
              color: 'rgba(26,26,26,0.35)', letterSpacing: '0.06em',
            }}>
              Accra, Ghana · Est. 2014
            </span>
          </div>

        </div>

        {/* Right — image panel (hidden on mobile) */}
        <div
          className="menu-image-panel hidden md:block"
          style={{ flex: '0 0 50%', position: 'relative', overflow: 'hidden' }}
        >
          {/* Stack all nav images; only the active one is visible */}
          {Object.entries(navImages).map(([href, src], i) => (
            <img
              key={href}
              ref={el => { imageRefs.current[href] = el }}
              src={src}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                opacity: i === 0 ? 1 : 0,
                willChange: 'transform, opacity',
              }}
            />
          ))}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(160deg, rgba(103,186,103,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />
        </div>

      </div>
    </>
  )
}
