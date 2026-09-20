'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Newspaper } from 'lucide-react'
import styles from './NewsFeature.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HEADLINE_LINES = ['Every milestone', 'we reach, told', 'in the open']

/** Days / hours since the last published story — counts up as the scene resolves. */
const LAST_UPDATE = { days: 6, hours: 14 }

export default function NewsFeature() {
  const trackRef = useRef<HTMLDivElement>(null)
  const daysRef = useRef<HTMLSpanElement>(null)
  const hoursRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const pad = (n: number) => String(Math.round(n)).padStart(2, '0')

      // Desktop: the track is 260vh tall and the stage sticks to the top. The
      // scrub starts as the track enters the viewport — not once it is already
      // pinned — so the section is never sitting fully in view unresolved.
      mm.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
        const counter = { days: 0, hours: 0 }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        })

        // 1 — eyebrow settles first
        tl.fromTo(
          `.${styles.eyebrow}`,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45 },
          0
        )

        // 2 — headline lines resolve out of blur, staggered top to bottom
        HEADLINE_LINES.forEach((_, i) => {
          tl.fromTo(
            `.${styles.headlineLine}:nth-child(${i + 1})`,
            { opacity: 0, y: 24, filter: 'blur(12px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 },
            i * 0.09
          )
        })

        // 3 — photo sharpens and settles across the full scroll
        tl.fromTo(
          `.${styles.photo}`,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.5 },
          0
        ).fromTo(
          `.${styles.photoImg}`,
          { filter: 'blur(14px) saturate(0.2) brightness(0.4)', scale: 1.05 },
          { filter: 'blur(0px) saturate(1) brightness(1)', scale: 1, duration: 0.8 },
          0
        )

        // 4 — body copy
        tl.fromTo(
          `.${styles.body}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.25 },
          0.34
        )

        // 5 — telemetry counter ticks up to the real figure
        tl.to(
          counter,
          {
            days: LAST_UPDATE.days,
            hours: LAST_UPDATE.hours,
            duration: 0.4,
            onUpdate: () => {
              if (daysRef.current) daysRef.current.textContent = pad(counter.days)
              if (hoursRef.current) hoursRef.current.textContent = pad(counter.hours)
            },
          },
          0.1
        )

        // 6 — the widget emerges last, segments expanding into place
        tl.fromTo(
          `.${styles.widget}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.22 },
          0.42
        )
          .fromTo(
            `.${styles.widgetSeg}`,
            { scaleX: 0, filter: 'blur(2px)' },
            { scaleX: 1, filter: 'blur(0px)', duration: 0.2, stagger: 0.05 },
            0.48
          )
          .fromTo(`.${styles.widgetHatch}`, { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.54)
          .fromTo(
            `.${styles.widgetMarker}`,
            { opacity: 0, scaleY: 0 },
            { opacity: 1, scaleY: 1, duration: 0.18 },
            0.58
          )
          .fromTo(
            `.${styles.widgetPill}`,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.18 },
            0.58
          )
          .fromTo(
            `.${styles.widgetTime}`,
            { opacity: 0, y: 6, scale: 1.08, filter: 'blur(6px)' },
            { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.22, ease: 'power2.out' },
            0.6
          )
      })

      // Stacked layout: same beats, fired once on entry rather than scrubbed.
      mm.add('(max-width: 1100px) and (prefers-reduced-motion: no-preference)', () => {
        const counter = { days: 0, hours: 0 }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: trackRef.current, start: 'top 70%', once: true },
        })

        tl.from(`.${styles.eyebrow}`, { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out' })
          .from(
            `.${styles.headlineLine}`,
            {
              opacity: 0,
              y: 24,
              filter: 'blur(12px)',
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            },
            '-=0.25'
          )
          .from(
            `.${styles.body}`,
            { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          )
          .from(
            `.${styles.photoImg}`,
            {
              filter: 'blur(14px) saturate(0.2) brightness(0.4)',
              scale: 1.05,
              duration: 1.1,
              ease: 'power3.out',
            },
            '<'
          )
          .to(
            counter,
            {
              days: LAST_UPDATE.days,
              hours: LAST_UPDATE.hours,
              duration: 0.9,
              ease: 'power2.out',
              onUpdate: () => {
                if (daysRef.current) daysRef.current.textContent = pad(counter.days)
                if (hoursRef.current) hoursRef.current.textContent = pad(counter.hours)
              },
            },
            '<'
          )
          .from(`.${styles.widget}`, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.5')
          .from(
            `.${styles.widgetSeg}`,
            { scaleX: 0, filter: 'blur(2px)', duration: 0.55, stagger: 0.1, ease: 'power3.out' },
            '-=0.3'
          )
          .from(`.${styles.widgetHatch}`, { opacity: 0, duration: 0.4 }, '<')
          .from(`.${styles.widgetMarker}`, { opacity: 0, scaleY: 0, duration: 0.4 }, '<0.15')
          .from(`.${styles.widgetPill}`, { opacity: 0, scale: 0.7, duration: 0.4, ease: 'back.out(2)' }, '<')
          .from(
            `.${styles.widgetTime}`,
            { opacity: 0, y: 6, scale: 1.08, filter: 'blur(6px)', duration: 0.5, ease: 'power3.out' },
            '<'
          )
      })

      // Reduced motion: no scrubbing, final values straight away.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (daysRef.current) daysRef.current.textContent = pad(LAST_UPDATE.days)
        if (hoursRef.current) hoursRef.current.textContent = pad(LAST_UPDATE.hours)
      })

      return () => mm.revert()
    },
    { scope: trackRef }
  )

  return (
    <div id="newsroom" ref={trackRef} className={styles.track}>
      <section className={styles.feature} aria-labelledby="newsroom-title">
        <svg
          className={styles.hairlineTop}
          viewBox="0 0 1409 320"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0 0.5H884.5C893.337 0.5 900.5 7.66345 900.5 16.5V303.5C900.5 312.337 907.663 319.5 916.5 319.5H1409"
            stroke="rgba(57, 48, 39, 0.35)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className={styles.bottomLine} aria-hidden="true" />

        <p className={styles.eyebrow}>Newsroom · updated every month</p>

        <div className={styles.text}>
          <h2 id="newsroom-title" className={styles.headline}>
            {HEADLINE_LINES.map((line) => (
              <span key={line} className={styles.headlineLine}>
                {line}
              </span>
            ))}
          </h2>
          <div className={styles.body}>
            <p>
              Awards, recertifications and the people behind them — published as they happen, not
              polished into a yearly brochure.
            </p>
            <p>
              Follow the work across our offshore galleys, corporate kitchens and the Ghanaian farms
              that supply them.
            </p>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.silver}>
            <p className={styles.silverEyebrow}>Last update published</p>
            <p className={styles.silverTime}>
              <span ref={daysRef} className={styles.silverNum}>
                00
              </span>
              <sup className={styles.silverUnit}>D</sup>
              <span ref={hoursRef} className={styles.silverNum}>
                00
              </span>
              <sup className={styles.silverUnit}>H</sup>
            </p>
          </div>

          <div className={styles.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-news.png"
              alt="Atlantic Catering team at the Ghana Business Awards"
              className={styles.photoImg}
              draggable={false}
              loading="lazy"
              decoding="async"
            />

            <div className={styles.widget}>
              <svg
                className={styles.widgetStroke}
                viewBox="0 0 430 67"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="news-widget-stroke"
                    x1="0"
                    y1="0"
                    x2="430"
                    y2="67"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#d5d1cd" stopOpacity="0.3" />
                    <stop offset="0.65" stopColor="#66cc33" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#d5d1cd" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <rect
                  x="0.5"
                  y="0.5"
                  width="429"
                  height="66"
                  rx="15.5"
                  stroke="url(#news-widget-stroke)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className={styles.widgetContent}>
                <div className={styles.widgetLeft}>
                  <div className={styles.widgetHead}>
                    <span className={styles.widgetLabel}>Stories this year</span>
                    <span className={styles.widgetValue}>24</span>
                  </div>
                  <div className={styles.widgetBar}>
                    <div className={styles.widgetSeg} data-color="green" style={{ width: '22%' }} />
                    <div className={styles.widgetSeg} data-color="cream" style={{ width: '38%' }} />
                    <div className={styles.widgetSeg} data-color="dim" style={{ width: '22%' }} />
                    <div className={styles.widgetHatch} />
                    <span className={styles.widgetMarker} aria-hidden="true" />
                  </div>
                </div>

                <span className={styles.widgetPill}>LIVE</span>

                <div className={styles.widgetRight}>
                  <span className={styles.widgetLabel}>Next issue</span>
                  <span className={styles.widgetTime}>
                    <span>12</span>
                    <sup>D</sup>
                    <span>00</span>
                    <sup>H</sup>
                    <Newspaper className={styles.widgetIcon} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
