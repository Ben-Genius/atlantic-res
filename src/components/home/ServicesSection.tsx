'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircularGallery, { CircularGalleryRef } from '@/components/ui/CircularGallery'

gsap.registerPlugin(ScrollTrigger)

const serviceItems = [
  { text: 'Onshore & Offshore Catering', image: '/images/services/atlantic/offshore catering.jpg' },
  { text: 'Contract Catering', image: '/images/services/atlantic/Contract Catering.jpg' },
  { text: 'Camp Design & Management', image: '/images/services/atlantic/camp design.jpg' },
  { text: 'Event Management & Planning', image: '/images/services/atlantic/event management.avif' },
  { text: 'Ship & Store Supplies', image: '/images/services/atlantic/ship supplies.jpg' },
  { text: 'Housekeeping & Laundry Services', image: '/images/services/atlantic/laundry & housekeeping.jpg' },
  { text: 'Janitorial Services', image: '/images/services/atlantic/janitorial services.avif' },
  { text: 'Pest Control Management Services', image: '/images/services/atlantic/pest control 1.avif' },
  { text: 'Waste Disposal', image: '/images/services/atlantic/waste disposal.jpg' }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<CircularGalleryRef>(null)

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=250%', // pin for 2.5 viewports worth of scroll to scroll through all 9 services
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        if (galleryRef.current) {
          galleryRef.current.setScroll(self.progress);
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#111827] flex flex-col justify-between py-12 relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between z-10 mt-4">
        <div>
          <span className="text-emerald-500 font-outfit text-sm font-semibold uppercase tracking-widest block mb-2">
            Our Core Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit tracking-tight leading-none">
            Tailored Excellence.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-gray-400 font-inter max-w-md text-sm md:text-base leading-relaxed">
          Explore our wide array of premium service divisions. Scroll down to browse through each segment mapped dynamically in our 3D space.
        </p>
      </div>

      {/* 3D WebGL Gallery Container */}
      <div className="w-full flex-grow relative z-10 flex items-center justify-center">
        <div className="w-full h-[65vh]">
          <CircularGallery
            ref={galleryRef}
            items={serviceItems}
            bend={3}
            textColor="#10b981" // emerald green text color
            borderRadius={0.05}
            font="bold 28px Outfit"
            fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap"
            scrollEase={0.08}
            disableInternalScroll={true}
            isInfinite={false}
          />
        </div>
      </div>

      {/* Scroll indicator footer */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 flex justify-between items-center text-xs uppercase tracking-widest font-semibold font-outfit text-gray-500">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive 3D Space</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Scroll down to explore</span>
          <svg className="w-4 h-4 animate-bounce text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
