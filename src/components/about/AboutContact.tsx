import React from 'react'

export default function AboutContact() {
  return (
    <section id="contact" className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <span
            className="block font-black uppercase leading-none text-[14vw] lg:text-[6.5rem] text-transparent"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
            aria-hidden
          >
            DISCOVER
          </span>
          <span className="block font-black uppercase leading-none text-[14vw] lg:text-[6.5rem] text-white -mt-2">
            ATLANTIC
          </span>
          <p className="font-inter text-white/55 text-sm leading-relaxed mt-6 max-w-sm">
            Real catering. No shortcuts. No compromises. We didn't come here to follow trends — we came to show what happens when passion meets professionalism.
          </p>

          <a
            href="mailto:info@atlanticcatering-gh.com"
            className="inline-block mt-8 border border-white/80 text-white font-inter font-bold text-xs uppercase tracking-widest px-8 py-3 hover:bg-white hover:text-[#1a4a1a] transition-all duration-200"
          >
            ABOUT US
          </a>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pl-0 lg:pl-12 pt-8 lg:pt-0">
          {[
            { label: 'Office Address', value: '20 Suya Street, Accra, Ghana\nGA-374-2184' },
            { label: 'Phone', value: '+233 501 502 441' },
            { label: 'Email', value: 'info@atlanticcatering-gh.com' },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-black text-xs uppercase tracking-[0.25em] text-white/40 mb-1">{item.label}</p>
              <p className="font-inter text-white text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
