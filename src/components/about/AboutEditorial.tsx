'use client'

import React from 'react'
import { GlobePulse } from '@/components/ui/globe-pulse'
import Image from 'next/image'

export default function AboutEditorial() {
  return (
    <section
      className="scroll-reveal relative w-[95%] mx-auto overflow-hidden mt-10 rounded-xl"
      style={{ minHeight: '600px' }}
    >
      {/* ── Overlay stack ──
          1. Brand green multiply so it ties into your site palette
          2. Dark gradient — heavy left (text side), lighter right (visual breathing room)
          3. Noise grain for texture consistency                                    */}

      {/* ── Content ── */}
      <div className="relative z-20 px-8 md:px-16 py-20 md:py-28 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

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

          {/* Middle col: Globe */}
          <div className="order-1 lg:order-2 flex justify-center items-center w-full">
            <GlobePulse
              className="w-full max-w-[300px] lg:max-w-[450px] aspect-square"
              markers={[{ id: "ghana", location: [7.9465, -1.0232], delay: 0 }]}
            />
          </div>

          {/* Right col: massive outlined text */}
          <div className="order-3 lg:order-3 text-right">
            <h2 className="font-extrabold uppercase leading-[1.05] tracking-tighter m-0 text-right">
              <span className="block overflow-hidden">
                <span
                  className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7rem] text-transparent"
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)' }}
                >
                  WHO <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>WE</span>
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[7rem] text-[#EF9419]">
                  ARE.
                </span>
              </span>
            </h2>

            <div className="flex justify-end items-end w-full">
              <Image className="rounded-2xl object-contain " src="/assets/images/About Us/whoweare.png" alt="Who We Are" width={320} height={320} />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}