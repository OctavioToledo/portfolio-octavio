'use client'

import { useLanguage } from '@/context/language-context'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="border border-stroke-soft px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-fg-dim transition-colors hover:border-brand hover:text-brand"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
