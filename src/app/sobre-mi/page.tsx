import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AboutPageContent } from '@/components/about-page-content'

export const metadata: Metadata = {
  title: 'Sobre mí — Octavio Toledo',
  description:
    'Ingeniero de Software especializado en backend con Java y Spring: sistemas distribuidos, integridad de datos y arquitectura orientada a eventos.',
}

export default function SobreMiPage() {
  return (
    <>
      <Navbar />
      <AboutPageContent />
      <Footer />
    </>
  )
}
