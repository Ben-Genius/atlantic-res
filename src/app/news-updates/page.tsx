'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import CtaSection from '@/components/home/CtaSection'
import NewsHeader from '@/components/news/NewsHeader'
import NewsHero from '@/components/news/NewsHero'
import NewsShowcase from '@/components/news/NewsShowcase'
import NewsImageExpansion from '@/components/news/NewsImageExpansion'
import NewsFeature from '@/components/news/NewsFeature'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}

const posts = [
  {
    id: 'awards',
    title: 'Atlantic Catering & Logistics Wins at Ghana Business Awards',
    date: 'Oct 24, 2023',
    desc: 'Recognition of our commitment to excellence and operational safety in the hospitality sector.',
    img: '/images/hero-news.png',
    category: 'Awards'
  },
  {
    id: 'quality',
    title: 'Achieving ISO 22000:2018 Recertification',
    date: 'Sep 12, 2023',
    desc: 'Maintaining the highest international standards for food safety management across all our sites.',
    img: '/images/hero-expertise.png',
    category: 'Quality'
  },
  {
    id: 'impact',
    title: 'Empowering Local Farmers: A Sustainability Story',
    date: 'Aug 05, 2023',
    desc: 'How our "Ghana First" policy is transforming rural communities through direct sourcing.',
    img: '/images/hero-impact.png',
    category: 'Impact'
  }
]

const parseDate = (s: string) => {
  const d = new Date(s)
  return d.toISOString().split('T')[0]
}

export default function NewsPage() {
  const articleSchemas = posts.map((post) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.desc,
    image: `https://atlanticcatering-gh.com${post.img}`,
    datePublished: parseDate(post.date),
    author: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
    },
  }))

  return (
    <>
      {articleSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <NewsHeader />

      <main style={{ background: '#f4f4f1' }}>
        {/* The hero is pinned only for as long as the showcase card slides
            over it; the band scopes that stickiness so later sections stack
            normally. */}
        <div style={{ position: 'relative' }}>
          <NewsHero />
          <NewsShowcase />
        </div>

        <NewsImageExpansion />

        <NewsFeature />

        {/* ── FEED ─────────────────────────────────────── */}
        <section id="latest" style={{ padding: '7rem 0 10rem', background: '#ffffff' }}>
          <div className="container-xl">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '3.5rem' }}>
              <div className="section-label"><span className="brand-line" />Latest</div>
              <span style={{ color: 'rgba(26,26,26,0.35)', fontSize: '0.8rem', fontWeight: 600 }}>{posts.length} stories</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem' }}>
              {posts.map((post, i) => (
                <motion.article
                  key={post.title}
                  id={post.id}
                  variants={fadeUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  style={{ cursor: 'pointer', scrollMarginTop: '120px' }}
                >
                  <div style={{ position: 'relative', height: 280, overflow: 'hidden', marginBottom: '2rem', borderRadius: 12, border: '1px solid var(--color-border)' }}>
                    <Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--color-brand-green)', color: '#ffffff', padding: '5px 12px', borderRadius: 999, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{post.category}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-brand-green-dark)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                    <Calendar style={{ width: 14, height: 14 }} />
                    {post.date}
                  </div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#0d0d0d', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ color: 'rgba(26,26,26,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>{post.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0d0d0d', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Read Article <ArrowRight style={{ width: 16, height: 16, color: 'var(--color-brand-green)' }} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────── */}
        <section id="newsletter" style={{ padding: '8rem 0', background: 'var(--color-surface)', textAlign: 'center', scrollMarginTop: '100px' }}>
          <div className="container-xl" style={{ maxWidth: 600 }}>
            <Tag style={{ width: 32, height: 32, color: 'var(--color-brand-green)', margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#0d0d0d', marginBottom: '1rem' }}>Stay Updated</h2>
            <p style={{ color: 'rgba(26,26,26,0.6)', marginBottom: '2.5rem' }}>Subscribe to our newsletter for the latest insights in hospitality and logistics.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="email" placeholder="Your email address" aria-label="Your email address" style={{ flex: 1, background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: 8, padding: '1rem', color: '#0d0d0d', outline: 'none' }} />
              <button className="btn-brand">Subscribe</button>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
    </>
  )
}
