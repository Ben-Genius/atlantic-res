'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICE_ICONS } from '@/components/icons/ServiceIcons'
import CtaSection from '@/components/home/CtaSection'
import BrandMarquee from '@/components/about/BrandMarquee'

gsap.registerPlugin(ScrollTrigger)

const BRAND_GREEN = '#0E3B2A'
const BRAND_GOLD = '#cc9933'

/**
 * Every service written up from the Brand Profile rather than the short
 * summary the page used to carry. Page references are kept against each
 * entry so the copy can be checked back to source.
 *
 * Ship Chandelling and Housekeeping have no dedicated spread in the profile;
 * their copy is marked `sourced: false` and still needs client sign-off.
 */
const SERVICES = [
  {
    id: 1,
    name: '24/7 Support Services',
    division: 'Support Division',
    source: 'Profile p.16',
    sourced: true,
    lede: 'Your trusted partner in success.',
    body: [
      'Since 2001, we have delivered comprehensive 24/7 support services across various essential management sites. We understand the diverse needs of our clients and provide tailored solutions that streamline operations and enhance employee well-being.',
      'We ensure that our clients’ operations run seamlessly, no matter how complex or remote.',
      'Our goal is to be more than just a service provider — we are your partner in success, committed to improving performance and adding value at every stage.',
    ],
    image: '/assets/images/Services/support.webp',
  },
  {
    id: 2,
    name: 'Offshore Catering & Supply Services',
    division: 'Offshore Division',
    source: 'Profile p.17',
    sourced: true,
    lede: 'Nourished teams, wherever the work takes them.',
    body: [
      'We redefine offshore catering and supply services by prioritizing the health and well-being of your teams in challenging marine environments. Recognizing the vital role that nutrition plays in maintaining morale and productivity, we deliver customized meal solutions that ensure your workforce stays focused on their tasks.',
      'With a robust supply chain designed for the offshore landscape, we ensure that fresh ingredients and essential supplies reach you on time, every time. Our logistical expertise means you can depend on us for smooth operations, even in the most challenging conditions.',
      'By partnering with us, you gain peace of mind, knowing that your teams are nourished and energized, no matter where their work takes them.',
    ],
    image: '/assets/images/Services/oNSHORE2.webp',
  },
  {
    id: 3,
    name: 'Inflight Catering',
    division: 'Aviation Division',
    source: 'Profile p.19',
    sourced: true,
    lede: 'The preferred choice for inflight dining in Ghana.',
    body: [
      'We provide top-tier inflight catering that enhances every journey. From executive charters to terminal services, we craft personalized menus that cater to every taste and dietary need.',
      'We are the preferred choice for an exceptional inflight dining experience in Ghana.',
    ],
    image: '/assets/images/Services/iNFLIGHTcatering.webp',
  },
  {
    id: 4,
    name: 'Event Planning & Management',
    division: 'Event Management',
    source: 'Profile p.19',
    sourced: true,
    lede: 'We will definitely impress your guests.',
    body: [
      'We excel in event planning and management, handling every detail with precision. From corporate gatherings to private celebrations, we offer tailored solutions that guarantee a memorable experience for all attendees.',
    ],
    image: '/assets/images/Services/eventt.webp',
  },
  {
    id: 5,
    name: 'Ship Chandelling',
    division: 'Maritime Supplies',
    source: 'No profile spread — copy pending client sign-off',
    sourced: false,
    lede: 'Provisions and stores for vessels of every kind.',
    body: [
      'Your reliable partner for complete ship chandelling, supplying provisions and stores to vessels of every kind.',
    ],
    image: '/assets/images/Services/ship-supplies.webp',
  },
  {
    id: 6,
    name: 'Housekeeping, Laundry & Cleaning Services',
    division: 'Facility Management',
    source: 'Covered within 360 Degrees by Atlantic — Profile p.15',
    sourced: false,
    lede: 'Safe, clean living conditions on every site.',
    body: [
      'Maintaining safe and clean living conditions with our comprehensive housekeeping, laundry, and cleaning services.',
      'These sit within 360 Degrees by Atlantic, our integrated camp and facilities offer, alongside pest control and landscaping.',
    ],
    image: '/assets/images/Services/housekeeping.webp',
  },
  {
    id: 7,
    name: 'Camp Management Services',
    division: 'Camp Operations',
    source: 'Profile p.15',
    sourced: true,
    lede: 'The backbone that keeps your operations running.',
    body: [
      'In Ghana and across Africa, we have earned a reputation as the go-to experts in remote site management. Whether on land or at sea, we deliver unmatched expertise at the continent’s largest mining, oil and gas sites.',
      'We understand that our clients need to focus on what they do best. That is why we have created a comprehensive solution: 360 Degrees by Atlantic.',
      'As service integrators, we go beyond catering to offer full camp and facilities management, including cleaning, laundry, pest control and landscaping.',
      'Our innovative operating systems and cutting-edge digital tools allow us to tailor our services to any environment, ensuring efficiency, accessibility and seamless operations, no matter how remote the location.',
      'At Atlantic, we’re more than just a service provider — we are the backbone that keeps your operations running smoothly.',
    ],
    image: '/assets/images/Services/camp.webp',
    model: {
      title: '360 Degrees by Atlantic',
      parts: ['Cleaning', 'Laundry', 'Pest Control', 'Landscaping'],
    },
  },
  {
    id: 8,
    name: 'VIP Catering',
    division: 'Executive Division',
    source: 'Profile p.18',
    sourced: true,
    lede: 'The preferred partner for VIP clients across Africa.',
    body: [
      'We are the go-to choice for VIP catering, offering consistent, high-quality service across our network. Our dedicated team manages all VIP requirements, ensuring a unique experience for our clients, no matter where they are.',
      'Having built a strong VIP business and expanded our relationships, we are now the preferred partner for numerous VIP clients in Ghana and across Africa.',
      'We leverage technology to enhance our catering services and meet the evolving needs of our customers.',
    ],
    image: '/assets/images/Services/vip.webp',
  },
]

