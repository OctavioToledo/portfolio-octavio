'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/context/language-context'
import { skillCategories } from '@/content/skills'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TechTag } from '@/components/blueprint/tech-tag'

const TITLES = { es: 'Skills', en: 'Skills' }

export function SkillsSection() {
  const { language } = useLanguage()
  const categories = skillCategories[language]

  return (
    <section id="skills" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-faint">
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
