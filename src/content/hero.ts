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
    role: 'Software Engineer',
    tagline:
      'Backend e integraciones para plataformas ERP. Java, Spring Boot, NestJS y arquitectura orientada a eventos.',
    location: 'Mendoza, AR · Remoto',
    cvLabel: 'Descargar CV',
  },
  en: {
    name: 'Octavio Toledo',
    role: 'Software Engineer',
    tagline:
      'Backend and integrations for ERP platforms. Java, Spring Boot, NestJS and event-driven architecture.',
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
