import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GsapProvider from '@/components/GsapProvider'
import Loader from '@/components/Loader'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white">
        <Loader />
        <GsapProvider>
          <Header />
          <div style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>{children}</div>
          <Footer />
        </GsapProvider>
      </body>
    </html>
  )
}
