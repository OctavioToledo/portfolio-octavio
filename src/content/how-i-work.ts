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
          'Diseño para fallas — idempotencia y verificación manual ante timeouts ambiguos, para evitar envíos duplicados en las integraciones que construí.',
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
          'Designed for failure — idempotency and manual verification on ambiguous timeouts, to avoid duplicate dispatches in the integrations I built.',
      },
      {
        title:
          'AI-assisted development — I use Claude Code and Gemini daily to speed up implementation and automate repetitive tasks.',
      },
    ],
  },
}
