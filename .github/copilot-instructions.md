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

## NDA-Safe Content Rules

When writing or editing public-facing content in `content/` (especially case studies, about pages, and marketing copy), default to NDA-safe wording unless the user explicitly provides written approval to publish client specifics.

- Do not include real client names, legal entities, direct identifiers, or external client URLs.
- Do not include exact  metrics (for example user counts, revenue, GMV, conversion, incident counts, release frequency, or SLA figures).
- Do not disclose internal operational states or negative characterizations of client systems, teams, vendors, or incidents.
- Do not expose internal architecture specifics that can reveal proprietary implementation details, security posture, or integration internals.
- Prefer anonymized descriptors (for example `regional retailer`, `enterprise client`, `high-volume platform`) and qualitative outcomes (`improved reliability`, `predictable release cadence`).
- Keep content focused on reusable patterns, technical trade-offs, and lessons learned rather than client-specific state.

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