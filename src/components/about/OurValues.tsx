'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRAND_VALUES } from '@/components/icons/ValueIcons'

gsap.registerPlugin(ScrollTrigger)

/** "Our Value Icons", brand guide p.19. */
export default function OurValues() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.from('.value-card', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.09,
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
      className="relative w-full overflow-hidden bg-[#FAF7EF] px-6 py-24 md:px-16 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-[#3C8B36]">
          Our <em className="not-italic font-normal italic text-[#cc9933]">Values</em>
        </h2>
        <p className="mt-3 text-center text-sm md:text-base text-[#cc9933] font-semibold">
          They represent what we believe in &amp; how we run our business
        </p>

        <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {BRAND_VALUES.map(({ title, colour, Icon }) => (
            <li
              key={title}
              className="value-card flex flex-col items-center gap-4 rounded-2xl border border-black/[0.07] bg-white/85 px-4 py-8 text-center backdrop-blur-sm"
            >
              <span
                className="grid h-16 w-16 place-items-center rounded-full"
                style={{ backgroundColor: `${colour}1A`, color: colour }}
              >
                <Icon className="h-9 w-9" />
              </span>
              <span
                className="text-[13px] md:text-sm font-bold leading-snug"
                style={{ color: colour }}
              >
                {title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
