import type { Localized } from './types'

export type SkillCategory = {
  category: string
  items: string[]
}

export const skillCategories: Localized<SkillCategory[]> = {
  es: [
    { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'NestJS', 'REST APIs'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'] },
    { category: 'Datos', items: ['PostgreSQL', 'MySQL', 'Supabase', 'JPA/Hibernate'] },
    { category: 'IA & Automatización', items: ['Claude Code', 'Gemini', 'Integración de LLMs'] },
    { category: 'Infra & herramientas', items: ['Docker', 'Git/GitHub', 'Vercel', 'RabbitMQ'] },
  ],
  en: [
    { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'NestJS', 'REST APIs'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'] },
    { category: 'Data', items: ['PostgreSQL', 'MySQL', 'Supabase', 'JPA/Hibernate'] },
    { category: 'AI & Automation', items: ['Claude Code', 'Gemini', 'LLM integration'] },
    { category: 'Infra & tooling', items: ['Docker', 'Git/GitHub', 'Vercel', 'RabbitMQ'] },
  ],
}
