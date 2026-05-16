'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/home'
import CtaButton from '@/components/ui/CtaButton'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(sectionRef.current!.querySelectorAll('.reveal'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="services" className="py-section bg-[#f5f5f3]">
      <div className="container-xl">
        <div className="reveal flex flex-wrap justify-between items-end gap-8 mb-16">
          <div>
            <div className="section-label">
              <span className="brand-line" />
              What We Do
            </div>
            <h2
              className="font-serif font-semibold text-[#1a1a1a]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              Our Service<br />Segments
            </h2>
          </div>
          <CtaButton href="/services" label="All Services" variant="outline" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[.08]">
          {services.map((svc) => (
            <ServiceCard key={svc.tag} {...svc} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  tag: string
  title: string
  desc: string
  href: string
  img?: string
}

function ServiceCard({ tag, title, desc, href, img }: ServiceCardProps) {
  return (
    <div className="reveal">
      <Link href={href} className="block h-full no-underline group/card">
        <div className="h-full bg-white border border-transparent hover:border-[rgba(103,186,103,0.3)] hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ease-premium">
          {img && (
            <div className="relative h-[220px] overflow-hidden">
              <Image src={img} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
            </div>
          )}
          <div className="p-8">
            <div className="text-[0.65rem] font-bold tracking-[0.2em] text-[#EF9419] mb-3">{tag}</div>
            <h3 className="font-serif text-2xl font-semibold text-[#1a1a1a] mb-3 leading-[1.2]">{title}</h3>
            <p className="text-sm text-[rgba(26,26,26,0.55)] leading-[1.7]">{desc}</p>
            <div className="flex items-center gap-1.5 mt-6 text-[#57C157] text-xs font-semibold tracking-[0.1em] uppercase">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
