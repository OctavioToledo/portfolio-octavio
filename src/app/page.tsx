import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { HowIWorkSection } from '@/components/sections/how-i-work-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { CaseStudiesSection } from '@/components/sections/case-studies-section'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowIWorkSection />
        <ExperienceSection />
        <CaseStudiesSection />
      </main>
      <Footer />
    </>
  )
}
