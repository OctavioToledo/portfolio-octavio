export type Language = 'es' | 'en'

export type Localized<T> = {
  es: T
  en: T
}
