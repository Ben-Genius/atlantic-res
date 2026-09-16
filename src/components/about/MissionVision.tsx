import { useGSAP } from '@gsap/react'
import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CARDS = [
  { label: 'Our Mission', color: '#cc9933', title: 'QUALITY MEALS', body: 'To provide quality, healthy, nutritious, and hygienically-prepared meals and excellent services to our clients and partners.' },
  { label: 'Our Vision', color: '#3C8B36', title: 'AFRICAN LEADERSHIP', body: 'To lead the hospitality and food industry in Africa and beyond while maintaining our quality, reliability, uniqueness, excellence, and creativity in our product and service delivery.' },
  { label: 'Our Goal', color: '#60A5FA', title: 'TOP STANDARDS', body: 'To ensure maximum customer satisfaction by completing every aspect of our production process to the highest industry standards in line with ACLL’s Integrated Management Systems Program' },
]

export default function MissionVision() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  // Keep the element's mute state in sync — playback itself only ever
  // starts from togglePlay, on a click, never automatically.
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
    }
  }, [muted])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted(prev => {
      const nextMuted = !prev
      if (videoRef.current) {
        videoRef.current.muted = nextMuted
      }
      return nextMuted
    })
  }

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from('.ceo-video', {
      x: -40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    gsap.from('.ceo-quote', {
      x: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    gsap.from('.quote-line', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none none',
      }
    })

    gsap.from('.cert-badge', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    })

  }, { scope: sectionRef })
  return (
    <section className="scroll-reveal w-full px-6 md:px-16 py-16">

      <div className="quote-line flex items-center gap-3">
        <div className="w-8 h-px bg-[#cc9933]" />
        <span className="font-inter text-[#cc9933] text-xs font-bold uppercase tracking-[0.35em]">
          Message from the CEO
        </span>
      </div>

      <section
        ref={sectionRef}
        className="scroll-reveal relative w-full overflow-hidden py-8"
      >

        <div className="flex flex-col">

          {/* ══ Video — full width, rectangular ══ */}
          <div className="ceo-video relative z-10 w-full">
            <div
              onClick={togglePlay}
              className="w-full aspect-video md:aspect-[21/9] relative overflow-hidden group cursor-pointer bg-black/40 rounded-lg"
            >
              <video
                ref={videoRef}
                src="https://atlanticcatering-gh.com/wp-content/uploads/2026/02/Home-Atlantic-Catering.mp4"

                loop
                muted={muted}
                playsInline
                controls
                poster="/assets/images/thumbnail.png"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Big Play Button overlay if video was paused by browser autoplay restriction */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-[#cc9933] flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Mute / Unmute toggle */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/15 text-white px-3 py-2 rounded-full transition-all"
              >
                {muted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
                <span className="font-inter text-[10px] uppercase tracking-widest">
                  {muted ? 'Unmute' : 'Mute'}
                </span>
              </button>
            </div>
          </div>


        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/10 last:border-r-0 last:border-b-0 group hover:bg-black/[0.03] transition-colors"
          >
            <span className="block font-inter text-xs font-bold uppercase tracking-widest mb-4" style={{ color: card.color }}>
              {card.label}
            </span>
            <h3 className="font-black text-3xl md:text-4xl uppercase tracking-tight text-[#0d0d0d] leading-none mb-5">
              {card.title}
            </h3>
            <p className="font-inter text-[#0d0d0d]/65 text-sm leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
