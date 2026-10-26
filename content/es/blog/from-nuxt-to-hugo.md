---
locale: "es"
title: "De Nuxt a Hugo y de vuelta"
description: "Por qué migré este sitio de Nuxt 2 a Hugo y después volví a Nuxt: qué cambió, qué se mantuvo y las decisiones que hicieron manejable la reconstrucción."
date: "2024-05-12"
category: "side-project"
minRead: 4
image: "/blog/from-nuxt-to-hugo/featuredImage.png"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
   - "nuxt"
type: "side-project"
stack: ["Hugo", "Nuxt", "Vue", "Tailwind CSS", "Cloudflare Pages"]
repoUrl: "https://github.com/ivanovertime/alvarezivan.net"
team_size: 1
role: "Ingeniero"
year: 2024
outcome_headline: "Aprendí cuándo conviene ir a por lo estático, y el valor de los sistemas de componentes cuando justifican su peso"
featured: false
---
## Situación

### TL;DR

Migré este sitio de Nuxt 2 a Hugo para reducir complejidad y mejorar la velocidad de build (generación estática). Después me di cuenta de que echaba en falta reutilizar componentes y la flexibilidad del contenido, así que volví a Nuxt 4. La lección: entiende las compensaciones entre generación estática y sistemas de componentes, y no sobre-ingenierices hasta que el problema sea real.

### Contexto
Originalmente migré este sitio de Nuxt 2 a Hugo para simplificar un build centrado en contenido y reducir la complejidad en tiempo de ejecución. Después volví a Nuxt para recuperar un sistema de componentes más rico, mejores herramientas de contenido y una capa de UI más flexible.

[Mira el repositorio](https://github.com/ivanovertime/alvarezivan.net)

Este artículo documenta ese ida y vuelta y resalta un objetivo adicional: explorar Cloudflare Pages como destino de hosting, incluyendo los límites de build, el comportamiento de la caché y la ergonomía del despliegue.

## Qué cambió

### Decisiones tomadas

| Decisión | Compensación | Elegí |
|---|---|---|
| Usar Hugo para este sitio | Builds rápidos, despliegue simple; poca reutilización de componentes y poca composición de markdown | (Temporal) |
| Volver a Nuxt 4 + Nuxt Content | Más flexible, mejor para componentes ricos; build algo más pesado; primero componentes en vez de primero estático | <DecisionCheck /> |

### Los cambios
1. **Modelo de contenido**
   - Hugo resultó rápido y ligero para contenido estático, pero el flujo de escritura y la composición de UI eran más limitados de lo que quería.
2. **Estrategia de renderizado**
   - Volver a Nuxt recuperó los layouts dinámicos, la reutilización de componentes y un origen de datos flexible, sin sacrificar el rendimiento estático.
3. **Despliegue y hosting**
   - Cloudflare Pages hizo que los despliegues de vista previa no dieran fricción, con reglas de caché simples y entrega desde el edge que le sentaban bien a un sitio primero estático.

## Tecnologías usadas
- **Frameworks:** Hugo, Nuxt (Vue)
- **Contenido:** Markdown con front matter
- **Estilos:** Tailwind CSS
- **Hosting:** Cloudflare Pages
- **Herramientas:** pnpm, GitHub Actions

> No es DNS <br>
> No puede ser DNS <br>
> Era DNS

¡Suerte con tu migración! Si te topas con un obstáculo, probablemente sea DNS — revísalo igual.

### Resultado

La lección no era Hugo contra Nuxt, sino entender las compensaciones. Hugo era la herramienta correcta para un sitio estático centrado en contenido, cuando el flujo de escritura y el despliegue tenían que ser simples. Después, cuando quise componentes más ricos y un origen de contenido más flexible, el sistema de componentes de Nuxt y Nuxt Content justificaron la complejidad añadida.

El resultado en producción: mejores puntajes de Lighthouse, despliegues de vista previa más simples en Cloudflare Pages, y la libertad de incrustar componentes Vue ricos directamente en markdown cuando tiene sentido. Sin sobre-ingeniería, solo la herramienta correcta en el momento correcto.
