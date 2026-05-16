'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NOTCH_CLIP = 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'

interface CtaButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export default function CtaButton({
  href,
  label,
  variant = 'primary',
  size = 'sm',
  className,
}: CtaButtonProps) {
  const isExternal = href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')
  const Icon = variant === 'outline' ? ArrowUpRight : ArrowRight

  const baseClasses = cn(
    'inline-flex items-center justify-between gap-4 overflow-hidden group/btn rounded-md',
    'font-bold uppercase tracking-[0.2em] text-[11px]',
    'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
    size === 'md' ? 'p-4 pr-5' : 'p-3 pr-4',
    variant === 'primary'
      ? 'bg-green text-white hover:bg-gold'
      : 'border border-[rgba(26,26,26,0.2)] text-[#1a1a1a] hover:border-[#57C157] hover:text-[#57C157]',
    className
  )

  const iconClass = cn(
    'relative w-7 h-7 flex items-center justify-center rounded-sm overflow-hidden',
    variant === 'primary' ? 'bg-white/20' : 'bg-black/5 group-hover/btn:bg-[#57C157]/10'
  )

  const content = (
    <>
      <span>{label}</span>
      <div className={iconClass}>
        <Icon size={13} strokeWidth={3} className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
        <Icon size={13} strokeWidth={3} className="absolute -translate-x-8 translate-y-8 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
      </div>
    </>
  )

  return isExternal
    ? <a href={href} className={baseClasses} style={{ clipPath: NOTCH_CLIP }}>{content}</a>
    : <Link href={href} className={baseClasses} style={{ clipPath: NOTCH_CLIP }}>{content}</Link>
}
