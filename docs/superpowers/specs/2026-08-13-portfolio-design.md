# Portfolio de Octavio Toledo — Diseño

**Fecha:** 2026-08-13
**Estado:** Aprobado para implementación

## 1. Objetivo

Reemplazar el portfolio anterior (`MyPortfolio`, Vite + GitHub Pages) por un sitio nuevo en
Next.js orientado a búsqueda activa de trabajo (full-time o freelance, backend Java / full
stack). El estilo visual sigue la dirección "blueprint técnico" definida en `mockup.html`
(raíz del repo), no el estilo del portfolio anterior. El contenido factual (experiencia,
links, stack) sale de `PORTFOLIO_CONTEXT.md` (raíz del repo), que ya está verificado contra
el CV real del usuario.

Ambos archivos de referencia (`mockup.html`, `PORTFOLIO_CONTEXT.md`) quedan en la raíz del
repo como material de consulta; no se copian dentro de `src/`.

## 2. Decisiones de alcance confirmadas

| Decisión | Elegido |
|---|---|
| Idioma | Bilingüe ES/EN, toggle en navbar, sin rutas duplicadas por idioma |
| About extendido | Página separada `/sobre-mi` (la URL no cambia con el idioma) |
| Formulario de contacto | EmailJS, 100% client-side, sin API routes ni backend propio |
| Deploy | Vercel, un solo proyecto (frontend puro) |
| Skills | Una sola sección (se unificó "barras animadas" + "stack de tecnologías") |
| Proyectos vs. Experiencia | Powip/Aranni aparece solo en Experiencia. Proyectos muestra OMTime y el sistema de gimnasio |

## 3. Stack técnico

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** — versión y sintaxis exacta de instalación a confirmar con context7 al scaffoldear (v4 cambia la configuración basada en CSS `@theme` respecto a v3)
- **shadcn/ui** — Button, Card, Accordion, Badge, Sheet (nav mobile), Form, Input, Textarea, Sonner (toasts). Se instala cada componente cuando se necesita, no todos de entrada
- **`motion`** (ex Framer Motion) — scroll-reveals, barras de skill animadas, entrada del timeline, dibujo del diagrama SVG
- **`@emailjs/browser`** — envío del formulario de contacto
- **`next-themes`** — toggle dark/light, configurado con `attribute="data-theme"` para calzar con el mockup (no la clase `.dark` default de shadcn)
- **`next/font/google`** — IBM Plex Mono, IBM Plex Sans, IBM Plex Sans Condensed
- **`lucide-react`** — iconos (viene con shadcn)
- **`react-hook-form` + `zod`** — validación del formulario de contacto (patrón estándar del `Form` de shadcn)
- Gestor de paquetes: npm

## 4. Arquitectura de información

### Home (`/`) — secciones en orden, cada una con `id` para anclas del navbar

1. **Navbar** (`#top`) — sticky. Links a cada sección, toggle ES/EN, toggle tema, botón "Descargar CV"
2. **Hero** (`#hero`)
3. **Por qué contratarme** (`#por-que-contratarme`)
4. **Experiencia profesional** (`#experiencia`)
5. **Proyectos** (`#proyectos`)
6. **Skills** (`#skills`)
7. **Resumen rápido** (`#resumen`) — incluye CTA a `/sobre-mi`
8. **FAQ** (`#faq`)
9. **Contacto** (`#contacto`)
10. **Footer**

### Página separada

- **`/sobre-mi`** — About extendido, con link de vuelta al home

## 5. Sistema visual (blueprint)

Tokens tomados literalmente de `mockup.html`, mapeados a las variables que shadcn espera:

| Token mockup | Uso | Variable shadcn equivalente |
|---|---|---|
| `--ink` (`#0C1119` / `#EDF1F6` light) | Fondo general | `--background` |
| `--fg` / `--fg-dim` / `--fg-faint` | Texto primario/secundario/terciario | `--foreground` + variantes |
| `--accent` (`#59A8D6` azul acero) | Acento primario, links, hover | `--primary` |
| `--amber` (`#D9A147`) | Marcador "actualidad", highlights secundarios | `--secondary` / color custom `--amber` |
| `--stroke` / `--stroke-soft` | Bordes duros/suaves | `--border` |
| `--surface` | Fondo de cards | `--card` |
| `--font-display` (IBM Plex Sans Condensed) | Títulos, uppercase | clase utilitaria `font-display` |
| `--font-mono` (IBM Plex Mono) | Labels, tags, meta info | clase utilitaria `font-mono` |
| `--font-body` (IBM Plex Sans) | Texto de párrafo | default `font-sans` |

