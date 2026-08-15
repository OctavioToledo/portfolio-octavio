import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AboutPageContent } from '@/components/about-page-content'

export const metadata: Metadata = {
  title: 'Sobre mí — Octavio Toledo',
  description:
    'Software Engineer especializado en backend con Java y Spring, integraciones de ERP y desarrollo asistido por IA.',
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
