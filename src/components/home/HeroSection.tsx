'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const CYCLING_WORDS = ['EVERY MOMENT', 'CATERING', 'LOGISTICS', 'HOSPITALITY']

export default function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useGSAP(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced) {
      if (textRef.current) {
        textRef.current.innerText = CYCLING_WORDS[0]
      }
      videoRef.current?.pause()
      return
    }

    videoRef.current?.play().catch(() => { })

    const ctx = gsap.context(() => {
      if (textRef.current) {
        textRef.current.innerText = CYCLING_WORDS[0]
        const wordTl = gsap.timeline({ repeat: -1, delay: 1.8 })
        CYCLING_WORDS.forEach((word, i) => {
          const next = CYCLING_WORDS[(i + 1) % CYCLING_WORDS.length]
          wordTl
            .to({}, { duration: 2.5 })
            .to(textRef.current, { y: -20, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
            .set(textRef.current, { text: next, y: 20 })
            .to(textRef.current, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
        })
      }

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.from(statsRef.current, {
        opacity: 0,
        y: 15,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative bg-[#0F1519] overflow-hidden flex flex-col"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center"
          poster="/assets/images/backgg.jpeg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/assets/video/heroVid.webm" type="video/webm" />
          <source src="/assets/video/heroVid.MP4" type="video/mp4" />
        </video>

        {/*
          Directional scrim only. No full-plate wash - the footage stays vivid on
          the right and centre where the subject sits; density builds toward the
          lower-left corner where the copy lands.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1014]/85 via-[#0B1014]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1014]/90 via-[#0B1014]/10 to-transparent" />
        {/* Faint top falloff so the fixed nav keeps contrast on the white end-card frame */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B1014]/45 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex items-center px-5 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-8 sm:pb-10 lg:pb-14">
        <div
          ref={contentRef}
          className="relative z-10 w-full text-left flex flex-col items-start max-w-[680px] lg:max-w-[760px]"
        >
          <span className="hero-eyebrow text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.28em] text-[#8FE05C] mb-3 sm:mb-4 md:mb-5 select-none">
            GLOBAL CUISINE, UNFORGETTABLE EXPERIENCES
          </span>

          <h1 className="hero-title font-black uppercase leading-[1.0] tracking-tight select-none w-full" style={{ fontFamily: "'Antonio', sans-serif" }}>
            {/* Line 1 — gold outlined */}
            <span
              className="hero-title-line-1 block text-[2.5rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[5.8rem]"
              style={{
                WebkitTextStroke: '2px #E8B020',
                color: 'transparent',
              }}
            >
              GREAT FOOD
            </span>

            {/* Line 2 — solid primary green */}
            <span
              className="hero-title-line-2 block text-[2.5rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[5.8rem] mt-1 sm:mt-1.5 md:mt-2"
              style={{ color: '#8FE05C' }}
            >
              MADE FOR
            </span>

            {/* Line 3 — cycling word, solid gold */}
            <span
              className="hero-title-line-3 block text-[2.5rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[5.8rem] min-h-[1.1em] relative w-full mt-1 sm:mt-1.5 md:mt-2"
              style={{ color: '#E8B020' }}
            >
              <span ref={textRef} className="absolute left-0 right-0 text-left block">
                EVERY MOMENT
              </span>
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="hero-desc text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] leading-relaxed text-white/80 max-w-[440px] lg:max-w-[520px] mt-4 sm:mt-5 md:mt-6 font-medium select-none">
            From exquisite meals to seamless service, we bring people together through exceptional food and care.
          </p>

          {/* Green CTA Button */}
          <div className="hero-cta mt-6 sm:mt-8 lg:mt-9">
            <CtaButton
              href="/menu"
              label="EXPLORE OUR MENU"
              size="md"
              variant="primary"
              className="!bg-[#66cc33] text-white hover:!bg-[#cc9933] hover:text-white shadow-[0_8px_30px_rgba(102,204,51,0.3)] hover:shadow-[0_12px_40px_rgba(204,153,51,0.4)] transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Feature Stats Bar */}
      <div ref={statsRef} className="relative z-20 w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-5 sm:py-6 md:py-7 border-t border-white/15">
        <div className="w-full max-w-[1400px]">
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-center sm:text-left text-white">
            {/* Item 1 */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#8FE05C]/15 border border-[#8FE05C]/30 text-[#8FE05C] flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-white/80 whitespace-nowrap">
                International Flavors
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-5 sm:h-6 bg-white/20" />

            {/* Item 2 */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#8FE05C]/15 border border-[#8FE05C]/30 text-[#8FE05C] flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M12 4V2M5 18h14a1 1 0 0 0 1-1v-2a7 7 0 0 0-14 0v2a1 1 0 0 0 1 1Z" />
                  <path d="M12 4a5 5 0 0 1 5 5v2H7V9a5 5 0 0 1 5-5Z" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-white/80 whitespace-nowrap">
                Perfect for Any Occasion
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-5 sm:h-6 bg-white/20" />

            {/* Item 3 */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#8FE05C]/15 border border-[#8FE05C]/30 text-[#8FE05C] flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8a7 7 0 0 1-9 10Z" />
                  <path d="M9 22v-4" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-white/80 whitespace-nowrap">
                Fresh Ingredients, Exceptional Taste
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}