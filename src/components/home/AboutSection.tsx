'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { values } from '@/data/home'
import CtaButton from '@/components/ui/CtaButton'
import type { LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TITLE_LINE_1 = 'Focus on work,'
const TITLE_LINE_2 = "we'll take care of"
const TITLE_LINE_3 = "everything else"


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const titleLine1Ref = useRef<HTMLSpanElement>(null)
  const titleLine2Ref = useRef<HTMLSpanElement>(null)
  const titleLine3Ref = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const setupTypewriter = (el: HTMLSpanElement | null, text: string) => {
        if (!el) return []
        el.innerHTML = ''
        return text.split('').map((ch) => {
          const s = document.createElement('span')
          s.textContent = ch === ' ' ? '\u00A0' : ch
          s.style.display = 'inline-block'
          s.style.opacity = '0'
          el.appendChild(s)
          return s
        })
      }
      const line1Chars = setupTypewriter(titleLine1Ref.current, TITLE_LINE_1)
      const line2Chars = setupTypewriter(titleLine2Ref.current, TITLE_LINE_2)
      const line3Chars = setupTypewriter(titleLine3Ref.current, TITLE_LINE_3)

      // Reveal timeline (Eyebrow -> Heading first -> Body copy follows)
      const revealTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
      revealTl
        .from('.about-eyebrow', { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' })
        .to(line1Chars, { opacity: 1, duration: 0.01, stagger: 0.025, ease: 'none' }, '-=0.2')
        .to(line2Chars, { opacity: 1, duration: 0.01, stagger: 0.025, ease: 'none' }, '>-0.05')
        .to(line3Chars, { opacity: 1, duration: 0.01, stagger: 0.025, ease: 'none' }, '>-0.05')
        .from('.about-desc-para', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: 0.15 }, '>-0.1')
        .from('.about-cta-row', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '>-0.2')
        .from(imageWrapRef.current, { opacity: 0, scale: 0.94, duration: 1.2, ease: 'power3.out' }, '<-0.8')

      if (imageWrapRef.current) {
        gsap.to(imageWrapRef.current, {
          y: -14,
          duration: 12,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      }

      // Watermark zoom/scale animation on scroll
      gsap.fromTo('.watermark-text',
        { scale: 0.8, opacity: 0.4 },
        {
          scale: 1.15,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      )

      // Dishes rotate on scroll (slower rotation)
      if (imageWrapRef.current) {
        gsap.to(imageWrapRef.current.querySelector('img'), {
          rotation: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        })
      }
      gsap.to('.float-dish-tr img', {
        rotation: -360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
      gsap.to('.float-dish-bl img', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Add-on dishes image swap/transition on scroll
      gsap.to('.tr-dish-1', {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'top 5%',
          scrub: true,
        }
      })
      gsap.to('.tr-dish-2', {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'top 5%',
          scrub: true,
        }
      })
      gsap.to('.bl-dish-1', {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'top 5%',
          scrub: true,
        }
      })
      gsap.to('.bl-dish-2', {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'top 5%',
          scrub: true,
        }
      })

      // Floating animations for add-on dishes
      gsap.to('.float-dish-tr', {
        y: 15,
        x: -8,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to('.float-dish-bl', {
        y: -12,
        x: 6,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      if (valuesRef.current) {
        gsap.from(valuesRef.current.querySelectorAll('.about-value-card'), {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: valuesRef.current, start: 'top 92%', once: true },
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: '100vh' }}
    >
      {/* ─── Watermark — fully visible and smaller ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-24px] z-20 overflow-hidden w-full flex justify-center"
        style={{ lineHeight: 1, }}
      >
        <span
          className="watermark-text block select-none whitespace-nowrap tracking-[10px] text-center font-black uppercase text-[#dedede]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3.5rem, 9.5vw, 10.5rem)',
          }}
        >
          Reliable. Flexible &amp; Safe
        </span>
      </div>

      {/* ─── Add-on dishes (Top Right & Bottom Left) ─── */}
      <div className="pointer-events-none absolute right-[-80px] md:right-[-120px] top-[10%] z-10 w-[180px] h-[180px] md:w-[320px] md:h-[320px] aspect-square overflow-hidden will-change-transform float-dish-tr hidden lg:block">
        <Image
          src="/assets/images/dishes/seafood.png"
          alt="Top right dish 1"
          fill
          className="object-contain rounded-full tr-dish-1"
        />
        <Image
          src="/assets/images/dishes/steak.png"
          alt="Top right dish 2"
          fill
          className="object-contain rounded-full absolute inset-0 opacity-0 tr-dish-2"
        />
      </div>

      <div className="pointer-events-none absolute left-[-60px] md:left-[-100px] bottom-[18%] z-10 w-[140px] h-[140px] md:w-[260px] md:h-[260px] aspect-square overflow-hidden will-change-transform float-dish-bl hidden lg:block">
        <Image
          src="/assets/images/dishes/jollof.png"
          alt="Bottom left dish 1"
          fill
          className="object-contain rounded-full bl-dish-1"
        />
        <Image
          src="/assets/images/dishes/appetizer.png"
          alt="Bottom left dish 2"
          fill
          className="object-contain rounded-full absolute inset-0 opacity-0 bl-dish-2"
        />
      </div>

      {/* ─── Main two-column grid ─── */}
      <div
        className="relative flex flex-col"
        style={{ minHeight: 'calc(100vh - 100px)' }}
      >
        <div className="flex flex-1 flex-col lg:flex-row">

          {/* LEFT — main dish (centered and closer to copy) */}
          <div
            className="relative flex items-center justify-center lg:justify-end mt-12 lg:mt-30 w-full lg:w-[58%] lg:flex-[0_0_58%] pr-0 lg:pr-[4vw]"
          >
            <div
              ref={imageWrapRef}
              className="relative will-change-transform top-[2rem] lg:top-[4rem]"
              style={{
                width: 'clamp(280px, 54vw, 760px)',
                height: 'clamp(280px, 54vw, 760px)',
              }}
            >
              <Image
                src="/assets/images/testImage.png"
                alt="Atlantic — signature dish"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
                priority
              />
            </div>

          </div>

          {/* RIGHT — copy, vertically centred */}
          <div
            className="flex flex-1 flex-col justify-center pb-10 px-6 pt-10
                        lg:pb-0 lg:pl-4 lg:pr-[7vw] lg:pt-0"
          >
            {/* Eyebrow */}
            <div className="about-eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#57C157]" />
              <span
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: '#57C157' }}
              >
                Since 2014
              </span>
            </div>

            {/* Headline — bold condensed uppercase, like inspo */}
            <h1
              className="mb-6 font-black uppercase leading-[1.05] tracking-tight text-[#1a1a1a] z-10"
              style={{ fontSize: 'clamp(2.6rem, 4vw, 4.6rem)' }}
            >
              <span ref={titleLine1Ref} className="block" aria-label={TITLE_LINE_1}>
                {TITLE_LINE_1}
              </span>
              <span ref={titleLine2Ref} className="block" aria-label={TITLE_LINE_2}>
                {TITLE_LINE_2}
              </span>
              <span ref={titleLine3Ref} className="block" aria-label={TITLE_LINE_3}>
                {TITLE_LINE_3}
              </span>
            </h1>

            {/* Body */}
            <div ref={descRef} className="mb-8 max-w-[460px]">
              <p className="about-desc-para mb-4 text-[0.96rem] leading-[1.82] text-[rgba(26,26,26,0.58)]">
                Atlantic adapts to your business in motion with tailored solutions and certified,
                safely delivered meals. With safety and cleanliness at our core, we are proud to
                hold three ISO certifications.
              </p>
              <p className="about-desc-para text-[0.96rem] leading-[1.82] text-[rgba(26,26,26,0.58)]">
                From boardrooms to offshore sites, we deliver world-class catering services and
                custom support so you can keep your focus entirely on what is important.
              </p>
            </div>

            {/* CTA row */}
            <div className="about-cta-row flex flex-wrap items-center gap-6">
              <CtaButton href="/expertise" label="Our Expertise" />

              <a
                href="tel:+233302000000"
                className="group flex items-center gap-2.5 text-sm font-semibold text-[#1a1a1a] transition-colors hover:text-[#57C157]"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] transition-colors group-hover:border-[#57C157]"
                >
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.9"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.6 12.08 19.79 19.79 0 0 1 1.53 3.5 2 2 0 0 1 3.5 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l1.45-1.45a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                +233 302 000 000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom value pills — full width, hugs the bottom ─── */}
      {/* <div
        ref={valuesRef}
        className="relative z-20 w-full border-t border-[#e8e8e8] bg-white"
      >
        <div className="grid grid-cols-1 divide-y divide-[#e8e8e8] md:grid-cols-3 md:divide-x md:divide-y-0">
          {values.slice(0, 3).map(({ Icon, title, desc }) => (
            <ValuePill key={title} Icon={Icon} title={title} desc={desc} />
          ))}
        </div>
      </div> */}
    </section>
  )
}

function ValuePill({
  Icon, title, desc,
}: {
  Icon: LucideIcon
  title: string
  desc: string
}) {
  return (
    <div className="about-value-card flex items-center gap-4 px-10 py-7 transition-colors duration-200 hover:bg-[#f8f8f6]">
      {/* Circular icon — matches inspo style exactly */}
      <div
        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full"
        style={{ background: 'rgba(87,193,87,0.10)' }}
      >
        <Icon className="h-[22px] w-[22px]" style={{ color: '#57C157' }} />
      </div>
      <div>
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">
          {title}
        </p>
        <p className="mt-0.5 text-[0.82rem] text-[rgba(26,26,26,0.48)]">{desc}</p>
      </div>
    </div>
  )
}