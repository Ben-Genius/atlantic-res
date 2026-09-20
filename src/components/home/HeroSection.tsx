'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const CYCLING_WORDS = ['EVERY MOMENT', 'HOSPITALITY', 'EVERY CREW', 'EVERY SITE']

/* Serrated stamp edge — n shallow outward bumps around a circle, as on a postage seal */
function scallopedPath(cx: number, cy: number, r: number, n: number) {
  const step = (Math.PI * 2) / n
  const bump = r * Math.sin(step / 2) * 1.18
  let d = ''
  for (let i = 0; i <= n; i++) {
    const a = i * step - Math.PI / 2
    const x = (cx + Math.cos(a) * r).toFixed(2)
    const y = (cy + Math.sin(a) * r).toFixed(2)
    d += i === 0 ? `M ${x},${y}` : ` A ${bump.toFixed(2)},${bump.toFixed(2)} 0 0 1 ${x},${y}`
  }
  return `${d} Z`
}

const SEAL_EDGE = scallopedPath(100, 100, 96, 46)

export default function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sealRef = useRef<SVGGElement>(null)

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
        y: 28,
        duration: 1.2,
        ease: 'power3.out',
      })

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 18,
        duration: 0.9,
        delay: 0.45,
        ease: 'power3.out',
      })

      gsap.fromTo(
        '.hero-scroll-run',
        { yPercent: -100 },
        { yPercent: 200, duration: 2.1, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.5 }
      )

      if (sealRef.current) {
        gsap.to(sealRef.current, {
          rotation: 360,
          duration: 26,
          ease: 'none',
          repeat: -1,
          transformOrigin: '50% 50%',
          svgOrigin: '100 100',
        })
      }
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

        {/* Copy sits bottom-left, so only that corner is grounded. The
            centre of the frame stays clear and the footage reads true. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1014]/45 via-[#0B1014]/0 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex items-end justify-start px-5 sm:px-8 lg:px-14 pb-8 sm:pb-10 lg:pb-12">
        <div
          ref={contentRef}
          className="relative z-10 w-full max-w-[580px] text-left flex flex-col items-start rounded-xl sm:rounded-xl p-6 sm:p-8 bg-[#0B1014]/20 backdrop-blur-xs  "
        >
          <span className="hero-eyebrow text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.28em] text-[#D4A556] mb-2.5 sm:mb-3 select-none">
            Global Cuisine, Unforgettable Experiences
          </span>

          <h1
            className="hero-title font-black uppercase leading-[0.95] tracking-tight text-white select-none"
            style={{ fontFamily: "'Antonio', sans-serif" }}
          >
            <span className="block text-[1.9rem] sm:text-[2.5rem] lg:text-[3.1rem]">
              GREAT FOOD MADE FOR
            </span>
            <span className="block text-[1.9rem] sm:text-[2.5rem] lg:text-[3.1rem] min-h-[1.1em] mt-1 text-[#D4A556]">
              <span ref={textRef} className="inline-block">
                EVERY MOMENT
              </span>
            </span>
          </h1>

          <a
            href="/expertise"
            className="hero-cta mt-5 sm:mt-6 inline-flex items-center gap-3 rounded-lg border border-white/40 bg-white/5 backdrop-blur-sm px-5 sm:px-6 py-2.5 sm:py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#D4A556] hover:bg-[#D4A556] hover:text-[#0B1014] "
          >
            Explore our services
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll cue — bottom centre, between the copy and the seal */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 hidden flex-col items-center gap-3 sm:flex">
        <span className="text-[9px] font-semibold uppercase tracking-[0.42em] text-white/55">
          Begin the story
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/20">
          <span className="hero-scroll-run absolute inset-x-0 top-0 block h-1/2 bg-[#D4A556]" />
        </span>
      </div>

      {/* Certification seal — bottom right */}
      <div className="hidden sm:block absolute z-20 bottom-8 right-8 lg:bottom-32 lg:right-12 w-[132px] lg:w-[134px] select-none pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="ISO 22000 certified — Atlantic Catering & Logistics, established 2014">
          <defs>
            <path id="seal-arc-top" d="M 28,100 A 72,72 0 0 1 172,100" fill="none" />
            <path id="seal-arc-bottom" d="M 21,100 A 79,79 0 0 0 179,100" fill="none" />
          </defs>

          {/* Seal body — primary green ground with the serrated stamp edge */}
          <path d={SEAL_EDGE} fill="#0E3B2A" fillOpacity="0.94" />

          {/* Double keyline in the secondary gold, inset from the edge */}
          <g fill="none" stroke="#cc9933">
            <circle cx="100" cy="100" r="87" strokeWidth="2" />
            <circle cx="100" cy="100" r="82.5" strokeWidth="0.8" />
          </g>

          <g ref={sealRef} fill="#A4D79C">
            <text
              fontFamily="'Antonio', sans-serif"
              fontSize="16"
              fontWeight="700"
              letterSpacing="2.4"
            >
              <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
                ATLANTIC CATERING
              </textPath>
            </text>

            <text
              fontFamily="'Antonio', sans-serif"
              fontSize="14"
              fontWeight="700"
              letterSpacing="2"
            >
              <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
                ISO 22000 CERTIFIED
              </textPath>
            </text>

            {/* Star separators at the seams between the two arcs */}
            <text x="25" y="105" fontSize="12" textAnchor="middle" fill="#cc9933">★</text>
            <text x="175" y="105" fontSize="12" textAnchor="middle" fill="#cc9933">★</text>
          </g>

          {/* Centre medallion — colours inverted, gold ground carrying the primary mark */}
          <circle cx="100" cy="100" r="52" fill="#cc9933" />
          <path
            d="M 84,90 L 95,102 L 118,78"
            fill="none"
            stroke="#0E3B2A"
            strokeWidth="8"
            strokeLinecap="square"
          />
          <text
            x="100"
            y="128"
            textAnchor="middle"
            fill="#0E3B2A"
            fontFamily="'Antonio', sans-serif"
            fontSize="16"
            fontWeight="700"
            letterSpacing="1.6"
          >
            EST. 2014
          </text>
        </svg>
      </div>
    </section>
  )
}
