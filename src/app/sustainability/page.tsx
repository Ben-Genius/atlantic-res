'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Play,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { smoothScrollTo } from '@/lib/lenis'
import CtaSection from '@/components/home/CtaSection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

/* ===================================================================
   CUTOUTS
   =================================================================== */
const CUTOUTS = {
  jollof: '/assets/images/cutouts/fit/testimonial-left.webp',
  prawns: '/assets/images/cutouts/fit/testimonial-right.webp',
  lobster: '/assets/images/cutouts/fit/testimonial-left-2.webp',
  steak: '/assets/images/cutouts/fit/testimonial-right-2.webp',
} as const

/* ===================================================================
   THEME SYSTEM
   =================================================================== */
type Theme = {
  solid: string
  tint: string
  accent: string
  onDark: boolean
}

/* ===================================================================
   PILLAR DATA (panels 0–4)
   =================================================================== */
const pillars: {
  eyebrow: string
  title: string
  body: string
  stats: { value: string; label: string }[]
  note: string
  dish: string
  dishAlt: string
  theme: Theme
}[] = [
    {
      eyebrow: 'Our ESG Commitment',
      title: 'Driving Sustainable & Equitable Futures',
      body: 'Integrating ISO-certified standards into all facets of our operations, we pledge to foster sustainable, equitable and healthy communities through our Integrated Management Systems and Community Engagement Programs.',
      stats: [
        { value: '3× ISO', label: 'Certifications held' },
        { value: '16', label: 'Regions engaged' },
        { value: '100%', label: 'Biodegradable packaging' },
      ],
      note: 'framework\nfirst',
      dish: CUTOUTS.jollof,
      dishAlt: 'Jollof rice with grilled chicken and plantain',
      theme: { solid: '#134E4A', tint: '#E8F3F2', accent: '#134E4A', onDark: true },
    },
    {
      eyebrow: 'Environmental Stewardship',
      title: 'Our Environment, Our Future',
      body: 'We minimise lifecycle impacts on energy, carbon, water, noise and waste. From custom heat extractors to used-cooking-oil soap partnerships, every operational choice is filtered through an environmental lens.',
      stats: [
        { value: '85%', label: 'Waste diverted' },
        { value: '100%', label: 'Biodegradable materials' },
        { value: '60%', label: 'Freshwater reduction' },
      ],
      note: 'zero\nwaste',
      dish: CUTOUTS.prawns,
      dishAlt: 'Grilled tiger prawns with herbs and lemon',
      theme: { solid: '#2d5f3f', tint: '#e8f0ea', accent: '#2d5f3f', onDark: true },
    },
    {
      eyebrow: 'Social Responsibility',
      title: 'Caring for People & Communities',
      body: 'We nurture an exceptional work culture with competitive benefits, complete safety certifications, regional vendor training and community empowerment programmes that reach all 16 regions of Ghana.',
      stats: [
        { value: '500+', label: 'Employees supported' },
        { value: '180K', label: 'Students reached' },
        { value: '$24M', label: 'Community invested' },
      ],
      note: 'people\npowered',
      dish: CUTOUTS.lobster,
      dishAlt: 'Butter-poached lobster tail with micro herbs',
      theme: { solid: '#7d4e6d', tint: '#f2e8ee', accent: '#7d4e6d', onDark: true },
    },
    {
      eyebrow: 'Governance',
      title: 'Ethics, Transparency & Accountability',
      body: 'Effective governance is fundamental to generating value for shareholders and stakeholders. We adhere to a strict Code of Business Ethics, maintain transparent whistleblower channels and publicly report ESG performance.',
      stats: [
        { value: '100%', label: 'Ethics compliance' },
        { value: '24/7', label: 'Anonymous channels' },
        { value: '0', label: 'Audit findings' },
      ],
      note: 'trust\nverified',
      dish: CUTOUTS.steak,
      dishAlt: 'Seared beef fillet with watercress and jus',
      theme: { solid: '#1A2330', tint: '#EDEFF3', accent: '#1A2330', onDark: true },
    },
    {
      eyebrow: 'Sustainability Projects',
      title: 'Impact in Action',
      body: 'From street-food vendor training to waste-to-soap circular initiatives, our projects translate policy into tangible outcomes that improve hygiene, livelihoods and environmental health across Ghana.',
      stats: [
        { value: '4', label: 'Active projects' },
        { value: '55K+', label: 'Meals served' },
        { value: '2014', label: 'Operating since' },
      ],
      note: 'impact\nmeasured',
      dish: CUTOUTS.jollof,
      dishAlt: 'Jollof rice with grilled chicken and plantain',
      theme: { solid: '#cc9933', tint: '#FBF3E3', accent: '#B37B29', onDark: true },
    },
  ]

/* ===================================================================
   PROJECTS DATA (for detailed panel 5)
   =================================================================== */
const projects = [
  {
    id: 1,
    title: 'Clean Street Bites Initiative',
    tag: 'Active Project',
    tagColor: 'bg-green/10 text-green-700 border-green-200/50',
    dotColor: 'bg-green',
    desc: 'Training and certifications for street food vendors in hygiene, food safety, and business operations across Ghana.',
    longDesc: 'By investing in street vendors, we prevent food-borne illnesses, uplift local entrepreneurs, and encourage safe cooking practices across regional communities.',
    video: 'https://atlanticcatering-gh.com/wp-content/uploads/2025/10/MAUD-SPEECH-HIGHLIGHTS-AKYEM.mp4',
    youtube: 'https://www.youtube.com/watch?v=4BfKFCOCJe8',
    hasVideo: true,
    dish: '/assets/images/dishes/dish1.png',
  },
  {
    id: 2,
    title: 'Palm Prosperity Project',
    tag: 'In Development',
    tagColor: 'bg-amber-500/10 text-amber-700 border-amber-200/50',
    dotColor: 'bg-amber-500',
    desc: 'Sustainable palm oil value chain development supporting smallholder farmers with technical training and market access.',
    longDesc: 'We partner with local smallholder farmers to provide agricultural resources, sustainable harvesting techniques, and guaranteed market channels.',
    hasVideo: false,
    dish: '/assets/images/dishes/dish4.png',
  },
  {
    id: 3,
    title: 'Women Empowerment Project',
    tag: 'In Development',
    tagColor: 'bg-teal-500/10 text-teal-700 border-teal-200/50',
    dotColor: 'bg-teal-500',
    desc: 'Skills training, financial literacy, and enterprise development for women entrepreneurs in rural communities.',
    longDesc: 'We provide structured mentorship, micro-business grants, and financial literacy training programs to women-led cooperatives, bolstering local economies.',
    hasVideo: false,
    dish: '/assets/images/dishes/dish6.png',
  },
  {
    id: 4,
    title: 'Waste-to-Soap Initiative',
    tag: 'Active Project',
    tagColor: 'bg-green/10 text-green-700 border-green-200/50',
    dotColor: 'bg-green',
    desc: 'Used cooking oil collected from all kitchens is converted into hygienic, local soap products through community partnerships.',
    longDesc: 'This circular economy initiative turns liquid kitchen waste into useful community hygiene products, mitigating waste footprint while improving local hygiene standards.',
    hasVideo: false,
    dish: '/assets/images/dishes/dish3.png',
  },
]

/* ===================================================================
   LOCAL CONTENT DATA (for detailed panel 6)
   =================================================================== */
const localContentItems = [
  'Contract & Enterprise Development',
  'Regular Supplier Engagement Forums',
  'Community Employment & Internship Opportunities',
  'Capacity Building Training and Development',
  'Promote Environmental Sustainability',
  'Promote Community Engagement Programs',
]

/* ===================================================================
   SHARED PRIMITIVES
   =================================================================== */
function QuoteMark({ className = '', color = '#134E4A' }: { className?: string; color?: string }) {
  return (
    <div className={`inline-flex items-center justify-center rounded-full text-white ${className}`} style={{ background: color }}>
      <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.725 6.51h4.725V21h-9.978zm-11.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-4.76 2.824-4.722 6.505h4.722V21H3z" />
      </svg>
    </div>
  )
}

