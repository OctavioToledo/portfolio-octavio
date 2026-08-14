# Contexto para el nuevo portfolio — Octavio Toledo

> Extraído del repo actual (`MyPortfolio-main`) el 2026-08-13. Hay **dos versiones de contenido conviviendo en el repo**:
> 1. **La que está LIVE hoy** (`src/common/LanguageContext.jsx`) — narrativa "AI-driven full stack dev, 24 años, freelance SaaS".
> 2. **Un rediseño en curso, no publicado aún** (`src/content/` planificado, hoy en `files/*.ts` + specs en `docs/superpowers/`) — narrativa "Software Engineer backend/integraciones", **verificada contra tu CV real** (ambos PDFs `cv-octavio-toledo-dev-{es,en}.pdf` fueron leídos directamente para corregir fechas y nombres).
>
> Para el portfolio nuevo, **usá la versión 2 (verificada con CV) como fuente de verdad** para experiencia laboral — es más precisa y profesional. La versión 1 tiene textos más informales/de impacto que podés rescatar como tono si te gustan, pero contiene datos no verificados (ej. la edad "24 años" hardcodeada, que se desactualiza solo).

---

## 1. Datos de contacto y enlaces

| Campo | Valor |
|---|---|
| Nombre completo | Octavio Toledo (footer legal: "Toledo Octavio M.") |
| Rol / título | Software Engineer (versión CV) / "Software Developer" (versión live) |
| Ubicación | Mendoza, Argentina · Remoto |
| Email real | **octatoledo7@gmail.com** (usado en el backend de EmailJS del form de contacto; el placeholder `TU_EMAIL@dominio.com` que aparece en `files/*.ts` es un TODO sin completar, no lo uses) |
| GitHub | https://github.com/OctavioToledo |
| LinkedIn | https://linkedin.com/in/octaviotoledo (también aparece como `https://www.linkedin.com/in/octaviotoledo/`) |
| Sitio actual (GitHub Pages) | base `/MyPortfolio/` → probablemente `https://octaviotoledo.github.io/MyPortfolio/` |
| CVs | `cv-octavio-toledo-dev-es.pdf` y `cv-octavio-toledo-dev-en.pdf` en la raíz del repo (bilingües, son la fuente de verdad para fechas/empresas) |

---

## 2. Experiencia profesional (verificada contra el CV — usar esta versión)

Orden recomendado: **Powip/Aranni → Freelance gimnasio → Tutorías** (no es orden cronológico puro: ambos roles nuevos siguen "Actualidad", así que se ordenó por relevancia para un recruiter).

### Aranni Brands — Software Engineer, Java Backend (Freelance)
- **Período:** Octubre 2025 — Actualidad
- **Contexto:** Desarrollo backend e integración de plataformas externas para **PowipSystem**, un ERP SaaS multi-tenant para e-commerce y logística en Latinoamérica, basado en microservicios.
- **Highlights:**
  - Desarrollo de módulos de negocio del ERP (ventas, clientes, control de stock y administración) con Java, Spring Boot y Spring Data JPA; participación en análisis funcional y definición de reglas de negocio junto al equipo.
  - Integración de sistemas externos: couriers, e-commerce (Shopify), pasarela de pago (Mercado Pago) y facturación electrónica (SUNAT) — unificados en un único módulo de integraciones (evita proliferación de microservicios).
  - Diseño de esas integraciones con foco en resiliencia: idempotencia, verificación de webhooks con HMAC, estados de verificación ante timeouts (evita envíos duplicados y pérdidas de sincronización).
  - Frontend cuando la funcionalidad lo requiere (dashboards y flujos operativos) con Next.js, React y TypeScript.
- **Detalle técnico adicional (arquitectura & backend):**
  - Participación en decisiones de arquitectura: diseño de APIs REST, análisis de documentación técnica de terceros, definición del enfoque de cada integración.
  - Centralización de comunicación entre servicios vía API Gateway (Spring Cloud Gateway), autenticación/autorización unificada con Spring Security + JWT, mensajería asíncrona con RabbitMQ, publicación de eventos centralizada.
