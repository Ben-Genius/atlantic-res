'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * A gold band that travels horizontally between sections — the transition
 * device from the Qissa reference, rebuilt in Atlantic's gold with the
 * brand's own vocabulary.
 *
 * It does two jobs: it carries the eye from one parallax section to the
 * next, and it states what Atlantic does without another block of copy.
 */

const WORDS = [
  'Offshore Catering',
  'Camp Management',
  'Inflight Dining',
  'Ship Chandelling',
  'Event Management',
  'Housekeeping',
  'VIP Catering',
  '24/7 Support',
]

/** A four-point star, as the reference uses between its words. */
function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <path
        d="M12 1.5c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function BrandMarquee({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = reverse
        ? gsap.fromTo(trackRef.current, { xPercent: -50 }, { xPercent: 0, duration: 34, ease: 'none', repeat: -1 })
        : gsap.fromTo(trackRef.current, { xPercent: 0 }, { xPercent: -50, duration: 34, ease: 'none', repeat: -1 })
      return () => tween.kill()
    })

    return () => mm.revert()
  }, { scope: rootRef, dependencies: [reverse] })

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden py-4 md:py-5"
      style={{ background: 'linear-gradient(90deg, #B37B29 0%, #cc9933 22%, #E2C070 50%, #cc9933 78%, #B37B29 100%)' }}
      aria-hidden
    >
      <div
        ref={trackRef}
        className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform md:gap-12"
      >
        {[...WORDS, ...WORDS].map((word, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-12">
            <span className="font-serif text-xl italic leading-none text-[#0E3B2A] md:text-3xl">
              {word}
            </span>
            <span className="text-[#0E3B2A]/55">
              <Star />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
