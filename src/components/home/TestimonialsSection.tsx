'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { smoothScrollTo } from '@/lib/lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

/**
 * Split-screen testimonials — dual direction, entirely scroll-driven.
 *
 * Both halves are stacks of full-height panels. While the section is pinned,
 * the LEFT stack travels UP and the RIGHT stack travels DOWN over the same
 * scroll distance. The right stack is rendered in reverse order and parked at
 * its bottom, so opposite travel keeps the pairs in sync: quote 03 always
 * meets plate 03 on screen.
 *
 * Every testimonial owns a colour — a solid plate panel on the right and the
 * same hue washed over white on the left — so the two stacks visibly change
 * colour in opposite directions as you scroll. Colours are the brand-guide
 * set only: gold range, accent blue, accent purple, light green, charcoal.
 *
 * Plate artwork is the transparent cutout set in /assets/images/cutouts/fit.
 */
const CUTOUTS = {
  jollof: '/assets/images/cutouts/fit/testimonial-left.webp',
  prawns: '/assets/images/cutouts/fit/testimonial-right.webp',
  lobster: '/assets/images/cutouts/fit/testimonial-left-2.webp',
  steak: '/assets/images/cutouts/fit/testimonial-right-2.webp',
} as const

type Theme = {
  /** Solid fill behind the plate. */
  solid: string
  /** The same hue washed over white, behind the quote. */
  tint: string
  /** Eyebrow, author name, active dot. */
  accent: string
  /** Whether the solid panel carries white type or dark type. */
  onDark: boolean
}

const premiumTestimonials: {
  quote: string
  author: string
  role: string
  dish: string
  dishAlt: string
  note: string
  theme: Theme
}[] = [
  {
    quote:
      'Good communication and the food was great. The facilities were managed perfectly. Love the desserts and their way of presenting. We came here for a corporate event and this place won our hearts.',
    author: 'Leonel Mooney',
    role: 'Offshore Platform Director, Chevron',
    dish: CUTOUTS.prawns,
    dishAlt: 'Grilled tiger prawns with herbs and lemon',
    note: 'chef’s\nselection',
    theme: { solid: '#cc9933', tint: '#FBF3E3', accent: '#B37B29', onDark: true },
  },
  {
    quote:
      'Exceptional logistical coordination under extreme maritime conditions. Every single meal feels like fine dining, boosting crew morale immensely. Atlantic truly sets the gold standard.',
    author: 'Capt. Matthew Taylor',
    role: 'Vessel Superintendent, Atlantic Marine',
    dish: CUTOUTS.lobster,
    dishAlt: 'Butter-poached lobster tail with micro herbs',
    note: 'offshore\nfine dining',
    theme: { solid: '#296ed6', tint: '#EBF1FC', accent: '#296ed6', onDark: true },
  },
  {
    quote:
      'A flawless hospitality and catering partnership. From camp management to daily laundry, their team operates with ultimate professionalism and care for every detail.',
    author: 'Herman Miller',
    role: 'Onshore Camps Coordinator, Tullow Oil',
    dish: CUTOUTS.jollof,
    dishAlt: 'Jollof rice with grilled chicken and plantain',
    note: 'camp\nfavourite',
    theme: { solid: '#b048b8', tint: '#F8ECFA', accent: '#b048b8', onDark: true },
  },
  {
    quote:
      'Rotations change, weather changes, headcounts change — the standard never does. Menus land on schedule at every site, and the HSE paperwork is always ahead of us.',
    author: 'Kwabena Osei',
    role: 'Site Services Manager, Newmont Ghana',
    dish: CUTOUTS.steak,
    dishAlt: 'Seared beef fillet with watercress and jus',
    note: 'plated\non site',
    theme: { solid: '#1A2330', tint: '#EDEFF3', accent: '#1A2330', onDark: true },
  },
  {
    quote:
      'Our inflight service was audited twice this year and Atlantic cleared both without a single finding. Cold chain, allergen control, turnaround times — all handled quietly and correctly.',
    author: 'Naa Adjeley Nortey',
    role: 'Flight Operations Manager, Macdan Aviation',
    dish: CUTOUTS.prawns,
    dishAlt: 'Grilled tiger prawns with herbs and lemon',
    note: 'aviation\nready',
    theme: { solid: '#A4D79C', tint: '#F1F8EF', accent: '#3C8B36', onDark: false },
  },
  {
    quote:
      'They catered our annual general meeting for six hundred guests and made it look effortless. Presentation, timing and service were exactly what we needed our clients to see.',
    author: 'Selorm Agbeko',
    role: 'Head of Corporate Services, CalBank',
    dish: CUTOUTS.lobster,
    dishAlt: 'Butter-poached lobster tail with micro herbs',
    note: 'events\nat scale',
    theme: { solid: '#D4A556', tint: '#FCF5E9', accent: '#B37B29', onDark: false },
  },
]

const promiseStats = [
  { value: '55,000+', label: 'Meals served' },
  { value: 'Since 2014', label: 'Operating in Ghana' },
  { value: '3 × ISO', label: 'Certifications held' },
]

const TOTAL = premiumTestimonials.length
/** Six quotes + the closing panel on each side. */
const PANELS = TOTAL + 1
const STEPS = PANELS - 1
/** How far each stack slides, as a % of its own (PANELS × 100%) height. */
const TRAVEL = (STEPS / PANELS) * 100
/** Scroll distance, in viewport heights, spent on each step. */
const VH_PER_STEP = 0.85

/** Gold quote glyph, reused in both layouts. */
function QuoteMark({
  className = '',
  color = '#cc9933',
}: {
  className?: string
  color?: string
}) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full text-white ${className}`}
      style={{ background: color }}
    >
      <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.725 6.51h4.725V21h-9.978zm-11.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-4.76 2.824-4.722 6.505h4.722V21H3z" />
      </svg>
    </div>
  )
}

/** Signature curved pointer that ties a handwritten note to a plate. */
function CurvedArrow({
  color,
  flip = false,
  className = '',
}: {
  color: string
  flip?: boolean
  className?: string
}) {
  return (
    <svg
      width="72"
      height="58"
      viewBox="0 0 80 62"
      fill="none"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path
        d="M8 6 C26 20 48 40 68 55"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M57 53 L71 57 L66 44"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function TestimonialsSection() {
  const [reduced, setReduced] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  /* The pin trigger, so the dots can scroll the page to a given quote. */
  const triggerRef = useRef<ScrollTrigger | null>(null)

  /* ------------------------------------------------------------------ */
  /* Reduced motion — stacked layout, every quote laid out in the flow    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* ------------------------------------------------------------------ */
  /* Pinned split screen — left stack up, right stack down, one scrub     */
  /* ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          if (!leftColRef.current || !rightColRef.current) return

          const tl = gsap.timeline({
            scrollTrigger: {
              id: 'testimonials-split',
              trigger: sectionRef.current,
              start: 'top top',
              end: () => '+=' + window.innerHeight * STEPS * VH_PER_STEP,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          triggerRef.current = tl.scrollTrigger ?? null

          // LEFT — quotes climb.
          tl.fromTo(
            leftColRef.current,
            { y: 0, yPercent: 0 },
            { yPercent: -TRAVEL, ease: 'none', duration: 1 },
            0
          )

          // RIGHT — plates descend over the same distance, opposite sign.
          // `y: 0` clears the inline park transform, which GSAP would otherwise
          // read as a starting offset and add on top of yPercent.
          tl.fromTo(
            rightColRef.current,
            { y: 0, yPercent: -TRAVEL },
            { y: 0, yPercent: 0, ease: 'none', duration: 1 },
            0
          )

          // Reading progress rail.
          if (progressRef.current) {
            gsap.set(progressRef.current, { transformOrigin: 'left center' })
            tl.fromTo(
              progressRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: 'none', duration: 1 },
              0
            )
          }

          // Slow drift keeps the plate artwork alive between steps.
          const drift = gsap.to('.testi-drift', {
            y: -14,
            duration: 4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.35,
          })

          return () => {
            drift.kill()
            triggerRef.current = null
          }
        }
      )

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  /* ------------------------------------------------------------------ */
  /* Entrance reveal                                                     */
  /* ------------------------------------------------------------------ */
  useGSAP(
    () => {
      gsap.from('.testi-reveal', {
        opacity: 0,
        y: 34,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope: sectionRef }
  )

  /* ------------------------------------------------------------------ */
  /* Layout settles after fonts and cutouts land                         */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => window.clearTimeout(id)
  }, [reduced])

  /** Dots jump the page to the scroll position that centres pair `i`. */
  const goToQuote = (i: number) => {
    const st = triggerRef.current
    if (!st) return
    smoothScrollTo(st.start + (st.end - st.start) * (i / STEPS))
  }

  const useSplit = !reduced
  const panelHeight = `${100 / PANELS}%`

  /** Dot row — repeated inside each quote panel, tinted to that panel. */
  const dotRow = (current: number, accent: string) => (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {premiumTestimonials.map((item, i) => (
          <button
            key={item.author}
            type="button"
            onClick={() => goToQuote(i)}
            aria-label={`Scroll to testimonial from ${item.author}`}
            aria-current={i === current}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              width: i === current ? 30 : 8,
              height: 8,
              background: i === current ? accent : 'rgba(26,26,26,0.18)',
            }}
          />
        ))}
      </div>
      <span className="font-outfit text-[11px] font-bold tracking-[0.2em] text-[#1a1a1a]/45">
        {String(current + 1).padStart(2, '0')} /{' '}
        {String(TOTAL).padStart(2, '0')}
      </span>
    </div>
  )

  const starBar = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex gap-1 text-white bg-[#cc9933] px-3 py-2 rounded-md shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <p className="text-[#1a1a1a] font-outfit text-sm font-semibold tracking-wide">
        <span className="underline decoration-black decoration-1 underline-offset-4">
          55,000+ happy food lovers
        </span>{' '}
        served across offshore sites and corporate operations.
      </p>
    </div>
  )

  const promisePanel = (
    <>
      <span className="text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.3em]">
        Our Promise
      </span>
      <h3 className="text-3xl xl:text-5xl font-black text-[#1a1a1a] font-outfit mt-4 leading-[1.05]">
        Hospitality without
        <br className="hidden lg:block" /> compromise.
      </h3>
      <p className="text-[#1a1a1a]/60 font-outfit mt-6 max-w-md leading-relaxed">
        From offshore platforms to boardroom events, every service is planned,
        certified and delivered with the same standard — no matter the site, the
        shift or the sea state.
      </p>
      <div className="mt-9 grid grid-cols-3 gap-4 lg:gap-6 max-w-lg">
        {promiseStats.map((stat) => (
          <div key={stat.label} className="border-t border-[#1a1a1a]/15 pt-4">
            <p className="text-lg xl:text-3xl font-black text-[#1a1a1a] font-outfit tracking-tight">
              {stat.value}
            </p>
            <p className="text-[10px] xl:text-[11px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 max-w-xl">{starBar}</div>
    </>
  )

  /** Right stack, top → bottom is reversed so it stays paired while descending. */
  const rightPanels = [
    // Closing collage — sits at the top, arrives last.
    <div
      key="collage"
      className="w-full shrink-0 bg-[#F9F6F0] relative flex items-center justify-center overflow-hidden"
      style={{ height: panelHeight }}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="relative z-10 w-full h-full">
        <div className="testi-drift absolute left-[6%] top-[14%] w-[52%]">
          <div className="absolute -inset-6 rounded-full bg-[#cc9933]/10 blur-2xl" />
          <img
            src={CUTOUTS.jollof}
            alt="Jollof rice with grilled chicken and plantain"
            className="relative w-full h-auto drop-shadow-2xl"
            draggable={false}
          />
        </div>

        <div className="testi-drift absolute right-[5%] top-[34%] w-[46%]">
          <div className="absolute -inset-6 rounded-full bg-[#296ed6]/10 blur-2xl" />
          <img
            src={CUTOUTS.steak}
            alt="Seared beef fillet with watercress and jus"
            className="relative w-full h-auto drop-shadow-2xl"
            draggable={false}
          />
        </div>

        <div className="testi-drift absolute left-[16%] bottom-[8%] w-[40%]">
          <img
            src={CUTOUTS.lobster}
            alt="Butter-poached lobster tail with micro herbs"
            className="relative w-full h-auto drop-shadow-2xl"
            draggable={false}
          />
        </div>

        <div className="absolute right-[8%] bottom-[16%] flex flex-col items-center">
          <span
            className="font-serif text-[15px] text-[#cc9933] font-semibold leading-tight text-center whitespace-pre-line"
            style={{ fontStyle: 'italic' }}
          >
            {'plated fresh\non every site'}
          </span>
          <CurvedArrow color="#cc9933" flip className="mt-1" />
        </div>
      </div>
    </div>,

    // Plates, last testimonial first.
    ...premiumTestimonials
      .map((item, i) => {
        const ink = item.theme.onDark ? '#ffffff' : '#1a1a1a'
        const ring = item.theme.onDark
          ? 'rgba(255,255,255,0.38)'
          : 'rgba(26,26,26,0.22)'
        return (
          <div
            key={item.author}
            className="w-full shrink-0 relative flex items-center justify-center overflow-hidden"
            style={{ height: panelHeight, background: item.theme.solid }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: item.theme.onDark ? 0.13 : 0.18,
                backgroundImage: `radial-gradient(circle at center, ${
                  item.theme.onDark
                    ? 'rgba(255,255,255,0.85)'
                    : 'rgba(26,26,26,0.6)'
                } 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
              }}
            />

            <div className="relative z-10 w-[70%] max-w-[430px] aspect-square flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: ring }}
              />
              <div
                className="absolute inset-[-9%] rounded-full border"
                style={{ borderColor: ring, opacity: 0.55 }}
              />
              <img
                src={item.dish}
                alt={item.dishAlt}
                className="testi-drift relative w-[92%] h-auto drop-shadow-2xl"
                draggable={false}
              />
            </div>

            <div
              className={`absolute z-20 flex flex-col top-[13%] ${
                i % 2 === 0 ? 'left-[7%] items-start' : 'right-[7%] items-end'
              }`}
            >
              <span
                className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line"
                style={{ fontStyle: 'italic', color: ink }}
              >
                {item.note}
              </span>
              <CurvedArrow color={ink} flip={i % 2 === 1} className="mt-1" />
            </div>

            <span
              className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]"
              style={{ color: ink, opacity: 0.6 }}
            >
              {String(i + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>
          </div>
        )
      })
      .reverse(),
  ]

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-white select-none ${
        useSplit ? 'lg:h-screen lg:overflow-hidden' : ''
      }`}
    >
      {/* ================================================================
          DESKTOP — DUAL-DIRECTION SPLIT SCREEN
          ================================================================ */}
      {useSplit && (
        <div className="hidden lg:flex absolute inset-0 w-full h-full overflow-hidden">
          {/* ------------------- LEFT STACK — travels up ------------------ */}
          <div className="relative w-[55%] h-full overflow-hidden border-r border-[#1a1a1a]/10">
            <div
              ref={leftColRef}
              className="w-full flex flex-col will-change-transform"
              style={{ height: `${PANELS * 100}%` }}
            >
              {premiumTestimonials.map((item, i) => (
                <div
                  key={item.author}
                  className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16"
                  style={{ height: panelHeight, background: item.theme.tint }}
                >
                  <div className={i === 0 ? 'testi-reveal' : undefined}>
                    <span
                      className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em]"
                      style={{ color: item.theme.accent }}
                    >
                      Client Feedback
                    </span>
                    <span
                      className="mt-3 block w-14 h-[2px]"
                      style={{ background: item.theme.accent }}
                    />
                  </div>

                  {i === 0 && (
                    <h2 className="testi-reveal text-4xl xl:text-[3.2rem] font-black text-[#1a1a1a] font-outfit tracking-tight leading-[0.95] mt-6">
                      What Our Clients Say
                    </h2>
                  )}

                  <QuoteMark
                    className={`w-12 h-12 mt-8 mb-6 ${
                      i === 0 ? 'testi-reveal' : ''
                    }`}
                    color={item.theme.accent}
                  />

                  <div className={i === 0 ? 'testi-reveal' : undefined}>
                    <blockquote className="text-xl xl:text-[1.6rem] text-[#1a1a1a] font-bold leading-snug max-w-2xl">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <div className="mt-7">
                      <p
                        className="text-sm font-bold font-outfit tracking-[0.18em] uppercase"
                        style={{ color: item.theme.accent }}
                      >
                        {item.author}
                      </p>
                      <p className="text-[11px] text-[#1a1a1a]/50 font-semibold mt-1 tracking-[0.15em] uppercase font-outfit">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-9 ${i === 0 ? 'testi-reveal' : ''}`}>
                    {dotRow(i, item.theme.accent)}
                  </div>
                </div>
              ))}

              {/* Closing panel — arrives as the collage lands opposite it */}
              <div
                className="w-full shrink-0 bg-white flex flex-col justify-center px-14 xl:px-20 py-14 relative overflow-hidden"
                style={{ height: panelHeight }}
              >
                <div
                  className="absolute inset-0 opacity-[0.35] pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at center, rgba(26,26,26,0.14) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="relative z-10 max-w-xl">{promisePanel}</div>
              </div>
            </div>

            {/* Scroll progress across the whole pin */}
            <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#1a1a1a]/10 z-30">
              <span
                ref={progressRef}
                className="block h-full w-full bg-[#cc9933] origin-left scale-x-0"
              />
            </span>
          </div>

          {/* ----------------- RIGHT STACK — travels down ----------------- */}
          <div className="relative w-[45%] h-full overflow-hidden">
            {/*
              Parked at the bottom of its own stack so the first plate is what
              shows on entry; scrolling walks it back up to 0, which reads as
              the panels sliding downward past the climbing quotes.
            */}
            <div
              ref={rightColRef}
              className="w-full flex flex-col will-change-transform"
              style={{
                height: `${PANELS * 100}%`,
                transform: `translateY(-${TRAVEL}%)`,
              }}
            >
              {rightPanels}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          MOBILE / REDUCED MOTION — EVERY QUOTE IN THE FLOW
          ================================================================ */}
      <div className={useSplit ? 'lg:hidden' : ''}>
        <div className="px-6 pt-16 pb-8">
          <span className="testi-reveal block text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.28em]">
            Client Feedback
          </span>
          <span className="testi-reveal mt-3 block w-14 h-[2px] bg-[#cc9933]" />
          <h2 className="testi-reveal text-3xl sm:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-4">
            What Our Clients Say
          </h2>
        </div>

        {premiumTestimonials.map((item, i) => {
          const ink = item.theme.onDark ? '#ffffff' : '#1a1a1a'
          const ring = item.theme.onDark
            ? 'rgba(255,255,255,0.38)'
            : 'rgba(26,26,26,0.22)'
          return (
            <div
              key={item.author}
              className="relative overflow-hidden"
              style={{ background: item.theme.solid }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: item.theme.onDark ? 0.13 : 0.18,
                  backgroundImage: `radial-gradient(circle, ${
                    item.theme.onDark
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(26,26,26,0.6)'
                  } 1px, transparent 1px)`,
                  backgroundSize: '26px 26px',
                }}
              />

              <div className="relative z-10 px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                  <QuoteMark
                    className="w-11 h-11"
                    color={item.theme.onDark ? 'rgba(255,255,255,0.18)' : '#ffffff'}
                  />
                  <span
                    className="font-outfit text-[11px] font-bold tracking-[0.2em]"
                    style={{ color: ink, opacity: 0.6 }}
                  >
                    {String(i + 1).padStart(2, '0')} /{' '}
                    {String(TOTAL).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative mx-auto mb-8 w-[62vw] max-w-[280px] aspect-square flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: ring }}
                  />
                  <div
                    className="absolute inset-[-8%] rounded-full border"
                    style={{ borderColor: ring, opacity: 0.55 }}
                  />
                  <img
                    src={item.dish}
                    alt={item.dishAlt}
                    className="relative w-[92%] h-auto drop-shadow-2xl"
                    draggable={false}
                  />
                </div>

                <blockquote
                  className="text-lg sm:text-xl font-bold leading-snug"
                  style={{ color: ink }}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="mt-6">
                  <p
                    className="text-sm font-bold font-outfit tracking-[0.18em] uppercase"
                    style={{ color: ink }}
                  >
                    {item.author}
                  </p>
                  <p
                    className="text-[11px] font-semibold mt-1 tracking-[0.15em] uppercase font-outfit"
                    style={{ color: ink, opacity: 0.7 }}
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Promise */}
        <div className="relative bg-white px-6 py-14 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(26,26,26,0.14) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="relative z-10">{promisePanel}</div>
        </div>

        {/* Collage */}
        <div className="relative bg-[#F9F6F0] py-14 overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="relative z-10 px-6 grid grid-cols-3 gap-3 items-center">
            <img
              src={CUTOUTS.jollof}
              alt="Jollof rice with grilled chicken and plantain"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
            <img
              src={CUTOUTS.steak}
              alt="Seared beef fillet with watercress and jus"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
            <img
              src={CUTOUTS.lobster}
              alt="Butter-poached lobster tail with micro herbs"
              className="w-full h-auto drop-shadow-xl"
              draggable={false}
            />
          </div>
          <p
            className="relative z-10 mt-6 text-center font-serif text-[15px] text-[#cc9933] font-semibold"
            style={{ fontStyle: 'italic' }}
          >
            plated fresh on every site
          </p>
        </div>
      </div>
    </section>
  )
}
