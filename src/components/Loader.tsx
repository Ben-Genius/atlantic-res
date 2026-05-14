'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or wait for window load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500) // Adjust time as needed for the SVG animation to complete

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <object
              data="/svg/logoA.svg"
              type="image/svg+xml"
              style={{ width: '300px', height: 'auto' }}
              aria-label="Loading..."
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
