import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CARDS = [
  { label: 'Our Mission', color: '#EF9419', title: 'QUALITY MEALS', body: 'To provide quality, healthy, nutritious, and hygienically-prepared meals and excellent services to our clients and partners.' },
  { label: 'Our Vision', color: '#10B981', title: 'AFRICAN LEADERSHIP', body: 'To lead the hospitality and food industry in Africa and beyond while maintaining our quality, reliability, uniqueness, excellence, and creativity in our product and service delivery.' },
  { label: 'Our Goal', color: '#60A5FA', title: 'TOP STANDARDS', body: 'To ensure maximum customer satisfaction by completing every aspect of our production process to the highest industry standards in line with ACLL’s Integrated Management Systems Program' },
]

export default function MissionVision() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from('.ceo-video', {
      x: -80,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    gsap.from('.ceo-quote', {
      x: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    gsap.from('.quote-line', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none none',
      }
    })

    gsap.from('.cert-badge', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    })

  }, { scope: sectionRef })
  return (
    <section className="scroll-reveal w-full px-6 md:px-16 py-16">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 group hover:bg-white/[0.03] transition-colors"
          >
            <span className="block font-inter text-xs font-bold uppercase tracking-widest mb-4" style={{ color: card.color }}>
              {card.label}
            </span>
            <h3 className="font-black text-3xl md:text-4xl uppercase tracking-tight text-white leading-none mb-5">
              {card.title}
            </h3>
            <p className="font-inter text-white/60 text-sm leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <section
        ref={sectionRef}
        className="scroll-reveal relative w-full overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[70vh]">

          {/* ══ LEFT — Video ══ */}
          <div className="ceo-video lg:col-span-6 relative">
            <div className="w-full h-[60vw] lg:h-full min-h-[360px] relative overflow-hidden">
              <video
                src="https://atlanticcatering-gh.com/wp-content/uploads/2026/02/Home-Atlantic-Catering.mp4"

                loop
                muted={muted}
                playsInline
                controls

                poster="/assets/images/thumbnail.png"

                className="absolute inset-0 w-full h-full object-contain "
              />

              {/* Right-edge fade blending into text side */}
              <div className="absolute inset-y-0 right-0 w-28 pointer-events-none" />

              {/* Mute / Unmute toggle */}
              <button
                onClick={() => setMuted(m => !m)}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/15 text-white px-3 py-2 rounded-full transition-all"
              >
                {muted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
                <span className="font-inter text-[10px] uppercase tracking-widest">
                  {muted ? 'Unmute' : 'Mute'}
                </span>
              </button>
            </div>
          </div>

          {/* ══ RIGHT — Quote ══ */}
          <div className="ceo-quote lg:col-span-5 flex flex-col justify-between p-10 md:p-14 lg:p-16 gap-10 relative overflow-hidden">

            {/* Giant decorative opening quote mark — background layer */}
            <span
              className="absolute -top-10 -left-4 font-black text-white/[0.04] select-none pointer-events-none leading-none"
              style={{
                fontSize: 'clamp(14rem, 30vw, 28rem)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 0.75,
              }}
              aria-hidden
            >
              "
            </span>

            <div className="relative z-10 flex flex-col gap-8 flex-1 justify-center">

              {/* Eyebrow label */}
              <div className="quote-line flex items-center gap-3">
                <div className="w-8 h-px bg-[#EF9419]" />
                <span className="font-inter text-[#EF9419] text-xs font-bold uppercase tracking-[0.35em]">
                  Message from the CEO
                </span>
              </div>

              {/* Opening quote glyph — small, decorative */}
              <span
                className="quote-line block text-[#EF9419] font-black leading-none select-none"
                style={{
                  fontSize: '4rem',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 0.6,
                }}
                aria-hidden
              >
                "
              </span>

              {/* The quote — Sqew-style: mix of outlined ghost + solid words inline */}
              <blockquote className="quote-line relative">
                <p
                  className="font-black uppercase leading-[0.88] tracking-tighter"
                  style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
                >
                  {/* Line 1 — outlined ghost */}
                  <span
                    className="block text-transparent"
                    style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.80)' }}
                  >
                    WE DON'T JUST
                  </span>

                  {/* Line 2 — solid orange accent */}
                  <span className="block text-[#EF9419]">
                    FEED PEOPLE.
                  </span>

                  {/* Line 3 — solid white */}
                  <span className="block text-white">
                    WE NOURISH
                  </span>

                  {/* Line 4 — outlined ghost again */}
                  <span
                    className="block text-transparent"
                    style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.45)' }}
                  >
                    LIVES.
                  </span>
                </p>
              </blockquote>

              {/* Full prose quote — smaller, under the display headline */}
              <p className="quote-line font-inter text-white/65 text-sm md:text-base leading-relaxed max-w-lg">
                At Atlantic, every meal we serve is a promise kept — a commitment to quality,
                dignity, and care. We believe the standard of catering in Africa can be
                world-class, and we prove it every single day. Backed by comprehensive ISO certifications
                in environmental, health, and food safety management, we guarantee the highest standards
                in cleanliness and service quality.
              </p>

              {/* Closing quote glyph */}
              <span
                className="quote-line block text-[#EF9419]/40 font-black leading-none select-none self-end"
                style={{
                  fontSize: '3rem',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 0.6,
                }}
                aria-hidden
              >
                "
              </span>

              {/* Attribution */}
              <div className="quote-line flex items-center gap-4 border-t border-white/10 pt-6">

                <div>
                  <p className="font-black text-white text-sm uppercase tracking-wide leading-none">
                    Maud Lindsay-Gamrat
                  </p>
                  <p className="font-inter text-white/50 text-xs mt-1 uppercase tracking-widest">
                    Chief Executive Officer · ACLL
                  </p>
                </div>

                {/* ISO badges pushed to the right */}
                <div className="ml-auto flex flex-wrap justify-end gap-2">
                  {['ISO 9001', 'ISO 14001', 'ISO 22000', 'ISO 45001'].map(cert => (
                    <span
                      key={cert}
                      className="cert-badge border border-white/20 text-white/60
                               font-inter font-bold text-[9px] uppercase tracking-widest
                               px-2.5 py-1 hover:border-white/50 hover:text-white
                               transition-colors duration-200"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </section>
  )
}