Fondo de grilla (`background-image` de líneas cada 32px) se replica global en `body` vía CSS,
no como componente.

Componentes de presentación custom en `components/blueprint/` (no son shadcn, son propios de
esta identidad visual):

- `Sheet` — contenedor con esquinas tipo plano técnico (`::before/::after` en L), usado en Hero
- `SectionHeader` — título uppercase + regla horizontal + contador mono (ej. "03 registros")
- `StatGauge` — número grande + label, para "Por qué contratarme"
- `SkillBar` — barra de progreso animada con label mono
- `TimelineEntry` — card de experiencia con marcador en diamante (ámbar si `current: true`)
- `TechTag` — pill mono con borde, para stacks tecnológicos
- `ArchitectureDiagram` — el SVG del mockup, adaptado como componente reutilizable (se usa en el Hero como elemento decorativo)

## 6. Arquitectura de contenido e i18n

- `LanguageContext` (`context/language-context.tsx`): `language: 'es' | 'en'`, `setLanguage`,
  persistido en `localStorage`, default `'es'`
- Un solo árbol de rutas — `/sobre-mi` no cambia de URL según idioma
- Cada archivo en `content/` exporta un objeto con la forma `{ es: T; en: T }`, tipado para que
  TypeScript obligue paridad de claves entre ambos idiomas:

```ts
// content/types.ts
export type Localized<T> = { es: T; en: T };
```

- Archivos de contenido: `hero.ts`, `stats.ts`, `experience.ts`, `projects.ts`, `skills.ts`,
  `quick-facts.ts`, `faq.ts`, `about.ts`, `contact.ts`

## 7. Estructura de carpetas

```
src/
  app/
    layout.tsx              # fonts, ThemeProvider, LanguageProvider
    page.tsx                # home: compone todas las secciones
    globals.css             # tokens blueprint + tailwind @theme
    sobre-mi/
      page.tsx
  components/
    layout/
      navbar.tsx
      footer.tsx
      theme-toggle.tsx
      language-toggle.tsx
    sections/
      hero-section.tsx
      why-hire-me-section.tsx
      experience-section.tsx
      projects-section.tsx
      skills-section.tsx
      quick-facts-section.tsx
      faq-section.tsx
      contact-section.tsx
    blueprint/
      sheet.tsx
      section-header.tsx
      stat-gauge.tsx
      skill-bar.tsx
      timeline-entry.tsx
      tech-tag.tsx
      architecture-diagram.tsx
    ui/                      # shadcn (generado por CLI)
    contact-form.tsx
  content/
    types.ts
    hero.ts
    stats.ts
    experience.ts
    projects.ts
    skills.ts
    quick-facts.ts
    faq.ts
    about.ts
    contact.ts
  context/
    language-context.tsx
  hooks/
    use-scroll-spy.ts        # resalta el link activo del navbar según la sección visible
  lib/
    utils.ts                 # cn() de shadcn
public/
  cv/
    cv-octavio-toledo-dev-es.pdf
    cv-octavio-toledo-dev-en.pdf
  images/
    profile.png
    projects/                # screenshots omtime, powip, gimnasio
components.json               # config shadcn
next.config.ts
tsconfig.json
package.json
.env.local                    # NEXT_PUBLIC_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY
.env.local.example
```

## 8. Contenido por sección (copy)

> Copy de borrador, lista para implementar. Es contenido, no código — se puede ajustar en
> cualquier momento sin impacto arquitectónico.

### 8.1 Hero

| Campo | ES | EN |
|---|---|---|
| Nombre | Octavio Toledo | Octavio Toledo |
| Rol | Software Engineer | Software Engineer |
| Tagline | Backend e integraciones para plataformas ERP. Java, Spring Boot, NestJS y arquitectura orientada a eventos. | Backend and integrations for ERP platforms. Java, Spring Boot, NestJS and event-driven architecture. |
| Ubicación | Mendoza, AR · Remoto | Mendoza, AR · Remote |
| GitHub | github.com/OctavioToledo | (igual) |
| LinkedIn | linkedin.com/in/octaviotoledo | (igual) |
| CV | Descargar CV | Download CV |

