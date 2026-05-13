'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  className?: string
  children: React.ReactNode
}

export default function ScrollReveal({ className = '', children }: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLDivElement>('.reveal-item')
      elements.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
