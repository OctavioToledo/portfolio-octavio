import type { Localized } from './types'

export type Stat = { value: string; label: string }
export type Pillar = { title: string }

export type HowIWorkContent = {
  sectionTitle: string
  stats: Stat[]
  pillars: Pillar[]
}

export const howIWorkContent: Localized<HowIWorkContent> = {
  es: {
    sectionTitle: 'Cómo trabajo',
    stats: [
      { value: '+3', label: 'años construyendo software' },
      { value: '+5', label: 'integraciones en producción' },
    ],
    pillars: [
      {
        title:
          'Diseño para fallas — idempotencia, bloqueo ante concurrencia y verificación manual en vez de reintento ciego cuando el estado queda ambiguo.',
      },
      {
        title:
          'Desarrollo asistido por IA — uso Claude Code y Gemini a diario para acelerar la implementación y automatizar tareas repetitivas.',
      },
    ],
  },
  en: {
    sectionTitle: 'How I work',
    stats: [
      { value: '3+', label: 'years building software' },
      { value: '5+', label: 'integrations in production' },
    ],
    pillars: [
      {
        title:
          'Designed for failure — idempotency, locking under concurrency, and manual verification instead of blind retries when state is left ambiguous.',
      },
      {
        title:
          'AI-assisted development — I use Claude Code and Gemini daily to speed up implementation and automate repetitive tasks.',
      },
    ],
  },
}
