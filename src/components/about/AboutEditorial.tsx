'use client'

import React from 'react'
import { GlobePulse } from '@/components/ui/globe-pulse'
import Image from 'next/image'

export default function AboutEditorial() {
  return (
    <section
      className="scroll-reveal relative w-[95%] mx-auto overflow-hidden mt-10 rounded-xl bg-slate-900"
      style={{ minHeight: '600px' }}
    >
      {/* ── Overlay stack ──
          1. Brand green multiply so it ties into your site palette
          2. Dark gradient — heavy left (text side), lighter right (visual breathing room)
          3. Noise grain for texture consistency                                    */}
      <div className="absolute inset-0 bg-[#134E4A] mix-blend-multiply opacity-90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/85 via-black/50 to-transparent z-0 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 px-6 md:px-16 py-12 md:py-28 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* Left col: body copy */}
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

            {/* Stat pills */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              {[
                { value: '10+', label: 'Years Operating' },
                { value: '150+', label: 'Team Members' },
                { value: '99.9%', label: 'Ghanaian Staff' },
                { value: '2 FPSOs', label: 'Offshore Sites' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col border border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 rounded-xl min-w-[100px] text-center">
                  <span className="font-black text-2xl text-[#EF9419] leading-none">{stat.value}</span>
                  <span className="font-inter text-white/55 text-[9px] uppercase tracking-widest mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle col: Globe */}
          <div className="order-1 lg:order-2 flex justify-center items-center w-full">
            <GlobePulse
              className="w-full max-w-[280px] lg:max-w-[450px] aspect-square"
              markers={[{ id: "ghana", location: [7.9465, -1.0232], delay: 0 }]}
            />
          </div>

          {/* Right col: massive outlined text */}
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

        </div>
      </div>

    </section>
  )
}