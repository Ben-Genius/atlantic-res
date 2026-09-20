'use client'

/**
 * News & Updates showcase — the card that slides over the pinned hero.
 *
 * The hero stays fixed in place while this section rises from the bottom of
 * the viewport with large rounded top corners, covering it like one card
 * sliding over another. Once its top edge reaches the top of the viewport it
 * pins, and the remaining scroll drives a carousel: the plate, the headline
 * and the metric panel swap while the progress rules at the top fill.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Slide = {
  eyebrow: string
  title: string
  img: string
  alt: string
  metricLabel: string
  metricValue: string
  metricNote: string
  /** 0–1, how much of the tick meter reads as filled. */
  fill: number
  readout: string
}

const slides: Slide[] = [
  {
    eyebrow: 'Ghana First',
    title: 'Sourced within \na day of the kitchen',
    img: '/images/news/jollof-plate.png',
    alt: 'Jollof rice with grilled chicken and plantain',
    metricLabel: 'Local sourcing',
    metricValue: '82% bought in Ghana',
    metricNote: 'Up 14 points on last season',
    fill: 0.82,
    readout: '82',
  },
  {
    eyebrow: 'Offshore',
    title: 'Three hot services\na day, 60 km out',
    img: '/images/news/prawns-plate.png',
    alt: 'Grilled prawns plated with herbs and lemon',
    metricLabel: 'Service uptime',
    metricValue: '99.4% on schedule',
    metricNote: 'Across FPSO and rig contracts',
    fill: 0.994,
    readout: '99',
  },
  {
    eyebrow: 'Corporate',
    title: 'Boardroom plates\nthat hold a room',
    img: '/images/news/steak-plate.png',
    alt: 'Sliced steak plated with jus and micro herbs',
    metricLabel: 'Client retention',
    metricValue: '9 of 10 renew',
    metricNote: 'GC100 and multinational accounts',
    fill: 0.9,
    readout: '90',
  },
  {
    eyebrow: 'Events',
    title: 'Four hundred guests,\none service window',
    img: '/images/news/canape-tray.png',
    alt: 'Tray of assorted canapés',
    metricLabel: 'Peak covers',
    metricValue: '400 in 45 minutes',
    metricNote: 'State and private functions',
    fill: 0.68,
    readout: '68',
  },
]

const TICKS = 44
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

