'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import Image from 'next/image'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const CYCLING_WORDS = ['EVERY MOMENT', 'CATERING', 'LOGISTICS', 'HOSPITALITY']

export default function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced) {
      if (textRef.current) {
        textRef.current.innerText = CYCLING_WORDS[0]
      }
      return
    }

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
      className="relative bg-[#FDFDFB] overflow-hidden flex flex-col"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background Image Container - backgg.jpeg as sole background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="hero-bg-image relative w-full h-full">
          <Image
            src="/assets/images/backgg.jpeg"
            alt="Table top-down flatlay white marble table background with napkin, peppercorns, and herbs"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 xl:py-32">
        <div
          ref={contentRef}
          className="relative z-10 w-full text-center flex flex-col items-center justify-center max-w-[900px] mx-auto"
        >
          <span className="hero-eyebrow text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.28em] text-[#57C157] mb-3 sm:mb-4 md:mb-5 select-none">
            GLOBAL CUISINE, UNFORGETTABLE EXPERIENCES
          </span>

          <h1 className="hero-title font-black uppercase leading-[1.0] tracking-tight select-none w-full" style={{ fontFamily: "'Antonio', sans-serif" }}>
            {/* Line 1 — gold outlined */}
            <span
              className="hero-title-line-1 block text-[2.8rem] sm:text-[3.8rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] 2xl:text-[8.5rem]"
              style={{
                WebkitTextStroke: '2px #EF9419',
                color: 'transparent',
              }}
            >
              GREAT FOOD
            </span>

            {/* Line 2 — solid primary green */}
            <span
              className="hero-title-line-2 block text-[2.8rem] sm:text-[3.6rem] md:text-[4.8rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] mt-1 sm:mt-2 md:mt-3"
              style={{ color: '#57C157' }}
            >
              MADE FOR
            </span>

            {/* Line 3 — cycling word, solid gold */}
            <span
              className="hero-title-line-3 block text-[2.8rem] sm:text-[3.6rem] md:text-[4.8rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] min-h-[1.1em] relative w-full mt-1 sm:mt-2 md:mt-3"
              style={{ color: '#EF9419' }}
            >
              <span ref={textRef} className="absolute left-0 right-0 text-center block">
                EVERY MOMENT
              </span>
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="hero-desc text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] leading-relaxed text-[#1a1a1a]/70 max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[580px] mx-auto mt-4 sm:mt-6 md:mt-8 font-medium select-none">
            From exquisite meals to seamless service, we bring people together through exceptional food and care.
          </p>

          {/* Green CTA Button */}
          <div className="hero-cta mt-8 sm:mt-10 lg:mt-12">
            <CtaButton
              href="/menu"
              label="EXPLORE OUR MENU"
              size="md"
              variant="primary"
              className="!bg-[#57C157] text-white hover:!bg-[#EF9419] hover:text-white shadow-[0_8px_30px_rgba(87,193,87,0.3)] hover:shadow-[0_12px_40px_rgba(239,148,25,0.4)] transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Feature Stats Bar */}
      <div ref={statsRef} className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 border-t border-[#1a1a1a]/10">
        <div className="container-xl max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-center sm:text-left text-[#1a1a1a]">
            {/* Item 1 */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#57C157]/10 border border-[#57C157]/20 text-[#57C157] shadow-sm flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/85 whitespace-nowrap">
                International Flavors
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-5 sm:h-6 bg-[#1a1a1a]/15" />

            {/* Item 2 */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#57C157]/10 border border-[#57C157]/20 text-[#57C157] shadow-sm flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M12 4V2M5 18h14a1 1 0 0 0 1-1v-2a7 7 0 0 0-14 0v2a1 1 0 0 0 1 1Z" />
                  <path d="M12 4a5 5 0 0 1 5 5v2H7V9a5 5 0 0 1 5-5Z" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/85 whitespace-nowrap">
                Perfect for Any Occasion
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-5 sm:h-6 bg-[#1a1a1a]/15" />

            {/* Item 3 */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#57C157]/10 border border-[#57C157]/20 text-[#57C157] shadow-sm flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8a7 7 0 0 1-9 10Z" />
                  <path d="M9 22v-4" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/85 whitespace-nowrap">
                Fresh Ingredients, Exceptional Taste
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}