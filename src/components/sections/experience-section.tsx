'use client'

import { useLanguage } from '@/context/language-context'
import { experienceEntries } from '@/content/experience'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TimelineEntry } from '@/components/blueprint/timeline-entry'

const TITLES = { es: 'Experiencia profesional', en: 'Professional experience' }

function formatCount(language: 'es' | 'en', n: number) {
  const padded = String(n).padStart(2, '0')
  return language === 'es' ? `${padded} registros` : `${padded} records`
}

export function ExperienceSection() {
  const { language } = useLanguage()
  const entries = experienceEntries[language]

  return (
    <section id="experiencia" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} count={formatCount(language, entries.length)} />
      <div className="relative pl-[34px]">
        <div className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-stroke-soft" />
        {entries.map((entry) => (
          <TimelineEntry key={entry.title + entry.period} entry={entry} />
        ))}
      </div>
    </section>
  )
}
