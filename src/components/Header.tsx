'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { navigation } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'transparent',
    }}>
      <div className="mx-auto px-16">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <object
              data="/svg/logoA.svg"
              type="image/svg+xml"
              aria-label="Atlantic Catering & Logistics"
              style={{ width: 140, height: 86, pointerEvents: 'none', display: 'block' }}
            />
          </Link>
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "h-[1.5rem] text-orange-600 w-[1.5rem] transform origin-center transition-transform duration-300 ease-linear",
              isMenuOpen ? "rotate-45 text-black" : (scrolled ? "text-black" : "text-white")
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M12.0005 5.49894V6.99894H8.50047V5.49894H12.0005Z" fill="currentColor"></path>
            <path d="M3.5 5.49756V6.99756L0 6.99756L6.55637e-08 5.49756L3.5 5.49756Z" fill="currentColor"></path>
            <path d="M6.50106 11.9982H5.00106V8.49824H6.50106V11.9982Z" fill="currentColor"></path>
            <path d="M6.49968 3.49777L4.99968 3.49777L4.99968 -0.00222778L6.49968 -0.00222759L6.49968 3.49777Z" fill="currentColor"></path>
          </svg>


          {/* CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center' }}>
            <Link
              href="tel:+233501502441"
              className={cn(
                "relative flex items-center justify-between gap-3 p-3 overflow-hidden group/btn rounded-md",
                "bg-[#67BA67] text-white font-bold uppercase tracking-[0.2em] text-[11px]",
                "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "hover:bg-[#F9A825]"
              )}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
              }}
            >
              <span className="flex items-center gap-2">
                <Phone size={13} strokeWidth={3} />
                Contact Us
              </span>
              <div className="relative w-7 h-7 flex items-center justify-center bg-white/20 rounded-sm overflow-hidden">
                <ArrowRight
                  size={13}
                  strokeWidth={3}
                  className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8"
                />
                <ArrowRight
                  size={13}
                  strokeWidth={3}
                  className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="container-xl" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.75rem',
                      fontWeight: 500,
                      color: 'rgba(0,0,0,0.85)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      paddingBottom: '1.25rem',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="tel:+233501502441"
                  className={cn(
                    "relative flex items-center justify-between gap-3 pl-6 pr-2 py-4 overflow-hidden group/mbtn",
                    "bg-[#67BA67] text-white font-bold uppercase tracking-[0.2em] text-[10px]",
                    "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "hover:bg-[#F9A825]"
                  )}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)"
                  }}
                >
                  <span>Call Us: +233 501 502 441</span>
                  <div className="relative w-8 h-8 flex items-center justify-center bg-white/20 rounded-sm overflow-hidden">
                    <ArrowRight
                      size={16}
                      strokeWidth={3}
                      className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/mbtn:translate-x-8 group-hover/mbtn:-translate-y-8"
                    />
                    <ArrowRight
                      size={16}
                      strokeWidth={3}
                      className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/mbtn:translate-x-0 group-hover/mbtn:translate-y-0"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
