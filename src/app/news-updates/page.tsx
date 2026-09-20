'use client'

import CtaSection from '@/components/home/CtaSection'
import NewsHeader from '@/components/news/NewsHeader'
import NewsHero from '@/components/news/NewsHero'
import NewsShowcase from '@/components/news/NewsShowcase'
import NewsImageExpansion from '@/components/news/NewsImageExpansion'
import NewsFeature from '@/components/news/NewsFeature'
import NewsFeed from '@/components/news/NewsFeed'
import { newsPosts } from '@/data/news'

const posts = newsPosts

const parseDate = (s: string) => {
  const d = new Date(s)
  return d.toISOString().split('T')[0]
}

export default function NewsPage() {
  const articleSchemas = posts.map((post) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.desc,
    image: `https://atlanticcatering-gh.com${post.img}`,
    datePublished: parseDate(post.date),
    author: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
    },
  }))

  return (
    <>
      {articleSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <NewsHeader />

      <main style={{ background: '#f4f4f1' }}>
        {/* The hero is pinned only for as long as the showcase card slides
            over it; the band scopes that stickiness so later sections stack
            normally. */}
        <div style={{ position: 'relative' }}>
          <NewsHero />
          <NewsShowcase />
        </div>

        <NewsImageExpansion />

        <NewsFeature />

        <NewsFeed posts={posts} />



        <CtaSection />
      </main>
    </>
  )
}
