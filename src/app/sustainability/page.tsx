'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Leaf, 
  Users, 
  Scale, 
  Zap, 
  Package, 
  Recycle, 
  Wheat,
  Briefcase,
  Target,
  ShieldAlert,
  Globe2,
  BarChart,
  HeartHandshake,
  Search,
  FileText,
  Megaphone,
  CheckCircle2,
  Download,
  Flame,
  FileDown,
  Play,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'

// Import GSAP
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register ScrollTrigger inside useGSAP hook or conditionally to support SSR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Projects data for interactive Carousel
const projects = [
  {
    id: 1,
    title: "Clean Street Bites Initiative",
    tag: "Active Project",
    tagColor: "bg-green/10 text-green-700 border-green-200/50",
    dotColor: "bg-green",
    desc: "Provides training and certifications to street food vendors in hygiene, food safety, and business operations across Ghana.",
    longDesc: "By investing in street vendors, we prevent food-borne illnesses, uplift local entrepreneurs, and encourage safe cooking practices across regional communities. The initiative's activities have been held in various locations throughout Ghana.",
    video: "https://atlanticcatering-gh.com/wp-content/uploads/2025/10/MAUD-SPEECH-HIGHLIGHTS-AKYEM.mp4",
    youtube: "https://www.youtube.com/watch?v=4BfKFCOCJe8",
    hasVideo: true,
    dish: "/assets/images/dishes/dish1.png"
  },
  {
    id: 2,
    title: "Palm Prosperity Project",
    tag: "In Development",
    tagColor: "bg-amber-500/10 text-amber-700 border-amber-200/50",
    dotColor: "bg-amber-500",
    desc: "Sustainable palm oil value chain development supporting smallholder farmers with technical training, resources, and market access.",
    longDesc: "We partner with local smallholder farmers to provide them with agricultural resources, sustainable harvesting techniques, and guaranteed market channels, ensuring ethical palm oil sourcing.",
    hasVideo: false,
    dish: "/assets/images/dishes/dish4.png"
  },
  {
    id: 3,
    title: "Women Empowerment Project",
    tag: "In Development",
    tagColor: "bg-teal-500/10 text-teal-700 border-teal-200/50",
    dotColor: "bg-teal-500",
    desc: "Skills training, financial literacy, and enterprise development for women entrepreneurs in rural and peri-urban communities.",
    longDesc: "We provide structured mentorship, micro-business grants, and financial literacy training programs to women-led cooperatives, bolstering local economies and supporting SDG 5.",
    hasVideo: false,
    dish: "/assets/images/dishes/dish6.png"
  },
  {
    id: 4,
    title: "Waste-to-Soap Initiative",
    tag: "Active Project",
    tagColor: "bg-green/10 text-green-700 border-green-200/50",
    dotColor: "bg-green",
    desc: "Used cooking oil collected from all operational kitchens is converted into hygienic, local soap products through community partnerships.",
    longDesc: "This circular economy initiative allows us to turn what would be liquid kitchen waste into useful community hygiene products, mitigating waste footprint while improving local hygiene standards.",
    hasVideo: false,
    dish: "/assets/images/dishes/dish3.png"
  }
]

