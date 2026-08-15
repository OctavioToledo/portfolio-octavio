'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      disabled={!mounted}
      className="border border-stroke-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-dim transition-colors hover:border-brand hover:text-brand disabled:opacity-0"
    >
      {mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Theme'}
    </button>
  )
}
