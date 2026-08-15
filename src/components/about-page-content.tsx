'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { aboutContent } from '@/content/about'

export function AboutPageContent() {
  const { language } = useLanguage()
  const content = aboutContent[language]

  return (
    <main className="mx-auto max-w-[720px] px-7 py-16">
      <Link
        href="/"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-fg-dim hover:text-brand"
      >
        {content.backLabel}
      </Link>
      <h1 className="mb-8 font-display text-2xl font-semibold uppercase tracking-wide">
        {content.headline}
      </h1>
      <div className="grid gap-4 text-[15px] leading-relaxed text-fg-dim">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10 grid gap-4">
        {content.techGroups.map((group) => (
          <div key={group.label}>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              {group.label}
            </span>
            <p className="text-sm">{group.items.join(', ')}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-[15px] leading-relaxed text-fg-dim">{content.closing}</p>
    </main>
  )
}
