'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star, ChevronDown, Shield, Leaf, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

const stats = [
  { value: '10+', label: 'Years Operating' },
  { value: '2', label: 'FPSOs Served' },
  { value: 'ISO', label: 'Certified Quality' },
  { value: '#1', label: 'Hospitality GC100' },
]

const services = [
  {
    tag: '01',
    title: 'Offshore Operations',
    desc: 'Premium nutrition and morale for FPSOs, remote sites, vessels and camp operations. Specialized logistics for the most demanding environments.',
    img: '/images/service-offshore.png',
    href: '/services#offshore',
  },
  {
    tag: '02',
    title: 'Corporate Catering',
    desc: 'Elevate daily corporate dining. Executive catering, board meetings, and large-scale staff feeding for leading companies across Ghana.',
    img: '/images/service-corporate.png',
    href: '/services#corporate',
  },
  {
    tag: '03',
    title: 'Event Management',
    desc: 'Unforgettable culinary moments. Bespoke menus and full coordination for galas, conferences, and private functions.',
    href: '/services#events',
  },
  {
    tag: '04',
    title: 'Institutional Services',
    desc: 'Comprehensive facilities management including housekeeping, laundry, and janitorial services at scale.',
    href: '/services#institutional',
  },
]

const testimonials = [
  {
    quote: 'Atlantic Catering has been our partner since 2015. Extremely dedicated, reliable, proficient, and most importantly honest.',
    author: 'Peter S. Sadasivan',
    role: 'Country Manager, SMTC',
  },
  {
    quote: 'Executive leadership is very responsive. First-line managers work assiduously to ensure standards are consistently maintained.',
    author: 'Thomas S. Fergus, III',
    role: 'CEO, CTP',
  },
  {
    quote: 'The quality of meals and professionalism of the team has transformed our workplace culture. Highly recommended.',
    author: 'Sarah Mensah',
    role: 'HR Director',
  },
]

const values = [
  { Icon: Shield, title: 'ISO Certified', desc: 'Rigorous quality and safety standards across every operation.' },
  { Icon: Leaf, title: 'Local First', desc: 'Wholly Ghanaian company committed to local sourcing and supply chains.' },
  { Icon: Award, title: 'Award Winning', desc: 'Recognized #1 in Hospitality & Tourism, Ghana Club 100.' },
]