/** Fleet and cold-chain capability, Brand Profile p.29. */
const FLEET = [
  { count: '2', label: 'Custom 28ft mobile kitchen trailers, compliant with HACCP and ISO standards' },
  { count: '14', label: 'Vans and pickups — 10 vans, 4 pickups — for efficient, timely service' },
  { count: '3', label: 'Staff buses supporting our team’s mobility' },
  { count: '5', label: '40ft mobile and prep kitchens' },
  { count: '6', label: '10ft DNV reefer containers' },
  { count: '3', label: '40ft reefer containers' },
  { count: '4', label: '20ft reefer containers' },
  { count: '5', label: '40ft dry containers' },
  { count: '2', label: '20ft dry containers' },
  { count: '2', label: '10ft DNV dry containers' },
  { count: '1', label: 'Truck and trailer for large events and remote setups' },
  { count: '1', label: 'Forklift for precise handling and distribution of supplies' },
]

function ServiceBlock({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = SERVICE_ICONS[service.id]
  const onGreen = index % 2 === 0
  const ground = onGreen ? BRAND_GREEN : BRAND_GOLD
  const flipped = index % 2 === 1

  return (
    <article
      id={`service-${service.id}`}
      className="service-block scroll-mt-24 overflow-hidden rounded-[28px]"
      style={{ backgroundColor: ground }}
    >
      <div className={`flex flex-col ${flipped ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Photograph */}
        <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-[46%] lg:min-h-[540px]">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
        </div>

        {/* Copy */}
        <div className="flex-1 p-8 md:p-12 lg:p-14 text-white">
          <div className="flex items-center gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/15"
              aria-hidden
            >
              {Icon ? <Icon className="h-8 w-8 text-white" /> : null}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
              {service.division}
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[1.75rem] md:text-[2.25rem] font-semibold leading-tight">
            {service.name}
          </h2>
          <p className="mt-3 text-base md:text-lg font-medium text-white/85">{service.lede}</p>

          <div className="mt-6 space-y-4">
            {service.body.map(para => (
              <p key={para} className="text-sm md:text-[15px] leading-relaxed text-white/75">
                {para}
              </p>
            ))}
          </div>

          {service.model && (
            <div className="mt-8 rounded-2xl border border-white/20 bg-white/[0.07] p-6">
              <p className="font-display text-lg font-bold">{service.model.title}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {service.model.parts.map(part => (
                  <li
                    key={part}
                    className="rounded-full border border-white/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
                  >
                    {part}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:border-white"
          >
            Request this service
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function ExpertisePage() {
  const pageRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const blocks = gsap.utils.toArray<HTMLElement>('.service-block')
      const tweens = blocks.map(block =>
        gsap.from(block, {
          opacity: 0,
          y: 48,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 82%', once: true },
        })
      )

      const fleet = gsap.from('.fleet-cell', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.fleet-grid', start: 'top 82%', once: true },
      })

      return () => {
        tweens.forEach(t => t.kill())
        fleet.kill()
      }
    })

    return () => mm.revert()
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="bg-[#FAFAF8]">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[62vh] items-center overflow-hidden px-6 md:px-12 pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-expertise.png"
            alt=""
            fill
            priority
            className="object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/70 to-[#0d0d0d]/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-8xl">
          <span className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#cc9933]">
            Our Suite of Services
          </span>
          <h1 className="mt-5 font-serif text-[2.5rem] md:text-[4.4rem] font-semibold leading-[1.05] text-white">
            Our offerings are vast,<br />
            <em className="not-italic font-normal italic text-[#D4A556]">our people-first approach</em><br />
            is at the core of each one.
          </h1>
          <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-white/75">
            Eight core services delivered across offshore, remote-site, aviation and executive
            operations in Ghana and across Africa.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden flex-col items-center gap-3 sm:flex">
          <span className="text-[9px] font-semibold uppercase tracking-[0.42em] text-white/55">
            Eight core services
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[#D4A556] to-transparent" />
        </div>
      </section>

      {/* ── Service index ───────────────────────────────────── */}
      <section className="mx-auto max-w-8xl px-6 md:px-12 py-14">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {SERVICES.map(service => {
            const Icon = SERVICE_ICONS[service.id]
            return (
              <li key={service.id}>
                <a
                  href={`#service-${service.id}`}
                  className="flex h-full flex-col items-center gap-3 rounded-2xl border border-black/[0.08] bg-white px-3 py-6 text-center transition-colors hover:border-[#cc9933]/50"
                >
                  {Icon ? <Icon className="h-9 w-9" style={{ color: BRAND_GOLD }} /> : null}
                  <span className="text-[11px] md:text-xs font-semibold leading-snug text-[#0d0d0d]/80">
                    {service.name}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ── Service write-ups ───────────────────────────────── */}
      <section className="mx-auto max-w-8xl px-6 md:px-12 pb-20">
        <div className="flex flex-col gap-8 md:gap-12">
          {SERVICES.map((service, i) => (
            <ServiceBlock key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>



      {/* ── Logistics fleet ─────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-8xl">
          <h2 className="font-serif text-[2rem] md:text-[3rem] font-semibold leading-tight text-[#3C8B36]">
            Our <em className="not-italic font-normal italic text-[#cc9933]">Logistics</em>
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-[#0d0d0d]/70">
            Over the past decade, we have expanded our operations to offer comprehensive hospitality
            solutions beyond traditional catering services. Our logistical capabilities are integral
            to delivering exceptional service across diverse environments.
          </p>

          <div className="fleet-grid mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {FLEET.map(item => (
              <div key={item.label} className="fleet-cell border-t border-[#3C8B36]/20 pt-4">
                <span className="block font-display text-[2rem] md:text-[2.5rem] font-bold leading-none text-[#3C8B36]">
                  {item.count}
                </span>
                <p className="mt-2 text-[11px] md:text-xs leading-snug text-[#0d0d0d]/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white">
      </div>
    </main>
  )
}
