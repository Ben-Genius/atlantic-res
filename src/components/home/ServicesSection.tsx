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
  { text: 'Event Management', image: '/images/services/atlantic/event management.avif' },
  { text: 'Ship & Store Supplies', image: '/images/services/atlantic/ship supplies.jpg' },
  { text: 'Housekeeping & Laundry', image: '/images/services/atlantic/laundry & housekeeping.jpg' },
  { text: 'Janitorial Services', image: '/images/services/atlantic/janitorial services1.jpg' },
  { text: 'Pest Control  ', image: '/images/services/atlantic/pest control 1.avif' },
  { text: 'Waste Management', image: '/images/services/atlantic/waste disposal1.jpg' }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<CircularGalleryRef>(null)

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=250%', // Gives ample scroll runtime for the 9 WebGL cards
      pin: true,
      pinSpacing: true, // FIX: Crucial to force subsequent DOM sections to wait
      scrub: true,
      onUpdate: (self) => {
        if (galleryRef.current) {
          galleryRef.current.setScroll(self.progress);
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="w-full  flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        backgroundImage: "url('/images/premium-green-texture.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Color Overlay: Multiplies the primary brand green into the texture */}
      <div className="absolute inset-0 bg-[#35b435] mix-blend-multiply opacity-90 pointer-events-none z-0" />
      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* Header */}
      <div className="w-full mx-auto px-6 md:px-20 flex flex-col md:flex-row md:items-end md:justify-between z-10 mt-8">
        <div>
          <span className="text-[#EF9419] font-outfit text-sm font-semibold uppercase tracking-widest block mb-2">
            Core Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit tracking-tight leading-none">
            Our Solutions
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-white/80 font-inter max-w-md text-sm md:text-base leading-relaxed">
          Explore our wide array of premium service divisions. Scroll down to browse through each segment mapped dynamically in our 3D space.
        </p>
      </div>

      {/* 3D WebGL Gallery Container */}
      <div className="w-full flex-grow relative z-10 flex items-center justify-center">
        <div className="w-full h-[65vh]">
          <CircularGallery
            ref={galleryRef}
            items={serviceItems}
            bend={5}
            textColor="#10b981"
            borderRadius={0.05}
            font="bold 28px Outfit"
            fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap"
            scrollEase={0.08}
            disableInternalScroll={true}
            isInfinite={false}
            drawChip={true}
          />
        </div>
      </div>


    </div>
  )
}

