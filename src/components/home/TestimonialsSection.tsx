'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const premiumTestimonials = [
  {
    quote: "Good communication and the food was great. The facilities were managed perfectly. Love the desserts and their way of presenting. We came here for a corporate event and this place won our hearts.",
    author: "Leonel Mooney",
    role: "Offshore Platform Director, Chevron"
  },
  {
    quote: "Exceptional logistical coordination under extreme maritime conditions. Every single meal feels like fine dining, boosting crew morale immensely. Atlantic truly sets the gold standard.",
    author: "Capt. Matthew Taylor",
    role: "Vessel Superintendent, Atlantic Marine"
  },
  {
    quote: "A flawless hospitality and catering partnership. From camp management to daily laundry, their team operates with ultimate professionalism and care for every detail.",
    author: "Herman Miller",
    role: "Onshore Camps Coordinator, Tullow Oil"
  }
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const leftPlateRef = useRef<HTMLDivElement>(null)
  const rightPlateRef = useRef<HTMLDivElement>(null)

  // Auto-shuffle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setActiveIndex((prev) => (prev === premiumTestimonials.length - 1 ? 0 : prev + 1))
        setTimeout(() => setIsAnimating(false), 600)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isAnimating])

  // Entrance animations
  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      }
    })

    tl.fromTo('.testi-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.testi-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo(leftPlateRef.current, { opacity: 0, x: -80, rotate: -20 }, { opacity: 1, x: 0, rotate: 0, duration: 1.1, ease: 'power3.out' }, '-=0.4')
      .fromTo(rightPlateRef.current, { opacity: 0, x: 80, rotate: 20 }, { opacity: 1, x: 0, rotate: 0, duration: 1.1, ease: 'power3.out' }, '-=1')
      .fromTo('.testi-quote-icon', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.6')
      .fromTo('.testi-quote-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo('.testi-author', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .fromTo('.testi-dots', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .fromTo('.testi-star-bar', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')

    // Continuous floating for plates
    gsap.to(leftPlateRef.current, {
      y: '+=14',
      rotation: '+=5',
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5
    })
    gsap.to(rightPlateRef.current, {
      y: '-=12',
      rotation: '-=6',
      duration: 6.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })
  }, { scope: sectionRef })

  // Slide transition animation
  useGSAP(() => {
    if (!quoteRef.current) return
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 14, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
    )
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-10 bg-[#F9F6F0] overflow-hidden select-none"
    >
      {/* Subtle warm tint */}
      <div className="absolute inset-0 bg-[#35b435]/[0.015] pointer-events-none z-0" />

      {/* ─── HEADER (left-aligned) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 mb-14">
        <span className="testi-label block text-[#EF9419] font-outfit text-xs font-extrabold uppercase tracking-[0.28em] mb-3">
          Client Feedback
        </span>
        <h2 className="testi-heading text-3xl md:text-5xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight max-w-lg">
          What Our Clients Say
        </h2>
      </div>

      {/* ─── MAIN CONTENT ROW ─── */}
      <div className="relative z-10 w-full max-w-[85rem] mx-auto px-4 flex items-center justify-between gap-4">

        {/* ── LEFT PLATE ── */}
        <div
          ref={leftPlateRef}
          className="hidden lg:block relative flex-shrink-0"
          style={{ width: 270, height: 270 }}
        >
          <img
            src="/images/dish-left-plate.png"
            alt="Gourmet Atlantic dish"
            className="w-full h-full object-cover rounded-full shadow-2xl border-[5px] border-white"
            draggable={false}
          />

          {/* Label positioned below-right with arrow curving UP-LEFT toward the plate */}
          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: -30, right: -60 }}
          >
            {/* Curved arrow: originates near label, tip points upper-left toward the food */}
            <svg
              width="80"
              height="70"
              viewBox="0 0 80 70"
              fill="none"
              style={{ display: 'block', marginBottom: 4, transform: 'scaleX(-1)' }}
            >
              {/* Arrowhead at top-right (pointing toward plate after mirror) */}
              <path
                d="M62 8 L72 4 L68 14"
                stroke="#EF9419"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Curved path from label (bottom-left) to arrowhead (top-right) */}
              <path
                d="M10 65 C20 40 50 20 68 8"
                stroke="#EF9419"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span
              className="font-serif text-[13px] text-[#EF9419] font-semibold leading-tight text-center"
              style={{ fontStyle: 'italic' }}
            >
              delicious<br />breakfast
            </span>
          </div>
        </div>

        {/* ── CENTER TESTIMONIAL ── */}
        <div className="flex-1 flex flex-col items-center text-center px-4 md:px-10 max-w-2xl mx-auto">

          {/* Gold quote icon */}
          <div className="testi-quote-icon inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#EF9419] text-white shadow-xl shadow-[#EF9419]/30 mb-7">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.725 6.51h4.725V21h-9.978zm-11.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-4.76 2.824-4.722 6.505h4.722V21H3z" />
            </svg>
          </div>

          {/* Auto-shuffling quote text */}
          <div className="testi-quote-text min-h-[150px] md:min-h-[190px] font-bold flex items-center justify-center">
            <div ref={quoteRef}>
              <blockquote className="text-[1rem] md:text-[1.5rem] text-[#1a1a1a] font-bold leading-snug uppercase tracking-none">
                {premiumTestimonials[activeIndex].quote}
              </blockquote>
            </div>
          </div>

          {/* Author */}
          <div className="testi-author mt-6">
            <p className="text-base font-bold text-[#EF9419] font-outfit tracking-widest uppercase">
              {premiumTestimonials[activeIndex].author}
            </p>
            <p className="text-xs text-[#35b435] font-semibold mt-0.5 tracking-widest uppercase font-outfit">
              {premiumTestimonials[activeIndex].role}
            </p>
          </div>

          {/* Simple dot indicators (no avatars) */}
          {/* <div className="testi-dots flex items-center justify-center gap-2 mt-8">
            {premiumTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating && i !== activeIndex) {
                    setIsAnimating(true)
                    setActiveIndex(i)
                    setTimeout(() => setIsAnimating(false), 600)
                  }
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className="transition-all duration-300 rounded-full focus:outline-none"
                style={{
                  width: i === activeIndex ? 28 : 8,
                  height: 8,
                  background: i === activeIndex ? '#EF9419' : '#d1c4a8',
                  borderRadius: 999,
                }}
              />
            ))}
          </div> */}
        </div>

        {/* ── RIGHT PLATE ── */}
        <div
          ref={rightPlateRef}
          className="hidden lg:block relative flex-shrink-0 bottom-20"
          style={{ width: 320, height: 320 }}
        >
          <img
            src="/images/dish-right-plate.png"
            alt="Atlantic grilled fish platter"
            className="w-full h-full object-cover rounded-full  border-[5px] border-white"
            draggable={false}
          />

          {/* Label positioned above-left with arrow curving DOWN-RIGHT toward the plate */}
          <div
            className="absolute flex flex-col items-center"
            style={{ top: -30, left: -65 }}
          >
            <span
              className="font-serif text-[13px] text-[#EF9419] font-semibold leading-tight text-center mb-1"
              style={{ fontStyle: 'italic' }}
            >
              healthy<br />experience
            </span>
            {/* Arrow originates below label and curves down-right toward the plate */}
            <svg
              width="80"
              height="70"
              viewBox="0 0 80 70"
              fill="none"
              style={{ display: 'block' }}
            >
              {/* Curved path from label top-left to arrowhead bottom-right */}
              <path
                d="M10 8 C25 30 55 50 70 62"
                stroke="#EF9419"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Arrowhead at bottom-right (pointing into the plate) */}
              <path
                d="M60 62 L72 65 L66 54"
                stroke="#EF9419"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

      </div>

      {/* ─── STAR BAR ─── */}
      <div className="testi-star-bar relative z-10 w-full flex justify-center mt-14 px-6">
        <div
          className="bg-transparent px-8 py-3 flex flex-col sm:flex-row items-center gap-3 "
          style={{ borderRadius: '100px' }}
        >
          <div className="flex gap-1 text-white bg-[#EF9419] px-3 py-2 rounded-md">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-[#1a1a1a] font-outfit text-sm md:text-sm font-semibold tracking-wide text-center sm:text-left">
            <span className="underline font-semibold decoration-black decoration-1 underline-offset-4">55,000+ happy food lovers</span>
            {' '}served across offshore sites and corporate operations.
          </p>
        </div>
      </div>

    </section>
  )
}