'use client'

/**
 * News & Updates header.
 *
 * A scroll-driven morphing navbar used only on /news-updates: the labels
 * fade out left-to-right, the right cluster follows, the white capsule then
 * contracts as one object, and the hamburger enters at the end. Clicking the
 * hamburger re-expands it; any fresh scroll hands control back to the morph.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import LogoA from '@/components/LogoA'

const NAV_H = 56
const links = [
  { label: 'Latest', href: '#latest' },
  { label: 'Awards', href: '#awards' },
  { label: 'Quality', href: '#quality' },
  { label: 'Impact', href: '#impact' },
]

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export default function NewsHeader() {
  const navRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLAnchorElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const rightRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const homeRef = useRef<HTMLAnchorElement>(null)

  const target = useRef(0)
  const current = useRef(0)
  const expandTarget = useRef(0)
  const expandCurrent = useRef(0)
  const manualExpanded = useRef(false)
  const raf = useRef<number | null>(null)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<string>('#latest')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const getWidths = () => {
      const gutter = Math.max(16, Math.min(48, window.innerWidth * 0.026))
      const brandW = brandRef.current ? Math.ceil(brandRef.current.getBoundingClientRect().width) : 151
      const collapsed = Math.ceil(brandW + NAV_H + 8 + NAV_H)
      const expanded = Math.max(collapsed, window.innerWidth - gutter * 2)
      return { expanded, collapsed }
    }

    const updateTarget = () => {
      target.current = clamp(window.scrollY / 620)
    }

    const render = () => {
      const nav = navRef.current
      if (!nav) return

      current.current += (target.current - current.current) * (reduced ? 1 : 0.065)
      if (Math.abs(target.current - current.current) < 0.00035) current.current = target.current

      expandCurrent.current += (expandTarget.current - expandCurrent.current) * (reduced ? 1 : 0.075)
      if (Math.abs(expandTarget.current - expandCurrent.current) < 0.0004) expandCurrent.current = expandTarget.current

      const openP = clamp(expandCurrent.current)
      const p = manualExpanded.current ? 1 - openP : clamp(current.current)
      const { expanded, collapsed } = getWidths()

      /* Phase 1 — labels fade left to right, cells stay put. */
      const starts = [0.075, 0.145, 0.215, 0.285]
      const ends = [0.18, 0.25, 0.32, 0.39]
      linkRefs.current.forEach((item, i) => {
        if (!item) return
        const e = easeInOut(clamp((p - starts[i]) / (ends[i] - starts[i])))
        item.style.opacity = String(1 - e)
        item.style.transform = `translateY(${-3 * e}px)`
      })

      /* Phase 1b — right cluster follows. */
      const rightEase = easeInOut(clamp((p - 0.3) / 0.15))
      if (rightRef.current) {
        rightRef.current.style.opacity = String(1 - rightEase)
        rightRef.current.style.transform = `translateY(${-3 * rightEase}px)`
        rightRef.current.style.pointerEvents = rightEase > 0.9 ? 'none' : 'auto'
      }

      /* Phase 2 — the capsule itself contracts. */
      const collapseEase = easeInOut(clamp((p - 0.4) / 0.42))
      if (window.innerWidth > 860) {
        nav.style.width = expanded - (expanded - collapsed) * collapseEase + 'px'
        nav.style.top = 20 - 8 * collapseEase + 'px'
        nav.style.left = `calc(clamp(16px, 2.6vw, 48px) - ${6 * collapseEase}px)`
      } else {
        nav.style.width = ''
        nav.style.top = ''
        nav.style.left = ''
      }
      if (homeRef.current) homeRef.current.style.transform = `translateY(${-0.5 * collapseEase}px)`

      /* Phase 3 — hamburger enters. */
      let menuEase = easeInOut(clamp((p - 0.72) / 0.18))
      if (manualExpanded.current) menuEase = 1 - openP
      if (menuRef.current) {
        menuRef.current.style.opacity = String(menuEase)
        menuRef.current.style.transform = `translateX(${10 * (1 - menuEase)}px) scale(${0.94 + 0.06 * menuEase})`
        menuRef.current.style.pointerEvents = menuEase > 0.88 ? 'auto' : 'none'
      }

      if (
        Math.abs(target.current - current.current) > 0.00035 ||
        Math.abs(expandTarget.current - expandCurrent.current) > 0.0004
      ) {
        raf.current = requestAnimationFrame(render)
      } else {
        raf.current = null
      }
    }

    const kick = () => { if (!raf.current) raf.current = requestAnimationFrame(render) }

    const onScroll = () => {
      if (manualExpanded.current) { manualExpanded.current = false; expandTarget.current = 0 }
      updateTarget()
      kick()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => { updateTarget(); kick() }, { passive: true })
    updateTarget()
    render()

    /* Drop the entrance class once it has played, so its fill-mode stops
       overriding the inline styles the scroll morph writes. */
    const enterTimer = window.setTimeout(() => navRef.current?.classList.remove('enter'), 1700)

    const menu = menuRef.current
    const onMenu = () => {
      if (window.innerWidth <= 860) { setMobileOpen((v) => !v); return }
      if (!manualExpanded.current) { manualExpanded.current = true; expandTarget.current = 1 }
      kick()
    }
    menu?.addEventListener('click', onMenu)

    /* Active-section feedback */
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => io.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      menu?.removeEventListener('click', onMenu)
      io.disconnect()
      window.clearTimeout(enterTimer)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="nh enter" ref={navRef}>
        <Link className="nh-brand" href="/" aria-label="Atlantic Catering & Logistics — Home" ref={brandRef}>
          <LogoA spin="loop" style={{ height: 84, width: 'auto', aspectRatio: '1600/983' }} />
        </Link>

        <Link className="nh-home" href="/" aria-label="Home" ref={homeRef}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M4 11.5 12 4l8 7.5" />
            <path d="M6.5 10.5V20h11v-9.5" />
            <path d="M10 20v-5h4v5" />
          </svg>
        </Link>

        <div className="nh-panel">
          <nav className="nh-links" aria-label="News sections">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className={`nh-link${active === l.href ? ' is-active' : ''}`}
                ref={(el) => { linkRefs.current[i] = el }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nh-right" ref={rightRef}>
            <a className="nh-icon" href="#newsletter" aria-label="Subscribe to the newsletter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3.5 6.5h17v11h-17z" />
                <path d="m3.5 7.5 8.5 6 8.5-6" />
              </svg>
            </a>
            <Link className="nh-cta" href="/contact">
              <span>Contact us</span>
              <svg width="13" height="13" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m7.5 13.5 4.5-4.5-4.5-4.5" />
              </svg>
            </Link>
          </div>

          <button className="nh-menu" ref={menuRef} aria-label="Menu" aria-expanded={mobileOpen}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {mobileOpen ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M4 6.5h12M4 10h12M4 13.5h12" />}
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="nh-sheet" onClick={() => setMobileOpen(false)}>
          <nav onClick={(e) => e.stopPropagation()}>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="nh-sheet-cta">Contact us</Link>
          </nav>
        </div>
      )}

      <style jsx global>{`
        .nh {
          position: fixed;
          z-index: 1000;
          top: 20px;
          left: clamp(16px, 2.6vw, 48px);
          height: ${NAV_H}px;
          display: flex;
          align-items: center;
          pointer-events: none;
          will-change: width;
        }
        .nh > * { pointer-events: auto; }

        .nh-brand {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          padding-right: 14px;
          text-decoration: none;
        }
        .nh-home {
          flex: 0 0 ${NAV_H}px;
          width: ${NAV_H}px;
          height: ${NAV_H}px;
          display: grid;
          place-items: center;
          color: #fff;
          background: #66cc33;
          border-radius: 9px;
          text-decoration: none;
          transition: transform 700ms cubic-bezier(.22,1,.36,1), background 240ms ease,  240ms ease;
        }
        .nh-home:hover { background: #cc9933;; }
        .nh-home svg { width: 19px; height: 19px; }

        .nh-panel {
          position: relative;
          height: ${NAV_H}px;
          min-width: ${NAV_H}px;
          flex: 1 1 auto;
          margin-left: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-radius: 9px;
          overflow: hidden;
        }

        .nh-links { height: ${NAV_H}px; display: flex; align-items: stretch; flex: 0 0 auto; overflow: hidden; }
        .nh-link {
          flex: 0 0 auto;
          height: ${NAV_H}px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 22px;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: .01em;
          border-right: 1px solid rgba(0,0,0,.07);
          white-space: nowrap;
          transition: color 220ms ease, background 220ms ease;
        }
        .nh-link:hover { background: #f5f5f2; color: #3C8B36; }
        .nh-link.is-active { color: #3C8B36; }
        .nh-link:after {
          content: "";
          position: absolute;
          left: 20px; right: 20px; bottom: 9px;
          height: 1px;
          background: #66cc33;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 420ms cubic-bezier(.22,1,.36,1);
        }
        .nh-link:hover:after, .nh-link.is-active:after { transform: scaleX(1); transform-origin: left; }

        .nh-right { height: ${NAV_H}px; display: flex; align-items: center; gap: 10px; padding: 0 10px 0 14px; flex: 0 0 auto; }
        .nh-icon {
          width: 38px; height: 38px;
          display: grid; place-items: center;
          color: #1a1a1a; border-radius: 7px; text-decoration: none;
          transition: background 220ms ease, color 220ms ease;
        }
        .nh-icon:hover { background: rgba(204,153,51,.12); color: #B37B29; }
        .nh-icon svg { width: 21px; height: 21px; }
        .nh-cta {
          height: 38px;
          display: flex; align-items: center; gap: 10px;
          padding: 0 14px 0 16px;
          color: #fff; background: #66cc33;
          border-radius: 8px; text-decoration: none;
          font-size: 13px; font-weight: 600;
          transition: background 240ms ease;
        }
        .nh-cta:hover { background: #cc9933; s }
        .nh-cta span { transition: transform 500ms cubic-bezier(.22,1,.36,1); }
        .nh-cta svg { transition: transform 500ms cubic-bezier(.22,1,.36,1); }
        .nh-cta:hover span, .nh-cta:hover svg { transform: translateX(4px); }

        .nh-menu {
          position: absolute;
          right: 0; top: 0;
          width: ${NAV_H}px; height: ${NAV_H}px;
          border: 0; border-radius: 9px;
          background: #fff; color: #1a1a1a;
          display: grid; place-items: center;
          cursor: pointer;
          opacity: 0;
          transform: translateX(14px) scale(.92);
          pointer-events: none;
          transition: background 220ms ease;
        }
        .nh-menu:hover { background: rgba(102,204,51,.12); color: #3C8B36; }
        .nh-menu svg { width: 22px; height: 22px; }

        .nh.enter .nh-brand { animation: nhBrandIn 900ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-home { animation: nhHomeIn 850ms 120ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-panel { animation: nhPanelIn 1050ms 220ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-link:nth-child(1) { animation: nhItemIn 700ms 450ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-link:nth-child(2) { animation: nhItemIn 700ms 520ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-link:nth-child(3) { animation: nhItemIn 700ms 590ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-link:nth-child(4) { animation: nhItemIn 700ms 660ms cubic-bezier(.22,1,.36,1) both; }
        .nh.enter .nh-right { animation: nhRightIn 700ms 760ms cubic-bezier(.22,1,.36,1) both; }

        @keyframes nhBrandIn { from { opacity: 0; transform: translateX(-20px) } to { opacity: 1; transform: none } }
        @keyframes nhHomeIn { from { opacity: 0; transform: scale(.72) } to { opacity: 1; transform: none } }
        @keyframes nhPanelIn { from { opacity: 0; transform: scaleX(.05); transform-origin: left } to { opacity: 1; transform: none } }
        @keyframes nhItemIn { from { opacity: 0; transform: translateX(-18px) } to { opacity: 1; transform: none } }
        @keyframes nhRightIn { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: none } }

        .nh-sheet {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(13,13,13,.55);
          backdrop-filter: blur(6px);
          display: grid; place-items: center;
        }
        .nh-sheet nav { display: flex; flex-direction: column; gap: 6px; text-align: center; }
        .nh-sheet a {
          color: #fff; text-decoration: none;
          font-size: 34px; font-weight: 600; letter-spacing: -.03em;
          padding: 6px 30px;
        }
        .nh-sheet .nh-sheet-cta {
          margin-top: 18px; font-size: 14px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .18em; color: #cc9933;
        }

        @media (max-width: 860px) {
          .nh { left: 14px !important; top: 12px !important; width: calc(100vw - 28px) !important; }
          .nh-brand { flex: 1; }
          .nh-links, .nh-right { display: none; }
          .nh-panel { flex: 0 0 ${NAV_H}px; width: ${NAV_H}px; margin-left: 6px; }
          .nh-menu { opacity: 1 !important; transform: none !important; pointer-events: auto !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nh *, .nh { animation: none !important; transition: none !important; }
        }
      `}</style>
    </>
  )
}
