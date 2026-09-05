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
      role: 'Backend Developer',
      period: 'Septiembre 2025 — Actualidad',
      context:
        'PowipSystem, un ERP SaaS con arquitectura de microservicios. Trabajo en el backend: diseño de servicios, APIs REST, integridad de datos y la capa de eventos.',
      highlights: [
        'Diseño e implemento servicios del ERP con Spring Boot y NestJS sobre microservicios y mensajería con RabbitMQ.',
        'Integridad de datos y concurrencia: bloqueo pesimista en inventario, idempotencia en operaciones no reintentables y máquinas de estado forward-only.',
        'Construyo los conectores con sistemas externos (e-commerce, pagos, logística, facturación) como módulos aislados, sin multiplicar microservicios.',
        'Frontend de las pantallas que cada feature necesita, con Next.js y React.',
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
      role: 'Backend Developer',
      period: 'September 2025 — Present',
      context:
        'PowipSystem, a microservices-based SaaS ERP. I work on the backend: service design, REST APIs, data integrity and the event layer.',
      highlights: [
        'Design and build ERP services with Spring Boot and NestJS on a microservices architecture with RabbitMQ messaging.',
        'Data integrity and concurrency: pessimistic locking on inventory, idempotency for non-retryable operations, and forward-only state machines.',
        'Build the connectors to external systems (e-commerce, payments, logistics, e-invoicing) as isolated modules, without microservice sprawl.',
        'Frontend for the screens each feature needs, with Next.js and React.',
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
