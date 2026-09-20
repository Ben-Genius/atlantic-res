'use client'

/**
 * A single news story, at /news-updates/<id>.
 *
 * Masthead on the warm page ground, the story's own photograph full-bleed
 * beneath it carrying the same metric card the feed shows, then one narrow
 * column of body copy with the facts rail alongside. The reveals are scrubbed
 * off entry rather than on scroll — an article should be readable the moment
 * it lands, so nothing here waits for the reader to move.
 */

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, ShieldCheck, Sprout, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import type { NewsPost } from '@/data/news'
import styles from './NewsArticle.module.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ICONS = { award: Award, shield: ShieldCheck, sprout: Sprout, quote: Quote }

/** Circumference of the r=32 rail ring, for the stroke-dash fill. */
const RING_LENGTH = 2 * Math.PI * 32

type Props = {
  post: NewsPost
  prev: NewsPost | null
  next: NewsPost | null
}

export default function NewsArticle({ post, prev, next }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const Icon = ICONS[post.icon]

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      // Marks the photograph as settled; the CSS transition takes it from
      // there, so the image resolves even if the timeline below is skipped.
      root.dataset.ready = 'true'

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(`.${styles.meta}, .${styles.back}`, { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 })
          .from(`.${styles.title}`, { opacity: 0, y: 26, duration: 0.9 }, '-=0.35')
          .from(`.${styles.lead}`, { opacity: 0, y: 18, duration: 0.7 }, '-=0.6')
          .from(`.${styles.byline}`, { opacity: 0, y: 14, duration: 0.6 }, '-=0.45')
          .from(`.${styles.figure}`, { opacity: 0, y: 30, duration: 0.9 }, '-=0.55')
          .from(`.${styles.metric}`, { opacity: 0, y: 18, duration: 0.6 }, '-=0.4')

        // Body blocks resolve a beat before they reach the reading line.
        gsap.utils.toArray<HTMLElement>(`.${styles.body} > *`).forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          })
        })

        gsap.from(`.${styles.rail}`, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.wrap}`, start: 'top 85%', once: true },
        })

        gsap.from(`.${styles.pagerCard}`, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.pager}`, start: 'top 90%', once: true },
        })

        // Reading progress across the article itself, not the whole document.
        const bar = ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
          },
        })
        return () => bar.kill()
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [post.id] }
  )

  return (
    <article className={styles.article} ref={rootRef}>
      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressFill} ref={barRef} />
      </div>

      <header className={styles.head}>
        <Link href="/news-updates#latest" className={styles.back}>
          <ArrowLeft size={14} aria-hidden="true" />
          All stories
        </Link>

        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.date}>{post.date}</span>
        </div>

        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.lead}>{post.lead}</p>

        {post.author && (
          <div className={styles.byline}>
            <span className={styles.bylineMark}>
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span>
              <span className={styles.bylineName}>{post.author.name}</span>
              <span className={styles.bylineRole}>{post.author.role}</span>
            </span>
          </div>
        )}
      </header>

      <figure className={styles.figure}>
        <Image
          src={post.img}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className={styles.figureImg}
          draggable={false}
        />

        <div className={styles.metric}>
          <div className={styles.metricHead}>
            <span className={styles.metricLabel}>{post.metric.label}</span>
            <span className={styles.metricPill}>{post.metric.pill}</span>
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
      </figure>

      <div className={styles.wrap}>
        <div className={styles.body}>
          {post.body.map((block, i) => {
            if (block.type === 'h') {
              return (
                <h2 key={i} className={styles.subhead}>
                  {block.text}
                </h2>
              )
            }

            if (block.type === 'list') {
              return (
                <ul key={i} className={styles.list}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            }

            if (block.type === 'quote') {
              return (
                <blockquote key={i} className={styles.quote}>
                  <p>{block.text}</p>
                  {block.cite && <cite className={styles.quoteCite}>{block.cite}</cite>}
                </blockquote>
              )
            }

            return <p key={i}>{block.text}</p>
          })}
        </div>

        <aside className={styles.rail}>
          <p className={styles.railLabel}>{post.metric.label}</p>

          <div className={styles.railRing}>
            <svg className={styles.railSvg} viewBox="0 0 74 74" aria-hidden="true">
              <circle className={styles.railTrack} cx="37" cy="37" r="32" fill="none" strokeWidth="3" />
              <circle
                className={styles.railFill}
                cx="37"
                cy="37"
                r="32"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                transform="rotate(-90 37 37)"
                strokeDasharray={RING_LENGTH}
                strokeDashoffset={RING_LENGTH * (1 - post.metric.ring / 100)}
              />
            </svg>
            <span>
              <span className={styles.railNum}>{post.metric.ringValue}</span>
              <span className={styles.railCaption}>{post.metric.ringCaption}</span>
            </span>
          </div>

          {post.metric.stats.map((stat) => (
            <div key={stat.label} className={styles.railRow}>
              <span className={styles.railRowLabel}>{stat.label}</span>
              <span className={styles.railRowValue}>{stat.value}</span>
            </div>
          ))}

          <Link href="/contact" className={styles.railCta}>
            <span>Talk to us</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <nav className={styles.pager} aria-label="More stories">
        {prev ? (
          <Link href={`/news-updates/${prev.id}`} className={styles.pagerCard} data-dir="prev">
            <span className={styles.pagerDir}>Newer story</span>
            <span className={styles.pagerTitle}>{prev.title}</span>
          </Link>
        ) : (
          <span className={`${styles.pagerCard} ${styles.pagerEmpty}`} aria-hidden="true" />
        )}

        {next ? (
          <Link href={`/news-updates/${next.id}`} className={styles.pagerCard} data-dir="next">
            <span className={styles.pagerDir}>Older story</span>
            <span className={styles.pagerTitle}>{next.title}</span>
          </Link>
        ) : (
          <span className={`${styles.pagerCard} ${styles.pagerEmpty}`} aria-hidden="true" />
        )}
      </nav>
    </article>
  )
}