### 8.2 Por qué contratarme

**Stats numéricos:**

| ES | EN |
|---|---|
| +3 años construyendo software | 3+ years building software |
| +10 tecnologías dominadas | 10+ technologies mastered |
| +5 integraciones en producción | 5+ integrations in production |

**Pilares cualitativos:**

| ES | EN |
|---|---|
| Performance y tiempos asegurados — resiliencia con idempotencia, control de timeouts y cero duplicados | Guaranteed performance and turnaround — resilience through idempotency, timeout handling and zero duplicates |
| Desarrollo asistido por IA — Claude Code y Gemini integrados al flujo de trabajo diario para entregar más rápido sin resignar calidad | AI-assisted development — Claude Code and Gemini built into the daily workflow to ship faster without cutting quality |

### 8.3 Experiencia profesional

Fuente: `PORTFOLIO_CONTEXT.md` §2 (versión verificada contra CV). Estructura por entrada:
`summary` (lo que se ve siempre: contexto + highlights + tags) y `detail` (grupos que se
despliegan con "+ Ver más detalles técnicos", igual que el mockup).

**1. Powip / Aranni Brands** — `current: true`
- Empresa/contexto: Powip · ERP SaaS · microservicios
- Rol: Full Stack Developer — Integraciones (ES) / Full Stack Developer — Integrations (EN)
- Período: Oct 2025 — Actualidad / Oct 2025 — Present
- Contexto (ES): PowipSystem, un ERP SaaS con arquitectura de microservicios, con foco en la capa de integraciones con sistemas externos.
- Contexto (EN): PowipSystem, a microservices-based SaaS ERP, focused on the integrations layer with external systems.
- Highlights (ES): construyo conectores de punta a punta (couriers, e-commerce, pagos, facturación electrónica) desde el análisis de documentación del proveedor hasta producción · diseñé un módulo unificado de integraciones (credenciales y webhook aislados por proveedor, sin multiplicar microservicios) · esquema de idempotencia y manejo de fallos (reserva previa, claim atómico, verificación manual ante timeouts ambiguos) · frontend de cada integración con Next.js, React y TailwindCSS
- Highlights (EN): build end-to-end connectors (couriers, e-commerce, payments, e-invoicing) from provider documentation analysis to production · designed a unified integrations module (isolated credentials and webhook per provider, no microservice sprawl) · idempotency and failure-handling scheme (upfront reservation, atomic claim, manual verification on ambiguous timeouts) · frontend for each integration with Next.js, React and TailwindCSS
- Detail groups: Integraciones / Arquitectura y backend / Testing (contenido completo en `PORTFOLIO_CONTEXT.md` §2 y §3, casos técnicos 1-5 disponibles como fuente para el detalle expandible)
- Tags: Java, Spring Boot, NestJS, RabbitMQ, PostgreSQL, Docker, Next.js, TypeScript
- Links: Sistema → https://www.powip.tech/login · Landing → https://www.powip.lat/

**2. Sistema de gestión — Gimnasio** — `current: true`
- Empresa/contexto: Independiente · Gimnasio
- Rol: Desarrollador Freelance
- Período: Jul 2026 — Actualidad / Jul 2026 — Present
- Contexto (ES): Diseño y desarrollo de un sistema de gestión a medida para un gimnasio, reemplazando un flujo manual de papel y Excel para ~200 socios.
- Contexto (EN): Designing and building a custom management system for a gym, replacing a manual paper-and-Excel workflow for ~200 members.
- Highlights (ES): relevamiento de requerimientos y definición iterativa del producto con el cliente · desarrollo end-to-end (arquitectura, backend, frontend) · módulo de cobros con log de auditoría inmutable (quién, cuándo, cómo, comprobante)
- Highlights (EN): requirements gathering and iterative product definition with the client · end-to-end development (architecture, backend, frontend) · payments module with immutable audit log (who, when, how, receipt)
- Tags: NestJS, React, PostgreSQL, Supabase, Vercel
- Links: sin links públicos todavía (no mostrar botones de link para esta entrada)

