'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(TextPlugin)

const CYCLING_WORDS = ['EXPERIENCES', 'CATERING', 'LOGISTICS', 'HOSPITALITY']

export default function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!textRef.current) return
    textRef.current.innerText = CYCLING_WORDS[0]

    const tl = gsap.timeline({ repeat: -1, delay: 0.5 })
    CYCLING_WORDS.forEach((word, i) => {
      const next = CYCLING_WORDS[(i + 1) % CYCLING_WORDS.length]
      tl.to({}, { duration: 2.5 })
        .to(textRef.current, { y: -25, opacity: 0, duration: 0.6, ease: 'power2.inOut' })
        .set(textRef.current, { text: next, y: 25 })
        .to(textRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
    })
  }, [])

  return (
    <div className="relative min-h-screen bg-[#111] overflow-hidden flex items-center justify-center">
      <HeroBg />

      <div className="relative z-10 w-[90vw] h-[90vw] max-w-[650px] max-h-[650px] bg-[#D49B24] rounded-full flex flex-col items-center justify-center text-center p-4 md:p-8 shadow-2xl">
        <LeafPattern />

        <div className="relative z-20 flex flex-col items-center gap-6 md:gap-10 w-full">
          <span className="text-black font-bold uppercase tracking-[0.1em] text-[10px] md:text-xs">
            Experience the taste of West Africa
          </span>

          <div className="flex flex-col items-center w-full">
            <h1
              className="font-black uppercase tracking-tight w-full leading-[1.2]"
              style={{
                fontFamily: 'Antonio, sans-serif',
                fontSize: 'clamp(1.8rem, 8vw, 6rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.85)',
              }}
            >
              GREAT DINING
            </h1>
            <div
              className="md:ml-[50px] ml-0 flex items-center justify-center w-full"
              style={{ minHeight: 'clamp(2.2rem, 9vw, 6.5rem)' }}
            >
              <h1
                className="font-black uppercase tracking-tight leading-[1.0] text-white"
                style={{
                  fontFamily: 'Antonio, sans-serif',
                  fontSize: 'clamp(2.2rem, 9vw, 6.5rem)',
                  textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                <span ref={textRef} className="inline-block">EXPERIENCES</span>
              </h1>
            </div>
          </div>

          <CtaButton href="/contact" label="AUTHENTIC EXPERIENCE" className="mt-4" />
        </div>

        <RotatingBadge />
      </div>
    </div>
  )
}

function HeroBg() {
  return (
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-burgers.png')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}

function LeafPattern() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-full" aria-hidden>
      <defs>
        <pattern id="leaf-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 5C13 5 8 10 8 16C8 23 15 29 19 35C19.5 36 20.5 36 21 35C25 29 32 23 32 16C32 10 27 5 20 5ZM20 27C16 23 11 19 11 16C11 11 15 8 20 8C25 8 29 11 29 16C29 19 24 23 20 27Z" fill="#000" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
    </svg>
  )
}

function RotatingBadge() {
  return (
    <div className="absolute -bottom-4 -right-4 sm:bottom-0 sm:right-0 md:bottom-2 md:right-2 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] bg-[#5a7b3e] rounded-full flex items-center justify-center p-2 shadow-xl z-30">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" aria-hidden>
        <path id="badge-curve" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
        <text className="text-[9.5px] uppercase font-bold tracking-[0.15em]" fill="white">
          <textPath href="#badge-curve" startOffset="0%">
            ATLANTIC CATERING & LOGISTICS • GHANA •
          </textPath>
        </text>
      </svg>
      <div className="relative z-10 flex items-center justify-center text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10" aria-hidden>
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      </div>
    </div>
  )
}
