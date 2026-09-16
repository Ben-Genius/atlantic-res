'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

/** Counts up from 0 to `end` once the element scrolls into view. Decimal
 *  targets (e.g. 99.9) count up with one decimal place; whole numbers count
 *  as integers. Reduced-motion just lands on the final value immediately. */
export function AnimatedCounter({ end, prefix = '', suffix = '', duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const decimals = Number.isInteger(end) ? 0 : 1

  /* Large figures (2,190,000+ meals annually) are unreadable without
     grouping; values under a thousand are unaffected. */
  const render = (n: number) =>
    `${prefix}${n.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (ref.current) ref.current.textContent = render(end)
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const counter = { val: 0 }
      const tween = gsap.to(counter, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = render(counter.val)
        },
      })
      return () => tween.kill()
    })

    return () => mm.revert()
  }, { scope: ref })

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