- **Operación & calidad:** Resolución de incidencias en producción, debugging complejo, testing de flujos, documentación técnica de cada módulo.
- **Stack:** Java, Spring Boot, Spring Security, Spring Cloud Gateway, Spring Data JPA, RabbitMQ, NestJS, PostgreSQL, MySQL, Docker, Next.js
- **Links:** Sistema (login) → https://www.powip.tech/login · Landing → https://www.powip.lat/

### Independiente — Desarrollador Freelance (proyecto gimnasio)
- **Período:** Julio 2026 — Actualidad
- **Contexto:** Diseño y desarrollo de un sistema de gestión a medida para un gimnasio (en implementación), para digitalizar la gestión de ~200 socios y reemplazar un flujo manual de papel y Excel.
- **Highlights:**
  - Relevamiento de requerimientos con el cliente y definición iterativa del producto.
  - Desarrollo end-to-end (arquitectura, backend, frontend, implementación) para un negocio con ~200 clientes activos.
  - Módulo de cobros con log de auditoría inmutable (quién, cuándo, cómo, comprobante) — elimina el error crítico de pagos sin registrar del flujo papel→Excel.
  - Arquitectura single-tenant, priorizando entrega rápida sobre complejidad especulativa (trade-offs documentados).
- **Stack:** NestJS, React, PostgreSQL (Supabase), Vercel
- Sin links públicos todavía.

### Independiente — Profesor particular de programación
- **Período:** 2023 — Actualidad
- **Contexto:** Clases uno a uno para estudiantes y personas en transición hacia el desarrollo de software.
- **Highlights:**
  - Enseñanza de fundamentos de programación, Java y desarrollo web orientado a proyectos.
  - Material adaptado a cada alumno, priorizando escribir y depurar código real desde la primera clase.
- **Stack:** Java, JavaScript, SQL

---

## 3. Casos técnicos / case studies (detalle de problemas resueltos en Powip)

Útiles para una sección "cómo pienso" o de deep-dives técnicos:

1. **Conector de courier end-to-end** — El ERP necesitaba despachar pedidos a un nuevo operador logístico sin proceso previo. Diseñé el contrato de creación de pedidos con validación por tipo de cliente (retiro en domicilio / despacho desde almacén), implementé test de conexión de credenciales y recepción de webhooks firmados con HMAC, cubrí el flujo con tests automatizados backend+frontend antes de producción. *Stack: NestJS, TypeScript, PostgreSQL, RabbitMQ, HMAC*

2. **Idempotencia en el despacho de pedidos** — El proveedor no permite consultar un pedido por código; un timeout dejaba el estado ambiguo. Diseñé un esquema de reserva previa con toma atómica en BD antes de llamar al proveedor; ante timeout el sistema no reintenta, deja el pedido en verificación manual (evita envíos duplicados). *Stack: Spring Boot, PostgreSQL, Diseño de APIs*

3. **Sincronización de estados courier → ERP** — Webhooks desordenados con estados inexistentes en el ciclo de vida interno. Mapeé 13 estados externos a una máquina de estados que solo avanza; agregué guarda por antigüedad (un webhook fuera de orden no retrocede el estado); estados desconocidos generan alerta sin romper el flujo. *Stack: RabbitMQ, arquitectura orientada a eventos, máquina de estados*

4. **Consolidación de arquitectura de integraciones** — Cada integración nueva nacía como microservicio propio, multiplicando infraestructura y código duplicado. Unifiqué todo en un único servicio con un módulo por proveedor, credenciales aisladas por integración, publicación de eventos y bindings centralizados. Eliminé un microservicio completo sin pérdida de funcionalidad. *Stack: NestJS, microservicios, arquitectura modular*

5. **API Gateway y validación de tokens** — El frontend llamaba directo a cada microservicio, dispersando auth y ruteo. Centralicé el tráfico vía gateway e implementé validación stateless de tokens con firma asimétrica y claves publicadas por JWKS. *Stack: Spring Cloud Gateway, JWT, RS256*

---

## 4. Proyectos personales / propios

### OMTime
- **Qué es:** Plataforma SaaS propia de gestión de turnos y agenda multi-sucursal (appointment/schedule management), con contabilidad. Explorás el diseño de un producto completo de punta a punta: desde mockups en Figma y modelado UML hasta el deploy en producción.
- **Rol (versión live):** Co-Founder & Lead Full Stack Architect
- **Live:** https://om-time.vercel.app/
- **Highlights (versión live, más "marketing"):**
  - Ownership end-to-end: desde Figma/UML hasta producción.
  - UI/UX compleja: grillas de turnos dinámicas e interactivas, dashboards de clientes (React + Tailwind).
  - Backend robusto: Java Spring Boot con Domain-Driven Design (DDD) para lógica multi-tenant segura.
  - Monetización: integración con Mercado Pago para suscripciones y pagos.
