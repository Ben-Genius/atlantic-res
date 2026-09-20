'use client'

/**
 * News & Updates image expansion — a pinned section whose photograph grows
 * from an inset rectangle to full bleed as you scroll.
 *
 * At rest the section reads as a dark rounded panel: a left-aligned eyebrow
 * with a hairline running from it to the right margin, a vertical hairline
 * down the centre, and the photograph held inside as a smaller rounded card.
 * The headline and the copy block are already in place before any scroll —
 * the scroll only opens the window onto the photograph.
 *
 * The progress drives a single `clip-path: inset()` on the card, so the image
 * itself never moves or scales. Its corner radius resolves to the panel's own
 * radius, so at full bleed the photograph fills the rounded panel exactly.
 *
 * The photograph carries a slight brightness reduction so the white type reads
 * over it; nothing is laid on top of it.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LINES = ['Built for scale,', 'audited on every', 'site we run']

/** Framing at rest, in per cent of the panel — matches the reference. */
const REST = { top: 24.9, right: 15, bottom: 5.8, left: 15 }
/** Narrow or short screens need a wider window, with the copy below it. */
const REST_STACKED = { top: 18, right: 6, bottom: 30, left: 6 }
/** Must track the stacked-layout media query in the stylesheet below. */
const STACKED = '(max-width: 860px), (max-height: 640px)'
/** Card corner at rest, and the panel corner it resolves into at full bleed. */
const RADIUS_REST = 20
const RADIUS_OPEN = 24

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
/** Maps p into [from, to] as 0→1. */
const seg = (p: number, from: number, to: number) => clamp((p - from) / (to - from))

const restClip = `inset(${REST.top}% ${REST.right}% ${REST.bottom}% ${REST.left}% round ${RADIUS_REST}px)`
const restFraming = () =>
  typeof window !== 'undefined' && window.matchMedia(STACKED).matches ? REST_STACKED : REST

