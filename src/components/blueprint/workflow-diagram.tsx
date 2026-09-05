'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '@/context/language-context'

const DIAGRAM_TEXT = {
  es: {
    ariaLabel:
      'Diagrama del ciclo de desarrollo: requerimientos, arquitectura, implementación, tests y deploy, con iteración continua.',
    stages: ['Requerimientos', 'Arquitectura', 'Implementación', 'Tests', 'Deploy'],
    loop: 'Iteración',
  },
  en: {
    ariaLabel:
      'Development-cycle diagram: requirements, architecture, implementation, tests and deploy, with continuous iteration.',
    stages: ['Requirements', 'Architecture', 'Implementation', 'Tests', 'Deploy'],
    loop: 'Iteration',
  },
}

const BOX_W = 122
const BOX_H = 46
const BOX_Y = 24
const XS = [8, 164, 320, 476, 632]
const MID_Y = BOX_Y + BOX_H / 2
const BOTTOM = BOX_Y + BOX_H
const LOOP_Y = 116
const CX_FIRST = XS[0] + BOX_W / 2
const CX_LAST = XS[XS.length - 1] + BOX_W / 2

export function WorkflowDiagram() {
  const reduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const t = DIAGRAM_TEXT[language]

  // Structure (boxes + lines) is always drawn; the animation only walks a
  // brighter highlight through the stages in sequence. If motion never runs
  // (reduced-motion, throttled rAF) the diagram still reads correctly.
  const illuminate = (step: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0.6 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay: step * 0.3 },
        }

  return (
    <svg viewBox="0 0 760 132" role="img" aria-label={t.ariaLabel} className="mx-auto w-full max-w-[760px]">
      {XS.slice(0, -1).map((x, i) => (
        <line
          key={`c${i}`}
          x1={x + BOX_W}
          y1={MID_Y}
          x2={XS[i + 1]}
          y2={MID_Y}
          className="stroke-stroke"
          strokeWidth={1}
        />
      ))}

      {XS.map((x, i) => (
        <motion.g key={`b${i}`} {...illuminate(i)}>
          <rect x={x} y={BOX_Y} width={BOX_W} height={BOX_H} className="fill-card stroke-stroke" />
          <text
            x={x + BOX_W / 2}
            y={BOX_Y + 17}
            textAnchor="middle"
            className="fill-amber font-mono text-[8.5px] tracking-wider"
          >
            {String(i + 1).padStart(2, '0')}
          </text>
          <text
            x={x + BOX_W / 2}
            y={BOX_Y + 32}
            textAnchor="middle"
            className="fill-fg-dim font-mono text-[10.5px]"
          >
            {t.stages[i]}
          </text>
        </motion.g>
      ))}

      {/* iteration loop — the cycle closes back to the start */}
      <path
        d={`M${CX_LAST} ${BOTTOM} V${LOOP_Y} H${CX_FIRST} V${BOTTOM + 6}`}
        className="stroke-amber"
        strokeWidth={1}
        strokeDasharray="3 4"
        fill="none"
      />
      <path
        d={`M${CX_FIRST - 4} ${BOTTOM + 12} L${CX_FIRST} ${BOTTOM + 4} L${CX_FIRST + 4} ${BOTTOM + 12}`}
        className="stroke-amber"
        strokeWidth={1}
        fill="none"
      />
      <text x={384} y={LOOP_Y - 5} textAnchor="middle" className="fill-amber font-mono text-[9px] tracking-wider">
        {t.loop.toUpperCase()}
      </text>
    </svg>
  )
}
