'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Line-art plate + cutlery, redrawn from the reference sheet (outline only) */
function BlueprintPlate({ label, className = '', style }: { label: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="150 250 1520 1520"
      className={`blueprint-plate absolute text-[#6BB85A] ${className}`}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Plate rings */}
      <circle cx="911" cy="1013" r="701" vectorEffect="non-scaling-stroke" />
      <circle cx="911" cy="1013" r="600" vectorEffect="non-scaling-stroke" />
      <ellipse cx="911" cy="1042" rx="541" ry="570" vectorEffect="non-scaling-stroke" />
      {/* Spoon */}
      <ellipse cx="714" cy="845" rx="180" ry="280" vectorEffect="non-scaling-stroke" />
      <path d="M687 1080 L666 1495 L763 1534 L740 1080" vectorEffect="non-scaling-stroke" />
      <path d="M586 812 C580 900 620 975 668 1020 C625 975 590 900 586 812 Z" vectorEffect="non-scaling-stroke" />
      {/* Fork */}
      <path
        d="M1052 590 C1022 680 1003 790 1003 910 C1003 1010 1050 1060 1111 1068 L1088 1525 L1185 1480 L1163 1068 C1225 1060 1272 1010 1272 910 C1272 790 1255 680 1228 590"
        vectorEffect="non-scaling-stroke"
      />
      {[1060, 1105, 1150, 1195].map((x) => (
        <rect key={x} x={x} y="588" width="21" height="330" rx="10" vectorEffect="non-scaling-stroke" />
      ))}
      {/* Blueprint annotations */}
      <g strokeWidth={1} opacity={0.7}>
        <line x1="150" y1="1013" x2="190" y2="1013" vectorEffect="non-scaling-stroke" />
        <line x1="1632" y1="1013" x2="1670" y2="1013" vectorEffect="non-scaling-stroke" />
        <line x1="911" y1="250" x2="911" y2="292" vectorEffect="non-scaling-stroke" />
        <line x1="911" y1="1734" x2="911" y2="1770" vectorEffect="non-scaling-stroke" />
        <line x1="210" y1="1790" x2="1612" y2="1790" strokeDasharray="10 8" vectorEffect="non-scaling-stroke" />
        <line x1="210" y1="1775" x2="210" y2="1805" vectorEffect="non-scaling-stroke" />
        <line x1="1612" y1="1775" x2="1612" y2="1805" vectorEffect="non-scaling-stroke" />
      </g>
      <text x="1640" y="300" textAnchor="end" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace" fontSize="46">
        {label}
      </text>
    </svg>
  )
}

