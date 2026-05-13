'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { companyInfo } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

export default function ContactPage() {
  return (
    <main style={{ background: 'var(--color-ink)' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-contact.png" alt="Contact Us" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.95) 100%)' }} />
        </div>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="section-label"><span className="brand-line" />Connect</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: 'white' }}>
              Get In <span className="text-gradient">Touch</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT GRID ────────────────────────────── */}
      <section style={{ padding: '6rem 0 10rem' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem' }}>
            {/* Form */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'white', marginBottom: '2.5rem' }}>
                Send us a message
              </h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brand-green)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Name</label>
                    <input type="text" placeholder="John Doe" style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brand-green)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email</label>
                    <input type="email" placeholder="john@example.com" style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '1rem', color: 'white', outline: 'none' }} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brand-green)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Subject</label>
                  <select style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '1rem', color: 'white', outline: 'none' }}>
                    <option>Offshore Catering</option>
                    <option>Corporate Catering</option>
                    <option>Event Management</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brand-green)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Message</label>
                  <textarea rows={6} placeholder="How can we help you?" style={{ width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '1rem', color: 'white', outline: 'none', resize: 'none' }}></textarea>
                </div>
                <button type="submit" className="btn-brand" style={{ justifyContent: 'center' }}>
                  Send Message <Send style={{ width: 16, height: 16, marginLeft: 8 }} />
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeUp} custom={0.2} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'white', marginBottom: '2.5rem' }}>
                Contact Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Our Office</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{companyInfo.address}</p>
                    <p style={{ color: 'var(--color-brand-green)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.5rem' }}>Digital Address: {companyInfo.digitalAddress}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Phone</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{companyInfo.phone}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Email</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{companyInfo.email}</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{companyInfo.salesEmail}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: 50, height: 50, background: 'var(--color-brand-green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock style={{ color: 'var(--color-brand-green)', width: 24, height: 24 }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Working Hours</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ─────────────────────────── */}
      <section style={{ height: '500px', background: 'var(--color-surface)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'url("/images/hero-contact.png")', backgroundSize: 'cover' }}></div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', background: 'rgba(13,13,13,0.8)', padding: '2rem 4rem', border: '1px solid var(--color-brand-green)' }}>
             <p style={{ color: 'white', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>Google Maps Integration</p>
             <p style={{ color: 'var(--color-brand-green)', fontSize: '0.8rem' }}>GA-374-2184, East Legon, Accra</p>
          </div>
        </div>
      </section>
    </main>
  )
}
