import { describe, expect, it, beforeEach, vi } from 'vitest'
import { getInitialLanguage, persistLanguage, LANGUAGE_STORAGE_KEY } from './language-storage'

function createMockStorage() {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
  }
}

describe('language-storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMockStorage())
  })

  it('returns "es" by default when nothing is stored', () => {
    expect(getInitialLanguage()).toBe('es')
  })

  it('returns the stored language when valid', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en')
    expect(getInitialLanguage()).toBe('en')
  })

  it('falls back to "es" when the stored value is invalid', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'fr')
    expect(getInitialLanguage()).toBe('es')
  })

  it('persistLanguage writes the value to storage', () => {
    persistLanguage('en')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en')
  })
})
