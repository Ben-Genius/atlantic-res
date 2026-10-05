'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    label: 'Our Vision',
    body: 'To lead the hospitality and food industry in Africa and beyond while maintaining our quality, reliability, uniqueness, excellence, and creativity in our product and service delivery.',
    image: '/assets/images/cutouts/dish3.png',
  },
  {
    label: 'Our Mission',
    body: 'To provide quality, healthy, nutritious, and hygienically-prepared meals and excellent services to our clients and partners.',
    image: '/assets/images/cutouts/dish6.png',
  },
  {
    label: 'Our Goal',
    body: 'To ensure maximum customer satisfaction by completing every aspect of our production process to the highest industry standards in line with ACLL’s Integrated Management Systems Program',
    image: '/assets/images/cutouts/dish2.png',
  },
]

export default function AboutEditorial() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.mv-row')

        rows.forEach((row) => {
          const heading = row.querySelector('.mv-heading')
          const copy = row.querySelector('.mv-copy')
          const image = row.querySelector('.mv-image')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              end: 'top 42%',
              scrub: 1,
            },
          })

          // Heading
          tl.fromTo(
            heading,
            {
              opacity: 0,
              y: 28,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'power3.out',
            },
            0
          )

          // Paragraph
          tl.fromTo(
            copy,
            {
              opacity: 0,
              y: 32,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'power3.out',
            },
            0.08
          )

          // Food image
          tl.fromTo(
            image,
            {
              opacity: 0,
              y: 55,
              scale: 0.94,
              rotate: 2,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              ease: 'power3.out',
            },
            0
          )
        })
      })

      return () => mm.revert()
    },
    {
      scope: sectionRef,
    }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f5f5f3] pt-8"
    >
      <div className="mx-auto max-w-[1500px] px-[4.2vw]">

        {/* =================================================
            OUR VISION
        ================================================= */}

        <div className="mv-row relative grid min-h-0 grid-cols-12 items-start py-6 md:py-[1vh]">

          {/* TITLE */}

          <div className="mv-heading col-span-12 md:col-span-4">
            <h2
              className="
                text-[clamp(40px,4.2vw,62px)]
                font-semibold
                leading-[0.95]
                tracking-[-0.06em]
              "
            >
              Our Vision
            </h2>
          </div>

          {/* DISH */}

          <div
            className="
              mv-image
              relative
              col-span-12
              mt-8
              flex
              justify-center
              md:col-span-4
              md:mt-0
            "
          >
            <Image
              src={CARDS[0].image}
              alt="Atlantic Catering plated meal"
              width={1024}
              height={1024}
              className="
                -my-4 md:-my-10
                h-auto
                w-full
                max-w-[380px]
                object-contain
              "
              priority
            />
          </div>

          {/* TEXT */}

          <div
            className="
              mv-copy
              col-span-12
              mt-8
              md:col-span-4
              md:mt-8
              md:pl-[2vw]
            "
          >
            <p
              className="
                max-w-[430px]
                text-[14px]
                leading-[1.6]
                text-black/65
                md:text-[15px]
              "
            >
              {CARDS[0].body}
            </p>
          </div>

        </div>


        {/* =================================================
            OUR MISSION
        ================================================= */}

        <div
          className="
            mv-row
            relative
            grid
            min-h-0
            grid-cols-12
            items-center
            py-6 md:py-[1vh]
          "
        >

          {/* TEXT */}

          <div
            className="
              mv-copy
              order-3
              col-span-12
              mt-4
              md:order-1
              md:mt-0
              md:col-span-4
            "
          >
            <p
              className="
                max-w-[430px]
                text-[14px]
                leading-[1.6]
                text-black/65
                md:text-[15px]
              "
            >
              {CARDS[1].body}
            </p>
          </div>

          {/* DISH */}

          <div
            className="
              mv-image
              order-2
              col-span-12
              flex
              justify-center
              md:order-2
              md:col-span-4
            "
          >
            <Image
              src={CARDS[1].image}
              alt="Atlantic Catering plated meal"
              width={1024}
              height={1024}
              className="
                -my-4 md:-my-10
                h-auto
                w-full
                max-w-[380px]
                object-contain
              "
            />
          </div>

          {/* TITLE */}

          <div
            className="
              mv-heading
              order-1
              col-span-12
              mb-2
              md:order-3
              md:col-span-4
              md:mb-0
              md:text-right
            "
          >
            <h2
              className="
                text-[clamp(40px,4.2vw,62px)]
                font-semibold
                leading-[0.95]
                tracking-[-0.06em]
              "
            >
              Our Mission
            </h2>
          </div>

        </div>


        {/* =================================================
            OUR GOAL
        ================================================= */}

        <div
          className="
            mv-row
            relative
            grid
            min-h-0
            grid-cols-12
            items-center
            py-6 md:py-[1vh]
          "
        >

          {/* TITLE */}

          <div className="mv-heading col-span-12 md:col-span-4">
            <h2
              className="
                text-[clamp(40px,4.2vw,62px)]
                font-semibold
                leading-[0.95]
                tracking-[-0.06em]
              "
            >
              Our Goal
            </h2>
          </div>

          {/* DISH */}

          <div
            className="
              mv-image
              col-span-12
              mt-8
              flex
              justify-center
              md:col-span-4
              md:mt-0
            "
          >
            <Image
              src={CARDS[2].image}
              alt="Atlantic Catering plated meal"
              width={1024}
              height={1024}
              className="
                -my-4 md:-my-10
                h-auto
                w-full
                max-w-[380px]
                object-contain
              "
            />
          </div>

          {/* TEXT */}

          <div
            className="
              mv-copy
              col-span-12
              mt-8
              md:col-span-4
              md:mt-8
              md:pl-[2vw]
            "
          >
            <p
              className="
                max-w-[430px]
                text-[14px]
                leading-[1.6]
                text-black/65
                md:text-[15px]
              "
            >
              {CARDS[2].body}
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}