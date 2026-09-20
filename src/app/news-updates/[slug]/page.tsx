import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CtaSection from '@/components/home/CtaSection'
import NewsArticle from '@/components/news/NewsArticle'
import { newsPosts } from '@/data/news'

const siteUrl = 'https://atlanticcatering-gh.com'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.id }))
}

export function generateMetadata({ params }: Params): Metadata {
  const post = newsPosts.find((p) => p.id === params.slug)
  if (!post) return { title: 'Story not found' }

  return {
    title: post.title,
    description: post.lead,
    alternates: { canonical: `/news-updates/${post.id}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.lead,
      url: `${siteUrl}/news-updates/${post.id}`,
      publishedTime: new Date(post.date).toISOString(),
      images: [{ url: post.img, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.lead,
      images: [post.img],
    },
  }
}

export default function NewsArticlePage({ params }: Params) {
  const index = newsPosts.findIndex((p) => p.id === params.slug)
  if (index === -1) notFound()

  const post = newsPosts[index]
  /* The feed runs newest first, so the previous entry is the newer story. */
  const prev = newsPosts[index - 1] ?? null
  const next = newsPosts[index + 1] ?? null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.lead,
    image: `${siteUrl}${post.img}`,
    datePublished: new Date(post.date).toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/news-updates/${post.id}` },
    articleSection: post.category,
    author: post.author
      ? { '@type': 'Person', name: post.author.name, jobTitle: post.author.role }
      : { '@type': 'Organization', name: 'Atlantic Catering & Logistics' },
    publisher: {
      '@type': 'Organization',
      name: 'Atlantic Catering & Logistics',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo.png` },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main style={{ background: '#f4f4f1' }}>
        <NewsArticle post={post} prev={prev} next={next} />
        <CtaSection />
      </main>
    </>
  )
}
