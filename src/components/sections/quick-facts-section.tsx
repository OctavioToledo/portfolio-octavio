'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { quickFactsContent } from '@/content/quick-facts'
import { SectionHeader } from '@/components/blueprint/section-header'

const TITLES = { es: 'Resumen rápido', en: 'Quick summary' }

export function QuickFactsSection() {
  const { language } = useLanguage()
  const content = quickFactsContent[language]

  return (
    <section id="resumen" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="border border-stroke-soft">
        {content.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1 border-b border-stroke-soft p-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="w-48 shrink-0 font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              {fact.label}
            </span>
            <span className="text-sm">{fact.value}</span>
          </div>
        ))}
      </div>
      <Link
        href="/sobre-mi"
        className="mt-5 inline-block border border-stroke-soft px-4 py-2 font-mono text-xs uppercase tracking-wider text-fg-dim transition-colors hover:border-brand hover:text-brand"
      >
        {content.ctaLabel}
      </Link>
    </section>
  )
}
