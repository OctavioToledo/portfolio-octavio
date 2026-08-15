import type { Localized } from './types'

export type CaseStudy = {
  title: string
  problem: string
  bullets: string[]
  tags: string[]
}

export const caseStudies: Localized<CaseStudy[]> = {
  es: [
    {
      title: 'Conector de courier end-to-end',
      problem: 'Había que despachar pedidos a un nuevo operador logístico sin proceso previo.',
      bullets: [
        'Diseñé el contrato de creación de pedidos con validación por tipo de cliente (retiro en domicilio / despacho desde almacén).',
        'Implementé test de conexión de credenciales y recepción de webhooks firmados con HMAC.',
        'Cubrí el flujo con tests automatizados backend+frontend antes de producción.',
      ],
      tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'RabbitMQ', 'HMAC'],
    },
    {
      title: 'Idempotencia en el despacho de pedidos',
      problem: 'El proveedor no permite consultar un pedido por código; un timeout dejaba el estado ambiguo.',
      bullets: [
        'Diseñé un esquema de reserva previa con toma atómica en base de datos antes de llamar al proveedor.',
        'Ante timeout el sistema no reintenta — deja el pedido en verificación manual, evitando envíos duplicados.',
      ],
      tags: ['Spring Boot', 'PostgreSQL', 'Diseño de APIs'],
    },
    {
      title: 'Sincronización de estados courier → ERP',
      problem: 'Webhooks desordenados llegaban con estados inexistentes en el ciclo de vida interno.',
      bullets: [
        'Mapeé 13 estados externos a una máquina de estados que solo avanza.',
        'Agregué una guarda por antigüedad: un webhook fuera de orden no retrocede el estado.',
        'Los estados desconocidos generan una alerta sin romper el flujo.',
      ],
      tags: ['RabbitMQ', 'arquitectura orientada a eventos', 'máquina de estados'],
    },
    {
      title: 'Consolidación de arquitectura de integraciones',
      problem: 'Cada integración nueva nacía como microservicio propio, multiplicando infraestructura y código duplicado.',
      bullets: [
        'Unifiqué todo en un único servicio con un módulo por proveedor y credenciales aisladas por integración.',
        'Centralicé la publicación de eventos y los bindings.',
        'Eliminé un microservicio completo sin pérdida de funcionalidad.',
      ],
      tags: ['NestJS', 'microservicios', 'arquitectura modular'],
    },
    {
      title: 'API Gateway y validación de tokens',
      problem: 'El frontend llamaba directo a cada microservicio, dispersando la autenticación y el ruteo.',
      bullets: [
        'Centralicé el tráfico vía un API Gateway.',
        'Implementé validación stateless de tokens con firma asimétrica y claves publicadas por JWKS.',
      ],
      tags: ['Spring Cloud Gateway', 'JWT', 'RS256'],
    },
  ],
  en: [
    {
      title: 'End-to-end courier connector',
      problem: 'The ERP needed to dispatch orders to a new logistics provider with no existing process.',
      bullets: [
        'Designed the order-creation contract with validation by customer type (home pickup / warehouse dispatch).',
        'Built a credentials connection test and HMAC-signed webhook reception.',
        'Covered the flow with automated backend+frontend tests before shipping to production.',
      ],
      tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'RabbitMQ', 'HMAC'],
    },
    {
      title: 'Idempotency in order dispatch',
      problem: "The provider doesn't support looking up an order by code; a timeout left the state ambiguous.",
      bullets: [
        'Designed an upfront-reservation scheme with an atomic DB claim before calling the provider.',
        "On timeout the system doesn't retry — it flags the order for manual verification, avoiding duplicate dispatches.",
      ],
      tags: ['Spring Boot', 'PostgreSQL', 'API design'],
    },
    {
      title: 'Courier → ERP status sync',
      problem: "Out-of-order webhooks carried states that didn't exist in the internal lifecycle.",
      bullets: [
        'Mapped 13 external states onto a forward-only state machine.',
        "Added a staleness guard so an out-of-order webhook can't roll back the state.",
        'Unknown states raise an alert without breaking the flow.',
      ],
      tags: ['RabbitMQ', 'event-driven architecture', 'state machine'],
    },
    {
      title: 'Consolidating the integrations architecture',
      problem: 'Every new integration was born as its own microservice, multiplying infrastructure and duplicated code.',
      bullets: [
        'Unified everything into a single service with one module per provider and isolated credentials per integration.',
        'Centralized event publishing and bindings.',
        'Removed an entire microservice with no loss of functionality.',
      ],
      tags: ['NestJS', 'microservices', 'modular architecture'],
    },
    {
      title: 'API Gateway and token validation',
      problem: 'The frontend called each microservice directly, scattering auth and routing.',
      bullets: [
        'Centralized traffic through an API Gateway.',
        'Implemented stateless token validation with asymmetric signing and JWKS-published keys.',
      ],
      tags: ['Spring Cloud Gateway', 'JWT', 'RS256'],
    },
  ],
}
