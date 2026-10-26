---
locale: "es"
title: "ChronoCal: registro de tiempo dentro de Google Calendar"
description: "Un complemento de Google Calendar construido con Apps Script que registra el tiempo real dedicado a los eventos directamente en Google Workspace: sin backend externo, sin almacenamiento de terceros y sin depender de un temporizador en el navegador."
date: "2026-06-15"
category: "side-project"
minRead: 6
image: "/blog/chronocal/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
  - "google-workspace"
type: "side-project"
stack: ["Google Apps Script", "JavaScript", "Google Calendar API", "Google Sheets API"]
repoUrl: "https://github.com/ivanovertime/ChronoCal"
team_size: 1
role: "Ingeniero"
year: 2026
outcome_headline: "Publiqué un MVP funcional que lleva el registro de tiempo en tiempo real directamente a Google Calendar, sin infraestructura externa"
featured: false
---

## Situación

Como parte de un esfuerzo continuo por simplificar mi entorno de desarrollo y aprovechar las soluciones de Google todo lo posible —incluida la migración de Outlook a Google Calendar mientras paso a NixOS— necesitaba una solución de registro de tiempo que viviera por completo dentro de Google Workspace.

Si vives en Google Workspace (Calendar, Drive, Meet), cambiar de aplicación para registrar tiempo sobre eventos del calendario genera fricción. Ya estás en Calendar organizando tu día, ¿por qué salir de ahí para arrancar un temporizador?

La mayoría de las soluciones de registro de tiempo exigen una de estas cosas:
- Una aplicación aparte que tienes que acordarte de abrir
- Un servicio de backend para persistir el estado
- Una integración de terceros que añade complejidad de OAuth
- Un temporizador en el navegador que depende de que la pestaña siga activa

## Problema

Los eventos del calendario ya son una fuente de verdad fiable sobre a qué dedicas tu tiempo. ¿Y si pudieras...
- Iniciar, pausar y detener el registro directamente desde la tarjeta del evento en Calendar
- Mantener el estado en Apps Script UserProperties (sin necesidad de backend)
- Escribir opcionalmente la duración registrada de vuelta en la descripción del evento
- Exportar las sesiones a Google Sheets para reportes o análisis

## Solución: ChronoCal

ChronoCal es un complemento de Google Calendar construido enteramente con Google Apps Script. Ofrece:

### Funcionalidad principal

**Registro dentro del evento**
- Abre cualquier evento del calendario en Calendar de escritorio y aparece una tarjeta contextual
- Botones para iniciar, pausar, reanudar y detener el registro desde la propia tarjeta
- El estado de la sesión persiste usando Apps Script UserProperties: sobrevive a recargar el navegador y a cerrar la pestaña

**Estados de sesión flexibles**
- En marcha: el temporizador está registrando activamente
- En pausa: detenido pero sin cerrar
- Detenido: sesión cerrada, lista para exportar

**Integración con la descripción del evento**
- Opción para escribir la duración final registrada directamente en las descripciones de los eventos
- Maneja correctamente las instancias de eventos recurrentes
- Resuelve el evento en todos los calendarios de tu cuenta de Google

**Exportación a Google Sheets**
- Exporta las sesiones completadas a una hoja de Google Sheets para reportes, facturación o análisis
- Configuración mínima: el complemento puede crear la hoja o agregar filas a una existente

### Enfoque técnico

La implementación está repartida en seis módulos principales:

```
src/
├── main.gs           # Entry point and onOpen handler
├── cards.gs          # Card UI construction and button handlers
├── session.gs        # Session state management and timing logic
├── calendar.gs       # Calendar API interactions and event resolution
├── sheets.gs         # Google Sheets export logic
└── config.gs         # Configuration constants and toggles
```

**Sin backend externo**
Todo corre dentro de Google Apps Script. Las UserProperties guardan el estado de la sesión, así que se mantiene entre sesiones de navegador y entre pestañas.

**Minimización de permisos OAuth**
El manifiesto declara únicamente los permisos de Calendar (lectura y escritura), Sheets y ejecución del complemento de Calendar. Sin llamadas a APIs externas ni almacenamiento de terceros.

**Resolución de eventos**
Maneja correctamente los eventos recurrentes y la resolución de calendarios, así puedes registrar tiempo sobre el mismo evento en varios calendarios sin duplicarlo.

## Por qué este enfoque

La fricción del registro de tiempo tradicional viene de cambiar de contexto. Si ya estás en Google Calendar (donde está la mayoría de la gente que trabaja con conocimiento), disparar un temporizador desde la tarjeta del evento elimina un paso.

Apps Script es ideal para esto porque:
- Acceso nativo a Calendar y Sheets sin APIs adicionales
- Las UserProperties dan estado persistente del lado del cliente
- Las tarjetas contextuales se integran directamente en la interfaz de Calendar
- Cero infraestructura: no hay servidores que mantener ni bases de datos que respaldar
- Integración estrecha con Google Workspace

## Estado actual

ChronoCal es un MVP funcional con flujos de pausa y reanudación y de exportación a Sheets. La evolución prevista incluye:
- Atajos de teclado para un acceso más rápido
- Opciones de exportación de sesiones en bloque
- Integración con otras aplicaciones de Workspace (Gmail, Tasks)
- Panel de analítica dentro de Sheets
- Gestión de estado más granular (por ejemplo, notas de sesión, códigos de facturación)

## Desarrollo y despliegue

El repositorio incluye un flujo de despliegue completo con `clasp` (la CLI de Google Apps Script). Los requisitos previos son mínimos:
- Node.js y npm
- Una cuenta de Google con acceso a Apps Script
- Opcional: Nix + direnv (los archivos del entorno de desarrollo están incluidos)

```bash
direnv allow
npx @google/clasp login
npx @google/clasp create --type standalone --title "ChronoCal" --rootDir .
npx @google/clasp push
npx @google/clasp open
```

El proyecto también incluye guías de contribución, plantillas de PR y plantillas de issues para colaboradores.

## Conclusión clave

ChronoCal demuestra que las herramientas de productividad potentes no necesitan infraestructura compleja. Aprovechando Google Apps Script y las UserProperties, puedes construir un sistema de registro que vive dentro de la herramienta que ya usas todos los días —Calendar— sin añadir carga operativa ni dudas sobre la privacidad.

Si usas Google Workspace y te encuentras saltando constantemente entre Calendar y algún registro de tiempo, pruébalo: [github.com/ivanovertime/ChronoCal](https://github.com/ivanovertime/ChronoCal)

---

**Atribución de imagen:** la imagen destacada viene de Outlook. Foto de <a href="https://unsplash.com/@edhardie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ed Hardie</a> en <a href="https://unsplash.com/photos/a-computer-screen-with-a-calendar-on-it-4BnNnEtAGP0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
