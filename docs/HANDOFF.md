# Handoff — alvarezivan.net

_Updated 2026-10-25. Authoritative state for the next session._

## Session (2026-10-25) — Tech Skills in two columns

The queued route-1 spike, landed: `26f55dc`'s next task, done. `app/components/landing/FAQ.vue`
gains a `twoColumnTabs` set (`tech skills` / `habilidades`) and puts
`sm:[&>ul]:columns-2 sm:[&>ul]:gap-x-8 [&>li]:break-inside-avoid` on the MDC body of those tabs
only. Six lines, one file.

**Why `sm:` and not unconditional** — measured in Chrome: the longest entry ("Payment Gateways
(PayPal, Stripe, Merchant)") needs 277px. At a 358px container two columns give ~123px each and that
entry wraps to **7 lines**; at `sm` (640px) it wraps to 2; above ~770px nothing wraps at all.

**Verified:** `npm run typecheck` + `npm run build` clean. `column-count:2` and `column-gap:2rem`
land inside `@media(min-width:40rem)`, `break-inside:avoid` on the `li`. Both locales prerender 8
gated lists (the whole Tech Skills category); `Pricing & Timelines` is prose-only and untouched.
Runtime geometry at 951px: 2 columns at x=109/496, balanced heights (8 items → 139px ≈ 4+4).

**Route 2 declined for now** (user call, 2026-10-25): restructure both `home.yml` locales to
structured data + a real grid. It lands the same visual result and would flip the reading order from
column-major to row-major, and would mean hand-copying the prose utility classes out of MDC. Worth
it only if per-list control is ever wanted.

**Blemishes, accepted:** 3- and 5-item lists split 1|2 and 2|3 (CSS balancing with
`break-inside: avoid`); the gate keys off the lowercased tab title, so renaming the tab silently
drops the layout.

## Follow-up session (2026-10-17) — CV ↔ site message matching

Same goal, second pass: evaluate the CV PDF diff from `94cc074` and close the remaining message
gaps between the CVs and the site. Nothing committed.

**Evaluated (report only):** old vs new CV PDFs extracted with `pdftotext` — summary flip to
*internal platforms + design systems, moving toward DevOps and Cloud*, +Svelte/SvelteKit/Cloudflare,
−Proxmox/ChatGPT, +JuegaEnLínea, Crazy Imagine closed, Freelance and Biomercados date windows
widened/corrected, ES "Desarrollo de…" style.

**Decisions taken (user):**
- GCP closers → **cloud-agnostic reframe** (not Cloudflare-specific, not deleted).
- Degree → **follow the CV**: "Information Engineer" / "Ingeniero en Informática" + CV university wording.
- Only the **ES blog accent fix** from the small-copy menu. Declined: hero availability label change
  ("Available for new projects" stays hardcoded in `Hero.vue`) and the blog "data" blurb.
- **Location → Valencia, Carabobo, Venezuela (site only, 2026-10-17).** Naguanagua is part of the
  Valencia metro area; Valencia is the recognizable anchor for remote/international recruiters.
  The Daka job rows keep "Naguanagua, Venezuela" — that's the employer's location. The CV PDFs and
  `~/Source/Curriculums` sources, plus the `docs/` LinkedIn mirror synced from them, **still say
  Naguanagua on purpose** until the user runs the Curriculums pass — do not "fix" them here.

**Changed (uncommitted, 8 files):**
- `content/blog/jp-landing.md` + the four case studies — "What I'd do on GCP today" → "What I'd do
differently today", rewritten around managed runtime / queues / read models / platform
observability / preview-per-PR; Cloudflare Pages named only where already true.
- `content/about.md`, `content/es/about.md` — degree title and university name per CV.
- `content/es/blog.md` — missing accents.
- `content/home.yml`, `content/about.md`, `content/contact.md` + their `content/es/` counterparts —
  location → Valencia, Carabobo (site only; CV later).
- `public/files/cv/ivan-alvarez-{en,es}.pdf` — re-synced from Curriculums' **2026-10-23** general
  full-stack builds (MD5-verified; adds the AI & LLM skills row, Cloudflare D1/Vectorize/Queues,
  Livewire on the frontend line). Still carry the Naguanagua header per the deferred location fit.
- `app/pages/about.vue` — ES button accents: "Inglés" / "Español".

**Verified:** `npm run typecheck` and `npm run build` clean; zero GCP vendor strings in `content/`
and in the built `dist/` blog pages; `Information Engineer` / `Ingeniero en Informática` present in
the built about payloads. Dist regenerated.

**NDA pass (2026-10-24):** Daka must not be publicly attributable. The three Daka case studies
are anonymized as `client: "Retail Client (LatAm)"` (leading-space artifact fixed on all four
case studies) and **hidden again** (`hidden: true`) — final user call: they stay as private
writes-in-storage, not public pages. So nothing may link to them; the /now link to the SAP post
was removed again to keep the prerender clean. They become public by removing `hidden: true`. Home + about (both locales) drop "Tiendas Daka C.A." / the
tiendasdaka.com link / "Venezuelan retail chain" / "nationwide" and read "Retail Client (LatAm)"
with the URL `#`. The CV PDFs still name TIENDAS DAKA C.A. and stay downloadable from `/about`
— accepted by the user. **/now drift pass:** `updated` bumped to 2026-10-24 (both locales),
Semantichelp line corrected (change-password shipped Oct 4; only locked-out reset open), Daka pair
bullet removed. Learning gains the **CU Boulder Technical Communication specialization (Coursera)**, both locales. `npm run typecheck` +
`npm run build` clean; zero `daka|tiendasdaka` strings in `content/` or `app/`.

**Next small task:** home FAQ — render the Tech Skills bullet lists in two columns. **Done
(2026-10-25)** via route 1; see the top block. Route 2 was scoped and declined.

**Still open from Batch 3:** ES copy pass on untouched `content/es/*` files, RSS feed, Lighthouse
gate (§6 Sprint 4), the items the user declined above, and the **CV location sync to Valencia**
(Curriculums i18n.yml + PDF regeneration — deferred by the user). `develop` still unpushed.

## Goal

Catch the live site up with the Curriculums positioning pass (2026-10-10/11), then re-point `/now`
at Semantichelp.

## Done and committed

`94cc074` on `develop` (**not pushed**) — *"content: the Oct refresh lands — JuegaEnLínea is the
current role, Semantichelp leads /now, and the GCP track is gone"*. 15 files, +401/−216.
`git show 94cc074` for the full detail.

- JuegaEnLínea (Aug 2026 – Present) replaces Crazy Imagine as the current role on the home Work
  Experience list and the `/about` timeline; Crazy Imagine reads Dec 2025 – Jun 2026.
- Positioning leads with internal platforms, back offices and design systems (Svelte, Laravel,
  Cloudflare) instead of e-commerce rescue plus GCP DataOps.
- Skills gain Svelte, SvelteKit, Cloudflare and Nginx; the ES groups catch up with EN.
- Location is Naguanagua, Carabobo; education reads 2016 – 2021 with Magna Cum Laude.
- `/now`'s Working-on section is now Semantichelp; `/now` and `/contact` state the availability
  plainly.
- The whole Google Cloud credential track is removed: ACE and the Planned block out of
  Certifications, the ACE/PCA lines out of "Currently studying" and `/now`, BigQuery out of the
  skill list, `gcloud` out of `/uses`. IBM DevOps is the only credential in progress.
- CV PDFs are the 2026-10-11 general builds; the `docs/` mirrors of `brand-strategy` and
  `linkedin-profile-draft` are re-synced from Curriculums with the client anonymisation re-applied.
- `docs/personal-site-plan.md` carries §10 (the refresh) and §11 (the case-study plan).

## Decisions locked

- **CV files:** the general pair only — `ivan_{en,es}-full-stack-general`.
- **GCP:** removed entirely, not demoted. IBM DevOps is the only credential in progress.
- **Availability:** Ivan is leaving JuegaEnLínea, so `/now` and `/contact` say fully available /
  disponible desde ya. The employer stays only in the factual Work Experience and timeline entries.
- **Pricing & Timelines FAQ** on the home page: left untouched.
- **One commit** for the whole refresh, not a split one.

## Verified

- `npm run typecheck` and `npm run build` clean.
- No `GCP|Google Cloud|gcloud|BigQuery|DataOps|Cloud Run` strings in any prerendered non-blog page.
- CV MD5s match `~/Source/Curriculums/out/ivan/pdf/ivan_{en,es}-full-stack-general.pdf`.
- `docs/` mirrors differ from their Curriculums originals only by client names.

## Unverified / open

- **Nothing is pushed.** `develop` is ahead of `origin/develop` by 4. Cloudflare Pages builds from
  the repo (`wrangler.toml` → `dist`), so the push *is* the production deploy.
- **The Semantichelp case study is planned, not written** — §11 of `personal-site-plan.md`. Three
  questions are open there (client anonymisation, how candid the closing section should be, whether
  the TL;DR links out).
- **Batch 3 of §10 is open:** the four case studies' GCP closers are **done (2026-10-17)** as
  cloud-agnostic reframes; the ES copy pass on files not already touched, RSS feed, and Lighthouse
  gate remain open.
- `docs/brand-strategy.md` §1–2 still pivots on "GCP & DataOps 30%" and contradicts the new
  positioning. Authoring job, not a sync.
- JuegaEnLínea's `company.url` is `"#"` pending a canonical URL.

## Next step

Answer the three questions in §11, then write `semantichelp-rag-knowledge-base.md`.
