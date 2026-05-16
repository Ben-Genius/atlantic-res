'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

export default function Loader() {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const progressRef = useRef({ value: 0 })

  useEffect(() => {
    // Ensure body overflow is hidden while loading
    if (loading) {
      document.body.style.overflow = 'hidden'
    }

    const tl = gsap.to(progressRef.current, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setDisplayProgress(Math.floor(progressRef.current.value))
      },
      onComplete: () => {
        // Use a slightly longer delay before unmounting to ensure 100 is seen
        setTimeout(() => {
          setLoading(false)
          document.body.style.overflow = ''
        }, 500)
      }
    })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader-overlay-fixed"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo - Removed entrance blur to fix "blur" issue */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <object
              data="/svg/logoA.svg"
              type="image/svg+xml"
              style={{ width: 'clamp(280px, 25vw, 450px)', height: 'auto' }}
              aria-label="Atlantic Catering & Logistics"
            />
          </motion.div>

          {/* Countdown - Fixed colors and positioning */}
          <div className="absolute bottom-20 flex flex-col items-center">
            <div className="flex items-baseline">
              <span
                className="text-orange-600 font-black tracking-tighter tabular-nums"
                style={{
                  fontSize: 'clamp(60px, 8vw, 100px)',
                  lineHeight: 0.8,
                  fontFamily: 'Antonio, sans-serif'
                }}
              >
                {displayProgress}
              </span>
              <span
                className="text-orange-500 font-bold ml-1"
                style={{ fontSize: '1.5rem', fontFamily: 'Antonio, sans-serif' }}
              >
                %
              </span>
            </div>

            <div className="mt-6 w-64 h-[2px] bg-orange-500/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-orange-500 transition-all duration-100 ease-linear"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            <span className="mt-4 text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500">
              Premium Quality Excellence
            </span>
          </div>

          {/* Subtle warm glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.03)_0%,transparent_70%)] pointer-events-none" />

          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@700&display=swap');
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
