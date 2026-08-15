'use client'

import { useLanguage } from '@/context/language-context'

const RIGHTS_TEXT = {
  es: 'Todos los derechos reservados.',
  en: 'All rights reserved.',
}

export function Footer() {
  const { language } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stroke-soft py-8">
      <div className="mx-auto max-w-[1080px] px-7 font-mono text-[11px] uppercase tracking-wider text-fg-faint">
        © {year} Toledo Octavio M. — {RIGHTS_TEXT[language]}
      </div>
    </footer>
  )
}
