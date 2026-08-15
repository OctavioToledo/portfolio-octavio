'use client'

import { useLanguage } from '@/context/language-context'
import { heroContent, socialLinks } from '@/content/hero'
import { DrawingSheet } from '@/components/blueprint/drawing-sheet'
import { ArchitectureDiagram } from '@/components/blueprint/architecture-diagram'

export function HeroSection() {
  const { language } = useLanguage()
  const content = heroContent[language]
  const cvHref = language === 'es' ? socialLinks.cvEs : socialLinks.cvEn

  return (
    <section id="hero" className="mx-auto max-w-[1080px] px-7 pt-10">
      <DrawingSheet
        label={language === 'es' ? 'Arquitectura de integraciones' : 'Integrations architecture'}
        meta="Rev. 2026"
      >
        <ArchitectureDiagram />

        <div className="mt-5 grid grid-cols-1 border-t border-stroke md:grid-cols-[1fr_auto]">
          <div className="border-stroke-soft py-5 md:border-r md:pr-6">
            <h1 className="font-display text-[clamp(38px,6.5vw,62px)] font-bold uppercase leading-[0.95] tracking-tight">
              {content.name}
            </h1>
            <div className="mt-1.5 font-display text-lg font-medium uppercase tracking-[0.18em] text-brand">
              {content.role}
            </div>
            <p className="mt-3.5 max-w-[44ch] text-[14.5px] text-fg-dim">{content.tagline}</p>
          </div>
          <div className="grid grid-rows-4">
            <div className="border-b border-stroke-soft px-5 py-2.5">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">
                {language === 'es' ? 'Ubicación' : 'Location'}
              </span>
              <strong className="font-mono text-[13.5px] font-medium">{content.location}</strong>
            </div>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="border-b border-stroke-soft px-5 py-2.5">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">GitHub</span>
              <strong className="font-mono text-[13.5px] font-medium underline decoration-stroke underline-offset-2 hover:text-brand hover:decoration-brand">
                OctavioToledo
              </strong>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-stroke-soft px-5 py-2.5">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">LinkedIn</span>
              <strong className="font-mono text-[13.5px] font-medium underline decoration-stroke underline-offset-2 hover:text-brand hover:decoration-brand">
                octaviotoledo
              </strong>
            </a>
            <div className="flex items-center px-5 py-2.5">
              <a
                href={cvHref}
                download
                className="inline-flex items-center gap-1.5 bg-brand px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90"
              >
                {content.cvLabel}
              </a>
            </div>
          </div>
        </div>
      </DrawingSheet>
    </section>
  )
}
