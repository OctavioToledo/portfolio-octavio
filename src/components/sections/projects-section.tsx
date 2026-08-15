'use client'

import { useLanguage } from '@/context/language-context'
import { projectsContent } from '@/content/projects'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TechTag } from '@/components/blueprint/tech-tag'

const TITLES = { es: 'Proyectos', en: 'Projects' }
const LIVE_LABEL = { es: 'Ver en vivo', en: 'View live' }

export function ProjectsSection() {
  const { language } = useLanguage()
  const projects = projectsContent[language]

  return (
    <section id="proyectos" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.name} className="border border-stroke-soft bg-card p-6">
            <div className="mb-1 flex flex-wrap items-baseline gap-2.5">
              <h3 className="font-display text-xl font-semibold">{project.name}</h3>
              <span className="font-mono text-xs text-fg-faint">{project.label}</span>
            </div>
            <p className="mb-3.5 text-sm text-fg-dim">{project.description}</p>
            <ul className="mb-4 grid gap-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="relative pl-5 text-[14.5px]">
                  <span className="absolute left-0 top-[0.72em] h-px w-2.5 bg-stroke" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-stroke-soft px-2.5 py-1 font-mono text-[11px] text-fg-dim transition-colors hover:border-brand hover:text-brand"
              >
                {LIVE_LABEL[language]} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
