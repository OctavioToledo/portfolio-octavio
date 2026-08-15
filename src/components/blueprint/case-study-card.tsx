'use client'

import { motion } from 'motion/react'
import { TechTag } from './tech-tag'
import type { CaseStudy } from '@/content/case-studies'

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.2, 0.7, 0.3, 1] }}
      className="border border-stroke-soft bg-card p-6"
    >
      <h3 className="mb-2 font-display text-lg font-semibold">{study.title}</h3>
      <p className="mb-3 text-sm text-fg-dim">{study.problem}</p>
      <ul className="mb-4 grid gap-2">
        {study.bullets.map((bullet) => (
          <li key={bullet} className="relative pl-5 text-[14.5px]">
            <span className="absolute left-0 top-[0.72em] h-px w-2.5 bg-stroke" />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {study.tags.map((tag) => (
          <TechTag key={tag}>{tag}</TechTag>
        ))}
      </div>
    </motion.article>
  )
}
