'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TEAM_MEMBERS = [
  {
    name: 'Hubert Tossou',
    role: 'Operations Director',
    desc: 'Trained Executive Chef with over 20 years in remote site operations. Certified ISO Safety Auditor. Fluent in English & French.',
    img: '/images/services/atlantic/offshore-catering-new.jpg'
  },
  {
    name: 'John Ansah',
    role: 'Remote Site Director',
    desc: 'Quality & safety consultant with over 2 decades of experience. Formerly with Guinness, PFC, and Newrest.',
    img: '/images/services/atlantic/offshore-catering-new.jpg'
  },
  {
    name: 'Jemima Tagoe',
    role: 'QHSE Manager',
    desc: 'Practitioner & Laboratory Technologist with 10 years in food safety and environmental auditing. BSE in Food Science.',
    img: '/images/services/atlantic/offshore-catering-new.jpg'
  },
  {
    name: 'Freda Opoku',
    role: 'Admin Manager',
    desc: 'HR professional with 10+ years in People Management, Policy, and Relations. Executive MBA from University of Ghana.',
    img: '/images/services/atlantic/offshore-catering-new.jpg'
  },
  {
    name: 'Suzan V. Dogbe',
    role: 'Finance Manager',
    desc: 'Expert in financial management, budgeting, forecasting, risk management, and regulatory compliance.',
    img: '/images/services/atlantic/offshore-catering-new.jpg'
  },
  {
    name: 'Joseph K. Sam',
    role: 'HR Manager',
    desc: 'Strategic HR management & talent optimization specialist. MBA in HR Management from UCC. CIHRM member.',
    img: '/images/services/atlantic/offshore-catering-new.jpg'
  }
]

const SDGS = [
  { number: '1', title: 'No Poverty', desc: 'Sponsoring free capacity building seminars in low-income areas.' },
  { number: '2', title: 'Zero Hunger', desc: 'Nutritious & healthy meal planning designed to tackle food insecurity.' },
  { number: '3', title: 'Good Health', desc: 'Strict safety standards keeping our workforce and customers healthy.' },
  { number: '4', title: 'Quality Education', desc: 'Active professional development courses and self-development training.' },
  { number: '5', title: 'Gender Equality', desc: 'Equal opportunity hiring policies & training initiatives for female empowerment.' },
  { number: '12', title: 'Responsible Consumption', desc: 'Conducting environmental impact assessments of product use.' },
  { number: '17', title: 'Partnerships', desc: 'Building strategic relationships to amplify the reach of the SDGs.' }
]

