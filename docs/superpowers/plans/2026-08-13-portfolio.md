# Portfolio de Octavio Toledo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el portfolio de Octavio Toledo en Next.js: sitio bilingüe (ES/EN) de una
página con estética "blueprint técnico", más una página `/sobre-mi`, formulario de contacto
por EmailJS y SEO/Open Graph, sin backend propio.

**Architecture:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui, con
todo el árbol como client components (no hay data fetching server-side real). Contenido
tipado bilingüe en `src/content/*.ts` consumido vía `LanguageContext`. Identidad visual
"blueprint" (paleta oscura por defecto, grilla de fondo, tipografía IBM Plex) implementada
como capa de tokens CSS sobre las variables que shadcn espera, más un set de componentes de
presentación propios en `components/blueprint/`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, `next-themes`, `motion`,
`@emailjs/browser`, `react-hook-form` + `zod`, `vitest` (solo para lógica pura testeable).

**Spec:** `docs/superpowers/specs/2026-08-13-portfolio-design.md`

## Global Constraints

- Sin backend propio, sin API routes de servidor, sin base de datos — deploy en Vercel como
  proyecto 100% frontend (spec §2, §12 fuera de alcance).
- Bilingüe ES/EN sin rutas duplicadas por idioma — un único árbol de rutas (spec §2, §6).
- `next-themes` configurado con `attribute="data-theme"`, NO la clase `.dark` por defecto de
  shadcn (spec §3). Requiere declarar `@custom-variant dark` a mano en `globals.css` desde el
  primer commit de estilos, o las utilidades `dark:` de shadcn quedan muertas.
- Sin barras de progreso ni porcentajes de skill — tags agrupados por categoría únicamente
  (spec §2, §8.6).
- Sin suite de tests E2E/componentes — TypeScript estricto + ESLint + QA manual. Solo se
  testea con Vitest la lógica pura sin DOM (persistencia de idioma, validación del form de
  contacto, cálculo de sección activa del navbar) (spec §11).
- Gestor de paquetes: npm (spec §3).
- Todo el copy bilingüe vive en `src/content/*.ts` tipado con `Localized<T>` — TypeScript debe
  forzar paridad de claves ES/EN (spec §6).

---

## Task 1: Scaffold del proyecto Next.js

El directorio `D:/Proyectos/A-Portfolio26` ya es un repo git con `mockup.html`,
`PORTFOLIO_CONTEXT.md` y `docs/superpowers/`. `create-next-app` no acepta bien directorios no
vacíos con archivos que no reconoce, así que se scaffoldea en un directorio temporal hermano y
se mueve el contenido, preservando el `.git` existente.

**Files:**
- Create: todo el árbol base de Next.js (`package.json`, `next.config.ts`, `tsconfig.json`,
  `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`,
  `src/app/globals.css`, `public/`, `.gitignore`)

**Interfaces:**
- Produces: proyecto Next.js 15 + TypeScript + Tailwind v4 + App Router + `src/` funcionando
  con `npm run build`. Alias de importación `@/*` → `src/*`.

- [ ] **Step 1: Scaffoldear en directorio temporal**

```bash
cd "D:/Proyectos" && npx create-next-app@latest A-Portfolio26-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

- [ ] **Step 2: Mover el contenido generado a la raíz del repo, sin pisar lo existente**

```bash
cd "D:/Proyectos/A-Portfolio26-scaffold" && rm -rf .git && cp -r . "D:/Proyectos/A-Portfolio26/" && cd "D:/Proyectos" && rm -rf A-Portfolio26-scaffold
```

- [ ] **Step 3: Verificar que el build pasa**

Run: `cd "D:/Proyectos/A-Portfolio26" && npm run build`
Expected: build exitoso (exit code 0), sin errores de TypeScript.

- [ ] **Step 4: Confirmar visualmente que el sitio por defecto levanta**

Run: `npm run dev` (dejarlo correr), abrir `http://localhost:3000` en el navegador, confirmar
que se ve la página default de Next.js. Detener el servidor (Ctrl+C) antes de seguir.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js 15 + TypeScript + Tailwind v4 project"
```

---

## Task 2: Instalar shadcn/ui y los componentes necesarios

**Files:**
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/*.tsx` (button, card,
  accordion, badge, sheet, form, input, textarea, sonner, separator, label)

**Interfaces:**
- Consumes: proyecto de Task 1
- Produces: componentes shadcn en `@/components/ui/*` importables (`Button`, `Card`,
  `Accordion`, `Badge`, `Sheet`, `Form`, `Input`, `Textarea`, `Toaster`/`sonner`, `Separator`,
  `Label`), y `cn()` desde `@/lib/utils`

- [ ] **Step 1: Inicializar shadcn**

```bash
npx shadcn@latest init -d -y
```

Confirmar que crea `components.json` con `"style"` seteado, `"tailwind": {"cssVariables": true}`
y que `src/lib/utils.ts` existe con la función `cn()`.

- [ ] **Step 2: Agregar los componentes necesarios**

```bash
npx shadcn@latest add button card accordion badge sheet form input textarea sonner separator label -y
```

- [ ] **Step 3: Verificar que compila**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Install shadcn/ui and required components"
```

---

## Task 3: Instalar dependencias del proyecto y configurar Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `motion`, `@emailjs/browser`, `next-themes`, `react-hook-form`, `@hookform/resolvers`,
  `zod` disponibles para import. Script `npm test` corriendo Vitest.

- [ ] **Step 1: Instalar dependencias de runtime**

```bash
npm install motion @emailjs/browser next-themes react-hook-form @hookform/resolvers zod lucide-react
```

- [ ] **Step 2: Instalar Vitest como dependencia de desarrollo**

```bash
npm install -D vitest
```

- [ ] **Step 3: Crear `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 4: Agregar script `test` a `package.json`**

En la sección `"scripts"` de `package.json`, agregar:

```json
"test": "vitest run"
```

- [ ] **Step 5: Verificar que Vitest corre (sin tests todavía)**

Run: `npm test`
Expected: "No test files found" (o similar) con exit code 0 o 1 según versión — se resuelve
solo cuando Task 5 agregue el primer test. No debe haber errores de configuración/import.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add runtime dependencies and Vitest test runner"
```

---

## Task 4: Tokens visuales blueprint, fuentes y fix de dark mode

Esta es la base visual de todo el sitio — define la paleta, la tipografía y resuelve el gotcha
de `next-themes` + shadcn antes de que exista ningún componente que dependa de utilidades
`dark:`.

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/components/theme-provider.tsx`

**Interfaces:**
- Produces: clases utilitarias `font-display`, `font-mono` (mono ya viene de Tailwind por
  defecto como `font-mono`, se sobreescribe la familia), variables `--color-amber` y
  `--color-brand` disponibles como `bg-amber`, `text-amber`, `bg-brand`, `text-brand`, etc.
  `<ThemeProvider>` envolviendo la app con `attribute="data-theme"`.

- [ ] **Step 1: Configurar las fuentes IBM Plex en `src/app/layout.tsx`**

```tsx
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
})

const plexSansCondensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-plex',
})
```

Estos tres `variable` se agregan como className en el `<html>` (junto con `suppressHydrationWarning`,
requerido por `next-themes`) en Task 26, donde se arma `layout.tsx` completo. Por ahora dejar
el archivo con estas tres constantes exportadas o definidas arriba del componente, y aplicar
`className={\`${plexSans.variable} ${plexSansCondensed.variable} ${plexMono.variable}\`}` al
`<html>` existente que generó el scaffold.

- [ ] **Step 2: Crear `src/components/theme-provider.tsx`**

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
```

- [ ] **Step 3: Envolver el `<body>` con `ThemeProvider` en `src/app/layout.tsx`**

Agregar `suppressHydrationWarning` al tag `<html>` y envolver `{children}` con
`<ThemeProvider>{children}</ThemeProvider>` dentro del `<body>`.

- [ ] **Step 4: Reescribir `src/app/globals.css` con los tokens blueprint**

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme inline {
  --font-sans: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono-plex), ui-monospace, monospace;

  --color-background: var(--ink);
  --color-foreground: var(--fg);
  --color-card: var(--surface);
  --color-card-foreground: var(--fg);
  --color-popover: var(--surface);
  --color-popover-foreground: var(--fg);
  --color-primary: var(--brand);
  --color-primary-foreground: var(--ink);
  --color-secondary: var(--surface);
  --color-secondary-foreground: var(--fg);
  --color-muted: var(--surface);
  --color-muted-foreground: var(--fg-dim);
  --color-accent: var(--stroke-soft);
  --color-accent-foreground: var(--fg);
  --color-destructive: #c0524a;
  --color-border: var(--stroke-soft);
  --color-input: var(--stroke-soft);
  --color-ring: var(--brand);

  --color-brand: var(--brand);
  --color-amber: var(--amber);
  --color-stroke: var(--stroke);
  --color-stroke-soft: var(--stroke-soft);
  --color-fg-dim: var(--fg-dim);
  --color-fg-faint: var(--fg-faint);
  --color-grid: var(--grid);
}

:root {
  --ink: #0c1119;
  --grid: #18222f;
  --stroke: #3d5975;
  --stroke-soft: #243347;
  --fg: #e3e9f1;
  --fg-dim: #8d9bae;
  --fg-faint: #5d6b7d;
  --brand: #59a8d6;
  --amber: #d9a147;
  --surface: #101825;
}

[data-theme="light"] {
  --ink: #edf1f6;
  --grid: #dae2ec;
  --stroke: #33506f;
  --stroke-soft: #c3d0de;
  --fg: #111a24;
  --fg-dim: #4b5b6d;
  --fg-faint: #7e8c9c;
  --brand: #1b5c8c;
  --amber: #a9701f;
  --surface: #f5f8fb;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    background-image:
      linear-gradient(var(--color-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
    background-size: 32px 32px;
  }
}
```

