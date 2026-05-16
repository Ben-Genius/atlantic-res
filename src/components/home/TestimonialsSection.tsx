'use client'

import { useRef } from 'react'
import { Star } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '@/data/home'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
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
    <section ref={sectionRef} className="py-section bg-[#f5f5f3]">
      <div className="container-xl">
        <div className="reveal mb-16">
          <div className="section-label">
            <span className="brand-line" />
            Client Feedback
          </div>
          <h2
            className="font-serif font-semibold text-[#1a1a1a]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[.07]">
          {testimonials.map(({ quote, author, role }) => (
            <TestimonialCard key={author} quote={quote} author={author} role={role} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="reveal bg-white p-10">
      <div className="flex gap-0.5 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#EF9419] text-[#EF9419]" />
        ))}
      </div>
      <p className="font-serif text-[1.2rem] font-medium text-[#1a1a1a] leading-[1.6] italic mb-8">
        "{quote}"
      </p>
      <div className="border-t border-black/[.08] pt-5">
        <div className="text-sm font-semibold text-[#1a1a1a]">{author}</div>
        <div className="text-xs text-[#57C157] mt-0.5 tracking-[0.05em]">{role}</div>
      </div>
    </div>
  )
}
