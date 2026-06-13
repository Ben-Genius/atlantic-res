'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DISHES = [
  {
    id: 1,
    name: 'Grilled Salmon',
    subtitle: 'Atlantic special',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
  },
  {
    id: 2,
    name: 'Offshore Catering',
    subtitle: 'Most loved dish',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
    active: true,
  },
  {
    id: 3,
    name: 'Crew Breakfast',
    subtitle: 'Morning special',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
  },
  {
    id: 4,
    name: 'Rig Roast',
    subtitle: 'Sunday classic',
    img: '/images/services/atlantic/offshore-catering-new.jpg',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const arcRef = useRef<HTMLDivElement>(null)
  const dishRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [activeDish, setActiveDish] = useState(1)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(arcRef.current, { rotate: 55, opacity: 0 })
    gsap.set(dishRef.current, { x: -280, rotate: -40, opacity: 0 })
    gsap.set(contentRef.current, { x: 80, opacity: 0 })
    gsap.set(cardRef.current, { x: 60, opacity: 0 })
    gsap.set(carouselRef.current, { y: 40, opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    tl.to(arcRef.current, {
      rotate: 80,
      opacity: 1,
      duration: 1.8,
      ease: 'power3.out',
    })
      .to(dishRef.current, {
        x: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.6,
        ease: 'power4.out',
      }, '-=1.4')
      .to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
      }, '-=1.1')
      .to(cardRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.0')
      .to(carouselRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
      }, '-=0.8')
  }, { scope: sectionRef })

  const prev = () => setActiveDish(i => (i === 0 ? DISHES.length - 1 : i - 1))
  const next = () => setActiveDish(i => (i === DISHES.length - 1 ? 0 : i + 1))

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden select-none"
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
          border: '220px solid #f1a07131',
          borderRadius: '50%',
          transformOrigin: 'center center',
        }}
      />

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="relative w-full min-h-screen flex flex-col justify-center z-20">

        {/* Top row: dish + text + card */}
        <div
          className="flex items-center
                     ml-4 sm:ml-6 md:ml-[25px] lg:ml-[45px] xl:ml-[65px]
                     gap-[30px]"
        >

          {/* A ─ Dish plate */}
          <div
            ref={dishRef}
            className="relative z-20 pointer-events-none shrink-0 top-20
                       w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]
                       md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] xl:w-[660px] xl:h-[660px]"
          >
            <div className="w-full h-full rounded-full border-[6px] md:border-[10px] border-white/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
              <img
                src="/images/services/atlantic/offshore-catering-new.jpg"
                alt="Atlantic offshore catering dish"
                className="w-full h-full object-cover scale-[1.02] mt-4"
                draggable={false}
              />
            </div>
          </div>

          {/* B ─ Text */}
          <div
            ref={contentRef}
            className="relative z-20 flex flex-col justify-center"
          >
            <p className="font-outfit text-xs md:text-sm font-semibold tracking-[0.25em] md:tracking-[0.3em] uppercase text-white/70 mb-2">
              #2 Most loved dish
            </p>

            <h2 className="font-outfit leading-[1.1] uppercase">
              <span className="block font-extralight tracking-[0.04em]
                               text-[2.5rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]
                               text-white/95">
                Offshore
              </span>
              <span className="block font-black tracking-tight
                               text-[3.2rem] sm:text-[4.5rem] md:text-[7.5rem] lg:text-[9.5rem] xl:text-[11rem]
                               text-[#EF9419]
                               -mt-1 md:-mt-3 lg:-mt-5">
                Catering
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-8 sm:gap-12 mt-8 md:mt-10 font-inter">
              <a href="#" className="group flex items-center gap-3 md:gap-4 text-white/80 hover:text-white transition-all">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 group-hover:border-white/60 transition-colors bg-white/5 backdrop-blur-sm">
                  <svg className="w-3 h-3 md:w-4 md:h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-medium text-xs md:text-sm tracking-widest uppercase">Contact</span>
              </a>

              <a href="#" className="group flex items-center gap-3 md:gap-4 text-white/80 hover:text-white transition-all">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EF9419] text-white shadow-lg shadow-[#EF9419]/20 group-hover:bg-[#d88212] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4H5L4 6v2h2l3.6 7.59L8.25 18A2 2 0 0010 21h9v-2h-8.58a.25.25 0 01-.22-.37L11.1 17h6.45a2 2 0 001.79-1.11L23 9H8.42L7 4z" />
                  </svg>
                </div>
                <span className="font-medium text-xs md:text-sm tracking-widest uppercase">Request Service</span>
              </a>
            </div>
          </div>

          {/* E ─ Overview card — pushed right with ml-auto */}
          <div
            ref={cardRef}
            className="hidden lg:flex flex-col mt-[10rem] z-20 shrink-0 ml-auto
                       w-[300px] xl:w-[320px] h-[400px]
                       mr-8 xl:mr-14
                       rounded-2xl overflow-hidden
                       bg-black/50 backdrop-blur-md
                       border border-white/15
                       self-center"
          >
            {/* Tab row */}
            <div className="flex border-b border-white/15">
              <button className="flex-1 py-3 text-[11px] xl:text-xs font-semibold tracking-widest uppercase text-white bg-white/10 font-inter">
                Overview
              </button>
              <button className="flex-1 py-3 text-[11px] xl:text-xs font-semibold tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors font-inter">
                Ingredients
              </button>
            </div>

            <div className="flex flex-col gap-4 p-5 xl:p-6">

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-[#EF9419] shrink-0">
                  <span className="font-outfit font-black text-white text-xl xl:text-2xl leading-none">4.3</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map(i => (
                      <svg key={i} className="w-3 h-3 text-[#EF9419]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <svg className="w-3 h-3 text-white/25" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-[10px] xl:text-[11px] text-white/50 tracking-wide uppercase font-medium font-inter">Rating</span>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              {/* Name */}
              <div className="flex flex-col gap-0.5">
                <p className="font-outfit font-bold text-white text-sm xl:text-base leading-snug">
                  Atlantic Catering
                </p>
                <p className="text-[10px] xl:text-[11px] text-[#EF9419]/90 tracking-widest uppercase font-semibold font-inter">
                  Offshore Division
                </p>
              </div>

              {/* Description */}
              <p className="text-[11px] xl:text-xs text-white/60 leading-relaxed font-inter">
                Premium meals crafted for offshore crews — nutritious, hearty, and served with care on every rig.
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

        </div>

        {/* F ─ Dish carousel — bottom strip */}
        <div className='flex w-full items-center justify-center  ml-4 sm:ml-6 md:ml-[20px] lg:ml-[40px] xl:ml-[8rem]'>
          <div
            ref={carouselRef}

            className="hidden md:flex items-center gap-6 xl:gap-8 z-20 mt-10 xl:mt-12 pb-8"
          >
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="flex items-center justify-center w-9 h-9 rounded-full
                       border border-white/20 bg-white/5 hover:bg-white/15
                       text-white/60 hover:text-white transition-all shrink-0"
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
                  onClick={() => setActiveDish(idx)}
                  className="flex flex-col items-center gap-2 group transition-all"
                >
                  {/* Thumbnail circle */}
                  <div
                    className={`
                    rounded-full overflow-hidden transition-all duration-300
                    ${activeDish === idx
                        ? 'w-[72px] h-[72px] xl:w-[84px] xl:h-[84px] ring-[3px] ring-white ring-offset-2 ring-offset-transparent'
                        : 'w-[56px] h-[56px] xl:w-[64px] xl:h-[64px] opacity-60 group-hover:opacity-90 ring-[1.5px] ring-white/20'}
                  `}
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
                      className={`font-inter text-[10px] xl:text-[11px] font-semibold tracking-wide transition-colors leading-tight text-center max-w-[80px]
                      ${activeDish === idx ? 'text-white' : 'text-white/45 group-hover:text-white/70'}`}
                    >
                      {dish.name}
                    </span>
                    <span className={`font-inter text-[9px] tracking-wider uppercase transition-colors
                    ${activeDish === idx ? 'text-[#EF9419]' : 'text-white/25 group-hover:text-white/40'}`}
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
              className="flex items-center justify-center w-9 h-9 rounded-full
                       border border-white/20 bg-white/5 hover:bg-white/15
                       text-white/60 hover:text-white transition-all shrink-0"
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