const MARQUEE_ITEMS = [
  'OFFSHORE CATERING', 'KEEP IT ATLANTIC', 'PREMIUM QUALITY',
  'OFFSHORE CATERING', 'KEEP IT ATLANTIC', 'ONSHORE OPERATIONS',
  'KEEP IT ATLANTIC', 'CAMP MANAGEMENT', 'SHIP SUPPLIES',
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marquee2Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero stagger
    gsap.from('.hero-fade', {
      opacity: 0, y: 50, duration: 1.4, stagger: 0.12, ease: 'power3.out'
    })

    // Scroll reveals
    gsap.utils.toArray('.scroll-reveal').forEach((elem: any) => {
      gsap.from(elem, {
        opacity: 0, y: 50, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: elem, start: 'top 88%', toggleActions: 'play none none none' }
      })
    })

    // Ghost text parallax
    gsap.utils.toArray('.ghost-parallax').forEach((elem: any) => {
      gsap.to(elem, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: elem, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    // Floating image parallax
    gsap.utils.toArray('.float-img').forEach((elem: any) => {
      gsap.to(elem, {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: elem, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    })

    // Marquee ticker — infinite loop
    const mq = marqueeRef.current
    const mq2 = marquee2Ref.current
    if (mq) {
      gsap.to(mq, { x: '-50%', duration: 22, ease: 'none', repeat: -1 })
    }
    if (mq2) {
      gsap.set(mq2, { x: '-50%' })
      gsap.to(mq2, { x: '0%', duration: 26, ease: 'none', repeat: -1 })
    }

  }, { scope: containerRef })

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen text-white relative overflow-hidden select-none"
      style={{
        backgroundImage: "url('/images/premium-green-texture.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* ── Brand overlays ── */}
      <div className="absolute inset-0 bg-[#35b435] mix-blend-multiply opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 w-full">

        {/* ════════════════════════════════════
            HERO — Sqew style: ghost + solid type
            overlaid, floating food image right
            ════════════════════════════════════ */}
        <section className="relative w-full min-h-screen flex flex-col justify-start items-center text-center overflow-hidden px-6 md:px-16 pt-36 md:pt-48 pb-20">

          {/* Giant ghost background text */}
          <div
            className="ghost-parallax absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden top-0 z-0"
            aria-hidden
          >
            <span
              className="block font-black uppercase leading-none tracking-tighter text-[18vw] md:text-[16vw] text-transparent mb-[14rem] pt-[2.4rem] ml-[-14rem]"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.08)' }}
            >
              ATLANTIC
            </span>
            <span
              className="block font-black uppercase leading-none tracking-tighter text-[16vw] md:text-[14vw] text-transparent ml-[35vw] mt-[18rem]"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.06)' }}
            >
              CATERING
            </span>

          </div>

          {/* 1. Top-left Shawarma wrap (au1.png) - Angled & extending from corner */}
          <div className="absolute top-[-1%] left-[-4%] w-[160px] sm:w-[180px] md:w-[280px] lg:w-[350px] z-0 pointer-events-none">
            <img
              src="/assets/images/About Us/au4.png"
              alt=""
              className="w-full object-contain drop-shadow-2xl mix-blend-multiply"
              draggable={false}
            />
          </div>

          {/* 2. Top-right Dip bowl (au2.png) - Positioned in the corner */}
          <div className="absolute top-[-5%] right-[0%] w-[120px] sm:w-[180px] md:w-[240px] lg:w-[300px] z-10 pointer-events-none">
            <img
              src="/assets/images/About Us/au2.png"
              alt=""
              className="w-full object-contain drop-shadow-2xl mix-blend-multiply"
              draggable={false}
            />
          </div>

          {/* 3. Bottom-left Falafel bowl (au4.png) - Below main title */}
          <div className="absolute top-[22%] sm:top-[48%] md:top-[44%] lg:top-[60%] left-[4%] sm:left-[10%] md:left-[14%] lg:left-[1%] xl:left-[16%] w-[200px] sm:w-[280px] md:w-[380px] lg:w-[450px] xl:w-[400px] z-30 pointer-events-none">
            <img

              src="/assets/images/About Us/au1.png"
              alt=""
              className="w-full object-contain mix-blend-multiply"
              draggable={false}
            />
          </div>

          {/* 4. Bottom-right Hummus bowl (au3.png) - Below main title */}
          <div className="absolute top-[62%] sm:top-[58%] md:top-[54%] lg:top-[60%] right-[4%] sm:right-[10%] md:right-[14%] lg:right-[18%] xl:right-[20%] w-[150px] sm:w-[200px] md:w-[260px] lg:w-[300px] xl:w-[340px] z-30 flex flex-col items-center sm:items-start gap-4">
            <img
              src="/assets/images/About Us/au3.png"
              alt=""
              className="w-full object-contain drop-shadow-2xl mix-blend-multiply pointer-events-none"
              draggable={false}
            />

          </div>

          {/* Main Typography & CTA Content Container */}
          <div className="hero-fade relative z-20 flex flex-col items-center max-w-7xl mx-auto mt-8">
            {/* Eyebrow */}
            <span className="block font-inter text-[#EF9419] text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-2">
              Reliable · Flexible · Safe
            </span>

            {/* Main headline — Sqew treatment: thin ghost line + massive solid */}
            <h1 className="font-extrabold uppercase leading-[1.1] tracking-tighter m-0 text-center">
              <span
                className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] text-white"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
              >
                FOCUS ON  <span className=" text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] text-transparent">THE WORK</span>
              </span>

              <span
                className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
              >
                WE'LL TAKE CARE
              </span>

              <span
                className="block text-[14vw] sm:text-[11vw] md:text-[9vw] lg:text-[8rem] text-[#EF9419]"
              >
                OF THE REST
              </span>
            </h1>

            {/* Subline + CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 mx-auto">
              <a
                href="#contact"
                className="shrink-0 border border-white/90 text-white font-inter font-bold text-xs uppercase tracking-widest px-7 py-3 hover:bg-white hover:text-[#1a4a1a] transition-all duration-200"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            "NEXT LEVEL" STATEMENT SECTION
            ════════════════════════════════════ */}
        <section className="scroll-reveal relative w-full px-6 md:px-16 py-20 overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">

            {/* Left: giant ghost + solid stacked */}
            <div className="shrink-0">
              <span
                className="block font-black uppercase leading-none text-[18vw] md:text-[12vw] text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.25)' }}
                aria-hidden
              >
                NEXT
              </span>
              <span
                className="block font-black uppercase leading-none text-[18vw] md:text-[12vw] text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.25)' }}
                aria-hidden
              >
                LEVEL
              </span>
              <span className="block font-black uppercase leading-none text-[18vw] md:text-[12vw] text-white -mt-1">
                QUALITY
              </span>
            </div>

            {/* Right: floating food + who-we-are copy */}
            <div className="flex flex-col gap-6 max-w-sm">
              <div className="float-img w-[200px] md:w-[260px]">
                <img
                  src="/images/services/atlantic/offshore-catering-new.jpg"
                  alt="Atlantic food"
                  className="w-full object-contain drop-shadow-2xl"
                  draggable={false}
                />
              </div>
              <p className="text-white/70 font-inter text-sm leading-relaxed">
                Atlantic Catering and Logistics Limited is a wholly-owned Ghanaian professional corporate catering company established in 2014. We serve onshore and offshore operations, FPSOs, camp management, ship supplies, laundry, housekeeping, and janitorial services.
              </p>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════
            "THE AUTHENTIC ONE" — editorial split
            ════════════════════════════════════ */}
        <section className="scroll-reveal relative w-full px-6 md:px-16 py-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

            {/* Left col: body copy */}
            <div className="order-2 lg:order-1">
              <span className="block font-inter text-[#EF9419] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Who We Are
              </span>
              <p className="font-inter text-white/75 text-base leading-relaxed mb-4">
                We are built on total authenticity — genuine ingredients sourced from the finest local and international suppliers, and original recipes inspired by the greatest culinary traditions.
              </p>
              <p className="font-inter text-white/60 text-sm leading-relaxed">
                This — combined with absolute consistency and a team of passionate professionals — produces incredible results every time. Over 99.9% of our workforce are Ghanaian nationals.
              </p>
            </div>

            {/* Right col: massive outlined text */}
            <div className="order-1 lg:order-2 text-right">
              <span
                className="block font-black uppercase leading-none text-[14vw] md:text-[9vw] text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)' }}
              >
                THE
              </span>
              <span
                className="block font-black uppercase leading-none text-[14vw] md:text-[9vw] text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.85)' }}
              >
                AUTHENTIC
              </span>
              <span className="block font-black uppercase leading-none text-[14vw] md:text-[9vw] text-[#EF9419]">
                CHOICE.
              </span>
            </div>
          </div>
        </section>

        {/* ── MISSION, VISION, GOAL ── */}
        <section className="scroll-reveal w-full px-6 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {[
              { label: 'Our Mission', color: '#EF9419', title: 'QUALITY MEALS', body: 'To provide quality, healthy, nutritious, and hygienically-prepared meals and excellent services to our clients and partners.' },
              { label: 'Our Vision', color: '#10B981', title: 'AFRICAN LEADERSHIP', body: 'To lead the hospitality and food industry in Africa and beyond while maintaining quality, reliability, uniqueness, and creativity.' },
              { label: 'Our Goal', color: '#60A5FA', title: 'TOP STANDARDS', body: 'To ensure maximum customer satisfaction by completing every aspect of production to the highest industry standards.' },
            ].map((card, i) => (
              <div
                key={i}
                className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 group hover:bg-white/[0.03] transition-colors"
              >
                <span className="block font-inter text-xs font-bold uppercase tracking-widest mb-4" style={{ color: card.color }}>
                  {card.label}
                </span>
                <h3 className="font-black text-3xl md:text-4xl uppercase tracking-tight text-white leading-none mb-5">
                  {card.title}
                </h3>
                <p className="font-inter text-white/60 text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CEO PROFILE ── */}
        <section className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">

            {/* Image col */}
            <div className="lg:col-span-5 relative">
              <div className="w-full aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
                <img
                  src="/images/services/atlantic/offshore-catering-new.jpg"
                  alt="Maud Lindsay-Gamrat"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-black text-2xl uppercase tracking-tight text-white leading-none">
                  Maud Lindsay-Gamrat
                </p>
                <p className="font-inter text-[#EF9419] text-xs uppercase tracking-widest font-bold mt-1">
                  Chief Executive Officer
                </p>
              </div>
            </div>

            {/* Text col */}
            <div className="lg:col-span-7 flex flex-col justify-between border-l border-white/10 p-8 md:p-12 gap-10">
              <div>
                <span
                  className="block font-black uppercase leading-none text-[12vw] lg:text-[5.5rem] text-transparent"
                  style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
                  aria-hidden
                >
                  LEADER
                </span>
                <span className="block font-black uppercase leading-none text-[12vw] lg:text-[5.5rem] text-white -mt-2">
                  SHIP.
                </span>
              </div>

              <div className="space-y-4 font-inter text-white/70 text-sm md:text-base leading-relaxed">
                <p>
                  Maud Lindsay-Gamrat is a seasoned business leader with over two decades of experience in the Ghanaian landscape. Her expertise spans inflight, camp and remote site, offshore and onshore catering operations.
                </p>
                <p>
                  As CEO of Atlantic, Maud has championed local capacity development, leading a team of over 150 — with an extraordinary 99.9% being Ghanaians. The company excels in delivering specialized catering aboard two FPSOs in Ghana and various onsite corporate operations.
                </p>
                <p>
                  Her achievements include: Most Outstanding Female Owned Business in Ghana's Upstream Petroleum sector, Glitz Woman of the Year for Catering & Hospitality, and a feature on CNN's "Passion to Portfolio".
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {['ISO 9001', 'ISO 14001', 'ISO 22000', 'ISO 45001'].map(cert => (
                  <span key={cert} className="border border-white/20 text-white/80 font-inter font-bold text-[10px] uppercase tracking-widest px-3 py-1.5">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MEET THE CREW ── */}
        <section className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">

          <div className="mb-16 relative">
            <span
              className="block font-black uppercase leading-none text-[16vw] md:text-[11vw] text-transparent select-none"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.12)' }}
              aria-hidden
            >
              MEET THE
            </span>
            <span className="block font-black uppercase leading-none text-[16vw] md:text-[11vw] text-white -mt-2 md:-mt-4">
              CREW
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col"
              >
                <div
                  className="relative w-full aspect-[9/16] rounded-[1.6rem] overflow-hidden border-[3px] border-white/30 bg-black/40 shadow-2xl"
                  style={{ boxShadow: '0 0 0 6px rgba(0,0,0,0.35), 0 20px 40px rgba(0,0,0,0.5)' }}
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-black/60 rounded-full z-30" />

                  <img
                    src={member.img}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-inter text-white/85 text-[9px] leading-snug">
                      {member.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="font-black text-lg md:text-xl uppercase tracking-tight text-white leading-none">
                    {member.name.split(' ')[0]}
                  </p>
                  <p className="font-inter text-white/50 text-[10px] uppercase tracking-wider mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}

            <div className="group relative flex flex-col">
              <div
                className="relative w-full aspect-[9/16] rounded-[1.6rem] overflow-hidden border-[3px] border-white/20 bg-white/5 shadow-2xl flex items-center justify-center"
                style={{ boxShadow: '0 0 0 6px rgba(0,0,0,0.35), 0 20px 40px rgba(0,0,0,0.5)' }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-black/60 rounded-full" />
                <div className="text-center px-4">
                  <p className="font-black text-4xl md:text-5xl text-white uppercase">YOU?</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-4 opacity-40">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-white/60" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-black text-lg md:text-xl uppercase tracking-tight text-white leading-none">YOU?</p>
                <p className="font-inter text-white/50 text-[10px] uppercase tracking-wider mt-0.5">We're hiring...</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="#contact"
              className="inline-block border border-white/80 text-white font-inter font-bold text-xs uppercase tracking-widest px-8 py-3 hover:bg-white hover:text-[#1a4a1a] transition-all duration-200"
            >
              WORK WITH US
            </a>
          </div>
        </section>

        {/* ── SUSTAINABILITY ── */}
        <section className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="block font-inter text-[#10B981] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Sustainability
              </span>
              <span
                className="block font-black uppercase leading-none text-[12vw] lg:text-[5rem] text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
                aria-hidden
              >
                DOING
              </span>
              <span className="block font-black uppercase leading-none text-[12vw] lg:text-[5rem] text-white -mt-1">
                BUSINESS
              </span>
              <span className="block font-black uppercase leading-none text-[12vw] lg:text-[5rem] text-[#10B981] -mt-1">
                RIGHT.
              </span>
              <p className="font-inter text-white/65 text-sm leading-relaxed mt-6">
                We align our priorities with UN SDGs 1, 2, 3, 4, 5, 12, and 17 — integrating equality, food security, and environmental care into every decision we make.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10">
              {SDGS.map((sdg, idx) => (
                <div
                  key={idx}
                  className="p-6 border-b border-r border-white/10 hover:bg-white/[0.03] transition-colors last:border-b-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-black text-3xl text-[#10B981]/40 leading-none">{sdg.number}</span>
                    <span className="font-black text-sm uppercase tracking-tight text-white">{sdg.title}</span>
                  </div>
                  <p className="font-inter text-white/55 text-xs leading-relaxed">{sdg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE TICKER ── */}
        <div className="w-full overflow-hidden border-t border-b border-white/15 py-4 mt-8">
          <div ref={marqueeRef} className="flex gap-0 whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6">
                <span className="font-black text-2xl md:text-3xl uppercase tracking-tight text-white">
                  {item}
                </span>
                <span className="font-black text-2xl md:text-3xl text-[#EF9419]">·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden border-b border-white/10 py-4">
          <div ref={marquee2Ref} className="flex gap-0 whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
            {['OFFSHORE CATERING', 'ISO CERTIFIED', 'CAMP MANAGEMENT', 'FPSO SPECIALISTS', 'SHIP SUPPLIES', 'GHANA OWNED', 'OFFSHORE CATERING', 'ISO CERTIFIED', 'CAMP MANAGEMENT', 'FPSO SPECIALISTS', 'SHIP SUPPLIES', 'GHANA OWNED'].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-6">
                <span
                  className="font-black text-2xl md:text-3xl uppercase tracking-tight text-transparent"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.45)' }}
                >
                  {item}
                </span>
                <span className="font-black text-2xl md:text-3xl text-white/20">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── CONTACT BAND ── */}
        <section id="contact" className="scroll-reveal w-full px-6 md:px-16 py-20 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-7">
              <span
                className="block font-black uppercase leading-none text-[14vw] lg:text-[6.5rem] text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
                aria-hidden
              >
                DISCOVER
              </span>
              <span className="block font-black uppercase leading-none text-[14vw] lg:text-[6.5rem] text-white -mt-2">
                ATLANTIC
              </span>
              <p className="font-inter text-white/55 text-sm leading-relaxed mt-6 max-w-sm">
                Real catering. No shortcuts. No compromises. We didn't come here to follow trends — we came to show what happens when passion meets professionalism.
              </p>

              <a
                href="mailto:info@atlanticcatering-gh.com"
                className="inline-block mt-8 border border-white/80 text-white font-inter font-bold text-xs uppercase tracking-widest px-8 py-3 hover:bg-white hover:text-[#1a4a1a] transition-all duration-200"
              >
                ABOUT US
              </a>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-8 border-l border-white/10 pl-8 md:pl-12">
              {[
                { label: 'Office Address', value: '20 Suya Street, Accra, Ghana\nGA-374-2184' },
                { label: 'Phone', value: '+233 501 502 441' },
                { label: 'Email', value: 'info@atlanticcatering-gh.com' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="font-black text-xs uppercase tracking-[0.25em] text-white/40 mb-1">{item.label}</p>
                  <p className="font-inter text-white text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="w-full px-6 md:px-16 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-white/40 text-xs">
            © {new Date().getFullYear()} Atlantic Catering & Logistics Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-inter text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors">Food Safety Rating</a>
            <a href="#" className="font-inter text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors">ISO Certs</a>
          </div>
        </footer>

      </div>
    </div>
  )
}