**3. Profesor particular de programación** — `current: true` (2023, sin marcador ámbar porque no es la más reciente — solo `now` visual en las dos primeras según mockup)
- Empresa/contexto: Independiente · Clases particulares
- Rol: Profesor de programación
- Período: 2023 — Actualidad / 2023 — Present
- Contexto (ES): Clases uno a uno para estudiantes y personas en transición hacia el desarrollo de software.
- Contexto (EN): One-on-one classes for students and people transitioning into software development.
- Highlights (ES): enseñanza de fundamentos de programación, Java y desarrollo web orientado a proyectos · material adaptado a cada alumno, priorizando código real desde la primera clase
- Highlights (EN): teaching programming fundamentals, Java and project-based web development · material adapted to each student, prioritizing real code from the first class
- Tags: Java, JavaScript, SQL

### 8.4 Proyectos

**OMTime**
- Rol: Co-Founder & Lead Full Stack Architect
- Live: https://om-time.vercel.app/
- Descripción (ES): Plataforma SaaS propia de gestión de turnos y agenda multi-sucursal, con contabilidad. Ownership end-to-end: desde mockups en Figma y modelado UML hasta el deploy en producción.
- Descripción (EN): Own SaaS platform for multi-branch scheduling and appointment management, with accounting. End-to-end ownership: from Figma mockups and UML modeling to production deployment.
- Highlights (ES): UI/UX compleja — grillas de turnos dinámicas e interactivas, dashboards de clientes · backend con Java Spring Boot y Domain-Driven Design para lógica multi-tenant segura · monetización integrada con Mercado Pago
- Highlights (EN): complex UI/UX — dynamic interactive scheduling grids, client dashboards · Java Spring Boot backend with Domain-Driven Design for secure multi-tenant logic · monetization integrated with Mercado Pago
- Stack: Next.js, TypeScript, TailwindCSS, Java, Spring Boot, Mercado Pago API

**Sistema de gestión — Gimnasio** (mostrado también acá como proyecto, con foco de producto en vez de foco laboral)
- Descripción (ES): Plataforma a medida para un gimnasio que administraba socios y cuotas en papel y planillas. Cubre gestión de socios, cobros, auditoría de pagos y reportes.
- Descripción (EN): Custom platform for a gym that managed members and dues on paper and spreadsheets. Covers member management, payments, payment auditing and reporting.
- Estado (ES): En desarrollo / (EN): In development
- Stack: React, Supabase, PostgreSQL, Vercel

### 8.5 Skills (categorizadas, con nivel 0-100 para las barras)

> Niveles auto-evaluados, ajustables en cualquier momento.

**Backend:** Java (90), Spring Boot (90), Spring Security (80), Spring Data JPA (85), NestJS (75), REST APIs (90)

**Frontend:** React (85), Next.js (85), TypeScript (85), TailwindCSS (85), shadcn/ui (80)

**Datos:** PostgreSQL (85), MySQL (75), Supabase (75), JPA/Hibernate (80)

**IA & Automatización:** Claude Code (90), Gemini (75), Integración de LLMs (75)

**Infra & herramientas:** Docker (75), Git/GitHub (90), Vercel (80), RabbitMQ (75)

### 8.6 Resumen rápido

| Campo | ES | EN |
|---|---|---|
| Nombre | Octavio Toledo | Octavio Toledo |
| Estado | En búsqueda activa — full-time o freelance | Actively looking — full-time or freelance |
| Roles buscados | Backend Developer (Java), Full Stack Developer | Backend Developer (Java), Full Stack Developer |
| Huso horario | GMT-3 (Argentina) | GMT-3 (Argentina) |
| Idiomas | Español (nativo), Inglés (avanzado — reuniones y meetings sin problema) | Spanish (native), English (advanced — comfortable in meetings) |
| Experiencia | +3 años desarrollando software | 3+ years developing software |
| Formación | Universidad Tecnológica Nacional (UTN) | Universidad Tecnológica Nacional (UTN) |
| Stack principal | Java · Spring Boot · Next.js · PostgreSQL | Java · Spring Boot · Next.js · PostgreSQL |
| CTA | Conóceme mejor → | Get to know me → |

### 8.7 About extendido (`/sobre-mi`)

