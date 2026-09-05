'use client'

import { motion } from 'motion/react'
import { EASE } from '@/lib/motion'

export function SectionHeader({ title, count }: { title: string; count?: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 self-center bg-amber" />
      <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">{title}</h2>
      <motion.div
        aria-hidden
        className="h-px flex-1 origin-left bg-stroke-soft"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-64px' }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      {count && (
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-amber">
          {count}
        </span>
      )}
    </div>
  )
}
