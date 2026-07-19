'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Award, ChevronDown, Utensils } from 'lucide-react'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const CYCLING_WORDS = ['EXPERIENCES', 'CATERING', 'LOGISTICS', 'HOSPITALITY']

const DISH_POOL = [
  { name: 'Offshore Catering', src: '/images/services/atlantic/offshore-catering-new.jpg' },
  { name: 'Contract Catering', src: '/images/services/atlantic/Contract Catering.jpg' },
  { name: 'Event Management', src: '/images/services/atlantic/event management 1.jpg' },
  { name: 'Camp Design', src: '/images/services/atlantic/camp design.jpg' },
  { name: 'Laundry & Housekeeping', src: '/images/services/atlantic/laundry & housekeeping.jpg' },
  { name: 'Ship Supplies', src: '/images/services/atlantic/ship supplies.jpg' },
]

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

type Cell =
  | { type: 'logo'; name: string }
  | { type: 'dish'; name: string; src: string }

interface Config {
  cells: Cell[]
  sequence: number[]
}

/** Deterministic config so SSR and first client render agree — re-rolled on mount. */
function buildConfig(random: boolean): Config {
  const line = random
    ? WINNING_LINES[Math.floor(Math.random() * WINNING_LINES.length)]
    : WINNING_LINES[6]

  let dishPointer = 0
  const cells: Cell[] = Array.from({ length: 9 }, (_, i) => {
    if (line.includes(i)) return { type: 'logo', name: 'Atlantic Brand Premium' }
    const dish = DISH_POOL[dishPointer++]
    return { type: 'dish', name: dish.name, src: dish.src }
  })

  const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  if (random) {
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[sequence[i], sequence[j]] = [sequence[j], sequence[i]]
    }
  }

  return { cells, sequence }
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const [config, setConfig] = useState<Config>(() => buildConfig(false))
  const [revealCount, setRevealCount] = useState(0)

  // Randomise only after hydration.
  useEffect(() => setConfig(buildConfig(true)), [])

  const reroll = useCallback(() => {
    setConfig(buildConfig(true))
    const top = sectionRef.current?.offsetTop ?? 0
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const revealed = useMemo(
    () => new Set(config.sequence.slice(0, revealCount)),
    [config.sequence, revealCount]
  )

  const complete = revealCount >= 9

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { motion: boolean; reduced: boolean }

          if (reduced) {
            setRevealCount(9)
            return
          }

          // Cycling headline word.
          if (textRef.current) {
            textRef.current.innerText = CYCLING_WORDS[0]
            const tl = gsap.timeline({ repeat: -1, delay: 0.5 })
            CYCLING_WORDS.forEach((_, i) => {
              const next = CYCLING_WORDS[(i + 1) % CYCLING_WORDS.length]
              tl.to({}, { duration: 2.5 })
                .to(textRef.current, { y: -25, opacity: 0, duration: 0.6, ease: 'power2.inOut' })
                .set(textRef.current, { text: next, y: 25 })
                .to(textRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
            })
          }

          gsap.from('.hero-intro > *', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
          })

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: stageRef.current,
            pinSpacing: false,
            scrub: 1,
            onUpdate: (self) => {
              const next = Math.min(9, Math.floor(self.progress * 9.6))
              setRevealCount((prev) => (prev === next ? prev : next))
            },
          })
        }
      )

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[320vh] text-white select-none"
      aria-label="Atlantic Catering hero"
    >
      <div
        ref={stageRef}
        className="relative top-0 h-screen w-full overflow-hidden"
        style={{
          backgroundImage: "url('/images/premium-green-texture.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* ── Brand overlays ── */}
        <div className="absolute inset-0 bg-[#35b435] mix-blend-multiply opacity-90 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
        {/* Blueprint grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <HudFrame />

        {/* ── Content ── */}
        <div className="relative z-20 h-full w-full flex items-center px-6 md:px-16 lg:px-24">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: headline */}
            <div className="hero-intro flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-white/70 border border-white/25 rounded-full px-3 py-1">
                Experience the taste of West Africa
              </span>

              <h1
                className="font-antonio font-black uppercase tracking-tight leading-[1.0] mt-5 md:mt-7"
                style={{
                  fontSize: 'clamp(2rem, 5.2vw, 4.5rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.85)',
                }}
              >
                Great Dining
              </h1>

              <div
                className="flex items-center justify-center lg:justify-start w-full overflow-hidden"
                style={{ minHeight: 'clamp(2.4rem, 6vw, 5.2rem)' }}
              >
                <h2
                  className="font-antonio font-black uppercase tracking-tight leading-[1.0] text-white"
                  style={{
                    fontSize: 'clamp(2.2rem, 5.8vw, 5rem)',
                    textShadow: '0 10px 30px rgba(0,0,0,0.35)',
                  }}
                >
                  <span ref={textRef} className="inline-block">EXPERIENCES</span>
                </h2>
              </div>

              <p className="hidden md:block mt-4 max-w-md text-sm text-white/75 leading-relaxed">
                ISO-certified catering and logistics for offshore operations, corporate
                clients, and premium events across Ghana. Established 2014.
              </p>

              <CtaButton href="/contact" label="Authentic Experience" className="mt-6" />
            </div>

            {/* Right: tactical grid */}
            <div className="flex flex-col items-center lg:items-end">
              <div
                className="relative w-[min(84vw,42vh,520px)] h-[min(84vw,42vh,520px)] lg:w-[min(44vw,64vh,520px)] lg:h-[min(44vw,64vh,520px)] bg-[#0b0b0d]/90 border-[3px] border-white/40 rounded-[28px] p-3 md:p-5 shadow-[0_0_60px_rgba(0,0,0,0.35)] overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#35b435_1.5px,transparent_1.5px),linear-gradient(to_bottom,#35b435_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />

                <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 relative z-10">
                  {config.cells.map((cell, idx) => (
                    <GridCell key={idx} cell={cell} active={revealed.has(idx)} />
                  ))}
                </div>

                <WinOverlay visible={complete} onReroll={reroll} />
              </div>

              <div
                className={`mt-6 flex flex-col items-center transition-opacity duration-300 ${
                  revealCount > 0 ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">
                  Scroll to draft brand grid
                </span>
                <ChevronDown className="w-5 h-5 text-white animate-bounce-slow" />
              </div>
            </div>
          </div>
        </div>

        <RotatingBadge />
      </div>
    </section>
  )
}

function GridCell({ cell, active }: { cell: Cell; active: boolean }) {
  return (
    <div
      className={`relative rounded-xl md:rounded-2xl overflow-hidden bg-[#121215] flex items-center justify-center transition-all duration-500 ${
        active
          ? 'opacity-100 scale-100 grayscale-0 border border-white/50'
          : 'opacity-20 scale-95 grayscale border border-white/10'
      }`}
    >
      {cell.type === 'logo' ? (
        <div className="flex items-center justify-center w-full h-full p-1.5 bg-white/95">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svg/logoA.svg"
            alt="Atlantic Catering & Logistics"
            className="w-[86%] h-[86%] object-contain"
          />
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeURI(cell.src)}
            alt={cell.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          <span className="absolute bottom-1 left-1.5 right-1.5 text-[7px] md:text-[8px] font-bold uppercase tracking-wide text-white truncate">
            {cell.name}
          </span>
        </div>
      )}
    </div>
  )
}

function WinOverlay({ visible, onReroll }: { visible: boolean; onReroll: () => void }) {
  return (
    <div
      className={`absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 md:p-8 transition-opacity duration-500 z-20 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 bg-gold/15 border border-gold/30 rounded-full flex items-center justify-center mb-4 text-gold">
        <Award className="w-7 h-7 md:w-8 md:h-8" />
      </div>
      <h3 className="font-antonio text-lg md:text-2xl font-bold uppercase tracking-[0.15em] text-gold mb-2">
        Atlantic Brand Aligned
      </h3>
      <p className="text-[11px] md:text-xs text-white/60 max-w-xs mb-6 leading-relaxed">
        Full alignment unlocked — end-to-end catering, camp management, and logistics
        under one certified operation.
      </p>
      <button
        type="button"
        onClick={onReroll}
        className="bg-green text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.18em] px-6 py-3 rounded-md hover:bg-gold transition-colors shadow-lg"
      >
        Re-roll Culinary Grid
      </button>
    </div>
  )
}

