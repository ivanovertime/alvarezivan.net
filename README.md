# Ivan Alvarez — Personal Website

[![Made with Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Personal website of Ivan Alvarez, built with Nuxt 4, Nuxt UI, and Nuxt Content.

## Tech Stack

- Nuxt 4
- Nuxt UI
- Nuxt Content
- Nuxt Image
- Nuxt OG Image
- Motion One (`motion-v`)
- VueUse

## Content Structure

Site content lives in [content/](content/) and is mostly authored as YAML and Markdown.

## Setup

Install dependencies:

```bash
pnpm install
```

## NixOS / Nix Setup (Recommended)

This repository includes a `flake.nix` development shell for reproducible tooling.

### One-time setup

Use `direnv` with `nix-direnv` so the shell auto-loads when entering the repo.

On NixOS, ensure these are available in your system or home configuration:

- `direnv`
- `nix-direnv`

Then allow the project environment:

```bash
direnv allow
```

Without `direnv`, you can enter the same environment manually:

```bash
nix develop
```

### Install and run in the Nix shell

```bash
pnpm install
pnpm dev
```

### Validation commands

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Development

Start the dev server on `http://localhost:3000`:

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm lint:fix
pnpm typecheck
```

## Production

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Cloudflare Pages

This repo is configured to deploy on Cloudflare Pages using Nitro’s `cloudflare_pages` preset.

1. Connect the GitHub repo in Cloudflare Pages.
2. Use these build settings:
	- Framework preset: **Nuxt**
	- Build command: `pnpm install && pnpm build`
	- Build output directory: `.output/public`
3. Deploy.

If you want a different runtime or output, adjust the Nitro preset in [nuxt.config.ts](nuxt.config.ts).

See the Nuxt deployment guide for options and providers: https://nuxt.com/docs/getting-started/deployment