- **Stack:** Next.js, TypeScript, TailwindCSS, Java, Spring Boot, Mercado Pago API, Clean Architecture
- **Versión "sobria" (spec CV-verificada):** "Proyecto propio de gestión de turnos y agenda. Lo usé para explorar el diseño de un producto completo, desde el modelo de datos hasta la interfaz." Estado: Proyecto personal. Stack ahí listado: React, Node.js, PostgreSQL (nota: hay inconsistencia de stack entre ambas versiones — la versión live con Next.js/Java parece más completa/actual).

### PowipSystem (mismo producto que la experiencia en Aranni Brands, mostrado también como "proyecto" en la versión live)
- **Qué es:** ERP SaaS listo para producción, maneja ventas, inventario y gestión de clientes. Microservicios + mensajería asíncrona para alta disponibilidad y escalado modular.
- **Rol (versión live):** Full Stack Developer
- **Live:** https://www.powip.tech/login (sistema) · https://www.powip.lat/ (landing)
- **Highlights (versión live):**
  - Frontend moderno: dashboards responsivos con alta densidad de datos, tracking de pedidos (Next.js + TailwindCSS).
  - Base de datos & auth: Supabase + JWT.
  - Microservicios: dominios de Ventas/Clientes/Inventario desacoplados (Java + NestJS).
  - Procesamiento asíncrono: RabbitMQ para mensajería confiable entre servicios.
  - Workflow asistido por IA: uso de Claude Opus y Gemini Pro para acelerar desarrollo, refactors e integraciones.
- **Stack:** Next.js, Supabase, TailwindCSS, Node.js (NestJS), Java, Spring Boot, RabbitMQ

### Sistema de gestión para gimnasio
- Ver detalle en la sección de experiencia freelance arriba (mismo proyecto). Como "proyecto" standalone: "Plataforma a medida para un gimnasio que administraba socios y cuotas en papel y planillas. Cubre gestión de socios, cobros, auditoría de pagos y reportes." Estado: En desarrollo. Stack: React, Supabase, PostgreSQL, Vercel.

---

## 5. Skills / stack técnico

**Versión consolidada (unión de ambas fuentes del repo):**

- **Frontend:** React, Next.js, TypeScript, TailwindCSS, shadcn/ui, Vite, HTML, CSS
- **Backend:** Java (Spring Boot), Spring Security, Spring Cloud Gateway, Spring Data JPA, Node.js (NestJS), REST APIs, JWT Auth
- **Integraciones:** Conectores ERP, Webhooks, RabbitMQ, Kafka, Idempotencia, Facturación electrónica, Pasarelas de pago (Mercado Pago)
- **Datos:** PostgreSQL, MySQL, Supabase, TypeORM, JPA / Hibernate
- **IA:** OpenAI APIs, Anthropic (Claude), workflows asistidos por IA (uso diario para acelerar desarrollo, debugging, validación de arquitectura e iteración de producto)
- **Infraestructura & herramientas:** Docker, Git/GitHub, GitHub Actions, Railway, Vercel, Jest, JUnit, Postman, Swagger, Figma

---

## 6. Sobre mí — dos versiones de narrativa

### Versión LIVE (tono más personal/casual, en primera persona, "hola 👋")
> "¡Hola! 👋 Soy Octavio, tengo 24 años — soy un Desarrollador Full Stack impulsado por IA, construyendo y lanzando productos SaaS desde cero. Tengo experiencia entregando sistemas listos para producción en entornos de alta velocidad con ownership end-to-end. Sólida experiencia en Next.js, Supabase, sistemas frontend modernos y arquitecturas backend escalables (Java Spring Boot / NestJS). Utilizo herramientas de IA (Claude, Gemini, OpenAI APIs) diariamente para acelerar el desarrollo, debugging, validación de arquitectura e iteración de productos. Actualmente trabajo como freelancer desarrollando soluciones de gestión empresarial."

