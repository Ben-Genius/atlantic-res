import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GsapProvider from '@/components/GsapProvider'

export const metadata: Metadata = {
  title: 'Atlantic Catering & Logistics — Premium Culinary Excellence, Ghana',
  description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana. Established 2014.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: '#0d0d0d' }}>
        <GsapProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </GsapProvider>
      </body>
    </html>
  )
}
