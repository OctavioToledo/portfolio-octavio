# Portfolio de Octavio Toledo — Diseño

**Fecha:** 2026-08-13 (revisado)
**Estado:** Aprobado para implementación — pendiente solo revisión de traducciones EN (ver §15)

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
| Skills | Tags agrupados por categoría, **sin barras de progreso ni porcentajes** |
| Casos técnicos | Sección propia después de Experiencia, no enterrada en un acordeón |
| Proyectos | Solo OMTime. El gimnasio se saca (ya está en Experiencia) y Powip nunca estuvo acá |
| FAQ | Se elimina como sección. Roles/disponibilidad pasan a Resumen rápido; "cómo contactarme" pasa a la intro de Contacto |
| SEO / Open Graph | Entra en alcance (antes estaba excluido) |

## 3. Stack técnico

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** — versión y sintaxis exacta de instalación a confirmar con context7 al scaffoldear
- **shadcn/ui** — Button, Card, Accordion, Badge, Sheet (nav mobile), Form, Input, Textarea, Sonner (toasts). Se instala cada componente cuando se necesita
- **`motion`** (ex Framer Motion) — scroll-reveals, entrada del timeline y de los casos técnicos, dibujo del diagrama SVG
- **`@emailjs/browser`** — envío del formulario de contacto
- **`next-themes`** — toggle dark/light, `attribute="data-theme"` para calzar con el mockup
- **`next/font/google`** — IBM Plex Mono, IBM Plex Sans, IBM Plex Sans Condensed
- **`lucide-react`** — iconos
- **`react-hook-form` + `zod`** — validación del formulario de contacto
- Gestor de paquetes: npm

**Nota — por qué Next.js y no Vite:** con `LanguageContext`, `next-themes`, `motion` y EmailJS
client-side, casi todo el árbol termina siendo client component, así que el App Router no
aporta una ventaja técnica real acá (no hay data fetching server-side pesado que justifique
RSC). La razón real para usar Next.js es de **señalización**: es el stack que aparece en las
ofertas a las que apuntás y el que ya usás en Powip, así que un portfolio hecho en Next es en
sí mismo una prueba de manejo del stack. Vale la pena mantenerlo, pero quede explícito que es
una decisión de posicionamiento, no de ingeniería.

**Nota técnica — dark mode con shadcn:** shadcn asume la clase `.dark` para sus utilidades
`dark:`. Como acá `next-themes` usa `attribute="data-theme"` (no `.dark`), hay que declarar la
variante a mano en `globals.css` desde el primer commit:

```css
@custom-variant dark (&:where([data-theme="dark"] *));
```

Si esto se resuelve tarde, todas las utilidades `dark:` de los componentes de shadcn ya
instalados quedan muertas y hay que revisarlas una por una.

## 4. Arquitectura de información

### Home (`/`) — secciones en orden, cada una con `id` para anclas del navbar

1. **Navbar** (`#top`) — sticky. Links a cada sección, toggle ES/EN, toggle tema, botón "Descargar CV"
2. **Hero** (`#hero`)
3. **Cómo trabajo** (`#como-trabajo`) — antes "Por qué contratarme"
4. **Experiencia profesional** (`#experiencia`)
5. **Casos técnicos** (`#casos-tecnicos`) — nuevo, promovido fuera del acordeón de Experiencia
6. **Proyectos** (`#proyectos`) — solo OMTime
7. **Skills** (`#skills`) — tags agrupados, sin números
8. **Resumen rápido** (`#resumen`) — incluye disponibilidad real y CTA a `/sobre-mi`
9. **Contacto** (`#contacto`) — con una línea de "cómo prefiero que me contacten"
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

Fondo de grilla (`background-image` de líneas cada 32px) se replica global en `body` vía CSS.

Ver nota técnica en §3 sobre `@custom-variant dark` — se resuelve en `globals.css` antes de
instalar el primer componente de shadcn.

Componentes de presentación custom en `components/blueprint/`:

- `Sheet` — contenedor con esquinas tipo plano técnico, usado en Hero
- `SectionHeader` — título uppercase + regla horizontal + contador mono (ej. "05 registros")
- `StatGauge` — número grande + label, para "Cómo trabajo" (2 instancias, no 3)
- `TimelineEntry` — card de experiencia con marcador en diamante (ámbar si `current: true`); soporta un `detail` opcional para el futuro, pero ninguna entrada actual lo usa
- `CaseStudyCard` — problema en una línea + 2-3 bullets + tags, para la sección Casos técnicos
- `TechTag` — pill mono con borde, usado en Skills (agrupado por categoría) y en tags de stack
- `ArchitectureDiagram` — el SVG del mockup, adaptado como componente reutilizable

*(Se elimina `SkillBar` — ver §2 y §8.6.)*

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

- Archivos de contenido: `hero.ts`, `how-i-work.ts`, `experience.ts`, `case-studies.ts`,
  `projects.ts`, `skills.ts`, `quick-facts.ts`, `about.ts`, `contact.ts`

## 7. Estructura de carpetas

```
src/
  app/
    layout.tsx              # fonts, ThemeProvider, LanguageProvider
    page.tsx                # home: compone todas las secciones
    globals.css             # tokens blueprint + tailwind @theme + @custom-variant dark
    opengraph-image.tsx     # imagen OG generada (ver §12)
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
      how-i-work-section.tsx
      experience-section.tsx
      case-studies-section.tsx
      projects-section.tsx
      skills-section.tsx
      quick-facts-section.tsx
      contact-section.tsx
    blueprint/
      sheet.tsx
      section-header.tsx
      stat-gauge.tsx
      timeline-entry.tsx
      case-study-card.tsx
      tech-tag.tsx
      architecture-diagram.tsx
    ui/                      # shadcn (generado por CLI)
    contact-form.tsx
  content/
    types.ts
    hero.ts
    how-i-work.ts
    experience.ts
    case-studies.ts
    projects.ts
    skills.ts
    quick-facts.ts
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
    projects/                # screenshots omtime
components.json               # config shadcn
next.config.ts
tsconfig.json
package.json
.env.local                    # NEXT_PUBLIC_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY
.env.local.example
```

## 8. Contenido por sección (copy)

> Copy de borrador, lista para implementar. Es contenido, no código — se puede ajustar en
> cualquier momento sin impacto arquitectónico. Los campos marcados `[A CONFIRMAR]` dependen
> de datos que solo el usuario tiene — ver §15.

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

### 8.2 Cómo trabajo

*(antes "Por qué contratarme" — mismo contenido, título y tono menos vendedor)*

**Stats (2, no 3 — se saca "+10 tecnologías dominadas" por no ser verificable y premiar dispersión):**

| ES | EN |
|---|---|
| +3 años construyendo software | 3+ years building software |
| +5 integraciones en producción | 5+ integrations in production |

**Pilares (reformulados sin promesas absolutas — describen lo que diseñé, no lo que garantizo):**

| ES | EN |
|---|---|
| Diseño para fallas — idempotencia y verificación manual ante timeouts ambiguos, para evitar envíos duplicados en las integraciones que construí. | Designed for failure — idempotency and manual verification on ambiguous timeouts, to avoid duplicate dispatches in the integrations I built. |
| Desarrollo asistido por IA — uso Claude Code y Gemini a diario para acelerar la implementación y automatizar tareas repetitivas. | AI-assisted development — I use Claude Code and Gemini daily to speed up implementation and automate repetitive tasks. |

### 8.3 Experiencia profesional

Fuente: `PORTFOLIO_CONTEXT.md` §2. Cards simples (contexto + highlights + tags + links), **sin
acordeón de detalle** — el contenido técnico profundo que antes vivía ahí ahora es la sección
Casos técnicos (§8.4).

