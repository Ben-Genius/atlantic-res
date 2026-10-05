'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Award,
  ShieldCheck,
  Headphones,
  Lightbulb,
  HeartHandshake,
  Quote,
  Landmark,
  Users,
  Recycle,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/** "Why Choose Us", Brand Profile p.30 — headings and straplines verbatim. */
const REASONS = [
  { icon: Award, title: 'Expertise', strap: "We've Got It!" },
  { icon: ShieldCheck, title: 'Quality & Safety', strap: "It's In Our DNA" },
  { icon: Headphones, title: 'Customer Service', strap: "We're On Top" },
  { icon: Lightbulb, title: 'Tailored Solutions', strap: "We're Unmatched" },
  { icon: HeartHandshake, title: 'Reliability', strap: 'Give It To Us' },
  { icon: Quote, title: 'Customer Testimonials', strap: "We're 5-Star Rated" },
  { icon: Landmark, title: 'Governance', strap: 'We Champion Human Rights and Legal Integrity' },
  { icon: Users, title: 'Community Involvement', strap: "We're Socially Committed & Oriented" },
  {
    icon: Recycle,
    title: 'Recycling & Eco-Friendly Packaging',
    strap: 'The Environment Smiles at Us; Our Activities Are Friendly to It!',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.from('.reason', {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      return () => tween.kill()
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#66cc33] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-8xl">
        <h2 className="font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-center text-white">
          Why <em className="not-italic font-normal italic text-[#0E3B2A]">Choose Us</em>
        </h2>

        {/* Mobile: swipeable snap rail. sm and up: grid. */}
        <div
          onScroll={(e) => {
            const el = e.currentTarget
            const max = el.scrollWidth - el.clientWidth
            if (barRef.current) barRef.current.style.width = `${max > 0 ? 18 + (el.scrollLeft / max) * 82 : 100}%`
          }}
          className="mt-10 md:mt-14 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&>*:last-child:nth-child(odd)]:sm:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1"
        >
          {REASONS.map(({ icon: Icon, title, strap }) => (
            <div
              key={title}
              className="reason flex w-[72vw] max-w-[280px] shrink-0 snap-center flex-col items-center rounded-2xl bg-white/10 px-5 py-8 text-center ring-1 ring-white/20 sm:w-auto sm:max-w-none sm:shrink sm:rounded-none sm:bg-transparent sm:p-0 sm:ring-0"
            >
              <Icon className="h-9 w-9 text-white" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-5 text-base font-bold leading-snug text-white md:text-base">{title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-white/80 md:text-sm">{strap}</p>
              <span className="mt-5 block h-px w-14 bg-white/35" />
            </div>
          ))}
        </div>

        {/* Mobile swipe progress */}
        <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/25 sm:hidden" aria-hidden>
          <div ref={barRef} className="h-full w-[18%] rounded-full bg-white transition-[width] duration-150" />
        </div>
      </div>
    </section>
  )
}
