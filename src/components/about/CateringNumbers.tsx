'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

gsap.registerPlugin(ScrollTrigger)

/** "Our Catering Numbers", Brand Profile p.9. */
const NUMBERS = [
  { value: 15, suffix: '', label: 'Locations across 6 regions' },
  { value: 2190000, suffix: '+', label: 'Meals annually' },
  { value: 6000, suffix: '+', label: 'Meals daily' },
  { value: 200, suffix: '+', label: 'Events / conferences annually' },
  { value: 98, suffix: '%', label: 'Local-local staff' },
  { value: 600, suffix: '', label: 'Employees' },
  { value: 2, suffix: '', label: 'Warehouses' },
]

export default function CateringNumbers() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.from('.number-cell', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      return () => tween.kill()
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="scroll-reveal w-full px-6 md:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-[#3C8B36]">
          Our Catering Numbers
        </h2>
        <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-[#0d0d0d]/70">
          Making &lsquo;nice&rsquo; food is simple. Delivering dishes that invoke genuine emotion and
          leave a lasting impression is different.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {NUMBERS.map(item => (
            <div key={item.label} className="number-cell border-t border-black/10 pt-5">
              <AnimatedCounter
                end={item.value}
                suffix={item.suffix}
                className="block font-display text-[2rem] md:text-[2.75rem] font-bold leading-none tracking-tight text-[#3C8B36]"
              />
              <p className="mt-2.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] leading-snug text-[#0d0d0d]/55">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
