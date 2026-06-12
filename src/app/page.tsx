import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import MissionSection from '@/components/home/MissionSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'
import CorporateClientsSection from '@/components/home/CorporateClientsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CorporateClientsSection />
      {/* <MissionSection /> */}
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}