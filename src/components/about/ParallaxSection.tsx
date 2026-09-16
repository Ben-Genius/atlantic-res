'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * The asymmetric treatment from Le Saint Georges: a photograph bleeding off
 * one edge of the page, with the content panel offset to the other side and
 * overlapping it. The photograph is shown as shot — no wash over it.
 *
 * This is the About page's one parallax section. Every other section uses a
 * flat ground, so the drift here reads as a deliberate change of pace rather
 * than a house style applied four times over.
 */

interface ParallaxSectionProps {
  id?: string
  image: string
  imageAlt?: string
  /** Which edge the photograph bleeds from. The panel takes the other side. */
  bleed?: 'left' | 'right'
  className?: string
  children: React.ReactNode
}

export default function ParallaxSection({
  id,
  image,
  imageAlt = '',
  bleed = 'left',
  className = '',
  children,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const bg = gsap.fromTo(
        '.px-bg',
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      const panel = gsap.from('.px-panel', {
        x: bleed === 'left' ? 60 : -60,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })

      return () => {
        bg.kill()
        panel.kill()
      }
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  const photoSide = bleed === 'left' ? 'left-0' : 'right-0'
  const panelSide = bleed === 'left' ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[#FAF7EF] pb-20 md:pb-28 lg:py-28 ${className}`}
    >
      {/* Photograph — bleeds off one edge, drifts slower than the page */}
      <div className={`absolute ${photoSide} top-0 hidden h-full w-[58%] overflow-hidden lg:block`}>
        <div className="px-bg absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
          <Image src={image} alt={imageAlt} fill sizes="58vw" className="object-cover" />
        </div>
      </div>

      {/* Narrow screens take the photograph above the copy instead */}
      <div className="relative mb-10 h-[280px] w-full overflow-hidden sm:h-[360px] lg:hidden">
        <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-8xl px-5 sm:px-8">
        <div
          className={`px-panel w-full bg-white px-6 py-12 shadow-[0_30px_70px_rgba(14,59,42,0.18)] sm:px-10 md:px-14 md:py-16 lg:w-[54%] ${panelSide}`}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
