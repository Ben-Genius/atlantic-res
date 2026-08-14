'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Menu, X, ArrowRight } from 'lucide-react'
import { navigation } from '@/lib/constants'
import { cn } from '@/lib/utils'
import LogoA from '@/components/LogoA'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const headerVisible = useRef(true)
  const sheetRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  /* ── scroll: hide on down, show on up ──────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)

      if (mobileOpen) { lastScrollY.current = y; return }

      const delta = y - lastScrollY.current
      if (Math.abs(delta) < 4) return

      if (delta > 0 && y > 80 && headerVisible.current) {
        gsap.to(headerRef.current, { yPercent: -120, duration: 0.4, ease: 'power3.inOut' })
        headerVisible.current = false
      } else if (delta < 0 && !headerVisible.current) {
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: 'power3.out' })
        headerVisible.current = true
      }

      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

  /* ── mobile sheet open/close ───────────────────────────── */
  useEffect(() => {
    const sheet = sheetRef.current
    const backdrop = backdropRef.current
    if (!sheet || !backdrop) return

    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      gsap.set(sheet, { xPercent: 100, display: 'flex' })
      gsap.set(backdrop, { display: 'block', opacity: 0 })
      gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(sheet, { xPercent: 0, duration: 0.45, ease: 'power4.out' })
    } else {
      document.body.style.overflow = ''
      gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in' })
      gsap.to(sheet, {
        xPercent: 100, duration: 0.4, ease: 'power4.in',
        onComplete: () => {
          gsap.set(sheet, { display: 'none' })
          gsap.set(backdrop, { display: 'none' })
        }
      })
    }
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <>
      {/* ── Fixed header ──────────────────────────────────── */}
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100]',
          'transition-all',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">

            {/* Logo — rounded pill with animated SVG */}
            <div className={cn(

            )}>
              <Link
                href="/"
                onClick={close}
                className="flex items-center shrink-0"
                aria-label="Atlantic Catering & Logistics — Home"
              >
                <LogoA
                  spin="loop"
                  className="block "
                  style={{ height: '98px', width: 'auto', aspectRatio: '1600/983' }}
                />
              </Link>
            </div>

            {/* Desktop nav — items in a rounded pill ───── */}
            <nav
              className={cn(
                'hidden lg:flex items-center gap-0.5 px-4 py-1.5',
                'rounded-md border border-black/[0.07]',
                'bg-white/70 backdrop-blur-sm',
                'shadow-[0_1px_4px_rgba(0,0,0,0.07)]'
              )}
              aria-label="Main navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] rounded-full',
                    'text-[#1a1a1a]/75 hover:text-[#66cc33] hover:bg-[#66cc33]/8 hover:font-bold',
                    'transition-all duration-200'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right actions ─────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="https://atlanticcatering-gh.odoo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group relative flex items-center gap-2.5 px-4 py-2.5 rounded-md overflow-hidden',
                  'bg-[#66cc33] text-white font-bold uppercase tracking-[0.18em] text-[11px]',
                  'transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  'hover:bg-[#cc9933] shadow-md hover:shadow-lg'
                )}
              >
                <span>eCommerce</span>
                <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                  <ArrowRight
                    size={12}
                    strokeWidth={3}
                    className="absolute transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
                  />
                  <ArrowRight
                    size={12}
                    strokeWidth={3}
                    className="absolute -translate-x-6 translate-y-6 transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </div>
              </Link>
            </div>

            {/* Mobile hamburger ─────────────────────── */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className={cn(
                'lg:hidden flex items-center justify-center w-9 h-9 rounded-full',
                'bg-[#66cc33] text-white transition-colors duration-200 hover:bg-[#cc9933]'
              )}
            >
              <Menu className={cn('w-4 h-4 transition-all duration-200', mobileOpen && 'opacity-0 scale-75')} />
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ───────────────────────────────── */}
      <div
        ref={backdropRef}
        onClick={close}
        className="fixed inset-0 z-[110] bg-black/40 hidden"
        aria-hidden
      />

      {/* ── Mobile sheet (slides in from right) ──────────── */}
      <div
        ref={sheetRef}
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[120] w-[min(85vw,340px)]',
          'bg-white shadow-2xl flex-col hidden'
        )}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" onClick={close} aria-label="Atlantic Catering & Logistics — Home">
            <LogoA spin="loop" className="h-10 w-auto" style={{ aspectRatio: '1600/983' }} />
          </Link>
          <button
            onClick={close}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto" aria-label="Mobile navigation links">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                'flex items-center px-4 py-3 rounded-lg text-[14px] font-semibold uppercase tracking-[0.12em]',
                'text-[#1a1a1a]/80 hover:text-[#66cc33] hover:bg-[#66cc33]/8',
                'transition-all duration-200 group'
              )}
            >
              <span className="flex-1">{item.label}</span>
              <ArrowRight
                size={14}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#66cc33]"
              />
            </Link>
          ))}
        </nav>

        {/* Sheet footer */}
        <div className="px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
          <Link
            href="https://atlanticcatering-gh.odoo.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={cn(
              'flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md',
              'bg-[#66cc33] text-white font-bold uppercase tracking-[0.18em] text-[11px]',
              'hover:bg-[#cc9933] transition-colors duration-300 shadow-md'
            )}
          >
            <span>eCommerce</span>
            <ArrowRight size={13} strokeWidth={3} />
          </Link>
          <p className="text-center text-[10px] text-gray-400 tracking-widest uppercase font-medium pt-1">
            Accra, Ghana · Est. 2014
          </p>
        </div>
      </div>
    </>
  )
}