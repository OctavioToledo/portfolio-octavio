import type { Localized } from './types'

export type ExperienceEntry = {
  title: string
  subtitle: string
  role: string
  period: string
  context: string
  highlights: string[]
  tags: string[]
  links?: { label: string; href: string }[]
  current: boolean
}

export const experienceEntries: Localized<ExperienceEntry[]> = {
  es: [
    {
      title: 'Aranni Brands — Powip',
      subtitle: 'ERP SaaS · microservicios',
      role: 'Full Stack Developer — Integraciones',
      period: 'Septiembre 2025 — Actualidad',
      context:
        'PowipSystem, un ERP SaaS con arquitectura de microservicios, con foco en la capa de integraciones con sistemas externos.',
      highlights: [
        'Construyo conectores de punta a punta (couriers, e-commerce, pagos, facturación electrónica) desde el análisis de documentación del proveedor hasta producción.',
        'Diseñé un módulo unificado de integraciones (credenciales y webhook aislados por proveedor, sin multiplicar microservicios).',
        'Esquema de idempotencia y manejo de fallos (reserva previa, claim atómico, verificación manual ante timeouts ambiguos).',
        'Frontend de cada integración con Next.js, React y TailwindCSS.',
      ],
      tags: ['Java', 'Spring Boot', 'NestJS', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript'],
      links: [
        { label: 'Sistema', href: 'https://www.powip.tech/login' },
        { label: 'Landing', href: 'https://www.powip.lat/' },
      ],
      current: true,
    },
    {
      title: 'Independiente',
      subtitle: 'Gimnasio',
      role: 'Desarrollador Freelance',
      period: 'Julio 2026 — Actualidad',
      context:
        'Diseño y desarrollo de un sistema de gestión a medida para un gimnasio, reemplazando un flujo manual de papel y Excel para ~200 socios.',
      highlights: [
        'Relevamiento de requerimientos y definición iterativa del producto con el cliente.',
        'Desarrollo end-to-end (arquitectura, backend, frontend).',
        'Módulo de cobros con log de auditoría inmutable (quién, cuándo, cómo, comprobante).',
      ],
      tags: ['NestJS', 'React', 'PostgreSQL', 'Supabase', 'Vercel'],
      current: true,
    },
    {
      title: 'Independiente',
      subtitle: 'Clases particulares',
      role: 'Profesor de programación',
      period: '2023 — Actualidad',
      context:
        'Clases uno a uno para estudiantes y personas en transición hacia el desarrollo de software.',
      highlights: [
        'Enseñanza de fundamentos de programación, Java y desarrollo web orientado a proyectos.',
        'Material adaptado a cada alumno, priorizando código real desde la primera clase.',
      ],
      tags: ['Java', 'JavaScript', 'SQL'],
      current: true,
    },
  ],
  en: [
    {
      title: 'Aranni Brands — Powip',
      subtitle: 'SaaS ERP · microservices',
      role: 'Full Stack Developer — Integrations',
      period: 'September 2025 — Present',
      context:
        'PowipSystem, a microservices-based SaaS ERP, focused on the integrations layer with external systems.',
      highlights: [
        'Build end-to-end connectors (couriers, e-commerce, payments, e-invoicing) from provider documentation analysis to production.',
        'Designed a unified integrations module (isolated credentials and webhook per provider, no microservice sprawl).',
        'Idempotency and failure-handling scheme (upfront reservation, atomic claim, manual verification on ambiguous timeouts).',
        'Frontend for each integration with Next.js, React and TailwindCSS.',
      ],
      tags: ['Java', 'Spring Boot', 'NestJS', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript'],
      links: [
        { label: 'System', href: 'https://www.powip.tech/login' },
        { label: 'Landing', href: 'https://www.powip.lat/' },
      ],
      current: true,
    },
    {
      title: 'Independent',
      subtitle: 'Gym',
      role: 'Freelance Developer',
      period: 'July 2026 — Present',
      context:
        'Designing and building a custom management system for a gym, replacing a manual paper-and-spreadsheet workflow for ~200 members.',
      highlights: [
        'Requirements gathering and iterative product definition with the client.',
        'End-to-end development (architecture, backend, frontend).',
        'Payments module with immutable audit log (who, when, how, receipt).',
      ],
      tags: ['NestJS', 'React', 'PostgreSQL', 'Supabase', 'Vercel'],
      current: true,
    },
    {
      title: 'Independent',
      subtitle: 'Private tutoring',
      role: 'Programming instructor',
      period: '2023 — Present',
      context:
        'One-on-one classes for students and people transitioning into software development.',
      highlights: [
        'Teaching programming fundamentals, Java and project-based web development.',
        'Material adapted to each student, prioritizing real code from the first class.',
      ],
      tags: ['Java', 'JavaScript', 'SQL'],
      current: true,
    },
  ],
}
