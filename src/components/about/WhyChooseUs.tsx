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
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-center text-white">
          Why <em className="not-italic font-normal italic text-[#0E3B2A]">Choose Us</em>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, strap }) => (
            <div key={title} className="reason flex flex-col items-center text-center">
              <Icon className="h-9 w-9 text-white" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-5 text-sm md:text-base font-bold leading-snug text-white">{title}</h3>
              <p className="mt-1.5 text-xs md:text-sm leading-snug text-white/75">{strap}</p>
              <span className="mt-5 block h-px w-14 bg-white/35" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