> **Nota (gotcha #2):** shadcn usa internamente su propio slot `--accent`/`--accent-foreground`
> para fondos de hover neutros (dropdowns, items seleccionados) — NO es el azul de marca del
> mockup. El azul de marca vive en `--brand` / `--color-brand` (usable como `bg-brand`,
> `text-brand`, `border-brand`). No confundir ambos al escribir componentes.

- [ ] **Step 5: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000`. La página debe verse con fondo oscuro
(`#0C1119`) y grilla sutil de 32px. No hace falta que haya contenido todavía, solo confirmar
que el fondo y la tipografía cambiaron respecto al default de Next.js. Detener el servidor.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add blueprint design tokens, IBM Plex fonts, and data-theme dark mode"
```

---

## Task 5: Tipos de contenido y LanguageContext

**Files:**
- Create: `src/content/types.ts`
- Create: `src/context/language-storage.ts`
- Create: `src/context/language-storage.test.ts`
- Create: `src/context/language-context.tsx`

**Interfaces:**
- Produces: `Localized<T>` type. `LanguageProvider`, `useLanguage()` hook devolviendo
  `{ language: 'es' | 'en', setLanguage: (l: 'es' | 'en') => void }`.

- [ ] **Step 1: Crear `src/content/types.ts`**

```typescript
export type Language = 'es' | 'en'

export type Localized<T> = {
  es: T
  en: T
}
```

- [ ] **Step 2: Escribir el test de persistencia (falla primero)**

`src/context/language-storage.test.ts`:

```typescript
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
```

- [ ] **Step 3: Correr el test y verificar que falla**

Run: `npm test -- language-storage`
Expected: FAIL — `language-storage.ts` no existe todavía.

- [ ] **Step 4: Implementar `src/context/language-storage.ts`**

```typescript
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
```

- [ ] **Step 5: Correr el test y verificar que pasa**

Run: `npm test -- language-storage`
Expected: PASS (4 tests).

- [ ] **Step 6: Implementar `src/context/language-context.tsx`**

```tsx
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
```

- [ ] **Step 7: Conectar `LanguageProvider` y el `Toaster` de sonner en `src/app/layout.tsx`**

Envolver `{children}` (que ya está dentro de `<ThemeProvider>` desde Task 4) con
`<LanguageProvider>`, y agregar `<Toaster />` (de `@/components/ui/sonner`) como hermano,
dentro del `<body>`:

```tsx
import { LanguageProvider } from '@/context/language-context'
import { Toaster } from '@/components/ui/sonner'

// dentro del <body>, reemplazando <ThemeProvider>{children}</ThemeProvider>:
<ThemeProvider>
  <LanguageProvider>{children}</LanguageProvider>
  <Toaster />
</ThemeProvider>
```

- [ ] **Step 8: Verificar tipos y build**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Add Localized<T> content types, LanguageContext, and wire providers into layout"
```

---

## Task 6: Archivos de contenido bilingüe

Datos puros — copy tomado literal de la spec §8. Sin lógica, se verifica con `tsc` (paridad
ES/EN forzada por `Localized<T>`).

**Files:**
- Create: `src/content/hero.ts`, `src/content/how-i-work.ts`, `src/content/experience.ts`,
  `src/content/case-studies.ts`, `src/content/projects.ts`, `src/content/skills.ts`,
  `src/content/quick-facts.ts`, `src/content/about.ts`, `src/content/contact.ts`

**Interfaces:**
- Consumes: `Localized<T>` de `@/content/types`
- Produces: `heroContent`, `howIWorkContent`, `experienceEntries`, `caseStudies`,
  `projectsContent`, `skillCategories`, `quickFactsContent`, `aboutContent`, `contactContent`
  — todos exportados como `Localized<...>` (o array de entradas ya bilingües, ver cada archivo)

- [ ] **Step 1: `src/content/hero.ts`**

```typescript
import type { Localized } from './types'

export type HeroContent = {
  name: string
  role: string
  tagline: string
  location: string
  cvLabel: string
}

export const heroContent: Localized<HeroContent> = {
  es: {
    name: 'Octavio Toledo',
    role: 'Software Engineer',
    tagline:
      'Backend e integraciones para plataformas ERP. Java, Spring Boot, NestJS y arquitectura orientada a eventos.',
    location: 'Mendoza, AR · Remoto',
    cvLabel: 'Descargar CV',
  },
  en: {
    name: 'Octavio Toledo',
    role: 'Software Engineer',
    tagline:
      'Backend and integrations for ERP platforms. Java, Spring Boot, NestJS and event-driven architecture.',
    location: 'Mendoza, AR · Remote',
    cvLabel: 'Download CV',
  },
}

export const socialLinks = {
  github: 'https://github.com/OctavioToledo',
  linkedin: 'https://linkedin.com/in/octaviotoledo',
  email: 'octatoledo7@gmail.com',
  cvEs: '/cv/cv-octavio-toledo-dev-es.pdf',
  cvEn: '/cv/cv-octavio-toledo-dev-en.pdf',
}
```

- [ ] **Step 2: `src/content/how-i-work.ts`**

```typescript
import type { Localized } from './types'

export type Stat = { value: string; label: string }
export type Pillar = { title: string }

export type HowIWorkContent = {
  sectionTitle: string
  stats: Stat[]
  pillars: Pillar[]
}

export const howIWorkContent: Localized<HowIWorkContent> = {
  es: {
    sectionTitle: 'Cómo trabajo',
    stats: [
      { value: '+3', label: 'años construyendo software' },
      { value: '+5', label: 'integraciones en producción' },
    ],
    pillars: [
      {
        title:
          'Diseño para fallas — idempotencia y verificación manual ante timeouts ambiguos, para evitar envíos duplicados en las integraciones que construí.',
      },
      {
        title:
          'Desarrollo asistido por IA — uso Claude Code y Gemini a diario para acelerar la implementación y automatizar tareas repetitivas.',
      },
    ],
  },
  en: {
    sectionTitle: 'How I work',
    stats: [
      { value: '3+', label: 'years building software' },
      { value: '5+', label: 'integrations in production' },
    ],
    pillars: [
      {
        title:
          'Designed for failure — idempotency and manual verification on ambiguous timeouts, to avoid duplicate dispatches in the integrations I built.',
      },
      {
        title:
          'AI-assisted development — I use Claude Code and Gemini daily to speed up implementation and automate repetitive tasks.',
      },
    ],
  },
}
```

- [ ] **Step 3: Verificar tipos**

Run: `npm run build`
Expected: exit code 0 (con `src/app/page.tsx` todavía sin usar este contenido, solo debe
compilar el archivo nuevo sin errores de tipo).

- [ ] **Step 4: Commit parcial**

```bash
git add -A
git commit -m "Add hero and how-i-work content"
```

- [ ] **Step 5: `src/content/experience.ts`**

```typescript
import type { Localized } from './types'

export type ExperienceEntry = {
  title: string
  subtitle: string
  role: string
  period: string
  context: string
  highlights: string[]
  tags: string[]
  links?: { label: string; href: string }[]
  current: boolean
}

export const experienceEntries: Localized<ExperienceEntry[]> = {
  es: [
    {
      title: 'Aranni Brands — Powip',
      subtitle: 'ERP SaaS · microservicios',
      role: 'Full Stack Developer — Integraciones',
      period: 'Septiembre 2025 — Actualidad',
      context:
        'PowipSystem, un ERP SaaS con arquitectura de microservicios, con foco en la capa de integraciones con sistemas externos.',
      highlights: [
        'Construyo conectores de punta a punta (couriers, e-commerce, pagos, facturación electrónica) desde el análisis de documentación del proveedor hasta producción.',
        'Diseñé un módulo unificado de integraciones (credenciales y webhook aislados por proveedor, sin multiplicar microservicios).',
        'Esquema de idempotencia y manejo de fallos (reserva previa, claim atómico, verificación manual ante timeouts ambiguos).',
        'Frontend de cada integración con Next.js, React y TailwindCSS.',
      ],
      tags: ['Java', 'Spring Boot', 'NestJS', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript'],
      links: [
        { label: 'Sistema', href: 'https://www.powip.tech/login' },
        { label: 'Landing', href: 'https://www.powip.lat/' },
      ],
      current: true,
    },
    {
      title: 'Independiente',
      subtitle: 'Gimnasio',
      role: 'Desarrollador Freelance',
      period: 'Julio 2026 — Actualidad',
      context:
        'Diseño y desarrollo de un sistema de gestión a medida para un gimnasio, reemplazando un flujo manual de papel y Excel para ~200 socios.',
      highlights: [
        'Relevamiento de requerimientos y definición iterativa del producto con el cliente.',
        'Desarrollo end-to-end (arquitectura, backend, frontend).',
        'Módulo de cobros con log de auditoría inmutable (quién, cuándo, cómo, comprobante).',
      ],
      tags: ['NestJS', 'React', 'PostgreSQL', 'Supabase', 'Vercel'],
      current: true,
    },
    {
      title: 'Independiente',
      subtitle: 'Clases particulares',
      role: 'Profesor de programación',
      period: '2023 — Actualidad',
      context:
        'Clases uno a uno para estudiantes y personas en transición hacia el desarrollo de software.',
      highlights: [
        'Enseñanza de fundamentos de programación, Java y desarrollo web orientado a proyectos.',
        'Material adaptado a cada alumno, priorizando código real desde la primera clase.',
      ],
      tags: ['Java', 'JavaScript', 'SQL'],
      current: false,
    },
  ],
  en: [
    {
      title: 'Aranni Brands — Powip',
      subtitle: 'SaaS ERP · microservices',
      role: 'Full Stack Developer — Integrations',
      period: 'September 2025 — Present',
      context:
        'PowipSystem, a microservices-based SaaS ERP, focused on the integrations layer with external systems.',
      highlights: [
        'Build end-to-end connectors (couriers, e-commerce, payments, e-invoicing) from provider documentation analysis to production.',
        'Designed a unified integrations module (isolated credentials and webhook per provider, no microservice sprawl).',
        'Idempotency and failure-handling scheme (upfront reservation, atomic claim, manual verification on ambiguous timeouts).',
        'Frontend for each integration with Next.js, React and TailwindCSS.',
      ],
      tags: ['Java', 'Spring Boot', 'NestJS', 'RabbitMQ', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript'],
      links: [
        { label: 'System', href: 'https://www.powip.tech/login' },
        { label: 'Landing', href: 'https://www.powip.lat/' },
      ],
      current: true,
    },
    {
      title: 'Independent',
      subtitle: 'Gym',
      role: 'Freelance Developer',
      period: 'July 2026 — Present',
      context:
        'Designing and building a custom management system for a gym, replacing a manual paper-and-spreadsheet workflow for ~200 members.',
      highlights: [
        'Requirements gathering and iterative product definition with the client.',
        'End-to-end development (architecture, backend, frontend).',
        'Payments module with immutable audit log (who, when, how, receipt).',
      ],
      tags: ['NestJS', 'React', 'PostgreSQL', 'Supabase', 'Vercel'],
      current: true,
    },
    {
      title: 'Independent',
      subtitle: 'Private tutoring',
      role: 'Programming instructor',
      period: '2023 — Present',
      context:
        'One-on-one classes for students and people transitioning into software development.',
      highlights: [
        'Teaching programming fundamentals, Java and project-based web development.',
        'Material adapted to each student, prioritizing real code from the first class.',
      ],
      tags: ['Java', 'JavaScript', 'SQL'],
      current: false,
    },
  ],
}
```

- [ ] **Step 6: Verificar tipos**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 7: Commit parcial**

```bash
git add -A
git commit -m "Add experience content"
```

- [ ] **Step 8: `src/content/case-studies.ts`**

```typescript
import type { Localized } from './types'

export type CaseStudy = {
  title: string
  problem: string
  bullets: string[]
  tags: string[]
}

export const caseStudies: Localized<CaseStudy[]> = {
  es: [
    {
      title: 'Conector de courier end-to-end',
      problem: 'Había que despachar pedidos a un nuevo operador logístico sin proceso previo.',
      bullets: [
        'Diseñé el contrato de creación de pedidos con validación por tipo de cliente (retiro en domicilio / despacho desde almacén).',
        'Implementé test de conexión de credenciales y recepción de webhooks firmados con HMAC.',
        'Cubrí el flujo con tests automatizados backend+frontend antes de producción.',
      ],
      tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'RabbitMQ', 'HMAC'],
    },
    {
      title: 'Idempotencia en el despacho de pedidos',
      problem: 'El proveedor no permite consultar un pedido por código; un timeout dejaba el estado ambiguo.',
      bullets: [
        'Diseñé un esquema de reserva previa con toma atómica en base de datos antes de llamar al proveedor.',
        'Ante timeout el sistema no reintenta — deja el pedido en verificación manual, evitando envíos duplicados.',
      ],
      tags: ['Spring Boot', 'PostgreSQL', 'Diseño de APIs'],
    },
    {
      title: 'Sincronización de estados courier → ERP',
      problem: 'Webhooks desordenados llegaban con estados inexistentes en el ciclo de vida interno.',
      bullets: [
        'Mapeé 13 estados externos a una máquina de estados que solo avanza.',
        'Agregué una guarda por antigüedad: un webhook fuera de orden no retrocede el estado.',
        'Los estados desconocidos generan una alerta sin romper el flujo.',
      ],
      tags: ['RabbitMQ', 'arquitectura orientada a eventos', 'máquina de estados'],
    },
    {
      title: 'Consolidación de arquitectura de integraciones',
      problem: 'Cada integración nueva nacía como microservicio propio, multiplicando infraestructura y código duplicado.',
      bullets: [
        'Unifiqué todo en un único servicio con un módulo por proveedor y credenciales aisladas por integración.',
        'Centralicé la publicación de eventos y los bindings.',
        'Eliminé un microservicio completo sin pérdida de funcionalidad.',
      ],
      tags: ['NestJS', 'microservicios', 'arquitectura modular'],
    },
    {
      title: 'API Gateway y validación de tokens',
      problem: 'El frontend llamaba directo a cada microservicio, dispersando la autenticación y el ruteo.',
      bullets: [
        'Centralicé el tráfico vía un API Gateway.',
        'Implementé validación stateless de tokens con firma asimétrica y claves publicadas por JWKS.',
      ],
      tags: ['Spring Cloud Gateway', 'JWT', 'RS256'],
    },
  ],
  en: [
    {
      title: 'End-to-end courier connector',
      problem: 'The ERP needed to dispatch orders to a new logistics provider with no existing process.',
      bullets: [
        'Designed the order-creation contract with validation by customer type (home pickup / warehouse dispatch).',
        'Built a credentials connection test and HMAC-signed webhook reception.',
        'Covered the flow with automated backend+frontend tests before shipping to production.',
      ],
      tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'RabbitMQ', 'HMAC'],
    },
    {
      title: 'Idempotency in order dispatch',
      problem: "The provider doesn't support looking up an order by code; a timeout left the state ambiguous.",
      bullets: [
        'Designed an upfront-reservation scheme with an atomic DB claim before calling the provider.',
        "On timeout the system doesn't retry — it flags the order for manual verification, avoiding duplicate dispatches.",
      ],
      tags: ['Spring Boot', 'PostgreSQL', 'API design'],
    },
    {
      title: 'Courier → ERP status sync',
      problem: "Out-of-order webhooks carried states that didn't exist in the internal lifecycle.",
      bullets: [
        'Mapped 13 external states onto a forward-only state machine.',
        "Added a staleness guard so an out-of-order webhook can't roll back the state.",
        'Unknown states raise an alert without breaking the flow.',
      ],
      tags: ['RabbitMQ', 'event-driven architecture', 'state machine'],
    },
    {
      title: 'Consolidating the integrations architecture',
      problem: 'Every new integration was born as its own microservice, multiplying infrastructure and duplicated code.',
      bullets: [
        'Unified everything into a single service with one module per provider and isolated credentials per integration.',
        'Centralized event publishing and bindings.',
        'Removed an entire microservice with no loss of functionality.',
      ],
      tags: ['NestJS', 'microservices', 'modular architecture'],
    },
    {
      title: 'API Gateway and token validation',
      problem: 'The frontend called each microservice directly, scattering auth and routing.',
      bullets: [
        'Centralized traffic through an API Gateway.',
        'Implemented stateless token validation with asymmetric signing and JWKS-published keys.',
      ],
      tags: ['Spring Cloud Gateway', 'JWT', 'RS256'],
    },
  ],
}
```

- [ ] **Step 9: `src/content/projects.ts`**

```typescript
import type { Localized } from './types'

export type Project = {
  name: string
  label: string
  description: string
  highlights: string[]
  stack: string[]
  liveUrl?: string
}

export const projectsContent: Localized<Project[]> = {
  es: [
    {
      name: 'OMTime',
      label: 'Proyecto propio, desarrollado junto a un socio',
      description:
        'Plataforma SaaS propia de gestión de turnos y agenda multi-sucursal, con contabilidad. Ownership end-to-end: desde mockups en Figma y modelado UML hasta el deploy en producción.',
      highlights: [
        'UI/UX compleja — grillas de turnos dinámicas e interactivas, dashboards de clientes.',
        'Backend con Java Spring Boot y Domain-Driven Design para lógica multi-tenant segura.',
        'Monetización integrada con Mercado Pago.',
      ],
      stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Java', 'Spring Boot', 'Mercado Pago API'],
      liveUrl: 'https://om-time.vercel.app/',
    },
  ],
  en: [
    {
      name: 'OMTime',
      label: 'Own project, built with a co-founder',
      description:
        'Own SaaS platform for multi-branch scheduling and appointment management, with accounting. End-to-end ownership: from Figma mockups and UML modeling to production deployment.',
      highlights: [
        'Complex UI/UX — dynamic interactive scheduling grids, client dashboards.',
        'Java Spring Boot backend with Domain-Driven Design for secure multi-tenant logic.',
        'Monetization integrated with Mercado Pago.',
      ],
      stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Java', 'Spring Boot', 'Mercado Pago API'],
      liveUrl: 'https://om-time.vercel.app/',
    },
  ],
}
```

- [ ] **Step 10: `src/content/skills.ts`**

```typescript
import type { Localized } from './types'

export type SkillCategory = {
  category: string
  items: string[]
}

export const skillCategories: Localized<SkillCategory[]> = {
  es: [
    { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'NestJS', 'REST APIs'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'] },
    { category: 'Datos', items: ['PostgreSQL', 'MySQL', 'Supabase', 'JPA/Hibernate'] },
    { category: 'IA & Automatización', items: ['Claude Code', 'Gemini', 'Integración de LLMs'] },
    { category: 'Infra & herramientas', items: ['Docker', 'Git/GitHub', 'Vercel', 'RabbitMQ'] },
  ],
  en: [
    { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'NestJS', 'REST APIs'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'] },
    { category: 'Data', items: ['PostgreSQL', 'MySQL', 'Supabase', 'JPA/Hibernate'] },
    { category: 'AI & Automation', items: ['Claude Code', 'Gemini', 'LLM integration'] },
    { category: 'Infra & tooling', items: ['Docker', 'Git/GitHub', 'Vercel', 'RabbitMQ'] },
  ],
}
```

- [ ] **Step 11: `src/content/quick-facts.ts`**

```typescript
import type { Localized } from './types'

export type QuickFact = { label: string; value: string }

export type QuickFactsContent = {
  facts: QuickFact[]
  ctaLabel: string
}

export const quickFactsContent: Localized<QuickFactsContent> = {
  es: {
    facts: [
      { label: 'Estado', value: 'En búsqueda activa — full-time o freelance' },
      { label: 'Disponibilidad', value: 'Inmediata' },
      { label: 'Roles buscados', value: 'Backend Developer (Java), Full Stack Developer' },
      { label: 'Huso horario', value: 'GMT-3 (Argentina)' },
      { label: 'Idiomas', value: 'Español (nativo), Inglés (avanzado — reuniones y meetings sin problema)' },
      { label: 'Experiencia', value: '+3 años desarrollando software' },
      { label: 'Formación', value: 'Universidad Tecnológica Nacional (UTN)' },
      { label: 'Stack principal', value: 'Java · Spring Boot · Next.js · PostgreSQL' },
    ],
    ctaLabel: 'Conóceme mejor →',
  },
  en: {
    facts: [
      { label: 'Status', value: 'Actively looking — full-time or freelance' },
      { label: 'Availability', value: 'Immediately available' },
      { label: 'Roles', value: 'Backend Developer (Java), Full Stack Developer' },
      { label: 'Time zone', value: 'GMT-3 (Argentina)' },
      { label: 'Languages', value: 'Spanish (native), English (advanced — comfortable in meetings)' },
      { label: 'Experience', value: '3+ years developing software' },
      { label: 'Education', value: 'Universidad Tecnológica Nacional (UTN)' },
      { label: 'Core stack', value: 'Java · Spring Boot · Next.js · PostgreSQL' },
    ],
    ctaLabel: 'Get to know me →',
  },
}
```

- [ ] **Step 12: `src/content/about.ts`**

```typescript
import type { Localized } from './types'

export type AboutContent = {
  headline: string
  paragraphs: string[]
  techGroups: { label: string; items: string[] }[]
  closing: string
  backLabel: string
}

export const aboutContent: Localized<AboutContent> = {
  es: {
    headline: 'Software Engineer | Java Backend | Full Stack | AI-Driven Development',
    paragraphs: [
      'Soy Software Engineer especializado en desarrollo backend con Java y Spring, con experiencia construyendo productos SaaS, arquitecturas de microservicios e integraciones con plataformas externas.',
      'Actualmente participo en el desarrollo de un ERP SaaS en producción, donde diseño e implemento microservicios, APIs REST, integraciones con sistemas de e-commerce, pasarelas de pago, facturación electrónica y otros servicios externos. Mi trabajo combina arquitectura de software, resolución de problemas de negocio y desarrollo Full Stack cuando el proyecto lo requiere.',
      'Además de mi experiencia en backend, desarrollo productos completos para clientes, participando desde el relevamiento de requerimientos y el diseño de la arquitectura hasta la implementación, despliegue y evolución del sistema.',
      'En los últimos años incorporé el desarrollo asistido por IA como parte central de mi forma de trabajar. Utilizo herramientas como Claude Code, Gemini y entornos de desarrollo con agentes para acelerar la implementación, automatizar tareas repetitivas y mejorar la calidad del software. Me interesa especialmente la construcción de aplicaciones AI-Driven y la integración de modelos de lenguaje dentro de productos reales.',
    ],
    techGroups: [
      { label: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'JPA/Hibernate', 'RabbitMQ', 'NestJS'] },
      { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
      { label: 'Arquitectura', items: ['Microservicios', 'Arquitectura Hexagonal', 'DDD', 'SOLID', 'REST APIs'] },
      { label: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
      { label: 'IA y Automatización', items: ['Claude Code', 'Gemini', 'Antigravity', 'desarrollo asistido por agentes', 'integración de LLMs', 'automatización de flujos de desarrollo'] },
    ],
    closing:
      'Disfruto trabajar en productos donde la ingeniería de software, la arquitectura y las necesidades del negocio evolucionan en conjunto. Siempre busco construir soluciones mantenibles, escalables y orientadas a generar impacto real.',
    backLabel: '← Volver al inicio',
  },
  en: {
    headline: 'Software Engineer | Java Backend | Full Stack | AI-Driven Development',
    paragraphs: [
      "I'm a Software Engineer specialized in backend development with Java and Spring, with experience building SaaS products, microservices architectures and integrations with external platforms.",
      "I currently work on a production SaaS ERP, where I design and implement microservices, REST APIs, and integrations with e-commerce systems, payment gateways, e-invoicing providers and other external services. My work combines software architecture, business problem-solving and Full Stack development when the project calls for it.",
      "Beyond backend work, I build complete products for clients, involved from requirements gathering and architecture design through implementation, deployment and the system's ongoing evolution.",
      "In the last few years I've made AI-assisted development a core part of how I work. I use tools like Claude Code, Gemini and agent-driven development environments to speed up implementation, automate repetitive tasks and improve software quality. I'm particularly interested in building AI-driven applications and integrating language models into real products.",
    ],
    techGroups: [
      { label: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'JPA/Hibernate', 'RabbitMQ', 'NestJS'] },
      { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
      { label: 'Architecture', items: ['Microservices', 'Hexagonal Architecture', 'DDD', 'SOLID', 'REST APIs'] },
      { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
      { label: 'AI & Automation', items: ['Claude Code', 'Gemini', 'Antigravity', 'agent-assisted development', 'LLM integration', 'development workflow automation'] },
    ],
    closing:
      'I enjoy working on products where software engineering, architecture and business needs evolve together. I always aim to build maintainable, scalable solutions focused on real impact.',
    backLabel: '← Back to home',
  },
}
```

- [ ] **Step 13: `src/content/contact.ts`, verificar build y commit**

```typescript
import type { Localized } from './types'

export type ContactContent = {
  sectionTitle: string
  intro: string
  emailLabel: string
  locationLabel: string
  locationValue: string
  formNameLabel: string
  formEmailLabel: string
  formMessageLabel: string
  formSubmitLabel: string
  formSuccessMessage: string
  formErrorMessage: string
}

export const contactContent: Localized<ContactContent> = {
  es: {
    sectionTitle: 'Contacto',
    intro: 'Prefiero email o LinkedIn — o usá el formulario de acá abajo. Respondo en 24-48hs.',
    emailLabel: 'Email',
    locationLabel: 'Ubicación',
    locationValue: 'Mendoza, Argentina',
    formNameLabel: 'Nombre',
    formEmailLabel: 'Email',
    formMessageLabel: 'Mensaje',
    formSubmitLabel: 'Enviar mensaje',
    formSuccessMessage: 'Mensaje enviado. Te voy a responder pronto.',
    formErrorMessage: 'No se pudo enviar el mensaje. Probá de nuevo o escribime directo a octatoledo7@gmail.com.',
  },
  en: {
    sectionTitle: 'Contact',
    intro: 'Email or LinkedIn work best — or just use the form below. I reply within 24-48h.',
    emailLabel: 'Email',
    locationLabel: 'Location',
    locationValue: 'Mendoza, Argentina',
    formNameLabel: 'Name',
    formEmailLabel: 'Email',
    formMessageLabel: 'Message',
    formSubmitLabel: 'Send message',
    formSuccessMessage: "Message sent. I'll get back to you soon.",
    formErrorMessage: "Couldn't send the message. Try again or email me directly at octatoledo7@gmail.com.",
  },
}
```

Run: `npm run build` — Expected: exit code 0.

```bash
git add -A
git commit -m "Add remaining bilingual content files (case studies, projects, skills, quick facts, about, contact)"
```

---

## Task 7: Hook de scroll-spy para el navbar

Lógica pura separada del hook de React para poder testearla sin DOM.

**Files:**
- Create: `src/hooks/scroll-spy.ts`
- Create: `src/hooks/scroll-spy.test.ts`
- Create: `src/hooks/use-scroll-spy.ts`

**Interfaces:**
- Produces: `getActiveSectionId(sections, scrollY, offset)` (función pura) y
  `useScrollSpy(sectionIds: string[], offset?: number): string | null` (hook de React)

- [ ] **Step 1: Escribir el test (falla primero)**

`src/hooks/scroll-spy.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { getActiveSectionId } from './scroll-spy'

describe('getActiveSectionId', () => {
  const sections = [
    { id: 'hero', top: 0 },
    { id: 'about', top: 500 },
    { id: 'contact', top: 1200 },
  ]

  it('returns the first section id when at the top', () => {
    expect(getActiveSectionId(sections, 0)).toBe('hero')
  })

  it('returns the section whose top has been scrolled past', () => {
    expect(getActiveSectionId(sections, 600)).toBe('about')
  })

  it('returns the last matching section when scrolled past all tops', () => {
    expect(getActiveSectionId(sections, 5000)).toBe('contact')
  })

  it('applies the offset before comparing', () => {
    expect(getActiveSectionId(sections, 480, 40)).toBe('about')
  })

  it('returns null for an empty sections array', () => {
    expect(getActiveSectionId([], 100)).toBeNull()
  })
})
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `npm test -- scroll-spy`
Expected: FAIL — `scroll-spy.ts` no existe.

- [ ] **Step 3: Implementar `src/hooks/scroll-spy.ts`**

```typescript
export type SectionOffset = { id: string; top: number }

export function getActiveSectionId(
  sections: SectionOffset[],
  scrollY: number,
  offset: number = 0
): string | null {
  if (sections.length === 0) return null
  const sorted = [...sections].sort((a, b) => a.top - b.top)
  let active = sorted[0].id
  for (const section of sorted) {
    if (scrollY + offset >= section.top) {
      active = section.id
    }
  }
  return active
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `npm test -- scroll-spy`
Expected: PASS (5 tests).

- [ ] **Step 5: Implementar el hook `src/hooks/use-scroll-spy.ts`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { getActiveSectionId, type SectionOffset } from './scroll-spy'

export function useScrollSpy(sectionIds: string[], offset: number = 80): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null)

  useEffect(() => {
    function handleScroll() {
      const sections: SectionOffset[] = sectionIds
        .map((id) => {
          const el = document.getElementById(id)
          return el ? { id, top: el.offsetTop } : null
        })
        .filter((s): s is SectionOffset => s !== null)

      setActiveId(getActiveSectionId(sections, window.scrollY, offset))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
```

- [ ] **Step 6: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add scroll-spy hook for navbar active section tracking"
```

---

## Task 8: Componentes blueprint atómicos — TechTag y SectionHeader

Componentes de presentación puros, sin lógica — se verifican con build + chequeo visual
rápido montándolos temporalmente (se integran de verdad recién en Task 17 en adelante).

**Files:**
- Create: `src/components/blueprint/tech-tag.tsx`
- Create: `src/components/blueprint/section-header.tsx`

**Interfaces:**
- Produces: `<TechTag>{children}</TechTag>`, `<SectionHeader title={string} count?={string} />`

- [ ] **Step 1: `src/components/blueprint/tech-tag.tsx`**

```tsx
import type { ReactNode } from 'react'

export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-stroke-soft px-2 py-1 font-mono text-[10.5px] tracking-wider text-fg-dim">
      {children}
    </span>
  )
}
```

- [ ] **Step 2: `src/components/blueprint/section-header.tsx`**

```tsx
export function SectionHeader({ title, count }: { title: string; count?: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">{title}</h2>
      <div className="h-px flex-1 bg-stroke-soft" />
      {count && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{count}</span>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add TechTag and SectionHeader blueprint primitives"
```

---

## Task 9: Componente blueprint — DrawingSheet

Contenedor con esquinas tipo plano técnico, usado por el Hero. Se llama `DrawingSheet` (no
`Sheet`) para no colisionar con el componente `Sheet` de shadcn que se usa para el menú mobile
(Task 15).

**Files:**
- Create: `src/components/blueprint/drawing-sheet.tsx`

**Interfaces:**
- Produces: `<DrawingSheet label?={string} meta?={string}>{children}</DrawingSheet>`

- [ ] **Step 1: `src/components/blueprint/drawing-sheet.tsx`**

```tsx
import type { ReactNode } from 'react'

type DrawingSheetProps = {
  children: ReactNode
  label?: string
  meta?: string
}

export function DrawingSheet({ children, label, meta }: DrawingSheetProps) {
  return (
    <div className="relative border border-stroke">
      <span className="pointer-events-none absolute left-[7px] top-[7px] h-3.5 w-3.5 border-l border-t border-stroke" />
      <span className="pointer-events-none absolute bottom-[7px] right-[7px] h-3.5 w-3.5 border-b border-r border-stroke" />
      <div className="m-[7px] border border-stroke-soft px-7 pt-7 pb-0">
        {(label || meta) && (
          <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            <span>{label}</span>
            <span>{meta}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add DrawingSheet blueprint primitive"
```

---

## Task 10: Componente blueprint — StatGauge

**Files:**
- Create: `src/components/blueprint/stat-gauge.tsx`

**Interfaces:**
- Produces: `<StatGauge value={string} label={string} />`

- [ ] **Step 1: `src/components/blueprint/stat-gauge.tsx`**

```tsx
export function StatGauge({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-stroke-soft p-6">
      <div className="font-display text-4xl font-bold text-brand">{value}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-fg-dim">{label}</div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add StatGauge blueprint primitive"
```

---

## Task 11: Componente blueprint — TimelineEntry

**Files:**
- Create: `src/components/blueprint/timeline-entry.tsx`

**Interfaces:**
- Consumes: `ExperienceEntry` de `@/content/experience` (Task 6), `TechTag` de Task 8
- Produces: `<TimelineEntry entry={ExperienceEntry} />`

- [ ] **Step 1: `src/components/blueprint/timeline-entry.tsx`**

```tsx
'use client'

import { motion } from 'motion/react'
import { TechTag } from './tech-tag'
import type { ExperienceEntry } from '@/content/experience'

export function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      className="relative mb-8 pl-2"
    >
      <span
        className={`absolute -left-[27px] top-[7px] h-[11px] w-[11px] rotate-45 border ${
          entry.current ? 'border-amber bg-amber' : 'border-stroke bg-background'
        }`}
      />
      <div className="border border-stroke-soft bg-card p-6">
        <div className="mb-1 flex flex-wrap items-baseline gap-2.5">
          <h3 className="font-display text-xl font-semibold">{entry.title}</h3>
          <span className="font-mono text-xs text-fg-faint">{entry.subtitle}</span>
          <span className="ml-auto font-mono text-[11px] tracking-wider text-amber">{entry.period}</span>
        </div>
        <div className="mb-3 font-mono text-[12.5px] tracking-wide text-brand">{entry.role}</div>
        <p className="mb-3.5 text-sm text-fg-dim">{entry.context}</p>
        <ul className="mb-4 grid gap-2">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-5 text-[14.5px]">
              <span className="absolute left-0 top-[0.72em] h-px w-2.5 bg-stroke" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
        {entry.links && entry.links.length > 0 && (
          <div className="mt-3.5 flex gap-2">
            {entry.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stroke-soft px-2.5 py-1 font-mono text-[11px] text-fg-dim transition-colors hover:border-brand hover:text-brand"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add TimelineEntry blueprint component"
```

---

## Task 12: Componente blueprint — CaseStudyCard

**Files:**
- Create: `src/components/blueprint/case-study-card.tsx`

**Interfaces:**
- Consumes: `CaseStudy` de `@/content/case-studies` (Task 6), `TechTag` de Task 8
- Produces: `<CaseStudyCard study={CaseStudy} index={number} />`

- [ ] **Step 1: `src/components/blueprint/case-study-card.tsx`**

```tsx
'use client'

import { motion } from 'motion/react'
import { TechTag } from './tech-tag'
import type { CaseStudy } from '@/content/case-studies'

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.2, 0.7, 0.3, 1] }}
      className="border border-stroke-soft bg-card p-6"
    >
      <h3 className="mb-2 font-display text-lg font-semibold">{study.title}</h3>
      <p className="mb-3 text-sm text-fg-dim">{study.problem}</p>
      <ul className="mb-4 grid gap-2">
        {study.bullets.map((bullet) => (
          <li key={bullet} className="relative pl-5 text-[14.5px]">
            <span className="absolute left-0 top-[0.72em] h-px w-2.5 bg-stroke" />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {study.tags.map((tag) => (
          <TechTag key={tag}>{tag}</TechTag>
        ))}
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add CaseStudyCard blueprint component"
```

---

## Task 13: Componente blueprint — ArchitectureDiagram

SVG del mockup adaptado, con el trazo de las líneas animándose al entrar en viewport.

**Files:**
- Create: `src/components/blueprint/architecture-diagram.tsx`

**Interfaces:**
- Produces: `<ArchitectureDiagram />` (sin props)

- [ ] **Step 1: `src/components/blueprint/architecture-diagram.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'motion/react'

export function ArchitectureDiagram() {
  const reduceMotion = useReducedMotion()

  const lineProps = {
    initial: reduceMotion ? undefined : { pathLength: 0 },
    whileInView: reduceMotion ? undefined : { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.4, ease: 'easeOut' as const },
  }

  return (
    <svg
      viewBox="0 0 760 250"
      role="img"
      aria-label="Diagrama de la arquitectura de integraciones entre el ERP y plataformas externas"
      className="mx-auto w-full max-w-[760px]"
    >
      <rect x="34" y="96" width="128" height="52" className="fill-card stroke-stroke" />
      <text x="98" y="118" textAnchor="middle" className="fill-fg-dim font-mono text-[10.5px]">
        Core ERP
      </text>
      <text x="98" y="134" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        SPRING BOOT
      </text>

      <motion.path d="M162 122 H244" className="stroke-stroke" strokeWidth={1} fill="none" {...lineProps} />

      <rect x="244" y="96" width="122" height="52" className="fill-card stroke-stroke" />
      <text x="305" y="118" textAnchor="middle" className="fill-fg-dim font-mono text-[10.5px]">
        Bus de eventos
      </text>
      <text x="305" y="134" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        RABBITMQ
      </text>

      <motion.path d="M366 122 H448" className="stroke-stroke" strokeWidth={1} fill="none" {...lineProps} />

      <rect x="448" y="80" width="128" height="84" className="fill-card stroke-brand" strokeWidth={1.25} />
      <text x="512" y="106" textAnchor="middle" className="fill-brand font-mono text-[10.5px]">
        Integraciones
      </text>
      <text x="512" y="122" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        NESTJS
      </text>
      <text x="512" y="144" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        1 MÓDULO / PROVEEDOR
      </text>

      <motion.path d="M576 100 H620 V44 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />
      <motion.path d="M576 114 H640 V96 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />
      <motion.path d="M576 130 H640 V148 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />
      <motion.path d="M576 144 H620 V200 H672" className="stroke-brand" strokeWidth={1.25} fill="none" {...lineProps} />

      <text x="678" y="48" className="fill-fg-dim font-mono text-[10.5px]">Couriers</text>
      <text x="678" y="100" className="fill-fg-dim font-mono text-[10.5px]">Marketplaces</text>
      <text x="678" y="152" className="fill-fg-dim font-mono text-[10.5px]">Pagos</text>
      <text x="678" y="204" className="fill-fg-dim font-mono text-[10.5px]">SUNAT</text>

      <path d="M512 164 V206" strokeDasharray="3 4" className="stroke-stroke" strokeWidth={1} fill="none" />
      <text x="512" y="222" textAnchor="middle" className="fill-fg-faint font-mono text-[9.5px] tracking-wider">
        WEBHOOKS ENTRANTES
      </text>
    </svg>
  )
}
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add ArchitectureDiagram blueprint component"
```

---

## Task 14: ThemeToggle y LanguageToggle

**Files:**
- Create: `src/components/layout/theme-toggle.tsx`
- Create: `src/components/layout/language-toggle.tsx`

**Interfaces:**
- Consumes: `useTheme` de `next-themes`, `useLanguage` de `@/context/language-context` (Task 5)
- Produces: `<ThemeToggle />`, `<LanguageToggle />`

- [ ] **Step 1: `src/components/layout/theme-toggle.tsx`**

```tsx
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
```

- [ ] **Step 2: `src/components/layout/language-toggle.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="border border-stroke-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-dim transition-colors hover:border-brand hover:text-brand"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
```

- [ ] **Step 3: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add ThemeToggle and LanguageToggle components"
```

---

## Task 15: Navbar

Sticky, con scroll-spy, menú mobile con el `Sheet` de shadcn, toggles y botón de CV.

**Files:**
- Create: `src/components/layout/navbar.tsx`

**Interfaces:**
- Consumes: `useLanguage` (Task 5), `useScrollSpy` (Task 7), `heroContent`/`socialLinks`
  (Task 6), `ThemeToggle`/`LanguageToggle` (Task 14), `Sheet`/`SheetTrigger`/`SheetContent`/
  `SheetTitle` de `@/components/ui/sheet` (Task 2)
- Produces: `<Navbar />`

- [ ] **Step 1: `src/components/layout/navbar.tsx`**

```tsx
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
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add sticky Navbar with scroll-spy and mobile menu"
```

---

## Task 16: Footer

**Files:**
- Create: `src/components/layout/footer.tsx`

**Interfaces:**
- Consumes: `useLanguage` (Task 5)
- Produces: `<Footer />`

- [ ] **Step 1: `src/components/layout/footer.tsx`**

```tsx
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
```

- [ ] **Step 2: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add Footer component"
```

---

## Task 17: HeroSection y primera versión de `src/app/page.tsx`

Primera sección real, y primera vez que se arma `page.tsx` con contenido de verdad (reemplaza
la página default de Next.js del scaffold).

**Files:**
- Create: `src/components/sections/hero-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `useLanguage` (Task 5), `heroContent`/`socialLinks` (Task 6), `DrawingSheet`
  (Task 9), `ArchitectureDiagram` (Task 13), `Navbar` (Task 15), `Footer` (Task 16)
- Produces: `<HeroSection />`, `src/app/page.tsx` renderizando `Navbar` + `HeroSection` + `Footer`

- [ ] **Step 1: `src/components/sections/hero-section.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'
import { heroContent, socialLinks } from '@/content/hero'
import { DrawingSheet } from '@/components/blueprint/drawing-sheet'
import { ArchitectureDiagram } from '@/components/blueprint/architecture-diagram'

export function HeroSection() {
  const { language } = useLanguage()
  const content = heroContent[language]
  const cvHref = language === 'es' ? socialLinks.cvEs : socialLinks.cvEn

  return (
    <section id="hero" className="mx-auto max-w-[1080px] px-7 pt-10">
      <DrawingSheet
        label={language === 'es' ? 'Arquitectura de integraciones' : 'Integrations architecture'}
        meta="Rev. 2026"
      >
        <ArchitectureDiagram />

        <div className="mt-5 grid grid-cols-1 border-t border-stroke md:grid-cols-[1fr_auto]">
          <div className="border-stroke-soft py-5 md:border-r md:pr-6">
            <h1 className="font-display text-[clamp(38px,6.5vw,62px)] font-bold uppercase leading-[0.95] tracking-tight">
              {content.name}
            </h1>
            <div className="mt-1.5 font-display text-lg font-medium uppercase tracking-[0.18em] text-brand">
              {content.role}
            </div>
            <p className="mt-3.5 max-w-[44ch] text-[14.5px] text-fg-dim">{content.tagline}</p>
          </div>
          <div className="grid grid-rows-4">
            <div className="border-b border-stroke-soft px-5 py-2.5">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">
                {language === 'es' ? 'Ubicación' : 'Location'}
              </span>
              <strong className="font-mono text-[13.5px] font-medium">{content.location}</strong>
            </div>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="border-b border-stroke-soft px-5 py-2.5">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">GitHub</span>
              <strong className="font-mono text-[13.5px] font-medium underline decoration-stroke underline-offset-2 hover:text-brand hover:decoration-brand">
                OctavioToledo
              </strong>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-stroke-soft px-5 py-2.5">
              <span className="block font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">LinkedIn</span>
              <strong className="font-mono text-[13.5px] font-medium underline decoration-stroke underline-offset-2 hover:text-brand hover:decoration-brand">
                octaviotoledo
              </strong>
            </a>
            <div className="flex items-center px-5 py-2.5">
              <a
                href={cvHref}
                download
                className="inline-flex items-center gap-1.5 bg-brand px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:opacity-90"
              >
                {content.cvLabel}
              </a>
            </div>
          </div>
        </div>
      </DrawingSheet>
    </section>
  )
}
```

- [ ] **Step 2: Reescribir `src/app/page.tsx`**

```tsx
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verificar visualmente**

Run: `npm run build` (Expected: exit code 0), luego `npm run dev` y abrir
`http://localhost:3000`. Confirmar: fondo oscuro con grilla, el "cartucho" del hero con
esquinas en L, el diagrama SVG dibujándose al cargar, nombre en mayúsculas grande, tagline,
tabla de ubicación/GitHub/LinkedIn/CV a la derecha (o abajo en mobile), navbar sticky arriba,
footer abajo. Probar el toggle ES/EN y el toggle de tema. Detener el servidor.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add HeroSection and compose initial page.tsx"
```

---

## Task 18: HowIWorkSection

**Files:**
- Create: `src/components/sections/how-i-work-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `howIWorkContent` (Task 6), `SectionHeader`/`StatGauge` (Tasks 8, 10)
- Produces: `<HowIWorkSection />`, montada en `page.tsx` después de `HeroSection`

- [ ] **Step 1: `src/components/sections/how-i-work-section.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'
import { howIWorkContent } from '@/content/how-i-work'
import { SectionHeader } from '@/components/blueprint/section-header'
import { StatGauge } from '@/components/blueprint/stat-gauge'

export function HowIWorkSection() {
  const { language } = useLanguage()
  const content = howIWorkContent[language]

  return (
    <section id="como-trabajo" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={content.sectionTitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {content.stats.map((stat) => (
          <StatGauge key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {content.pillars.map((pillar) => (
          <div key={pillar.title} className="border border-stroke-soft p-6 text-[14.5px] text-fg-dim">
            {pillar.title}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar `import { HowIWorkSection } from '@/components/sections/how-i-work-section'` y
`<HowIWorkSection />` inmediatamente después de `<HeroSection />` dentro de `<main>`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000#como-trabajo`. Confirmar 2 `StatGauge` (años
e integraciones) y 2 tarjetas de pilares debajo, en ambos idiomas. Detener el servidor.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add HowIWorkSection"
```

---

## Task 19: ExperienceSection

**Files:**
- Create: `src/components/sections/experience-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `experienceEntries` (Task 6), `SectionHeader` (Task 8), `TimelineEntry` (Task 11)
- Produces: `<ExperienceSection />`, montada después de `HowIWorkSection`

- [ ] **Step 1: `src/components/sections/experience-section.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'
import { experienceEntries } from '@/content/experience'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TimelineEntry } from '@/components/blueprint/timeline-entry'

const TITLES = { es: 'Experiencia profesional', en: 'Professional experience' }

function formatCount(language: 'es' | 'en', n: number) {
  const padded = String(n).padStart(2, '0')
  return language === 'es' ? `${padded} registros` : `${padded} records`
}

export function ExperienceSection() {
  const { language } = useLanguage()
  const entries = experienceEntries[language]

  return (
    <section id="experiencia" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} count={formatCount(language, entries.length)} />
      <div className="relative pl-[34px]">
        <div className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-stroke-soft" />
        {entries.map((entry) => (
          <TimelineEntry key={entry.title + entry.period} entry={entry} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar el import y `<ExperienceSection />` después de `<HowIWorkSection />`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000#experiencia`. Confirmar la línea vertical del
timeline, los 3 marcadores en diamante (los dos "actuales" en ámbar, el de tutorías sin
color), y que cada card muestra highlights, tags y (solo la primera) los links de Sistema/Landing.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add ExperienceSection"
```

---

## Task 20: CaseStudiesSection

**Files:**
- Create: `src/components/sections/case-studies-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `caseStudies` (Task 6), `SectionHeader` (Task 8), `CaseStudyCard` (Task 12)
- Produces: `<CaseStudiesSection />`, montada después de `ExperienceSection`

- [ ] **Step 1: `src/components/sections/case-studies-section.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'
import { caseStudies } from '@/content/case-studies'
import { SectionHeader } from '@/components/blueprint/section-header'
import { CaseStudyCard } from '@/components/blueprint/case-study-card'

const TITLES = { es: 'Casos técnicos', en: 'Technical case studies' }

export function CaseStudiesSection() {
  const { language } = useLanguage()
  const studies = caseStudies[language]

  return (
    <section id="casos-tecnicos" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-4 md:grid-cols-2">
        {studies.map((study, index) => (
          <CaseStudyCard key={study.title} study={study} index={index} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar el import y `<CaseStudiesSection />` después de `<ExperienceSection />`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000#casos-tecnicos`. Confirmar 5 tarjetas en
grilla de 2 columnas (1 en mobile), cada una con título, problema, bullets y tags.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add CaseStudiesSection"
```

---

## Task 21: ProjectsSection

**Files:**
- Create: `src/components/sections/projects-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `projectsContent` (Task 6), `SectionHeader` (Task 8), `TechTag` (Task 8)
- Produces: `<ProjectsSection />`, montada después de `CaseStudiesSection`

- [ ] **Step 1: `src/components/sections/projects-section.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'
import { projectsContent } from '@/content/projects'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TechTag } from '@/components/blueprint/tech-tag'

const TITLES = { es: 'Proyectos', en: 'Projects' }
const LIVE_LABEL = { es: 'Ver en vivo', en: 'View live' }

export function ProjectsSection() {
  const { language } = useLanguage()
  const projects = projectsContent[language]

  return (
    <section id="proyectos" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-4">
        {projects.map((project) => (
          <article key={project.name} className="border border-stroke-soft bg-card p-6">
            <div className="mb-1 flex flex-wrap items-baseline gap-2.5">
              <h3 className="font-display text-xl font-semibold">{project.name}</h3>
              <span className="font-mono text-xs text-fg-faint">{project.label}</span>
            </div>
            <p className="mb-3.5 text-sm text-fg-dim">{project.description}</p>
            <ul className="mb-4 grid gap-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="relative pl-5 text-[14.5px]">
                  <span className="absolute left-0 top-[0.72em] h-px w-2.5 bg-stroke" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-stroke-soft px-2.5 py-1 font-mono text-[11px] text-fg-dim transition-colors hover:border-brand hover:text-brand"
              >
                {LIVE_LABEL[language]} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar el import y `<ProjectsSection />` después de `<CaseStudiesSection />`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000#proyectos`. Confirmar la card de OMTime con
descripción, highlights, tags y el link "Ver en vivo".

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add ProjectsSection"
```

---

## Task 22: SkillsSection

**Files:**
- Create: `src/components/sections/skills-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `skillCategories` (Task 6), `SectionHeader`/`TechTag` (Task 8)
- Produces: `<SkillsSection />`, montada después de `ProjectsSection`

- [ ] **Step 1: `src/components/sections/skills-section.tsx`**

```tsx
'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/context/language-context'
import { skillCategories } from '@/content/skills'
import { SectionHeader } from '@/components/blueprint/section-header'
import { TechTag } from '@/components/blueprint/tech-tag'

const TITLES = { es: 'Skills', en: 'Skills' }

export function SkillsSection() {
  const { language } = useLanguage()
  const categories = skillCategories[language]

  return (
    <section id="skills" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-faint">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <TechTag key={item}>{item}</TechTag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar el import y `<SkillsSection />` después de `<ProjectsSection />`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000#skills`. Confirmar 5 categorías con sus tags,
sin ningún número ni barra de progreso.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add SkillsSection"
```

---

## Task 23: QuickFactsSection

**Files:**
- Create: `src/components/sections/quick-facts-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `quickFactsContent` (Task 6), `SectionHeader` (Task 8), `Link` de `next/link`
- Produces: `<QuickFactsSection />`, montada después de `SkillsSection`. CTA navega a
  `/sobre-mi` (la ruta se crea recién en Task 28 — hasta entonces el link da 404, es esperado).

- [ ] **Step 1: `src/components/sections/quick-facts-section.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { quickFactsContent } from '@/content/quick-facts'
import { SectionHeader } from '@/components/blueprint/section-header'

const TITLES = { es: 'Resumen rápido', en: 'Quick summary' }

export function QuickFactsSection() {
  const { language } = useLanguage()
  const content = quickFactsContent[language]

  return (
    <section id="resumen" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={TITLES[language]} />
      <div className="border border-stroke-soft">
        {content.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1 border-b border-stroke-soft p-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="w-48 shrink-0 font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              {fact.label}
            </span>
            <span className="text-sm">{fact.value}</span>
          </div>
        ))}
      </div>
      <Link
        href="/sobre-mi"
        className="mt-5 inline-block border border-stroke-soft px-4 py-2 font-mono text-xs uppercase tracking-wider text-fg-dim transition-colors hover:border-brand hover:text-brand"
      >
        {content.ctaLabel}
      </Link>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar el import y `<QuickFactsSection />` después de `<SkillsSection />`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000#resumen`. Confirmar la tabla de datos y el
botón "Conóceme mejor →" (da 404 hasta Task 28, es esperado).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add QuickFactsSection"
```

---

## Task 24: Esquema de validación y ContactForm (EmailJS)

**Files:**
- Create: `src/lib/contact-schema.ts`
- Create: `src/lib/contact-schema.test.ts`
- Create: `src/components/contact-form.tsx`
- Create: `.env.local.example`

**Interfaces:**
- Produces: `contactSchema` (zod), `ContactFormValues` type, `<ContactForm />`
- Consumes: `contactContent` (Task 6), shadcn `Button`/`Input`/`Textarea`/`Form*` (Task 2),
  `toast` de `sonner`

- [ ] **Step 1: Escribir el test del schema (falla primero)**

`src/lib/contact-schema.test.ts`:

```typescript
import { describe, expect, it } from 'vitest'
import { contactSchema } from './contact-schema'

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello, I would like to get in touch about a role.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'not-an-email',
      message: 'Hello, I would like to get in touch about a role.',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a message that is too short', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hi',
    })
    expect(result.success).toBe(false)
  })

  it('rejects an empty name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'jane@example.com',
      message: 'Hello, I would like to get in touch about a role.',
    })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `npm test -- contact-schema`
