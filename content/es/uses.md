---
locale: es
title: "Qué uso"
description: "El hardware, sistema operativo y herramientas de software que uso en mi día a día."
---

# Qué uso

Las herramientas y equipos que utilizo para construir y desplegar software: hardware, sistema operativo, editor, terminal y la infraestructura cloud más frecuente. La fuente de verdad definitiva es [mi configuración declarativa de NixOS](https://github.com/ivanovertime/nixos).

_Última actualización: 15 de mayo de 2026._

## Hardware

### Lenovo V15 G4 ABP — equipo principal
- CPU: AMD Ryzen 7 7730U (16 hilos) con gráficos Radeon
- Memoria: 16GB
- Disco: 256GB
- SO: NixOS 25.11 (Xantusia), GNOME 49 sobre Wayland, kernel 6.12

### ASUS N550LF — nodo Proxmox
- Integrado al cluster homelab como nodo de cómputo
- CPU: Intel i7-4500U (4 hilos) @ 3.00GHz
- GPU: NVIDIA GeForce GT 745M
- Memoria: 16GB

### HP ProDesk — homelab
- Proxmox VE 8
  - Ubuntu Server como plano de control para servicios autoalojados
  - Windows Server 2019 para cargas que requieren Windows
- CPU: Intel i5-4570 (4 hilos) @ 3.20GHz
- Memoria: 32GB

## Sistema operativo y entorno

- **SO:** NixOS 25.11 (Xantusia) — configuración del sistema declarativa y completamente reproducible. Todo lo instalado en el equipo vive en mi [repositorio de dotfiles](https://github.com/ivanovertime/nixos).
- **Escritorio:** GNOME 49 sobre Wayland.

## Editor

- **VS Code** — editor principal.
- **Notas y gestión de conocimiento:** Obsidian.

## Terminal y herramientas CLI

Lo que utilizo desde la línea de comandos en el día a día:

- **Lenguajes y runtimes:** Node.js (vía `pnpm` / `corepack`), PHP, Python — fijados por proyecto mediante Nix flakes según se requiera.
- **Gestores de paquetes:** `pnpm`, `composer`, `nix`.
- **Contenedores y orquestación:** `docker`, `docker compose`, `kubectl`, `helm`.
- **CLIs de infraestructura:** `wrangler` (Cloudflare Pages y Workers).
- **Control de versiones:** Git, junto con GitHub CLI (`gh`) para pull requests e incidencias.

## Hosting y CI/CD

- **Autoalojado:** Coolify y Portainer en el cluster Proxmox del homelab.
- **Estático y Edge:** Cloudflare Pages (este sitio corre sobre esta plataforma).
- **CI/CD:** GitHub Actions.

## Fuente de verdad

Si alguna herramienta no aparece en esta lista pero la ves en alguna captura o screencast, casi con total seguridad está definida en [github.com/ivanovertime/nixos](https://github.com/ivanovertime/nixos), que funciona como el registro canónico de mi configuración.
