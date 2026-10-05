'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        placeInSlot()

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
            '.orbital-ring',
            {
              opacity: 0.08,
              scale: 1.1,
              ease: 'power2.inOut',
              duration: 0.5,
            },
            0
          )
          .to(
            videoCard,
            {
              top: 0,
              left: 0,
              width: () => pinnedViewport.offsetWidth,
              height: () => pinnedViewport.offsetHeight,
              borderRadius: '0px',
              borderWidth: '0px',
              boxShadow: 'none',
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
    <div ref={containerRef} className="relative w-full bg-[#0b0b0c] text-white">
      {/* ══ GSAP Pin & Scrub Scroll Track (320vh total distance) ══ */}
      <div ref={scrollTrackRef} className="relative w-full" style={{ height: '320vh' }}>
        {/* Pinned Viewport Container */}
        <section
          ref={pinnedViewportRef}
          className="relative top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
        >
          {/* Concentric Orbital Rings & Background Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Inner dashed ring */}
            <div
              className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-white/10"
              style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
            />

            {/* Middle orbital ring with glowing nodes */}
            <div
              className="orbital-ring absolute w-[640px] h-[640px] sm:w-[840px] sm:h-[840px] rounded-full border border-dashed border-white/[0.08]"
              style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
            >
              {/* Planetary node top-left */}
              <div
                className="absolute w-3 h-3 rounded-full bg-[#cc9933] shadow-[0_0_16px_rgba(204,153,51,0.9)]"
                style={{ top: '15%', left: '18%', transform: 'translate(-50%, -50%)' }}
              />
              {/* Planetary node right */}
              <div
                className="absolute w-3 h-3 rounded-full bg-[#cc9933] shadow-[0_0_16px_rgba(204,153,51,0.9)]"
                style={{ top: '50%', right: '-6px', transform: 'translate(50%, -50%)' }}
              />
              {/* Planetary node bottom-left */}
              <div
                className="absolute w-3 h-3 rounded-full bg-[#cc9933] shadow-[0_0_16px_rgba(204,153,51,0.9)]"
                style={{ bottom: '12%', left: '22%', transform: 'translate(-50%, 50%)' }}
              />
            </div>

            {/* Outer subtle orbital ring */}
            <div
              className="orbital-ring absolute w-[1100px] h-[1100px] sm:w-[1300px] sm:h-[1300px] rounded-full border border-white/[0.04]"
              style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
            />

            {/* Ambient gold glow vignette */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#cc9933]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
          </div>

          {/* Central Typographic Headline & Intro Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
            {/* Top Pill Eyebrow */}
            <div ref={tagBadgeRef} className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#cc9933]/30 bg-[#cc9933]/10 text-xs font-mono tracking-widest text-[#cc9933] uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cc9933] animate-pulse" />
                Message from the CEO
              </span>
            </div>

            {/* Main Headline (Row 1: Our Kitchen / Operations) */}
            <div className="flex flex-col items-center justify-center w-full">
              <h1
                ref={headlinePart1Ref}
                className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-white leading-none"
              >
                Our Operations
              </h1>

              {/* Row 2: In + [Video Slot Spacer] + Action */}
              <div
                ref={headlinePart2Ref}
                className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 mt-3 sm:mt-5 w-full"
              >
                <span className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-white leading-none">
                  In
                </span>

                {/* Invisible Document-Flow Slot where the floating video starts */}
                <div
                  ref={videoSlotRef}
                  className="w-[140px] sm:w-[190px] md:w-[240px] h-[75px] sm:h-[105px] md:h-[130px] rounded-2xl flex-shrink-0 opacity-0 pointer-events-none"
                />

                <span className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#cc9933] leading-none">
                  Action
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p
              ref={descRef}
              className="mt-6 sm:mt-8 max-w-xl text-slate-400 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal"
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
            className="absolute z-30 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] border border-white/10 rounded-2xl cursor-pointer group select-none"
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
              className="w-full h-full object-cover"
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
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white shadow-2xl transition-transform duration-200 group-hover:scale-105 ${
                  isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
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
