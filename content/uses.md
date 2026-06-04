---
locale: en
title: "Uses"
description: "The hardware, OS, and software I actually use day to day."
---

# Uses

What I actually use to ship software — hardware, OS, editor, terminal, and the cloud tooling that comes up most often. The real source of truth is [my NixOS configuration](https://github.com/ivanovertime/nixos).

_Last updated: May 15, 2026._

## Hardware

### Lenovo V15 G4 ABP — daily driver
- CPU: AMD Ryzen 7 7730U (16 threads) with Radeon Graphics
- Memory: 16GB
- Disk: 256GB
- OS: NixOS 25.11 (Xantusia), GNOME 49 on Wayland, kernel 6.12

### ASUS N550LF — Proxmox node
- Joined to the homelab cluster as a worker node
- CPU: Intel i7-4500U (4 threads) @ 3.00GHz
- GPU: NVIDIA GeForce GT 745M
- Memory: 16GB

### HP ProDesk — homelab
- Proxmox VE 8
  - Ubuntu Server as the control plane for self-hosted services
  - Windows Server 2019 for workloads that require Windows
- CPU: Intel i5-4570 (4 threads) @ 3.20GHz
- Memory: 32GB

<!--
## Desk & peripherals

TODO: fill in or delete the rows you don't use.
- **Monitor:** TODO
- **Keyboard:** TODO
- **Mouse / trackpad:** TODO
- **Headphones:** TODO
- **Microphone:** TODO
- **Webcam:** TODO
- **Chair / desk:** TODO
-->

## OS & shell

- **OS:** NixOS 25.11 (Xantusia) — declarative system config, fully reproducible. Everything below that's installed on the machine lives in the [dotfiles repo](https://github.com/ivanovertime/nixos).
- **Desktop:** GNOME 49 on Wayland.
<!--
- **Shell:** TODO (e.g. zsh / fish / nushell)
- **Terminal:** TODO (e.g. GNOME Terminal / Alacritty / Kitty / Ghostty)
- **Prompt:** TODO (e.g. starship)
- **Multiplexer:** TODO (tmux / zellij — or skip if you don't use one)
-->

## Editor

- **VS Code** — primary editor.
- **Notes / PKM:** Obsidian.
<!--
- **Theme / font:** TODO (e.g. One Dark Pro · JetBrains Mono)
- **Extensions I actually rely on:**
  - TODO — e.g. Vue (Volar), ESLint, GitLens, Docker, Remote – SSH, Nix IDE, Tailwind CSS IntelliSense, GitHub Copilot
- **Notes / PKM sync:** TODO
-->

<!--
## Browser & daily apps

- **Browser:** TODO (e.g. Firefox / Zen / Chrome) with TODO extensions (uBlock Origin, 1Password/Bitwarden, …)
- **Email & calendar:** TODO
- **Comms:** TODO (Slack / Discord / Telegram / WhatsApp)
- **Design / quick diagrams:** TODO (Excalidraw, Figma, …)
-->

What I reach for from the terminal, beyond the editor:

- **Languages & runtimes:** Node.js (via `pnpm` / `corepack`), PHP, Python — pinned per-project through Nix flakes when it matters.
- **Package managers:** `pnpm`, `composer`, `nix`.
- **Containers & orchestration:** `docker`, `docker compose`, `kubectl`, `helm`.
- **Cloud CLIs:** `gcloud` (current focus), `wrangler` (Cloudflare Pages / Workers).
- **Version control:** Git, with the GitHub CLI (`gh`) for PR/issue work.
<!--
- **Database clients:** TODO (e.g. `psql`, DBeaver, TablePlus)
- **HTTP / API testing:** TODO (e.g. `curl`, HTTPie, Bruno, Insomnia)
-->

## Hosting & CI

- **Self-hosted:** Coolify and Portainer on the homelab Proxmox cluster.
- **Static / edge:** Cloudflare Pages (this site runs on it).
- **CI/CD:** GitHub Actions.

## Source of truth

If a tool isn't listed here but you spot it in a screencast or screenshot, it's almost certainly defined in [github.com/ivanovertime/nixos](https://github.com/ivanovertime/nixos) — that repo is the canonical "what's on my machine".
