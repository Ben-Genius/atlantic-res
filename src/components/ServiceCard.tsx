'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  tag?: string
  href?: string
}

function Tag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-sm bg-[#35b435]/10 border border-[#35b435]/20">
      <span className="block h-[6px] w-[6px] rounded-full bg-[#35b435] shrink-0" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#35b435]">
        {label}
      </span>
    </div>
  )
}

function NotchArrow({ cardBg, href }: { cardBg: string; href: string }) {
  return (
    <div className="absolute bottom-0 right-0 w-[87px] h-[90px]">
      {/* Structural SVG that creates the "cutout" look by matching parent background */}
      <svg
        viewBox="0 0 87 90"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <path
          fill={cardBg}
          d="M35.43 45.104 L23.71 81.57 A12.146 12.146 0 0 1 12.145 90 L0 90 V0 H87 V18 c0 8.837 -7.163 16 -16 16 H50.663 a16 16 0 0 0 -15.232 11.104 Z"
        />
      </svg>

      {/* Interactive Arrow Button */}
      <Link
        href={href}
        className={cn(
          "absolute bottom-1 right-1 flex items-center justify-center",
          "w-[51px] h-[48px] overflow-hidden group/arrow",
          "bg-[#EF9419] text-white shadow-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:bg-[#35b435]"
        )}
        style={{
          clipPath: "path('M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z')"
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Arrow 1: Center -> Top-Right (↗) */}
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="absolute transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
                       group-hover/arrow:translate-x-10 group-hover/arrow:-translate-y-10"
          />
          {/* Arrow 2: Bottom-Left (↙) -> Center */}
          <ArrowRight
            size={20}
            strokeWidth={2.5}
            className="absolute -translate-x-10 translate-y-10
                       transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
                       group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0"
          />
        </div>
      </Link>
    </div>
  )
}

export default function ServiceCard({
  title,
  description,
  image,
  tag = 'Premium Service',
  href = '#',
}: ServiceCardProps) {
  return (
    <div className="relative group">
      <div
        className="flex flex-col bg-white border border-neutral-100 rounded-[12px] min-h-[420px] transition-all duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 89px), calc(100% - 86px) calc(100% - 89px), calc(100% - 86px) 100%, 0 100%)"
        }}
      >
        {/* Image with zoom effect */}
        <div className="relative h-60 m-3 overflow-hidden rounded-[8px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 p-7 pt-4 pb-[100px]">
          <Tag label={tag} />
          <h3 className="mt-5 text-2xl font-bold text-neutral-900 leading-tight tracking-tight uppercase font-display">
            {title}
          </h3>
          <p className="mt-3 text-neutral-500 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* The Notch & Animated Arrow Connect */}
      <NotchArrow cardBg="#ffffff" href={href} />
    </div>
  )
}