**1. Aranni Brands — Powip** — `current: true`
- Empresa/producto: Aranni Brands (cliente/empleador freelance) · Powip / PowipSystem (producto — ERP SaaS)
- Rol: Full Stack Developer — Integraciones / Full Stack Developer — Integrations
- Período: Septiembre 2025 — Actualidad / September 2025 — Present
- Contexto (ES): PowipSystem, un ERP SaaS con arquitectura de microservicios, con foco en la capa de integraciones con sistemas externos.
- Contexto (EN): PowipSystem, a microservices-based SaaS ERP, focused on the integrations layer with external systems.
- Highlights (ES): construyo conectores de punta a punta (couriers, e-commerce, pagos, facturación electrónica) desde el análisis de documentación del proveedor hasta producción · diseñé un módulo unificado de integraciones (credenciales y webhook aislados por proveedor, sin multiplicar microservicios) · esquema de idempotencia y manejo de fallos (reserva previa, claim atómico, verificación manual ante timeouts ambiguos) · frontend de cada integración con Next.js, React y TailwindCSS
- Highlights (EN): build end-to-end connectors (couriers, e-commerce, payments, e-invoicing) from provider documentation analysis to production · designed a unified integrations module (isolated credentials and webhook per provider, no microservice sprawl) · idempotency and failure-handling scheme (upfront reservation, atomic claim, manual verification on ambiguous timeouts) · frontend for each integration with Next.js, React and TailwindCSS
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

**3. Profesor particular de programación** — `current: true`
- Empresa/contexto: Independiente · Clases particulares
- Rol: Profesor de programación
- Período: 2023 — Actualidad / 2023 — Present
- Contexto (ES): Clases uno a uno para estudiantes y personas en transición hacia el desarrollo de software.
- Contexto (EN): One-on-one classes for students and people transitioning into software development.
- Highlights (ES): enseñanza de fundamentos de programación, Java y desarrollo web orientado a proyectos · material adaptado a cada alumno, priorizando código real desde la primera clase
- Highlights (EN): teaching programming fundamentals, Java and project-based web development · material adapted to each student, prioritizing real code from the first class
- Tags: Java, JavaScript, SQL

### 8.4 Casos técnicos

*(Nuevo — antes vivían enterrados en el acordeón de la entrada de Powip. Problemas concretos
resueltos trabajando en las integraciones de Powip: es el material que diferencia este
portfolio de uno genérico con "React" y "Spring" en una lista de skills.)*

**1. Conector de courier end-to-end**
- Problema (ES): había que despachar pedidos a un nuevo operador logístico sin proceso previo. / (EN): the ERP needed to dispatch orders to a new logistics provider with no existing process.
- Bullets (ES): diseñé el contrato de creación de pedidos con validación por tipo de cliente (retiro en domicilio / despacho desde almacén) · implementé test de conexión de credenciales y recepción de webhooks firmados con HMAC · cubrí el flujo con tests automatizados backend+frontend antes de producción.
- Bullets (EN): designed the order-creation contract with validation by customer type (home pickup / warehouse dispatch) · built a credentials connection test and HMAC-signed webhook reception · covered the flow with automated backend+frontend tests before shipping to production.
- Tags: NestJS, TypeScript, PostgreSQL, RabbitMQ, HMAC

**2. Idempotencia en el despacho de pedidos**
- Problema (ES): el proveedor no permite consultar un pedido por código; un timeout dejaba el estado ambiguo. / (EN): the provider doesn't support looking up an order by code; a timeout left the state ambiguous.
- Bullets (ES): diseñé un esquema de reserva previa con toma atómica en base de datos antes de llamar al proveedor · ante timeout el sistema no reintenta — deja el pedido en verificación manual, evitando envíos duplicados.
- Bullets (EN): designed an upfront-reservation scheme with an atomic DB claim before calling the provider · on timeout the system doesn't retry — it flags the order for manual verification, avoiding duplicate dispatches.
- Tags: Spring Boot, PostgreSQL, Diseño de APIs

