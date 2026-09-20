import NewsHeader from '@/components/news/NewsHeader'

/* The news header lives in the layout rather than the page: keeping
   styled-jsx out of the page module keeps Next's dev static-paths worker
   able to evaluate generateStaticParams. */
export default function NewsArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NewsHeader />
      {children}
    </>
  )
}
