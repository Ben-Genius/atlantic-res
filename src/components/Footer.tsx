'use client'

import Link from 'next/link'
import Image from 'next/image'
import { companyInfo } from '@/lib/constants'
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { label: 'Offshore Operations', href: '/services#offshore' },
  { label: 'Corporate Catering', href: '/services#corporate' },
  { label: 'Event Management', href: '/services#events' },
  { label: 'Institutional Services', href: '/services#institutional' },
]

const company = [
  { label: 'Our Expertise', href: '/expertise' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Impact', href: '/impact' },
  { label: 'News & Updates', href: '/news-updates' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

const contactItems = [
  { icon: Phone, label: companyInfo.phone, href: `tel:${companyInfo.phone}` },
  { icon: Mail, label: companyInfo.email, href: `mailto:${companyInfo.email}` },
  { icon: MapPin, label: companyInfo.address, href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const colRefs = useRef<HTMLDivElement[]>([])
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) setFooterHeight(wrapperRef.current.offsetHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  useGSAP(() => {
    if (!wrapperRef.current || !footerRef.current) return

    gsap.fromTo(
      footerRef.current,
      { yPercent: -10 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    )

    if (colRefs.current.length > 0) {
      gsap.fromTo(
        colRefs.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, { scope: wrapperRef })

  return (
    <>
      {/* Spacer to create scroll room for the fixed footer reveal */}
      <div style={{ height: footerHeight, width: '100%', pointerEvents: 'none', background: 'transparent' }} />

      {/* Fixed reveal container — sits behind page content */}
      <div
        ref={wrapperRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -50,
          width: '100%',
          willChange: 'transform',
        }}
      >
        <footer
          ref={footerRef}
          style={{
            background: '#ffffffff',
            color: '#1a1a1a',
            fontFamily: 'DM Sans, Inter, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(103,186,103,0.2)',
          }}
        >
          {/* Subtle ambient tint */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: '45vw', height: '5vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103,186,103,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />


          {/* ── Main footer grid ────────────────────── */}
          <div className="container-xl" style={{ padding: '4rem 2rem 3.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>

              {/* Brand column */}
              <div ref={el => { if (el) colRefs.current[1] = el }}>
                <Link href="/" style={{ display: 'inline-block', marginBottom: '1.75rem', textDecoration: 'none' }}>
                  <Image
                    src="/images/logo.png"
                    alt="Atlantic Catering & Logistics"
                    width={130}
                    height={52}
                    style={{ height: 'auto', width: 'auto', maxWidth: 130 }}
                  />
                </Link>
                <p style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', lineHeight: 1.85, maxWidth: 260, marginBottom: '1.75rem' }}>
                  Wholly Ghanaian. ISO-certified. Premium culinary and logistics excellence for offshore, corporate, and event operations since 2014.
                </p>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  {['GC 100', 'ISO Cert.', 'FPSO Ops'].map(tag => (
                    <span key={tag} style={{
                      padding: '0.3rem 0.7rem',
                      border: '1px solid rgba(103,186,103,0.4)',
                      color: '#67BA67',
                      fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label} href={href} aria-label={label}
                      style={{
                        width: '2.1rem', height: '2.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(103,186,103,0.3)', borderRadius: '50%',
                        color: 'rgba(26,26,26,0.5)', textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#67BA67'
                        e.currentTarget.style.borderColor = '#67BA67'
                        e.currentTarget.style.color = '#ffffff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(103,186,103,0.3)'
                        e.currentTarget.style.color = 'rgba(26,26,26,0.5)'
                      }}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Services column */}
              <div ref={el => { if (el) colRefs.current[2] = el }}>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#67BA67', marginBottom: '1.5rem' }}>
                  Services
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {services.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', textDecoration: 'none', transition: 'color 0.25s', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.55)' }}
                      >
                        <span style={{ display: 'inline-block', width: 14, height: 1, background: 'rgba(103,186,103,0.5)', flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company column */}
              <div ref={el => { if (el) colRefs.current[3] = el }}>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#67BA67', marginBottom: '1.5rem' }}>
                  Company
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {company.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', textDecoration: 'none', transition: 'color 0.25s', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.55)' }}
                      >
                        <span style={{ display: 'inline-block', width: 14, height: 1, background: 'rgba(249,168,37,0.5)', flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact column */}
              <div ref={el => { if (el) colRefs.current[4] = el }}>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#67BA67', marginBottom: '1.5rem' }}>
                  Contact
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {contactItems.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label} href={href}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                        textDecoration: 'none', color: 'rgba(26,26,26,0.55)',
                        fontSize: '0.875rem', lineHeight: 1.55, transition: 'color 0.25s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.55)' }}
                    >
                      <Icon size={14} style={{ color: '#67BA67', marginTop: 3, flexShrink: 0 }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thin accent line */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(103,186,103,0.3) 30%, rgba(249,168,37,0.25) 70%, transparent 100%)',
            margin: '0 2rem',
          }} />

          {/* Bottom bar */}
          <div className="container-xl" style={{ padding: '1.5rem 2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'rgba(26,26,26,0.35)', letterSpacing: '0.04em' }}>
                © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
              </p>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {['Privacy Policy', 'Terms of Service', 'ISO Certificate'].map(label => (
                  <Link
                    key={label} href="#"
                    style={{ fontSize: '0.72rem', color: 'rgba(26,26,26,0.35)', textDecoration: 'none', transition: 'color 0.25s', letterSpacing: '0.04em' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#67BA67' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.35)' }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}