⚠️ Contiene la edad "24 años" hardcodeada — vas a querer actualizarla o sacarla en el portfolio nuevo para que no quede vieja.

### Versión rediseño (tono más profesional/backend-focused, verificada contra CV)
> "Soy desarrollador backend y trabajo sobre un ERP SaaS conectándolo con el mundo exterior: couriers, marketplaces, pasarelas de pago y organismos de facturación. La mayor parte de mi trabajo consiste en hacer que dos sistemas que no fueron diseñados para hablarse lo hagan de forma confiable."
>
> "Me interesa el software que sigue funcionando cuando la red falla: idempotencia, reintentos, estados consistentes y trazabilidad. También doy clases particulares de programación desde 2023."

**Tagline corta (hero, ambas versiones del rediseño):**
- ES: "Backend e integraciones para plataformas ERP. Java, Spring Boot, NestJS y arquitectura orientada a eventos."
- EN: "Backend and integrations for ERP platforms. Java, Spring Boot, NestJS and event-driven architecture."

**Slogan versión live (más de efecto):**
- ES: "Creando soluciones, una línea a la vez."
- EN: "Crafting solutions one line at a time."

---

## 7. Textos de UI / microcopy (por si reusás el mismo patrón bilingüe ES/EN)

- Botón CV: "Descargar CV" / "Download CV"
- Sección proyectos: "Proyectos" / "Projects"
- Sección experiencia: "Experiencia Profesional" / "Professional Experience"
- Sección skills: "Stack" / "Skills"
- Sección sobre mí: "Sobre mí" / "About"
- Sección contacto: "Contacto" / "Contact"
- Toggle "ver más detalle técnico": "Ver más detalles técnicos" / "See more technical details"
- Links de proyecto: "Sistema" / "Live System", "Landing" / "Landing"
- Formulario de contacto: Nombre/Email/Mensaje, botón "Enviar mensaje" ("Send message"), mensajes de éxito/error post-envío.
- Footer: "© {año} Toledo Octavio M." + "Todos los derechos reservados." / "All rights reserved."

---

## 8. Detalles técnicos de implementación (por si migrás el mecanismo, no solo el copy)

- **Envío de formulario de contacto:** usa EmailJS (`@emailjs/browser`) client-side, sin backend propio. Iba a `octatoledo7@gmail.com`. Si armás el portfolio nuevo necesitás nuevas credenciales de EmailJS (service ID / template ID / public key) — las actuales están hardcodeadas en el código y probablemente no querés reusarlas tal cual en un repo público nuevo.
- **Bilingüe ES/EN:** toggle de idioma con persistencia en `localStorage`, patrón de diccionario de traducciones (o el modelo tipado `PortfolioContent` del rediseño, que fuerza paridad ES/EN vía TypeScript).
- **Dark/light mode:** toggle de tema también persistido.
- **Deploy:** GitHub Pages vía `gh-pages`, con `base: "/MyPortfolio/"` en Vite.
- **CV bilingüe:** un PDF distinto por idioma, servido como asset bundleado (no en `/public` a mano, por temas de base path).

---

## 9. Assets disponibles para reusar

- Foto de perfil: `src/assets/Yoedit2.png` (y variante `Yoedit.png`)
- Screenshots de OMTime: landing, features, calendar
- Screenshots de Powip: landing, features, dashboard, sales, tracking, payments, guide, icon
- Iconos: GitHub, LinkedIn, Twitter (dark/light), sol/luna (theme toggle), traducción (dark/light), checkmark (dark/light)
- Dos CVs en PDF (ES/EN) en la raíz del repo — son la fuente de verdad más confiable para fechas y hechos.

---

## 10. Recomendación para el portfolio nuevo

- Tomá la **experiencia laboral y casos técnicos de la sección 2 y 3** (verificados contra CV) como base factual — es tu contenido más sólido y diferenciado (integraciones ERP, idempotencia, arquitectura de eventos).
- Del **About** decidí un tono: la versión "profesional/backend" (§6, segunda) envejece mejor que la que tiene la edad hardcodeada.
- Confirmá antes de reusar: el email real es `octatoledo7@gmail.com` (no el placeholder que aparece en el código del rediseño).
- Si vas a mantener el formulario de contacto con EmailJS, vas a necesitar generar credenciales nuevas para el proyecto nuevo.