export default function NewsImageExpansion() {
  const wrapRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const fadeOutRefs = useRef<(HTMLElement | null)[]>([])
  const cueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let raf = 0

    const read = () => {
      raf = 0
      const r = wrap.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? clamp(-r.top / travel) : 0

      /* The window opens. */
      const open = easeInOut(seg(p, 0, 0.55))
      if (cardRef.current) {
        const rest = restFraming()
        const t = rest.top * (1 - open)
        const rgt = rest.right * (1 - open)
        const btm = rest.bottom * (1 - open)
        const lft = rest.left * (1 - open)
        const rad = RADIUS_REST + (RADIUS_OPEN - RADIUS_REST) * open
        cardRef.current.style.clipPath = `inset(${t}% ${rgt}% ${btm}% ${lft}% round ${rad}px)`
      }

      /* Framing marks step back as it opens. */
      const out = 1 - easeInOut(seg(p, 0, 0.4))
      fadeOutRefs.current.forEach((el) => { if (el) el.style.opacity = String(out) })
      if (cueRef.current) cueRef.current.style.opacity = String(1 - easeInOut(seg(p, 0, 0.2)))
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    read()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="nie-wrap" ref={wrapRef} id="operation" aria-labelledby="nie-headline">
      <div className="nie">
        <div className="nie-panel">
          <div className="nie-top">
            <p className="nie-eyebrow" ref={(el) => { fadeOutRefs.current[0] = el }}>Inside the operation</p>
            <span className="nie-rule" aria-hidden="true" ref={(el) => { fadeOutRefs.current[1] = el }} />
          </div>

          <div className="nie-vrule" aria-hidden="true" ref={(el) => { fadeOutRefs.current[2] = el }} />

          <div className="nie-card" ref={cardRef} style={{ clipPath: restClip }}>
            <Image
              src="/images/hero-main.png"
              alt="Atlantic chefs plating a service line on an offshore installation"
              fill
              sizes="100vw"
              className="nie-img"
              draggable={false}
            />
          </div>

          <h2 className="nie-headline" id="nie-headline">
            {LINES.map((line) => (
              <span className="nie-line" key={line}>{line}</span>
            ))}
          </h2>

          <div className="nie-copy">
            <p>ISO 22000 kitchens, cold chain and crews — checked end to end, on every site we run.</p>
            <Link href="/expertise" className="nie-cta">
              <span>Our expertise</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M7.5 13.5 12 9 7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="nie-cue" aria-hidden="true" ref={cueRef}>
            <span className="pulse" />
            <span className="pulse delay" />
            <span className="ring">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25 7 8.75l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nie-wrap {
          position: relative;
          height: 260vh;
          height: 260svh;
          background: #f4f4f1;
        }

        .nie {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          padding: clamp(12px, 1.4vw, 22px);
        }

        /* The dark rounded panel everything sits inside. */
        .nie-panel {
          --pad-x: clamp(28px, 5vw, 88px);
          --pad-top: clamp(52px, 9vh, 92px);
          position: relative;
          height: 100%;
          border-radius: ${RADIUS_OPEN}px;
          overflow: hidden;
          background: #787163;
        }

        /* Eyebrow + the hairline that runs from it to the right margin. */
        .nie-top {
          position: absolute;
          z-index: 3;
          top: var(--pad-top);
          left: var(--pad-x);
          right: var(--pad-x);
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 70px);
        }
        .nie-eyebrow {
          flex: 0 0 auto;
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, .72);
        }
        .nie-rule {
          flex: 1 1 auto;
          height: 1px;
          background: rgba(255, 255, 255, .26);
        }

        /* Vertical hairline down the centre, behind the photograph. */
        .nie-vrule {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: calc(var(--pad-top) + 6px);
          bottom: 0;
          width: 1px;
          background: rgba(255, 255, 255, .2);
        }

        .nie-card {
          position: absolute;
          inset: 0;
          z-index: 2;
          will-change: clip-path;
        }
        .nie-card :global(.nie-img) {
          object-fit: cover;
          object-position: 50% 45%;
          /* The photograph is held a touch below full brightness so the white
             type reads over it — no scrim or gradient is laid on top. */
          filter: brightness(.82) saturate(.94);
        }

        .nie-headline {
          position: absolute;
          z-index: 4;
          left: var(--pad-x);
          bottom: 28%;
          margin: 0;
          max-width: 46%;
          font-family: 'Outfit', 'DM Sans', sans-serif;
          font-size: clamp(34px, 3.9vw, 72px);
          line-height: 1.06;
          letter-spacing: -.03em;
          font-weight: 500;
          color: #fff;
          text-shadow: 0 2px 6px rgba(0, 0, 0, .3), 0 4px 32px rgba(0, 0, 0, .35);
        }
        .nie-line { display: block; }

        /* Right-hand copy block, sitting to the right of the centre hairline. */
        .nie-copy {
          position: absolute;
          z-index: 4;
          right: var(--pad-x);
          top: 55%;
          width: min(330px, 26vw);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 26px;
        }
        .nie-copy p {
          margin: 0;
          font-size: clamp(15px, 1.15vw, 18px);
          line-height: 1.45;
          letter-spacing: -.01em;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, .45), 0 2px 20px rgba(0, 0, 0, .5);
        }
        .nie-copy :global(.nie-cta) {
          flex: 0 0 auto;
          height: 52px;
          display: flex; align-items: center; gap: 28px;
          padding: 0 18px 0 22px;
          border-radius: 8px;
          background: #ffffff; color: #1a1a1a;
          text-decoration: none;
          font-size: 14px; font-weight: 600;
          box-shadow: 0 10px 26px rgba(0, 0, 0, .18);
          transition: background 240ms ease, transform 450ms cubic-bezier(.32,.72,0,1);
        }
        .nie-copy :global(.nie-cta):hover { background: #66cc33; color: #fff; transform: translateY(-2px); }
        .nie-copy :global(.nie-cta span), .nie-copy :global(.nie-cta svg) { transition: transform 450ms cubic-bezier(.32,.72,0,1); }
        .nie-copy :global(.nie-cta):hover span, .nie-copy :global(.nie-cta):hover svg { transform: translateX(4px); }

        .nie-cue {
          position: absolute;
          z-index: 5;
          left: 50%; bottom: 46px;
          transform: translateX(-50%);
          width: 44px; height: 44px;
          display: grid; place-items: center;
          color: rgba(255, 255, 255, .8);
        }
        .pulse {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(102, 204, 51, .7);
          animation: niePulse 2.6s cubic-bezier(.22,1,.36,1) infinite;
        }
        .pulse.delay { animation-delay: 1.3s; }
        .ring {
          position: relative;
          width: 44px; height: 44px;
          display: grid; place-items: center;
          border: 1px solid rgba(255, 255, 255, .28);
          border-radius: 50%;
          background: rgba(255, 255, 255, .12);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        @keyframes niePulse {
          0% { transform: scale(1); opacity: .7 }
          70% { transform: scale(1.65); opacity: 0 }
          100% { transform: scale(1.65); opacity: 0 }
        }

        @media (max-width: 860px), (max-height: 640px) {
          .nie-wrap { height: 220vh; height: 220svh; }
          .nie-panel {
            --pad-x: 24px;
            --pad-top: clamp(84px, 13vh, 112px);
            border-radius: 18px;
            /* Stacked, the headline and copy flow from the bottom instead of
               being pinned to per-cent offsets, so they cannot collide on a
               short screen however the type wraps. */
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: clamp(18px, 4vh, 40px);
          }
          .nie-headline {
            position: static;
            max-width: none;
            padding: 0 var(--pad-x);
            margin-bottom: clamp(14px, 2.6vh, 26px);
            font-size: clamp(24px, min(7.4vw, 9vh), 44px);
          }
          .nie-copy {
            position: static;
            width: auto;
            padding: 0 var(--pad-x);
            gap: clamp(14px, 2.4vh, 20px);
          }
          .nie-vrule { display: none; }
          .nie-cue { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse { animation: none; }
        }
      `}</style>
    </section>
  )
}