**ES** (texto provisto por el usuario, verbatim):

> Software Engineer | Java Backend | Full Stack | AI-Driven Development
>
> Soy Software Engineer especializado en desarrollo backend con Java y Spring, con experiencia
> construyendo productos SaaS, arquitecturas de microservicios e integraciones con plataformas
> externas.
>
> Actualmente participo en el desarrollo de un ERP SaaS en producción, donde diseño e
> implemento microservicios, APIs REST, integraciones con sistemas de e-commerce, pasarelas de
> pago, facturación electrónica y otros servicios externos. Mi trabajo combina arquitectura de
> software, resolución de problemas de negocio y desarrollo Full Stack cuando el proyecto lo
> requiere.
>
> Además de mi experiencia en backend, desarrollo productos completos para clientes,
> participando desde el relevamiento de requerimientos y el diseño de la arquitectura hasta la
> implementación, despliegue y evolución del sistema.
>
> En los últimos años incorporé el desarrollo asistido por IA como parte central de mi forma de
> trabajar. Utilizo herramientas como Claude Code, Gemini y entornos de desarrollo con agentes
> para acelerar la implementación, automatizar tareas repetitivas y mejorar la calidad del
> software. Me interesa especialmente la construcción de aplicaciones AI-Driven y la
> integración de modelos de lenguaje dentro de productos reales.
>
> **Tecnologías principales**
> Backend: Java, Spring Boot, Spring Security, Spring Cloud, JPA/Hibernate, RabbitMQ, NestJS
> Frontend: React, Next.js, TypeScript, TailwindCSS
> Arquitectura: Microservicios, Arquitectura Hexagonal, DDD, SOLID, REST APIs
> Bases de datos: PostgreSQL, MySQL, MongoDB
> IA y Automatización: Claude Code, Gemini, Antigravity, desarrollo asistido por agentes,
> integración de LLMs y automatización de flujos de desarrollo.
>
> Disfruto trabajar en productos donde la ingeniería de software, la arquitectura y las
> necesidades del negocio evolucionan en conjunto. Siempre busco construir soluciones
> mantenibles, escalables y orientadas a generar impacto real.

**EN** (traducción de borrador, a revisar por el usuario):

> Software Engineer | Java Backend | Full Stack | AI-Driven Development
>
> I'm a Software Engineer specialized in backend development with Java and Spring, with
> experience building SaaS products, microservices architectures and integrations with
> external platforms.
>
> I currently work on a production SaaS ERP, where I design and implement microservices, REST
> APIs, and integrations with e-commerce systems, payment gateways, e-invoicing providers and
> other external services. My work combines software architecture, business problem-solving
> and Full Stack development when the project calls for it.
>
> Beyond backend work, I build complete products for clients, involved from requirements
> gathering and architecture design through implementation, deployment and the system's ongoing
> evolution.
>
> In the last few years I've made AI-assisted development a core part of how I work. I use
> tools like Claude Code, Gemini and agent-driven development environments to speed up
> implementation, automate repetitive tasks and improve software quality. I'm particularly
> interested in building AI-driven applications and integrating language models into real
> products.
>
> **Core technologies**
> Backend: Java, Spring Boot, Spring Security, Spring Cloud, JPA/Hibernate, RabbitMQ, NestJS
> Frontend: React, Next.js, TypeScript, TailwindCSS
> Architecture: Microservices, Hexagonal Architecture, DDD, SOLID, REST APIs
> Databases: PostgreSQL, MySQL, MongoDB
> AI & Automation: Claude Code, Gemini, Antigravity, agent-assisted development, LLM
> integration and development workflow automation.
>
> I enjoy working on products where software engineering, architecture and business needs
> evolve together. I always aim to build maintainable, scalable solutions focused on real
> impact.

### 8.8 FAQ