**3. Sincronización de estados courier → ERP**
- Problema (ES): webhooks desordenados llegaban con estados inexistentes en el ciclo de vida interno. / (EN): out-of-order webhooks carried states that didn't exist in the internal lifecycle.
- Bullets (ES): mapeé 13 estados externos a una máquina de estados que solo avanza · agregué una guarda por antigüedad (un webhook fuera de orden no retrocede el estado) · los estados desconocidos generan una alerta sin romper el flujo.
- Bullets (EN): mapped 13 external states onto a forward-only state machine · added a staleness guard so an out-of-order webhook can't roll back the state · unknown states raise an alert without breaking the flow.
- Tags: RabbitMQ, arquitectura orientada a eventos, máquina de estados

**4. Consolidación de arquitectura de integraciones**
- Problema (ES): cada integración nueva nacía como microservicio propio, multiplicando infraestructura y código duplicado. / (EN): every new integration was born as its own microservice, multiplying infrastructure and duplicated code.
- Bullets (ES): unifiqué todo en un único servicio con un módulo por proveedor y credenciales aisladas por integración · centralicé la publicación de eventos y los bindings · eliminé un microservicio completo sin pérdida de funcionalidad.
- Bullets (EN): unified everything into a single service with one module per provider and isolated credentials per integration · centralized event publishing and bindings · removed an entire microservice with no loss of functionality.
- Tags: NestJS, microservicios, arquitectura modular

**5. API Gateway y validación de tokens**
- Problema (ES): el frontend llamaba directo a cada microservicio, dispersando la autenticación y el ruteo. / (EN): the frontend called each microservice directly, scattering auth and routing.
- Bullets (ES): centralicé el tráfico vía un API Gateway · implementé validación stateless de tokens con firma asimétrica y claves publicadas por JWKS.
- Bullets (EN): centralized traffic through an API Gateway · implemented stateless token validation with asymmetric signing and JWKS-published keys.
- Tags: Spring Cloud Gateway, JWT, RS256

### 8.5 Proyectos

**OMTime** (único proyecto de esta sección)
- Etiqueta (ES): Proyecto propio, desarrollado junto a un socio / (EN): Own project, built with a co-founder — *(se saca "Co-Founder & Lead Full Stack Architect": tres títulos para un proyecto que no llegó a venderse resta credibilidad frente al resto de la página, que es sobria)*
- Live: https://om-time.vercel.app/
- Descripción (ES): Plataforma SaaS propia de gestión de turnos y agenda multi-sucursal, con contabilidad. Ownership end-to-end: desde mockups en Figma y modelado UML hasta el deploy en producción.
- Descripción (EN): Own SaaS platform for multi-branch scheduling and appointment management, with accounting. End-to-end ownership: from Figma mockups and UML modeling to production deployment.
- Highlights (ES): UI/UX compleja — grillas de turnos dinámicas e interactivas, dashboards de clientes · backend con Java Spring Boot y Domain-Driven Design para lógica multi-tenant segura · monetización integrada con Mercado Pago
- Highlights (EN): complex UI/UX — dynamic interactive scheduling grids, client dashboards · Java Spring Boot backend with Domain-Driven Design for secure multi-tenant logic · monetization integrated with Mercado Pago
- Stack: Next.js, TypeScript, TailwindCSS, Java, Spring Boot, Mercado Pago API

### 8.6 Skills (agrupadas por categoría, sin números ni barras)

**Backend:** Java, Spring Boot, Spring Security, Spring Data JPA, NestJS, REST APIs

**Frontend:** React, Next.js, TypeScript, TailwindCSS, shadcn/ui

**Datos:** PostgreSQL, MySQL, Supabase, JPA/Hibernate

**IA & Automatización:** Claude Code, Gemini, Integración de LLMs

**Infra & herramientas:** Docker, Git/GitHub, Vercel, RabbitMQ

### 8.7 Resumen rápido