function CurvedArrow({ color, flip = false, className = '' }: { color: string; flip?: boolean; className?: string }) {
  return (
    <svg width="72" height="58" viewBox="0 0 80 62" fill="none" className={className} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <path d="M8 6 C26 20 48 40 68 55" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M57 53 L71 57 L66 44" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ===================================================================
   PANEL COUNTS
   5 pillars + 3 detailed + 1 closing = 9 panels total
   =================================================================== */
const PILLAR_COUNT = pillars.length          // 5
const DETAILED_COUNT = 3                       // projects, localContent, standards
const TOTAL_PAIRS = PILLAR_COUNT + DETAILED_COUNT // 8
const PANELS = TOTAL_PAIRS + 1               // 9 (including closing)
const STEPS = PANELS - 1                     // 8
const TRAVEL = (STEPS / PANELS) * 100
const VH_PER_STEP = 0.85

const promiseStats = [
  { value: '55,000+', label: 'Meals served' },
  { value: 'Since 2014', label: 'Operating in Ghana' },
  { value: '3 × ISO', label: 'Certifications held' },
]

/* ===================================================================
   MAIN COMPONENT
   =================================================================== */
export default function SustainabilityPage() {
  const [reduced, setReduced] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  /* Reduced motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* Hero animations */
  useGSAP(() => {
    gsap.fromTo('.gsap-hero-title span', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 })
    gsap.fromTo('.gsap-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' })
    gsap.fromTo('.gsap-hero-dish-left', { x: -100, rotate: -30, opacity: 0 }, { x: 0, rotate: 0, opacity: 0.4, duration: 1.5, delay: 0.2, ease: 'power2.out' })
    gsap.fromTo('.gsap-hero-dish-right', { x: 100, rotate: 30, opacity: 0 }, { x: 0, rotate: 0, opacity: 0.4, duration: 1.5, delay: 0.3, ease: 'power2.out' })
    gsap.to('.gsap-hero-dish-left', { y: 120, rotate: 20, scrollTrigger: { trigger: '.gsap-hero-trigger', start: 'top top', end: 'bottom top', scrub: 1 } })
    gsap.to('.gsap-hero-dish-right', { y: -80, rotate: -15, scrollTrigger: { trigger: '.gsap-hero-trigger', start: 'top top', end: 'bottom top', scrub: 1 } })
  }, [])

  /* ------------------------------------------------------------------
     DUAL-DIRECTION SPLIT SCREEN
     ------------------------------------------------------------------ */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (!leftColRef.current || !rightColRef.current) return
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'sustainability-split',
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + window.innerHeight * STEPS * VH_PER_STEP,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        triggerRef.current = tl.scrollTrigger ?? null
        tl.fromTo(leftColRef.current, { y: 0, yPercent: 0 }, { yPercent: -TRAVEL, ease: 'none', duration: 1 }, 0)
        tl.fromTo(rightColRef.current, { y: 0, yPercent: -TRAVEL }, { y: 0, yPercent: 0, ease: 'none', duration: 1 }, 0)
        if (progressRef.current) {
          gsap.set(progressRef.current, { transformOrigin: 'left center' })
          tl.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
        }
        const drift = gsap.to('.sus-drift', { y: -14, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.35 })
        return () => { drift.kill(); triggerRef.current = null }
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  /* Refresh ScrollTrigger after fonts/images */
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350)
    return () => window.clearTimeout(id)
  }, [reduced])

  const goToPanel = (i: number) => {
    const st = triggerRef.current
    if (!st) return
    smoothScrollTo(st.start + (st.end - st.start) * (i / STEPS))
  }

  const useSplit = !reduced
  const panelHeight = `${100 / PANELS}%`

  const dotRow = (current: number, accent: string) => (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_PAIRS }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToPanel(i)}
            aria-label={`Scroll to panel ${i + 1}`}
            aria-current={i === current}
            className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ width: i === current ? 30 : 8, height: 8, background: i === current ? accent : 'rgba(26,26,26,0.18)' }}
          />
        ))}
      </div>
      <span className="font-outfit text-[11px] font-bold tracking-[0.2em] text-[#1a1a1a]/45">
        {String(current + 1).padStart(2, '0')} / {String(TOTAL_PAIRS).padStart(2, '0')}
      </span>
    </div>
  )

  const nextProject = () => setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
  const prevProject = () => setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)

  /* =================================================================
     LEFT PANELS (top to bottom):
     0-4: pillars
     5: Projects Carousel
     6: Local Content & Human Rights
     7: Globally Recognized Standards
     8: Closing Promise
     ================================================================= */
  const leftPanels = [
    /* -------- PILLAR 0: ESG -------- */
    <div key="p0" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16" style={{ height: panelHeight, background: pillars[0].theme.tint }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: pillars[0].theme.accent }}>{pillars[0].eyebrow}</span>
      <span className="mt-3 block w-14 h-[2px]" style={{ background: pillars[0].theme.accent }} />
      <h2 className="text-4xl xl:text-[3.2rem] font-black text-[#1a1a1a] font-outfit tracking-tight leading-[0.95] mt-6">Sustainability in Every Decision</h2>
      <QuoteMark className="w-12 h-12 mt-8 mb-6" color={pillars[0].theme.accent} />
      <blockquote className="text-xl xl:text-[1.6rem] text-[#1a1a1a] font-bold leading-snug max-w-2xl">&ldquo;{pillars[0].body}&rdquo;</blockquote>
      <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
        {pillars[0].stats.map((s) => (
          <div key={s.label} className="border-t border-[#1a1a1a]/15 pt-4">
            <p className="text-lg xl:text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight">{s.value}</p>
            <p className="text-[10px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-9">{dotRow(0, pillars[0].theme.accent)}</div>
    </div>,

    /* -------- PILLAR 1: Environmental -------- */
    <div key="p1" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16" style={{ height: panelHeight, background: pillars[1].theme.tint }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: pillars[1].theme.accent }}>{pillars[1].eyebrow}</span>
      <span className="mt-3 block w-14 h-[2px]" style={{ background: pillars[1].theme.accent }} />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-6">{pillars[1].title}</h3>
      <QuoteMark className="w-12 h-12 mt-8 mb-6" color={pillars[1].theme.accent} />
      <blockquote className="text-xl xl:text-[1.5rem] text-[#1a1a1a] font-bold leading-snug max-w-2xl">&ldquo;{pillars[1].body}&rdquo;</blockquote>
      <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
        {pillars[1].stats.map((s) => (
          <div key={s.label} className="border-t border-[#1a1a1a]/15 pt-4">
            <p className="text-lg xl:text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight">{s.value}</p>
            <p className="text-[10px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-9">{dotRow(1, pillars[1].theme.accent)}</div>
    </div>,

    /* -------- PILLAR 2: Social -------- */
    <div key="p2" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16" style={{ height: panelHeight, background: pillars[2].theme.tint }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: pillars[2].theme.accent }}>{pillars[2].eyebrow}</span>
      <span className="mt-3 block w-14 h-[2px]" style={{ background: pillars[2].theme.accent }} />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-6">{pillars[2].title}</h3>
      <QuoteMark className="w-12 h-12 mt-8 mb-6" color={pillars[2].theme.accent} />
      <blockquote className="text-xl xl:text-[1.5rem] text-[#1a1a1a] font-bold leading-snug max-w-2xl">&ldquo;{pillars[2].body}&rdquo;</blockquote>
      <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
        {pillars[2].stats.map((s) => (
          <div key={s.label} className="border-t border-[#1a1a1a]/15 pt-4">
            <p className="text-lg xl:text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight">{s.value}</p>
            <p className="text-[10px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-9">{dotRow(2, pillars[2].theme.accent)}</div>
    </div>,

    /* -------- PILLAR 3: Governance -------- */
    <div key="p3" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16" style={{ height: panelHeight, background: pillars[3].theme.tint }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: pillars[3].theme.accent }}>{pillars[3].eyebrow}</span>
      <span className="mt-3 block w-14 h-[2px]" style={{ background: pillars[3].theme.accent }} />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-6">{pillars[3].title}</h3>
      <QuoteMark className="w-12 h-12 mt-8 mb-6" color={pillars[3].theme.accent} />
      <blockquote className="text-xl xl:text-[1.5rem] text-[#1a1a1a] font-bold leading-snug max-w-2xl">&ldquo;{pillars[3].body}&rdquo;</blockquote>
      <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
        {pillars[3].stats.map((s) => (
          <div key={s.label} className="border-t border-[#1a1a1a]/15 pt-4">
            <p className="text-lg xl:text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight">{s.value}</p>
            <p className="text-[10px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-9">{dotRow(3, pillars[3].theme.accent)}</div>
    </div>,

    /* -------- PILLAR 4: Sustainability Projects -------- */
    <div key="p4" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16" style={{ height: panelHeight, background: pillars[4].theme.tint }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: pillars[4].theme.accent }}>{pillars[4].eyebrow}</span>
      <span className="mt-3 block w-14 h-[2px]" style={{ background: pillars[4].theme.accent }} />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-6">{pillars[4].title}</h3>
      <QuoteMark className="w-12 h-12 mt-8 mb-6" color={pillars[4].theme.accent} />
      <blockquote className="text-xl xl:text-[1.5rem] text-[#1a1a1a] font-bold leading-snug max-w-2xl">&ldquo;{pillars[4].body}&rdquo;</blockquote>
      <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
        {pillars[4].stats.map((s) => (
          <div key={s.label} className="border-t border-[#1a1a1a]/15 pt-4">
            <p className="text-lg xl:text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight">{s.value}</p>
            <p className="text-[10px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-9">{dotRow(4, pillars[4].theme.accent)}</div>
    </div>,

    /* -------- DETAILED PANEL 5: Projects Carousel -------- */
    <div key="d5" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-12" style={{ height: panelHeight, background: '#FAF9F6' }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-[#B37B29]">Impact in Action</span>
      <span className="mt-3 block w-14 h-[2px] bg-[#B37B29]" />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-5">Sustainability Projects</h3>

      <div className="mt-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProjectIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${projects[currentProjectIndex].tagColor}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${projects[currentProjectIndex].dotColor} animate-pulse`}></span>
              {projects[currentProjectIndex].tag}
            </div>
            <h4 className="text-xl font-extrabold text-slate-800">{projects[currentProjectIndex].title}</h4>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed max-w-xl">{projects[currentProjectIndex].desc}</p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">{projects[currentProjectIndex].longDesc}</p>
            {projects[currentProjectIndex].hasVideo && (
              <div className="flex flex-wrap gap-3 pt-1">
                <button onClick={() => setIsVideoModalOpen(true)} className="inline-flex items-center gap-2 bg-green hover:bg-[#134E4A] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors shadow-md">
                  <Play size={14} fill="currentColor" /> Watch Video
                </button>
                <a href={projects[currentProjectIndex].youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-green hover:text-green font-bold text-xs px-5 py-2.5 rounded-full transition-colors">
                  YouTube
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-6 max-w-xl">
        <div className="flex gap-2">
          {projects.map((p, idx) => (
            <button key={p.id} onClick={() => setCurrentProjectIndex(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${currentProjectIndex === idx ? 'w-8 bg-[#EF9419]' : 'w-2.5 bg-slate-300'}`} aria-label={`Project ${idx + 1}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prevProject} className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:border-green hover:text-green text-slate-600 flex items-center justify-center transition-all" aria-label="Previous project">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextProject} className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:border-green hover:text-green text-slate-600 flex items-center justify-center transition-all" aria-label="Next project">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="mt-6">{dotRow(5, '#B37B29')}</div>
    </div>,

    /* -------- DETAILED PANEL 6: Local Content & Human Rights -------- */
    <div key="d6" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-12" style={{ height: panelHeight, background: '#F5F5F4' }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-green">Local Content</span>
      <span className="mt-3 block w-14 h-[2px] bg-green" />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-5">Local Content & Alliances</h3>

      <div className="mt-6 grid grid-cols-2 gap-3 max-w-2xl">
        {localContentItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-3 hover:border-green/30 transition-all">
            <div className="w-6 h-6 rounded-full bg-green/10 text-green flex items-center justify-center text-xs font-bold shrink-0">{index + 1}</div>
            <span className="text-xs font-semibold text-slate-700 leading-tight">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-br from-[#134E4A] to-slate-900 text-white rounded-2xl p-5 max-w-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-bold text-green-light uppercase tracking-wider block">Human Rights Policy</span>
          <h4 className="text-lg font-extrabold leading-tight">Preserving Fundamental Rights & Dignity</h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Our commitment to human rights is embedded in Atlantic&apos;s Human Rights Policy, aligned with globally acknowledged principles across all assets.
          </p>
        </div>
      </div>
      <div className="mt-6">{dotRow(6, '#134E4A')}</div>
    </div>,

    /* -------- DETAILED PANEL 7: Globally Recognized Standards -------- */
    <div key="d7" className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-12" style={{ height: panelHeight, background: '#ffffff' }}>
      <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-green">Accreditation</span>
      <span className="mt-3 block w-14 h-[2px] bg-green" />
      <h3 className="text-3xl xl:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-5">Globally Recognized Standards</h3>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
        {[
          { title: 'ISO 22000', desc: 'Food Safety Management', color: 'text-green' },
          { title: 'ISO 14001', desc: 'Environmental Management', color: 'text-green' },
          { title: 'ISO 45001', desc: 'Occupational Health & Safety', color: 'text-green' },
          { title: 'Ghana Club 100', desc: '#1 Hospitality & Tourism — 2023', color: 'text-[#EF9419]' },
        ].map((card) => (
          <div key={card.title} className="bg-white border border-slate-100 rounded-2xl p-5 text-center hover:border-green/20 hover:shadow-lg transition-all duration-300">
            <CheckCircle2 className={`w-10 h-10 ${card.color} mx-auto mb-3`} />
            <h4 className="font-bold text-slate-800 text-sm mb-1">{card.title}</h4>
            <p className="text-[10px] text-slate-500">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between max-w-3xl shadow-sm">
        <div>
          <h4 className="text-base font-bold text-slate-800">Ghana Club 100 Awards 2023</h4>
          <p className="text-xs text-slate-600">1st in Hospitality & Tourism, 32nd overall</p>
        </div>
        <div className="text-center shrink-0">
          <span className="block text-4xl font-black text-green">#1</span>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hospitality</p>
        </div>
      </div>
      <div className="mt-6">{dotRow(7, '#134E4A')}</div>
    </div>,

    /* -------- CLOSING PANEL 8 -------- */
    <div key="close" className="w-full shrink-0 bg-white flex flex-col justify-center px-14 xl:px-20 py-14 relative overflow-hidden" style={{ height: panelHeight }}>
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(26,26,26,0.14) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 max-w-xl">
        <span className="text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.3em]">Our Promise</span>
        <h3 className="text-3xl xl:text-5xl font-black text-[#1a1a1a] font-outfit mt-4 leading-[1.05]">
          Hospitality without<br className="hidden lg:block" /> compromise.
        </h3>
        <p className="text-[#1a1a1a]/60 font-outfit mt-6 max-w-md leading-relaxed">
          From offshore platforms to boardroom events, every service is planned, certified and delivered with the same standard — no matter the site, the shift or the sea state.
        </p>
        <div className="mt-9 grid grid-cols-3 gap-4 lg:gap-6 max-w-lg">
          {promiseStats.map((stat) => (
            <div key={stat.label} className="border-t border-[#1a1a1a]/15 pt-4">
              <p className="text-lg xl:text-3xl font-black text-[#1a1a1a] font-outfit tracking-tight">{stat.value}</p>
              <p className="text-[10px] xl:text-[11px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex gap-1 text-white bg-[#cc9933] px-3 py-2 rounded-md shrink-0">
              {Array.from({ length: 5 }).map((_, idx) => (<Star key={idx} className="w-4 h-4 fill-current" />))}
            </div>
            <p className="text-[#1a1a1a] font-outfit text-sm font-semibold tracking-wide">
              <span className="underline decoration-black decoration-1 underline-offset-4">55,000+ happy food lovers</span> served across offshore sites and corporate operations.
            </p>
          </div>
        </div>
      </div>
    </div>,
  ]

  /* =================================================================
     RIGHT PLATES (top to bottom — REVERSED so pairs stay in sync):
     0: Closing collage
     1: Standards plate
     2: Local Content plate
     3: Projects plate
     4: Pillar 4 plate
     5: Pillar 3 plate
     6: Pillar 2 plate
     7: Pillar 1 plate
     8: Pillar 0 plate
     ================================================================= */
  const rightPlates = [
    /* -------- PLATE 0: Closing collage -------- */
    <div key="r0" className="w-full shrink-0 bg-[#F9F6F0] relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight }}>
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="relative z-10 w-full h-full">
        <div className="sus-drift absolute left-[6%] top-[14%] w-[52%]">
          <div className="absolute -inset-6 rounded-full bg-[#cc9933]/10 blur-2xl" />
          <img src={CUTOUTS.jollof} alt="Jollof rice" className="relative w-full h-auto drop-shadow-2xl" draggable={false} />
        </div>
        <div className="sus-drift absolute right-[5%] top-[34%] w-[46%]">
          <div className="absolute -inset-6 rounded-full bg-[#296ed6]/10 blur-2xl" />
          <img src={CUTOUTS.steak} alt="Seared beef" className="relative w-full h-auto drop-shadow-2xl" draggable={false} />
        </div>
        <div className="sus-drift absolute left-[16%] bottom-[8%] w-[40%]">
          <img src={CUTOUTS.lobster} alt="Lobster" className="relative w-full h-auto drop-shadow-2xl" draggable={false} />
        </div>
        <div className="absolute right-[8%] bottom-[16%] flex flex-col items-center">
          <span className="font-serif text-[15px] text-[#cc9933] font-semibold leading-tight text-center whitespace-pre-line" style={{ fontStyle: 'italic' }}>{'sustainability\nin every dish'}</span>
          <CurvedArrow color="#cc9933" flip className="mt-1" />
        </div>
      </div>
    </div>,

    /* -------- PLATE 1: Standards -------- */
    <div key="r1" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: '#134E4A' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={CUTOUTS.steak} alt="Certified quality" className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] left-[7%] items-start">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line" style={{ fontStyle: 'italic', color: '#ffffff' }}>{'globally\ncertified'}</span>
        <CurvedArrow color="#ffffff" className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>08 / 08</span>
    </div>,

    /* -------- PLATE 2: Local Content -------- */
    <div key="r2" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: '#2d5f3f' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={CUTOUTS.prawns} alt="Community alliances" className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] right-[7%] items-end">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line text-right" style={{ fontStyle: 'italic', color: '#ffffff' }}>{'community\nalliances'}</span>
        <CurvedArrow color="#ffffff" flip className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>07 / 08</span>
    </div>,

    /* -------- PLATE 3: Projects -------- */
    <div key="r3" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: '#cc9933' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={CUTOUTS.jollof} alt="Impact projects" className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] left-[7%] items-start">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line" style={{ fontStyle: 'italic', color: '#ffffff' }}>{'impact\nprojects'}</span>
        <CurvedArrow color="#ffffff" className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>06 / 08</span>
    </div>,

    /* -------- PLATE 4: Pillar 4 -------- */
    <div key="r4" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: pillars[4].theme.solid }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={pillars[4].dish} alt={pillars[4].dishAlt} className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] right-[7%] items-end">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line text-right" style={{ fontStyle: 'italic', color: '#ffffff' }}>{pillars[4].note}</span>
        <CurvedArrow color="#ffffff" flip className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>05 / 08</span>
    </div>,

    /* -------- PLATE 5: Pillar 3 -------- */
    <div key="r5" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: pillars[3].theme.solid }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={pillars[3].dish} alt={pillars[3].dishAlt} className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] left-[7%] items-start">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line" style={{ fontStyle: 'italic', color: '#ffffff' }}>{pillars[3].note}</span>
        <CurvedArrow color="#ffffff" className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>04 / 08</span>
    </div>,

    /* -------- PLATE 6: Pillar 2 -------- */
    <div key="r6" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: pillars[2].theme.solid }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={pillars[2].dish} alt={pillars[2].dishAlt} className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] right-[7%] items-end">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line text-right" style={{ fontStyle: 'italic', color: '#ffffff' }}>{pillars[2].note}</span>
        <CurvedArrow color="#ffffff" flip className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>03 / 08</span>
    </div>,

    /* -------- PLATE 7: Pillar 1 -------- */
    <div key="r7" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: pillars[1].theme.solid }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={pillars[1].dish} alt={pillars[1].dishAlt} className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] left-[7%] items-start">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line" style={{ fontStyle: 'italic', color: '#ffffff' }}>{pillars[1].note}</span>
        <CurvedArrow color="#ffffff" className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>02 / 08</span>
    </div>,

    /* -------- PLATE 8: Pillar 0 -------- */
    <div key="r8" className="w-full shrink-0 relative flex items-center justify-center overflow-hidden" style={{ height: panelHeight, background: pillars[0].theme.solid }}>
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.13, backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 w-[60%] max-w-[380px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/30" />
        <div className="absolute inset-[-9%] rounded-full border border-white/20" />
        <img src={pillars[0].dish} alt={pillars[0].dishAlt} className="sus-drift relative w-[90%] h-auto drop-shadow-2xl" draggable={false} />
      </div>
      <div className="absolute z-20 flex flex-col top-[13%] right-[7%] items-end">
        <span className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line text-right" style={{ fontStyle: 'italic', color: '#ffffff' }}>{pillars[0].note}</span>
        <CurvedArrow color="#ffffff" flip className="mt-1" />
      </div>
      <span className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]" style={{ color: '#ffffff', opacity: 0.6 }}>01 / 08</span>
    </div>,
  ]

  return (
    <div>
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="gsap-hero-trigger relative w-full px-6 md:px-12 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden text-white transition-colors duration-300 min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/premium-green-texture.png')" }} />
        <div className="absolute inset-0 bg-[#134E4A] mix-blend-multiply opacity-90 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

        <div className="gsap-hero-dish-left absolute left-10 md:left-20 top-20 z-10 w-[180px] h-[180px] md:w-[260px] md:h-[260px] opacity-25 lg:opacity-40 pointer-events-none select-none hidden lg:block cursor-grab active:cursor-grabbing">
          <Image src="/assets/images/dishes/dish1.png" alt="Premium Culinary Dish" fill className="object-contain" />
        </div>
        <div className="gsap-hero-dish-right absolute right-10 md:right-20 bottom-16 z-10 w-[180px] h-[180px] md:w-[260px] md:h-[260px] opacity-25 lg:opacity-40 pointer-events-none select-none hidden lg:block">
          <Image src="/assets/images/dishes/dish4.png" alt="Premium Culinary Roast" fill className="object-contain" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-20">
          <span className="gsap-hero-sub text-[10px] md:text-sm font-bold text-[#EF9419] uppercase tracking-[0.35em] mb-2 block">ISO 22000 · 14001 · 45001 Certified</span>
          <h1 className="gsap-hero-title font-extrabold uppercase leading-[1.1] tracking-tighter m-0 text-center">
            <span className="block overflow-hidden py-1">
              <span className="block text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6rem] text-white">Sustainably</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="block text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6rem] text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>
                Serving <em className="not-italic text-[#EF9419]" style={{ WebkitTextStroke: '0px' }}>Ghana</em>
              </span>
            </span>
          </h1>
          <p className="gsap-hero-sub text-xs md:text-base leading-relaxed text-white/80 font-medium max-w-2xl mx-auto pt-6">
            Integrating certified standards across every facet of our operations — from responsible sourcing and eco‑friendly kitchens to community empowerment across all 16 regions.
          </p>
        </div>
      </section>

      {/* ================================================================
          SPLIT-SCREEN DUAL-DIRECTION — ALL PANELS
          ================================================================ */}
      <section ref={sectionRef} className={`relative w-full bg-white select-none ${useSplit ? 'lg:h-screen lg:overflow-hidden' : ''}`}>
        {useSplit && (
          <div className="hidden lg:flex absolute inset-0 w-full h-full overflow-hidden">
            {/* LEFT STACK — travels up */}
            <div className="relative w-[55%] h-full overflow-hidden border-r border-[#1a1a1a]/10">
              <div ref={leftColRef} className="w-full flex flex-col will-change-transform" style={{ height: `${PANELS * 100}%` }}>
                {leftPanels}
              </div>
              <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#1a1a1a]/10 z-30">
                <span ref={progressRef} className="block h-full w-full bg-[#cc9933] origin-left scale-x-0" />
              </span>
            </div>

            {/* RIGHT STACK — travels down */}
            <div className="relative w-[45%] h-full overflow-hidden">
              <div ref={rightColRef} className="w-full flex flex-col will-change-transform" style={{ height: `${PANELS * 100}%`, transform: `translateY(-${TRAVEL}%)` }}>
                {rightPlates}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE / REDUCED MOTION — stacked layout */}
        <div className={useSplit ? 'lg:hidden' : ''}>
          <div className="px-6 pt-16 pb-8">
            <span className="block text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.28em]">Our Pillars</span>
            <span className="mt-3 block w-14 h-[2px] bg-[#cc9933]" />
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-4">Sustainability in Every Decision</h2>
          </div>

          {/* Pillar 0 */}
          <div className="relative overflow-hidden px-6 py-12" style={{ background: pillars[0].theme.solid }}>
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-white/90 mb-2">{pillars[0].eyebrow}</span>
            <h3 className="text-2xl font-black text-white font-outfit tracking-tight leading-tight mb-3">{pillars[0].title}</h3>
            <blockquote className="text-base font-bold leading-snug text-white/90">&ldquo;{pillars[0].body}&rdquo;</blockquote>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {pillars[0].stats.map((s) => (
                <div key={s.label} className="border-t border-white/20 pt-3">
                  <p className="text-lg font-black font-outfit tracking-tight text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 1 */}
          <div className="relative overflow-hidden px-6 py-12" style={{ background: pillars[1].theme.solid }}>
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-white/90 mb-2">{pillars[1].eyebrow}</span>
            <h3 className="text-2xl font-black text-white font-outfit tracking-tight leading-tight mb-3">{pillars[1].title}</h3>
            <blockquote className="text-base font-bold leading-snug text-white/90">&ldquo;{pillars[1].body}&rdquo;</blockquote>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {pillars[1].stats.map((s) => (
                <div key={s.label} className="border-t border-white/20 pt-3">
                  <p className="text-lg font-black font-outfit tracking-tight text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative overflow-hidden px-6 py-12" style={{ background: pillars[2].theme.solid }}>
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-white/90 mb-2">{pillars[2].eyebrow}</span>
            <h3 className="text-2xl font-black text-white font-outfit tracking-tight leading-tight mb-3">{pillars[2].title}</h3>
            <blockquote className="text-base font-bold leading-snug text-white/90">&ldquo;{pillars[2].body}&rdquo;</blockquote>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {pillars[2].stats.map((s) => (
                <div key={s.label} className="border-t border-white/20 pt-3">
                  <p className="text-lg font-black font-outfit tracking-tight text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="relative overflow-hidden px-6 py-12" style={{ background: pillars[3].theme.solid }}>
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-white/90 mb-2">{pillars[3].eyebrow}</span>
            <h3 className="text-2xl font-black text-white font-outfit tracking-tight leading-tight mb-3">{pillars[3].title}</h3>
            <blockquote className="text-base font-bold leading-snug text-white/90">&ldquo;{pillars[3].body}&rdquo;</blockquote>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {pillars[3].stats.map((s) => (
                <div key={s.label} className="border-t border-white/20 pt-3">
                  <p className="text-lg font-black font-outfit tracking-tight text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="relative overflow-hidden px-6 py-12" style={{ background: pillars[4].theme.solid }}>
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-white/90 mb-2">{pillars[4].eyebrow}</span>
            <h3 className="text-2xl font-black text-white font-outfit tracking-tight leading-tight mb-3">{pillars[4].title}</h3>
            <blockquote className="text-base font-bold leading-snug text-white/90">&ldquo;{pillars[4].body}&rdquo;</blockquote>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {pillars[4].stats.map((s) => (
                <div key={s.label} className="border-t border-white/20 pt-3">
                  <p className="text-lg font-black font-outfit tracking-tight text-white">{s.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mt-1 text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed: Projects Carousel */}
          <div className="relative bg-[#FAF9F6] px-6 py-12">
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-[#B37B29] mb-2">Impact in Action</span>
            <h3 className="text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mb-6">Sustainability Projects</h3>
            <AnimatePresence mode="wait">
              <motion.div key={currentProjectIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${projects[currentProjectIndex].tagColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${projects[currentProjectIndex].dotColor} animate-pulse`}></span>
                  {projects[currentProjectIndex].tag}
                </div>
                <h4 className="text-xl font-extrabold text-slate-800">{projects[currentProjectIndex].title}</h4>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">{projects[currentProjectIndex].desc}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{projects[currentProjectIndex].longDesc}</p>
                {projects[currentProjectIndex].hasVideo && (
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button onClick={() => setIsVideoModalOpen(true)} className="inline-flex items-center gap-2 bg-green hover:bg-[#134E4A] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors shadow-md">
                      <Play size={14} fill="currentColor" /> Watch Video
                    </button>
                    <a href={projects[currentProjectIndex].youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-green hover:text-green font-bold text-xs px-5 py-2.5 rounded-full transition-colors">YouTube</a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-3 mt-6">
              <div className="flex gap-2">
                {projects.map((p, idx) => (
                  <button key={p.id} onClick={() => setCurrentProjectIndex(idx)} className={`h-2.5 rounded-full transition-all duration-300 ${currentProjectIndex === idx ? 'w-8 bg-[#EF9419]' : 'w-2.5 bg-slate-300'}`} aria-label={`Project ${idx + 1}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevProject} className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:border-green hover:text-green text-slate-600 flex items-center justify-center transition-all" aria-label="Previous project"><ChevronLeft size={16} /></button>
                <button onClick={nextProject} className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:border-green hover:text-green text-slate-600 flex items-center justify-center transition-all" aria-label="Next project"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>

          {/* Detailed: Local Content */}
          <div className="relative bg-[#F5F5F4] px-6 py-12">
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-green mb-2">Local Content</span>
            <h3 className="text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mb-6">Local Content & Alliances</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {localContentItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 hover:border-green/30 transition-all">
                  <div className="w-6 h-6 rounded-full bg-green/10 text-green flex items-center justify-center text-xs font-bold shrink-0">{index + 1}</div>
                  <span className="text-xs font-semibold text-slate-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-gradient-to-br from-[#134E4A] to-slate-900 text-white rounded-2xl p-5 relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-green-light uppercase tracking-wider block">Human Rights Policy</span>
                <h4 className="text-lg font-extrabold leading-tight">Preserving Fundamental Rights & Dignity</h4>
                <p className="text-xs text-white/80 leading-relaxed">Our commitment to human rights is embedded in Atlantic&apos;s Human Rights Policy, aligned with globally acknowledged principles across all assets.</p>
              </div>
            </div>
          </div>

          {/* Detailed: Standards */}
          <div className="relative bg-white px-6 py-12">
            <span className="block font-outfit text-xs font-extrabold uppercase tracking-[0.3em] text-green mb-2">Accreditation</span>
            <h3 className="text-2xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mb-6">Globally Recognized Standards</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'ISO 22000', desc: 'Food Safety Management', color: 'text-green' },
                { title: 'ISO 14001', desc: 'Environmental Management', color: 'text-green' },
                { title: 'ISO 45001', desc: 'Occupational Health & Safety', color: 'text-green' },
                { title: 'Ghana Club 100', desc: '#1 Hospitality & Tourism — 2023', color: 'text-[#EF9419]' },
              ].map((card) => (
                <div key={card.title} className="bg-white border border-slate-100 rounded-2xl p-5 text-center hover:border-green/20 hover:shadow-lg transition-all duration-300">
                  <CheckCircle2 className={`w-10 h-10 ${card.color} mx-auto mb-3`} />
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{card.title}</h4>
                  <p className="text-[10px] text-slate-500">{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-base font-bold text-slate-800">Ghana Club 100 Awards 2023</h4>
                <p className="text-xs text-slate-600">1st in Hospitality & Tourism, 32nd overall</p>
              </div>
              <div className="text-center shrink-0">
                <span className="block text-4xl font-black text-green">#1</span>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hospitality</p>
              </div>
            </div>
          </div>

          {/* Closing Promise */}
          <div className="relative bg-white px-6 py-14 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.14) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
            <div className="relative z-10 max-w-xl">
              <span className="text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.3em]">Our Promise</span>
              <h3 className="text-3xl font-black text-[#1a1a1a] font-outfit mt-4 leading-[1.05]">Hospitality without compromise.</h3>
              <p className="text-[#1a1a1a]/60 font-outfit mt-6 leading-relaxed">From offshore platforms to boardroom events, every service is planned, certified and delivered with the same standard — no matter the site, the shift or the sea state.</p>
              <div className="mt-9 grid grid-cols-3 gap-4 max-w-lg">
                {promiseStats.map((stat) => (
                  <div key={stat.label} className="border-t border-[#1a1a1a]/15 pt-4">
                    <p className="text-lg font-black text-[#1a1a1a] font-outfit tracking-tight">{stat.value}</p>
                    <p className="text-[10px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collage */}
          <div className="relative bg-[#F9F6F0] py-14 overflow-hidden">
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
            <div className="relative z-10 px-6 grid grid-cols-3 gap-3 items-center">
              <img src={CUTOUTS.jollof} alt="Jollof rice" className="w-full h-auto drop-shadow-xl" draggable={false} />
              <img src={CUTOUTS.steak} alt="Seared beef" className="w-full h-auto drop-shadow-xl" draggable={false} />
              <img src={CUTOUTS.lobster} alt="Lobster" className="w-full h-auto drop-shadow-xl" draggable={false} />
            </div>
            <p className="relative z-10 mt-6 text-center font-serif text-[15px] text-[#cc9933] font-semibold" style={{ fontStyle: 'italic' }}>sustainability in every dish</p>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA SECTION — after the split screen releases
          ================================================================ */}
      <CtaSection />

      {/* ================================================================
          VIDEO MODAL
          ================================================================ */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-100">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-sm">Maud Speech Highlights — Akyem (Clean Street Bites)</h4>
                <button onClick={() => setIsVideoModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer">✕</button>
              </div>
              <div className="aspect-video bg-black">
                <video src="https://atlanticcatering-gh.com/wp-content/uploads/2025/10/MAUD-SPEECH-HIGHLIGHTS-AKYEM.mp4" controls autoPlay playsInline className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}


// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { useGSAP } from '@gsap/react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Leaf, Recycle, Droplets, Users, Award, Truck } from 'lucide-react'
// import { smoothScrollTo } from '@/lib/lenis'

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger, useGSAP)
// }

// /**
//  * Sustainability — split-screen dual direction, entirely scroll-driven.
//  *
//  * Mirrors the testimonials architecture:
//  * LEFT stack (content) travels UP
//  * RIGHT stack (visual plates) travels DOWN
//  * while the section is pinned.
//  *
//  * Brand-guide colours only: gold range, accent blue, accent purple,
//  * light green, charcoal.
//  */

// const VISUALS = {
//   farm: '/assets/images/cutouts/fit/testimonial-left.webp',
//   waste: '/assets/images/cutouts/fit/testimonial-right.webp',
//   logistics: '/assets/images/cutouts/fit/testimonial-left-2.webp',
//   water: '/assets/images/cutouts/fit/testimonial-right-2.webp',
//   community: '/assets/images/cutouts/fit/testimonial-left.webp',
//   certified: '/assets/images/cutouts/fit/testimonial-right.webp',
// } as const

// type Theme = {
//   solid: string
//   tint: string
//   accent: string
//   onDark: boolean
// }

// const sustainabilityPillars: {
//   eyebrow: string
//   title: string
//   body: string
//   metric: string
//   metricLabel: string
//   note: string
//   visual: string
//   visualAlt: string
//   icon: React.ReactNode
//   theme: Theme
// }[] = [
//     {
//       eyebrow: 'Local Sourcing',
//       title: 'Grown within 200 km of every site.',
//       body: 'We prioritise Ghanaian farmers and coastal fisheries. Over 70 % of our produce, proteins and staples are sourced within a 200 km radius of each operation, cutting food miles and strengthening local economies.',
//       metric: '70%+',
//       metricLabel: 'Locally sourced',
//       note: 'farm to\nplatform',
//       visual: VISUALS.farm,
//       visualAlt: 'Local Ghanaian produce and proteins',
//       icon: <Leaf className="w-5 h-5" />,
//       theme: { solid: '#cc9933', tint: '#FBF3E3', accent: '#B37B29', onDark: true },
//     },
//     {
//       eyebrow: 'Zero Waste Kitchen',
//       title: 'Nothing leaves the kitchen unused.',
//       body: 'From precise portion planning to full utilisation of trimmings and closed-loop composting, our kitchens operate on a zero-waste protocol. Food waste is measured daily and reported monthly against strict internal targets.',
//       metric: '< 4%',
//       metricLabel: 'Food waste rate',
//       note: 'measured\ndaily',
//       visual: VISUALS.waste,
//       visualAlt: 'Zero-waste kitchen practice',
//       icon: <Recycle className="w-5 h-5" />,
//       theme: { solid: '#296ed6', tint: '#EBF1FC', accent: '#296ed6', onDark: true },
//     },
//     {
//       eyebrow: 'Carbon Conscious Logistics',
//       title: 'Routes planned for the lowest footprint.',
//       body: 'Consolidated deliveries, optimised vessel and vehicle routes, and cold-chain integrity reduce emissions on every transfer. We track Scope 1 & 3 logistics emissions and continuously refine routing models.',
//       metric: '28%',
//       metricLabel: 'Lower logistics CO₂',
//       note: 'smart\nrouting',
//       visual: VISUALS.logistics,
//       visualAlt: 'Optimised logistics and cold chain',
//       icon: <Truck className="w-5 h-5" />,
//       theme: { solid: '#b048b8', tint: '#F8ECFA', accent: '#b048b8', onDark: true },
//     },
//     {
//       eyebrow: 'Water Stewardship',
//       title: 'Every litre accounted for.',
//       body: 'Closed-loop grey-water systems, low-flow equipment and strict monitoring keep water use well below industry averages — critical on offshore platforms and remote camps where freshwater is finite.',
//       metric: '40%',
//       metricLabel: 'Less water per meal',
//       note: 'closed\nloop',
//       visual: VISUALS.water,
//       visualAlt: 'Water stewardship systems',
//       icon: <Droplets className="w-5 h-5" />,
//       theme: { solid: '#1A2330', tint: '#EDEFF3', accent: '#1A2330', onDark: true },
//     },
//     {
//       eyebrow: 'Community Investment',
//       title: 'Skills that stay long after the contract.',
//       body: 'We train local talent in culinary, HSE and logistics disciplines. Apprenticeship programmes and supplier development initiatives create lasting capacity in the communities that host our operations.',
//       metric: '1,200+',
//       metricLabel: 'Local jobs supported',
//       note: 'skills\nthat last',
//       visual: VISUALS.community,
//       visualAlt: 'Community training and local employment',
//       icon: <Users className="w-5 h-5" />,
//       theme: { solid: '#A4D79C', tint: '#F1F8EF', accent: '#3C8B36', onDark: false },
//     },
//     {
//       eyebrow: 'Certified Standards',
//       title: 'Third-party verification, not just claims.',
//       body: 'ISO 14001 Environmental Management, ISO 22000 Food Safety and ISO 45001 Occupational Health & Safety are independently audited every year. Our systems are designed to exceed, not merely meet, the requirements.',
//       metric: '3 × ISO',
//       metricLabel: 'Active certifications',
//       note: 'audited\nyearly',
//       visual: VISUALS.certified,
//       visualAlt: 'ISO certified operations',
//       icon: <Award className="w-5 h-5" />,
//       theme: { solid: '#D4A556', tint: '#FCF5E9', accent: '#B37B29', onDark: false },
//     },
//   ]

// const impactStats = [
//   { value: '70%+', label: 'Local sourcing' },
//   { value: '< 4%', label: 'Food waste' },
//   { value: '3 × ISO', label: 'Certifications' },
// ]

// const TOTAL = sustainabilityPillars.length
// const PANELS = TOTAL + 1
// const STEPS = PANELS - 1
// const TRAVEL = (STEPS / PANELS) * 100
// const VH_PER_STEP = 0.85

// function QuoteMark({
//   className = '',
//   color = '#cc9933',
// }: {
//   className?: string
//   color?: string
// }) {
//   return (
//     <div
//       className={`inline-flex items-center justify-center rounded-full text-white ${className}`}
//       style={{ background: color }}
//     >
//       <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.827-4.725 6.51h4.725V21h-9.978zm-11.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-4.76 2.824-4.722 6.505h4.722V21H3z" />
//       </svg>
//     </div>
//   )
// }

// function CurvedArrow({
//   color,
//   flip = false,
//   className = '',
// }: {
//   color: string
//   flip?: boolean
//   className?: string
// }) {
//   return (
//     <svg
//       width="72"
//       height="58"
//       viewBox="0 0 80 62"
//       fill="none"
//       className={className}
//       style={flip ? { transform: 'scaleX(-1)' } : undefined}
//       aria-hidden="true"
//     >
//       <path
//         d="M8 6 C26 20 48 40 68 55"
//         stroke={color}
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         fill="none"
//       />
//       <path
//         d="M57 53 L71 57 L66 44"
//         stroke={color}
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//     </svg>
//   )
// }

// export default function SustainabilitySection() {
//   const [reduced, setReduced] = useState(false)
//   const sectionRef = useRef<HTMLElement>(null)
//   const leftColRef = useRef<HTMLDivElement>(null)
//   const rightColRef = useRef<HTMLDivElement>(null)
//   const progressRef = useRef<HTMLSpanElement>(null)
//   const triggerRef = useRef<ScrollTrigger | null>(null)

//   useEffect(() => {
//     const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
//     const sync = () => setReduced(mq.matches)
//     sync()
//     mq.addEventListener('change', sync)
//     return () => mq.removeEventListener('change', sync)
//   }, [])

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia()

//       mm.add(
//         '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
//         () => {
//           if (!leftColRef.current || !rightColRef.current) return

//           const tl = gsap.timeline({
//             scrollTrigger: {
//               id: 'sustainability-split',
//               trigger: sectionRef.current,
//               start: 'top top',
//               end: () => '+=' + window.innerHeight * STEPS * VH_PER_STEP,
//               pin: true,
//               scrub: 1,
//               anticipatePin: 1,
//               invalidateOnRefresh: true,
//             },
//           })

//           triggerRef.current = tl.scrollTrigger ?? null

//           // LEFT — content climbs
//           tl.fromTo(
//             leftColRef.current,
//             { y: 0, yPercent: 0 },
//             { yPercent: -TRAVEL, ease: 'none', duration: 1 },
//             0
//           )

//           // RIGHT — visuals descend
//           tl.fromTo(
//             rightColRef.current,
//             { y: 0, yPercent: -TRAVEL },
//             { y: 0, yPercent: 0, ease: 'none', duration: 1 },
//             0
//           )

//           if (progressRef.current) {
//             gsap.set(progressRef.current, { transformOrigin: 'left center' })
//             tl.fromTo(
//               progressRef.current,
//               { scaleX: 0 },
//               { scaleX: 1, ease: 'none', duration: 1 },
//               0
//             )
//           }

//           const drift = gsap.to('.sust-drift', {
//             y: -14,
//             duration: 4,
//             ease: 'sine.inOut',
//             yoyo: true,
//             repeat: -1,
//             stagger: 0.35,
//           })

//           return () => {
//             drift.kill()
//             triggerRef.current = null
//           }
//         }
//       )

//       return () => mm.revert()
//     },
//     { scope: sectionRef }
//   )

//   useGSAP(
//     () => {
//       gsap.from('.sust-reveal', {
//         opacity: 0,
//         y: 34,
//         duration: 0.85,
//         ease: 'power3.out',
//         stagger: 0.12,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: 'top 78%',
//           once: true,
//         },
//       })
//     },
//     { scope: sectionRef }
//   )

//   useEffect(() => {
//     const id = window.setTimeout(() => ScrollTrigger.refresh(), 350)
//     return () => window.clearTimeout(id)
//   }, [reduced])

//   const goToPillar = (i: number) => {
//     const st = triggerRef.current
//     if (!st) return
//     smoothScrollTo(st.start + (st.end - st.start) * (i / STEPS))
//   }

//   const useSplit = !reduced
//   const panelHeight = `${100 / PANELS}%`

//   const dotRow = (current: number, accent: string) => (
//     <div className="flex items-center gap-3">
//       <div className="flex items-center gap-2">
//         {sustainabilityPillars.map((item, i) => (
//           <button
//             key={item.eyebrow}
//             type="button"
//             onClick={() => goToPillar(i)}
//             aria-label={`Scroll to ${item.eyebrow}`}
//             aria-current={i === current}
//             className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
//             style={{
//               width: i === current ? 30 : 8,
//               height: 8,
//               background: i === current ? accent : 'rgba(26,26,26,0.18)',
//             }}
//           />
//         ))}
//       </div>
//       <span className="font-outfit text-[11px] font-bold tracking-[0.2em] text-[#1a1a1a]/45">
//         {String(current + 1).padStart(2, '0')} /{' '}
//         {String(TOTAL).padStart(2, '0')}
//       </span>
//     </div>
//   )

//   const impactBar = (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//       <div className="flex gap-1 text-white bg-[#cc9933] px-3 py-2 rounded-md shrink-0">
//         <Leaf className="w-4 h-4" />
//         <Leaf className="w-4 h-4" />
//         <Leaf className="w-4 h-4" />
//       </div>
//       <p className="text-[#1a1a1a] font-outfit text-sm font-semibold tracking-wide">
//         <span className="underline decoration-black decoration-1 underline-offset-4">
//           Measured impact
//         </span>{' '}
//         across every offshore platform, camp and corporate site.
//       </p>
//     </div>
//   )

//   const promisePanel = (
//     <>
//       <span className="text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.3em]">
//         Our Commitment
//       </span>
//       <h3 className="text-3xl xl:text-5xl font-black text-[#1a1a1a] font-outfit mt-4 leading-[1.05]">
//         Sustainability without
//         <br className="hidden lg:block" /> compromise.
//       </h3>
//       <p className="text-[#1a1a1a]/60 font-outfit mt-6 max-w-md leading-relaxed">
//         From the kitchen to the vessel, every decision is measured against
//         environmental, social and governance criteria — because the standard we
//         set for hospitality is the same standard we set for the planet.
//       </p>
//       <div className="mt-9 grid grid-cols-3 gap-4 lg:gap-6 max-w-lg">
//         {impactStats.map((stat) => (
//           <div key={stat.label} className="border-t border-[#1a1a1a]/15 pt-4">
//             <p className="text-lg xl:text-3xl font-black text-[#1a1a1a] font-outfit tracking-tight">
//               {stat.value}
//             </p>
//             <p className="text-[10px] xl:text-[11px] text-[#1a1a1a]/45 font-outfit font-semibold uppercase tracking-[0.13em] mt-1.5">
//               {stat.label}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="mt-10 max-w-xl">{impactBar}</div>
//     </>
//   )

//   /** Right stack is reversed so pairs stay in sync while descending. */
//   const rightPanels = [
//     // Closing collage
//     <div
//       key="collage"
//       className="w-full shrink-0 bg-[#F9F6F0] relative flex items-center justify-center overflow-hidden"
//       style={{ height: panelHeight }}
//     >
//       <div
//         className="absolute inset-0 opacity-40 pointer-events-none"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)',
//           backgroundSize: '30px 30px',
//         }}
//       />
//       <div className="relative z-10 w-full h-full">
//         <div className="sust-drift absolute left-[6%] top-[14%] w-[52%]">
//           <div className="absolute -inset-6 rounded-full bg-[#cc9933]/10 blur-2xl" />
//           <img
//             src={VISUALS.farm}
//             alt="Local produce"
//             className="relative w-full h-auto drop-shadow-2xl"
//             draggable={false}
//           />
//         </div>
//         <div className="sust-drift absolute right-[5%] top-[34%] w-[46%]">
//           <div className="absolute -inset-6 rounded-full bg-[#296ed6]/10 blur-2xl" />
//           <img
//             src={VISUALS.waste}
//             alt="Zero waste"
//             className="relative w-full h-auto drop-shadow-2xl"
//             draggable={false}
//           />
//         </div>
//         <div className="sust-drift absolute left-[16%] bottom-[8%] w-[40%]">
//           <img
//             src={VISUALS.water}
//             alt="Water stewardship"
//             className="relative w-full h-auto drop-shadow-2xl"
//             draggable={false}
//           />
//         </div>
//         <div className="absolute right-[8%] bottom-[16%] flex flex-col items-center">
//           <span
//             className="font-serif text-[15px] text-[#cc9933] font-semibold leading-tight text-center whitespace-pre-line"
//             style={{ fontStyle: 'italic' }}
//           >
//             {'measured on\nevery site'}
//           </span>
//           <CurvedArrow color="#cc9933" flip className="mt-1" />
//         </div>
//       </div>
//     </div>,

//     // Visual panels (reversed)
//     ...sustainabilityPillars
//       .map((item, i) => {
//         const ink = item.theme.onDark ? '#ffffff' : '#1a1a1a'
//         const ring = item.theme.onDark
//           ? 'rgba(255,255,255,0.38)'
//           : 'rgba(26,26,26,0.22)'

//         return (
//           <div
//             key={item.eyebrow}
//             className="w-full shrink-0 relative flex items-center justify-center overflow-hidden"
//             style={{ height: panelHeight, background: item.theme.solid }}
//           >
//             <div
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 opacity: item.theme.onDark ? 0.13 : 0.18,
//                 backgroundImage: `radial-gradient(circle at center, ${item.theme.onDark
//                     ? 'rgba(255,255,255,0.85)'
//                     : 'rgba(26,26,26,0.6)'
//                   } 1px, transparent 1px)`,
//                 backgroundSize: '28px 28px',
//               }}
//             />
//             <div className="relative z-10 w-[70%] max-w-[430px] aspect-square flex items-center justify-center">
//               <div
//                 className="absolute inset-0 rounded-full border"
//                 style={{ borderColor: ring }}
//               />
//               <div
//                 className="absolute inset-[-9%] rounded-full border"
//                 style={{ borderColor: ring, opacity: 0.55 }}
//               />
//               <img
//                 src={item.visual}
//                 alt={item.visualAlt}
//                 className="sust-drift relative w-[92%] h-auto drop-shadow-2xl"
//                 draggable={false}
//               />
//             </div>
//             <div
//               className={`absolute z-20 flex flex-col top-[13%] ${i % 2 === 0 ? 'left-[7%] items-start' : 'right-[7%] items-end'
//                 }`}
//             >
//               <span
//                 className="font-serif text-[15px] xl:text-base font-semibold leading-tight whitespace-pre-line"
//                 style={{ fontStyle: 'italic', color: ink }}
//               >
//                 {item.note}
//               </span>
//               <CurvedArrow color={ink} flip={i % 2 === 1} className="mt-1" />
//             </div>
//             <span
//               className="absolute bottom-[9%] right-[8%] z-20 font-outfit text-[11px] font-bold tracking-[0.24em]"
//               style={{ color: ink, opacity: 0.6 }}
//             >
//               {String(i + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
//             </span>
//           </div>
//         )
//       })
//       .reverse(),
//   ]

//   return (
//     <section
//       ref={sectionRef}
//       className={`relative w-full bg-white select-none ${useSplit ? 'lg:h-screen lg:overflow-hidden' : ''
//         }`}
//     >
//       {/* ================================================================
//           DESKTOP — DUAL-DIRECTION SPLIT SCREEN
//           ================================================================ */}
//       {useSplit && (
//         <div className="hidden lg:flex absolute inset-0 w-full h-full overflow-hidden">
//           {/* ------------------- LEFT STACK — travels up ------------------ */}
//           <div className="relative w-[55%] h-full overflow-hidden border-r border-[#1a1a1a]/10">
//             <div
//               ref={leftColRef}
//               className="w-full flex flex-col will-change-transform"
//               style={{ height: `${PANELS * 100}%` }}
//             >
//               {sustainabilityPillars.map((item, i) => (
//                 <div
//                   key={item.eyebrow}
//                   className="w-full shrink-0 flex flex-col justify-center px-14 xl:px-20 py-16"
//                   style={{ height: panelHeight, background: item.theme.tint }}
//                 >
//                   <div className={i === 0 ? 'sust-reveal' : undefined}>
//                     <span
//                       className="flex items-center gap-2 font-outfit text-xs font-extrabold uppercase tracking-[0.3em]"
//                       style={{ color: item.theme.accent }}
//                     >
//                       {item.icon}
//                       {item.eyebrow}
//                     </span>
//                     <span
//                       className="mt-3 block w-14 h-[2px]"
//                       style={{ background: item.theme.accent }}
//                     />
//                   </div>

//                   {i === 0 && (
//                     <h2 className="sust-reveal text-4xl xl:text-[3.2rem] font-black text-[#1a1a1a] font-outfit tracking-tight leading-[0.95] mt-6">
//                       How We Operate Sustainably
//                     </h2>
//                   )}

//                   <QuoteMark
//                     className={`w-12 h-12 mt-8 mb-6 ${i === 0 ? 'sust-reveal' : ''}`}
//                     color={item.theme.accent}
//                   />

//                   <div className={i === 0 ? 'sust-reveal' : undefined}>
//                     <h3 className="text-xl xl:text-[1.65rem] text-[#1a1a1a] font-black leading-snug max-w-2xl">
//                       {item.title}
//                     </h3>
//                     <p className="mt-5 text-[#1a1a1a]/70 font-outfit text-base leading-relaxed max-w-xl">
//                       {item.body}
//                     </p>

//                     <div className="mt-8 flex items-end gap-6">
//                       <div>
//                         <p
//                           className="text-3xl xl:text-4xl font-black font-outfit tracking-tight"
//                           style={{ color: item.theme.accent }}
//                         >
//                           {item.metric}
//                         </p>
//                         <p className="text-[11px] text-[#1a1a1a]/50 font-semibold mt-1 tracking-[0.15em] uppercase font-outfit">
//                           {item.metricLabel}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`mt-9 ${i === 0 ? 'sust-reveal' : ''}`}>
//                     {dotRow(i, item.theme.accent)}
//                   </div>
//                 </div>
//               ))}

//               {/* Closing panel */}
//               <div
//                 className="w-full shrink-0 bg-white flex flex-col justify-center px-14 xl:px-20 py-14 relative overflow-hidden"
//                 style={{ height: panelHeight }}
//               >
//                 <div
//                   className="absolute inset-0 opacity-[0.35] pointer-events-none"
//                   style={{
//                     backgroundImage:
//                       'radial-gradient(circle at center, rgba(26,26,26,0.14) 1px, transparent 1px)',
//                     backgroundSize: '28px 28px',
//                   }}
//                 />
//                 <div className="relative z-10 max-w-xl">{promisePanel}</div>
//               </div>
//             </div>

//             {/* Progress rail */}
//             <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#1a1a1a]/10 z-30">
//               <span
//                 ref={progressRef}
//                 className="block h-full w-full bg-[#cc9933] origin-left scale-x-0"
//               />
//             </span>
//           </div>

//           {/* ----------------- RIGHT STACK — travels down ----------------- */}
//           <div className="relative w-[45%] h-full overflow-hidden">
//             <div
//               ref={rightColRef}
//               className="w-full flex flex-col will-change-transform"
//               style={{
//                 height: `${PANELS * 100}%`,
//                 transform: `translateY(-${TRAVEL}%)`,
//               }}
//             >
//               {rightPanels}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================================================================
//           MOBILE / REDUCED MOTION — EVERY PILLAR IN THE FLOW
//           ================================================================ */}
//       <div className={useSplit ? 'lg:hidden' : ''}>
//         <div className="px-6 pt-16 pb-8">
//           <span className="sust-reveal block text-[#cc9933] font-outfit text-xs font-extrabold uppercase tracking-[0.28em]">
//             Sustainability
//           </span>
//           <span className="sust-reveal mt-3 block w-14 h-[2px] bg-[#cc9933]" />
//           <h2 className="sust-reveal text-3xl sm:text-4xl font-black text-[#1a1a1a] font-outfit tracking-tight leading-tight mt-4">
//             How We Operate Sustainably
//           </h2>
//         </div>

//         {sustainabilityPillars.map((item, i) => {
//           const ink = item.theme.onDark ? '#ffffff' : '#1a1a1a'
//           const ring = item.theme.onDark
//             ? 'rgba(255,255,255,0.38)'
//             : 'rgba(26,26,26,0.22)'

//           return (
//             <div
//               key={item.eyebrow}
//               className="relative overflow-hidden"
//               style={{ background: item.theme.solid }}
//             >
//               <div
//                 className="absolute inset-0 pointer-events-none"
//                 style={{
//                   opacity: item.theme.onDark ? 0.13 : 0.18,
//                   backgroundImage: `radial-gradient(circle, ${item.theme.onDark
//                       ? 'rgba(255,255,255,0.9)'
//                       : 'rgba(26,26,26,0.6)'
//                     } 1px, transparent 1px)`,
//                   backgroundSize: '26px 26px',
//                 }}
//               />
//               <div className="relative z-10 px-6 py-12">
//                 <div className="flex items-center justify-between mb-8">
//                   <div
//                     className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
//                     style={{
//                       background: item.theme.onDark
//                         ? 'rgba(255,255,255,0.15)'
//                         : 'rgba(26,26,26,0.08)',
//                       color: ink,
//                     }}
//                   >
//                     {item.icon}
//                     {item.eyebrow}
//                   </div>
//                   <span
//                     className="font-outfit text-[11px] font-bold tracking-[0.2em]"
//                     style={{ color: ink, opacity: 0.6 }}
//                   >
//                     {String(i + 1).padStart(2, '0')} /{' '}
//                     {String(TOTAL).padStart(2, '0')}
//                   </span>
//                 </div>

//                 <div className="relative mx-auto mb-8 w-[62vw] max-w-[280px] aspect-square flex items-center justify-center">
//                   <div
//                     className="absolute inset-0 rounded-full border"
//                     style={{ borderColor: ring }}
//                   />
//                   <div
//                     className="absolute inset-[-8%] rounded-full border"
//                     style={{ borderColor: ring, opacity: 0.55 }}
//                   />
//                   <img
//                     src={item.visual}
//                     alt={item.visualAlt}
//                     className="relative w-[92%] h-auto drop-shadow-2xl"
//                     draggable={false}
//                   />
//                 </div>

//                 <h3
//                   className="text-xl sm:text-2xl font-black leading-snug"
//                   style={{ color: ink }}
//                 >
//                   {item.title}
//                 </h3>
//                 <p
//                   className="mt-4 text-sm sm:text-base leading-relaxed"
//                   style={{ color: ink, opacity: 0.85 }}
//                 >
//                   {item.body}
//                 </p>

//                 <div className="mt-6">
//                   <p
//                     className="text-2xl font-black font-outfit"
//                     style={{ color: ink }}
//                   >
//                     {item.metric}
//                   </p>
//                   <p
//                     className="text-[11px] font-semibold mt-1 tracking-[0.15em] uppercase font-outfit"
//                     style={{ color: ink, opacity: 0.7 }}
//                   >
//                     {item.metricLabel}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )
//         })}

//         {/* Promise */}
//         <div className="relative bg-white px-6 py-14 overflow-hidden">
//           <div
//             className="absolute inset-0 opacity-[0.35] pointer-events-none"
//             style={{
//               backgroundImage:
//                 'radial-gradient(circle, rgba(26,26,26,0.14) 1px, transparent 1px)',
//               backgroundSize: '26px 26px',
//             }}
//           />
//           <div className="relative z-10">{promisePanel}</div>
//         </div>

//         {/* Collage */}
//         <div className="relative bg-[#F9F6F0] py-14 overflow-hidden">
//           <div
//             className="absolute inset-0 opacity-40 pointer-events-none"
//             style={{
//               backgroundImage:
//                 'radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)',
//               backgroundSize: '26px 26px',
//             }}
//           />
//           <div className="relative z-10 px-6 grid grid-cols-3 gap-3 items-center">
//             <img
//               src={VISUALS.farm}
//               alt="Local produce"
//               className="w-full h-auto drop-shadow-xl"
//               draggable={false}
//             />
//             <img
//               src={VISUALS.waste}
//               alt="Zero waste"
//               className="w-full h-auto drop-shadow-xl"
//               draggable={false}
//             />
//             <img
//               src={VISUALS.water}
//               alt="Water stewardship"
//               className="w-full h-auto drop-shadow-xl"
//               draggable={false}
//             />
//           </div>
//           <p
//             className="relative z-10 mt-6 text-center font-serif text-[15px] text-[#cc9933] font-semibold"
//             style={{ fontStyle: 'italic' }}
//           >
//             measured on every site
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }