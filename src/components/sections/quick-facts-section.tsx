'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useLanguage } from '@/context/language-context'
import { quickFactsContent } from '@/content/quick-facts'
import { SectionHeader } from '@/components/blueprint/section-header'
import { revealUp, withDelay } from '@/lib/motion'

const TITLES = { es: 'Resumen rápido', en: 'Quick summary' }

export function QuickFactsSection() {
  const { language } = useLanguage()
  const content = quickFactsContent[language]

  return (
    <section id="resumen" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="bp-panel">
        {content.facts.map((fact, index) => (
          <motion.div
            key={fact.label}
            {...withDelay(revealUp, Math.min(index, 6) * 0.04)}
            className="flex flex-col gap-1 border-b border-stroke-soft p-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="w-48 shrink-0 font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              {fact.label}
            </span>
            <span className="flex items-baseline gap-2 text-sm">
              {index === 0 && (
                <span aria-hidden className="relative top-[1px] h-1.5 w-1.5 shrink-0 rotate-45 bg-amber" />
              )}
              {fact.value}
            </span>
          </motion.div>
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
