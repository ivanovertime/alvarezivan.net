---
locale: "es"
title: "Una aplicación móvil de cotizaciones para ventas en todo el país, integrada con SAP"
date: "2026-05-15"
hidden: true
category: "case-study"
client: "Cliente minorista (LatAm)"
year: 2025
tags:
  - "e-commerce"
  - "integrations"
  - "sap"
type: "greenfield"
stack: ["Laravel", "Filament", "SAP", "Mobile-first PWA", "Docker"]
team_size: 3
role: "Arquitecto y Tech Lead"
outcome_headline: "Reemplacé un flujo de cotizaciones en papel y hojas de cálculo por una aplicación mobile-first desplegada a nivel nacional"
featured: true
ogImage: "/blog/case-studies/retail-sap-quotation-app/featuredImage.jpg"
image: "/blog/case-studies/retail-sap-quotation-app/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
description: >
  Diseñar y entregar una aplicación mobile-first de cotizaciones de venta
  sobre Laravel + Filament, integrada con SAP como fuente de verdad del
  catálogo y los precios, y desplegada a los equipos de venta de todo el país.
---

## TL;DR

- Encargo desde cero: reemplazar un flujo de cotizaciones inconsistente y tolerante a lo offline por una aplicación mobile-first para equipos de venta distribuidos.
- Lideré la arquitectura y llevé a un equipo de 3 a entregar una **aplicación de cotizaciones mobile-first** sobre Laravel + Filament, con SAP como fuente de verdad.
- La aplicación se desplegó al personal de ventas de todo el país y le dio al negocio una vista en tiempo real de la actividad de cotización, junto al flujo existente en SAP.

## Contexto

El cliente tenía equipos de venta por todo el país atendiendo cotizaciones business-to-business y de retail de alto valor. La forma del encargo la reconoce cualquiera que haya digitalizado un proceso de ventas:

- Una superficie de vendedor que tenía que funcionar en un teléfono, dentro de una tienda, con conexión variable.
- Un flujo de cotizaciones cuyo sistema de registro era SAP, con todo lo demás convergiendo hacia él.
- Un negocio que quería una imagen viva de la actividad de cotización, y no solo de lo que terminaba llegando aguas abajo.

El mandato era distinto al de los rescates: este era **desde cero**, pero con una restricción de integración dura. SAP era el sistema de registro y no se iba a mover. Cualquier cosa nueva tenía que enchufarse ahí sin convertirse en otro puente frágil.

## Restricciones

| Restricción | Realidad |
|---|---|
| Tamaño del equipo | 3 ingenieros, conmigo como arquitecto y tech lead |
| Formato | Mobile-first: el personal de ventas trabaja con el teléfono en tienda y en la calle |
| Fuente de verdad | SAP para catálogo, precios, clientes y persistencia de las cotizaciones |
| Conectividad | Sedes de venta con calidad de red variable: la aplicación tenía que degradarse con gracia |
| Despliegue | A nivel nacional, en varios equipos de venta con hábitos distintos |
| Sistemas adyacentes | Los mismos patrones de integración con SAP que había construido para el rescate de e-commerce se podían reutilizar |

Lo no negociable: el vendedor en el piso siempre tenía que poder producir una cotización creíble, incluso con una conexión inestable.

## Decisiones

### Decisión 1 — Laravel + Filament por velocidad de despliegue, no por novedad

La tentación en 2025 era ir a por un stack de moda. La respuesta correcta para un equipo pequeño y una fecha límite nacional era la que pudiéramos entregar.

| Opción | Compensación | Elegí |
|---|---|---|
| Una SPA a medida + un admin propio | Meses de trabajo de UI antes de que el back office pudiera ver algo | |
| Laravel + Filament para el back office; una PWA mobile-first ligera para la superficie del vendedor | Filament da un admin de nivel producción en días; Laravel maneja la integración con SAP limpiamente; el equipo ya conocía el stack | <DecisionCheck /> |

Aburrido a propósito. El presupuesto de novedad se fue a la integración con SAP, no a la elección de framework.

### Decisión 2 — PWA mobile-first, no una aplicación nativa

El mismo razonamiento que en trabajos anteriores con PWA, aplicado con más en juego.

| Opción | Compensación | Elegí |
|---|---|---|
| iOS + Android nativos | El calvario de las tiendas de aplicaciones en cada release; ciclos de build más largos; fragmentación de dispositivos | |
| PWA mobile-first, instalable desde un enlace | El mismo código que el back office; actualizaciones instantáneas; despliegues desacoplados de las tiendas de aplicaciones | <DecisionCheck /> |

Para una herramienta que usan empleados y no clientes, una PWA era la respuesta obvia: menos piezas en movimiento, iteración más rápida y ninguna coreografía de despliegue.

