'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis, smoothScrollTo } from '@/lib/lenis'
import { SERVICE_ICONS } from '@/components/icons/ServiceIcons'

/** Brand gold, as specified in the guide, and its resting state on the carousel. */
const BRAND_GOLD = '#cc9933'
const GOLD_DIM = 'rgba(200,150,12,0.55)'

/**
 * Per-service accents are drawn only from the ACLL brand guide (Rev 1):
 * the gold range (#cc9933 / #D4A556 / #B37B29), the light green #A4D79C,
 * brand white, and the two sanctioned accent colours — purple #b048b8 and
 * blue #296ed6. The guide permits those two for colour coding only, which is
 * exactly this use; the section background stays brand green.
 */
const DISHES = [
  {
    id: 1,
    name: '24/7 Support Services',
    subtitle: 'Round-the-clock Support',
    img: '/assets/images/Services/fit/support.webp',
    accentColor: '#cc9933', // Brand gold
    arcColor: 'rgba(204, 153, 51, 0.25)',
    description: 'Dependable 24/7 support services ensuring seamless operations across all facilities.',
    tag: '#1 Core Service',
    division: 'Support Division'
  },
  {
    id: 2,
    name: 'Offshore Catering & Supply',
    subtitle: 'Rig & Platform Operations',
    img: '/assets/images/Services/oNSHORE2.webp',
    accentColor: '#296ed6', // Accent blue
    arcColor: 'rgba(41, 110, 214, 0.25)',
    description: 'ACLL offers a full suite of timely, dependable offshore catering and supply services for the oil and gas industry.',
    tag: '#2 Core Service',
    division: 'Offshore Division'
  },
  {
    id: 3,
    name: 'Inflight Catering',
    subtitle: 'Aviation Dining',
    img: '/assets/images/Services/fit/inflight.webp',
    accentColor: '#b048b8', // Accent purple
    arcColor: 'rgba(176, 72, 184, 0.25)',
    description: 'Premium inflight catering delivering exceptional culinary experiences for aviation clients.',
    tag: '#3 Core Service',
    division: 'Aviation Division'
  },
  {
    id: 4,
    name: 'Event Planning & Mgt',
    subtitle: 'Galas & Corporate Events',
    img: '/assets/images/Services/fit/event-planning.webp',
    accentColor: '#D4A556', // Gold light
    arcColor: 'rgba(212, 165, 86, 0.25)',
    description: 'Professional event planning and management for galas, business retreats, and special corporate events.',
    tag: '#4 Core Service',
    division: 'Event Management'
  },
  {
    id: 5,
    name: 'Ship Chandelling',
    subtitle: 'Vessel Supplies',
    img: '/assets/images/Services/fit/ship-chandelling.webp',
    accentColor: '#A4D79C', // Green light
    arcColor: 'rgba(164, 215, 156, 0.25)',
    description: 'Your reliable partner for complete ship chandelling, supplying provisions and stores to vessels of every kind.',
    tag: '#5 Core Service',
    division: 'Maritime Supplies'
  },
  {
    id: 6,
    name: 'Housekeeping Laundry & Cleaning',
    subtitle: 'Facility Care',
    img: '/assets/images/Services/fit/housekeeping.webp',
    accentColor: '#B37B29', // Gold dark
    arcColor: 'rgba(179, 123, 41, 0.25)',
    description: 'Maintaining safe and clean living conditions with our comprehensive housekeeping, laundry, and cleaning services.',
    tag: '#6 Core Service',
    division: 'Facility Management'
  },
  {
    id: 7,
    name: 'Camp Mgt Services.',
    subtitle: 'Remote Site Operations',
    img: '/assets/images/Services/fit/camp.webp',
    accentColor: '#ffffff', // Brand white
    arcColor: 'rgba(255, 255, 255, 0.25)',
    description: 'Expert camp management services ensuring seamless daily operations for remote sites and large-scale facilities.',
    tag: '#7 Core Service',
    division: 'Camp Operations'
  },
  {
    id: 8,
    name: 'VIP Catering',
    subtitle: 'Exclusive Dining',
    img: '/assets/images/Services/fit/vip-catering.webp',
    accentColor: '#cc9933', // Reuse Brand Gold
    arcColor: 'rgba(204, 153, 51, 0.25)',
    description: 'Exquisite VIP catering tailored for executives, dignitaries, and high-profile private dining experiences.',
    tag: '#8 Core Service',
    division: 'Executive Division'
  }
]

