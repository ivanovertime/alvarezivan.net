# Copilot Instructions for alvarezivan.net

This repository is a Nuxt 4 personal site built with TypeScript, Nuxt UI, and Nuxt Content.

## Stack and Structure

- Framework and app code live in `app/`.
- Routes live in `app/pages/`.
- Shared UI components live in `app/components/`.
- Utilities live in `app/utils/`.
- Site content lives in `content/`.
- Structured content uses `.yml`; long-form content uses `.md`.
- Global styles live in `app/assets/css/main.css`.
- Main config files are `nuxt.config.ts`, `eslint.config.mjs`, and `tsconfig.json`.

## Coding Preferences

- Prefer TypeScript with `script setup` and Nuxt Composition API patterns.
- Keep components, pages, and queries simple and readable.
- Prefer small, focused changes over broad refactors.
- Reuse existing Nuxt UI components and established page patterns before introducing new abstractions.
- Preserve existing content schema, field names, and file organization in `content/`.
- Follow the current ESLint and stylistic conventions.
- Avoid introducing new dependencies unless they are clearly necessary.
- Remove unused imports, variables, and dead code when touching a file.

## Validation Before Finishing

Run these commands when making code changes:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

If the change affects routes, content queries, or generated pages, make sure `pnpm build` still succeeds.

## Git Workflow

- Always use Conventional Commits for commit messages.
- Before committing, review changes with `git status` and `git diff --staged`.
- Group related changes in a single commit and keep commit scope focused.

## Deployment Notes

- Nitro target is Cloudflare Pages (`cloudflare_pages`).
- Avoid changes that break static prerendering for public routes.
- Be careful with runtime-only or Node-specific APIs because Cloudflare Pages compatibility matters.