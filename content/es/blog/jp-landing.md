---
locale: "es"
title: "Jhey Pi: un sitio oficial para un músico que está empezando"
description: "Sitio oficial de Jhey Pi, construido con Nuxt 4 y Nuxt UI para combinar los lanzamientos de Spotify y los videos de YouTube en un solo feed."
date: "2026-05-18"
category: "side-project"
minRead: 3
image: "/projects/jp-landing.png"
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
stack: ["Nuxt", "Vue", "Tailwind CSS"]
repoUrl: "https://github.com/ivanovertime/jp-landing"
team_size: 1
role: "Ingeniero"
year: 2026
outcome_headline: "Publiqué un sitio de artista enfocado, con un solo feed para las novedades musicales y el contenido en video"
featured: false
---
## TL;DR

Jhey Pi es el sitio oficial de un músico que está empezando. Lo construí para tener la historia del artista, los lanzamientos de Spotify y los videos de YouTube en un mismo lugar, con un feed simple que se lee rápido.

## Contexto

El objetivo era hacer un sitio que se sintiera como una casa de verdad para el artista, no como otra página promocional más. El sitio lleva los últimos lanzamientos de Spotify y los videos de YouTube a un solo feed, así el contenido se mantiene al día sin convertir la página en una tarea manual.

## Restricciones

- Mantener la experiencia ligera y fácil de actualizar.
- Unir los lanzamientos de Spotify, los datos del perfil del artista y los videos de YouTube en un solo feed.
- Soportar contenido bilingüe sin que la página se sienta saturada.

## Decisiones

| Decisión | Compensación | Elegí |
|---|---|---|
| Construir un sitio promocional tradicional con páginas separadas para música y video | Más espacio para el contenido, pero más difícil de mantener al día | |
| Construir un solo sitio con un feed unificado y ordenado automáticamente | Más fácil de leer y de mantener; el artista actualiza en un solo lugar | <DecisionCheck /> |
| Mantener el contenido en un solo idioma | Más simple, pero con menos alcance para un público bilingüe | |
| Soportar contenido ES/EN | Encaja mejor con el público, con un poco más de trabajo de contenido | <DecisionCheck /> |

## Resultado

El proyecto terminó como un sitio limpio para Jhey Pi, con un solo feed de contenido, los datos del perfil del artista y espacio para contenido bilingüe. También simplificó el flujo de actualización: los lanzamientos y videos nuevos pueden aparecer sin tener que reescribir toda la página.

En cuanto a funcionalidad, las piezas útiles fueron:

- Lanzamientos de Spotify y perfil del artista vía la API de Spotify.
- Últimos videos de YouTube vía el feed del canal.
- Feed ordenado automáticamente y paginado, con embeds.
- Contenido bilingüe en ES/EN.
- Caché ISR para el endpoint del feed.

## Qué haría distinto hoy

Si esto tuviera que escalar más, mantendría el endpoint del feed con caché al estilo ISR, movería las integraciones detrás de una capa de servidor pequeña, y alojaría el front end en una plataforma de edge gestionada, con despliegues de vista previa por cada pull request.
