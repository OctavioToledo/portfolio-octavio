'use client'

import { useLanguage } from '@/context/language-context'
import { caseStudies } from '@/content/case-studies'
import { SectionHeader } from '@/components/blueprint/section-header'
import { CaseStudyCard } from '@/components/blueprint/case-study-card'

const TITLES = { es: 'Problemas que resolví', en: "Problems I've solved" }

export function CaseStudiesSection() {
  const { language } = useLanguage()
  const studies = caseStudies[language]

  return (
    <section id="problemas" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-4 md:grid-cols-2">
        {studies.map((study, index) => (
          <CaseStudyCard key={study.title} study={study} index={index} />
        ))}
      </div>
    </section>
  )
}