| Campo | ES | EN |
|---|---|---|
| Nombre | Octavio Toledo | Octavio Toledo |
| Estado | En búsqueda activa — full-time o freelance | Actively looking — full-time or freelance |
| Disponibilidad | Inmediata | Immediately available |
| Roles buscados | Backend Developer (Java), Full Stack Developer | Backend Developer (Java), Full Stack Developer |
| Huso horario | GMT-3 (Argentina) | GMT-3 (Argentina) |
| Idiomas | Español (nativo), Inglés (avanzado — reuniones y meetings sin problema) | Spanish (native), English (advanced — comfortable in meetings) |
| Experiencia | +3 años desarrollando software | 3+ years developing software |
| Formación | Universidad Tecnológica Nacional (UTN) | Universidad Tecnológica Nacional (UTN) |
| Stack principal | Java · Spring Boot · Next.js · PostgreSQL | Java · Spring Boot · Next.js · PostgreSQL |
| CTA | Conóceme mejor → | Get to know me → |

### 8.8 About extendido (`/sobre-mi`)

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

### 8.9 Contacto

Intro de la sección (reemplaza lo que hubiera cubierto la FAQ sobre "cómo preferís que te
contacten"):

| ES | EN |
|---|---|
| Prefiero email o LinkedIn — o usá el formulario de acá abajo. Respondo en 24-48hs. | Email or LinkedIn work best — or just use the form below. I reply within 24-48h. |

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
- Campo honeypot oculto como anti-spam gratuito, sin backend que filtre
- Envío con `emailjs.send()` usando `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
  `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (credenciales nuevas)
- Feedback de éxito/error con toast (`sonner`)

## 10. Animaciones (`motion`)

- Hero: fade + rise al montar
- `TimelineEntry` y `CaseStudyCard`: fade + rise con stagger al entrar en viewport
- `ArchitectureDiagram`: `pathLength` de 0 a 1 al entrar en viewport
- Grupos de tags en Skills: fade-in con stagger leve al entrar en viewport (sin animar ningún valor numérico, porque no hay ninguno)
- Respeta `prefers-reduced-motion` vía `useReducedMotion()` de `motion`

## 11. Testing y calidad

- TypeScript en modo estricto, ESLint
- QA manual: responsive (mobile/tablet/desktop), dark/light, ES/EN, envío real de prueba del
  formulario de contacto
- Sin suite de tests automatizados — sitio presentacional sin lógica de negocio crítica (YAGNI)

## 12. SEO y Open Graph

- `metadata` / `generateMetadata` de Next.js en `layout.tsx` y en `sobre-mi/page.tsx` (title,
  description, en el idioma default)
- `opengraph-image.tsx` en `app/` — imagen generada con la estética blueprint (nombre, rol,
  tagline) para que el link se vea bien al compartirse en LinkedIn/postulaciones
- Sin sitemap/robots custom por ahora — el default de Next.js alcanza para un sitio de una
  página

## 13. Fuera de alcance

- Backend propio / base de datos / autenticación
- CMS o edición de contenido sin tocar código
- Rutas de idioma separadas (`/en/...`)
- Blog
- Analytics (se puede agregar después si se pide explícitamente)
- Tests automatizados (E2E/unit) más allá de lint + type-check

## 14. Assets pendientes del usuario

- `cv-octavio-toledo-dev-es.pdf` y `cv-octavio-toledo-dev-en.pdf` → `public/cv/`
- Foto de perfil (reusar `Yoedit2.png` del repo anterior, o una nueva) → `public/images/profile.png`
- Screenshot(s) de OMTime (opcional, para la card de Proyectos) → `public/images/projects/`
- Credenciales de EmailJS (service ID, template ID, public key) — cuenta nueva

## 15. Preguntas abiertas — bloquean contenido final, no la implementación de estructura

1. **Traducción EN de Experiencia/Casos técnicos/Proyectos/About**: son traducciones de
   borrador hechas por mí, no verificadas por el usuario — revisar antes de publicar.

> Resuelto: fecha de inicio en Aranni Brands / Powip = Septiembre 2025; relación
> empleador/producto = Aranni Brands (cliente) · Powip (producto, ver §8.3); disponibilidad =
> inmediata (ver §8.7).
