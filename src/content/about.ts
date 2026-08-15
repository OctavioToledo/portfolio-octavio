import type { Localized } from './types'

export type AboutContent = {
  headline: string
  paragraphs: string[]
  techGroups: { label: string; items: string[] }[]
  closing: string
  backLabel: string
}

export const aboutContent: Localized<AboutContent> = {
  es: {
    headline: 'Software Engineer | Java Backend | Full Stack | AI-Driven Development',
    paragraphs: [
      'Soy Software Engineer especializado en desarrollo backend con Java y Spring, con experiencia construyendo productos SaaS, arquitecturas de microservicios e integraciones con plataformas externas.',
      'Actualmente participo en el desarrollo de un ERP SaaS en producción, donde diseño e implemento microservicios, APIs REST, integraciones con sistemas de e-commerce, pasarelas de pago, facturación electrónica y otros servicios externos. Mi trabajo combina arquitectura de software, resolución de problemas de negocio y desarrollo Full Stack cuando el proyecto lo requiere.',
      'Además de mi experiencia en backend, desarrollo productos completos para clientes, participando desde el relevamiento de requerimientos y el diseño de la arquitectura hasta la implementación, despliegue y evolución del sistema.',
      'En los últimos años incorporé el desarrollo asistido por IA como parte central de mi forma de trabajar. Utilizo herramientas como Claude Code, Gemini y entornos de desarrollo con agentes para acelerar la implementación, automatizar tareas repetitivas y mejorar la calidad del software. Me interesa especialmente la construcción de aplicaciones AI-Driven y la integración de modelos de lenguaje dentro de productos reales.',
    ],
    techGroups: [
      { label: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'JPA/Hibernate', 'RabbitMQ', 'NestJS'] },
      { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
      { label: 'Arquitectura', items: ['Microservicios', 'Arquitectura Hexagonal', 'DDD', 'SOLID', 'REST APIs'] },
      { label: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
      { label: 'IA y Automatización', items: ['Claude Code', 'Gemini', 'Antigravity', 'desarrollo asistido por agentes', 'integración de LLMs', 'automatización de flujos de desarrollo'] },
    ],
    closing:
      'Disfruto trabajar en productos donde la ingeniería de software, la arquitectura y las necesidades del negocio evolucionan en conjunto. Siempre busco construir soluciones mantenibles, escalables y orientadas a generar impacto real.',
    backLabel: '← Volver al inicio',
  },
  en: {
    headline: 'Software Engineer | Java Backend | Full Stack | AI-Driven Development',
    paragraphs: [
      "I'm a Software Engineer specialized in backend development with Java and Spring, with experience building SaaS products, microservices architectures and integrations with external platforms.",
      "I currently work on a production SaaS ERP, where I design and implement microservices, REST APIs, and integrations with e-commerce systems, payment gateways, e-invoicing providers and other external services. My work combines software architecture, business problem-solving and Full Stack development when the project calls for it.",
      "Beyond backend work, I build complete products for clients, involved from requirements gathering and architecture design through implementation, deployment and the system's ongoing evolution.",
      "In the last few years I've made AI-assisted development a core part of how I work. I use tools like Claude Code, Gemini and agent-driven development environments to speed up implementation, automate repetitive tasks and improve software quality. I'm particularly interested in building AI-driven applications and integrating language models into real products.",
    ],
    techGroups: [
      { label: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'JPA/Hibernate', 'RabbitMQ', 'NestJS'] },
      { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
      { label: 'Architecture', items: ['Microservices', 'Hexagonal Architecture', 'DDD', 'SOLID', 'REST APIs'] },
      { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
      { label: 'AI & Automation', items: ['Claude Code', 'Gemini', 'Antigravity', 'agent-assisted development', 'LLM integration', 'development workflow automation'] },
    ],
    closing:
      'I enjoy working on products where software engineering, architecture and business needs evolve together. I always aim to build maintainable, scalable solutions focused on real impact.',
    backLabel: '← Back to home',
  },
}
