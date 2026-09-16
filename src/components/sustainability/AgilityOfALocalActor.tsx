'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

/**
 * "The Agility of a Local Actor", Brand Profile p.13.
 *
 * The review routed this spread to Sustainability rather than About Us. The
 * profile lays it out as four points threaded along a dashed path; that path
 * is drawn here as a stroked SVG connector between the four plates.
 */
const POINTS = [
  {
    body: 'We provide 100% customizable solutions tailored to your unique requirements while ensuring compliance with local standards.',
    image: '/assets/images/Services/eventt.webp',
    alt: 'Atlantic buffet service laid out on site',
  },
  {
    body: 'Our high-performance and versatile teams, with a 90% local employment quota, are strategically recruited from the communities we serve to stay as close to our clients as possible.',
    image: '/assets/images/About Us/whoweare.png',
    alt: 'Atlantic team gathered at a company event',
  },
  {
    body: 'We take actionable steps that align with our clients’ priorities and contribute positively to the communities around us.',
    image: '/assets/images/Services/support.webp',
    alt: 'Atlantic kitchen team preparing meals',
  },
  {
    body: 'Our internal digitization ecosystem is designed to benefit our guests, clients and employees alike.',
    image: '/assets/images/About Us/au3.png',
    alt: 'Atlantic staff training session',
  },
]

export default function AgilityOfALocalActor() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })

      tl.from('.agility-step', {
        opacity: 0,
        y: 36,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
      })

      return () => tl.kill()
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAFAF8] px-6 md:px-16 py-20 md:py-28"
    >
      {/* Dotted field, as on the profile spread */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(rgba(27,67,50,0.13) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-[#cc9933]">
          The Agility of<br />a Local Actor
        </h2>

        <ol className="mt-16 md:mt-20 flex flex-col gap-12 md:gap-16">
          {POINTS.map((point, i) => (
            <li
              key={point.body}
              className={`agility-step relative flex flex-col items-center gap-6 md:gap-10 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Plate */}
              <div className="relative h-[132px] w-[132px] shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-[0_10px_30px_rgba(27,67,50,0.18)] md:h-[160px] md:w-[160px]">
                <Image
                  src={point.image}
                  alt={point.alt}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              {/* Copy */}
              <p
                className={`max-w-md text-center text-sm md:text-base leading-relaxed text-[#0d0d0d]/80 ${
                  i % 2 === 0 ? 'md:text-left' : 'md:text-right'
                }`}
              >
                <span className="mr-2 font-display text-sm font-bold text-[#cc9933]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
