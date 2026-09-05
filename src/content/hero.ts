import type { Localized } from './types'

export type HeroContent = {
  name: string
  role: string
  tagline: string
  location: string
  cvLabel: string
}

export const heroContent: Localized<HeroContent> = {
  es: {
    name: 'Octavio Toledo',
    role: 'Ingeniero de Software',
    tagline:
      'Backend para plataformas ERP. Sistemas distribuidos, integridad de datos y arquitectura orientada a eventos.',
    location: 'Mendoza, AR · Remoto',
    cvLabel: 'Descargar CV',
  },
  en: {
    name: 'Octavio Toledo',
    role: 'Software Engineer',
    tagline:
      'Backend for ERP platforms. Distributed systems, data integrity and event-driven architecture.',
    location: 'Mendoza, AR · Remote',
    cvLabel: 'Download CV',
  },
}

export const socialLinks = {
  github: 'https://github.com/OctavioToledo',
  linkedin: 'https://linkedin.com/in/octaviotoledo',
  email: 'octatoledo7@gmail.com',
  cvEs: '/cv/cv-octavio-toledo-dev-es.pdf',
  cvEn: '/cv/cv-octavio-toledo-dev-en.pdf',
}