export default function Home() {



  return (
    <main style={{ background: 'transparent' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-main.png" alt="Atlantic Catering premium service" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.25) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,10,10,0.75) 0%, transparent 40%)' }} />
        </div>

        <div className="container-xl" style={{ position: 'relative', zIndex: 2, paddingTop: '7rem', paddingBottom: '6rem' }}>
          <div style={{ maxWidth: 760 }}>
            <motion.div
              className="section-label"
              style={{ color: '#67BA67' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="brand-line" style={{ background: '#67BA67' }} />
              Est. 2014 · Accra, Ghana
            </motion.div>

            <motion.h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: 'white',
                marginBottom: '2rem',
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              Culinary<br />
              <span style={{
                background: 'linear-gradient(135deg, #67BA67 0%, #F9A825 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Excellence</span><br />
              Delivered.
            </motion.h1>

            <motion.p
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: 520, marginBottom: '2.5rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana and beyond.
            </motion.p>

            <motion.div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/services" className="btn-brand">
                Explore Services
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link href="/expertise" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 31px', background: 'transparent', color: 'rgba(255,255,255,0.85)',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.875rem',
                letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#67BA67'
                  e.currentTarget.style.color = '#67BA67'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                }}>
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown style={{ width: 18, height: 18 }} />
        </motion.div>
      </section>

      {/* ── STATS BAND ───────────────────────────────── */}
      <section style={{ background: '#67BA67', padding: '1.75rem 0' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {stats.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.25)', padding: '0 1rem' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: '#ffffff' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="section-label" style={{ color: '#67BA67' }}>
                <span className="brand-line" style={{ background: '#67BA67' }} />
                About Atlantic
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05, marginBottom: '1.75rem' }}>
                A Ghanaian Legacy<br />of Culinary Pride
              </h2>
              <p style={{ color: 'rgba(26,26,26,0.65)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Atlantic Catering and Logistics Limited is a wholly-owned Ghanaian professional corporate catering company established in 2014. We specialize in onshore and offshore catering, camp management, ship and store supplies, laundry, housekeeping, and janitorial services.
              </p>
              <p style={{ color: 'rgba(26,26,26,0.65)', lineHeight: 1.85, marginBottom: '2.5rem', fontSize: '1rem' }}>
                Our service model is built for complex environments where reliability, quality, and compliance matter most — including operations aboard two FPSOs in Ghana's oil and gas sector.
              </p>
              <Link href="/expertise" className="btn-brand">
                Our Expertise
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(0,0,0,0.07)' }}>
              {values.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '2rem',
                    background: '#fafaf8',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f2f2f0' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#fafaf8' }}
                >
                  <div style={{ width: 44, height: 44, background: 'rgba(103,186,103,0.12)', border: '1px solid rgba(103,186,103,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 20, height: 20, color: '#67BA67' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.4rem' }}>{title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section id="services" style={{ padding: '8rem 0', background: '#f5f5f3' }}>
        <div className="container-xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}
          >
            <div>
              <div className="section-label" style={{ color: '#67BA67' }}>
                <span className="brand-line" style={{ background: '#67BA67' }} />
                What We Do
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05 }}>
                Our Service<br />Segments
              </h2>
            </div>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 31px', background: 'transparent', color: '#1a1a1a',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.875rem',
              letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none',
              border: '1px solid rgba(26,26,26,0.2)', cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#67BA67'
                e.currentTarget.style.color = '#67BA67'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(26,26,26,0.2)'
                e.currentTarget.style.color = '#1a1a1a'
              }}>
              All Services <ArrowUpRight style={{ width: 16, height: 16 }} />
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(0,0,0,0.08)' }}>
            {services.map((svc, i) => (
              <motion.div
                key={svc.tag}
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link href={svc.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div
                    style={{
                      height: '100%', overflow: 'hidden', background: '#ffffff', cursor: 'pointer',
                      border: '1px solid transparent',
                      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = 'rgba(103,186,103,0.3)'
                      el.style.transform = 'translateY(-4px)'
                      el.style.boxShadow = '0 24px 48px rgba(0,0,0,0.08)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = 'transparent'
                      el.style.transform = 'translateY(0)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {svc.img && (
                      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                        <Image src={svc.img} alt={svc.title} fill style={{ objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(255,255,255,0.6) 100%)' }} />
                      </div>
                    )}
                    <div style={{ padding: '2rem' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: '#F9A825', marginBottom: '0.75rem' }}>{svc.tag}</div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.75rem', lineHeight: 1.2 }}>{svc.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', lineHeight: 1.7 }}>{svc.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '1.5rem', color: '#67BA67', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Learn More <ArrowRight style={{ width: 14, height: 14 }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ────────────────────────── */}
      <section style={{ padding: '8rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(103,186,103,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-xl" style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="section-label" style={{ justifyContent: 'center', color: '#67BA67' }}>
              <span className="brand-line" style={{ background: '#67BA67' }} />
              Our Mission
            </div>
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.3, fontStyle: 'italic', marginBottom: '2.5rem' }}>
              "Deliver quality, healthy, nutritious, and hygienically prepared meals with excellence to every client and partner."
            </blockquote>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #67BA67, transparent)', marginBottom: '2.5rem' }} />
            <p style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Maud Lindsay-Gamrat — Chief Executive Officer
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: '#f5f5f3' }}>
        <div className="container-xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
            <div className="section-label" style={{ color: '#67BA67' }}>
              <span className="brand-line" style={{ background: '#67BA67' }} />
              Client Feedback
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05 }}>
              What Our Clients Say
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(0,0,0,0.07)' }}>
            {testimonials.map(({ quote, author, role }, i) => (
              <motion.div
                key={author}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ background: '#ffffff', padding: '2.5rem' }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} style={{ width: 14, height: 14, fill: '#F9A825', color: '#F9A825' }} />
                  ))}
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem' }}>
                  "{quote}"
                </p>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a' }}>{author}</div>
                  <div style={{ fontSize: '0.75rem', color: '#67BA67', marginTop: 2, letterSpacing: '0.05em' }}>{role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(103,186,103,0.05) 0%, transparent 50%)' }} />
        <div className="container-xl" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="section-label" style={{ color: '#67BA67' }}>
              <span className="brand-line" style={{ background: '#67BA67' }} />
              Get Started
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Ready to Elevate<br />Your Operations?
            </h2>
            <p style={{ color: 'rgba(26,26,26,0.6)', lineHeight: 1.85, fontSize: '1rem', maxWidth: 420 }}>
              Let's create something exceptional together. Contact our team to discuss your specific needs and how Atlantic can serve you.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={0.15} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ background: '#f5f5f3', border: '1px solid rgba(0,0,0,0.08)', padding: '3rem' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '0.75rem' }}>Start a conversation</div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Reach out via phone, email, or our contact form. We respond within 24 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/contact" className="btn-brand" style={{ justifyContent: 'center', textAlign: 'center' }}>
                  Get In Touch <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
                <a href="tel:+233501502441" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '13px 31px', background: 'transparent', color: '#1a1a1a',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.875rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none',
                  border: '1px solid rgba(26,26,26,0.2)', cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#67BA67'
                    e.currentTarget.style.color = '#67BA67'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(26,26,26,0.2)'
                    e.currentTarget.style.color = '#1a1a1a'
                  }}>
                  Call +233 501 502 441
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WAVE CURTAIN ─────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          lineHeight: 0,
          marginTop: '-5px',
          /* Upward green glow — makes the wave feel elevated off the page */
          filter: 'drop-shadow(0 18px 8px rgba(3,2,0,0.05))',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1728 226"
          fill="none"
          style={{ width: '100%', height: 'auto', display: 'block', minHeight: 120 }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Footer-color base — eliminates any transparent gaps below the wave curves */}
          <rect width="1728" height="326" fill="none" />
          {/* Green wave shape */}
          <path
            d="M0 0.571289H1728V152.258C1710.36 148.163 1691.87 145.412 1672.95 144.081C1652.32 142.624 1631.57 142.882 1611.28 144.841C1590.33 146.865 1570.23 150.675 1551.54 156.164C1525.01 163.956 1502.16 174.506 1480.07 184.708C1463.28 192.457 1447.42 199.778 1431.71 205.028C1416.75 210.026 1403.88 212.479 1391.21 212.749C1376.52 213.06 1361.31 210.442 1343.33 204.506C1324.48 198.281 1305.58 189.418 1285.57 180.035C1262.5 169.219 1238.65 158.036 1212.33 149.821C1178.79 139.349 1146.91 135.564 1114.87 138.256C1087.72 140.538 1061.82 147.505 1035.7 159.557C1015.18 169.029 997.607 180.11 980.616 190.827C976.992 193.115 973.563 195.273 970.114 197.415C949.904 209.964 911.513 230.188 881.476 224.631C872.258 222.926 863.625 218.695 855.822 212.054C847.614 205.068 840.666 195.705 835.732 184.978C832.463 177.871 829.818 170.427 827.019 162.547C820.351 143.773 813.453 124.36 796.922 105.636C787.969 95.4959 776.432 86.1881 762.63 77.967C749.344 70.0533 734.232 63.31 717.726 57.9265C701.221 52.5431 683.705 48.6499 665.669 46.3493C646.939 43.9618 628.049 43.3502 609.533 44.5331C591.013 45.716 572.722 48.6995 555.162 53.4C538.256 57.9265 522.38 63.9527 507.979 71.3076C493.577 78.6625 480.99 87.1723 470.573 96.598C459.751 106.39 451.503 116.961 446.054 128.017C439.521 141.283 433.051 154.357 430.662 166.999C427.453 184.006 420.678 198.691 408.996 208.375C403.513 212.92 395.345 216.481 385.377 218.673C375.135 220.927 363.743 221.51 353.3 220.321C331.061 217.785 313.556 207.946 299.774 194.006C293.161 187.316 287.642 179.259 281.799 170.731C269.652 153.006 259.89 132.916 230.943 117.79C217.511 110.771 201.94 105.533 184.669 102.221C169.143 99.2432 152.522 97.8772 135.261 98.1597C103.799 98.675 71.3023 104.757 43.7541 115.285C28.7029 121.035 14.3114 128.088 0.219945 136.639L0 0.571289Z"
            fill="#ffffffff"
          />
          {/* Subtle inner highlight along the wave edge — adds depth */}
          <path
            d="M0 0.571289H1728V152.258C1710.36 148.163 1691.87 145.412 1672.95 144.081C1652.32 142.624 1631.57 142.882 1611.28 144.841C1590.33 146.865 1570.23 150.675 1551.54 156.164C1525.01 163.956 1502.16 174.506 1480.07 184.708C1463.28 192.457 1447.42 199.778 1431.71 205.028C1416.75 210.026 1403.88 212.479 1391.21 212.749C1376.52 213.06 1361.31 210.442 1343.33 204.506C1324.48 198.281 1305.58 189.418 1285.57 180.035C1262.5 169.219 1238.65 158.036 1212.33 149.821C1178.79 139.349 1146.91 135.564 1114.87 138.256C1087.72 140.538 1061.82 147.505 1035.7 159.557C1015.18 169.029 997.607 180.11 980.616 190.827C976.992 193.115 973.563 195.273 970.114 197.415C949.904 209.964 911.513 230.188 881.476 224.631C872.258 222.926 863.625 218.695 855.822 212.054C847.614 205.068 840.666 195.705 835.732 184.978C832.463 177.871 829.818 170.427 827.019 162.547C820.351 143.773 813.453 124.36 796.922 105.636C787.969 95.4959 776.432 86.1881 762.63 77.967C749.344 70.0533 734.232 63.31 717.726 57.9265C701.221 52.5431 683.705 48.6499 665.669 46.3493C646.939 43.9618 628.049 43.3502 609.533 44.5331C591.013 45.716 572.722 48.6995 555.162 53.4C538.256 57.9265 522.38 63.9527 507.979 71.3076C493.577 78.6625 480.99 87.1723 470.573 96.598C459.751 106.39 451.503 116.961 446.054 128.017C439.521 141.283 433.051 154.357 430.662 166.999C427.453 184.006 420.678 198.691 408.996 208.375C403.513 212.92 395.345 216.481 385.377 218.673C375.135 220.927 363.743 221.51 353.3 220.321C331.061 217.785 313.556 207.946 299.774 194.006C293.161 187.316 287.642 179.259 281.799 170.731C269.652 153.006 259.89 132.916 230.943 117.79C217.511 110.771 201.94 105.533 184.669 102.221C169.143 99.2432 152.522 97.8772 135.261 98.1597C103.799 98.675 71.3023 104.757 43.7541 115.285C28.7029 121.035 14.3114 128.088 0.219945 136.639L0 0.571289Z"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
          />
        </svg>
      </div>


    </main>
  )
}
