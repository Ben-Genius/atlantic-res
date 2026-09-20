'use client'

/**
 * News & Updates hero — split editorial stage: headline on the warm page
 * ground, a clean full-bleed service photograph in its own panel on the right.
 * The photograph carries no tint, gradient or veil; the panel's own edge does
 * the separating. Restrained pointer parallax drifts the image inside its
 * frame (the frame itself never moves) and floats the stat cards.
 *
 * Photo: Jay Wennington (https://unsplash.com/@jaywennington), Unsplash License.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function NewsHero() {
  const heroRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const media = mediaRef.current
    if (!hero || !media) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = Array.from(cardsRef.current?.children ?? []) as HTMLElement[]
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      media.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(1.06)`
      cards.forEach((card, i) => {
        card.style.translate = `${-cx * (i + 1) * 0.28}px ${-cy * (i + 1) * 0.22}px`
      })
      raf = Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01 ? requestAnimationFrame(loop) : 0
    }

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 12
      ty = ((e.clientY - r.top) / r.height - 0.5) * 8
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop) }

    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="nhero" ref={heroRef} id="news-hero">
      <div className="nhero-frame">
        <div className="nhero-media" ref={mediaRef}>
          <Image
            src="/images/news-hero-meal.jpg"
            alt="A plated Atlantic dish being served at a table setting"
            fill
            priority
            sizes="(max-width: 860px) 100vw, 56vw"
            className="nhero-img"
          />
        </div>
      </div>

      <div className="nhero-content">
        <p className="nhero-eyebrow"><span>The Atlantic Journal</span></p>
        <h1 aria-label="Newsroom stories from the Atlantic floor">
          <span className="ln"><span>Newsroom stories from the Atlantic floor</span></span>
        </h1>
        <p className="nhero-sub">Milestones, certifications, awards and responsible sourcing — as they happen.</p>
        <a className="nhero-cta" href="#latest">
          <span>Read the latest</span>
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
            <path d="M7.5 13.5 12 9 7.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className="nhero-cards" ref={cardsRef}>
        <article className="nhero-card one">
          <div className="ch"><span>Food safety</span><span className="pill bright">Certified</span></div>
          <div className="cv">ISO 22000:2018</div>
          <div className="bar"><i className="green" style={{ width: '100%' }} /></div>
        </article>
        <article className="nhero-card two">
          <div className="ch"><span>Our people</span><span className="pill gold">600 staff</span></div>
          <div className="cv">98% hired locally</div>
          <div className="bar"><i className="gold" style={{ width: '98%' }} /></div>
        </article>
      </div>

      <div className="nhero-scroll"><span className="dot"><i /></span><span>Scroll</span></div>

      <style jsx>{`
        .nhero {
          /* Pinned layer: the showcase card slides up over it. */
          position: sticky;
          top: 0;
          z-index: 1;
          height: 100svh;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          background: #f4f4f1;
        }

        /* The image lives in its own clipped frame: no tint, no veil. */
        .nhero-frame {
          position: absolute;
          z-index: 1;
          top: 0; right: 0; bottom: 0;
          width: 54%;
          overflow: hidden;
          border-radius: 28px 0 0 28px;
        }
        .nhero-media {
          position: absolute;
          inset: 0;
          transform: scale(1.06);
          transition: transform 1200ms cubic-bezier(.22,1,.36,1);
        }
        .nhero-media :global(.nhero-img) { object-fit: cover; object-position: 48% 55%; }

        .nhero-content {
          position: absolute; z-index: 8;
          left: clamp(20px, 6.5vw, 120px);
          top: 50%;
          transform: translateY(-34%);
          width: min(560px, 38vw);
        }
        .nhero-eyebrow {
          margin: 0 0 20px;
          color: #3C8B36;
          text-transform: uppercase;
          font-size: 11px; font-weight: 700; letter-spacing: .16em;
          overflow: hidden;
        }
        .nhero-eyebrow span { display: inline-block; position: relative; }
        .nhero-eyebrow span:after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -5px; height: 1px;
          background: #cc9933; transform: scaleX(.18); transform-origin: left;
          transition: transform 700ms cubic-bezier(.22,1,.36,1);
        }
        .nhero:hover .nhero-eyebrow span:after { transform: scaleX(1); }

        h1 {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 5vw, 84px);
          line-height: .96;
          letter-spacing: -.035em;
          font-weight: 600;
          color: #0d0d0d;
        }
        .ln { display: block; overflow: hidden; }
        .ln > :global(span) { display: block; transform: translateY(105%); animation: nhTitleIn 1000ms cubic-bezier(.22,1,.36,1) forwards; }
    

        .nhero-sub { margin: 24px 0 30px; font-size: 17px; line-height: 1.45; color: rgba(26,26,26,.6); letter-spacing: -.01em; max-width: 30ch; }

        .nhero-cta {
          width: 200px; height: 52px; padding: 0 16px 0 20px;
          border-radius: 8px; background: #66cc33; color: #fff;
          display: flex; align-items: center; justify-content: space-between;
          text-decoration: none; font-size: 14px; font-weight: 600;
          transition: transform 450ms cubic-bezier(.32,.72,0,1), background 220ms ease;
        }
        .nhero-cta span, .nhero-cta svg { transition: transform 450ms cubic-bezier(.32,.72,0,1); }
        .nhero-cta:hover { transform: translateY(-2px); background: #cc9933; }
        .nhero-cta:hover span, .nhero-cta:hover svg { transform: translateX(4px); }

        .nhero-cards { position: absolute; inset: 0; z-index: 9; pointer-events: none; }
        .nhero-card {
          position: absolute;
          pointer-events: auto;
          width: 278px;
          padding: 16px 18px;
          border: 1px solid rgba(13,13,13,.06);
          border-radius: 16px;
          background: #ffffff;
          color: #1a1a1a;
          transition: transform 650ms cubic-bezier(.22,1,.36,1), box-shadow 450ms ease;
        }
        .nhero-card.one { right: 6%; top: 25%; }
        .nhero-card.two { right: 4%; top: 57%; width: 294px; }
        .nhero-card:hover {
          transform: translate3d(-6px,-8px,0) rotate(-.4deg);
          box-shadow: 0 30px 70px rgba(13,13,13,.24);
        }
        .ch {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          color: rgba(26,26,26,.5);
        }
        .pill { border: 1px solid rgba(26,26,26,.16); border-radius: 999px; padding: 4px 9px; font-size: 10px; }
        .pill.bright { border-color: #66cc33; background: rgba(102,204,51,.12); color: #3C8B36; }
        .pill.gold { border-color: #cc9933; background: rgba(204,153,51,.12); color: #B37B29; }
        .cv { font-size: 24px; font-weight: 600; letter-spacing: -.035em; margin-bottom: 10px; }
        .bar { height: 9px; border-radius: 999px; background: rgba(26,26,26,.09); overflow: hidden; }
        .bar > i { display: block; height: 100%; border-radius: 999px; animation: nhBarIn 1300ms cubic-bezier(.22,1,.36,1) both; }
        .bar > i.green { background: #66cc33; }
        .bar > i.gold { background: #cc9933; }

        .nhero-scroll {
          position: absolute; z-index: 8;
          left: clamp(20px, 6.5vw, 120px);
          bottom: 5vh;
          display: flex; align-items: center; gap: 13px;
          color: rgba(26,26,26,.5); font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
        }
        .dot { position: relative; width: 40px; height: 40px; border: 1px solid rgba(13,13,13,.15); border-radius: 50%; display: grid; place-items: center; }
        .dot i { width: 6px; height: 6px; border-radius: 50%; background: #66cc33; animation: nhScrollPulse 2s ease-in-out infinite; }

        @keyframes nhTitleIn { to { transform: none } }
        @keyframes nhBarIn { from { width: 0 } }
        @keyframes nhScrollPulse { 0%,100% { transform: translateY(-5px); opacity: .45 } 50% { transform: translateY(5px); opacity: 1 } }

        @media (max-width: 1100px) {
          .nhero-frame { width: 50%; }
          .nhero-content { width: 42vw; }
          .nhero-card.one { right: 3%; top: 24%; }
          .nhero-card.two { right: 2%; top: 58%; }
        }
        @media (max-width: 860px) {
          .nhero { position: relative; height: auto; min-height: auto; padding: 96px 0 72px; }
          .nhero-frame { position: relative; width: auto; height: 46vh; margin: 0 0 0 14px; border-radius: 22px 0 0 22px; }
          .nhero-content { position: relative; top: auto; left: auto; transform: none; width: auto; padding: 40px 7vw 0; }
          h1 { font-size: clamp(42px, 12vw, 64px); }
          .nhero-sub { font-size: 15px; }
          .nhero-cards { position: static; }
          .nhero-card { position: relative; right: auto !important; top: auto !important; width: auto !important; margin: 24px 7vw 0; }
          .nhero-scroll { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ln > :global(span) { transform: none; animation: none; }
          .bar > i { animation: none; }
          .dot i { animation: none; }
        }
      `}</style>
    </section>
  )
}
