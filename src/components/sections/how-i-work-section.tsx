'use client'

import { useLanguage } from '@/context/language-context'
import { howIWorkContent } from '@/content/how-i-work'
import { SectionHeader } from '@/components/blueprint/section-header'
import { StatGauge } from '@/components/blueprint/stat-gauge'

export function HowIWorkSection() {
  const { language } = useLanguage()
  const content = howIWorkContent[language]

  return (
    <section id="como-trabajo" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={content.sectionTitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {content.stats.map((stat) => (
          <StatGauge key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {content.pillars.map((pillar) => (
          <div key={pillar.title} className="border border-stroke-soft p-6 text-[14.5px] text-fg-dim">
            {pillar.title}
          </div>
        ))}
      </div>
    </section>
  )
}
