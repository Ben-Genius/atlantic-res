import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import MissionSection from '@/components/home/MissionSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'
import CorporateClientsSection from '@/components/home/CorporateClientsSection'
import StatsBand from '@/components/home/StatsBand'

export const metadata: Metadata = {
  title: 'Premium Culinary Excellence, Ghana',
  description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana. Established 2014. GC100 member.',
  openGraph: {
    title: 'Atlantic Catering & Logistics — Premium Culinary Excellence, Ghana',
    description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana. Established 2014.',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630, alt: 'Atlantic Catering Homepage' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlantic Catering & Logistics — Premium Culinary Excellence, Ghana',
    description: 'ISO-certified catering and logistics for offshore operations, corporate clients, and premium events across Ghana.',
    images: ['/images/og-home.jpg'],
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <StatsBand /> */}
      <AboutSection />
      <ServicesSection />
      <CorporateClientsSection />
      {/* <MissionSection /> */}
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}