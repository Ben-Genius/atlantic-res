'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface HeroProps {
  title: string
  subtitle: string
  image: string
  ctaText?: string
  ctaHref?: string
  secondaryCta?: { text: string; href: string }
  overlay?: boolean
}

export default function Hero({
  title,
  subtitle,
  image,
  ctaText = 'Learn More',
  ctaHref = '#services',
  secondaryCta,
  overlay = true,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    gsap.from(heroRef.current.querySelectorAll('.hero-fade'), {
      y: 24,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.13,
    })
  }, [])

  return (
    <div className="relative h-[600px] md:h-[720px] w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      {overlay && <div className="absolute inset-0 bg-black/45" />}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-premium text-center text-white z-10" ref={heroRef}>
          <motion.h1
            className="text-display mb-4 drop-shadow-2xl hero-fade"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md hero-fade"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.18 }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center hero-fade"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.28 }}
          >
            <a href={ctaHref} className="btn-primary">
              {ctaText}
            </a>
            {secondaryCta && (
              <a href={secondaryCta.href} className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-primary-900">
                {secondaryCta.text}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
