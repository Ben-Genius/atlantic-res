'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(sectionRef.current!.querySelectorAll('.reveal'), {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-section bg-white relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(103,186,103,0.06) 0%, transparent 70%)' }}
      />
      <div className="container-xl text-center relative z-10 max-w-[900px] mx-auto">
        <div className="reveal">
          <div className="section-label justify-center">
            <span className="brand-line" />
            Our Mission
          </div>
          <blockquote
            className="font-serif font-medium text-[#1a1a1a] italic mb-10"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.3 }}
          >
            "Deliver quality, healthy, nutritious, and hygienically prepared meals with excellence to every client and partner."
          </blockquote>
          <div className="h-px bg-gradient-to-r from-transparent via-[#57C157] to-transparent mb-10" />
          <p className="text-sm text-[rgba(26,26,26,0.4)] tracking-[0.15em] uppercase">
            Maud Lindsay-Gamrat — Chief Executive Officer
          </p>
        </div>
      </div>
    </section>
  )
}
