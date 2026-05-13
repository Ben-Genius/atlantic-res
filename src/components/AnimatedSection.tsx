'use client'

import { motion } from 'framer-motion'

interface AnimatedSectionProps {
  className?: string
  delay?: number
  children: React.ReactNode
}

export default function AnimatedSection({
  className = '',
  delay = 0,
  children,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
    >
      {children}
    </motion.section>
  )
}