Expected: FAIL — `contact-schema.ts` no existe.

- [ ] **Step 3: Implementar `src/lib/contact-schema.ts`**

```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
})

export type ContactFormValues = z.infer<typeof contactSchema>
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `npm test -- contact-schema`
Expected: PASS (4 tests).

- [ ] **Step 5: Crear `.env.local.example`**

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

- [ ] **Step 6: Implementar `src/components/contact-form.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { useLanguage } from '@/context/language-context'
import { contactContent } from '@/content/contact'
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export function ContactForm() {
  const { language } = useLanguage()
  const content = contactContent[language]
  const [honeypot, setHoneypot] = useState('')

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  async function onSubmit(values: ContactFormValues) {
    if (honeypot) return

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: values.name, from_email: values.email, message: values.message },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      )
      toast.success(content.formSuccessMessage)
      form.reset()
    } catch {
      toast.error(content.formErrorMessage)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.formNameLabel}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.formEmailLabel}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.formMessageLabel}</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting} className="bg-brand text-primary-foreground hover:opacity-90">
          {content.formSubmitLabel}
        </Button>
      </form>
    </Form>
  )
}
```

- [ ] **Step 7: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add contact form validation schema and ContactForm with EmailJS"
```

> Nota: el envío real de EmailJS solo funciona una vez que `.env.local` tenga las 3
> credenciales reales (spec §14, assets pendientes del usuario). Sin ellas, el formulario
> muestra el toast de error al enviar — es el comportamiento esperado hasta que se carguen
> las credenciales.