export function MissionVision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTrackRef = useRef<HTMLDivElement>(null)
  const pinnedViewportRef = useRef<HTMLDivElement>(null)
  const videoSlotRef = useRef<HTMLDivElement>(null)
  const videoCardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Typography elements for staggered collapse during expansion
  const headlinePart1Ref = useRef<HTMLHeadingElement>(null)
  const headlinePart2Ref = useRef<HTMLDivElement>(null)
  const tagBadgeRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const transportBarRef = useRef<HTMLDivElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  // Player controls state
  const [muted, setMuted] = useState<boolean>(true)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('0:00')

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
    }
  }, [muted])

  // Pause the video whenever the section scrolls out of view
  useEffect(() => {
    const track = scrollTrackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) safePause()
      },
      { threshold: 0 }
    )
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  // Time format helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const safePlay = () => {
    if (!videoRef.current || !videoRef.current.paused) return
    playPromiseRef.current = videoRef.current.play()
    if (playPromiseRef.current !== undefined) {
      playPromiseRef.current
        .then(() => {
          playPromiseRef.current = null
          setIsPlaying(true)
        })
        .catch(() => {
          playPromiseRef.current = null
          setIsPlaying(false)
        })
    }
  }

  const safePause = () => {
    if (!videoRef.current) return
    if (playPromiseRef.current !== null) {
      playPromiseRef.current
        .then(() => {
          videoRef.current?.pause()
          setIsPlaying(false)
        })
        .catch(() => {
          videoRef.current?.pause()
          setIsPlaying(false)
        })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      safePlay()
    } else {
      safePause()
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted((prev) => {
      const nextMuted = !prev
      if (videoRef.current) {
        videoRef.current.muted = nextMuted
      }
      return nextMuted
    })
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime
      const total = videoRef.current.duration
      setProgress((current / total) * 100)
      setCurrentTimeFormatted(formatTime(current))
    }
  }

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const scrollTrack = scrollTrackRef.current
      const pinnedViewport = pinnedViewportRef.current
      const videoSlot = videoSlotRef.current
      const videoCard = videoCardRef.current

      if (!scrollTrack || !pinnedViewport || !videoSlot || !videoCard) return

      const getSlotPosition = () => {
        const slotRect = videoSlot.getBoundingClientRect()
        const viewportRect = pinnedViewport.getBoundingClientRect()
        return {
          top: slotRect.top - viewportRect.top,
          left: slotRect.left - viewportRect.left,
          width: slotRect.width,
          height: slotRect.height,
        }
      }

      // Place the card precisely inside the inline word slot
      const placeInSlot = () => {
        const pos = getSlotPosition()
        gsap.set(videoCard, {
          top: pos.top,
          left: pos.left,
          width: pos.width,
          height: pos.height,
          borderRadius: '16px',
          borderWidth: '1px',
        })
      }

      const isPortraitPhone = () => window.innerWidth < 1024 && window.innerHeight > window.innerWidth

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        placeInSlot()

        // Slow ambient drift on the blueprint plates
        const plates = gsap.utils.toArray<SVGElement>('.blueprint-plate')
        gsap.from(plates, {
          opacity: 0,
          scale: 0.92,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.2,
        })
        plates.forEach((plate, i) => {
          const dir = i % 2 === 0 ? 1 : -1
          gsap.to(plate, {
            rotation: 5 * dir,
            x: 26 * dir,
            y: -20 * dir,
            duration: 16 + i * 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollTrack,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: pinnedViewport,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress > 0.35) {
                safePlay()
              } else if (self.progress < 0.15) {
                safePause()
              }
            },
          },
        })

        // Phase 1: Fade out surrounding typography & expand video card
        tl.to(
          [
            tagBadgeRef.current,
            headlinePart1Ref.current,
            headlinePart2Ref.current,
            descRef.current,
            scrollHintRef.current,
          ],
          {
            y: -30,
            scale: 0.9,
            opacity: 0,
            ease: 'power2.inOut',
            duration: 0.45,
            stagger: 0.02,
          },
          0
        )
          .to(
            '.blueprint-layer',
            {
              opacity: 0,
              scale: 1.05,
              ease: 'power2.inOut',
              duration: 0.5,
            },
            0
          )
          .to(
            videoCard,
            {
              // Portrait phones: show the whole 16:9 frame (no side crop), centred
              top: () =>
                isPortraitPhone()
                  ? (pinnedViewport.offsetHeight - (pinnedViewport.offsetWidth * 9) / 16) / 2
                  : 0,
              left: 0,
              width: () => pinnedViewport.offsetWidth,
              height: () =>
                isPortraitPhone()
                  ? (pinnedViewport.offsetWidth * 9) / 16
                  : pinnedViewport.offsetHeight,
              borderRadius: '0px',
              borderWidth: '0px',
              boxShadow: 'none',
              ease: 'power2.inOut',
              duration: 0.65,
            },
            0
          )
          .to(
            pinnedViewport,
            {
              backgroundColor: () => (isPortraitPhone() ? '#000000' : 'rgba(0,0,0,0)'),
              ease: 'power2.inOut',
              duration: 0.65,
            },
            0
          )
          .to(
            transportBarRef.current,
            {
              opacity: 1,
              ease: 'power1.out',
              duration: 0.25,
            },
            0.55
          )
          // Phase 2: Hold full-bleed playback state
          .to({}, { duration: 0.35 })

        const handleResize = () => {
          if (tl.progress() === 0) placeInSlot()
          ScrollTrigger.refresh()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      })

      // Reduced motion: no pin or expansion — card simply sits in its slot
      mm.add('(prefers-reduced-motion: reduce)', () => {
        placeInSlot()
        if (transportBarRef.current) gsap.set(transportBarRef.current, { opacity: 1 })
        const handleResize = () => placeInSlot()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAFAF8] text-[#0d0d0d]">
      {/* ══ GSAP Pin & Scrub Scroll Track (200vh mobile / 320vh desktop) ══ */}
      <div ref={scrollTrackRef} className="relative h-[200vh] w-full md:h-[320vh]">
        {/* Pinned Viewport Container */}
        <section
          ref={pinnedViewportRef}
          className="relative top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
        >
          {/* Architectural blueprint background: grid + 4 plate drawings */}
          <div className="blueprint-layer absolute inset-0 pointer-events-none overflow-hidden">
            {/* Fine drafting grid */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(107,184,90,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,184,90,0.10) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            {/* Major grid every 4 cells */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(107,184,90,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,184,90,0.16) 1px, transparent 1px)',
                backgroundSize: '192px 192px',
              }}
            />

            <BlueprintPlate label="016" className="w-[620px] h-[620px] -top-40 -left-32 opacity-50" />
            <BlueprintPlate label="017" className="w-[460px] h-[460px] -top-20 -right-24 opacity-40" />
            <BlueprintPlate label="018" className="w-[520px] h-[520px] -bottom-44 left-[14%] opacity-40" />
            <BlueprintPlate label="019" className="w-[700px] h-[700px] -bottom-56 -right-40 opacity-50" />

            {/* Soft radial wash so the centred headline stays legible */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,250,248,0.92)_0%,rgba(250,250,248,0.6)_38%,rgba(250,250,248,0)_70%)]" />
          </div>

          {/* Central Typographic Headline & Intro Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
            {/* Top Pill Eyebrow */}
            <div ref={tagBadgeRef} className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8960C]/40 bg-[#C8960C]/10 text-xs font-mono tracking-widest text-[#8a6508] uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9933] animate-pulse" />
                Message from the CEO
              </span>
            </div>

            {/* Main Headline (Row 1: Our Kitchen / Operations) */}
            <div className="flex flex-col items-center justify-center w-full">
              <h1
                ref={headlinePart1Ref}
                className="font-sans text-[2.1rem] min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#0d0d0d] leading-none"
              >
                Our Operations
              </h1>

              {/* Row 2: In + [Video Slot Spacer] + Action */}
              <div
                ref={headlinePart2Ref}
                className="flex items-center justify-center gap-2 min-[400px]:gap-3 sm:gap-5 md:gap-7 mt-3 sm:mt-5 w-full"
              >
                <span className="font-sans text-[2.1rem] min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#0d0d0d] leading-none">
                  In
                </span>

                {/* Invisible Document-Flow Slot where the floating video starts */}
                <div
                  ref={videoSlotRef}
                  className="w-[120px] min-[400px]:w-[140px] sm:w-[190px] md:w-[240px] h-[66px] min-[400px]:h-[75px] sm:h-[105px] md:h-[130px] rounded-2xl flex-shrink-0 opacity-0 pointer-events-none"
                />

                <span className="font-sans text-[2.1rem] min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#C8960C] leading-none">
                  Action
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p
              ref={descRef}
              className="mt-6 sm:mt-8 max-w-xl text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal"
            >
              From offshore energy rigs on the Atlantic to turnkey remote site dining—experience our
              state-of-the-art culinary production, high standards, and passionate Ghanaian workforce.
            </p>

            {/* Scroll indicator prompt */}
            <div
              ref={scrollHintRef}
              className="mt-6 flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc9933] animate-ping" />
              <span>Scroll to expand the video tour</span>
            </div>
          </div>

          {/* ══ Floating Expandable Video Card ══ */}
          <div
            ref={videoCardRef}
            onClick={togglePlay}
            className="absolute z-30 overflow-hidden shadow-[0_24px_60px_rgba(13,13,13,0.28)] border border-black/10 rounded-2xl cursor-pointer group select-none"
            style={{ willChange: 'transform, width, height, border-radius' }}
          >
            {/* Native Atlantic Catering MP4 Video */}
            <video
              ref={videoRef}
              src="https://atlanticcatering-gh.com/wp-content/uploads/2026/02/Home-Atlantic-Catering.mp4"
              loop
              muted={muted}
              playsInline
              preload="metadata"
              poster="/assets/images/thumbnail.png"
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="h-full w-full object-cover"
            />

            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Atlantic Catering Watermark Branding */}
            <div className="absolute bottom-14 right-6 z-20 flex items-center gap-2 pointer-events-none opacity-85">
              <div className="w-4 h-4 rounded-full bg-[#cc9933] flex items-center justify-center font-bold text-black text-[9px]">
                A
              </div>
              <span className="text-[11px] font-mono font-semibold tracking-wider text-white">
                ATLANTIC<span className="text-[#cc9933]">.GH</span>
              </span>
            </div>

            {/* Center Frosted Play / Pause Button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto transition-all duration-300">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-2xl transition-transform duration-200 group-hover:scale-105 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 ml-1 text-white fill-white" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </div>
            </div>

            {/* Bottom Transport Scrubber Bar (Visible when expanded) */}
            <div
              ref={transportBarRef}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center gap-3 sm:gap-4 opacity-0 transition-opacity duration-300 pointer-events-auto"
            >
              {/* Current time display */}
              <span className="font-mono text-xs text-white/90 font-medium">
                {currentTimeFormatted}
              </span>

              {/* Progress Bar Scrubber */}
              <div
                onClick={handleScrub}
                className="relative flex-1 flex items-center h-5 group/bar cursor-pointer"
              >
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#cc9933] rounded-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {/* Thumb Head */}
                <div
                  className="absolute w-3 h-3 rounded-full bg-white shadow-md -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity"
                  style={{ left: `${progress}%` }}
                />
              </div>

              {/* Mute Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 text-white/80 hover:text-white transition-colors"
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MissionVision
