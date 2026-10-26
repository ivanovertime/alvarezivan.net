---
locale: "es"
title: "Estabilizar una plataforma de e-commerce heredada sobre NestJS + Strapi"
date: "2026-05-15"
hidden: true
category: "case-study"
client: "Cliente minorista (LatAm)"
year: 2025
tags:
  - "e-commerce"
  - "platform-recovery"
  - "integrations"
type: "recovery"
stack: ["NestJS", "Strapi", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Construí una ruta de releases previsible sobre un stack heredado y una frontera limpia de integración con SAP que preparó el trabajo que vino después"
featured: true
ogImage: "/blog/case-studies/retail-ecommerce-core/featuredImage.jpg"
image: "/blog/case-studies/retail-ecommerce-core/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
description: >
  Acto 1 de un trabajo de e-commerce en dos partes: estabilizar un stack
  heredado de NestJS + Strapi, aislar SAP detrás de una sola frontera y
  restaurar una ruta de releases previsible antes de plantear una reconstrucción.
---

> :u-icon{name="i-lucide-paperclip" class="inline mr-1 align-[-2px]"} **Parte de un par.** Este es el Acto 1 (arreglar primero). El Acto 2 (reconstruir cuando toca) es [*Reconstruir una plataforma de e-commerce en tres meses*](/es/blog/case-studies/retail-ecommerce-rebuild).

## TL;DR

- Storefront heredado en **NestJS + Strapi**, con SAP como sistema de registro y una ruta de releases en la que el equipo no confiaba.
- Arreglamos primero: estabilizamos el runtime, llevamos las llamadas a SAP detrás de una sola frontera tipada, y estandarizamos el despliegue con contenedores + CI/CD.
- Resultado: una cadencia de entrega previsible y un contrato de integración reutilizable que hizo viable el [caso de estudio de la reconstrucción](/es/blog/case-studies/retail-ecommerce-rebuild).

## Situación

- Plataforma heredada: **NestJS + Strapi**, con SAP como fuente de verdad para catálogo, precios e inventario.
- Riesgo principal: el comportamiento de la integración estaba repartido por todo el código, así que cada release traía riesgo sorpresa.
- Restricciones: equipo de 4, un trimestre, el storefront tenía que seguir en línea y no había reescritura completa.

El trabajo no era construir algo nuevo. El trabajo era hacer que esto volviera a ser seguro de entregar.

## Decisiones

### Decisión 1 — Estabilizar el runtime antes de tocar funcionalidad

Usamos las primeras dos semanas solo para diagnóstico e instrumentación.

| Opción | Compensación | Elegí |
|---|---|---|
| Atacar de inmediato el backlog de bugs | Parece más rápido, pero acumula riesgo sobre un runtime que no conocemos | |
| Congelar funcionalidad un momento, auditar e instrumentar primero | Peor primera impresión, más rápido y más seguro cada semana después | <DecisionCheck /> |

La previsibilidad fue primero. La velocidad vino después.

### Decisión 2 — Contener la integración con SAP detrás de una única frontera explícita

El movimiento de mayor impacto fue centralizar el comportamiento de la integración con SAP.

| Opción | Compensación | Elegí |
|---|---|---|
| Refactorizar los puntos de llamada poco a poco | PRs pequeños y de bajo riesgo, pero sin una meta clara | |
| Enrutar todas las llamadas por un único módulo de integración tipado | Mayor costo inicial; un solo lugar donde endurecer, observar y cachear | <DecisionCheck /> |

Esa frontera se volvió el activo reutilizable: sobrevivió a la reconstrucción y dio forma a la [aplicación de cotizaciones sobre SAP](/es/blog/case-studies/retail-sap-quotation-app).

### Decisión 3 — Contenerizar la ruta de despliegue, no reconstruir la plataforma

Evitamos una segunda migración durante la recuperación y estandarizamos primero la entrega.

| Opción | Compensación | Elegí |
|---|---|---|
| Migrar el destino de la plataforma a mitad de la recuperación | Suma riesgo de migración al riesgo que ya tenía el runtime | |
| Contenerizar en el sitio + CI/CD ligero | Retorno rápido ahora, portabilidad después | <DecisionCheck /> |

Regla práctica: **menos piezas en movimiento ahora, más opciones después.**

### Decisión 4 — Convertir Strapi en herramienta de contenido, no en plano de control

Strapi se había desviado hacia lógica de negocio y comportamiento de precios, lo que hacía riesgoso editar contenido.

| Opción | Compensación | Elegí |
|---|---|---|
| Dejar las responsabilidades mezcladas y documentarlas | Más barato ahora; mantiene el riesgo de incidentes | |
| Devolver la lógica de negocio a NestJS; dejar Strapi solo para lo editorial | Más trabajo ahora; elimina un modo de fallo recurrente | <DecisionCheck /> |

Esto aclaró qué tendría que reemplazar realmente una futura reconstrucción.

## Resultado

Al final del trabajo:

- Los releases se volvieron **previsibles y repetibles**.
- Las lecturas y escrituras a SAP se movieron detrás de **una sola frontera de integración**.
- Los despliegues se volvieron **reproducibles**.
- El equipo tenía suficiente estabilidad para volver a planificar con confianza.

Y lo más importante: la recuperación creó las precondiciones para el Acto 2: *reconstruir por decisión, no por pánico.* Mira [*Reconstruir una plataforma de e-commerce en tres meses*](/es/blog/case-studies/retail-ecommerce-rebuild).

## Qué haría distinto hoy

Misma estrategia, menos trabajo de plataforma:

- **Un runtime gestionado** para tener consistencia de cómputo y despliegue.
- **Una cola delante de los eventos que dependen de SAP** para resiliencia y reintentos.
- **Read models** para las lecturas calientes, con SAP como fuente de verdad todavía.
- **Logs, trazas y métricas desde el primer día**, provistos por la plataforma en vez de armados después.
- **Entorno de vista previa por cada PR**, conectado al CI.

---

*Si tu plataforma se siente demasiado riesgosa para publicarla y demasiado costosa para reemplazarla, empieza por la recuperación. Reconstruye después de ganarte el derecho. Con gusto lo hablamos — [escríbeme](/es/contact).*
