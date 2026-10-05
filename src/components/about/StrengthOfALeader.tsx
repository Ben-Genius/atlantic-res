'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxSection from '@/components/about/ParallaxSection'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    title: 'Our Multi-Service Expertise',
    body: 'From catering and event management to camp and facility management, we will help your projects succeed.',
  },
  {
    title: 'Operational Excellence',
    body: 'We maintain a cutting-edge quality assurance approach that emphasizes food safety, health, and environmental standards, all based on ISO benchmarks.',
  },
  {
    title: 'Boosting Quality of Life',
    body: 'We empower our employees, clients and consumers with knowledge on healthier nutrition, sports and wellness practices.',
  },
  {
    title: "Our Team's Agility",
    body: 'Our adaptable employees are trained in agile working methods, ready to respond to your needs.',
  },
  {
    title: "Everyone's Responsibility",
    body: 'At Atlantic, WE CARE. Our action-oriented societal commitments are embraced by every member of our team.',
  },
  {
    title: 'The Spirit of Innovation',
    body: 'We are explorers of trends and consumer experiences, always looking to enhance what we offer.',
  },
]


/** Compact cards 02–04. Copy comes straight from PILLARS. */
const SMALL_CARDS = [
  { n: '02', pillar: PILLARS[1], card: 'bg-[#DCEEF5] text-[#14252A] lg:col-span-4', badge: 'bg-[#62BBD0]' },
  { n: '03', pillar: PILLARS[2], card: 'bg-[#CDEDCB] text-[#263419] lg:col-span-3', badge: 'bg-[#70CFA8]' },
  { n: '04', pillar: PILLARS[3], card: 'bg-[#F1DDF4] text-[#4D1555] lg:col-span-4', badge: 'bg-[#E1A6EE]' },
]

/** Drop the "At Atlantic, WE CARE." lead-in — the headline already says it. */
const CARE_BODY = PILLARS[4].body.replace('At Atlantic, WE CARE. ', '')

export default function StrengthOfALeader() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.strength-card')
        const heading = '.strength-heading'
        const statement = '.strength-statement'

        gsap.from(heading, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })

        gsap.from(cards, {
          opacity: 0,
          y: 55,
          scale: 0.97,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        })

        gsap.from('.strength-icon', {
          scale: 0,
          rotate: -60,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.8)',
          delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        })

        gsap.from(statement, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 62%',
            once: true,
          },
        })

        // Card hover
        cards.forEach((card) => {
          const icon = card.querySelector('.strength-icon')
          const arrow = card.querySelector('.strength-arrow')

          const enter = () => {
            gsap.to(card, {
              y: -6,
              scale: 1.012,
              duration: 0.35,
              ease: 'power3.out',
            })

            gsap.to(icon, {
              scale: 1.1,
              duration: 0.3,
              ease: 'power3.out',
            })

            gsap.to(arrow, {
              x: 5,
              duration: 0.25,
              ease: 'power3.out',
            })
          }

          const leave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power3.out',
            })

            gsap.to(icon, {
              scale: 1,
              duration: 0.35,
              ease: 'power3.out',
            })

            gsap.to(arrow, {
              x: 0,
              duration: 0.25,
              ease: 'power3.out',
            })
          }

          card.addEventListener('mouseenter', enter)
          card.addEventListener('mouseleave', leave)

          return () => {
            card.removeEventListener('mouseenter', enter)
            card.removeEventListener('mouseleave', leave)
          }
        })
      })

      return () => mm.revert()
    },
    {
      scope: sectionRef,
    }
  )

  return (
    <div ref={sectionRef} className="w-full px-6 py-16 md:px-16 md:py-24">
      <div className="mx-auto w-full max-w-[98%]">
        {/* Heading */}
        <div className="strength-heading mb-12 md:mb-16">
          <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[#cc9933]">
            The Atlantic Difference
          </p>

          <h2 className="font-serif text-[clamp(42px,5.5vw,84px)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#3C8B36]">
            The Strength
            <em className="font-normal italic text-[#cc9933]"> of a Leader</em>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
          {/* 01 — feature card */}
          <article className="strength-card relative flex min-h-[520px] flex-col overflow-hidden rounded-[22px] bg-[#3C0B43] p-7 text-white md:col-span-2 md:p-9 lg:col-span-5 lg:row-span-2 lg:min-h-0">
            <div className="strength-icon flex h-14 w-14 items-center justify-center rounded-full bg-[#D878D7] text-lg text-[#3C0B43]">
              01
            </div>

            <div className="mt-10 max-w-[440px]">
              <h3 className="text-[clamp(30px,3vw,46px)] font-medium leading-[1] tracking-[-0.045em]">
                {PILLARS[0].title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.65] text-white/70">{PILLARS[0].body}</p>
            </div>

            <div className="mt-auto pt-10">
              <div className="relative h-[220px] w-full overflow-hidden rounded-[14px] bg-[#52135b] md:h-[280px]">
                <Image
                  src="/assets/images/Services/camp.webp"
                  alt="Atlantic remote-site kitchen operations"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain object-bottom "
                />
              </div>
            </div>
          </article>

          {/* 02–04 — compact cards */}
          {SMALL_CARDS.map(({ n, pillar, card, badge }) => (
            <article
              key={n}
              className={`strength-card relative flex min-h-[220px] flex-col overflow-hidden rounded-[22px] p-7 md:min-h-[280px] md:p-8 ${card}`}
            >
              <div className="flex items-start justify-between">
                <div className={`strength-icon flex h-12 w-12 items-center justify-center rounded-full text-sm ${badge}`}>
                  {n}
                </div>
                <span className="strength-arrow text-xl leading-none opacity-70">→</span>
              </div>

              <div className="mt-auto pt-10">
                <h3 className="text-[clamp(24px,2vw,29px)] font-medium leading-[1.02] tracking-[-0.04em]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.6] text-black/65">{pillar.body}</p>
              </div>
            </article>
          ))}

          {/* 05 — closing statement */}
          <div className="strength-statement flex flex-col justify-center pt-6 md:col-span-1 md:pt-0 md:px-2 lg:col-span-3 lg:px-4">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#cc9933]">What drives us</p>

            <p className="text-[clamp(26px,2.3vw,34px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#3C8B36]">
              At Atlantic,
              <br />
              <span className="text-[#cc9933]">WE CARE.</span>
            </p>

            <div className="mt-6 space-y-5">
              <div className="border-t border-black/10 pt-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#3C8B36]">
                  05 · {PILLARS[4].title}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-black/60">{CARE_BODY}</p>
              </div>

              <div className="border-t border-black/10 pt-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#3C8B36]">
                  06 · {PILLARS[5].title}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-black/60">{PILLARS[5].body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
