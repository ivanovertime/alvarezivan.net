# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — hiring managers and technical recruiters** sourcing senior and lead full-stack, platform,
and DevOps people, remote-first. They arrive with roughly one minute of patience, from a LinkedIn
profile, a referral, or a search result. Their job is to answer one question fast: *is this person
credible enough to put in front of a hiring loop?* They want evidence of scope (team sizes, systems
owned, decisions made), not a technology list.

**Secondary — clients and founders** who need a platform built, rescued, or audited. They arrive
warmer and read further: the case studies, `/uses`, and the "what I'm open to" block on `/contact`.
Their job is to decide whether to book a 30-minute call.

Hiring leads when the two audiences compete for the same space; client-facing content stays real and
complete but does not drive the primary structure.

## Product Purpose

`alvarezivan.net` is the personal site and identity artifact for Iván Álvarez, a senior full-stack
engineer based in Valencia, Carabobo, Venezuela (VET, UTC−4). It publishes his positioning, work
history, case studies, and writing, and gives both audiences a single unambiguous way to start a
conversation.

It exists because the alternative is renting a profile from LinkedIn: the site owns the canonical
version of his story, carries proof that a profile page cannot (full case studies, stack depth,
working code), and is a durable asset he controls.

Success is contact from the right people — a booked call, an inbound project brief, or an interview
— earned by making the credibility check quick and the evidence hard to dismiss. Traffic alone is
not the goal.

## Positioning

The site tells **one arc: rescue, then build.**

- **Rescue (the proof):** four years recovering platforms under pressure — e-commerce stores under
  load, SAP integrations with missing documentation, deploys nobody trusted. Teams from solo to
  around 15 engineers.
- **Build (the current chapter):** internal platforms, back offices, and design systems — the
  tooling teams run on. Svelte, Laravel, Cloudflare. Current role is JuegaEnLínea (Aug 2026 –
  present).

The arc is the differentiator. A generic "senior full-stack engineer" claim is copyable; a
documented record of arriving at a struggling system, making specific calls, and handing back
something the team can run is not. The recovery years are evidence, not nostalgia, and they are what
makes the platform-building work credible rather than aspirational.

**Stale positioning, do not restore.** `docs/brand-strategy.md` and `docs/personal-site-plan.md`
still push a "GCP & DataOps, cloud-native evolution" story and a `/case-studies/` URL structure.
Both are superseded by the live site. Treat those docs as historical thinking; the shipped copy and
`content/` are the source of truth.

## Operating Context

- **Editing model:** content lives in `content/` as YAML and Markdown and is edited directly by the
  site owner. New work is usually a focused iteration on an existing page, not a greenfield build.
  `docs/personal-site-plan.md` records the standing principle: *iterate, don't rebuild*.
- **Two locales:** English is the default at `/`, Spanish is prefixed under `/es`. Locale strategy is
  `prefix_except_default` with browser detection off.
- **Deployment:** static, prerendered, served on Cloudflare Pages via Nitro's `cloudflare_pages`
  preset. OG images are generated at build time only (`zeroRuntime: true`) because the Cloudflare
  edge lacks `node:stream`.
