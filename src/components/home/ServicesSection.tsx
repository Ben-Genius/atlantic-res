'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DISHES = [
  {
    id: 1,
    name: 'Onshore Catering',
    subtitle: 'Remote Site Dining',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#EF9419',
    arcColor: 'rgba(239, 148, 25, 0.25)',
    rating: '4.8',
    ratingColor: 'bg-[#EF9419]',
    description: 'ACLL offers a full suite of timely, dependable onshore catering services for clients across the country.',
    tag: '#1 Core Service',
    division: 'Onshore Division'
  },
  {
    id: 2,
    name: 'Offshore Catering',
    subtitle: 'Rig & Platform Catering',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#10B981', // emerald green
    arcColor: 'rgba(16, 185, 129, 0.25)',
    rating: '4.9',
    ratingColor: 'bg-[#10B981]',
    description: 'ACLL offers a full suite of timely, dependable offshore catering services for the oil and gas industry.',
    tag: '#2 Core Service',
    division: 'Offshore Division'
  },
  {
    id: 3,
    name: 'Contract Catering',
    subtitle: 'On-site Cafés & Dining',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#3B82F6', // blue
    arcColor: 'rgba(59, 130, 246, 0.25)',
    rating: '4.6',
    ratingColor: 'bg-[#3B82F6]',
    description: 'ACLL is specialized in formal catering services for on-site restaurant and café operations.',
    tag: '#3 Core Service',
    division: 'Contract Division'
  },
  {
    id: 4,
    name: 'Camp Design',
    subtitle: 'Top-Tier Construction',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#EC4899', // pink
    arcColor: 'rgba(236, 72, 153, 0.25)',
    rating: '4.7',
    ratingColor: 'bg-[#EC4899]',
    description: 'We custom design, build top-tier camps and also manage the daily operations while supplying and distributing the essential goods and services.',
    tag: '#4 Core Service',
    division: 'Camp Management & Operations'
  },
  {
    id: 5,
    name: 'Event Planning',
    subtitle: 'Galas & Business Events',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#8B5CF6', // violet
    arcColor: 'rgba(139, 92, 246, 0.25)',
    rating: '4.5',
    ratingColor: 'bg-[#8B5CF6]',
    description: 'Let us create the fresh, seasonal menus for your upcoming gala, birthday party or office retreat and business events.',
    tag: '#5 Core Service',
    division: 'Event Management & Planning'
  },
  {
    id: 6,
    name: 'Ship Supplies',
    subtitle: 'Provisions & Store Supply',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#F59E0B', // amber
    arcColor: 'rgba(245, 158, 11, 0.25)',
    rating: '4.9',
    ratingColor: 'bg-[#F59E0B]',
    description: 'ACLL is your reliable partner in the supply of provisions and stores to the offshore industry and ships of every kind.',
    tag: '#6 Core Service',
    division: 'Ship & Store Supplies'
  },
  {
    id: 7,
    name: 'Housekeeping Services',
    subtitle: 'Facility & Laundry Care',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    accentColor: '#06B6D4', // cyan
    arcColor: 'rgba(6, 182, 212, 0.25)',
    rating: '4.7',
    ratingColor: 'bg-[#06B6D4]',
    description: 'At ACLL, our goal is to provide a safe well-maintained camp or facility to ensure healthy living conditions, including full laundry and housekeeping services.',
    tag: '#7 Core Service',
    division: 'Housekeeping & Laundry Services'
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const arcRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initial setup for Slide 0
    gsap.set('.dish-plate-0', { x: 0, y: 0, rotate: 0, opacity: 1 })
    gsap.set('.dish-content-0', { x: 0, opacity: 1 })
    gsap.set('.dish-card-0', { x: 0, opacity: 1 })

    // Hide others
    DISHES.forEach((_, idx) => {
      if (idx > 0) {
        gsap.set(`.dish-plate-${idx}`, { y: -800, rotate: 180, opacity: 0 })
        gsap.set(`.dish-content-${idx}`, { x: -600, opacity: 0 })
        gsap.set(`.dish-card-${idx}`, { x: 200, opacity: 0 })
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'services-pin',
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 6}`, // 600vh total scroll distance for 7 items
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    DISHES.forEach((dish, idx) => {
      if (idx === 0) return

      const prevIdx = idx - 1
      const label = `slide-${idx}`

      tl.addLabel(label)

      // 1. Previous dish exits left with rotation
      tl.to(`.dish-plate-${prevIdx}`, {
        x: -600,
        rotate: -120,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, label)

      // 2. Previous content/title exits right
      tl.to(`.dish-content-${prevIdx}`, {
        x: 600,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, label)

      // 3. Previous card exits right
      tl.to(`.dish-card-${prevIdx}`, {
        x: 200,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, label)

      // 4. Arc border color changes
      tl.to(arcRef.current, {
        borderColor: dish.arcColor,
        duration: 1,
        ease: 'power2.inOut',
      }, label)

      // 5. New dish drops in from top with spin
      tl.fromTo(`.dish-plate-${idx}`,
        { y: -800, x: 0, rotate: 180, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1, ease: 'power2.inOut' },
        `${label}+=0.1`
      )

      // 6. New content/title slides in from left
      tl.fromTo(`.dish-content-${idx}`,
        { x: -600, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' },
        `${label}+=0.1`
      )

      // 7. New card slides in from right
      tl.fromTo(`.dish-card-${idx}`,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.inOut' },
        `${label}+=0.1`
      )

      // 8. Carousel thumbnail active style transition
      tl.to(`.carousel-thumb-${prevIdx}`, {
        opacity: 0.6,
        duration: 0.5,
        ease: 'power1.inOut'
      }, label)
      tl.to(`.carousel-thumb-${prevIdx} .thumb-circle-container`, {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        scale: 0.85,
        duration: 0.5,
        ease: 'power1.inOut'
      }, label)
      tl.to(`.carousel-thumb-${prevIdx} .thumb-name`, {
        color: 'rgba(255, 255, 255, 0.45)',
        duration: 0.5,
      }, label)
      tl.to(`.carousel-thumb-${prevIdx} .thumb-subtitle`, {
        color: 'rgba(255, 255, 255, 0.25)',
        duration: 0.5,
      }, label)

      tl.to(`.carousel-thumb-${idx}`, {
        opacity: 1,
        duration: 0.5,
        ease: 'power1.inOut'
      }, `${label}+=0.1`)
      tl.to(`.carousel-thumb-${idx} .thumb-circle-container`, {
        borderColor: '#ffffff',
        scale: 1,
        duration: 0.5,
        ease: 'power1.inOut'
      }, `${label}+=0.1`)
      tl.to(`.carousel-thumb-${idx} .thumb-name`, {
        color: '#ffffff',
        duration: 0.5,
      }, `${label}+=0.1`)
      tl.to(`.carousel-thumb-${idx} .thumb-subtitle`, {
        color: dish.accentColor,
        duration: 0.5,
      }, `${label}+=0.1`)
    })
  }, { scope: sectionRef })

  const handleCarouselClick = (index: number) => {
    if (!sectionRef.current) return
    const trigger = ScrollTrigger.getById('services-pin')
    if (trigger) {
      const start = trigger.start
      const end = trigger.end
      const targetScroll = start + (index / (DISHES.length - 1)) * (end - start)
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
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
      <div className="absolute inset-0 bg-[#35b435] mix-blend-multiply opacity-90 pointer-events-none z-0" />
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
          border: '220px solid rgba(239, 148, 25, 0.25)',
          borderRadius: '50%',
          transformOrigin: 'center center',
        }}
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="relative w-full h-full flex flex-col justify-center z-20">

        {/* Top row: dish + text + card */}
        <div className="flex items-center ml-4 sm:ml-6 md:ml-[25px] lg:ml-[45px] xl:ml-[65px] gap-[30px] flex-1 relative mt-16 md:mt-24">

          {/* A ─ Dish plates stacked absolutely */}
          <div className="relative z-20 pointer-events-none shrink-0 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[620px] lg:h-[620px] xl:w-[680px] xl:h-[680px]">
            {DISHES.map((dish, idx) => (
              <div
                key={dish.id}
                className={`dish-plate dish-plate-${idx} absolute inset-0 rounded-full border-[6px] md:border-[10px] border-white/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden`}
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover scale-[1.02] mt-5"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* B ─ Text/Content stacked absolutely */}
          <div className="relative z-20 flex-1 h-[400px] md:h-[500px]">
            {DISHES.map((dish, idx) => (
              <div
                key={dish.id}
                className={`dish-content dish-content-${idx} absolute inset-y-0 left-0 flex flex-col justify-start gap-[20%] w-full`}
              >
                <div>
                  <p className="font-outfit text-xs md:text-sm font-semibold tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/70 mb-2">
                    {dish.tag}
                  </p>

                  <h2 className="font-outfit leading-[1.0] uppercase">
                    <span className="block font-extralight tracking-[0.04em] text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] xl:text-[5.2rem] text-white/95">
                      {dish.name.split(' ')[0]}
                    </span>
                    <span
                      className="block font-black tracking-tight text-[2.5rem] sm:text-[3.5rem] md:text-[4.8rem] lg:text-[5.8rem] xl:text-[6.8rem] -mt-1 md:-mt-2"
                      style={{ color: dish.accentColor }}
                    >
                      {dish.name.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-8 sm:gap-12 mt-8 md:mt-10 font-inter">
                  <a href="#" className="group flex items-center gap-3 md:gap-4 text-white/80 hover:text-white transition-all">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 group-hover:border-white/60 transition-colors bg-white/5 backdrop-blur-sm">
                      <svg className="w-3 h-3 md:w-4 md:h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-xs md:text-sm tracking-widest uppercase">Contact</span>
                  </a>

                  <a
                    href="#"
                    className="group flex items-center gap-3 md:gap-4 text-white/80 hover:text-white transition-all"
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-white shadow-lg transition-colors"
                      style={{
                        backgroundColor: dish.accentColor,
                        boxShadow: `0 10px 15px -3px ${dish.accentColor}33`,
                      }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4H5L4 6v2h2l3.6 7.59L8.25 18A2 2 0 0010 21h9v-2h-8.58a.25.25 0 01-.22-.37L11.1 17h6.45a2 2 0 001.79-1.11L23 9H8.42L7 4z" />
                      </svg>
                    </div>
                    <span className="font-medium text-xs md:text-sm tracking-widest uppercase">Request Service</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* E ─ Overview card stacked absolutely */}
          <div className="relative hidden lg:block w-[300px] xl:w-[320px] h-[400px] shrink-0 ml-auto mr-8 xl:mr-16 self-center mt-[1rem]">
            {DISHES.map((dish, idx) => {
              return (
                <div
                  key={dish.id}
                  className={`dish-card dish-card-${idx} absolute inset-0 flex flex-col rounded-2xl overflow-hidden bg-black/50 backdrop-blur-md border border-white/15`}
                >
                  {/* Tab row */}
                  <div className="flex border-b border-white/15">
                    <button className="flex-1 py-3 text-[11px] xl:text-xs font-semibold tracking-widest uppercase text-white bg-white/10 font-inter">
                      Overview
                    </button>
                    <button className="flex-1 py-3 text-[11px] xl:text-xs font-semibold tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors font-inter">
                      Atlantic
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 p-5 xl:p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-14 h-14 xl:w-16 xl:h-16 rounded-2xl shrink-0 ${dish.ratingColor}`}>
                        <span className="font-outfit font-black text-white text-xl xl:text-2xl leading-none">{dish.rating}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-3 h-3"
                              fill={star <= Math.floor(parseFloat(dish.rating)) ? dish.accentColor : 'rgba(255, 255, 255, 0.25)'}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[10px] xl:text-[11px] text-white/50 tracking-wide uppercase font-medium font-inter">Rating</span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10" />

                    {/* Name */}
                    <div className="flex flex-col gap-0.5">
                      <p className="font-outfit font-bold text-white text-sm xl:text-base leading-snug">
                        {dish.name}
                      </p>
                      <p
                        className="text-[10px] xl:text-[11px] tracking-widest uppercase font-semibold font-inter"
                        style={{ color: dish.accentColor }}
                      >
                        {dish.division}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] xl:text-xs text-white/60 leading-relaxed font-inter">
                      {dish.description}
                    </p>

                    <div className="w-full h-px bg-white/10" />

                    {/* Thumbs */}
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 transition-colors text-white/70 hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a2 2 0 01-1.789-1.106L5 10H3V5a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="text-[11px] font-semibold font-inter">24</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 transition-colors text-white/70 hover:text-white">
                        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a2 2 0 01-1.789-1.106L5 10H3V5a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="text-[11px] font-semibold font-inter">2</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* F ─ Dish carousel — bottom strip */}
        <div className="flex w-full items-center justify-center ml-4 sm:ml-6 md:ml-[20px] lg:ml-[40px] xl:ml-[8rem] pb-8 shrink-0">
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
                  {/* Thumbnail circle */}
                  <div
                    className={`thumb-circle-container rounded-full overflow-hidden transition-all duration-300 ring-offset-2 ring-offset-transparent border-[1.5px]
                      ${idx === 0
                        ? 'w-[72px] h-[72px] xl:w-[84px] xl:h-[84px] border-white'
                        : 'w-[56px] h-[56px] xl:w-[64px] xl:h-[64px] border-white/20'
                      }`}
                  >
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
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
                        ${idx === 0 ? 'text-[#EF9419]' : 'text-white/25 group-hover:text-white/40'}`}
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