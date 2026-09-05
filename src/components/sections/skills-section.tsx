'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/context/language-context'
import { skillCategories } from '@/content/skills'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TechTag } from '@/components/blueprint/tech-tag'
import { revealUp, withDelay } from '@/lib/motion'

const TITLES = { es: 'Skills', en: 'Skills' }

export function SkillsSection() {
  const { language } = useLanguage()
  const categories = skillCategories[language]

  return (
    <section id="skills" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.category}
            {...withDelay(revealUp, index * 0.05)}
            className="bp-panel p-5"
          >
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-faint">
              <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-amber" />
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <TechTag key={item}>{item}</TechTag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
