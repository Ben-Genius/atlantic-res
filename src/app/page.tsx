'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star, ChevronDown, Shield, Leaf, Award } from 'lucide-react'

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
    <main style={{ background: 'var(--color-ink)' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* BG Image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-main.png" alt="Atlantic Catering premium service" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.65) 55%, rgba(13,13,13,0.3) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(13,13,13,0.8) 0%, transparent 40%)' }} />
        </div>

        {/* Content */}
        <div className="container-xl" style={{ position: 'relative', zIndex: 2, paddingTop: '7rem', paddingBottom: '6rem' }}>
          <div style={{ maxWidth: 760 }}>
            <motion.div
              className="section-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="brand-line" />
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
              <span className="text-gradient">Excellence</span><br />
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
              <Link href="/expertise" className="btn-ghost">
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown style={{ width: 18, height: 18 }} />
        </motion.div>
      </section>

      {/* ── STATS BAND ───────────────────────────────── */}
      <section style={{ background: 'var(--color-brand-green)', padding: '1.75rem 0' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {stats.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center', borderRight: '1px solid rgba(0,0,0,0.1)', padding: '0 1rem' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, color: '#0d0d0d', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-ink)' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="section-label">
                <span className="brand-line" />
                About Atlantic
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white', lineHeight: 1.05, marginBottom: '1.75rem' }}>
                A Ghanaian Legacy<br />of Culinary Pride
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Atlantic Catering and Logistics Limited is a wholly-owned Ghanaian professional corporate catering company established in 2014. We specialize in onshore and offshore catering, camp management, ship and store supplies, laundry, housekeeping, and janitorial services.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
                Our service model is built for complex environments where reliability, quality, and compliance matter most — including operations aboard two FPSOs in Ghana's oil and gas sector.
              </p>
              <Link href="/expertise" className="btn-brand">
                Our Expertise
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
            </motion.div>

            {/* Values cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)' }}>
              {values.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="value-card"
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '2rem',
                    background: 'var(--color-surface-2)',
                    transition: 'background 0.3s',
                  }}
                >
                  <div style={{ width: 44, height: 44, background: 'var(--color-brand-green-dim)', border: '1px solid rgba(103,186,103,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 20, height: 20, color: 'var(--color-brand-green)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '0.4rem' }}>{title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section id="services" style={{ padding: '8rem 0', background: 'var(--color-surface)' }}>
        <div className="container-xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}
          >
            <div>
              <div className="section-label"><span className="brand-line" />What We Do</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white', lineHeight: 1.05 }}>
                Our Service<br />Segments
              </h2>
            </div>
            <Link href="/services" className="btn-ghost">
              All Services <ArrowUpRight style={{ width: 16, height: 16 }} />
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--color-border)' }}>
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
                    className="card-dark service-card-inner"
                    style={{ height: '100%', overflow: 'hidden', background: 'var(--color-surface-2)', cursor: 'pointer' }}
                  >
                    {svc.img && (
                      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                        <Image src={svc.img} alt={svc.title} fill style={{ objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(24,24,24,0.9) 100%)' }} />
                      </div>
                    )}
                    <div style={{ padding: '2rem' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--color-brand-green)', marginBottom: '0.75rem' }}>{svc.tag}</div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '0.75rem', lineHeight: 1.2 }}>{svc.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{svc.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '1.5rem', color: 'var(--color-brand-green)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
      <section style={{ padding: '8rem 0', background: 'var(--color-ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(103,186,103,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container-xl" style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span className="brand-line" />Our Mission</div>
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 500, color: 'white', lineHeight: 1.3, fontStyle: 'italic', marginBottom: '2.5rem' }}>
              "Deliver quality, healthy, nutritious, and hygienically prepared meals with excellence to every client and partner."
            </blockquote>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--color-brand-green), transparent)', marginBottom: '2.5rem' }} />
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Maud Lindsay-Gamrat — Chief Executive Officer
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface)' }}>
        <div className="container-xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
            <div className="section-label"><span className="brand-line" />Client Feedback</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white', lineHeight: 1.05 }}>
              What Our Clients Say
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--color-border)' }}>
            {testimonials.map(({ quote, author, role }, i) => (
              <motion.div
                key={author}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ background: 'var(--color-surface-2)', padding: '2.5rem' }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} style={{ width: 14, height: 14, fill: 'var(--color-brand-orange)', color: 'var(--color-brand-orange)' }} />
                  ))}
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 500, color: 'white', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem' }}>
                  "{quote}"
                </p>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{author}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-brand-green)', marginTop: 2, letterSpacing: '0.05em' }}>{role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-ink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(103,186,103,0.08) 0%, transparent 50%)' }} />
        <div className="container-xl" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="section-label"><span className="brand-line" />Get Started</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Ready to Elevate<br />Your Operations?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '1rem', maxWidth: 420 }}>
              Let's create something exceptional together. Contact our team to discuss your specific needs and how Atlantic can serve you.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} custom={0.15} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '3rem' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'white', marginBottom: '0.75rem' }}>Start a conversation</div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Reach out via phone, email, or our contact form. We respond within 24 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/contact" className="btn-brand" style={{ justifyContent: 'center', textAlign: 'center' }}>
                  Get In Touch <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
                <a href="tel:+233501502441" className="btn-ghost" style={{ justifyContent: 'center', textAlign: 'center' }}>
                  Call +233 501 502 441
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