### Decisión 3 — Tratar a SAP como un contrato, no como una dependencia en tiempo de ejecución

SAP era el sistema de registro. No era, sin embargo, rápido ni estaba siempre disponible. Si la aplicación llamaba a SAP de forma síncrona en cada acción, el vendedor en el piso iba a sentir cada hipo de SAP.

| Opción | Compensación | Elegí |
|---|---|---|
| Llamar a SAP de forma síncrona en cada lectura y escritura | El modelo mental más simple; el vendedor queda a merced de SAP | |
| Proyectar el catálogo y los precios de SAP en un almacén propio de la aplicación; encolar las escrituras hacia SAP | Más piezas en movimiento; el vendedor siempre ve un catálogo usable y el sistema tolera caídas de SAP | <DecisionCheck /> |

Este es el patrón que traje del rescate de e-commerce: un único módulo de integración con una interfaz tipada, observable, con reintentos y reemplazable. La aplicación lee de una proyección local y escribe a través del módulo: SAP es el contrato, no el runtime.

### Decisión 4 — Diseñar para conectividad variable desde el primer día

Las sedes de venta no tienen una historia de red uniforme. Tratar lo offline como una excepción significaba que nunca se probaría; tratarlo como el caso por defecto significaba que simplemente funcionaría.

| Opción | Compensación | Elegí |
|---|---|---|
| Dar por sentada la red y añadir lo offline después | Lo offline se vuelve una Fase 2 pospuesta para siempre | |
| Cachear el catálogo localmente, encolar las cotizaciones y sincronizar al volver la conexión | Costo de diseño inicial; la aplicación se comporta igual en el depósito y en una autopista | <DecisionCheck /> |

El resultado de negocio de esta decisión fue simple: un vendedor con mala conexión igual cierra la cotización.

### Decisión 5 — Filament como back office, no como estrategia

Filament abarató la construcción de la superficie de administración. Eso nos permitió gastar el tiempo ahorrado en la integración con SAP y en la experiencia móvil, y no en otro admin a medida.

| Opción | Compensación | Elegí |
|---|---|---|
| Construir un admin propio desde cero | Totalmente a medida, totalmente nuestro, totalmente sin terminar | |
| Apoyarse en Filament para el back office y poner el tiempo de ingeniería en la integración y la UX móvil | El trabajo interesante va donde está el apalancamiento | <DecisionCheck /> |

## Resultado

Al momento del despliegue:

- La aplicación se **desplegó en varias regiones**, cubriendo a varios equipos de venta.
- Las cotizaciones eran **consistentes con el catálogo y los precios de SAP** en el momento de generarse.
- El negocio ganó una **vista en tiempo real de la actividad de cotización**, junto a la vista del SAP de registro.
- El módulo de integración con SAP se volvió un **patrón reutilizable** en las otras plataformas en las que trabajó mi equipo dentro del mismo encargo.

Este fue el build donde el patrón de módulo de integración demostró ser generalizable: escribe la frontera con SAP una vez y reutilízala entre productos.

## Qué haría distinto hoy

El mismo encargo hoy, las mismas restricciones, el mismo SAP. Los instintos de arquitectura no cambiarían; la plataforma debajo sí.

- **Runtime del back office:** el mismo artefacto de Laravel en un runtime de contenedores gestionado, sin trabajo de administración de hosts.
- **Integración con SAP:** mantener el patrón de módulo único. Mover las escrituras a una cola gestionada para que la aplicación nunca se bloquee con SAP, y convertir el módulo de integración en un consumidor de cola con reintentos y una cola de mensajes muertos.
- **Proyección de catálogo y precios:** sincronizar desde SAP hacia un almacén de analítica gestionado y un modelo de lectura caliente. La aplicación móvil lee de la proyección; SAP sigue siendo el sistema de registro.
- **Vista de demanda en tiempo real:** transmitir los eventos de cotización al almacén de analítica y mostrárselos al negocio en un tablero: lo que antes era un efecto secundario on-premise se vuelve un entregable de primera clase.
- **Superficie móvil:** la misma PWA con caché offline vía service workers, opcionalmente envuelta con Capacitor para despliegues por etapas.
- **Entrega:** CI con un entorno de vista previa por cada PR. La misma previsibilidad que nos ganamos a mano, ahora comprada hecha.

La forma del trabajo es la misma que la de los rescates —un framework aburrido, una sola frontera de integración, una superficie offline-first y observabilidad desde el primer día—, pero la plataforma debajo hace la mayor parte del trabajo pesado.

---

*Si tienes un proceso acoplado a SAP que todavía depende de coordinación manual, con gusto comparamos notas sobre cómo podría verse un build pequeño y enfocado. [Escríbeme aquí](/es/contact).*
