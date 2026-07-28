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

const DISHES = [
  {
    src: '/assets/images/img1.png',
    alt: 'Crispy fried chicken with French fries and coleslaw',
    // Top-left corner
    className: 'absolute top-[-3%] left-[-3%] sm:top-[2%] sm:left-[2%] md:top-[3%] md:left-[3%] lg:top-[4%] lg:left-[4%] w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]',
  },
  {
    src: '/assets/images/img3.png',
    alt: 'Sushi platter with maki rolls and nigiri',
    // Top-right corner
    className: 'absolute top-[-3%] right-[-3%] sm:top-[2%] sm:right-[2%] md:top-[3%] md:right-[3%] lg:top-[4%] lg:right-[6%] w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]',
  },
  // {
  //   src: '/assets/images/img6.png',
  //   alt: 'Spicy Jollof rice with roasted chicken and plantains',
  //   // Middle-right (half cut-off on the right edge)
  //   className: 'absolute top-[35%] right-[-25px] sm:right-[-35px] md:top-[36%] md:right-[-40px] lg:top-[38%] lg:right-[-50px] w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]',
  // },
  {
    src: '/assets/images/img4.png',
    alt: 'Traditional Waakye rice and beans with egg and dodo',
    // Bottom-left corner
    className: 'absolute bottom-[10%] left-[-3%] sm:bottom-[12%] sm:left-[2%] md:bottom-[13%] md:left-[3%] lg:bottom-[15%] lg:left-[0%] w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]',
  },
  {
    src: '/assets/images/imag2.png',
    alt: 'Ribeye steak with roasted potatoes and grilled vegetables',
    // Bottom-right corner
    className: 'absolute bottom-[10%] right-[-3%] sm:bottom-[12%] sm:right-[2%] md:bottom-[13%] md:right-[3%] lg:bottom-[15%] lg:right-[6%] w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]',
  },
]

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
      // 1. Text Cycling Animation for the third line
      if (textRef.current) {
        textRef.current.innerText = CYCLING_WORDS[0]
        const wordTl = gsap.timeline({ repeat: -1, delay: 1.8 })
        CYCLING_WORDS.forEach((word, i) => {
          const next = CYCLING_WORDS[(i + 1) % CYCLING_WORDS.length]
          wordTl
            .to({}, { duration: 2.5 }) // hold word
            .to(textRef.current, { y: -20, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
            .set(textRef.current, { text: next, y: 20 })
            .to(textRef.current, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
        })
      }

      // 2. Simple Entrance Animation for text on load
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power3.out',
      })

      // 3. Simple Entrance Animation for stats bar on load
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
      className="relative min-h-screen bg-[#FDFDFB] overflow-hidden flex flex-col justify-between"
      style={{ minHeight: '100vh' }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="hero-bg-image relative w-full h-full">
          <Image
            src="/assets/images/backg.png"
            alt="Table top-down flatlay white marble table background with napkin, peppercorns, and herbs"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>


      </div>

      {/* Surround Food Dishes */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none">
        {DISHES.map((dish) => (
          <div
            key={dish.src}
            className={`hero-plate pointer-events-auto transition-transform duration-500 ease-out hover:scale-105 ${dish.className}`}

          >
            <div className="relative w-full h-full  overflow-hidden">
              <Image
                src={dish.src}
                alt={dish.alt}
                fill
                sizes="(max-width: 768px) 120px, 340px"
                className="object-cover rounded-full scale-[1.01]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-grow flex items-center justify-center py-24 px-4 sm:px-6">
        <div
          ref={contentRef}
          className="text-center flex flex-col items-center justify-center max-w-3xl"
        >
          <span className="hero-eyebrow text-[9px] sm:text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.25em] text-[#57C157] mb-3 sm:mb-5">
            GLOBAL CUISINE, UNFORGETTABLE EXPERIENCES
          </span>

          <h1 className="hero-title font-bold uppercase leading-[1.02] tracking-tight select-none w-full text-[#1a1a1a]" style={{ fontFamily: "'Antonio', sans-serif" }}>
            <span
              className="hero-title-line-1 block text-[2.5rem] sm:text-[3.8rem] md:text-[4.8rem] lg:text-[5.8rem]"
              style={{
                WebkitTextStroke: '1.5px #1a1a1a',
                color: 'transparent'
              }}
            >
              GREAT FOOD
            </span>

            <span className="hero-title-line-2 block text-[2.5rem] sm:text-[3.6rem] md:text-[4.5rem] lg:text-[5.4rem] font-black mt-1 sm:mt-2">
              MADE FOR
            </span>

            <span className="hero-title-line-3 block text-[2.5rem] sm:text-[3.6rem] md:text-[4.5rem] lg:text-[5.4rem] font-black min-h-[1.15em] relative w-full mt-1 sm:mt-2">
              <span ref={textRef} className="absolute left-0 right-0 text-center block">
                EVERY MOMENT
              </span>
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="hero-desc text-[11px] sm:text-[13.5px] lg:text-[16px] leading-relaxed text-[#1a1a1a]/70 max-w-[280px] sm:max-w-[420px] md:max-w-[500px] mt-4 sm:mt-6 font-medium select-none">
            From exquisite meals to seamless service, we bring people together through exceptional food and care.
          </p>

          {/* Green CTA Button */}
          <div className="hero-cta mt-6 sm:mt-8">
            <CtaButton
              href="/menu"
              label="EXPLORE OUR MENU"
              size="md"
              variant="primary"
              className="!bg-[#57C157] text-white hover:!bg-[#1a1a1a] shadow-md hover:shadow-lg transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section - Feature Stats Bar */}
      <div ref={statsRef} className="relative z-20 w-full py-6 sm:py-8 mt-auto">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 text-center md:text-left text-[#1a1a1a]">

            {/* Item 1 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#57C157]/10 border border-[#57C157]/20 text-[#57C157] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#1a1a1a]/85">
                International Flavors
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-6 bg-[#1a1a1a]/15" />

            {/* Item 2 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#57C157]/10 border border-[#57C157]/20 text-[#57C157] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 4V2M5 18h14a1 1 0 0 0 1-1v-2a7 7 0 0 0-14 0v2a1 1 0 0 0 1 1Z" />
                  <path d="M12 4a5 5 0 0 1 5 5v2H7V9a5 5 0 0 1 5-5Z" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#1a1a1a]/85">
                Perfect for Any Occasion
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-6 bg-[#1a1a1a]/15" />

            {/* Item 3 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#57C157]/10 border border-[#57C157]/20 text-[#57C157] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 8a7 7 0 0 1-9 10Z" />
                  <path d="M9 22v-4" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#1a1a1a]/85">
                Fresh Ingredients, Exceptional Taste
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}