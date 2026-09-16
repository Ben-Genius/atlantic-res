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
import WhyChooseUs from '@/components/about/WhyChooseUs'
import StrengthOfALeader from '@/components/about/StrengthOfALeader'
import CateringNumbers from '@/components/about/CateringNumbers'
import OurValues from '@/components/about/OurValues'
import AboutMarquee from '@/components/about/AboutMarquee'
import AboutContact from '@/components/about/AboutContact'
import CtaSection from '@/components/home/CtaSection'

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
    <>
      <div
        ref={containerRef}
        className="w-full min-h-screen bg-[#FAFAF8] text-[#0d0d0d] relative overflow-hidden select-none"
      >

        <div className="relative z-10 w-full">
          <AboutHero />
          <MissionVision />
          <AboutEditorial />
          <CateringNumbers />
          <OurValues />
          <StrengthOfALeader />
          <WhyChooseUs />
          <MeetTheCrew />
          <Sustainability />
          {/* <AboutContact /> */}
        </div>
      </div>
      <CtaSection />
    </>

  )
}