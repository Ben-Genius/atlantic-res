'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AboutHero from '@/components/about/AboutHero'
import AboutEditorial from '@/components/about/AboutEditorial'
import MissionVision from '@/components/about/MissionVision'
import CeoProfile from '@/components/about/CeoProfile'
import MeetTheCrew from '@/components/about/MeetTheCrew'
import Sustainability from '@/components/about/Sustainability'
import AboutMarquee from '@/components/about/AboutMarquee'
import AboutContact from '@/components/about/AboutContact'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero slide-up split reveals
    gsap.from('.hero-line', {
      yPercent: 105,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power4.out',
    })

    gsap.from('.hero-eyebrow', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.1
    })

    gsap.from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.4
    })

    // Plate entry animations
    gsap.from('.hero-plate-tl', {
      x: -120,
      y: -120,
      rotation: -30,
      opacity: 0,
      duration: 2,
      ease: 'power3.out'
    })

    gsap.from('.hero-plate-tr', {
      x: 120,
      y: -120,
      rotation: 30,
      opacity: 0,
      duration: 2,
      ease: 'power3.out'
    })

    gsap.from('.hero-plate-left', {
      x: -200,
      y: 200,
      rotation: -35,
      opacity: 0,
      duration: 2.2,
      ease: 'power4.out',
      delay: 0.2
    })

    gsap.from('.hero-plate-right', {
      x: 200,
      y: 200,
      rotation: 35,
      opacity: 0,
      duration: 2.2,
      ease: 'power4.out',
      delay: 0.3
    })

    // Scroll reveals
    gsap.utils.toArray('.scroll-reveal').forEach((elem: any) => {
      gsap.from(elem, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
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
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 w-full">
        <AboutHero />
        <AboutEditorial />
        <MissionVision />
        <MeetTheCrew />
        <Sustainability />
        {/* <AboutMarquee /> */}
        {/* <AboutContact /> */}
      </div>
    </div>
  )
}