export default function NewsShowcase() {
  const wrapRef = useRef<HTMLElement>(null)
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let raf = 0

    /* Below the breakpoint the card is a normal block, so there is no pinned
       scroll to read from: the carousel advances on a timer while in view. */
    if (window.matchMedia('(max-width: 860px)').matches) {
      let i = 0
      let timer = 0
      const step = () => {
        i = (i + 1) % slides.length
        setIndex(i)
        fillRefs.current.forEach((el, k) => { if (el) el.style.transform = `scaleX(${k <= i ? 1 : 0})` })
      }
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !timer) timer = window.setInterval(step, 4200)
        else if (!e.isIntersecting && timer) { window.clearInterval(timer); timer = 0 }
      }, { threshold: 0.3 })
      io.observe(wrap)
      if (fillRefs.current[0]) fillRefs.current[0].style.transform = 'scaleX(1)'
      return () => { io.disconnect(); if (timer) window.clearInterval(timer) }
    }

    const read = () => {
      raf = 0
      const r = wrap.getBoundingClientRect()
      /* The inner card is pinned for exactly (wrap height − viewport height). */
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? clamp(-r.top / travel) : 0
      const scaled = p * slides.length

      fillRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${clamp(scaled - i)})`
      })
      setIndex(Math.min(slides.length - 1, Math.floor(scaled)))
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

  const active = slides[index]

  return (
    <section className="nsw-wrap" ref={wrapRef} aria-label="What Atlantic runs">
      <div className="nsw">
        <div className="nsw-progress" role="presentation">
          {slides.map((s, i) => (
            <span className="nsw-rule" key={s.eyebrow}>
              <span className="nsw-rule-fill" ref={(el) => { fillRefs.current[i] = el }} />
            </span>
          ))}
        </div>

        <div className="nsw-stage">
          {slides.map((s, i) => (
            <div className={`nsw-slide${i === index ? ' is-active' : ''}`} key={s.img} aria-hidden={i !== index}>
              <Image src={s.img} alt={s.alt} fill sizes="(max-width: 860px) 90vw, 56vw" className="nsw-img" />
            </div>
          ))}
        </div>

        <div className="nsw-foot">
          <div className="nsw-copy" key={active.eyebrow}>
            <p className="nsw-eyebrow">{active.eyebrow}</p>
            <h2>
              {active.title.split('\n').map((line) => (
                <span className="nsw-line" key={line}>{line}</span>
              ))}
            </h2>
          </div>

          <div className="nsw-hairline" aria-hidden="true">
            <span className="hl-bottom" />
            <svg className="hl-corner" viewBox="0 0 32 255" fill="none" preserveAspectRatio="none" focusable="false">
              <path
                d="M0 254.5C8.83656 254.5 16 247.337 16 238.5V16.5C16 7.66344 23.1634 0.5 32 0.5"
                stroke="#D5D1CD"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="hl-top" />
          </div>

          <aside className="nsw-panel">
            <p className="nsw-panel-label">{active.metricLabel}…</p>
            <p className="nsw-panel-value">{active.metricValue}</p>
            <p className="nsw-panel-note"><i />{active.metricNote}</p>
            <div className="nsw-meter">
              <div className="nsw-ticks">
                {Array.from({ length: TICKS }, (_, t) => (
                  <span key={t} className={t / TICKS < active.fill ? 'on' : undefined} />
                ))}
              </div>
              <div className="nsw-readout">{active.readout}<sup>%</sup></div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        /* Height = one viewport to rise + one per slide to read. */
        .nsw-wrap { position: relative; z-index: 2; height: calc(100svh + ${slides.length} * 90svh); }

        .nsw {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
          background: #fff;
          margin-inline: 2rem;
          border-radius: 16px;
          box-shadow: 0 -28px 70px rgba(13,13,13,.14);
          display: flex;
          flex-direction: column;
        }

        .nsw-progress {
          display: grid;
          grid-template-columns: repeat(${slides.length}, 1fr);
          gap: 26px;
          /* Clears the fixed navbar, which sits over this card. */
          padding: 104px clamp(24px, 5vw, 76px) 0;
          flex: 0 0 auto;
        }
        .nsw-rule { position: relative; height: 2px; border-radius: 2px; background: rgba(13,13,13,.09); overflow: hidden; }
        .nsw-rule-fill {
          position: absolute; inset: 0;
          background: #cc9933;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 600ms cubic-bezier(.22,1,.36,1);
        }

        .nsw-stage { position: relative; flex: 1 1 auto; min-height: 0; }
        .nsw-slide {
          position: absolute;
          left: 50%; top: 50%;
          height: min(54vh, 560px);
          aspect-ratio: 1;
          transform: translate(-50%, -54%) scale(.94);
          opacity: 0;
          transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 900ms cubic-bezier(.22,1,.36,1);
          will-change: opacity, transform;
          filter: drop-shadow(0 40px 60px rgba(13,13,13,.18));
        }
        .nsw-slide.is-active { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        .nsw-slide :global(.nsw-img) { object-fit: contain; }

        .nsw-foot {
          position: relative;
          flex: 0 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          padding: 0 var(--gutter) var(--foot-gap) var(--gutter);
          --panel-w: min(480px, 38vw);
          --gutter: clamp(24px, 5vw, 76px);
          --foot-gap: clamp(48px, 7vh, 76px);
        }
        /* The hairline runs along the bottom on the left, rises through a
           32px S-curve and continues as the panel's top edge on the right. */
        .nsw-hairline {
          position: absolute;
          left: var(--gutter);
          right: var(--gutter);
          top: 0;
          bottom: var(--foot-gap);
          display: flex;
          align-items: stretch;
          pointer-events: none;
        }
        .hl-bottom { flex: 1 1 auto; align-self: flex-end; height: 1px; background: #D5D1CD; }
        .hl-corner { flex: 0 0 32px; width: 32px; height: 100%;}
        .hl-top { flex: 0 0 var(--panel-w); align-self: flex-start; height: 1px; background: #D5D1CD; }

        .nsw-copy {
          padding-bottom: clamp(20px, 3.5vh, 36px);
          max-width: clamp(280px, 26vw, 380px);
        }
        .nsw-eyebrow {
          margin: 0 0 14px;
          font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
          color: #3C8B36;
        }
        h2 {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 3.2vw, 54px);
          line-height: 1.05;
          letter-spacing: -.03em;
          font-weight: 600;
          color: #0d0d0d;
        }
        .nsw-line { display: block; }

        /* The bordered panel that runs off the right edge, matching the
           reference's curved rule along the bottom of the section. */
        .nsw-panel {
          position: relative;
          flex: 0 0 auto;
          margin-left: 32px;
          width: var(--panel-w);
          padding: 24px clamp(20px, 3vw, 44px) 28px 30px;
        }
        .nsw-panel-label {
          margin: 0 0 12px;
          font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
          color: rgba(26,26,26,.45);
        }
        .nsw-panel-value { margin: 0 0 8px; font-size: clamp(19px, 1.5vw, 24px); font-weight: 600; letter-spacing: -.02em; color: #0d0d0d; }
        .nsw-panel-note { margin: 0 0 22px; display: flex; align-items: center; gap: 9px; font-size: 13px; color: rgba(26,26,26,.5); }
        .nsw-panel-note i { width: 6px; height: 6px; border-radius: 50%; background: #66cc33; flex: 0 0 auto; }

        .nsw-meter { display: flex; align-items: flex-end; justify-content: space-between; gap: 22px; }
        .nsw-ticks { display: flex; align-items: flex-end; gap: 3px; height: 26px; flex: 1 1 auto; }
        .nsw-ticks span {
          flex: 1 1 auto;
          height: 60%;
          border-radius: 1px;
          background: rgba(13,13,13,.12);
          transition: background 400ms ease, height 400ms cubic-bezier(.22,1,.36,1);
        }
        .nsw-ticks span.on { height: 100%; background: #cc9933; }
        .nsw-readout { font-size: clamp(32px, 2.6vw, 44px); font-weight: 300; letter-spacing: -.04em; color: rgba(26,26,26,.32); line-height: 1; }
        .nsw-readout sup { font-size: .42em; top: -1em; margin-left: 2px; }

        @media (max-width: 860px) {
          .nsw-wrap { height: auto; z-index: 2; }
          .nsw { position: relative; height: auto; border-radius: 32px 32px 0 0; padding-bottom: 40px; }
          .nsw-progress { gap: 12px; padding: 88px 7vw 0; }
          .nsw-stage { height: 48vh; }
          .nsw-slide { height: min(44vh, 360px); }
          .nsw-foot {
            flex-direction: column; align-items: stretch; gap: 0;
            padding: 0 0 var(--foot-gap) 7vw;
            --gutter: 7vw; --foot-gap: 22px; --panel-w: auto;
          }
          /* Too little width for the S-curve to read; a plain rule instead. */
          .nsw-hairline { display: none; }
          .nsw-copy { max-width: none; padding: 28px 7vw 26px 0; }
          .nsw-panel { margin-left: 0; width: auto; padding: 22px 7vw 14px 20px; border-top: 1px solid #D5D1CD; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nsw-slide { transition: none; }
          .nsw-ticks span { transition: none; }
        }
      `}</style>
    </section>
  )
}
