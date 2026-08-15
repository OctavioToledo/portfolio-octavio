import type { Localized } from './types'

export type Project = {
  name: string
  label: string
  description: string
  highlights: string[]
  stack: string[]
  liveUrl?: string
}

export const projectsContent: Localized<Project[]> = {
  es: [
    {
      name: 'OMTime',
      label: 'Proyecto propio, desarrollado junto a un socio',
      description:
        'Plataforma SaaS propia de gestión de turnos y agenda multi-sucursal, con contabilidad. Ownership end-to-end: desde mockups en Figma y modelado UML hasta el deploy en producción.',
      highlights: [
        'UI/UX compleja — grillas de turnos dinámicas e interactivas, dashboards de clientes.',
        'Backend con Java Spring Boot y Domain-Driven Design para lógica multi-tenant segura.',
        'Monetización integrada con Mercado Pago.',
      ],
      stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Java', 'Spring Boot', 'Mercado Pago API'],
      liveUrl: 'https://om-time.vercel.app/',
    },
  ],
  en: [
    {
      name: 'OMTime',
      label: 'Own project, built with a co-founder',
      description:
        'Own SaaS platform for multi-branch scheduling and appointment management, with accounting. End-to-end ownership: from Figma mockups and UML modeling to production deployment.',
      highlights: [
        'Complex UI/UX — dynamic interactive scheduling grids, client dashboards.',
        'Java Spring Boot backend with Domain-Driven Design for secure multi-tenant logic.',
        'Monetization integrated with Mercado Pago.',
      ],
      stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Java', 'Spring Boot', 'Mercado Pago API'],
      liveUrl: 'https://om-time.vercel.app/',
    },
  ],
}
