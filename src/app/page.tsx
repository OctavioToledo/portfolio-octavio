import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { HowIWorkSection } from '@/components/sections/how-i-work-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { CaseStudiesSection } from '@/components/sections/case-studies-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { QuickFactsSection } from '@/components/sections/quick-facts-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowIWorkSection />
        <ExperienceSection />
        <CaseStudiesSection />
        <ProjectsSection />
        <SkillsSection />
        <QuickFactsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
