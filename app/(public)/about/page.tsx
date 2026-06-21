import AboutHero from '@/components/website/about/AboutHero'
import AboutStory from '@/components/website/about/AboutStory'
import AboutQuestions from '@/components/website/about/AboutQuestions'
import AboutWhoSheHelps from '@/components/website/about/AboutWhoSheHelps'
import AboutProcess from '@/components/website/about/AboutProcess'
import AboutMission from '@/components/website/about/AboutMission'
import AboutPersonalNote from '@/components/website/about/AboutPersonalNote'
import AboutCTA from '@/components/website/about/AboutCTA'
import Footer from '@/components/website/Footer'

export default function AboutPage(): React.JSX.Element {
  return (
    <div className='bg-(--bg-base) space-y-5'>
      <AboutHero />
      <AboutStory />
      <AboutQuestions />
      <AboutWhoSheHelps />
      <AboutProcess />
      <AboutMission />
      <AboutPersonalNote />
      <AboutCTA />
      <Footer />
    </div>
  )
}
