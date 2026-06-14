import React from 'react'

const SDGS = [
  { number: '1', title: 'No Poverty', desc: 'Sponsoring free capacity building seminars in low-income areas.' },
  { number: '2', title: 'Zero Hunger', desc: 'Nutritious & healthy meal planning designed to tackle food insecurity.' },
  { number: '3', title: 'Good Health', desc: 'Strict safety standards keeping our workforce and customers healthy.' },
  { number: '4', title: 'Quality Education', desc: 'Active professional development courses and self-development training.' },
  { number: '5', title: 'Gender Equality', desc: 'Equal opportunity hiring policies & training initiatives for female empowerment.' },
  { number: '12', title: 'Responsible Consumption', desc: 'Conducting environmental impact assessments of product use.' },
  { number: '17', title: 'Partnerships', desc: 'Building strategic relationships to amplify the reach of the SDGs.' }
]

export default function Sustainability() {
  return (
    <section className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="block font-inter text-[#10B981] text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Sustainability
          </span>
          <span
            className="block font-black uppercase leading-none text-[12vw] lg:text-[5rem] text-transparent"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
            aria-hidden
          >
            DOING
          </span>
          <span className="block font-black uppercase leading-none text-[12vw] lg:text-[5rem] text-white -mt-1">
            BUSINESS
          </span>
          <span className="block font-black uppercase leading-none text-[12vw] lg:text-[5rem] text-[#10B981] -mt-1">
            RIGHT.
          </span>
          <p className="font-inter text-white/65 text-sm leading-relaxed mt-6">
            We align our priorities with UN SDGs 1, 2, 3, 4, 5, 12, and 17 — integrating equality, food security, and environmental care into every decision we make.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10">
          {SDGS.map((sdg, idx) => (
            <div
              key={idx}
              className="p-6 border-b border-r border-white/10 hover:bg-white/[0.03] transition-colors last:border-b-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-black text-3xl text-[#10B981]/40 leading-none">{sdg.number}</span>
                <span className="font-black text-sm uppercase tracking-tight text-white">{sdg.title}</span>
              </div>
              <p className="font-inter text-white/55 text-xs leading-relaxed">{sdg.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
