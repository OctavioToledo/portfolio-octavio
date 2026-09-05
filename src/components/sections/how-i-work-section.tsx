'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/context/language-context'
import { howIWorkContent } from '@/content/how-i-work'
import { SectionHeader } from '@/components/blueprint/section-header'
import { StatGauge } from '@/components/blueprint/stat-gauge'
import { EASE, revealUp, withDelay } from '@/lib/motion'

export function HowIWorkSection() {
  const { language } = useLanguage()
  const content = howIWorkContent[language]

  return (
    <section id="como-trabajo" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={content.sectionTitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {content.stats.map((stat, index) => (
          <motion.div key={stat.label} {...withDelay(revealUp, index * 0.05)}>
            <StatGauge value={stat.value} label={stat.label} />
          </motion.div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {content.pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            {...withDelay(revealUp, index * 0.05)}
            whileHover={{ y: -2, transition: { duration: 0.2, ease: EASE } }}
            className="bp-panel p-6 text-[14.5px] text-fg-dim transition-colors duration-200 hover:border-stroke"
          >
            {pillar.title}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
