'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { values } from '@/data/home'
import CtaButton from '@/components/ui/CtaButton'
import type { LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FRAME_COUNT = 104
const FRAME_PATH = (i: number) =>
  `/frames/hero/ezgif-frame-${String(i).padStart(3, '0')}.png`

const TITLE_LINE_1 = 'A Ghanaian Legacy'
const TITLE_LINE_2 = 'of Culinary Pride'

// Chroma-aware luma key — kills near-white background without eating
// into bright food highlights.
function keyImage(
  img: HTMLImageElement,
  hi: number,
  lo: number,
): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const cx = c.getContext('2d')
  if (!cx) return c
  cx.drawImage(img, 0, 0)
  const data = cx.getImageData(0, 0, c.width, c.height)
  const px = data.data
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i]
    const g = px[i + 1]
    const b = px[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    const chroma = Math.max(r, g, b) - Math.min(r, g, b)
    if (lum >= hi && chroma < 20) {
      px[i + 3] = 0
    } else if (lum > lo && chroma < 35) {
      const t = (hi - lum) / (hi - lo)
      px[i + 3] = px[i + 3] * Math.max(0, Math.min(1, t))
    }
  }
  cx.putImageData(data, 0, 0)
  return c
}

export default function AboutSection() {
  // Outer scroll-root controls scroll length ("scroll budget" for animation)
  const scrollRootRef = useRef<HTMLDivElement>(null)
  // Inner stage gets pinned and holds content
  const stageRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const titleLine1Ref = useRef<HTMLSpanElement>(null)
  const titleLine2Ref = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(0)

  useGSAP(
    () => {
      // ----- Typewriter setup -----
      const setupTypewriter = (
        el: HTMLSpanElement | null,
        text: string,
      ): HTMLSpanElement[] => {
        if (!el) return []
        el.innerHTML = ''
        const spans: HTMLSpanElement[] = []
        text.split('').forEach((ch) => {
          const s = document.createElement('span')
          s.textContent = ch === ' ' ? '\u00A0' : ch
          s.style.display = 'inline-block'
          s.style.opacity = '0'
          el.appendChild(s)
          spans.push(s)
        })
        return spans
      }
      const line1Chars = setupTypewriter(titleLine1Ref.current, TITLE_LINE_1)
      const line2Chars = setupTypewriter(titleLine2Ref.current, TITLE_LINE_2)

      // ----- Master reveal timeline -----
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      revealTl.from('.about-label', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      })
      revealTl.from(
        '.about-wordmark',
        { opacity: 0, y: -30, duration: 1.2, ease: 'power3.out' },
        '<',
      )
      revealTl.to(
        line1Chars,
        { opacity: 1, duration: 0.01, stagger: 0.025, ease: 'none' },
        '-=0.2',
      )
      revealTl.to(
        line2Chars,
        { opacity: 1, duration: 0.01, stagger: 0.025, ease: 'none' },
        '>-0.1',
      )
      revealTl.from(
        '.about-desc-para',
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        },
        '>-0.2',
      )
      revealTl.from(
        '.about-cta',
        { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' },
        '>-0.4',
      )

      // ----- Stop-motion dish setup -----
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const frames: (HTMLCanvasElement | null)[] = new Array(FRAME_COUNT).fill(
        null,
      )
      const frameState = { index: 0 }

      const render = () => {
        const src = frames[Math.round(frameState.index)]
        if (!src) return
        const rect = canvas.getBoundingClientRect()
        ctx.clearRect(0, 0, rect.width, rect.height)
        const iw = src.width
        const ih = src.height
        const scale = Math.min(rect.width / iw, rect.height / ih) * 1.0
        const w = iw * scale
        const h = ih * scale
        const x = (rect.width - w) / 2
        const y = (rect.height - h) / 2
        ctx.drawImage(src, x, y, w, h)
      }

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        render()
      }

      let loadedCount = 0
      for (let i = 0; i < FRAME_COUNT; i++) {
        const idx = i
        const img = new window.Image()
        img.decoding = 'async'
        img.src = FRAME_PATH(idx + 1)
        const finish = () => {
          if (img.complete && img.naturalWidth > 0) {
            try {
              frames[idx] = keyImage(img, 245, 180)
            } catch {
              /* swallow */
            }
          }
          loadedCount += 1
          setLoaded(loadedCount)
          if (loadedCount === FRAME_COUNT) {
            resize()
            ScrollTrigger.refresh()
          }
        }
        img.onload = finish
        img.onerror = finish
      }

      window.addEventListener('resize', resize)
      resize()

      // ----- PINNED scroll-scrubbed frame playback -----
      // Stage is pinned while user scrolls through scrollRoot's extra height.
      // Frames must fully complete before pin releases and page advances.
      const scrub = gsap.to(frameState, {
        index: FRAME_COUNT - 1,
        ease: 'none',
        snap: 'index',
        scrollTrigger: {
          trigger: scrollRootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        },
        onUpdate: render,
      })

      // Description "breathing" — opacity tied to pinned scroll range
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0.75 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scrollRootRef.current,
              start: 'top top',
              end: '40% top',
              scrub: 0.6,
            },
          },
        )
        gsap.fromTo(
          descRef.current,
          { opacity: 1 },
          {
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: scrollRootRef.current,
              start: '70% top',
              end: 'bottom bottom',
              scrub: 0.6,
            },
          },
        )
      }

      // Values reveal — fires after pin releases and they enter view
      if (valuesRef.current) {
        gsap.from(valuesRef.current.querySelectorAll('.about-value-card'), {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }

      // Idle float
      if (canvasWrapRef.current) {
        gsap.to(canvasWrapRef.current, {
          y: -10,
          duration: 5.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      }

      return () => {
        window.removeEventListener('resize', resize)
        scrub.scrollTrigger?.kill()
      }
    },
    { scope: scrollRootRef },
  )

  const progress = Math.round((loaded / FRAME_COUNT) * 100)

  return (
    <>
      {/* scroll-root provides 250vh of scroll budget; stage stays pinned */}
      <div ref={scrollRootRef} className="relative h-[250vh] bg-white">
        <section
          ref={stageRef}
          className="relative h-screen w-full overflow-hidden bg-white"
        >
          {/* Backdrop wordmark */}
          <div className="pointer-events-none absolute inset-x-0 -top-4 z-10 flex justify-center z-0">
            <span
              aria-hidden
              className="about-wordmark select-none whitespace-nowrap font-black uppercase text-green/[0.5] leading-none tracking-wider"
              style={{
                fontFamily: "'Antonio', sans-serif",
                fontSize: 'clamp(30px, 10vw, 100px)',
                transform: 'scaleY(1.2)',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="brand-line" />

              About Atlantic
              <span className="brand-line" />

            </span>
          </div>


          {/* MAIN GRID — fills the full pinned stage height */}
          <div className="relative z-10 h-full w-full pt-20 lg:pt-24 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-stretch">
              {/* LEFT — dish bleeds off left edge, fills full column height */}
              <div className="relative order-2 lg:order-1 lg:col-span-7 lg:-ml-[3vw] h-full">
                <div className="relative h-full w-full">
                  {loaded < FRAME_COUNT && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-px w-32 overflow-hidden bg-black/10">
                          <div
                            className="h-full bg-[#57C157] transition-[width] duration-150"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] tracking-[0.3em] text-black/40">
                          {progress}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    ref={canvasWrapRef}
                    className="absolute inset-0 will-change-transform"
                  >
                    <canvas
                      ref={canvasRef}
                      className="block h-full w-full object-contain mix-blend-multiply drop-shadow-[0_30px_45px_rgba(0,0,0,0.12)]"
                    />
                  </div>

                  {/* Soft right-edge fade into copy column */}
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-[28%]"
                    style={{
                      background:
                        'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 60%, white 100%)',
                    }}
                  />

                  <div className="absolute bottom-4 left-[8vw] text-[10px] tracking-[0.35em] text-black/40 uppercase">
                    <span className="inline-block w-6 h-px bg-[#57C157] mr-2 align-middle" />
                    Scroll to plate
                  </div>
                </div>
              </div>

              {/* RIGHT — copy vertically centered in the column */}
              <div className="order-1 lg:order-2 lg:col-span-5 px-6 lg:pr-[6vw] lg:pl-0 flex items-center">
                <div className="w-full">
                  <h2
                    className="font-serif font-semibold text-[#1a1a1a] mb-8"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      lineHeight: 1.05,
                    }}
                  >
                    <span
                      ref={titleLine1Ref}
                      className="block"
                      aria-label={TITLE_LINE_1}
                    >
                      {TITLE_LINE_1}
                    </span>
                    <span
                      ref={titleLine2Ref}
                      className="block"
                      aria-label={TITLE_LINE_2}
                    >
                      {TITLE_LINE_2}
                    </span>
                  </h2>

                  <div ref={descRef}>
                    <p className="about-desc-para text-[rgba(26,26,26,0.65)] leading-[1.85] mb-5 max-w-[560px] bg-white">
                      Atlantic Catering and Logistics Limited is a wholly-owned
                      Ghanaian professional corporate catering company
                      established in 2014. We specialize in onshore and
                      offshore catering, camp management, ship and store
                      supplies, laundry, housekeeping, and janitorial services.
                    </p>
                    <p className="about-desc-para text-[rgba(26,26,26,0.65)] leading-[1.85] mb-10 max-w-[560px]">
                      Our service model is built for complex environments
                      where reliability, quality, and compliance matter most —
                      including operations aboard two FPSOs in Ghana&apos;s
                      oil and gas sector.
                    </p>
                  </div>

                  <div className="about-cta">
                    <CtaButton href="/expertise" label="Our Expertise" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* VALUES — separate section AFTER pinned stage, normal flow */}
      <section className="bg-white py-section">
        <div className="container-xl">
          <div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[.07]"
          >
            {values.map(({ Icon, title, desc }) => (
              <ValueCard key={title} Icon={Icon} title={title} desc={desc} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ValueCard({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon
  title: string
  desc: string
}) {
  return (
    <div className="about-value-card flex gap-5 p-8 bg-[#fafaf8] hover:bg-[#f2f2f0] transition-colors duration-300">
      <div className="w-11 h-11 bg-[rgba(103,186,103,0.12)] border border-[rgba(103,186,103,0.3)] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#57C157]" />
      </div>
      <div>
        <div className="font-serif text-[1.2rem] font-semibold text-[#1a1a1a] mb-1.5">
          {title}
        </div>
        <div className="text-sm text-[rgba(26,26,26,0.55)] leading-[1.65]">
          {desc}
        </div>
      </div>
    </div>
  )
}