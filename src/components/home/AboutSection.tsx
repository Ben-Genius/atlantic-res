'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { values } from '@/data/home'
import CtaButton from '@/components/ui/CtaButton'
import type { LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(sectionRef.current!.querySelectorAll('.reveal'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-section bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <div className="section-label">
              <span className="brand-line" />
              About Atlantic
            </div>
            <h2
              className="font-serif font-semibold text-[#1a1a1a] mb-7"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              A Ghanaian Legacy<br />of Culinary Pride
            </h2>
            <p className="text-[rgba(26,26,26,0.65)] leading-[1.85] mb-5">
              Atlantic Catering and Logistics Limited is a wholly-owned Ghanaian professional corporate catering company established in 2014. We specialize in onshore and offshore catering, camp management, ship and store supplies, laundry, housekeeping, and janitorial services.
            </p>
            <p className="text-[rgba(26,26,26,0.65)] leading-[1.85] mb-10">
              Our service model is built for complex environments where reliability, quality, and compliance matter most — including operations aboard two FPSOs in Ghana's oil and gas sector.
            </p>
            <CtaButton href="/expertise" label="Our Expertise" />
          </div>

          <div className="flex flex-col gap-px bg-black/[.07]">
            {values.map(({ Icon, title, desc }) => (
              <ValueCard key={title} Icon={Icon} title={title} desc={desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueCard({ Icon, title, desc }: { Icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="flex gap-5 p-8 bg-[#fafaf8] hover:bg-[#f2f2f0] transition-colors duration-300">
      <div className="w-11 h-11 bg-[rgba(103,186,103,0.12)] border border-[rgba(103,186,103,0.3)] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#57C157]" />
      </div>
      <div>
        <div className="font-serif text-[1.2rem] font-semibold text-[#1a1a1a] mb-1.5">{title}</div>
        <div className="text-sm text-[rgba(26,26,26,0.55)] leading-[1.65]">{desc}</div>
      </div>
    </div>
  )
}
