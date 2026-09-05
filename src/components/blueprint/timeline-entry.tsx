'use client'

import { motion } from 'motion/react'
import { TechTag } from './tech-tag'
import { EASE, revealUp } from '@/lib/motion'
import type { ExperienceEntry } from '@/content/experience'

export function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  return (
    <motion.article
      {...revealUp}
      whileHover={{ y: -2, transition: { duration: 0.2, ease: EASE } }}
      className="relative mb-8 pl-2"
    >
      <span
        className={`absolute -left-[27px] top-[7px] h-[11px] w-[11px] rotate-45 border ${
          entry.current ? 'border-amber bg-amber' : 'border-stroke bg-background'
        }`}
      />
      <div className="bp-panel p-6 transition-colors duration-200 hover:border-stroke">
        <div className="mb-1 flex flex-wrap items-baseline gap-2.5">
          <h3 className="font-display text-xl font-semibold">{entry.title}</h3>
          <span className="font-mono text-xs text-fg-faint">{entry.subtitle}</span>
          <span className="ml-auto font-mono text-[11px] tracking-wider text-amber">{entry.period}</span>
        </div>
        <div className="mb-3 font-mono text-[12.5px] tracking-wide text-brand">{entry.role}</div>
        <p className="mb-3.5 text-sm text-fg-dim">{entry.context}</p>
        <ul className="mb-4 grid gap-2">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-5 text-[14.5px]">
              <span className="absolute left-0 top-[0.72em] h-px w-2.5 bg-amber" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
        {entry.links && entry.links.length > 0 && (
          <div className="mt-3.5 flex gap-2">
            {entry.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stroke-soft px-2.5 py-1 font-mono text-[11px] text-fg-dim transition-colors hover:border-brand hover:text-brand"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
