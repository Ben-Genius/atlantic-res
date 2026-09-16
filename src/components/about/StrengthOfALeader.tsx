'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** "The Strength of a Leader", Brand Profile p.12 — copy verbatim. */
const PILLARS = [
  {
    title: 'Our Multi-Service Expertise',
    body: 'From catering and event management to camp and facility management, we will help your projects succeed.',
  },
  {
    title: 'Operational Excellence',
    body: 'We maintain a cutting-edge quality assurance approach that emphasizes food safety, health, and environmental standards, all based on ISO benchmarks.',
  },
  {
    title: 'Boosting Quality of Life',
    body: 'We empower our employees, clients and consumers with knowledge on healthier nutrition, sports and wellness practices.',
  },
  {
    title: "Our Team's Agility",
    body: 'Our adaptable employees are trained in agile working methods, ready to respond to your needs.',
  },
  {
    title: "Everyone's Responsibility",
    body: 'At Atlantic, WE CARE. Our action-oriented societal commitments are embraced by every member of our team.',
  },
  {
    title: 'The Spirit of Innovation',
    body: 'We are explorers of trends and consumer experiences, always looking to enhance what we offer.',
  },
]

export default function StrengthOfALeader() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.from('.pillar', {
        opacity: 0,
        y: 32,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      return () => tween.kill()
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="scroll-reveal w-full px-6 md:px-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-[#3C8B36]">
          The Strength<br />of a Leader
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.title} className="pillar">
              <span className="block font-display text-sm font-bold tabular-nums text-[#cc9933]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-3 block h-px w-10 bg-[#A4D79C]" />
              <h3 className="mt-5 text-base md:text-lg font-bold leading-snug text-[#3C8B36]">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#0d0d0d]/70">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
