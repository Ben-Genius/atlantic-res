'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AboutEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Parallax: bg moves slower than scroll — classic depth effect
    gsap.to(bgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="scroll-reveal relative w-[95%] mx-auto overflow-hidden mt-10 rounded-xl"
      style={{ minHeight: '600px' }}
    >

      {/* ── Parallax background layer ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full pointer-events-none will-change-transform"
        style={{
          // Oversized vertically so parallax has room to travel without gaps
          top: '-15%',
          height: '130%',
        }}
      >
        <img
          src="/assets/images/About Us/bg.png"
          alt="Parallax Background"
          className="w-full h-full object-contain object-left"
          draggable={false}
        />
      </div>

      {/* ── Overlay stack ──
          1. Brand green multiply so it ties into your site palette
          2. Dark gradient — heavy left (text side), lighter right (visual breathing room)
          3. Noise grain for texture consistency                                    */}
      <div className="absolute inset-0 bg-[#1a5c1a]/15 mix-blend-multiply pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-black/30 pointer-events-none z-10" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 px-8 md:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left col: body copy */}
          <div className="order-2 lg:order-1 max-w-md">
            <span className="block font-inter text-[#EF9419] text-sm font-bold uppercase tracking-[0.4em] mb-5">
              Atlantic Catering and Logistics Limited
            </span>
            <p className="font-inter text-white/90 text-base md:text-lg leading-relaxed mb-5">
              A wholly-owned Ghanaian professional corporate catering company established in 2014 to provide
              specialized catering and logistics services for onshore and offshore operations, camp management,
              ship and store supplies, laundry, housekeeping, and janitorial services.
            </p>
            <p className="font-inter text-white/70 text-base md:text-lg leading-relaxed">
              Built on total authenticity — genuine ingredients, absolute consistency, and a team of passionate
              professionals. Over 99.9% of our workforce are Ghanaian nationals.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { value: '10+', label: 'Years Operating' },
                { value: '150+', label: 'Team Members' },
                { value: '99.9%', label: 'Ghanaian Staff' },
                { value: '2 FPSOs', label: 'Offshore Sites' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <span className="font-black text-2xl text-[#EF9419] leading-none">{stat.value}</span>
                  <span className="font-inter text-white/55 text-[10px] uppercase tracking-widest mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right col: massive outlined text */}
          <div className="order-1 lg:order-2 text-right">
            <h2 className="font-extrabold uppercase leading-[1.05] tracking-tighter m-0 text-right">
              <span className="block overflow-hidden">
                <span
                  className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[10rem] text-transparent"
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)' }}
                >
                  WHO <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>WE</span>
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[10rem] text-[#EF9419]">
                  ARE.
                </span>
              </span>
            </h2>
          </div>

        </div>
      </div>

    </section>
  )
}