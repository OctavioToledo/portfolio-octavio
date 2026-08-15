'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/context/language-context'

const THEME_LABELS = {
  es: { light: 'Claro', dark: 'Oscuro', loading: 'Tema' },
  en: { light: 'Light', dark: 'Dark', loading: 'Theme' },
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const labels = THEME_LABELS[language]

  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      disabled={!mounted}
      className="border border-stroke-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-dim transition-colors hover:border-brand hover:text-brand disabled:opacity-0"
    >
      {mounted ? (theme === 'dark' ? labels.light : labels.dark) : labels.loading}
    </button>
  )
}
