import type { Language } from '@/content/types'

export const LANGUAGE_STORAGE_KEY = 'portfolio-language'

function isLanguage(value: string | null): value is Language {
  return value === 'es' || value === 'en'
}

export function getInitialLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return isLanguage(stored) ? stored : 'es'
}

export function persistLanguage(language: Language): void {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
}
