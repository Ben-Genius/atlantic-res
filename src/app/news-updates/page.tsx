'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Tag } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

const posts = [
  {
    title: 'Atlantic Catering & Logistics Wins at Ghana Business Awards',
    date: 'Oct 24, 2023',
    desc: 'Recognition of our commitment to excellence and operational safety in the hospitality sector.',
    img: '/images/hero-news.png',
    category: 'Awards'
  },
  {
    title: 'Achieving ISO 22000:2018 Recertification',
    date: 'Sep 12, 2023',
    desc: 'Maintaining the highest international standards for food safety management across all our sites.',
    img: '/images/hero-expertise.png',
    category: 'Quality'
  },
  {
    title: 'Empowering Local Farmers: A Sustainability Story',
    date: 'Aug 05, 2023',
    desc: 'How our "Ghana First" policy is transforming rural communities through direct sourcing.',
    img: '/images/hero-impact.png',
    category: 'Impact'
  }
]

export default function NewsPage() {
  return (
    <main style={{ background: 'var(--color-ink)' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/hero-news.png" alt="News & Updates" fill style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.8) 0%, rgba(13,13,13,1) 100%)' }} />
        </div>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="section-label"><span className="brand-line" />Journal</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 600, color: 'white' }}>
              News & <span className="text-gradient">Updates</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── FEED ─────────────────────────────────────── */}
      <section style={{ padding: '6rem 0 10rem' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            {posts.map((post, i) => (
              <motion.article 
                key={post.title}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', height: 280, overflow: 'hidden', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
                  <Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--color-brand-green)', color: 'var(--color-ink)', padding: '4px 12px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>{post.category}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brand-green)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                  <Calendar style={{ width: 14, height: 14 }} />
                  {post.date}
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'white', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>{post.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Read Article <ArrowRight style={{ width: 16, height: 16, color: 'var(--color-brand-green)' }} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────── */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface)', textAlign: 'center' }}>
        <div className="container-xl" style={{ maxWidth: 600 }}>
          <Tag style={{ width: 32, height: 32, color: 'var(--color-brand-green)', margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Stay Updated</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem' }}>Subscribe to our newsletter for the latest insights in hospitality and logistics.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '1rem', color: 'white', outline: 'none' }} />
            <button className="btn-brand">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  )
}
