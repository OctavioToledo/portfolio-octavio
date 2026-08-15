'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '@/context/language-context'

const DIAGRAM_TEXT = {
  es: {
    ariaLabel: 'Diagrama de la arquitectura de integraciones entre el ERP y plataformas externas',
    eventBus: 'Bus de eventos',
    integrations: 'Integraciones',
    perProvider: '1 MÓDULO / PROVEEDOR',
    payments: 'Pagos',
    incomingWebhooks: 'WEBHOOKS ENTRANTES',
  },
  en: {
    ariaLabel: 'Diagram of the integrations architecture between the ERP and external platforms',
    eventBus: 'Event bus',
    integrations: 'Integrations',
    perProvider: '1 MODULE / PROVIDER',
    payments: 'Payments',
    incomingWebhooks: 'INCOMING WEBHOOKS',
  },
}

export function ArchitectureDiagram() {
  const reduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const t = DIAGRAM_TEXT[language]

  const lineProps = {
    initial: reduceMotion ? undefined : { pathLength: 0 },
    whileInView: reduceMotion ? undefined : { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.4, ease: 'easeOut' as const },
  }

  return (
    <svg
      viewBox="0 0 760 250"
      role="img"
      aria-label={t.ariaLabel}
      className="mx-auto w-full max-w-[760px]"
    >
      <rect x="34" y="96" width="128" height="52" className="fill-card stroke-stroke" />
      <text x="98" y="118" textAnchor="middle" className="fill-fg-dim font-mono text-[10.5px]">
        Core ERP
      </text>
      <text x="98" y="134" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        SPRING BOOT
      </text>

      <motion.path d="M162 122 H244" className="stroke-stroke" strokeWidth={1} fill="none" {...lineProps} />

      <rect x="244" y="96" width="122" height="52" className="fill-card stroke-stroke" />
      <text x="305" y="118" textAnchor="middle" className="fill-fg-dim font-mono text-[10.5px]">
        {t.eventBus}
      </text>
      <text x="305" y="134" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        RABBITMQ
      </text>

      <motion.path d="M366 122 H448" className="stroke-stroke" strokeWidth={1} fill="none" {...lineProps} />

      <rect x="448" y="80" width="128" height="84" className="fill-card stroke-brand" strokeWidth={1.25} />
      <text x="512" y="106" textAnchor="middle" className="fill-brand font-mono text-[10.5px]">
        {t.integrations}
      </text>
      <text x="512" y="122" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        NESTJS
      </text>
      <text x="512" y="144" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        {t.perProvider}
      </text>

      <motion.path d="M576 100 H620 V44 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />
      <motion.path d="M576 114 H640 V96 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />
      <motion.path d="M576 130 H640 V148 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />
      <motion.path d="M576 144 H620 V200 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />

      <text x="678" y="48" className="fill-fg-dim font-mono text-[10.5px]">Couriers</text>
      <text x="678" y="100" className="fill-fg-dim font-mono text-[10.5px]">Marketplaces</text>
      <text x="678" y="152" className="fill-fg-dim font-mono text-[10.5px]">{t.payments}</text>
      <text x="678" y="204" className="fill-fg-dim font-mono text-[10.5px]">SUNAT</text>

      <path d="M512 164 V206" strokeDasharray="3 4" className="stroke-stroke" strokeWidth={1} fill="none" />
      <text x="512" y="222" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        {t.incomingWebhooks}
      </text>
    </svg>
  )
}
