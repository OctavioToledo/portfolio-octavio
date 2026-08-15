'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Language } from '@/content/types'
import { getInitialLanguage, persistLanguage } from './language-storage'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    setLanguageState(getInitialLanguage())
  }, [])

  function setLanguage(next: Language) {
    setLanguageState(next)
    persistLanguage(next)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
