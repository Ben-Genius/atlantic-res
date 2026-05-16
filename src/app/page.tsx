'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ArrowRight, ArrowUpRight, Star, ChevronDown, Shield, Leaf, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/lib/constants';
import { cn } from '@/lib/utils';
gsap.registerPlugin(ScrollTrigger, TextPlugin)

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 } }),
}
const floatingItems = [
  { img: '/assets/images/cutouts/dish1.png', top: '38%', left: '13%', size: 'max-w-[240px] md:max-w-[340px]', rotation: '-18deg', scale: 1.05, blur: 0, floatDelay: '0.2s' },
  { img: '/assets/images/cutouts/dish4.png', top: '74%', left: '20%', size: 'max-w-[200px] md:max-w-[280px]', rotation: '-7deg', scale: 1.0, blur: 0, floatDelay: '0.9s' },
  { img: '/assets/images/cutouts/dish2.png', top: '36%', left: '87%', size: 'max-w-[250px] md:max-w-[350px]', rotation: '22deg', scale: 1.1, blur: 0, floatDelay: '0s' },
  { img: '/assets/images/cutouts/dish5.png', top: '76%', left: '81%', size: 'max-w-[210px] md:max-w-[290px]', rotation: '28deg', scale: 1.0, blur: 0, floatDelay: '0.7s' },
  { img: '/assets/images/cutouts/dish3.png', top: '11%', left: '28%', size: 'max-w-[180px] md:max-w-[240px]', rotation: '-28deg', scale: 0.9, blur: 1, floatDelay: '0.5s' },
  { img: '/assets/images/cutouts/dish6.png', top: '9%', left: '72%', size: 'max-w-[160px] md:max-w-[220px]', rotation: '13deg', scale: 0.85, blur: 1.5, floatDelay: '1.1s' },
  { img: '/assets/images/cutouts/dish7.png', top: '6%', left: '50%', size: 'max-w-[150px] md:max-w-[190px]', rotation: '6deg', scale: 0.8, blur: 2, floatDelay: '0.8s' },
];

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
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    const phrases = [
      "EXPERIENCES",
      "CATERING",
      "LOGISTICS",
      "HOSPITALITY"
    ];

    if (textRef.current) {
      // @ts-ignore - set initial text
      textRef.current.innerText = phrases[0];
    }

    const masterTl = gsap.timeline({ repeat: -1, delay: 0.5 });

    phrases.forEach((phrase, i) => {
      const nextPhrase = phrases[(i + 1) % phrases.length];

      masterTl
        .to({}, { duration: 2.5 }) // Wait to read
        .to(textRef.current, {
          y: -25,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut"
        })
        .set(textRef.current, { text: nextPhrase, y: 25 })
        .to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });
    });
  }, []);

  return (
    <main style={{ background: 'transparent' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative min-h-screen bg-[#111] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-burgers.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* The Rounded */}
        <div className="relative z-10 w-[90vw] h-[90vw] max-w-[650px] max-h-[650px] bg-[#D49B24] rounded-full flex flex-col items-center justify-center text-center p-4 md:p-8 shadow-2xl">
          {/* Subtle Leaf Pattern Background */}
          <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-full">
            <defs>
              <pattern id="leaf-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5C13 5 8 10 8 16C8 23 15 29 19 35C19.5 36 20.5 36 21 35C25 29 32 23 32 16C32 10 27 5 20 5ZM20 27C16 23 11 19 11 16C11 11 15 8 20 8C25 8 29 11 29 16C29 19 24 23 20 27Z" fill="#000" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center gap-10 w-full">
            <span className="text-black font-bold uppercase tracking-[0.1em] text-[10px] md:text-xs mb-3">
              Experience the taste of Italy
            </span>

            <div className="relative flex flex-col  items-center justify-center   mb-5 w-full">
              {/* Outlined Text */}
              <h1
                className="font-black uppercase tracking-tight w-full leading-[1.2] "
                style={{
                  fontFamily: 'Antonio, sans-serif',
                  fontSize: 'clamp(3.2rem, 9vw, 7.2rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.85)',
                }}
              >
                GREAT DINING
              </h1>

              {/* Smooth Fading Text */}
              <div
                className=" top-[50%] ml-[50px] flex items-center justify-center w-full"
                style={{ minHeight: 'clamp(3.5rem, 10vw, 7.5rem)' }}
              >
                <h1
                  className="font-black uppercase text-center tracking-tight leading-[1.0] text-white flex items-center justify-center"
                  style={{
                    fontFamily: 'Antonio, sans-serif',
                    fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                    textShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                >
                  <span ref={textRef} className="inline-block">EXPERIENCES.</span>
                </h1>
              </div>
            </div>

            <Link
              href="/contact"
              className={cn(
                'relative z-20 mt-4 inline-flex items-center justify-between gap-4 p-3 pr-4 overflow-hidden group/btn rounded-md',
                'bg-green text-white font-bold uppercase tracking-[0.2em] text-[11px]',
                'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
                'hover:bg-gold'
              )}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
            >
              <span className="flex items-center gap-2">
                AUTHENTIC EXPERIENCE
              </span>
              <div className="relative w-7 h-7 flex items-center justify-center bg-white/20 rounded-sm overflow-hidden">
                <ArrowRight size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                <ArrowRight size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
              </div>
            </Link>
          </div>

          {/* Badge */}
          <div className="absolute -bottom-6 -right-6 md:bottom-2 md:right-2 w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-[#5a7b3e] rounded-full flex items-center justify-center p-2 shadow-xl z-30">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
              <path id="curve" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
              <text className="text-[9.5px] uppercase font-bold tracking-[0.15em]" fill="white">
                <textPath href="#curve" startOffset="0%">
                  REAL EXPERIENCE • THE ORIGINAL FOOD TASTE OF ITALY •
                </textPath>
              </text>
            </svg>
            <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 flex flex-col items-center justify-center text-white">
              {/* Chef Hat Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" y1="17" x2="18" y2="17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* ── STATS BAND ───────────────────────────────── */}
      <section style={{ background: '#57C157', padding: '1.75rem 0' }}>
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
              <div className="section-label" style={{ color: '#57C157' }}>
                <span className="brand-line" style={{ background: '#57C157' }} />
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
              <Link
                href="/expertise"
                className={cn(
                  'inline-flex items-center justify-between gap-4 p-3 pr-4 overflow-hidden group/btn rounded-md w-max',
                  'bg-green text-white font-bold uppercase tracking-[0.2em] text-[11px]',
                  'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-gold'
                )}
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <span className="flex items-center gap-2">Our Expertise</span>
                <div className="relative w-7 h-7 flex items-center justify-center bg-white/20 rounded-sm overflow-hidden">
                  <ArrowRight size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                  <ArrowRight size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                </div>
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
                    <Icon style={{ width: 20, height: 20, color: '#57C157' }} />
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
              <div className="section-label" style={{ color: '#57C157' }}>
                <span className="brand-line" style={{ background: '#57C157' }} />
                What We Do
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05 }}>
                Our Service<br />Segments
              </h2>
            </div>
            <Link
              href="/services"
              className={cn(
                'inline-flex items-center justify-between gap-4 p-3 pr-4 overflow-hidden group/btn rounded-md border border-[rgba(26,26,26,0.2)]',
                'bg-transparent text-[#1a1a1a] font-bold uppercase tracking-[0.2em] text-[11px]',
                'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#57C157] hover:text-[#57C157]'
              )}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
            >
              <span className="flex items-center gap-2">All Services</span>
              <div className="relative w-7 h-7 flex items-center justify-center bg-black/5 rounded-sm overflow-hidden group-hover/btn:bg-[#57C157]/10">
                <ArrowUpRight size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                <ArrowUpRight size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
              </div>
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
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: '#EF9419', marginBottom: '0.75rem' }}>{svc.tag}</div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.75rem', lineHeight: 1.2 }}>{svc.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(26,26,26,0.55)', lineHeight: 1.7 }}>{svc.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '1.5rem', color: '#57C157', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
            <div className="section-label" style={{ justifyContent: 'center', color: '#57C157' }}>
              <span className="brand-line" style={{ background: '#57C157' }} />
              Our Mission
            </div>
            <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.3, fontStyle: 'italic', marginBottom: '2.5rem' }}>
              "Deliver quality, healthy, nutritious, and hygienically prepared meals with excellence to every client and partner."
            </blockquote>
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #57C157, transparent)', marginBottom: '2.5rem' }} />
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
            <div className="section-label" style={{ color: '#57C157' }}>
              <span className="brand-line" style={{ background: '#57C157' }} />
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
                    <Star key={k} style={{ width: 14, height: 14, fill: '#EF9419', color: '#EF9419' }} />
                  ))}
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem' }}>
                  "{quote}"
                </p>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a' }}>{author}</div>
                  <div style={{ fontSize: '0.75rem', color: '#57C157', marginTop: 2, letterSpacing: '0.05em' }}>{role}</div>
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
            <div className="section-label" style={{ color: '#57C157' }}>
              <span className="brand-line" style={{ background: '#57C157' }} />
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
                <Link
                  href="/contact"
                  className={cn(
                    'flex items-center justify-between gap-4 p-4 pr-5 overflow-hidden group/btn rounded-md',
                    'bg-green text-white font-bold uppercase tracking-[0.2em] text-[11px]',
                    'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-gold'
                  )}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <span className="flex items-center gap-2">Get In Touch</span>
                  <div className="relative w-7 h-7 flex items-center justify-center bg-white/20 rounded-sm overflow-hidden">
                    <ArrowRight size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                    <ArrowRight size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                  </div>
                </Link>
                <a
                  href="tel:+233501502441"
                  className={cn(
                    'flex items-center justify-between gap-4 p-4 pr-5 overflow-hidden group/btn rounded-md border border-[rgba(26,26,26,0.2)]',
                    'bg-transparent text-[#1a1a1a] font-bold uppercase tracking-[0.2em] text-[11px]',
                    'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#57C157] hover:text-[#57C157]'
                  )}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
                >
                  <span className="flex items-center gap-2">Call +233 501 502 441</span>
                  <div className="relative w-7 h-7 flex items-center justify-center bg-black/5 rounded-sm overflow-hidden group-hover/btn:bg-[#57C157]/10">
                    <ArrowUpRight size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
                    <ArrowUpRight size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                  </div>
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
