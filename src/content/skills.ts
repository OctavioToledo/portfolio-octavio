import type { Localized } from './types'

export type SkillCategory = {
  category: string
  items: string[]
}

export const skillCategories: Localized<SkillCategory[]> = {
  es: [
    { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'NestJS', 'REST APIs'] },
    {
      category: 'Arquitectura',
      items: ['Microservicios', 'Event-driven', 'RabbitMQ', 'Idempotencia', 'Multi-tenancy', 'DDD', 'Diseño de APIs'],
    },
    { category: 'Datos', items: ['PostgreSQL', 'MySQL', 'Supabase', 'JPA/Hibernate', 'TypeORM', 'Migraciones'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'] },
    { category: 'IA & Automatización', items: ['Claude Code', 'Gemini', 'Integración de LLMs'] },
    { category: 'Infra & herramientas', items: ['Docker', 'Git/GitHub', 'Vercel', 'Railway'] },
  ],
  en: [
    { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'NestJS', 'REST APIs'] },
    {
      category: 'Architecture',
      items: ['Microservices', 'Event-driven', 'RabbitMQ', 'Idempotency', 'Multi-tenancy', 'DDD', 'API design'],
    },
    { category: 'Data', items: ['PostgreSQL', 'MySQL', 'Supabase', 'JPA/Hibernate', 'TypeORM', 'Migrations'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'] },
    { category: 'AI & Automation', items: ['Claude Code', 'Gemini', 'LLM integration'] },
    { category: 'Infra & tooling', items: ['Docker', 'Git/GitHub', 'Vercel', 'Railway'] },
  ],
}
