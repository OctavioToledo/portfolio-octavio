'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import { heroContent, socialLinks } from '@/content/hero'
import { ThemeToggle } from './theme-toggle'
import { LanguageToggle } from './language-toggle'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

const NAV_SECTIONS = [
  { id: 'hero', es: 'Inicio', en: 'Home' },
  { id: 'como-trabajo', es: 'Cómo trabajo', en: 'How I work' },
  { id: 'experiencia', es: 'Experiencia', en: 'Experience' },
  { id: 'casos-tecnicos', es: 'Casos técnicos', en: 'Case studies' },
  { id: 'proyectos', es: 'Proyectos', en: 'Projects' },
  { id: 'skills', es: 'Skills', en: 'Skills' },
  { id: 'resumen', es: 'Resumen', en: 'Summary' },
  { id: 'contacto', es: 'Contacto', en: 'Contact' },
] as const

export function Navbar() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === '/'
  // useScrollSpy looks up section ids via document.getElementById — on routes other than
  // "/" none of them exist, so it safely resolves to null and nothing is highlighted.
  const activeId = useScrollSpy(NAV_SECTIONS.map((s) => s.id))
  const cv = heroContent[language]
  const cvHref = language === 'es' ? socialLinks.cvEs : socialLinks.cvEn

  function renderLinks() {
    return NAV_SECTIONS.map((section) => (
      <a
        key={section.id}
        href={isHome ? `#${section.id}` : `/#${section.id}`}
        className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-wider transition-colors ${
          isHome && activeId === section.id ? 'text-brand' : 'text-fg-dim hover:text-fg'
        }`}
      >
        {section[language]}
      </a>
    ))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stroke-soft bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1080px] items-center gap-6 px-7 py-3">
        <nav className="hidden flex-1 gap-4 md:flex">{renderLinks()}</nav>

        <Sheet>
          <SheetTrigger className="md:hidden" aria-label="Abrir menú">
            <Menu className="h-5 w-5 text-fg" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <nav className="mt-10 flex flex-col gap-5 px-4">{renderLinks()}</nav>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={cvHref}
            download
            className="inline-flex items-center gap-1.5 whitespace-nowrap bg-brand px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
          >
            {cv.cvLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
