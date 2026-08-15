import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { HowIWorkSection } from '@/components/sections/how-i-work-section'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowIWorkSection />
      </main>
      <Footer />
    </>
  )
}
