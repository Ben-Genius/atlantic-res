'use client'

import React from 'react'
import { GlobePulse } from '@/components/ui/globe-pulse'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import Image from 'next/image'

const STATS: { value: number; suffix: string; label: string; image: string }[] = [
  { value: 10, suffix: '+', label: 'Years Operating', image: '/assets/images/About Us/bg.png' },
  { value: 150, suffix: '+', label: 'Team Members', image: '/assets/images/Services/eventt.webp' },
  { value: 99.9, suffix: '%', label: 'Ghanaian Staff', image: '/assets/images/About Us/whoweare.png' },
  { value: 2, suffix: '', label: 'Offshore FPSOs', image: '/assets/images/Services/oNSHORE2.webp' },
]

export default function AboutEditorial() {
  return (
    <section
      className="scroll-reveal relative w-[95%] mx-auto overflow-hidden mt-10 "
      style={{ minHeight: '600px' }}
    >
      {/* ── Overlay stack ──
          1. Brand green multiply so it ties into your site palette
          2. Dark gradient — heavy left (text side), lighter right (visual breathing room)
          3. Noise grain for texture consistency                                    */}
      {/* <div className="absolute inset-0 bg-[#134E4A] mix-blend-multiply opacity-90 z-0 pointer-events-none" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/85 via-black/50 to-transparent z-0 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      /> */}


      <div className="relative z-20 px-6 md:px-16 py-12 md:py-6 h-full flex flex-col justify-center">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">


          <div className="order-2 lg:order-1 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <span className="block font-inter text-[#EF9419] text-sm font-bold uppercase tracking-[0.4em] mb-5">
              Atlantic Catering and Logistics Limited
            </span>
            <p className="font-inter text-white/90 text-sm md:text-base leading-relaxed mb-5">
              A wholly-owned Ghanaian professional corporate catering company established in 2014 to provide
              specialized catering and logistics services for onshore and offshore operations, camp management,
              ship and store supplies, laundry, housekeeping, and janitorial services.
            </p>
            <p className="font-inter text-white/70 text-sm md:text-base leading-relaxed">
              Built on total authenticity — genuine ingredients, absolute consistency, and a team of passionate
              professionals. Over 99.9% of our workforce are Ghanaian nationals.
            </p>
          </div>


          <div className="order-1 lg:order-2 flex justify-center items-center w-full">
            <GlobePulse
              className="w-full max-w-[280px] lg:max-w-[450px] aspect-square"
              markers={[{ id: "ghana", location: [7.9465, -1.0232], delay: 0 }]}
            />
          </div>


          <div className="order-3 lg:order-3 text-center lg:text-right flex flex-col items-center lg:items-end">
            <h2 className="font-extrabold uppercase leading-[1.05] tracking-tighter m-0 text-center lg:text-right">
              <span className="block overflow-hidden">
                <span
                  className="block text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7rem] text-transparent"
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)' }}
                >
                  WHO <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>WE</span>
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="block text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7rem] text-[#EF9419]">
                  ARE.
                </span>
              </span>
            </h2>

            <div className="flex justify-center lg:justify-end items-center lg:items-end w-full mt-6">
              <Image className="rounded-2xl object-contain" src="/assets/images/About Us/whoweare.png" alt="Who We Are" width={260} height={260} />
            </div>
          </div>

        </div> */}

        {/* ── Stat panels — full-bleed photo cards, number counts up on scroll ── */}
        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden bg-white/0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-panel relative group aspect-[4/5] overflow-hidden bg-card">
              <div className="stat-bg absolute inset-0 z-0 overflow-hidden" style={{ clipPath: "inset(0% 0 0 0)" }}>
                <Image
                  src={stat.image}
                  alt={stat.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-100 md:opacity-90 transition-all duration-700 group-hover:scale-105 md:group-hover:opacity-100"
                />
                {/* Stronger gradient on mobile so text is always legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 md:from-black/80 md:via-black/30 md:to-black/10" />
              </div>

              <div className="stat-content relative z-10 flex h-full flex-col justify-end p-5 md:p-8">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                />
                <p className="mt-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {stat.label}
                </p>
              </div>

              {i < STATS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-0 h-full w-px bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
