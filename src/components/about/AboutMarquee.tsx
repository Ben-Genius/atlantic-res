'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const MARQUEE_ITEMS = [
  'OFFSHORE CATERING', 'KEEP IT ATLANTIC', 'PREMIUM QUALITY',
  'OFFSHORE CATERING', 'KEEP IT ATLANTIC', 'ONSHORE OPERATIONS',
  'KEEP IT ATLANTIC', 'CAMP MANAGEMENT', 'SHIP SUPPLIES',
]

export default function AboutMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marquee2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mq = marqueeRef.current
    const mq2 = marquee2Ref.current
    if (mq) {
      gsap.to(mq, { x: '-50%', duration: 22, ease: 'none', repeat: -1 })
    }
    if (mq2) {
      gsap.set(mq2, { x: '-50%' })
      gsap.to(mq2, { x: '0%', duration: 26, ease: 'none', repeat: -1 })
    }
  })

  return (
    <div className="w-full">
      {/* ── MARQUEE TICKER ── */}
      <div className="w-full overflow-hidden border-t border-b border-white/15 py-4 mt-8">
        <div ref={marqueeRef} className="flex gap-0 whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
                {item}
              </span>
              <span className="font-black text-2xl md:text-3xl text-[#EF9419]">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden border-b border-white/10 py-4">
        <div ref={marquee2Ref} className="flex gap-0 whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
          {['OFFSHORE CATERING', 'ISO CERTIFIED', 'CAMP MANAGEMENT', 'FPSO SPECIALISTS', 'SHIP SUPPLIES', 'GHANA OWNED', 'OFFSHORE CATERING', 'ISO CERTIFIED', 'CAMP MANAGEMENT', 'FPSO SPECIALISTS', 'SHIP SUPPLIES', 'GHANA OWNED'].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span
                className="font-black text-2xl md:text-3xl uppercase tracking-tight text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.45)' }}
              >
                {item}
              </span>
              <span className="font-black text-2xl md:text-3xl text-white/20">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
