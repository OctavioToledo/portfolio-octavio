// Shared motion presets so every section reveals with the same rhythm.
// MotionConfig (reducedMotion="user") in the theme provider already neutralises
// these for users who ask for reduced motion.

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const revealUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-64px' },
  transition: { duration: 0.5, ease: EASE },
}

export const revealFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-64px' },
  transition: { duration: 0.5, ease: EASE },
}

type WithTransition = { transition: Record<string, unknown> }

export function withDelay<T extends WithTransition>(preset: T, delay: number): T {
  return { ...preset, transition: { ...preset.transition, delay } }
}
