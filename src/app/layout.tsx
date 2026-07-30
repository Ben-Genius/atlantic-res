import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GsapProvider from '@/components/GsapProvider'
import Loader from '@/components/Loader'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { companyInfo } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

const siteUrl = 'https://atlanticcatering-gh.com';
const siteName = 'Atlantic Catering & Logistics';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B4332',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Premium Culinary Excellence, Ghana`,
    template: `%s | ${siteName}`,
  },
  description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana. Established 2014. GC100 Member.',
  applicationName: siteName,
  referrer: 'origin-when-cross-origin',
  other: {
    classification: 'Catering Services Food Hospitality Offshore Logistics Ghana',
  },
  keywords: [
    'catering Ghana',
    'offshore catering',
    'corporate catering Accra',
    'event catering Ghana',
    'ISO 22000 catering',
    'FPSO catering',
    'institutional catering Ghana',
    'Atlantic Catering Logistics',
  ],
  authors: [{ name: 'Atlantic Catering & Logistics', url: siteUrl }],
  creator: 'Atlantic Catering & Logistics',
  publisher: 'Atlantic Catering & Logistics',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-GH': '/',
      'en': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: siteUrl,
    siteName,
    title: `${siteName} — Premium Culinary Excellence, Ghana`,
    description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana. Established 2014.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Atlantic Catering & Logistics - Premium Culinary Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AtlanticCateringGH',
    creator: '@AtlanticCateringGH',
    title: `${siteName} — Premium Culinary Excellence, Ghana`,
    description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
    yahoo: 'YOUR_YAHOO_VERIFICATION_CODE',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GH" className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteName,
              alternateName: 'Atlantic Catering',
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              sameAs: [
                'https://www.linkedin.com/company/atlantic-catering-logistics',
                'https://www.facebook.com/AtlanticCateringGH',
                'https://www.instagram.com/atlanticcateringgh',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: companyInfo.phone,
                contactType: 'customer service',
                availableLanguage: ['English', 'Twi'],
                areaServed: 'GH',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '20 Suya Street, East Legon',
                addressLocality: 'Accra',
                addressRegion: 'Greater Accra',
                postalCode: 'GA-374-2184',
                addressCountry: 'GH',
              },
              foundingDate: '2014',
              knowsAbout: [
                'Offshore Catering',
                'Corporate Catering',
                'Event Management',
                'Institutional Catering',
                'Logistics Management',
              ],
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'GH',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 30,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: siteName,
              url: siteUrl,
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.speakable', 'h1', 'h2', '.hero-title'],
              },
              inLanguage: 'en-GH',
              isAccessibleForFree: true,
            }),
          }}
        />
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