function HudFrame() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
      <div className="absolute left-0 right-0 top-[8%] h-px bg-white/25" />
      <div className="absolute left-0 right-0 bottom-[8%] h-px bg-white/25" />
      <div className="absolute top-0 bottom-0 left-[6%] w-px bg-white/25" />
      <div className="absolute top-0 bottom-0 right-[6%] w-px bg-white/25" />

      <span className="absolute top-[8%] left-[6%] -translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-bold">+</span>
      <span className="absolute top-[8%] right-[6%] translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-bold">+</span>
      <span className="absolute bottom-[8%] left-[6%] -translate-x-1/2 translate-y-1/2 text-white text-[10px] font-bold">+</span>
      <span className="absolute bottom-[8%] right-[6%] translate-x-1/2 translate-y-1/2 text-white text-[10px] font-bold">+</span>

      <span className="absolute top-[8%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-[#0b0b0d] text-[9px] font-mono font-bold tracking-[0.2em] px-2 py-0.5 rounded">
        SYS.GRID // CENTRIC
      </span>
    </div>
  )
}

function RotatingBadge() {
  return (
    <div className="absolute bottom-10 right-10 z-30 hidden xl:block">
      <div className="relative w-28 h-28 bg-[#5a7b3e] rounded-full flex items-center justify-center p-1.5 shadow-2xl border border-white/15">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" aria-hidden>
          <path
            id="badge-curve"
            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="transparent"
          />
          <text className="text-[9px] uppercase font-bold tracking-[0.16em]" fill="white">
            <textPath href="#badge-curve" startOffset="0%">
              ATLANTIC CATERING &amp; LOGISTICS • GHANA •
            </textPath>
          </text>
        </svg>
        <div className="relative z-10 w-11 h-11 bg-zinc-900 rounded-full flex items-center justify-center text-white">
          <Utensils className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
