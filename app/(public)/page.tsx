import type { JSX } from 'react'
import HeroSection from '@/components/website/HeroSection'
import PainPointsSection from '@/components/website/PainPointSection'
import AboutSection from '@/components/website/AboutSection'
import ProgramsSection from '@/components/website/ProgramSection'
import JourneySection from '@/components/website/JourneySection'
import WhySapnaSection from '@/components/website/WhySapnaSection'
import CTASection from '@/components/website/CTASection'
import Footer from '@/components/website/Footer'

export default function LandingPage(): JSX.Element {
  return (
    <div className='bg-bg-base'>
      <HeroSection />
      <PainPointsSection />
      <AboutSection />
      <ProgramsSection />
      <JourneySection />
      <WhySapnaSection />
      <CTASection />
      <Footer />
    </div>
  )
}
