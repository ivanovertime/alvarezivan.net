---
locale: "es"
title: "Reconstruir una plataforma de e-commerce sobre NestJS + Next.js + Medusa en tres meses"
date: "2026-05-14"
hidden: true
category: "case-study"
client: "Retail Client (LatAm)"
year: 2025
tags:
  - "e-commerce"
  - "nuxt"
type: "greenfield"
stack: ["NestJS", "Next.js", "Medusa", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Plataforma de e-commerce desde cero entregada dentro de la ventana de tres meses, reutilizando la frontera de integración con SAP construida durante la recuperación"
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
  Acto 2 de un trabajo en dos partes: una reconstrucción de tres meses sobre
  NestJS + Next.js + Medusa que funcionó porque la fase de recuperación ya había
  establecido una frontera de integración con SAP estable y un ritmo de releases.
---

> :u-icon{name="i-lucide-paperclip" class="inline mr-1 align-[-2px]"} **Parte de un par.** Este es el Acto 2 (reconstruir cuando toca). El Acto 1 (arreglar primero) es [*Estabilizar una plataforma de e-commerce heredada sobre NestJS + Strapi*](/es/blog/case-studies/retail-ecommerce-recovery).

## TL;DR

- Continuación de [el caso de estudio de recuperación](/es/blog/case-studies/retail-ecommerce-recovery): una plataforma **NestJS + Next.js + Medusa** desde cero, entregada por un equipo de 4 en tres meses.
- Esto solo funcionó porque el Acto 1 ya había restaurado la previsibilidad de los releases y había aislado SAP detrás de un único contrato.
- Reutilizamos ese contrato, mantuvimos Medusa acotado al comercio y planificamos un corte definitivo desde el primer día.

## Situación

- La recuperación ya había hecho la parte difícil: releases previsibles y una frontera estable con SAP.
- Nuevo encargo: entregar un storefront desde cero en tres meses con un equipo de 4.
- Restricciones: SAP seguía siendo el sistema de registro, la continuidad del cliente no era negociable y el corte tenía que ser real.

La decisión clave no era si reconstruir. Era si las condiciones estaban listas. Lo estaban.

## Decisiones

### Decisión 1 — NestJS + Next.js + Medusa, no «lo nuevo que brilla»

Tres meses y cuatro ingenieros no dejaban presupuesto para novedades.

| Opción | Compensación | Elegí |
|---|---|---|
| Elegir un stack de moda pero desconocido | Mayor riesgo de novedad y más tiempo de adaptación | |
| **NestJS + Next.js + Medusa** | Herramientas maduras, adaptación más rápida, piezas reemplazables | <DecisionCheck /> |

Gastamos el presupuesto de riesgo en integración y corte, no en novedad de frameworks.

### Decisión 2 — Reutilizar la frontera de integración con SAP, no reinventarla

La frontera con SAP de la recuperación ya tenía un contrato probado. La reutilizamos.

| Opción | Compensación | Elegí |
|---|---|---|
| Construir una integración nueva con SAP desde cero | Mantenimiento duplicado y más riesgo de doble operación | |
| Reutilizar el contrato de la frontera de recuperación en el stack nuevo | Exige un trabajo de recuperación limpio; gran retorno en velocidad y seguridad | <DecisionCheck /> |

Este fue el retorno del Acto 1: la frontera de integración se volvió un activo, no un costo hundido. El mismo patrón aparece en la [aplicación de cotizaciones sobre SAP](/es/blog/case-studies/retail-sap-quotation-app).

### Decisión 3 — Medusa como motor de comercio, no como CMS

Evitamos repetir la deriva anterior de «una herramienta para todo».

| Opción | Compensación | Elegí |
|---|---|---|
| Estirar Medusa hacia CMS y lógica de negocio | Acoplamiento y fricción en los releases | |
| Mantener Medusa solo para comercio; separar lo editorial; dejar SAP como fuente de verdad | Propiedad clara y piezas reemplazables | <DecisionCheck /> |

Regla: una frontera por sistema externo, una herramienta por trabajo.

### Decisión 4 — Corte, no operación en paralelo para siempre

Tres meses significaban que no había doble operación indefinida.

| Opción | Compensación | Elegí |
|---|---|---|
| Lanzamiento suave y operación en paralelo sin fecha de cierre | Aplaza el riesgo y duplica el costo operativo | |
| Planificar un corte definitivo desde el primer día | Fuerza un alcance honesto y una fecha real de entrega | <DecisionCheck /> |

Mismo SAP, mismas superficies de pago, cambio de sistema programado.

## Resultado

Al cabo de tres meses:

- La nueva plataforma **NestJS + Next.js + Medusa** salió dentro de la ventana objetivo.
- La **frontera con SAP de la recuperación** se reutilizó y quedó validada por un segundo consumidor.
- El corte preservó la continuidad del cliente sin una doble operación extendida.

Lección central: **arreglar primero, reconstruir cuando las condiciones estén listas**. La recuperación se ganó este calendario.

## Qué haría distinto hoy

Misma estrategia, ejecución más rápida:

- **Runtime gestionado** para el backend y el storefront, con corte blue-green desde el diseño.
- **Una cola para el buffering y los reintentos de eventos de SAP** en vez de polling ad hoc.
- **Read models y un destino de analítica gestionado** en vez de proyecciones hechas a mano.
- **Logs, trazas y reporte de errores desde la primera semana**, integrados en la plataforma y no añadidos después.
- **Entorno de vista previa por cada PR**, conectado al CI.

---

*Si estás planeando una reconstrucción seria de e-commerce, primero asegúrate de que existan las precondiciones. Si existen, tres meses pueden alcanzar. Con gusto lo hablamos — [escríbeme](/es/contact).*
