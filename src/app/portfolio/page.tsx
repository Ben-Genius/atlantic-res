'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

const projects = [
  {
    title: 'FPSO Kwame Nkrumah',
    client: 'Oil & Gas Sector',
    desc: 'Full-scale offshore catering and housekeeping services for over 100 crew members on a 24/7 rotation.',
    img: '/images/hero-portfolio.png',
    tag: 'Offshore'
  },
  {
    title: 'FPSO John Evans Atta Mills',
    client: 'Oil & Gas Sector',
    desc: 'Delivering ISO-certified catering excellence in remote marine environments with complex logistics.',
    img: '/images/hero-services.png',
    tag: 'Offshore'
  },
  {
    title: 'Executive Canteen Management',
    client: 'Multinational Bank',
    desc: 'Daily staff feeding and executive boardroom service for over 500 corporate employees in Accra.',
    img: '/images/service-corporate.png',
    tag: 'Corporate'
  },
  {
    title: 'International Mining Forum',
    client: 'Ministry of Lands & Natural Resources',
    desc: 'High-level event catering for over 1,000 delegates, including state officials and international guests.',
    img: '/images/hero-expertise.png',
    tag: 'Events'
  }
]

export default function PortfolioPage() {
  return (
    <main style={{ background: 'var(--color-ink)' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-portfolio.png" alt="Our Portfolio" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.8) 0%, rgba(13,13,13,1) 100%)' }} />
        </div>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="section-label"><span className="brand-line" />Work</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: 'white' }}>
              Operational <span className="text-gradient">Impact</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600, marginTop: '1rem' }}>
              A proven track record of excellence across offshore, corporate, and event sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS GRID ────────────────────────────── */}
      <section style={{ padding: '6rem 0 10rem' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {projects.map((p, i) => (
              <motion.div 
                key={p.title}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="portfolio-card"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--color-brand-green)', color: 'var(--color-ink)', padding: '4px 12px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.tag}</div>
                </div>
                <div style={{ padding: '2.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand-green)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{p.client}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'white', marginBottom: '1rem' }}>{p.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>{p.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
                    View Case Study <ExternalLink style={{ width: 14, height: 14, color: 'var(--color-brand-green)' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS PLACEHOLDER ────────────────── */}
      <section style={{ padding: '6rem 0', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container-xl" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}><span className="brand-line" />Trusted By</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', opacity: 0.5, filter: 'grayscale(1)', marginTop: '3rem' }}>
             {/* Replace with actual logos later */}
             {['ENI', 'Tullow', 'MODEC', 'Absa', 'GC100'].map(logo => (
               <div key={logo} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', fontFamily: 'Cormorant Garamond, serif' }}>{logo}</div>
             ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container-xl">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '2.5rem' }}>
            Ready to add your success story?
          </h2>
          <Link href="/contact" className="btn-brand">Get In Touch</Link>
        </div>
      </section>
    </main>
  )
}
