'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Shield, CheckCircle2, ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

const stats = [
  { value: '24+', label: 'CEO Expertise Years' },
  { value: '3', label: 'ISO Certifications' },
  { value: '100%', label: 'Safety Compliance' },
]

const team = [
  {
    name: 'Hubert Tossou',
    role: 'Operations Director',
    desc: '15+ years optimizing catering operations across Africa.',
    icon: Users,
  },
  {
    name: 'John Ansah',
    role: 'Quality & Remote Site Director',
    desc: 'Specialist in offshore logistics and complex site management.',
    icon: Shield,
  },
  {
    name: 'Jemima Tagoe',
    role: 'QHSE Manager',
    desc: 'Guardian of our ISO standards and safety excellence.',
    icon: Award,
  },
  {
    name: 'Freda Opoku',
    role: 'Administration Manager',
    desc: 'Ensuring seamless support for every client operation.',
    icon: TrendingUp,
  },
]

export default function ExpertisePage() {
  return (
    <main style={{ background: 'var(--color-ink)' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-expertise.png" alt="Our Expertise" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.4) 50%, rgba(13,13,13,0.9) 100%)' }} />
        </div>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="section-label"><span className="brand-line" />Our Heritage</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: 'white', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Built on <span className="text-gradient">Excellence</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>
              A decade of operational mastery in the most demanding environments across Ghana and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="section-label"><span className="brand-line" />Atlantic's Story</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 600, color: 'white', lineHeight: 1.1, marginBottom: '2rem' }}>
                From Vision to<br />Industry Leadership
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Established in 2014, Atlantic Catering & Logistics was born from a simple vision: to bring premium culinary excellence to every operation, no matter how remote or challenging.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Today, we serve major clients in the oil and gas sector, including operations on two FPSOs, delivering ISO-certified confidence day in and day out.
              </p>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {stats.map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-brand-green)' }}>{s.value}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeUp} 
              custom={0.2}
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }}
              style={{ position: 'relative', height: 500, border: '1px solid var(--color-border)', padding: '1px' }}
            >
              <Image src="/images/hero-main.png" alt="Operations" fill style={{ objectFit: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(103,186,103,0.1), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', padding: '2rem', background: 'rgba(13,13,13,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'white', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "We don't just serve meals—we nourish the people building tomorrow."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface)' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span className="brand-line" />Our Philosophy</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white' }}>
              Nourish & Inspire
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2px', background: 'var(--color-border)' }}>
            {[
              { t: 'Science Meets Artistry', d: 'We combine nutritional science with culinary creativity to boost energy and productivity.' },
              { t: 'Freshness First', d: 'Direct relationships with local farmers ensure quality and support the communities we serve.' },
              { t: 'Consistency', d: 'Rigorous standards maintained every single day, without compromise.' },
              { t: 'Beyond Dining', d: 'Creating moments of pause and connection in demanding environments.' }
            ].map((p, i) => (
              <motion.div 
                key={p.t}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ background: 'var(--color-surface-2)', padding: '3rem' }}
              >
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>{p.t}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ───────────────────────────────── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container-xl">
          <div className="section-label"><span className="brand-line" />Our Team</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white', marginBottom: '4rem' }}>
            Meet the Leadership
          </h2>

          {/* CEO */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', background: 'var(--color-surface-2)', padding: '3rem', border: '1px solid var(--color-border)', marginBottom: '4rem' }}
          >
            <div style={{ position: 'relative', height: 400, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '8rem', color: 'var(--color-brand-green)', opacity: 0.3 }}>ML</span>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-brand-green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Chief Executive Officer</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}>Maud Lindsay-Gamrat</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Visionary leader with 24+ years in catering and hospitality operations across Africa. Her expertise spans inflight services, offshore operations, and institutional dining.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>Ghana Women of the Year</span>
                <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>Forty Under 40 Award</span>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {team.map((t, i) => (
              <motion.div 
                key={t.name}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ background: 'var(--color-surface-2)', padding: '2.5rem', border: '1px solid var(--color-border)' }}
              >
                <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <t.icon style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                </div>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>{t.name}</h4>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand-green)', textTransform: 'uppercase', marginBottom: '1rem' }}>{t.role}</div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY ─────────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface)' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><span className="brand-line" />Compliance</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: 'white' }}>
              Quality & Certifications
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { id: '22000', title: 'Food Safety', desc: 'ISO 22000 certified. International standards for hygiene and safety.' },
              { id: '14001', title: 'Environment', desc: 'ISO 14001 certified. Commitment to sustainable operations.' },
              { id: '45001', title: 'Occupational Health', desc: 'ISO 45001 certified. Highest standards for workplace safety.' }
            ].map((c, i) => (
              <motion.div 
                key={c.id}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ border: '1px solid var(--color-border)', padding: '2.5rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-brand-green)', marginBottom: '1rem' }}>ISO {c.id}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'white', marginBottom: '1rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container-xl">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: '2.5rem' }}>
            Ready to Partner with Experts?
          </h2>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/contact" className="btn-brand">Get In Touch</Link>
            <Link href="/services" className="btn-ghost">Our Services</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
