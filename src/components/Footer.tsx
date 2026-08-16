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
  const [footerHeight, setFooterHeight] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) setFooterHeight(wrapperRef.current.offsetHeight)
      setIsLargeScreen(window.innerWidth >= 1024)
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

    if (isLargeScreen) {
      gsap.fromTo(
        footerRef.current,
        { yPercent: -15 },
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
    } else {
      gsap.set(footerRef.current, { yPercent: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })

    tl.from('.brand-element', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    })
    .from('.col-header', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.footer-link', {
      opacity: 0,
      x: -15,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
    }, '-=0.4')
    .from('.accent-line', {
      scaleX: 0,
      opacity: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'expo.inOut',
    }, '-=0.3')
    .from('.bottom-bar-element', {
      opacity: 0,
      y: 15,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.6')

  }, { scope: wrapperRef, dependencies: [isLargeScreen] })

  return (
    <>
      {/* Spacer to create scroll room for the fixed footer reveal */}
      {isLargeScreen && (
        <div style={{ height: footerHeight, width: '100%', pointerEvents: 'none', background: 'transparent' }} />
      )}

      {/* Fixed reveal container — sits behind page content */}
      <div
        ref={wrapperRef}
        style={isLargeScreen ? {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -50,
          width: '100%',
          willChange: 'transform',
        } : {
          position: 'relative',
          width: '100%',
          zIndex: 1,
        }}
      >
        <footer
          ref={footerRef}
          style={{
            backgroundImage: "url('/assets/images/footer.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#1a1a1a',
            fontFamily: 'DM Sans, Inter, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(102,204,51,0.2)',
          }}
        >
          {/* Overlay to ensure text legibility on the pattern */}
          <div className="absolute inset-0 bg-white/50 pointer-events-none" style={{ zIndex: 0 }} />

          {/* Subtle ambient tint */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: '45vw', height: '5vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(103,186,103,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />


          {/* ── Main footer grid ────────────────────── */}
          <div className="container-xl relative z-10" style={{ padding: '4rem 2rem 3.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>

              {/* Brand column */}
              <div>
                <Link href="/" className="brand-element" style={{ display: 'inline-block', marginBottom: '1.75rem', textDecoration: 'none' }}>
                  <Image
                    src="/images/logo.png"
                    alt="Atlantic Catering & Logistics"
                    width={130}
                    height={52}
                    style={{ maxWidth: 130 }}
                  />
                </Link>
                <p className="brand-element" style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.85)', lineHeight: 1.85, maxWidth: 260, marginBottom: '1.95rem', fontWeight: 500 }}>
                  Wholly Ghanaian. ISO-certified. Premium culinary and logistics excellence for offshore, corporate, and event operations since 2014.
                </p>

                <div className="brand-element" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  {['GC 100', 'ISO Cert.', 'FPSO Ops'].map(tag => (
                    <span key={tag} style={{
                      padding: '0.3rem 0.7rem',
                      border: '1px solid rgba(26,26,26,0.2)',
                      color: '#1a1a1a',
                      fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="brand-element" style={{ display: 'flex', gap: '0.65rem' }}>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label} href={href} aria-label={label}
                      style={{
                        width: '2.1rem', height: '2.1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(26,26,26,0.2)', borderRadius: '50%',
                        color: 'rgba(26,26,26,0.85)', textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#66cc33'
                        e.currentTarget.style.borderColor = '#66cc33'
                        e.currentTarget.style.color = '#ffffff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(26,26,26,0.2)'
                        e.currentTarget.style.color = 'rgba(26,26,26,0.85)'
                      }}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Services column */}
              <div>
                <h4 className="col-header" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '1.5rem' }}>
                  Services
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {services.map(item => (
                    <li key={item.href} className="footer-link">
                      <Link
                        href={item.href}
                        style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(26,26,26,0.85)', textDecoration: 'none', transition: 'color 0.25s', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#cc9933' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.85)' }}
                      >
                        <span style={{ display: 'inline-block', width: 14, height: 1, background: 'rgba(26,26,26,0.3)', flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company column */}
              <div>
                <h4 className="col-header" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '1.5rem' }}>
                  Company
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {company.map(item => (
                    <li key={item.href} className="footer-link">
                      <Link
                        href={item.href}
                        style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(26,26,26,0.85)', textDecoration: 'none', transition: 'color 0.25s', display: 'flex', alignItems: 'center', gap: 6 }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#cc9933' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.85)' }}
                      >
                        <span style={{ display: 'inline-block', width: 14, height: 1, background: 'rgba(26,26,26,0.3)', flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact column */}
              <div>
                <h4 className="col-header" style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '1.5rem' }}>
                  Contact
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {contactItems.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label} href={href} className="footer-link"
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                        textDecoration: 'none', color: 'rgba(26,26,26,0.85)', fontWeight: 500,
                        fontSize: '0.875rem', lineHeight: 1.55, transition: 'color 0.25s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#cc9933' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.85)' }}
                    >
                      <Icon size={14} style={{ color: '#1a1a1a', marginTop: 3, flexShrink: 0 }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thin accent line */}
          <div className="accent-line relative z-10" style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(26,26,26,0.15) 30%, rgba(26,26,26,0.15) 70%, transparent 100%)',
            margin: '0 2rem',
          }} />

          {/* Bottom bar */}
          <div className="container-xl relative z-10" style={{ padding: '1.5rem 2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <p className="bottom-bar-element" style={{ fontSize: '0.72rem', color: 'rgba(26,26,26,0.7)', letterSpacing: '0.04em', fontWeight: 500 }}>
                © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
              </p>
              <div className="bottom-bar-element" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                {['Privacy Policy', 'Terms of Service', 'ISO Certificate'].map(label => (
                  <Link
                    key={label} href="#"
                    style={{ fontSize: '0.72rem', color: 'rgba(26,26,26,0.7)', fontWeight: 500, textDecoration: 'none', transition: 'color 0.25s', letterSpacing: '0.04em' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,26,0.7)' }}
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