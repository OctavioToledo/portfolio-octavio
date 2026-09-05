import type { Localized } from './types'

export type CaseStudy = {
  title: string
  problem: string
  bullets: string[]
  tags: string[]
}

// Redactado en neutro a propósito (regla de confidencialidad): sin nombres de proveedores
// externos, sin nombres de servicios internos, sin métricas del sistema del empleador.
export const caseStudies: Localized<CaseStudy[]> = {
  es: [
    {
      title: 'Integridad de inventario en un sistema multi-servicio',
      problem:
        'La gran mayoría de las ventas importadas no descontaba stock, y el inventario se corrompía cuando dos ventas de la misma variante ocurrían a la vez.',
      bullets: [
        'Diagnostiqué midiendo contra producción: la clave que enganchaba cada venta con su producto cubría menos del 10% de los casos reales, y el resto se descartaba en silencio.',
        'Corregí las causas raíz en la ingesta: el mapeo que perdía la variante, el sync de stock que pisaba reservas activas y las mermas que no descontaban stock físico.',
        'Agregué bloqueo pesimista en las operaciones de inventario e idempotencia en webhooks y creación de ventas.',
        'Rediseñé la resolución de productos entre cinco microservicios: nueva clave de matching con tabla de referencias externas, bandeja de reconciliación por empresa para los casos ambiguos, y despliegue por fases con shadow mode para no romper la ingesta en producción.',
      ],
      tags: ['PostgreSQL', 'Concurrencia', 'TypeORM', 'Modelado de datos'],
    },
    {
      title: 'Idempotencia en operaciones no reintentables',
      problem:
        'Varios proveedores externos no permiten consultar lo que acabás de crear, así que un timeout deja el estado ambiguo: no sabés si la operación ocurrió.',
      bullets: [
        'Implementé un esquema de reserva previa con índice único e INSERT ignorado: solo el hilo que gana el insert ejecuta la acción.',
        'Ante fallo posterior, rollback de la reserva; ante timeout, verificación manual en vez de reintento ciego.',
        'El mismo patrón cubre creación de pedidos, webhooks entrantes e importación.',
      ],
      tags: ['Concurrencia', 'PostgreSQL', 'NestJS'],
    },
    {
      title: 'Consistencia de estado ante eventos desordenados',
      problem: 'Los webhooks llegan duplicados, fuera de orden y sin garantía de entrega.',
      bullets: [
        'Máquina de estados forward-only con guarda de staleness por timestamp; la cancelación es la única transición terminal que siempre se aplica.',
        'El payload del webhook no se considera fuente de verdad: al recibirlo se re-consulta la API y se emiten los valores reales.',
      ],
      tags: ['RabbitMQ', 'Event-driven', 'Máquina de estados'],
    },
    {
      title: 'Conector bidireccional con alta self-service',
      problem:
        'Publicar el catálogo en una plataforma externa y transcribir sus pedidos se hacía a mano, y cada alta de una empresa requería intervención del equipo.',
      bullets: [
        'Sincronización de catálogo hacia la plataforma externa —productos, variantes, precios e imágenes— idempotente: se puede correr las veces que haga falta sin duplicar nada.',
        'Ingesta de pedidos en tiempo real por webhooks: cada venta cerrada afuera entra sola al ERP, por eventos y sin tocar el core de ventas.',
        'Alta self-service: la empresa carga su propia credencial, verifica la conexión y activa la integración. Las credenciales se resuelven por empresa y el fallback global está desactivado por defecto, para que dos clientes no puedan cruzarse en producción.',
      ],
      tags: ['NestJS', 'RabbitMQ', 'Webhooks', 'Multi-tenancy'],
    },
    {
      title: 'Resiliencia del consumo de mensajes',
      problem:
        'Un consumidor descartaba mensajes ante cualquier error de procesamiento, perdiendo eventos de forma silenciosa.',
      bullets: [
        'Reemplacé el descarte por reintentos con cola de mensajes muertos.',
        'Mantuve el dominio desacoplado del conector: si el proveedor externo se cae, la venta sigue funcionando.',
      ],
      tags: ['RabbitMQ', 'DLQ', 'Microservicios'],
    },
  ],
  en: [
    {
      title: 'Inventory integrity in a multi-service system',
      problem:
        "The vast majority of imported sales weren't drawing down stock, and inventory got corrupted when two sales of the same variant happened at once.",
      bullets: [
        'Diagnosed it by measuring against production: the key linking each sale to its product covered less than 10% of real cases, and the rest was silently discarded.',
        "Fixed the root causes in ingestion: the mapping that lost the variant, the stock sync that overwrote active reservations, and write-offs that weren't drawing down physical stock.",
        'Added pessimistic locking to inventory operations and idempotency to webhooks and sale creation.',
        'Redesigned product resolution across five microservices: a new matching key backed by an external reference table, a per-company reconciliation queue for ambiguous cases, and a phased rollout with shadow mode to avoid breaking ingestion in production.',
      ],
      tags: ['PostgreSQL', 'Concurrency', 'TypeORM', 'Data modeling'],
    },
    {
      title: 'Idempotency in non-retryable operations',
      problem:
        "Several external providers offer no way to look up what you just created, so a timeout leaves the state ambiguous: you can't tell whether the operation went through.",
      bullets: [
        'Implemented a reserve-first scheme with a unique index and an ignored INSERT: only the thread that wins the insert performs the action.',
        'On downstream failure, the reservation is rolled back; on timeout, the operation goes to manual verification instead of a blind retry.',
        'The same pattern covers order creation, inbound webhooks and imports.',
      ],
      tags: ['Concurrency', 'PostgreSQL', 'NestJS'],
    },
    {
      title: 'State consistency under out-of-order events',
      problem: 'Webhooks arrive duplicated, out of order and with no delivery guarantee.',
      bullets: [
        'Forward-only state machine with a timestamp staleness guard; cancellation is the only terminal transition that always applies.',
        'The webhook payload is not treated as the source of truth: on receipt the API is re-queried and the real values are emitted.',
      ],
      tags: ['RabbitMQ', 'Event-driven', 'State machine'],
    },
    {
      title: 'Bidirectional connector with self-service onboarding',
      problem:
        'Publishing the catalog to an external platform and transcribing its orders was done by hand, and onboarding each company required the team to step in.',
      bullets: [
        'Idempotent catalog sync to the external platform — products, variants, prices and images — safe to re-run as many times as needed without duplicating anything.',
        'Real-time order ingestion via webhooks: every sale closed outside flows into the ERP on its own, event-driven, without touching the sales core.',
        'Self-service onboarding: the company enters its own credential, verifies the connection and activates the integration. Credentials resolve per company and the global fallback is off by default, so two clients can never cross over in production.',
      ],
      tags: ['NestJS', 'RabbitMQ', 'Webhooks', 'Multi-tenancy'],
    },
    {
      title: 'Message-consumption resilience',
      problem: 'A consumer was discarding messages on any processing error, silently losing events.',
      bullets: [
        'Replaced the discard with retries backed by a dead-letter queue.',
        'Kept the domain decoupled from the connector: if the external provider goes down, sales keep working.',
      ],
      tags: ['RabbitMQ', 'DLQ', 'Microservices'],
    },
  ],
}
