'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Ship, Building2, PartyPopper, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

const serviceDetails = [
  {
    id: 'offshore',
    title: 'Offshore Operations',
    icon: Ship,
    img: '/images/service-offshore.png',
    desc: 'Specialized catering and logistics for FPSOs, vessels, and remote camps. We deliver morale-boosting nutrition in the most demanding environments.',
    features: ['ISO 22000 Certified Safety', 'Remote Site Management', 'Specialized Supply Chain', '24/7 Operations Support']
  },
  {
    id: 'corporate',
    title: 'Corporate Catering',
    icon: Building2,
    img: '/images/service-corporate.png',
    desc: 'Elevate your workspace with premium dining. From executive boardrooms to daily staff meals, we provide tailored culinary solutions.',
    features: ['Executive Boardroom Service', 'Daily Staff Feeding', 'Nutritional Menu Design', 'Hospitality Management']
  },
  {
    id: 'events',
    title: 'Event Management',
    icon: PartyPopper,
    img: '/images/catering_service_display.png', // Fallback or new image
    desc: 'Unforgettable culinary moments for your most important occasions. Bespoke menus and full-scale coordination for corporate and private events.',
    features: ['Custom Menu Curation', 'Full Event Staffing', 'Equipment & Decor', 'Premium Presentation']
  },
  {
    id: 'institutional',
    title: 'Institutional Services',
    icon: GraduationCap,
    img: '/images/hero-expertise.png', // Fallback
    desc: 'Comprehensive facilities management including laundry, housekeeping, and janitorial services for large-scale operations.',
    features: ['Professional Housekeeping', 'Large-scale Laundry', 'Janitorial Services', 'Supply Chain Logistics']
  }
]

export default function ServicesPage() {
  return (
    <main style={{ background: 'var(--color-ink)' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-services.png" alt="Our Services" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.5) 100%)' }} />
        </div>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="section-label"><span className="brand-line" />Solutions</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Service <span className="text-gradient">Segments</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>
              Tailored culinary and logistics excellence for every sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE LISTING ──────────────────────────── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container-xl">
          {serviceDetails.map((svc, i) => (
            <motion.div 
              key={svc.id}
              id={svc.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '5rem', 
                alignItems: 'center',
                padding: '6rem 0',
                borderBottom: i !== serviceDetails.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <svc.icon style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 600, color: 'white', marginBottom: '1.5rem' }}>
                  {svc.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem' }}>
                  {svc.desc}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {svc.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--color-brand-green)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '3rem' }}>
                  <Link href="/contact" className="btn-brand">
                    Inquire Now <ArrowRight style={{ width: 16, height: 16, marginLeft: 8 }} />
                  </Link>
                </div>
              </div>

              <div style={{ order: i % 2 === 0 ? 2 : 1, position: 'relative', height: 450, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <Image src={svc.img} alt={svc.title} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(13,13,13,0.4), transparent)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUALITY ASSURANCE ────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface)', textAlign: 'center' }}>
        <div className="container-xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '1.5rem' }}>
              ISO-Certified Standards
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 700, margin: '0 auto 3rem', lineHeight: 1.8 }}>
              Every meal we serve and every facility we manage adheres to the highest international standards for safety, environment, and quality.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['ISO 22000', 'ISO 14001', 'ISO 45001'].map(iso => (
                <div key={iso} style={{ padding: '1rem 2rem', border: '1px solid rgba(103,186,103,0.3)', color: 'var(--color-brand-green)', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {iso}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container-xl">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '2rem' }}>
            Elevate Your Operations
          </h2>
          <Link href="/contact" className="btn-brand">Get A Tailored Proposal</Link>
        </div>
      </section>
    </main>
  )
}