---

## Task 25: ContactSection

**Files:**
- Create: `src/components/sections/contact-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `contactContent`/`socialLinks` (Task 6), `SectionHeader` (Task 8), `ContactForm`
  (Task 24)
- Produces: `<ContactSection />`, montada después de `QuickFactsSection`

- [ ] **Step 1: `src/components/sections/contact-section.tsx`**

```tsx
'use client'

import { useLanguage } from '@/context/language-context'
import { contactContent } from '@/content/contact'
import { socialLinks } from '@/content/hero'
import { SectionHeader } from '@/components/blueprint/section-header'
import { ContactForm } from '@/components/contact-form'

export function ContactSection() {
  const { language } = useLanguage()
  const content = contactContent[language]

  return (
    <section id="contacto" className="mx-auto max-w-[1080px] px-7 py-16">
      <SectionHeader title={content.sectionTitle} />
      <p className="mb-8 max-w-[60ch] text-[14.5px] text-fg-dim">{content.intro}</p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-4 self-start border border-stroke-soft p-6">
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
              {content.emailLabel}
            </span>
            <a href={`mailto:${socialLinks.email}`} className="text-sm hover:text-brand">
              {socialLinks.email}
            </a>
          </div>
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
              {content.locationLabel}
            </span>
            <span className="text-sm">{content.locationValue}</span>
          </div>
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">GitHub</span>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand">
              github.com/OctavioToledo
            </a>
          </div>
          <div>
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">LinkedIn</span>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand">
              linkedin.com/in/octaviotoledo
            </a>
          </div>
        </div>
        <div className="border border-stroke-soft p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Montar en `src/app/page.tsx`**

Agregar el import y `<ContactSection />` después de `<QuickFactsSection />`, dentro de `<main>`.
En este punto `page.tsx` renderiza las 9 secciones completas en orden dentro de `<main>`,
envueltas por `<Navbar />` y `<Footer />`.

- [ ] **Step 3: Verificar visualmente end-to-end**

Run: `npm run dev`, abrir `http://localhost:3000`. Recorrer la página completa de punta a
punta: navbar con scroll-spy resaltando la sección visible, las 9 secciones en orden, toggle
ES/EN y de tema funcionando en toda la página, formulario de contacto visible con sus 3 campos
y botón. Probar completar y enviar el formulario (fallará con el toast de error hasta que
existan credenciales reales de EmailJS — confirmar que el toast de error aparece, no que
crashee).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add ContactSection — home page now has all 9 sections"
```

---

## Task 26: Página `/sobre-mi` (About extendido)

La página necesita `metadata` estática (requiere Server Component) pero el contenido depende
de `useLanguage()` (Client Component) — se separa en un `page.tsx` server-only que renderiza
un componente cliente con el contenido real.

**Files:**
- Create: `src/components/about-page-content.tsx`
- Create: `src/app/sobre-mi/page.tsx`

**Interfaces:**
- Consumes: `aboutContent` (Task 6), `Navbar`/`Footer` (Tasks 15-16)
- Produces: ruta `/sobre-mi` con metadata propia

- [ ] **Step 1: `src/components/about-page-content.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { aboutContent } from '@/content/about'

export function AboutPageContent() {
  const { language } = useLanguage()
  const content = aboutContent[language]

  return (
    <main className="mx-auto max-w-[720px] px-7 py-16">
      <Link
        href="/"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-fg-dim hover:text-brand"
      >
        {content.backLabel}
      </Link>
      <h1 className="mb-8 font-display text-2xl font-semibold uppercase tracking-wide">
        {content.headline}
      </h1>
      <div className="grid gap-4 text-[15px] leading-relaxed text-fg-dim">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10 grid gap-4">
        {content.techGroups.map((group) => (
          <div key={group.label}>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-faint">
              {group.label}
            </span>
            <p className="text-sm">{group.items.join(', ')}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-[15px] leading-relaxed text-fg-dim">{content.closing}</p>
    </main>
  )
}
```

- [ ] **Step 2: `src/app/sobre-mi/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AboutPageContent } from '@/components/about-page-content'

export const metadata: Metadata = {
  title: 'Sobre mí — Octavio Toledo',
  description:
    'Software Engineer especializado en backend con Java y Spring, integraciones de ERP y desarrollo asistido por IA.',
}

export default function SobreMiPage() {
  return (
    <>
      <Navbar />
      <AboutPageContent />
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000/sobre-mi`. Confirmar el texto completo, el
link "← Volver al inicio", y que clickear un link del navbar (ej. "Experiencia") navega a
`/#experiencia` en el home. Probar ES/EN.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add /sobre-mi extended About page"
```

---

## Task 27: SEO y Open Graph

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/opengraph-image.tsx`

**Interfaces:**
- Produces: `metadata` en el layout raíz, imagen OG generada servida en `/opengraph-image`

- [ ] **Step 1: Agregar `metadata` a `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Octavio Toledo — Software Engineer',
  description:
    'Backend e integraciones para plataformas ERP. Java, Spring Boot, NestJS y arquitectura orientada a eventos.',
  metadataBase: new URL('https://octavio-toledo-portfolio.vercel.app'),
}
```

> Reemplazar `metadataBase` por el dominio real una vez que el proyecto esté deployado en
> Vercel (o tenga dominio propio) — mientras tanto no rompe el build, solo afecta cómo se
> resuelven URLs relativas de OG/Twitter cards.

- [ ] **Step 2: `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Octavio Toledo — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0C1119',
          backgroundImage:
            'linear-gradient(#18222F 1px, transparent 1px), linear-gradient(90deg, #18222F 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          color: '#E3E9F1',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#59A8D6' }}>
          Software Engineer
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1, marginTop: 16 }}>
          Octavio Toledo
        </div>
        <div style={{ fontSize: 28, color: '#8D9BAE', marginTop: 24, maxWidth: 900 }}>
          Backend e integraciones para plataformas ERP. Java, Spring Boot, NestJS y arquitectura orientada a eventos.
        </div>
      </div>
    ),
    { ...size }
  )
}
```

> Usa una fuente sans-serif genérica en vez de IBM Plex: `next/og` requiere cargar fuentes
> como buffers de archivo explícitamente, y agregar eso ahora es complejidad extra sin
> beneficio claro para una imagen que solo se ve como miniatura en previews de link. Se puede
> refinar después si se quiere pixel-perfect.

- [ ] **Step 3: Verificar la imagen generada**

Run: `npm run dev`, abrir `http://localhost:3000/opengraph-image` directamente. Expected: se
ve una imagen PNG de 1200x630 con fondo oscuro, grilla, "Octavio Toledo" y la tagline.

- [ ] **Step 4: Verificar build y commit**

Run: `npm run build`
Expected: exit code 0.

```bash
git add -A
git commit -m "Add SEO metadata and Open Graph image"
```

---

## Task 28: QA final

Pase de verificación de todo el sitio junto, más un inventario claro de lo que falta para que
esté 100% funcional en producción (spec §14).

**Files:** ninguno nuevo — solo verificación.

- [ ] **Step 1: Build, lint y tests completos**

```bash
npm run build
npm run lint
npm test
```

Expected: los tres comandos terminan con exit code 0.

- [ ] **Step 2: QA responsive manual**

Run: `npm run dev`, abrir `http://localhost:3000`. Con las devtools del navegador, probar en
3 anchos: mobile (~375px), tablet (~768px), desktop (~1280px). Confirmar en cada uno:
- El navbar colapsa a menú hamburguesa (`Sheet`) por debajo de `md` y el menú abre/cierra bien.
- El bloque del Hero (`titleblock`) pasa de 2 columnas a apilado en mobile.
- Las grillas de Casos técnicos, Skills y Stats pasan de 2 columnas a 1 en mobile.
- No hay scroll horizontal en ningún ancho.

- [ ] **Step 3: QA de tema e idioma**

En la misma sesión de `npm run dev`, alternar tema (claro/oscuro) y idioma (ES/EN) desde el
navbar y confirmar que **todas** las 9 secciones + `/sobre-mi` reflejan el cambio sin recargar
la página, y que el idioma/tema persisten al recargar (`localStorage`).

- [ ] **Step 4: Detener el servidor y hacer commit final si hubo ajustes**

Si el paso 2 o 3 encontró algún bug visual, corregirlo en el componente correspondiente,
volver a correr `npm run build`, y commitear la corrección con un mensaje descriptivo del fix
puntual (no un commit genérico de "QA fixes").

- [ ] **Step 5: Dejar registrado el checklist de pendientes de producción**

Esto no es código — es confirmar en la conversación con el usuario, contra la spec §14, qué
falta antes de deployar a Vercel:

1. `public/cv/cv-octavio-toledo-dev-es.pdf` y `-en.pdf` (sin esto, el botón "Descargar CV" da 404)
2. Credenciales reales en `.env.local` (`NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
   `_TEMPLATE_ID`, `_PUBLIC_KEY`) — configurarlas también como variables de entorno en el
   proyecto de Vercel, no solo local (sin esto, el formulario de contacto muestra el toast de
   error)
3. `metadataBase` en `src/app/layout.tsx` (Task 27) — actualizar con el dominio real una vez
   asignado en Vercel
4. **Nota:** la spec §14 menciona una foto de perfil como asset pendiente, pero el diseño
   final (fiel al `mockup.html`) no usa ninguna foto en ningún lugar del sitio — es
   íntegramente tipografía + diagrama SVG. Confirmar con el usuario si de verdad la quiere en
   algún lado (ej. en `/sobre-mi`) o si se descarta ese ítem de la spec.
5. Traducciones EN de Experiencia/Casos técnicos/Proyectos/About (spec §15) — son borrador,
   pendientes de revisión final por el usuario antes de publicar.

No hay commit para este step — es un resumen a comunicar, no un cambio de código.

---

## Self-Review

**Cobertura de la spec:**
- §2 decisiones de alcance → Tasks 1 (Next.js), 24 (EmailJS), 6/22 (skills sin barras), 20
  (casos técnicos sección propia), 21 (proyectos solo OMTime), sin sección FAQ en ningún task,
  27 (SEO en alcance). Cubierto.
- §3 stack técnico → Tasks 1-3. Cubierto.
- §4 arquitectura de información → orden de secciones en Tasks 17-25 coincide con la spec.
  Cubierto.
- §5 sistema visual → Task 4 (tokens + gotcha dark mode), Tasks 8-13 (componentes blueprint).
  Cubierto.
- §6 i18n → Task 5 (`Localized<T>`, `LanguageContext`). Cubierto.
- §7 estructura de carpetas → refleja 1:1 en los `Files:` de cada task. Cubierto.
- §8 contenido por sección → Task 6 (todo el copy) + secciones correspondientes. Cubierto.
- §9 formulario de contacto → Task 24. Cubierto (honeypot incluido).
- §10 animaciones → `motion` en Tasks 11, 12, 13, 22. Cubierto.
- §11 testing → Vitest solo en lógica pura (Tasks 5, 7, 24); resto es build+lint+QA manual
  (Task 28). Cubierto, consistente con "sin suite de tests E2E/componentes".
- §12 SEO/OG → Task 27. Cubierto.
- §13 fuera de alcance → ningún task crea backend, CMS, rutas por idioma, blog, analytics, ni
  tests E2E. Cubierto por omisión intencional.
- §14 assets pendientes → listados explícitamente en Task 28 Step 5, no se inventan valores.
  Cubierto.

**Placeholder scan:** no quedan "TBD"/"TODO" en ningún paso. Los dos valores marcados
explícitamente como pendientes de dato real del usuario (`metadataBase` en Task 27,
credenciales de EmailJS en Task 24) tienen código funcional con un valor de relleno válido y
una nota explícita de qué reemplazar y por qué — no bloquean build ni ejecución.

**Consistencia de tipos:** `Localized<T>` (Task 5) se usa igual en los 9 archivos de Task 6.
`ExperienceEntry`, `CaseStudy`, `Project`, `SkillCategory`, `QuickFact`/`QuickFactsContent`,
`AboutContent`, `ContactContent` se definen una sola vez en Task 6 y se importan por tipo (no
redefinidos) en los componentes de Tasks 11, 12, 15, 17-26. `getActiveSectionId` (Task 7) se
usa con la misma firma en `use-scroll-spy.ts` y en su test. `contactSchema`/`ContactFormValues`
(Task 24) se usan con nombres consistentes en el test y en `ContactForm`.

---

## Execution Handoff

Plan completo y guardado en `docs/superpowers/plans/2026-08-13-portfolio.md`. Dos opciones de
ejecución:

**1. Subagent-Driven (recomendado)** — despliego un subagente nuevo por task, con revisión
entre tasks, iteración rápida.

**2. Ejecución inline** — ejecuto las tasks en esta misma sesión con `executing-plans`,
por lotes con checkpoints para que revises.

¿Cuál preferís?
