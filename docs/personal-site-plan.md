# Personal Site Modification Plan — alvarezivan.net

Status: **Working doc v3**, updated May 2026. Tracks current state and next steps.
Live site: https://alvarezivan.net (Nuxt 4 + Vue 3 + TS + Nuxt UI + Tailwind, Cloudflare Pages).
Aligned with `brand-strategy.md` and `linkedin-profile-draft.md`.

> **Principle:** the site already exists, has personality, has shipped content, and uses a stack that matches the brand. Don't rebuild — iterate with small, focused improvements.

## Progress snapshot (May 2026)

Completed:
- Core tone pass across home/about/now/contact and case studies (warmer, less sales-heavy language).
- `/now`, `/uses`, and `/contact` are live and linked from navigation/footer as intended.
- Three case studies are published (`daka-ecommerce-rescue`, `biomercados-pwa`, `daka-sap-quotation-app`).
- Open Graph generation is wired with `nuxt-og-image`, with a local template override.
- JSON-LD is live via `nuxt-schema-org` (`Person`/`WebSite`/`WebPage` globally and `Article` on blog detail pages).

Still pending:
- RSS feed for `/blog`.
- CV download links on `/about`.
- Optional case-study index alias and pillar-filter UX.
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
1. **No EN CV download yet.** `/about` still needs direct CV links.
2. **Case-study index UX is still thin.** We have the content, but not the optional `/case-studies` alias + filter chips.
3. **RSS is still pending.** `/blog` feed generation is not wired yet.
4. **Lighthouse gates are not documented/run as a release gate.**
5. **Pillar taxonomy is not fully surfaced in the UI yet.**

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
- First entries: Daka e-commerce rescue · Biomercados PWA · Daka SAP quotation app.

**Keep "What I do and how I work" tabs**, but:
- Reorder tabs so the senior-signal ones lead: `Tech Skills` → `Pricing & Timelines` → `Uses` → `Languages`.
- Inside `Tech Skills`, reorder groups to match the brand pillars: `Cloud & DevOps` first, then `Backend`, `Frontend`, `Databases`, `E-commerce & CMS`, `Integrations`.

**Work Experience timeline:** keep, but rewrite each entry's one-liner to match the LinkedIn draft:
- Crazy Imagine — *Building unified support + KB tooling on Laravel/Vue/Inertia.*
- Tiendas Daka — *Led 15 engineers and 6+ rescues across e-commerce, mobile, and SAP.*
- Freelance — *Restored multi-tenant CS-Cart and modernized WooCommerce/Nuxt stores.*
- Biomercados — *Recovered a stalled e-commerce project; shipped PWA + apps to 30k+ users.*

**Latest Articles:** keep as-is. Existing posts already align well.

---

### 2.2 Projects (`/projects`) → reframe as Case Studies index

Don't delete the existing 3 projects; reclassify and add to them.

**Rename in the nav:** `Projects` → `Case Studies`. Keep `/projects` URL for SEO; add `/case-studies` as an alias.

**Add filter chips by pillar:** `Platform & DevOps · GCP & DataOps · Full-Stack Architecture · AI-Augmented · Side Project`.

**Tag existing entries:**
- JP Landing → `Side Project` + `Full-Stack Architecture`
- From Nuxt to Hugo and Back → `Side Project`
- BCV Scraper → `Side Project` + `Full-Stack Architecture`

**Add new case studies (in priority order):**
1. **Daka — Rescuing a NestJS + Strapi e-commerce platform** *(Full-Stack Architecture)*
2. **Biomercados — Shipping a 30k-user PWA from a stalled project** *(Platform & DevOps)*
3. **Daka — Nationwide mobile sales-quotation app with SAP** *(Full-Stack Architecture)*
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
title: "Rescuing a NestJS + Strapi e-commerce platform"
client: "Tiendas Daka"
year: 2025
pillar: "Full-Stack Architecture"
type: "rescue"          # rescue | greenfield | side-project
stack: ["NestJS", "Strapi", "Docker", "Laravel", "SAP"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Restored delivery cadence and unblocked the roadmap"
featured: true          # surfaces on home
ogImage: "/og/daka-ecommerce-rescue.png"
```

---

### 2.3 Blog (`/blog`)

Keep as-is. Add:
- **Pillar tag** to each post (extend frontmatter).
- **Tag index pages** under `/blog/tag/[pillar]`.
- **"Originally on LinkedIn" footer** for posts mirrored from LinkedIn articles.
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
- First case study: Daka NestJS + Strapi e-commerce rescue.
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
- [ ] Meta description per page = the page's TL;DR or hero subline.
- [x] OG image per page (auto-generated).
- [x] JSON-LD: `Person` + `WebSite` + `WebPage` globally, `Article` on blog detail pages.
- [ ] `sitemap.xml` and `robots.txt` confirmed.
- [ ] RSS for `/blog` (and optionally `/case-studies`).
- [ ] Canonical URLs on mirrored writing posts.
- [ ] LinkedIn Featured section pinned to: home + 1 case study + 1 blog post.

---

## 5. Bilingual plan (Phase 2)

Current site is EN with an ES CV. Recommend adding ES content via Nuxt i18n only after the EN refresh ships.

Order:
1. ES home + about (high-traffic, easy).
2. ES `/now`.
3. Translate top 2 case studies (Daka e-commerce rescue + Biomercados PWA).
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
- [ ] Rename nav `Projects` → `Case Studies`; add `/case-studies` alias.
- [ ] Add pillar filter chips.
- [ ] Tag existing 3 projects.
- [ ] Add Featured Case Studies row to home (empty state OK).
- [x] Publish **case study #1: Daka NestJS e-commerce rescue** using the 6-section template.

### Sprint 3 — Now + about + uses
- [x] Build `/now` page + first quarterly entry.
- [x] Add `/now` to nav.
- [ ] Restructure `/about` per §2.4 (preserve the personal voice).
- [x] Generate and link `CV-EN.pdf` alongside `CV-ES.pdf` on `/about`.
- [x] Promote `/uses` to its own page.

### Sprint 4 — Volume + polish
- [x] Publish case studies #2 and #3 (Biomercados PWA, Daka SAP quotation).
- [ ] Backfill the 6-section template on existing 3 projects (lighter version is fine for side projects).
- [ ] Mirror first 2 LinkedIn long-form posts to `/blog` with canonical tags.
- [ ] Add RSS, run Lighthouse — gate at perf ≥ 95, a11y ≥ 95.

---

## 7. Definition of Done (post-Sprint 4)

- [x] New positioning visible above the fold on home.
- [ ] At least 3 senior case studies live, each with a decision table and concrete outcome numbers.
- [x] `/now` published and dated within the last 30 days.
- [ ] EN CV downloadable from `/about`.
- [ ] Pillar filtering works on `/case-studies` and `/blog`.
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
- [ ] Decide whether `/projects` URL becomes the canonical or `/case-studies` does.
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
- Keep all existing URLs working. Add aliases instead of replacing.
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
   Rename nav, add pillar filters, tag existing projects, add the
   Featured Case Studies row to the home, and publish the first new
  case study (Daka NestJS e-commerce rescue) using the 6-section template
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
