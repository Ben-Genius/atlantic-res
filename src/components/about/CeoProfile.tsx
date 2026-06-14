import React from 'react'

export default function CeoProfile() {
  return (
    <section className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Image col */}
        <div className="lg:col-span-5 relative">
          <div className="w-full aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
            <img
              src="/images/services/atlantic/offshore-catering-new.jpg"
              alt="Maud Lindsay-Gamrat"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="font-black text-2xl uppercase tracking-tight text-white leading-none">
              Maud Lindsay-Gamrat
            </p>
            <p className="font-inter text-[#EF9419] text-xs uppercase tracking-widest font-bold mt-1">
              Chief Executive Officer
            </p>
          </div>
        </div>

        {/* Text col */}
        <div className="lg:col-span-7 flex flex-col justify-between border-l border-white/10 p-8 md:p-12 gap-10">
          <div>
            <span
              className="block font-black uppercase leading-none text-[12vw] lg:text-[5.5rem] text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
              aria-hidden
            >
              LEADER
            </span>
            <span className="block font-black uppercase leading-none text-[12vw] lg:text-[5.5rem] text-white -mt-2">
              SHIP.
            </span>
          </div>

          <div className="space-y-4 font-inter text-white/70 text-sm md:text-base leading-relaxed">
            <p>
              Maud Lindsay-Gamrat is a seasoned business leader with over two decades of experience in the Ghanaian landscape. Her expertise spans inflight, camp and remote site, offshore and onshore catering operations.
            </p>
            <p>
              As CEO of Atlantic, Maud has championed local capacity development, leading a team of over 150 — with an extraordinary 99.9% being Ghanaians. The company excels in delivering specialized catering aboard two FPSOs in Ghana and various onsite corporate operations.
            </p>
            <p>
              Her achievements include: Most Outstanding Female Owned Business in Ghana's Upstream Petroleum sector, Glitz Woman of the Year for Catering & Hospitality, and a feature on CNN's "Passion to Portfolio".
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {['ISO 9001', 'ISO 14001', 'ISO 22000', 'ISO 45001'].map(cert => (
              <span key={cert} className="border border-white/20 text-white/80 font-inter font-bold text-[10px] uppercase tracking-widest px-3 py-1.5">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