- **Release discipline:** a check runs through `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
  NixOS users get a `flake.nix` dev shell; `direnv allow` activates it.
- **Identity consistency:** one headshot (`public/avatar.jpg`) is used across LinkedIn, GitHub, and
  the site. That is a deliberate commitment, not an accident of assets.
- **Analytics:** Google Analytics 4 (`G-*`) plus `data-analytics-*` attributes on CTAs and nav links,
  so conversions are attributable per placement.

## Capabilities and Constraints

**Shipped:** home with hero/tabs/case-study row/article list, `/about` (story + timeline), `/blog`
index and detail pages with tag filtering, four published case studies, `/now`, `/uses`, `/contact`
with a calendar CTA and an explicit negative-qualifier block, RSS feed, sitemap, per-page OG images,
and global JSON-LD (`Person`, `WebSite`, `WebPage`; `Article` on posts).

**Stack (as built):** Nuxt 4, Vue 3 + TypeScript, Nuxt UI (Tailwind v4), Nuxt Content for content
collections, Nuxt Image, `nuxt-og-image` for social cards, `motion-v` for entrance motion,
`nuxt-schema-org` for structured data, `@nuxtjs/i18n` for locale routing.

**Constraints:**

- **Two live clients stay anonymous.** Daka and the supermarket client appear as `Retail Client
  (LatAm)` and `Supermarket Client (LatAm)`, and on Spanish pages as `Cliente minorista (LatAm)` and
  `Cliente de supermercados (LatAm)`. Their case studies ship without names. Do not invent client
  names, logos, or quotes.
- **No fabricated proof.** No testimonials exist (`testimonials: []` in `content/home.yml`), so none
  may be rendered. Same for metrics that were never measured.
- **Availability is a real, current signal.** Both roles and project work are on offer right now.
  Do not soften or strengthen it beyond what `/contact` states.
- **Bilingual parity is the standing goal.** `content/es/` mirrors the page shells (home, about,
  blog index, contact, now, uses) and all 12 blog posts and case studies, with the same slugs, dates
  and hidden flags. New UI must not *assume* an ES body exists behind an ES route, but any new page
  or post is expected to ship in both locales.
- **Audience fit is policed on purpose.** `/contact` states what is *not* a fit (junior/mid IC work,
  WordPress/Wix/no-code builds, management without technical work). That bluntness is intentional.

**Open decisions (not yet settled):**

- Pillar/filter UX on `/blog` is planned but unbuilt.
- A Lighthouse performance gate is discussed but not documented or enforced.
- The LinkedIn mirror workflow for long-form posts is not implemented.
- `docs/brand-strategy.md` contradicts shipped positioning and has not been rewritten or retired.

## Brand Commitments

- **Brand mark:** "Ivan Over Time" — the wordmark in the footer, the title template
  (`%s - Ivan Over Time`), the OG site name, the RSS feed title, and the web manifest name.
- **Display name:** "Iván Álvarez", accent included. "Ivan Alvarez" is acceptable only as the
  unaccented alias.
- **Canonical domain:** `alvarezivan.net`. `alvarezivan.net.ve` is owned and 301-redirects to it.
- **Contact:** `alvarezlopezivanenrique@gmail.com`, LinkedIn `linkedin.com/in/ialvarez93`, GitHub
  `github.com/ivanovertime`, booking via Google Calendar.
- **Voice:** warm and outcome-focused, first person, plain language. "Rescue" and "recovery" are
  context, never bravado. The copy is deliberately unsalesy — it states situations and results, and
  it is comfortable saying no.
- **Personality beyond engineering:** cinema, cooking, and languages (Japanese, Portuguese) appear on
  `/about` on purpose. That human layer is part of the identity and should not be cleaned away.

## Evidence on Hand

- **Four published case studies** under `content/blog/case-studies/`: the retail e-commerce pair
  (`retail-ecommerce-recovery`, `retail-ecommerce-rebuild`), `supermarket-pwa-recovery`,
  `retail-sap-quotation-app`, and `semantichelp-rag-knowledge-base`. All are anonymized where
  required by client agreements.
- **Eight further posts** across engineering decisions and side projects, including
  `from-nuxt-to-hugo`, `bcv-scraper`, `chronocal`, and `jp-landing`.
- **Real work history** with five dated roles: JuegaEnLínea, Crazy Imagine Software, Tiendas Daka
  C.A., freelance, and Biomercados (Alimentos FM), each with a company link.
- **Downloadable CVs** in both languages at `public/files/cv/`.
- **Real imagery:** headshot (`public/avatar.jpg`), hero image (`public/hero/full-stacked.jpg`),
  project screenshots, and a logo (`public/logo.svg`).
- **Live product references:** linked external sites (JuegaEnLínea, Crazy Imagine, Tiendas Daka) and
  a running SaaS product (Semantichelp).
- **Absences to respect:** no testimonials, no client logos, no press mentions, no benchmark numbers,
  and no user counts beyond what individual posts already state. Do not manufacture any of them.

## Product Principles

1. **Credibility over volume.** Every claim should be checkable. A reader should be able to trace a
   statement to a specific role, project, or artifact.
2. **The minute is the budget.** A hiring manager decides in about a minute. Structure the first
   viewport to answer scope and fit, and let depth live one click away.
3. **Iterate, don't rebuild.** The site already works and has shipped content. Prefer focused,
   reversible changes over rewrites, and never discard working structure for novelty.
4. **One arc, not two.** Rescue and platform-building are chapters of the same story. Content that
   makes them read as separate careers is off-message.
5. **Say the uncomfortable thing.** Anonymized clients, missing testimonials, and "this might not be
   a fit" are stated plainly rather than papered over. Honesty is the differentiator.
6. **Preserve the human layer.** The non-work interests and the specific, unfashionable tool choices
   are part of what makes the site memorable. Do not genericize them.

## Accessibility & Inclusion

No formal standard is documented or enforced in the repo. The site is built on Nuxt UI's accessible
component primitives (keyboard-navigable menu, focus-visible states on interactive elements) and
ships a light/dark color mode toggle, but there is no stated WCAG target and no a11y test in the
check pipeline. Content is published in English and Spanish.