export default function SustainabilityPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // Scope reference for GSAP selector
  const mainRef = useRef<HTMLDivElement>(null)

  // GSAP Animations
  useGSAP(() => {
    // 1. Hero Reveal Animations
    gsap.fromTo('.gsap-hero-title span', 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
    )
    
    gsap.fromTo('.gsap-hero-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    )

    gsap.fromTo('.gsap-hero-dish-left',
      { x: -100, rotate: -30, opacity: 0 },
      { x: 0, rotate: 0, opacity: 0.4, duration: 1.5, delay: 0.2, ease: 'power2.out' }
    )

    gsap.fromTo('.gsap-hero-dish-right',
      { x: 100, rotate: 30, opacity: 0 },
      { x: 0, rotate: 0, opacity: 0.4, duration: 1.5, delay: 0.3, ease: 'power2.out' }
    )

    // 2. Parallax Scroll Trigger for Hero Dishes
    gsap.to('.gsap-hero-dish-left', {
      y: 120,
      rotate: 20,
      scrollTrigger: {
        trigger: '.gsap-hero-trigger',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to('.gsap-hero-dish-right', {
      y: -80,
      rotate: -15,
      scrollTrigger: {
        trigger: '.gsap-hero-trigger',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    // 3. Parallax scroll triggers for watermark dishes in sections
    gsap.to('.gsap-watermark-jollof', {
      y: -100,
      rotate: 30,
      scrollTrigger: {
        trigger: '.gsap-esg-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to('.gsap-watermark-seafood', {
      y: -80,
      rotate: -20,
      scrollTrigger: {
        trigger: '.gsap-environmental-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to('.gsap-watermark-social', {
      y: -60,
      rotate: 15,
      scrollTrigger: {
        trigger: '.gsap-social-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to('.gsap-watermark-governance', {
      y: -80,
      rotate: -15,
      scrollTrigger: {
        trigger: '.gsap-governance-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })

    // 4. Parallax Background for Mid-Page Quote Banner
    gsap.to('.gsap-banner-bg', {
      yPercent: 20,
      scrollTrigger: {
        trigger: '.gsap-banner-trigger',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    // 5. Scroll Reveals for all major Sections (GSAP transitions)
    const sections = gsap.utils.toArray('.gsap-reveal-section')
    sections.forEach((section: any) => {
      const header = section.querySelector('.gsap-reveal-header')
      const gridItems = section.querySelectorAll('.gsap-reveal-item')

      if (header) {
        gsap.fromTo(header,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      if (gridItems.length > 0) {
        gsap.fromTo(gridItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })
  }, { scope: mainRef })

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div ref={mainRef}>
      <main className="w-full min-h-screen text-slate-800 bg-white relative overflow-hidden">
        
        {/* ── Parallax Hero Section (GSAP Handled) ── */}
        <section 
          className="gsap-hero-trigger relative w-full px-6 md:px-12 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden text-white transition-colors duration-300 min-h-[90vh] flex items-center justify-center"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/images/premium-green-texture.png')" }}
          />
          <div className="absolute inset-0 bg-[#134E4A] mix-blend-multiply opacity-90 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
          
          {/* Floating dishes inside Hero with GSAP Parallax */}
          <div className="gsap-hero-dish-left absolute left-10 md:left-20 top-20 z-10 w-[180px] h-[180px] md:w-[260px] md:h-[260px] opacity-25 lg:opacity-40 pointer-events-none select-none hidden lg:block cursor-grab active:cursor-grabbing">
            <Image
              src="/assets/images/dishes/dish1.png"
              alt="Premium Culinary Dish"
              fill
              className="object-contain"
            />
          </div>

          <div className="gsap-hero-dish-right absolute right-10 md:right-20 bottom-16 z-10 w-[180px] h-[180px] md:w-[260px] md:h-[260px] opacity-25 lg:opacity-40 pointer-events-none select-none hidden lg:block">
            <Image
              src="/assets/images/dishes/dish4.png"
              alt="Premium Culinary Roast"
              fill
              className="object-contain"
            />
          </div>

          {/* Hero Content container */}
          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-20">
            <span className="gsap-hero-sub text-[10px] md:text-sm font-bold text-[#EF9419] uppercase tracking-[0.35em] mb-2 block">
              ISO 22000 · 14001 · 45001 Certified
            </span>

            <h1 className="gsap-hero-title font-extrabold uppercase leading-[1.1] tracking-tighter m-0 text-center">
              <span className="block overflow-hidden py-1">
                <span className="block text-[12vw] sm:text-[9vw] md:text-[7vw] lg:text-[6rem] text-white">
                  Sustainably
                </span>
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

        {/* ── Stat Strip Section (Overlapping) ── */}
        <section className="relative z-30 -mt-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-1 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 p-2 md:p-0">
              <div className="bg-white p-6 text-center">
                <span className="block text-3xl md:text-5xl font-black text-green mb-1">3</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">ISO Certifications</span>
              </div>
              <div className="bg-white p-6 text-center border-l border-slate-100">
                <span className="block text-3xl md:text-5xl font-black text-green mb-1">16</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Regions Engaged</span>
              </div>
              <div className="bg-white p-6 text-center border-l border-slate-100">
                <span className="block text-3xl md:text-5xl font-black text-green mb-1">100<span className="text-2xl">%</span></span>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Biodegradable Packaging</span>
              </div>
              <div className="bg-white p-6 text-center border-l border-slate-100">
                <span className="block text-3xl md:text-5xl font-black text-[#EF9419] mb-1">#1</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Ghana Club 100 Hospitality</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ESG Pillars Section (Subtle Warm Off-White / Alabaster Background) ── */}
        <section className="gsap-esg-section gsap-reveal-section relative w-full bg-[#FAF9F6] px-6 md:px-12 py-20 md:py-32 overflow-hidden">
          {/* Subtle Grid blueprint overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          {/* Subtle background watermarks (Jollof Rice with GSAP Parallax) */}
          <div className="gsap-watermark-jollof absolute -left-24 top-[35%] z-0 w-[320px] h-[320px] md:w-[450px] md:h-[450px] opacity-[0.25] md:opacity-[0.4] pointer-events-none select-none hidden lg:block">
            <Image
              src="/assets/images/dishes/dish6.png"
              alt="Ghanaian Jollof Rice"
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            
            {/* ESG Commitment Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
              <div className="lg:col-span-6 space-y-6 gsap-reveal-header">
                <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Our ESG Commitment</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Driving Sustainable &amp; Equitable Futures
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  Integrating ISO-certified standards into all facets of our operations, we pledge to foster sustainable, equitable and healthy communities through our Integrated Management Systems and Community Engagement Programs.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Our commitment to exemplary environmental, social and governance (ESG) performance is deeply embedded in our business ethos. This dedication shapes how we manage operations, collaborate with stakeholders and openly communicate our progress, ensuring a holistic approach to responsible corporate practices.
                </p>
              </div>
              <div className="lg:col-span-6 gsap-reveal-item">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 aspect-square max-w-md mx-auto bg-slate-100 group">
                  <img 
                    src="https://agiscapital.com/wp-content/uploads/2020/06/esg-figure-still-1024x1024.jpg" 
                    alt="ESG Framework Diagram" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal-header">
              <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Our Framework</span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 mt-4 mb-6 tracking-tight">ESG at a Glance</h3>
              <p className="text-sm text-slate-600">
                Explore the core pillars underpinning our daily practices.
              </p>
            </div>

            {/* Organized Grid Design for ESG Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Environmental */}
              <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-green/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-green/10 flex items-center justify-center text-green mb-6">
                  <Leaf size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Environmental</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  Minimizing lifecycle impacts, optimizing energy with extractors, using 100% biodegradable materials, and processing used cooking oil into soap.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <span className="block text-2xl font-black text-green">85%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Waste Diverted</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-green">100%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Biodegradable</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Social</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  Outstanding workspace culture, competitive benefits, complete safety certifications, regional vendor training, and complete equality.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <span className="block text-2xl font-black text-blue-600">500+</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Employees</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-blue-600">16</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Regions Reached</span>
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                  <Scale size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Governance</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  Strict adherence to Code of Business Ethics, full investor transparency, and secure whistleblowing lines managed by a transparent third party.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <span className="block text-2xl font-black text-amber-600">100%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Ethics Compliance</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-amber-600">24/7</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Anonymous Channels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Environmental Stewardship Section (Pure White Background with Soft Gradient Accents) ── */}
        <section className="gsap-environmental-section gsap-reveal-section relative w-full bg-white px-6 md:px-12 py-20 md:py-32 overflow-hidden">
          {/* Subtle radial green glow in background */}
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-green/5 blur-3xl pointer-events-none z-0" />
          
          {/* Subtle background watermarks (Seafood Platter) */}
          <div className="gsap-watermark-seafood absolute -right-24 bottom-[10%] z-0 w-[320px] h-[320px] md:w-[450px] md:h-[450px] opacity-[0.25] md:opacity-[0.4] pointer-events-none select-none hidden lg:block">
            <Image
              src="/assets/images/dishes/dish3.png"
              alt="Gourmet Seafood"
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7 space-y-6 gsap-reveal-header">
                <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Environmental Stewardship</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Our Environment, Our Future
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  At the heart of our operations lies a firm commitment to environmental stewardship. We understand our responsibility to minimize the impact of our business on energy, carbon, water, noise and waste.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We actively pursue initiatives to reduce environmental impacts throughout the entire life cycle of our operations, adopting forward-thinking solutions that preserve natural resources for generations to come.
                </p>
              </div>
              
              {/* Responsible Sourcing Guide Download Card */}
              <div className="lg:col-span-5 gsap-reveal-item">
                <div className="bg-gradient-to-br from-green to-[#134E4A] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
                    <Leaf size={250} />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-green-light mb-6">
                    <FileDown size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Responsible Sourcing</h4>
                  <p className="text-xs text-white/80 leading-relaxed mb-6">
                    We adhere to a comprehensive guide prioritizing fresh, local, and seasonal produce, maintaining ethical business relationships, and reducing environmental footprints.
                  </p>
                  <a 
                    href="https://atlanticcatering-gh.com/wp-content/uploads/2024/06/NEW-RESPONSIBLE-SOURCING-ACLL.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-green hover:bg-slate-100 font-bold text-xs px-6 py-3 rounded-full transition-colors shadow-md"
                  >
                    <Download size={14} />
                    Download Sourcing Guide
                  </a>
                </div>
              </div>
            </div>

            {/* Sustainable Practices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="gsap-reveal-item bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <h4 className="font-extrabold text-slate-800">Energy Efficient Equipment</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  As stewards of the environment, we invest in energy-efficient equipment to optimize resource utilization. In our kitchens, we have implemented custom heat extractors to significantly reduce energy consumption and maintain a comfortable working environment for our staff.
                </p>
              </div>

              <div className="gsap-reveal-item bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Flame size={20} />
                  </div>
                  <h4 className="font-extrabold text-slate-800">Safety Trainings &amp; Drills</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  Our staff undergoes comprehensive training on the proper use of fire extinguishers and regulators, ensuring both safety and sustainability. By actively pursuing initiatives to reduce environmental impacts, we protect our staff, property, and local environment.
                </p>
              </div>

              <div className="gsap-reveal-item bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green/10 text-green flex items-center justify-center">
                    <Package size={20} />
                  </div>
                  <h4 className="font-extrabold text-slate-800">Eco Friendly Packaging</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  We prioritize eco-friendly packaging and biodegradable materials at Atlantic Catering &amp; Logistics, completely eliminating single-use plastics across our operations to build a sustainable, green path forward.
                </p>
              </div>

              <div className="gsap-reveal-item bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-teal-600/10 text-teal-600 flex items-center justify-center">
                    <Recycle size={20} />
                  </div>
                  <h4 className="font-extrabold text-slate-800">Waste Management</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  Proper waste management is a priority, covering both solid and liquid wastes. Liquid waste, such as used cooking oil, is responsibly disposed of through partnerships that convert it into soap. Solid waste is systematically segregated and recycled.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Mid-Page Parallax Banner Section (GSAP Handled) ── */}
        <section 
          className="gsap-banner-trigger relative w-full py-32 md:py-48 overflow-hidden text-center text-white"
        >
          {/* GSAP Parallax background image */}
          <div 
            className="gsap-banner-bg absolute inset-0 z-0 bg-cover bg-center -top-[20%] h-[140%]"
            style={{ 
              backgroundImage: "url('/images/premium-green-texture.png')"
            }}
          />
          <div className="absolute inset-0 bg-[#0f3d3a]/90 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
            <Sparkles className="w-8 h-8 text-[#EF9419] mx-auto animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              Driving Ghana's Sustainable Future
            </h2>
            <p className="text-sm md:text-lg text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
              "By embedding SDGs directly into our commercial logic, we create shared value that uplifts communities, protects biodiversity, and safeguards rights across all 16 regions."
            </p>
            <div className="w-16 h-1 bg-[#EF9419] mx-auto rounded-full mt-4"></div>
          </div>
        </section>

        {/* ── Social Responsibility Section (Warm Stone / Gray-Beige Background) ── */}
        <section className="gsap-social-section gsap-reveal-section relative w-full bg-[#F5F5F4] px-6 md:px-12 py-20 md:py-32 overflow-hidden">
          {/* Subtle Grid blueprint overlay */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          {/* Floating Culinary Dish with GSAP Parallax */}
          <div className="gsap-watermark-social absolute left-8 bottom-[20%] z-0 w-[240px] h-[240px] opacity-[0.25] md:opacity-[0.35] pointer-events-none select-none hidden lg:block">
            <Image
              src="/assets/images/dishes/dish1.png"
              alt="Culinary Dish"
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            
            <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal-header">
              <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Social Responsibility</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-4 mb-6 tracking-tight">
                Caring for People &amp; Communities
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                At the core of our company lies a steadfast commitment to social responsibility. Understanding the significance of people, we take pride in nurturing an exceptional work culture.
              </p>
            </div>

            {/* Social Hero Image */}
            <div className="gsap-reveal-item relative rounded-3xl overflow-hidden shadow-2xl mb-16 aspect-[16/9] w-full max-h-[480px] group">
              <img 
                src="https://www.thegivingmachine.co.uk/media/zhcdx4g0/corporate-social-responsibility.png?anchor=center&mode=crop&width=800&height=600&rnd=132787859429100000&format=webp" 
                alt="Social Responsibility Theme" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <p className="text-white text-sm md:text-lg font-semibold max-w-xl">
                  "We take pride in being an exemplary employer to our workforce and a supportive partner to our communities across all 16 regions."
                </p>
              </div>
            </div>

            {/* Structured Two Column Layout: Detailed Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                
                <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="text-green" size={24} />
                    <h3 className="text-lg font-bold text-slate-800">Compensation and Benefits</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    We understand that hiring and retaining the best talent starts with creating a safe, inspiring workplace. We offer highly competitive compensation and benefits including paid sick, maternity, and annual leave, retirement plans, medical insurance, daily breakfast and lunch packages, and performance rewards. We empower employees to feel and act like owners.
                  </p>
                </div>

                <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="text-[#EF9419]" size={24} />
                    <h3 className="text-lg font-bold text-slate-800">Culture, Engagement and Growth</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    We foster a vibrant culture that encourages innovation and collaboration. Our "open door policy" promotes transparent communication. We prioritize growth through custom training, development opportunities, and regular evaluations. For integrity, we offer a whistleblower line managed by an independent third party.
                  </p>
                </div>

                <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldAlert className="text-red-500" size={24} />
                    <h3 className="text-lg font-bold text-slate-800">Health and Safety</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    Ensuring safety is our top priority. We hold quarterly seminars on fire and food safety, run daily toolbox meetings, and hold annual health screenings. All employees must complete safety assessments and receive official certification to reinforce our safety culture.
                  </p>
                </div>

                <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe2 className="text-teal-600" size={24} />
                    <h3 className="text-lg font-bold text-slate-800">Nurturing Communities &amp; SDGs</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    We engage in charity donations to orphanages, train street food vendors, and empower women farmers across all 16 regions. Our programs align directly with UN SDGs targeting poverty reduction and women empowerment. Additionally, we support professional organizations through sponsorships and partnerships.
                  </p>
                </div>

                <div className="gsap-reveal-item bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <HeartHandshake className="text-purple-600" size={24} />
                    <h3 className="text-lg font-bold text-slate-800">Diversity and Inclusion</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    Atlantic celebrates diversity in gender, age, and ethnicity. Our recruitment principles ensure equal opportunities, pay equity, and mutual respect. We maintain a positive environment free from harassment, recognizing that a diverse workforce strengthens performance and shareholder value.
                  </p>
                </div>

              </div>

              {/* Sticky Right Side Context Card */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 gsap-reveal-item">
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-100 border border-slate-200/50 group">
                  <img 
                    src="https://goodnews.co.ug/wp-content/uploads/2025/01/istockphoto-1221265610-612x612-1.jpg" 
                    alt="Community Support & Local Impact" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="bg-gradient-to-br from-[#134E4A] to-slate-900 text-white rounded-3xl p-6 shadow-lg">
                  <h5 className="font-extrabold text-sm uppercase tracking-wider text-[#EF9419] mb-2">Sustainable Development</h5>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Targeting SDG 1, 5, 8, 12, 13 and 17. Our ESG strategy combines local initiatives with global goals to generate long-term corporate, ecological, and societal value.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── Sustainability Projects (Interactive Carousel & Pure White Background) ── */}
        <section className="gsap-reveal-section relative w-full bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal-header">
              <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Impact in Action</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-4 mb-6 tracking-tight">
                Sustainability Projects
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Real projects driven by Atlantic Catering to support communities, reduce circular waste, and educate local groups.
              </p>
            </div>

            {/* Interactive Carousel Layout */}
            <div className="gsap-reveal-item relative bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm min-h-[500px] flex flex-col justify-between overflow-hidden">
              
              {/* Background watermarked floating dish relative to the active slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProjectIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                  className="absolute right-0 bottom-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] pointer-events-none select-none z-0"
                >
                  <Image
                    src={projects[currentProjectIndex].dish}
                    alt="Decorative dish backdrop"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Carousel Content details */}
                <div className="lg:col-span-6 space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProjectIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${projects[currentProjectIndex].tagColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${projects[currentProjectIndex].dotColor} animate-pulse`}></span>
                        {projects[currentProjectIndex].tag}
                      </div>
                      
                      <h3 className="text-3xl font-extrabold text-slate-800">{projects[currentProjectIndex].title}</h3>
                      <p className="text-sm font-semibold text-slate-600 leading-relaxed">{projects[currentProjectIndex].desc}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{projects[currentProjectIndex].longDesc}</p>

                      {projects[currentProjectIndex].hasVideo && (
                        <div className="flex flex-wrap gap-4 pt-2">
                          <button 
                            onClick={() => setIsVideoModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-green hover:bg-[#134E4A] text-white font-bold text-xs px-6 py-3 rounded-full transition-colors shadow-md"
                          >
                            <Play size={14} fill="currentColor" />
                            Watch Video Highlights
                          </button>
                          <a 
                            href={projects[currentProjectIndex].youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-green hover:text-green font-bold text-xs px-6 py-3 rounded-full transition-colors"
                          >
                            Watch on YouTube
                          </a>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Right Hand Media (Video preview or large dish render) */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProjectIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="w-full"
                    >
                      {projects[currentProjectIndex].hasVideo ? (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-black border border-slate-200">
                          <video 
                            src={projects[currentProjectIndex].video} 
                            controls
                            className="w-full h-full object-cover"
                            poster="/images/premium-green-texture.png"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-square max-w-[280px] md:max-w-[340px] mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]">
                          <Image
                            src={projects[currentProjectIndex].dish}
                            alt={projects[currentProjectIndex].title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between border-t border-slate-200/50 pt-8 mt-12 relative z-10">
                
                {/* Slide Counter dots */}
                <div className="flex gap-2">
                  {projects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentProjectIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentProjectIndex === idx ? 'w-8 bg-[#EF9419]' : 'w-2.5 bg-slate-300'
                      }`}
                      aria-label={`Slide to project ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Prev / Next buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={prevProject}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:border-green hover:text-green text-slate-600 flex items-center justify-center transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextProject}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:border-green hover:text-green text-slate-600 flex items-center justify-center transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ── Governance Section (Sage / Soft Green Tint Background) ── */}
        <section className="gsap-governance-section gsap-reveal-section relative w-full bg-[#F0F4F2] px-6 md:px-12 py-20 md:py-32 overflow-hidden">
          {/* Subtle Grid blueprint overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          
          {/* Floating dish backdrop with GSAP Parallax */}
          <div className="gsap-watermark-governance absolute right-12 top-[20%] z-0 w-[240px] h-[240px] opacity-[0.25] md:opacity-[0.35] pointer-events-none select-none hidden lg:block">
            <Image
              src="/assets/images/dishes/dish4.png"
              alt="Decorative food platter"
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7 space-y-6 gsap-reveal-header">
                <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Governance</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Ethics, Transparency &amp; Corporate Accountability
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                  We consider effective governance as fundamental to generating and safeguarding value for our shareholders and stakeholders. 
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  This encompasses a robust strategy towards corporate governance, ensuring compliance with all applicable laws, rules, regulations and policies while upholding our foundational values.
                </p>
              </div>
              
              {/* Organized Grid details */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="gsap-reveal-item bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green/10 text-green flex items-center justify-center shrink-0">
                      <Search size={20} />
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Transparency</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Committed to public accountability for our ESG commitments, we consistently share information about our ESG commitments and performance through investor presentations.
                  </p>
                </div>

                <div className="gsap-reveal-item bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Doing What's Right - Ethics</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We uphold the highest ethical standards outlined in our Code of Business Conduct and Ethics, adhered to by all team members including senior executives. Transparent whistleblower systems manage feedback.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── Local Content Policy & Human Rights Section (Pure White Background) ── */}
        <section className="gsap-reveal-section relative w-full bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left: Local Content Policy Grid */}
              <div className="lg:col-span-7 space-y-6 gsap-reveal-header">
                <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Local Content</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Local Content Policy &amp; Alliances
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  At the heart of our Local Content Policy lies a profound reliance on strong relationships and enduring partnerships geared towards capacity building interventions. These connections enable us to empower women and children, communities and foster sustainable growth.
                </p>
                
                {/* Organized Grid Design */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[
                    "Contract & Enterprise Development",
                    "Regular Supplier Engagement Forums",
                    "Community Employment & Internship Opportunities",
                    "Capacity Building Training and Development",
                    "Promote Environmental Sustainability",
                    "Promote Community Engagement Programs"
                  ].map((item, index) => (
                    <div key={index} className="gsap-reveal-item flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-green/30 hover:bg-slate-50/50 border-transparent transition-all">
                      <div className="w-6 h-6 rounded-full bg-green/10 text-green flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Human Rights Commitment */}
              <div className="lg:col-span-5 gsap-reveal-item bg-gradient-to-br from-[#134E4A] to-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform translate-x-6 -translate-y-6 scale-150 transition-transform duration-700 group-hover:rotate-12">
                  <Globe2 size={240} />
                </div>
                <div className="space-y-6 relative z-10">
                  <span className="text-[10px] font-bold text-green-light uppercase tracking-wider block">Human Rights Policy</span>
                  <h3 className="text-2xl font-extrabold text-white leading-tight">
                    Preserving Fundamental Rights &amp; Dignity
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Our commitment to preserving fundamental rights and human dignity is embedded in Atlantic's Human Rights Policy. At Atlantic, we consider human rights an essential aspect of our business philosophy. 
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Aligned with globally acknowledged principles, our policy advocates for the promotion and protection of human rights. This commitment applies to our operations and affiliates across all assets owned and operated by Atlantic.
                  </p>
                </div>
                <div className="pt-8 relative z-10">
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <ShieldCheck className="text-green-light" size={20} />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60">Fully Certified Operations</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── Globally Recognized Standards / Certifications (Subtle Stone Gradient Background) ── */}
        <section className="gsap-reveal-section relative w-full bg-gradient-to-b from-[#FAF9F6] to-[#F5F5F4] px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 gsap-reveal-header">
              <span className="text-xs font-bold text-green uppercase tracking-[0.2em]">Accreditation</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-4 mb-6 tracking-tight">
                Globally Recognized Standards
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our quality and environmental commitments are certified by internationally accredited registration bodies.
              </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="gsap-reveal-item bg-white border border-slate-100 rounded-2xl p-8 text-center hover:border-green/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CheckCircle2 className="w-12 h-12 text-green mx-auto mb-4" />
                <h4 className="font-bold text-slate-800 mb-2">ISO 22000</h4>
                <p className="text-xs text-slate-500">Food Safety Management</p>
              </div>
              <div className="gsap-reveal-item bg-white border border-slate-100 rounded-2xl p-8 text-center hover:border-green/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CheckCircle2 className="w-12 h-12 text-green mx-auto mb-4" />
                <h4 className="font-bold text-slate-800 mb-2">ISO 14001</h4>
                <p className="text-xs text-slate-500">Environmental Management</p>
              </div>
              <div className="gsap-reveal-item bg-white border border-slate-100 rounded-2xl p-8 text-center hover:border-green/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CheckCircle2 className="w-12 h-12 text-green mx-auto mb-4" />
                <h4 className="font-bold text-slate-800 mb-2">ISO 45001</h4>
                <p className="text-xs text-slate-500">Occupational Health &amp; Safety</p>
              </div>
              <div className="gsap-reveal-item bg-white border border-slate-100 rounded-2xl p-8 text-center hover:border-amber-500/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CheckCircle2 className="w-12 h-12 text-[#EF9419] mx-auto mb-4" />
                <h4 className="font-bold text-slate-800 mb-2">Ghana Club 100</h4>
                <p className="text-xs text-slate-500">#1 Hospitality &amp; Tourism — 2023</p>
              </div>
            </div>

            <div className="gsap-reveal-item bg-white border border-slate-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-sm">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Ghana Club 100 Awards 2023</h3>
                <p className="text-sm text-slate-600 max-w-md">Ranked 1st in Hospitality &amp; Tourism and 32nd overall among Ghana's top 100 companies</p>
              </div>
              <div className="text-center shrink-0">
                <span className="block text-5xl md:text-7xl font-black text-green mb-2">#1</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hospitality &amp; Tourism</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Clean Street Bites Video Modal ── */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-100"
              >
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-sm">Maud Speech Highlights — Akyem (Clean Street Bites)</h4>
                  <button 
                    onClick={() => setIsVideoModalOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="aspect-video bg-black">
                  <video 
                    src="https://atlanticcatering-gh.com/wp-content/uploads/2025/10/MAUD-SPEECH-HIGHLIGHTS-AKYEM.mp4" 
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  )
}