/**
 * Type scale for the accent line of a service heading.
 *
 * The heading never breaks inside a word, so a long name like
 * "Ship Chandelling" has to be given room by stepping the size down rather
 * than by letting CHANDELLING split across lines.
 */
function firstLineSizeClass(name: string) {
  if (name.includes('Housekeeping')) {
    return 'text-[1.6rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[clamp(2.1rem,4vw,5.4rem)]'
  }
  return 'text-[1.9rem] sm:text-[2.9rem] md:text-[3.9rem] lg:text-[clamp(2.5rem,4.4vw,5.8rem)]'
}

function accentSizeClass(name: string) {
  if (name.includes('Housekeeping')) {
    return 'text-[2rem] sm:text-[3.2rem] md:text-[4.4rem] lg:text-[clamp(2.8rem,5.2vw,6.8rem)]'
  }
  const longest = Math.max(
    ...name.split(' ').slice(1).map(word => word.length),
    0
  )

  if (longest >= 11) {
    return 'text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[clamp(2.8rem,4.6vw,6rem)]'
  }
  if (longest >= 9) {
    return 'text-[2.2rem] sm:text-[3.3rem] md:text-[4.4rem] lg:text-[clamp(3rem,5vw,6.6rem)]'
  }
  return 'text-[2.4rem] sm:text-[3.6rem] md:text-[4.8rem] lg:text-[clamp(3.2rem,5.6vw,7.2rem)]'
}

/**
 * Every plate gets its own move instead of one repeated spin: `enter` is the
 * state the image animates FROM when its slide arrives, `exit` the state it
 * animates TO when it leaves. Scrubbing backwards simply reverses them.
 * Core GSAP transforms only — no paid plugins.
 */
type PlateMove = {
  enter: gsap.TweenVars
  exit: gsap.TweenVars
  ease: string
  exitEase: string
}

/** Every property any recipe touches, at rest — the shared "landed" state. */
const PLATE_RESET: gsap.TweenVars = {
  x: 0,
  y: 0,
  z: 0,
  xPercent: 0,
  yPercent: 0,
  rotation: 0,
  rotationX: 0,
  rotationY: 0,
  skewX: 0,
  scale: 1,
  opacity: 1,
  filter: 'blur(0px)',
  transformOrigin: '50% 50%',
}

/* ── Hand-off timing ──────────────────────────────────────────────────────
   The old slide used to leave over the same beat the new one arrived on, so
   mid-transition both sat near 50% opacity on top of each other and the whole
   thing read as mush. Now the exit runs first and the entry starts just before
   it finishes: a short overlap that hides the swap without ever showing two
   services at once. Opacity gets its own, shorter tween at each end — the old
   slide is invisible well before it stops moving, and the new one finishes
   fading in early so it lands solid rather than arriving translucent. */
const EXIT = 0.62
const ENTER_AT = 0.34
const ENTER = 0.82
/** Fade completes in this fraction of the move it rides on. */
const FADE_OUT_RATIO = 0.72
const FADE_IN_RATIO = 0.55

/** Transform-only copy of a vars object, so opacity can be tweened separately. */
const withoutOpacity = (vars: gsap.TweenVars): gsap.TweenVars => {
  const { opacity, ...rest } = vars
  return rest
}

const PLATE_MOVES: PlateMove[] = [
  {
    // 24/7 Support — the signature drop-and-spin
    enter: { y: -680, rotation: 180, opacity: 0 },
    exit: { y: 560, rotation: -120, opacity: 0 },
    ease: 'power4.out',
    exitEase: 'power2.in',
  },
  {
    // Offshore — 3D door swing off its left edge
    enter: { rotationY: -105, xPercent: 60, opacity: 0, transformOrigin: 'left center' },
    exit: { rotationY: 95, xPercent: -55, opacity: 0, transformOrigin: 'right center' },
    ease: 'power3.out',
    exitEase: 'power2.in',
  },
  {
    // Inflight — arrives out of depth, blur pulling into focus
    enter: { scale: 0.3, z: -650, opacity: 0, filter: 'blur(18px)' },
    exit: { scale: 1.7, opacity: 0, filter: 'blur(20px)' },
    ease: 'expo.out',
    exitEase: 'power2.in',
  },
  {
    // Event Planning — pendulum swing hinged at the top corner
    enter: { rotation: -50, y: -240, opacity: 0, transformOrigin: 'top left' },
    exit: { rotation: 44, y: 210, opacity: 0, transformOrigin: 'top right' },
    ease: 'back.out(1.5)',
    exitEase: 'power2.in',
  },
  {
    // Ship Chandelling — vessel crests into frame off a swell and lists as it
    // rises, levelling out flat on arrival; leaves by dipping away over the
    // horizon with the opposite roll, like it's sailing off past the bow wave.
    enter: { y: 340, rotation: -13, xPercent: -8, scale: 0.9, opacity: 0, transformOrigin: 'center bottom' },
    exit: { y: -280, rotation: 11, xPercent: 14, scale: 1.08, opacity: 0, transformOrigin: 'center bottom' },
    ease: 'power2.out',
    exitEase: 'power1.in',
  },
  {
    // Housekeeping — skewed slide, like a card dealt across the frame
    enter: { xPercent: 108, skewX: -16, opacity: 0 },
    exit: { xPercent: -100, skewX: 14, opacity: 0 },
    ease: 'power4.out',
    exitEase: 'power3.in',
  },
  {
    // Camp — spiral in from a point
    enter: { rotation: 200, scale: 0.25, opacity: 0 },
    exit: { rotation: -165, scale: 0.3, opacity: 0 },
    ease: 'power3.out',
    exitEase: 'power2.in',
  },
  {
    // VIP — rises with a tilt and settles elastically
    enter: { yPercent: 80, rotationY: 40, scale: 0.85, opacity: 0 },
    exit: { yPercent: -68, rotationY: -36, scale: 0.9, opacity: 0 },
    ease: 'elastic.out(1,0.75)',
    exitEase: 'power2.in',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const arcRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    mm.add(
      {
        // Blur costs real GPU time on phones, and 3D reads badly in a tall
        // stacked layout — both are desktop-only embellishments.
        rich: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
        // matchMedia only runs the callback when a condition matches, so this
        // one keeps phones (narrow + no motion preference) animated too.
        base: 'all',
      },
      (ctx) => {
        const { rich, reduced } = ctx.conditions as { rich: boolean; reduced: boolean }

        // Reduced motion gets a plain crossfade; everything else keeps the move
        // but drops the blur filter unless we're on a desktop viewport.
        const move = (vars: gsap.TweenVars): gsap.TweenVars => {
          if (reduced) return { opacity: 0 }
          if (rich) return { ...vars }
          const { filter, ...rest } = vars
          return rest
        }
        const easeFor = (ease: string) => (reduced ? 'none' : ease)

        // Perspective has to live on the plates for rotationX/Y to read as 3D
        gsap.set('.dish-plate', { transformPerspective: 1200 })

        // Section-level hand-off with whatever sits above (Hero/About) —
        // without this the pinned content simply snaps fully in the instant
        // the pin engages, and scrolling back out cuts just as hard. Scrubbing
        // it in over the approach corridor means scrolling back up reads as a
        // settle/close instead of a jump cut once the pin releases.
        gsap.fromTo(contentRef.current,
          reduced
            ? { opacity: 0 }
            : { opacity: 0, y: 70, scale: 0.96, filter: rich ? 'blur(6px)' : 'blur(0px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            ease: easeFor('power2.out'),
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
            },
          }
        )

        // Initial setup for Slide 0
        gsap.set('.dish-plate-0', { ...PLATE_RESET })
        gsap.set('.dish-content-0', { x: 0, opacity: 1 })

        // Park every other plate in its own entry pose
        DISHES.forEach((_, idx) => {
          if (idx > 0) {
            gsap.set(`.dish-plate-${idx}`, { ...PLATE_RESET, ...move(PLATE_MOVES[idx].enter) })
            gsap.set(`.dish-content-${idx}`, { x: -600, opacity: 0 })
          }
        })

        // Slow idle drift on the artwork itself, so the plate never sits dead
        // still between slides. Runs on the <img>, leaving the wrapper's
        // transforms free for the scroll-driven moves above.
        if (!reduced) {
          DISHES.forEach((_, idx) => {
            gsap.to(`.dish-plate-${idx} img`, {
              y: -12,
              duration: 3 + idx * 0.12,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
          })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'services-pin',
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * (DISHES.length - 1)}`, // Dynamic total scroll distance
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            preventOverlaps: true,
            fastScrollEnd: true,
          }
        })

        DISHES.forEach((dish, idx) => {
          if (idx === 0) return

          const prevIdx = idx - 1
          const label = `slide-${idx}`
          const enterAt = `${label}+=${ENTER_AT}`

          tl.addLabel(label)

          // The incoming slide paints above the outgoing one, so scrubbing
          // backwards can't leave the old plate sitting on top of the new one.
          tl.set(`.dish-plate-${prevIdx}`, { zIndex: 1 }, label)
          tl.set(`.dish-plate-${idx}`, { zIndex: 2 }, enterAt)

          // 1. Previous dish leaves on its own exit move. Opacity is a separate,
          //    shorter tween so the old plate is *gone* before the new one lands
          //    instead of both hanging at half strength through the middle.
          tl.to(`.dish-plate-${prevIdx}`, {
            ...withoutOpacity(move(PLATE_MOVES[prevIdx].exit)),
            duration: EXIT,
            ease: easeFor(PLATE_MOVES[prevIdx].exitEase),
          }, label)
          tl.to(`.dish-plate-${prevIdx}`, {
            opacity: 0,
            duration: EXIT * FADE_OUT_RATIO,
            ease: easeFor('power2.in'),
          }, label)

          // 2. Previous content/title exits right
          tl.to(`.dish-content-${prevIdx}`, {
            x: 600,
            duration: EXIT,
            ease: 'power2.in',
          }, label)
          tl.to(`.dish-content-${prevIdx}`, {
            opacity: 0,
            duration: EXIT * FADE_OUT_RATIO,
            ease: 'power2.in',
          }, label)


          // 4. Arc border colour crosses the whole hand-off
          tl.to(arcRef.current, {
            borderColor: dish.arcColor,
            duration: ENTER_AT + ENTER,
            ease: 'power1.inOut',
          }, label)

          // 5. New dish arrives on its own entry move, fading in over the first
          //    part of it so it reads as arriving rather than materialising.
          tl.fromTo(`.dish-plate-${idx}`,
            withoutOpacity({ ...PLATE_RESET, ...move(PLATE_MOVES[idx].enter) }),
            { ...withoutOpacity(PLATE_RESET), duration: ENTER, ease: easeFor(PLATE_MOVES[idx].ease) },
            enterAt
          )
          tl.fromTo(`.dish-plate-${idx}`,
            { opacity: 0 },
            { opacity: 1, duration: ENTER * FADE_IN_RATIO, ease: easeFor('power2.out') },
            enterAt
          )

          // 6. New content/title slides in from left
          tl.fromTo(`.dish-content-${idx}`,
            { x: -600 },
            { x: 0, duration: ENTER, ease: 'power3.out' },
            enterAt
          )
          tl.fromTo(`.dish-content-${idx}`,
            { opacity: 0 },
            { opacity: 1, duration: ENTER * FADE_IN_RATIO, ease: 'power2.out' },
            enterAt
          )


          // 8. Carousel thumbnail active style transition
          tl.to(`.carousel-thumb-${prevIdx}`, {
            opacity: 0.6,
            duration: EXIT,
            ease: 'power1.inOut'
          }, label)
          tl.to(`.carousel-thumb-${prevIdx} .thumb-circle-container`, {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            scale: 0.85,
            duration: EXIT,
            ease: 'power1.inOut'
          }, label)
          tl.to(`.carousel-thumb-${prevIdx} .thumb-icon`, {
            color: GOLD_DIM,
            duration: EXIT,
            ease: 'power1.inOut'
          }, label)
          tl.to(`.carousel-thumb-${prevIdx} .thumb-name`, {
            color: 'rgba(255, 255, 255, 0.45)',
            duration: EXIT,
          }, label)
          tl.to(`.carousel-thumb-${prevIdx} .thumb-subtitle`, {
            color: 'rgba(255, 255, 255, 0.25)',
            duration: EXIT,
          }, label)

          tl.to(`.carousel-thumb-${idx}`, {
            opacity: 1,
            duration: ENTER,
            ease: 'power1.inOut'
          }, enterAt)
          tl.to(`.carousel-thumb-${idx} .thumb-circle-container`, {
            borderColor: '#ffffff',
            scale: 1,
            duration: ENTER,
            ease: 'power1.inOut'
          }, enterAt)
          tl.to(`.carousel-thumb-${idx} .thumb-icon`, {
            color: BRAND_GOLD,
            duration: ENTER,
            ease: 'power1.inOut'
          }, enterAt)
          tl.to(`.carousel-thumb-${idx} .thumb-name`, {
            color: '#ffffff',
            duration: ENTER,
          }, enterAt)
          tl.to(`.carousel-thumb-${idx} .thumb-subtitle`, {
            color: dish.accentColor,
            duration: ENTER,
          }, enterAt)
        })
      }
    )

    /* Label snapping — one timeline label per slide, so releasing the wheel
       mid-transition settles on the nearest service instead of a half state.
       Driven through Lenis rather than ScrollTrigger's own snap, which would
       fight Lenis for ownership of the scroll position. */
    let snapTimer: ReturnType<typeof setTimeout> | null = null
    const settleOnNearestSlide = () => {
      if (snapTimer) clearTimeout(snapTimer)
      const st = ScrollTrigger.getById('services-pin')
      if (!st || !st.isActive) return
      snapTimer = setTimeout(() => {
        const trigger = ScrollTrigger.getById('services-pin')
        if (!trigger || !trigger.isActive) return
        const step = (trigger.end - trigger.start) / (DISHES.length - 1)
        const index = Math.round((trigger.scroll() - trigger.start) / step)
        const target = trigger.start + index * step
        if (Math.abs(target - trigger.scroll()) > 4) smoothScrollTo(target, 0.7)
      }, 170)
    }

    const lenis = getLenis()
    lenis?.on('scroll', settleOnNearestSlide)

    return () => {
      if (snapTimer) clearTimeout(snapTimer)
      lenis?.off('scroll', settleOnNearestSlide)
      mm.revert()
    }
  }, { scope: sectionRef })

  const handleCarouselClick = (index: number) => {
    if (!sectionRef.current) return
    const trigger = ScrollTrigger.getById('services-pin')
    if (trigger) {
      const start = trigger.start
      const end = trigger.end
      const targetScroll = start + (index / (DISHES.length - 1)) * (end - start)
      // Drive the jump through Lenis so it eases with the same curve as the
      // wheel; falls back to native smooth scroll if Lenis isn't running.
      smoothScrollTo(targetScroll, 1.4)
    }
  }

  const prev = () => {
    const trigger = ScrollTrigger.getById('services-pin')
    if (!trigger) return
    const currentProgress = trigger.scroll() - trigger.start
    const stepSize = (trigger.end - trigger.start) / (DISHES.length - 1)
    const currentIndex = Math.round(currentProgress / stepSize)
    const nextIndex = currentIndex === 0 ? DISHES.length - 1 : currentIndex - 1
    handleCarouselClick(nextIndex)
  }

  const next = () => {
    const trigger = ScrollTrigger.getById('services-pin')
    if (!trigger) return
    const currentProgress = trigger.scroll() - trigger.start
    const stepSize = (trigger.end - trigger.start) / (DISHES.length - 1)
    const currentIndex = Math.round(currentProgress / stepSize)
    const nextIndex = currentIndex === DISHES.length - 1 ? 0 : currentIndex + 1
    handleCarouselClick(nextIndex)
  }

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        backgroundImage: "url('/images/premium-green-texture.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── overlays ── */}
      <div className="absolute inset-0 bg-[#66cc33] mix-blend-multiply opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── ARC ── */}
      <div
        ref={arcRef}
        className="absolute pointer-events-none z-10 hidden md:block"
        style={{
          left: '-650px',
          top: 'calc(50% - 1681px)',
          width: '1800px',
          height: '1800px',
          border: '220px solid rgba(204, 153, 51, 0.25)',
          borderRadius: '50%',
          transformOrigin: 'center center',
        }}
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div ref={contentRef} className="relative w-full h-full flex flex-col justify-center z-20">

        {/* Top row: dish + text + card */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-14 flex-1 relative mt-16 md:mt-24 w-full max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12">

          {/* A ─ Dish plates stacked absolutely */}
          {/* Box matches the 4:3 canvas every cutout is normalised onto, so
              object-contain frames each subject identically — no cropping. */}
          <div className="relative z-20 pointer-events-none shrink-0 aspect-[4/3] w-[370px] sm:w-[500px] md:w-[620px] lg:w-[min(clamp(420px,48vw,1000px),calc((100vh_-_12rem)*4/3))] mx-auto lg:mx-0">
            {DISHES.map((dish, idx) => (
              <div
                key={dish.id}
                className={`dish-plate dish-plate-${idx} absolute inset-0`}
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-contain [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.32))]"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* B ─ Text/Content stacked absolutely */}
          {/* min-w-0 lets this column actually shrink inside the flex row, so
              max-w-full on the heading resolves to the space left by the card */}
          <div className="relative z-20 flex-1 min-w-0 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[min(560px,calc(100vh_-_13rem))] w-full mt-4 lg:mt-0">
            {DISHES.map((dish, idx) => (
              <div
                key={dish.id}
                className={`dish-content dish-content-${idx} absolute inset-0 flex flex-col justify-start lg:justify-center items-center lg:items-start text-center lg:text-left gap-3 lg:gap-[15%] w-full`}
              >
                <div className="w-full min-w-0 max-w-full">
                  <p className="font-outfit text-[11px] md:text-base font-semibold tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/70 mb-2 lg:mb-3">
                    {dish.tag}
                  </p>

                  <h2 className="font-outfit leading-[1.0] uppercase w-full max-w-full break-normal hyphens-none [overflow-wrap:normal]">
                    <span className="block font-extralight tracking-[0.03em] text-[1.9rem] sm:text-[2.9rem] md:text-[3.9rem] lg:text-[clamp(2.5rem,4.4vw,5.8rem)] text-white/95 py-2">
                      {dish.name.split(' ')[0]}
                    </span>
                    <span
                      className={`block font-black tracking-tight -mt-1 md:-mt-2 ${accentSizeClass(dish.name)}`}
                      style={{ color: dish.accentColor }}
                    >
                      {dish.name.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                  {/* Service description — was the Overview card's body copy */}
                  <p className="font-inter mt-4 lg:mt-6 max-w-[34rem] mx-auto lg:mx-0 text-[12px] md:text-[14px] leading-relaxed text-white/70">
                    {dish.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-12 mt-4 lg:mt-8 font-inter">
                  <a
                    href="/contact"
                    className="group flex items-center gap-3 md:gap-4 text-white/80 hover:text-white transition-all"
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full text-white shadow-lg transition-colors"
                      style={{
                        backgroundColor: dish.accentColor,
                        boxShadow: `0 10px 15px -3px ${dish.accentColor}33`,
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4H5L4 6v2h2l3.6 7.59L8.25 18A2 2 0 0010 21h9v-2h-8.58a.25.25 0 01-.22-.37L11.1 17h6.45a2 2 0 001.79-1.11L23 9H8.42L7 4z" />
                      </svg>
                    </div>
                    <span className="font-medium text-[10px] md:text-sm tracking-widest uppercase">Request Service</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* F ─ Dish carousel — bottom strip */}
        <div className="flex w-full items-center justify-center px-6 pb-8 shrink-0">
          <div className="hidden md:flex items-center gap-6 xl:gap-8 z-20 mt-4">
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dish thumbnails */}
            <div className="flex items-end gap-4 xl:gap-6">
              {DISHES.map((dish, idx) => (
                <button
                  key={dish.id}
                  onClick={() => handleCarouselClick(idx)}
                  className={`carousel-thumb-${idx} flex flex-col items-center gap-2 group transition-all`}
                  style={{ opacity: idx === 0 ? 1 : 0.6 }}
                >
                  {/* Brand service icon — the line set from the Brand Profile */}
                  <div
                    className={`thumb-circle-container grid place-items-center rounded-full bg-white/5 transition-all duration-300 ring-offset-2 ring-offset-transparent border-[1.5px]
                      ${idx === 0
                        ? 'w-[72px] h-[72px] xl:w-[84px] xl:h-[84px] border-white'
                        : 'w-[56px] h-[56px] xl:w-[64px] xl:h-[64px] border-white/20'
                      }`}
                  >
                    {(() => {
                      const Icon = SERVICE_ICONS[dish.id]
                      return Icon ? (
                        <Icon
                          className={`thumb-icon ${idx === 0 ? 'w-[60%] h-[60%]' : 'w-[58%] h-[58%]'}`}
                          style={{ color: idx === 0 ? BRAND_GOLD : GOLD_DIM }}
                        />
                      ) : null
                    })()}
                  </div>

                  {/* Label */}
                  <div className="flex flex-col items-center gap-0.5">
                    <span
                      className={`thumb-name font-inter text-[10px] xl:text-[11px] font-semibold tracking-wide transition-colors leading-tight text-center max-w-[80px]
                        ${idx === 0 ? 'text-white' : 'text-white/45 group-hover:text-white/70'}`}
                    >
                      {dish.name}
                    </span>
                    <span
                      className={`thumb-subtitle font-inter text-[9px] tracking-wider uppercase transition-colors
                        ${idx === 0 ? 'text-[#cc9933]' : 'text-white/25 group-hover:text-white/40'}`}
                      style={{ color: idx === 0 ? dish.accentColor : undefined }}
                    >
                      {dish.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}