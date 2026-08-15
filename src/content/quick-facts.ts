import type { Localized } from './types'

export type QuickFact = { label: string; value: string }

export type QuickFactsContent = {
  facts: QuickFact[]
  ctaLabel: string
}

export const quickFactsContent: Localized<QuickFactsContent> = {
  es: {
    facts: [
      { label: 'Estado', value: 'En búsqueda activa — full-time o freelance' },
      { label: 'Disponibilidad', value: 'Inmediata' },
      { label: 'Roles buscados', value: 'Backend Developer (Java), Full Stack Developer' },
      { label: 'Huso horario', value: 'GMT-3 (Argentina)' },
      { label: 'Idiomas', value: 'Español (nativo), Inglés (avanzado — reuniones y meetings sin problema)' },
      { label: 'Experiencia', value: '+3 años desarrollando software' },
      { label: 'Formación', value: 'Universidad Tecnológica Nacional (UTN)' },
      { label: 'Stack principal', value: 'Java · Spring Boot · Next.js · PostgreSQL' },
    ],
    ctaLabel: 'Conóceme mejor →',
  },
  en: {
    facts: [
      { label: 'Status', value: 'Actively looking — full-time or freelance' },
      { label: 'Availability', value: 'Immediately available' },
      { label: 'Roles', value: 'Backend Developer (Java), Full Stack Developer' },
      { label: 'Time zone', value: 'GMT-3 (Argentina)' },
      { label: 'Languages', value: 'Spanish (native), English (advanced — comfortable in meetings)' },
      { label: 'Experience', value: '3+ years developing software' },
      { label: 'Education', value: 'Universidad Tecnológica Nacional (UTN)' },
      { label: 'Core stack', value: 'Java · Spring Boot · Next.js · PostgreSQL' },
    ],
    ctaLabel: 'Get to know me →',
  },
}
