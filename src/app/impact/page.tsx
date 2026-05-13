'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Heart, Users2, ShieldCheck, Globe } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

export default function ImpactPage() {
  return (
    <main style={{ background: 'var(--color-ink)' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-impact.png" alt="Our Impact" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.4) 100%)' }} />
        </div>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="section-label"><span className="brand-line" />Responsibility</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: 'white' }}>
              Our <span className="text-gradient">Impact</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, marginTop: '1rem' }}>
              Committed to the people, the environment, and the future of Ghana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {[
              { 
                t: 'Local Content First', 
                d: 'We prioritize Ghanaian suppliers and talent. Over 90% of our workforce and 70% of our supply chain is locally sourced.',
                icon: Users2
              },
              { 
                t: 'Environmental Stewardship', 
                d: 'ISO 14001 certified. We implement rigorous waste management and sustainable sourcing practices across all sites.',
                icon: Leaf
              },
              { 
                t: 'Community Support', 
                d: 'We invest in local farming communities and educational initiatives to create long-term social value.',
                icon: Heart
              }
            ].map((p, i) => (
              <motion.div 
                key={p.t}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ background: 'var(--color-surface-2)', padding: '3rem', border: '1px solid var(--color-border)' }}
              >
                <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <p.icon style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'white', marginBottom: '1.25rem' }}>{p.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY ────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface)' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="section-label"><span className="brand-line" />Sustainability</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 600, color: 'white', marginBottom: '2rem' }}>
                Sustainable <span className="text-gradient">Sourcing</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Our "Ghana First" sourcing policy ensures that we buy fresh produce directly from local farmers, reducing carbon footprint while empowering rural communities.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Direct farm-to-table supply chain', 'Reduced plastic waste initiatives', 'Energy-efficient kitchen operations', 'Community training programs'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'white', fontSize: '0.9rem' }}>
                    <ShieldCheck style={{ width: 18, height: 18, color: 'var(--color-brand-green)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              variants={fadeUp} 
              custom={0.2}
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }}
              style={{ position: 'relative', height: 450, overflow: 'hidden', border: '1px solid var(--color-border)' }}
            >
              <Image src="/images/hero-impact.png" alt="Sustainability" fill style={{ objectFit: 'cover', opacity: 0.7 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-ink), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                 <div style={{ fontSize: '3rem', fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-brand-green)', fontWeight: 700 }}>70%</div>
                 <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Supply Chain Localized</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL STATEMENT ──────────────────────────── */}
      <section style={{ padding: '10rem 0', textAlign: 'center' }}>
        <div className="container-xl" style={{ maxWidth: 800 }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Globe style={{ width: 48, height: 48, color: 'var(--color-brand-green)', margin: '0 auto 2rem' }} />
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', lineHeight: 1.3 }}>
              "Our success is measured not just by the meals we serve, but by the legacy we leave in the communities where we operate."
            </h2>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