| # | Pregunta ES | Respuesta ES | Question EN | Answer EN |
|---|---|---|---|---|
| 1 | ¿Qué roles estás buscando? | Backend Developer (Java/Spring) y Full Stack Developer, tanto posiciones full-time como freelance/consultoría. | What roles are you looking for? | Backend Developer (Java/Spring) and Full Stack Developer roles, both full-time and freelance/consulting. |
| 2 | ¿Qué husos horarios manejás desde Argentina? | Trabajo en GMT-3. Tengo buen overlap horario con Estados Unidos (especialmente costa este) durante toda mi tarde, y con Europa durante la mañana. | What time zones do you work with from Argentina? | I work in GMT-3. I have good overlap with the US (especially the East Coast) through my afternoon, and with Europe in the morning. |
| 3 | ¿Cuándo podés empezar a trabajar? | *(pendiente — ver §14, pregunta abierta al usuario)* | When can you start? | *(pending — see §14)* |
| 4 | ¿Cómo preferís que te contacten? | Por email o LinkedIn, o directamente con el formulario de esta página — respondo en menos de 24-48hs. | How do you prefer to be contacted? | By email or LinkedIn, or directly through the contact form on this page — I reply within 24-48h. |

### 8.9 Contacto

| Campo | Valor |
|---|---|
| Email | octatoledo7@gmail.com |
| Ubicación | Mendoza, Argentina |
| GitHub | https://github.com/OctavioToledo |
| LinkedIn | https://linkedin.com/in/octaviotoledo |
| Formulario | Nombre, Email, Mensaje → EmailJS → llega a octatoledo7@gmail.com |

### 8.10 Footer

`© {año actual} Toledo Octavio M. — Todos los derechos reservados.` /
`© {current year} Toledo Octavio M. — All rights reserved.`

## 9. Formulario de contacto

- Componente `ContactForm` (client component), `react-hook-form` + `zod` para validar
  nombre/email/mensaje (patrón `Form` de shadcn)
- Campo honeypot oculto (`_gotcha` o similar) como anti-spam gratuito, sin backend que filtre
- Envío con `emailjs.send()` usando `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
  `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (nuevas credenciales, no
  reusar las del portfolio anterior)
- Feedback de éxito/error con toast (`sonner`)

## 10. Animaciones (`motion`)

- Hero: fade + rise al montar (replica el `@keyframes rise` del mockup)
- `SkillBar`: ancho anima de 0 al valor objetivo cuando entra en viewport (`whileInView`)
- `TimelineEntry`: fade + rise con stagger al entrar en viewport
- `ArchitectureDiagram`: `pathLength` de 0 a 1 al entrar en viewport (replica `@keyframes draw`)
- Respeta `prefers-reduced-motion` vía `useReducedMotion()` de `motion`

## 11. Testing y calidad

- TypeScript en modo estricto, ESLint
- QA manual: responsive (mobile/tablet/desktop), dark/light, ES/EN, envío real de prueba del
  formulario de contacto
- Sin suite de tests automatizados — sitio presentacional sin lógica de negocio crítica (YAGNI)

## 12. Fuera de alcance

- Backend propio / base de datos / autenticación
- CMS o edición de contenido sin tocar código
- Rutas de idioma separadas (`/en/...`)
- Blog
- Analytics (se puede agregar después si se pide explícitamente)
- Tests automatizados (E2E/unit) más allá de lint + type-check

## 13. Assets pendientes del usuario

Estos archivos no existen en el repo todavía y hacen falta para completar la implementación:

- `cv-octavio-toledo-dev-es.pdf` y `cv-octavio-toledo-dev-en.pdf` → `public/cv/`
- Foto de perfil (se puede reusar `Yoedit2.png` del repo anterior, o una nueva) → `public/images/profile.png`
- Screenshots de OMTime y del sistema de gimnasio (opcional, para las cards de Proyectos) → `public/images/projects/`
- Credenciales de EmailJS (service ID, template ID, public key) — cuenta nueva, no reusar la anterior

## 14. Preguntas abiertas / a confirmar antes de implementar contenido final

1. **FAQ #3 — "¿Cuándo podés empezar a trabajar?"**: no tengo una respuesta real. Definir
   disponibilidad concreta (ej. "Disponibilidad inmediata", "Con 2 semanas de preaviso", etc.)
2. **Niveles de skill (§8.5)**: son auto-evaluados por mí como placeholder razonable — confirmar
   o ajustar los porcentajes antes de implementar `SkillBar`.
3. **Traducción EN de Experiencia/Proyectos/About (§8.3, 8.4, 8.7)**: son traducciones de
   borrador hechas por mí, no verificadas por el usuario — revisar antes de publicar.
