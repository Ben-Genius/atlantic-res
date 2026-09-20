'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, ShieldCheck, Sprout, ArrowRight } from 'lucide-react'
import type { NewsPost } from '@/data/news'
import styles from './NewsFeed.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ICONS = { award: Award, shield: ShieldCheck, sprout: Sprout }

/** Circumference of the r=52 ring, for the stroke-dash fill. */
const RING_LENGTH = 2 * Math.PI * 52

export default function NewsFeed({ posts }: { posts: NewsPost[] }) {
  const trackRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Each post owns a viewport of scroll while the stage is pinned; the
      // trailing viewport of the track holds the last post in place.
      mm.add('(min-width: 901px)', () => {
        const trigger = ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const i = Math.floor(self.progress * posts.length * 0.9999)
            setActive(Math.max(0, Math.min(posts.length - 1, i)))
          },
        })
        return () => trigger.kill()
      })

      // Stacked layout shows every post at once, so nothing steps.
      mm.add('(max-width: 900px)', () => {
        setActive(0)
      })

      return () => mm.revert()
    },
    { scope: trackRef, dependencies: [posts.length] }
  )

  return (
    <section
      id="latest"
      ref={trackRef}
      className={styles.track}
      style={{ minHeight: `${(posts.length + 0.35) * 100}vh` }}
      aria-label="Latest stories"
    >
      <div className={styles.stage}>
        <div className={styles.card}>
          {posts.map((post, i) => {
            const Icon = ICONS[post.icon]
            const isActive = i === active
            return (
              <article
                key={post.id}
                id={post.id}
                className={styles.slide}
                data-active={isActive}
                aria-hidden={!isActive || undefined}
              >
                <div className={styles.photo}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.img}
                    alt={post.title}
                    className={styles.photoImg}
                    draggable={false}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />

                  <div className={styles.metric}>
                    <div className={styles.metricHead}>
                      <span className={styles.metricLabel}>{post.metric.label}</span>
                      <span className={styles.metricPill}>{post.metric.pill}</span>
                    </div>

                    <div className={styles.ring}>
                      <svg className={styles.ringSvg} viewBox="0 0 120 120" aria-hidden="true">
                        <circle className={styles.ringTrack} cx="60" cy="60" r="52" fill="none" strokeWidth="4" />
                        <circle
                          className={styles.ringFill}
                          cx="60"
                          cy="60"
                          r="52"
                          fill="none"
                          strokeWidth="4"
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                          strokeDasharray={RING_LENGTH}
                          strokeDashoffset={
                            isActive ? RING_LENGTH * (1 - post.metric.ring / 100) : RING_LENGTH
                          }
                        />
                      </svg>
                      <div className={styles.ringValue}>
                        <span className={styles.ringNum}>{post.metric.ringValue}</span>
                        <span className={styles.ringCaption}>{post.metric.ringCaption}</span>
                      </div>
                    </div>

                    <div className={styles.metricStats}>
                      {post.metric.stats.map((stat) => (
                        <div key={stat.label}>
                          <span className={styles.statLabel}>{stat.label}</span>
                          <span className={styles.statValue}>{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.panel}>
                  <div className={styles.content}>
                    <div className={styles.badge}>
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </div>

                    <div className={styles.meta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.metaDot} aria-hidden="true" />
                      <span className={styles.date}>{post.date}</span>
                    </div>

                    <h3 className={styles.title}>{post.title}</h3>
                    <p className={styles.desc}>{post.desc}</p>

                    <Link href={`/news-updates#${post.id}`} className={styles.read} tabIndex={isActive ? 0 : -1}>
                      Read article
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>

                  <div className={styles.counter} aria-hidden="true">
                    <span>
                      {String(i + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}
                    </span>
                    <span className={styles.counterBar}>
                      <span
                        className={styles.counterFill}
                        style={{ width: `${((i + 1) / posts.length) * 100}%` }}
                      />
                    </span>
                  </div>

                  <div className={styles.brand} aria-hidden="true">
                    <svg
                      className={styles.brandLine}
                      viewBox="0 0 664 119"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M0 118.5H395.5C404.337 118.5 411.5 111.337 411.5 102.5V16.5C411.5 7.66345 418.663 0.5 427.5 0.5H664"
                        stroke="url(#news-feed-brand)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                      <defs>
                        <linearGradient id="news-feed-brand" x1="296" y1="59.5" x2="580.5" y2="59.5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#e2e2df" />
                          <stop offset="0.5" stopColor="#66cc33" />
                          <stop offset="1" stopColor="#e2e2df" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className={styles.brandWord}>atlantic</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
