'use client'

/**
 * News & Updates image expansion — a pinned section whose photograph grows
 * from an inset rectangle to full bleed as you scroll.
 *
 * This is an ordinary section, not one of the overlapping cards: only
 * NewsShowcase slides over the hero. Here the pin exists solely to give the
 * expansion something to animate against.
 *
 * The scroll progress drives a single `clip-path: inset()` on the card, so the
 * image itself never moves or scales: only the window onto it opens. The
 * eyebrow, guide hairlines and scroll cue fade out as it opens; the headline,
 * description and call to action fade in once the frame is full bleed. No tint
 * or gradient is laid over the photograph — the frame it lands on is dark
 * enough on its own for the type to read.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LINES = ['Built for scale,', 'audited on every', 'site we run']

/** Inset at rest, in per cent of the card, matching the reference framing. */
const INSET_Y = 12.4
const INSET_X = 9.3
const RADIUS = 20

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
/** Maps p into [from, to] as 0→1. */
const seg = (p: number, from: number, to: number) => clamp((p - from) / (to - from))

export default function NewsImageExpansion() {
  const wrapRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const fadeOutRefs = useRef<(HTMLElement | null)[]>([])
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const copyRef = useRef<HTMLDivElement>(null)
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
        const y = INSET_Y * (1 - open)
        const x = INSET_X * (1 - open)
        const rad = RADIUS * (1 - open)
        cardRef.current.style.clipPath = `inset(${y}% ${x}% round ${rad}px)`
      }

      /* Framing marks step back as it opens. */
      const out = 1 - easeInOut(seg(p, 0, 0.4))
      fadeOutRefs.current.forEach((el) => { if (el) el.style.opacity = String(out) })
      if (cueRef.current) cueRef.current.style.opacity = String(1 - easeInOut(seg(p, 0, 0.2)))

      /* Copy arrives once the frame is full bleed. */
      lineRefs.current.forEach((el, i) => {
        if (!el) return
        const t = easeInOut(seg(p, 0.5 + i * 0.06, 0.72 + i * 0.06))
        el.style.opacity = String(t)
        el.style.transform = `translateY(${24 * (1 - t)}px)`
      })
      const c = easeInOut(seg(p, 0.72, 0.95))
      if (copyRef.current) {
        copyRef.current.style.opacity = String(c)
        copyRef.current.style.transform = `translateY(${18 * (1 - c)}px)`
      }
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
    <section className="nie-wrap mx-auto bg-white" ref={wrapRef} id="operation" aria-labelledby="nie-headline">

      <div className="nie">
        <p className="nie-eyebrow" ref={(el) => { fadeOutRefs.current[0] = el }}>Inside the operation</p>
        <div className="nie-rule nie-rule--top" aria-hidden="true" ref={(el) => { fadeOutRefs.current[1] = el }} />
        <div className="nie-rule nie-rule--center" aria-hidden="true" ref={(el) => { fadeOutRefs.current[2] = el }} />

        <div className="nie-card" ref={cardRef} style={{ clipPath: `inset(${INSET_Y}% ${INSET_X}% round ${RADIUS}px)` }}>
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
          {LINES.map((line, i) => (
            <span className="nie-line" key={line} ref={(el) => { lineRefs.current[i] = el }}>{line}</span>
          ))}
        </h2>

        <div className="nie-copy" ref={copyRef}>
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
      <style jsx>{`
        .nie-wrap { position: relative; height: 260svh; }

        .nie {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
          background: #e7e6e4;
        }

        .nie-eyebrow {
          position: absolute;
          z-index: 3;
          top: 86px; left: 0; right: 0;
          margin: 0;
          text-align: center;
          font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(26,26,26,.45);
        }
        .nie-rule {
          position: absolute;
          z-index: 1;
          left: clamp(24px, 5vw, 76px);
          right: clamp(24px, 5vw, 76px);
          height: 1px;
          background: #D5D1CD;
        }
        .nie-rule--top { top: 124px; }
        .nie-rule--center { top: 50%; }

        .nie-card {
          position: absolute;
          inset: 0;
          z-index: 2;
          margin: 24px;
          border-radius: 12px;
          will-change: clip-path;
        }
        .nie-card :global(.nie-img) { object-fit: cover; object-position: 50% 45%; border-radius: 17px; overflow: hidden; }

        .nie-headline {
          position: absolute;
          z-index: 4;
          left: clamp(24px, 5vw, 76px);
          bottom: clamp(210px, 30vh, 300px);
          margin: 0;
          max-width: 60%;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4.4vw, 76px);
          line-height: 1.0;
          letter-spacing: -.03em;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 2px 24px rgba(0,0,0,.4);
        }
        .nie-line { display: block; opacity: 0; will-change: opacity, transform; }

        .nie-copy {
          position: absolute;
          z-index: 4;
          left: clamp(24px, 5vw, 76px);
          bottom: clamp(48px, 8vh, 84px);
          width: min(440px, 42vw);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          opacity: 0;
          will-change: opacity, transform;
        }
        .nie-copy p {
          margin: 0;
          font-size: clamp(15px, 1.15vw, 17px);
          line-height: 1.5;
          color: rgba(255,255,255,.88);
          text-shadow: 0 1px 14px rgba(0,0,0,.45);
        }
        .nie-copy :global(.nie-cta) {
          flex: 0 0 auto;
          height: 52px;
          display: flex; align-items: center; gap: 12px;
          padding: 0 18px 0 22px;
          border-radius: 8px;
          background: #66cc33; color: #fff;
          text-decoration: none;
          font-size: 14px; font-weight: 600;
          box-shadow: 0 10px 26px rgba(102,204,51,.3);
          transition: background 240ms ease, transform 450ms cubic-bezier(.32,.72,0,1);
        }
        .nie-copy :global(.nie-cta):hover { background: #cc9933; transform: translateY(-2px); }
        .nie-copy :global(.nie-cta span), .nie-copy :global(.nie-cta svg) { transition: transform 450ms cubic-bezier(.32,.72,0,1); }
        .nie-copy :global(.nie-cta):hover span, .nie-copy :global(.nie-cta):hover svg { transform: translateX(4px); }

        .nie-cue {
          position: absolute;
          z-index: 5;
          left: 50%; bottom: 46px;
          transform: translateX(-50%);
          width: 44px; height: 44px;
          display: grid; place-items: center;
          color: rgba(26,26,26,.6);
        }
        .pulse {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(102,204,51,.7);
          animation: niePulse 2.6s cubic-bezier(.22,1,.36,1) infinite;
        }
        .pulse.delay { animation-delay: 1.3s; }
        .ring {
          position: relative;
          width: 44px; height: 44px;
          display: grid; place-items: center;
          border: 1px solid rgba(13,13,13,.15);
          border-radius: 50%;
          background: rgba(244,244,241,.7);
        }

        @keyframes niePulse {
          0% { transform: scale(1); opacity: .7 }
          70% { transform: scale(1.65); opacity: 0 }
          100% { transform: scale(1.65); opacity: 0 }
        }

        @media (max-width: 860px) {
          .nie-wrap { height: 220svh; }
          .nie-eyebrow { top: 88px; }
          .nie-rule--top { top: 120px; }
          .nie-headline { max-width: none; right: 7vw; left: 7vw; bottom: clamp(230px, 34vh, 300px); font-size: clamp(32px, 9vw, 48px); }
          .nie-copy { left: 7vw; right: 7vw; width: auto; gap: 20px; bottom: 40px; }
          .nie-cue { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse { animation: none; }
        }
      `}</style>
    </section>
  )
}
