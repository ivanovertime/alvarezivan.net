# Personal Site Modification Plan — alvarezivan.net

Status: **Working doc v4**, updated May 2026. Tracks current state and next steps.
Live site: https://alvarezivan.net (Nuxt 4 + Vue 3 + TS + Nuxt UI + Tailwind, Cloudflare Pages).
Aligned with `brand-strategy.md` and `linkedin-profile-draft.md`.

> **Principle:** the site already exists, has personality, has shipped content, and uses a stack that matches the brand. Don't rebuild — iterate with small, focused improvements.

## Progress snapshot (May 2026)

Completed:
- Core tone pass across home/about/now/contact and case studies (warmer, less sales-heavy language).
- `/now`, `/uses`, and `/contact` are live and linked from navigation/footer as intended.
- Four case studies are published: the  Retail Client e-commerce **pair** (`retail-ecommerce-recovery` + `retail-ecommerce-rebuild`), `supermarket-pwa-recovery`, and `retail-sap-quotation-app`.
- Open Graph generation is wired with `nuxt-og-image`, with a local template override.
- JSON-LD is live via `nuxt-schema-org` (`Person`/`WebSite`/`WebPage` globally and `Article` on blog detail pages).

Still pending:
- Pillar-filter UX on existing routes (`/blog` with case-study filtering).
- Lighthouse score gate documentation and verification.

---

## 0. Canonical values (locked)

| Field | Canonical value | Notes |
|---|---|---|
| Primary domain | `alvarezivan.net` | Main site. |
| Secondary domain | `alvarezivan.net.ve` | Owned; 301-redirect to `alvarezivan.net`. |
| Email (work / public) | `alvarezlopezivanenrique@gmail.com` | Used on site, LinkedIn, CV. |
| LinkedIn slug | `ialvarez93` | URL: `linkedin.com/in/ialvarez93`. |
| Display name | "Iván Álvarez" | Accented form on the site. "Ivan Alvarez" acceptable as the unaccented LinkedIn alias. |
| Brand mark | "Ivan Over Time" | Wordmark in the footer. Keep messaging warm and outcome-focused, with "rescue/recovery" used as context rather than bravado. |

All other docs in this folder have been updated to match these values.

---

## 1. Strategic gap analysis

What the site does well today (don't touch):
- Clean Nuxt build, fast, mobile-friendly.
- "What I do and how I work" tabs are a strong, opinionated section.
- Personal voice (cinema, Japanese, cooking) on `/about` — humanizes the engineer.
- Existing blog posts are real and senior-signal (Nuxt→Hugo decision post, BCV scraper).
- Calendar booking link already wired to a single CTA.

What's still missing for the current positioning:
1. **Case-study index UX is still thin.** We have the content, but pillar chips/filtering are not surfaced yet.
2. **Lighthouse gates are not documented/run as a release gate.**
3. **Pillar taxonomy is not fully surfaced in the UI yet.**
4. **LinkedIn mirror workflow is not implemented yet.**

---

## 2. Edits, page by page

## 2.1 Home (`/`)

Current status:
- Hero and supporting copy have already been updated to the warmer positioning.
- Footer includes persistent discoverability links (`/contact`, `/uses`).
- Remaining home work is optional polish (featured case-study row, pillar chips if we add them site-wide).

Keep the existing avatar and the GitHub/LinkedIn icons.

**Add a new "Featured Case Studies" section** between hero and "What I do":
- 3 cards. Same component as current Latest Articles, different data source.
- First entries:  Retail Client e-commerce rescue ·  Supermarket Client PWA ·  Retail Client SAP quotation app.

**Keep "What I do and how I work" tabs**, but:
- Reorder tabs so the senior-signal ones lead: `Tech Skills` → `Pricing & Timelines` → `Uses` → `Languages`.
- Inside `Tech Skills`, reorder groups to match the brand pillars: `Cloud & DevOps` first, then `Backend`, `Frontend`, `Databases`, `E-commerce & CMS`, `Integrations`.

**Work Experience timeline:** keep, but rewrite each entry's one-liner to match the LinkedIn draft:
- Crazy Imagine — *Building unified support + KB tooling on Laravel/Vue/Inertia.*
-  Retail Client (LatAm) — *Led 15 engineers and 6+ rescues across e-commerce, mobile, and SAP.*
- Freelance — *Restored multi-tenant CS-Cart and modernized WooCommerce/Nuxt stores.*
-  Supermarket Client — *Recovered a stalled e-commerce project; shipped PWA + apps to high-volume users.*

**Latest Articles:** keep as-is. Existing posts already align well.

---

### 2.2 Case studies discovery (via `/blog`)

Don't delete the existing 3 projects; reclassify and add to them.

**Decision (May 2026):** keep case studies under `/blog` and do **not** add `/projects` or `/case-studies` routes/nav shortcuts.

**Add filter chips by pillar:** `Platform & DevOps · GCP & DataOps · Full-Stack Architecture · AI-Augmented · Side Project`.

**Tag existing entries:**
- JP Landing → `Side Project` + `Full-Stack Architecture`
- From Nuxt to Hugo and Back → `Side Project`
- BCV Scraper → `Side Project` + `Full-Stack Architecture`

**Add new case studies (in priority order):**
1. ** Retail Client — Rescuing a NestJS + Strapi e-commerce platform** *(Full-Stack Architecture)*
2. ** Supermarket Client — Shipping a high-scale PWA from a stalled project** *(Platform & DevOps)*
3. ** Retail Client — Nationwide mobile sales-quotation app with SAP** *(Full-Stack Architecture)*
4. **Crazy Imagine — Support + Knowledge Base on Laravel/Vue/Inertia** *(Full-Stack Architecture)*
5. **Freelance — Restoring a multi-tenant CS-Cart deployment** *(Full-Stack Architecture)*

**Case-study template** (apply to all new ones; backfill existing ones in v2):

```
1. TL;DR             — 3 bullets, < 60 words
2. Context           — what was broken, who it served, why it mattered
3. Constraints       — team size, stack inherited, deadline
4. Decisions         — 3–5 architectural calls + trade-offs (decision table)
5. Outcome           — concrete numbers (users, uptime, deploys, cost)
6. What I'd do on GCP today — bridge from past work to current direction
```

Frontmatter to add to the Nuxt content collection:

```yaml
title: "Stabilizing a failing e-commerce platform inherited from a third party"
client: " Retail Client (LatAm)"
year: 2025
pillar: "Full-Stack Architecture"
type: "recovery"       # recovery | greenfield | side-project
stack: ["NestJS", "Strapi", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Turned a fragile third-party storefront into a predictable, releasable system"
featured: true          # surfaces on home
ogImage: "/blog/case-studies/retail-ecommerce-core/featuredImage.jpg"
```

---

### 2.3 Blog (`/blog`)

Keep as-is. Add:
- **Pillar tag** to each post (extend frontmatter).
- **Tag index pages** under `/blog/tag/[pillar]`.
- **RSS feed** if not already present.

Existing posts already align well; no rewrites needed.

---

### 2.4 About (`/about`)

Keep the personality (cinema, cooking, Japanese) — that's the moat against bland engineering bios. Add structure on top.

**New structure:**

1. **One-paragraph story** — the "E-commerce rescue & platform recovery" narrative, slightly longer than the home hero. Pull from `linkedin-profile-draft.md` §6, paragraph 1.
2. **Existing "curious by nature" paragraph** — keep verbatim. This is the human layer.
3. **Timeline** — vertical, year on the left, role + 1-line outcome on the right. Same data as home but with more detail.
4. **Currently studying** — link to `/now`.
5. **Certifications** — existing list + the planned ones from `linkedin-profile-draft.md` §10 as a "In progress" sublist.
6. **CV downloads** — both `CV-ES.pdf` and `CV-EN.pdf`. Generate the EN one from this Curriculums repo.
7. **Speaking & writing** — empty stub now, fill as it grows.

---

### 2.5 New page: `/now`

Inspired by [nownownow.com/about](https://nownownow.com/about). Single page, updated quarterly.

```
# Now — Q2 2026

## Working on
- Crazy Imagine: support + Knowledge Base on Laravel/Vue/Inertia.

## Learning
- IBM DevOps & Software Engineering — Containers & K8s module.
- IBM CI/CD module on GitLab.
- Generative AI for Software Developers (IBM).

## Shipping next
- First case study:  Retail Client NestJS + Strapi e-commerce rescue.
- One open-source repo (Laravel ↔ BigQuery sync — TBD).

## Available for
- Senior / Lead roles in Platform Engineering, Data Architecture,
  or Full-Stack leadership. Remote-first. Start: immediate.

_Last updated: {date}_
```

Add `/now` to the main nav between `Blog` and `About`.

---

### 2.6 New page: `/uses` (split out from the home tab)

The "Uses" tab on home is good but cramped. Promote to its own page (`/uses`) following the [usesthis.com](https://usesthis.com) convention. Keep the home tab as a teaser linking to `/uses`.

Sections: Editor & AI tools · Terminal & shell · OS & homelab (Proxmox) · Languages I use weekly · Hardware.

---

### 2.7 Contact / CTA

Site already routes "Available for new projects" → Google Calendar. Keep that, but:
- Add a small `/contact` page (or expand About) listing: email, LinkedIn, GitHub, Calendar. No form.
- Add an "Open to Senior/Lead roles" line in the footer, with a link to `/contact`.

---

## 3. Visual polish (light touch — don't redesign)

The current visual identity works. Tighten it:

- **Add a single accent color** (recommend deep teal `#0F4C5C` or terminal green `#7FB069`) used consistently for: link hover, primary button, pillar tags, "live" markers in `/now`.
- **Pillar tag style** — small mono-font chips, color-coded:
  - Platform & DevOps → teal
  - GCP & DataOps → blue
  - Full-Stack Architecture → green
  - AI-Augmented → amber
- **OG image generator** — use Nuxt's `nuxt-og-image` module to render per-page share previews using the same template (mono title + accent stripe + avatar). Verify on LinkedIn share preview.
- **Headshot consistency** — same avatar across LinkedIn, GitHub, site. Already true. ✅

Don't add: animations, sliders, hero videos, gradients beyond the accent.

---

## 4. SEO & sharing checklist

- [x] `<title>` pattern is implemented globally (`%s - Ivan Over Time`) in app-level SEO.
- [x] Meta description per page = the page's TL;DR or hero subline.
- [x] OG image per page (auto-generated).
- [x] JSON-LD: `Person` + `WebSite` + `WebPage` globally, `Article` on blog detail pages.
- [x] `sitemap.xml` and `robots.txt` confirmed.
- [x] RSS for `/blog`.
- [ ] LinkedIn Featured section pinned to: home + 1 case study + 1 blog post.

---

## 5. Bilingual plan (Phase 2)

Current site is EN with an ES CV. Recommend adding ES content via Nuxt i18n only after the EN refresh ships.

Order:
1. ES home + about (high-traffic, easy).
2. ES `/now`.
3. Translate top 2 case studies ( Retail Client e-commerce rescue +  Supermarket Client PWA).
4. Mark ES-only posts in `/blog` with a flag; don't force translation parity.

---

## 6. Implementation order (4 sprints, ~2 weeks each)

### Sprint 1 — Positioning refresh (no new content)
- [x] Lock canonical email + LinkedIn slug + display name (§0).
- [x] Replace home hero copy.
- [ ] Rewrite Work Experience one-liners on home.
- [ ] Reorder "What I do" tabs and tech-skills groups.
- [ ] Add accent color and pillar-tag component.
- [x] Verify OG previews still render.

### Sprint 2 — Case studies foundation
- [x] Keep case studies under `/blog` (no `/projects` or `/case-studies` route, by decision).
- [ ] Add pillar filter chips.
- [ ] Tag existing 3 projects.
- [ ] Add Featured Case Studies row to home (empty state OK).
- [x] Publish **the  Retail Client e-commerce pair** (`retail-ecommerce-recovery` + `retail-ecommerce-rebuild`) using the 6-section template, with a "📎 Part of a pair" callout cross-linking the two.

### Sprint 3 — Now + about + uses
- [x] Build `/now` page + first quarterly entry.
- [x] Add `/now` to nav.
- [ ] Restructure `/about` per §2.4 (preserve the personal voice).
- [x] Generate and link `CV-EN.pdf` alongside `CV-ES.pdf` on `/about`.
- [x] Promote `/uses` to its own page.

### Sprint 4 — Volume + polish
- [x] Publish case studies #2 and #3 ( Supermarket Client PWA,  Retail Client SAP quotation).
- [x] Backfill the 6-section template on existing 3 projects.
- [ ] Run Lighthouse — gate at perf ≥ 95, a11y ≥ 95.

---

## 7. Definition of Done (post-Sprint 4)

- [x] New positioning visible above the fold on home.
- [ ] At least 3 senior case studies live, each with a decision table and concrete outcome numbers.
- [x] `/now` published and dated within the last 30 days.
- [x] EN CV downloadable from `/about`.
- [ ] Pillar filtering works on `/blog`.
- [ ] LinkedIn Featured links to: home + best case study + best blog post.
- [x] OG preview generation verified in build for key URLs.
- [ ] Lighthouse perf ≥ 95, a11y ≥ 95 on home and case-study template.

---

## 8. Open follow-ups

- [x] Decide canonical email and LinkedIn slug (§0).
- [x] Ship `/contact` page and footer CTA/linking.
- [x] Ship `/uses` link in footer for persistent discoverability.
- [ ] Confirm site repo location (private GitHub?). Add link here once decided.
- [ ] Pick analytics tool if none today (Plausible or Cloudflare Web Analytics).
- [x] Keep case studies under `/blog` (no `/projects` or `/case-studies` aliases).
- [ ] Next case study improvement pass: add stronger outcome metrics to the three published case studies.

---

## 9. Handoff Prompt — for Claude inside the alvarezivan.net repo

Paste this into Claude (Claude Code or claude.ai) opened on the `alvarezivan.net` repo, alongside this file plus `brand-strategy.md` and `linkedin-profile-draft.md`.

````text
You are my web engineering partner for `alvarezivan.net`. The site
already exists: Nuxt 4 + Vue 3 + TypeScript + Nuxt UI + Tailwind,
deployed on Cloudflare Pages. Do NOT rebuild it. Modify it in place.

I'm sharing three reference docs from my Curriculums repo:

- `brand-strategy.md`         — positioning, pillars, narrative.
- `linkedin-profile-draft.md` — canonical voice and copy patterns.
- `personal-site-plan.md`     — the modification plan for THIS site.

Treat `personal-site-plan.md` as the source of truth for what to
change. Treat `brand-strategy.md` as the source of truth for tone
and positioning ("E-commerce rescue & platform recovery", decisions and trade-offs over
feature lists).

Ground rules:
- Preserve the existing visual identity, the "Ivan Over Time" brand
  mark in the footer, the personal voice on /about (cinema, Japanese,
  cooking), and the existing blog posts and projects.
- Add the new accent color, pillar-tag component, and OG generator —
  don't redesign the site.
- Keep all existing URLs working. Case studies stay under `/blog`; do not add `/projects` or `/case-studies` aliases.
- Do not invent experience, metrics, or certifications I don't
  already have in the reference docs.

Your job, in this order, one PR per sprint:

1. **Sprint 0 — Apply canonical values.** Read §0 of the site plan
   (values are already locked: domain `alvarezivan.net`, email
   `alvarezlopezivanenrique@gmail.com`, LinkedIn slug `ialvarez93`).
   Open a PR that audits the codebase for any stale references and
   replaces them with these canonical values.

2. **Sprint 1 — Positioning refresh** (per §6 Sprint 1 of the plan).
   Replace the home hero, rewrite the Work Experience one-liners,
   reorder the "What I do" tabs, add the accent color and pillar-tag
   component. No new pages.

3. **Sprint 2 — Case studies foundation** (per §6 Sprint 2).
  Keep case studies under `/blog`, add pillar filters, tag existing projects, add the
  Featured Case Studies row to the home, and publish the first new
  case study ( Retail Client NestJS e-commerce rescue) using the 6-section template
   from §2.2 with frontmatter.

4. **Sprint 3 — `/now`, `/about` restructure, `/uses` split,
   EN CV link** (per §6 Sprint 3).

5. **Sprint 4 — Two more case studies, mirror two LinkedIn posts,
   JSON-LD, RSS, Lighthouse gates** (per §6 Sprint 4).

For every PR:
- Use the EXACT copy from §2 of the site plan. Do not paraphrase the
  positioning. If something is missing or ambiguous, stop and ask.
- Include a screenshot or Cloudflare Pages preview link.
- Pass Lighthouse (perf ≥ 95, a11y ≥ 95) on changed pages.

Start by confirming you've read all three docs, summarize the current
site structure as you understand it from the repo, and wait for my
"go" before opening Sprint 0.
````

---

## 10. Refresh 2026-10 — catch up with the Curriculums positioning pass

Upstream repo: `~/Source/Curriculums` (canonical). The site's last content commit was
`2cc1d8e` (2026-07-10). Curriculums landed a positioning pass on 2026-10-10/11 that the site
never picked up.

### What changed upstream

| # | Change | Source |
|---|---|---|
| 1 | **JuegaEnLínea is the current role** (Aug 2026 – Present); Crazy Imagine **closed Jun 2026** (Dec 2025 – Jun 2026) | `feat(cv): JuegaEnLínea becomes the current role` |
| 2 | **Positioning flipped** to *internal platforms, back offices, design systems* (Svelte, Laravel, Cloudflare). GCP is demoted from headline to learning track | `docs(linkedin): the drafts drop the marketing phrasing` |
| 3 | **Location is Naguanagua, Carabobo** (was Las Chimeneas, Valencia) | `fix(cv): the location is Naguanagua, Carabobo` |
| 4 | **Industry framing dropped** — JuegaEnLínea is "a multi-brand company", not an online gaming operator | `docs(reference): the site and drafts leave the gaming framing` |
| 5 | **Skills regrouped**; Svelte, SvelteKit, Cloudflare and Nginx added | `feat(cv): the skills list gains real groups` |
| 6 | **Cert track is IBM DevOps + GCP Associate Cloud Engineer** (PCA planned), not Professional Data Engineer | `now-q4-2026.md`, `education.tex` |
| 7 | **Anti-hype rule** — no self-service / no-code / three-weeks / 3–7-day claims | `docs(linkedin): …` |
| 8 | **ES style pass** — calques out, sentence case, impersonal | `style(cv): the Spanish reads as Spanish` |
| 9 | **CV PDFs regenerated 2026-10-11**, 12 variants per language under `out/ivan/pdf/` | `build(cv): the PDFs land in one folder` |

### Batches

**Batch 1 — facts & positioning**
- `content/home.yml`, `content/es/home.yml` — experience[0] → JuegaEnLínea; Crazy Imagine →
  Dec 2025 – Jun 2026; `seo.description` + `description` → platform positioning; drop
  "Right now I'm doing it on Google Cloud".
- Tech Skills FAQ (both locales) — add Svelte/SvelteKit, Cloudflare (Workers, Pages, R2), Nginx;
  Proxmox under Cloud & DevOps; ES gains the Integrations / Languages / AI groups EN has.
- `content/about.md`, `content/es/about.md` — Naguanagua; new timeline entry; education dates
  → 2016 – 2021 + Magna Cum Laude; studying → IBM DevOps + GCP ACE; certs + stack aligned with
  `people/ivan/lang/en/skills.tex`.
- `content/now.md`, `content/es/now.md` — rewritten from `reference/ivan/now-q4-2026.md`,
  `updated: 2026-10-10`.
- `content/contact.md`, `content/es/contact.md` — employer + locality.

**Batch 2 — artifacts**
- `public/files/cv/ivan-alvarez-{en,es}.pdf` ← `out/ivan/pdf/ivan_{en,es}-full-stack-general.pdf`
  (decision: general pair only; existing URLs and `public/_redirects` stay).
- `docs/{brand-strategy,linkedin-profile-draft,personal-site-plan}.md` re-synced from
  Curriculums, keeping the client anonymization (" Retail Client", " Supermarket Client").

**Batch 3 — consistency**
- ES copy pass across `content/es/*` — missing accents (`Sobre mí`, `más`, `última`, `pequeña`,
  `También`, `rápida`, `Español`), sentence-case headings.
- Case studies' *"What I'd do on GCP today"* aligned to the honest ACE framing.
- RSS + Lighthouse gate (still open from §6 Sprint 4).

### Decisions locked (2026-10)

- **CV files:** general pair only — `ivan-en-full-stack-general` / `ivan-es-full-stack-general`.
- **GCP:** demoted to a learning note (one "currently studying" mention), matching
  `linkedin-profile-draft.md` §4/§6.
- **Pricing & Timelines FAQ:** left untouched (out of scope for this pass).

### Known deviations from the upstream drafts (confirm)

- The `/about` timeline and `content/now.md` say "multi-domain landing page generator" rather
  than "self-service landing-page generator" (`about-page.md`, `now-q4-2026.md` still carry
  "self-service"). The CV bullet — the most fact-checked artifact — dropped the term.
- Certifications drop "Google Cloud Professional Data Engineer" and list
  **ACE (in progress) → PCA (planned)** instead, per `about-page.md` and `now-q4-2026.md`.
- JuegaEnLínea's `company.url` is `"#"` pending a canonical URL (same as Biomercados).

### Verification gate

```bash
rg -n "Valencia|Crazy Imagine Software|Professional Data Engineer|GCP DataOps" content/
npm run typecheck && npm run build
```
- CV URLs return 200; `/now` shows Q4 2026.

---

## 11. Case study plan — Semantichelp (Vertex Plus Group)

Status: **planned, not written** (2026-10-11).

- Client: **Vertex Plus Group LLC** — `https://vertexplusgroup.com/` (confirmed 2026-10-11).
- Product: `https://semantichelp.com/` — live, HTTP 200.
- Source repo: `~/Source/semantichelp` (private). Facts come from `PRODUCT.md`, `docs/PLAN.md`,
  `docs/HANDOFF.md` and the git history (154 commits since 2026-08-01; the first commit is
  2026-07-13).
- Slot: `content/blog/case-studies/semantichelp-rag-knowledge-base.md` — live (no `hidden: true`),
  `featured: true`.

### Frontmatter

```yaml
title: "Semantichelp — a knowledge base that answers with sources"
date: "2026-10-11"
category: "case-study"
client: "Vertex Plus Group"
year: 2026
type: "greenfield"
tags: ["rag", "multi-tenant", "cloudflare", "ai", "product"]
stack: ["Nuxt 4", "Cloudflare Workers", "D1", "R2", "Vectorize", "Vercel AI SDK"]
team_size: 1
role: "Product, design and build"
outcome_headline: "A multi-tenant RAG knowledge base where unanswered questions become citable answers"
ogImage: "/blog/case-studies/semantichelp-rag-knowledge-base/featuredImage.png"
image: "/blog/case-studies/semantichelp-rag-knowledge-base/featuredImage.png"
```

### Structure

Same spine as `supermarket-pwa-recovery.md` (~1,400 words), **except the closing section**: the
product is already Cloudflare-native, so there is no honest "What I'd do on GCP today" to write.
It becomes "What's still missing".

| § | Content |
|---|---|
| TL;DR | What it is · the differentiator (an unanswerable question escalates to the owner and comes back as a citable document) · status: v1 in production, one real tenant |
| Context | The failure mode of "chat with your docs" — it answers or it shrugs, and a shrug is a dead end. That shrug is the product surface here |
| Constraints | Solo build · edge-only, no always-on server · D1 (SQLite) + Vectorize, no pgvector · no mail infrastructure · stateless 24 h JWT · per-tenant cost ceilings · tenant isolation is a product promise |
| Architecture at a glance | Mermaid: upload → R2 + D1 → queue → extract → chunk → embed → Vectorize → retrieve → stream + citations → escalation → owner answer → Q&A doc → re-ingest |
| Decisions | The five below, each with its trade-off |
| Outcome | Honest: what v1 contains (auth, onboarding, catalog, queue ingestion, streaming cited chat, RBAC, escalations + write-back, en/es, custom domains, cost guardrails), live with a first real tenant. **No customers, no metrics, no testimonials** — `PRODUCT.md` explicitly forbids fabricating them |
| What's still missing | No self-service password reset (a locked-out user is an operator running `wrangler d1 … --remote`, and the real fix needs `users.sessionsValidAfter` because the stateless JWT cannot be revoked) · large documents can hit execution limits · no billing · no platform super-admin role |

### The five decisions

1. **D1 + Vectorize instead of Postgres + pgvector** — edge-native, no VM to run; the price is
   SQLite's limits and a second index to keep honest.
2. **Queue-based ingestion** (extract → chunk → embed → vectorize) — with the real cost stated:
   a freshly written-back Q&A document is not retrievable for ~30–60 s.
3. **Citations are part of the answer, not decoration** — every claim opens the source passage.
4. **The escalation write-back loop** — the owner's answer lands in the catalog as a normal,
   readable, downloadable Q&A document. The one thing "chat with your docs" cannot claim.
5. **Cost discipline** — a context-keyed, self-healing answer cache counted in `usage_counters`;
   token caps on history, output and retrieved context; a per-plan question quota; BYO-key
   first-class so inference cost sits with the tenant. Plus the model bake-off that kept the
   default and pinned follow-ups to a small model, with cost tiers in the picker.

### Assets

- `featuredImage` — real Chrome screenshot of the catalog and a chat answer with citations, from
  the live demo tenant (`browser_read` with `shot`).
- The architecture diagram is Mermaid text, matching the existing case study.

### Link-in work

- `/now` → the Semantichelp bullet links to the case study instead of only the product root.
- The home Featured row picks it up via `featured: true`.

### Open questions before writing

1. **Anonymise the client or not?** Every other case study anonymises (`client: " Retail Client
   (LatAm)"`). `client: "Vertex Plus Group"` names it openly — confirm which convention wins here.
2. How candid should "What's still missing" be — name the password-reset gap, the execution-limit
   ceiling and the absent billing, or soften?
3. Does the TL;DR link out to `semantichelp.com`?
