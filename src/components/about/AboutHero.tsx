import React from 'react'
import Link from 'next/link'

const AVATARS = [
  { src: '/assets/images/About Us/atlanticcatering-gh.com_e3584ba9-8991-4cf1-83ec-baf88d1a6276.zip_1/jemima.png', alt: 'Jemima Tagoe, QHSE Manager' },
  { src: '/assets/images/About Us/atlanticcatering-gh.com_e3584ba9-8991-4cf1-83ec-baf88d1a6276.zip_1/joseph.png', alt: 'Joseph, Operations Team' },
  { src: '/assets/images/About Us/atlanticcatering-gh.com_e3584ba9-8991-4cf1-83ec-baf88d1a6276.zip_1/suz.png', alt: 'Suz, Client Services' },
]

const GRID_CAPTIONS = {
  premium: 'A decade of premium culinary excellence, served fresh across Ghana.',
  overlay: 'Every plate certified. Every service excellent.',
  trusted: 'Trusted by offshore rigs, corporate clients & global brands.',
}

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-start items-center text-center overflow-hidden bg-[#FAF9F6] px-6 md:px-16 pt-24 md:pt-28 pb-24">
      {/* Giant ghost background text — recoloured dark-on-light so it stays feint against
          the white background, and tucked into the top-left corner rather than centered. */}
      <div
        className="ghost-parallax absolute inset-0 flex flex-col justify-start pointer-events-none select-none overflow-hidden top-0 z-0"
        aria-hidden
      >
        <span
          className="block font-black uppercase leading-none tracking-tighter text-[18vw] md:text-[16vw] text-transparent mb-4 ml-[-20rem]"
          style={{ WebkitTextStroke: '1.5px rgba(26,26,26,0.06)' }}
        >
          ATLANTIC
        </span>
        <span
          className="block font-black uppercase leading-none tracking-tighter text-[16vw] md:text-[14vw] text-transparent ml-[3vw]"
          style={{ WebkitTextStroke: '1.5px rgba(26,26,26,0.05)' }}
        >
          CATERING
        </span>
      </div>

      {/* Main Typography & CTA Content Container */}
      <div className="relative z-20 flex flex-col items-center max-w-5xl mx-auto">
        {/* Trusted-by row — avatar stack + micro-copy */}
        <div className="hero-eyebrow flex items-center justify-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {AVATARS.map((a) => (
              <img
                key={a.alt}
                src={a.src}
                alt={a.alt}
                className="w-7 h-7 rounded-full border-2 border-[#FAF9F6] object-cover bg-gray-200"
                draggable={false}
              />
            ))}
          </div>
          <p className="font-inter text-[13px] md:text-[15px] text-gray-600 font-medium tracking-tight">
            55,000+ meals served. Countless clients satisfied. Discover Atlantic today.
          </p>
        </div>

        {/* Main headline */}
        <h1 className="hero-line font-outfit font-bold uppercase tracking-tight leading-[1.1] m-0 text-center text-[#111827] text-5xl md:text-[64px]">
          Focus On The Work
          <br />
          We'll Take Care
          <br />
          Of The Rest
        </h1>

        {/* Subheadline */}
        <p className="font-inter text-base md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mt-6">
          From offshore platforms to corporate boardrooms, we deliver ISO-certified catering
          and logistics excellence. Because every operation deserves the same standard.
        </p>

        {/* CTA row */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-10 mx-auto">
          <Link
            href="/contact"
            className="bg-[#EF9419] hover:bg-[#D97F0C] text-white font-inter font-medium py-3.5 px-8 rounded-md transition-colors duration-200 shadow-sm"
          >
            Get In Touch
          </Link>
          <Link
            href="/services"
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-inter font-medium py-3.5 px-6 rounded-md flex items-center gap-2 transition-colors duration-200 shadow-sm"
          >
            See Our Services
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Photo grid — the same service cutouts used on the Services section,
          asymmetric masonry, sized up slightly from the first pass */}
      <div className="relative z-20 w-full max-w-8xl mx-auto mt-16 px-16">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 justify-center">
          {/* Column 1 */}
          <div className="float-img flex flex-col gap-4 md:w-[27%]">
            <div className="rounded-[20px] overflow-hidden shadow-sm h-[500px] bg-[#fab75f]">
              <img
                src="/assets/images/Services/fit/vip-catering.webp"
                alt="VIP catering — plated course revealed under a silver cloche"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="bg-[#1B4332] text-white p-6 rounded-[20px] h-40 flex items-end shadow-sm">
              <p className="font-inter font-medium text-lg leading-tight text-left">
                {GRID_CAPTIONS.premium}
              </p>
            </div>
          </div>

          {/* Column 2 — pushed down slightly */}
          <div className="float-img flex flex-col md:w-[23%] md:self-end">
            <div className="rounded-[20px] overflow-hidden shadow-sm h-[450px] bg-[#F5F5F3]">
              <img
                src="/assets/images/Services/fit/event-planning.webp"
                alt="Event planning — gold chiavari table setting"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* Column 3 — pushed down furthest */}
          <div className="float-img flex flex-col gap-4 md:w-[23%] md:mt-24">
            <div className="rounded-[20px] overflow-hidden shadow-sm h-[220px] bg-[#F5F5F3]">
              <img
                src="/assets/images/Services/fit/camp.webp"
                alt="Camp management — Atlantic-branded camp, tents and vehicles"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden shadow-sm bg-[#F5F5F3]">
              <img
                src="/assets/images/Services/fit/support.webp"
                alt="24/7 support services — crew, equipment and vessel supply"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-white font-inter font-medium text-[17px] leading-tight text-left">
                {GRID_CAPTIONS.overlay}
              </p>
            </div>
          </div>

          {/* Column 4 — aligned to top */}
          <div className="float-img flex flex-col gap-4 md:w-[27%]">
            <div className="rounded-[20px] overflow-hidden shadow-sm h-[500px] bg-[#F5F5F3]">
              <img
                src="/assets/images/Services/oNSHORE2.webp"
                alt="Offshore catering and supply — vessel at sea"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="bg-[#1B4332] text-white p-6 rounded-[20px] h-40 flex items-end shadow-sm">
              <p className="font-inter font-medium text-lg leading-tight text-left">
                {GRID_CAPTIONS.trusted}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
