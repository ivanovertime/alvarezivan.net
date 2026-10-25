# Handoff — alvarezivan.net

_Updated 2026-10-25. Authoritative state for the next session._

## Session (2026-10-25, second) — the Semantichelp case study is written

The §11 goal, done. `content/blog/case-studies/semantichelp-rag-knowledge-base.md` is live (no
`hidden`), `featured: true`, English only — **no blog post in this repo has an ES counterpart**, so
none was invented.

**The three §11 questions, answered by the user:**
1. **Client named** — `client: "Vertex Plus Group"`, linked to `https://vertexplusgroup.com/` in the
   TL;DR. The product is public and `/now` already names it, so anonymising the client protects
   nothing.
2. **Full candour** in "What's still missing" — one sentence of mechanism per gap. Checked against
   the source first: no `forgot-password`/`reset-password` route, no `sessionsValidAfter` anywhere in
   code, no billing code, no `isPlatformAdmin`. The four gaps are the reset flow / billing /
   platform super-admin / the per-attempt ingestion ceiling.
3. **Links out** — `semantichelp.com` in the TL;DR, the Outcome, and the closing line.

**One correction to the §11 plan:** ingestion is on a **Cloudflare Queue** now
(`shared/ingestQueue.ts`: 3 retries, 30 s apart, a dead-letter queue, a 20-minute stuck sweeper)
with an inline `waitUntil` fallback when the binding is absent. So Decision 2 is "queue + the
~30–60 s Vectorize lag", not "queue instead of inline" — `PRODUCT.md`'s "not a queue" line is the
stale one.

**Featured image** — real Chrome screenshots of the demo tenant (`demo.semantichelp.com`): a cited
chat answer plus the catalog, composed with `sharp` on a blue gradient at 1920×1280. Regenerate by
re-running the composition script pattern if the demo UI changes.

**Link-in:** `/now`, both locales — the second Semantichelp bullet is now the case study link.

### User-directed changes in the same session (these override the NDA pass)

- **Tiendas Daka C.A. is named again on the work-experience row and the `/about` timeline, both
  locales** — "like in the CV". The row is `Software Development Consultant · Tiendas Daka C.A. ·
  Oct 2024 – Dec 2025`, the home card links to `https://www.tiendasdaka.com/`, and the `/about`
  prose reads "builds at Tiendas Daka". The NDA now applies to the **case studies only**: they stay
  `hidden: true` and `client: "Retail Client (LatAm)"`.
- **"See the case studies" / "Ver los casos de estudio" removed** from the `/about` Daka paragraph
  (both locales) — it pointed at a filtered blog page the hidden Daka studies can't fill.
- **JuegaEnLínea's icon is `i-lucide-briefcase`** (was `i-lucide-layers`) and its
  `company.url` is `https://juegaenlinea.net/` (was `#`), both locales. The bare host 403s to
  `curl` behind bot protection and redirects to `www.` in a browser; the href is left as the user
  gave it.
- **`nuxt` was added to the Semantichelp case study** (it is a Nuxt 4 build), so the tag now
  appears on three visible posts — the chip is unchanged and the card shows `ai`, `cloudflare`.
  The post's tag order is `ai`, `cloudflare`, `nuxt`; the card prints the first two plus `+1`.

### Brand colours now carry the identity, not the company name (2026-10-25)

User asked whether brand-matching colours were a good idea. Answer: **yes as an identity cue, no as
text colour.** Five coloured company names in one list encode nothing, compete with the site's own
accent, and the brightest brands fail contrast on a light background (Crazy Imagine's lime `#b1d600`
is **1.68:1** on white; Daka's yellow `#facc15` is **1.60:1**). So `WorkExperience.vue` now paints the
**icon only** and leaves the name in `text-highlighted`, with one scoped rule:
`.company-mark { color: color-mix(in oklab, var(--brand) 62%, #0b1220) }` and `.dark … { color:
var(--brand) }` — light mode mixes the hue toward black (lime → **4.2:1**, yellow → **3.9:1**, both
above the 3:1 bar for graphics), dark mode gets the pure hue (11:1+). Colours were re-derived from the
brands themselves: JuegaEnLínea `#e43a10` (their CTA orange, was sky-blue `#0284c7`), Crazy Imagine
`#b1d600` (their lime, was grey `#6b7280`). Daka `#facc15` and Biomercados `#0f766e` were already
right and only gained the light-mode mix. `content/es/home.yml` links Crazy Imagine to
`https://crazyimagine.com/es`; the English entry keeps the root.

### The blog tag row was 19 chips for 9 posts — now 5

User call: both halves. `app/pages/blog/index.vue`'s `availableTags` now counts tags across the
visible posts and renders a chip only when **more than one** post carries it (a selected tag always
renders, so `/blog?tags=ai` still shows its chip and "Clear tags"). The taxonomy was consolidated in
the frontmatter at the same time: the one-off keywords are gone — `nixos`/`gnome`/`google-drive`/
`gvfs` → `linux`, `google-workspace`/`time-tracking` → `google-workspace` (card label only),
`rag`/`multi-tenant`/`product` → `ai` + `cloudflare`, `nestjs` dropped (it is in `stack`), and the
`side-project` tag dropped because it duplicates the category filter. Remaining chips: e-commerce,
linux, nuxt, venezuela. Tags still print on the post cards (`BlogTag`, first two); a tag used once is
a label, not a browse axis. `platform-recovery` also came off `from-nuxt-to-hugo`, where it described
this site's own Nuxt → Hugo → Nuxt history rather than a rescue — the tag now applies only to
`supermarket-pwa-recovery` (the Daka recoveries are hidden), so it has no chip. The remaining
single-use tags are card labels on purpose: `google-workspace` (ChronoCal), `ai` + `cloudflare`
(Semantichelp), `devops` (supermarket), `integrations` (BCV).

**Observed, not fixed:** ` ```mermaid ` fences render as syntax-highlighted **code blocks**, not
diagrams — `MermaidDiagram.vue` never fires because fenced code isn't mapped to it. This is
pre-existing and identical on `supermarket-pwa-recovery`, so the new post matches the existing case
studies. Fixing it is a site-wide change (component mapping or `::mermaid` MDC syntax), not a post
edit.

**Verified:** `npm run typecheck` + `npm run build` clean. `dist/` contains the post, the home
featured row links it, `/now` links it in both locales, `Tiendas Daka C.A.` appears in
`dist/{index,es,about,es/about}.html` with the `tiendasdaka.com` href, the "casos de estudio"
sentence is gone, and four `briefcase` icons replace the old `layers` one on the home page.

## Earlier session (2026-10-25) — Tech Skills in two columns

`480be6f`: `app/components/landing/FAQ.vue` gains a `twoColumnTabs` set (off the lowercased tab
title, so renaming the tab silently drops the layout) and puts
`sm:[&>ul]:columns-2 sm:[&>ul]:gap-x-8 [&>li]:break-inside-avoid` on the MDC body of those tabs
only. `sm:` because the longest entry needs 277px. Route 2 (structured data + a real grid) was
scoped and **declined** — revisit only if per-list control is wanted.

## Session (2026-10-17) — CV ↔ site message matching, and the Oct refresh

Landed as `13ead3b` on top of the Oct refresh `94cc074` (*"the Oct refresh lands — JuegaEnLínea is
the current role, Semantichelp leads /now, and the GCP track is gone"*).

- JuegaEnLínea (Aug 2026 – Present) is the current role; Crazy Imagine reads Dec 2025 – Jun 2026.
- Positioning leads with internal platforms, back offices and design systems (Svelte, Laravel,
  Cloudflare) instead of e-commerce rescue plus GCP DataOps. The whole Google Cloud credential track
  is removed — IBM DevOps is the only credential in progress.
- The four case studies' "What I'd do on GCP today" became cloud-agnostic "What I'd do differently
  today" reframes. Degree reads "Information Engineer" / "Ingeniero en Informática".
- **Location → Valencia, Carabobo, Venezuela (site only).** The CV PDFs and `~/Source/Curriculums`
  **still say Naguanagua on purpose** until the user runs the Curriculums pass — do not "fix" them
  here. The Daka job row keeps "Naguanagua, Venezuela" when a location is shown: that is the
  employer's location.

## Session (2026-10-24) — the Daka NDA pass

`6242bbb`: the three Daka case studies were anonymised as `client: "Retail Client (LatAm)"` and
**hidden again** (`hidden: true`) — final user call: private writes-in-storage, not public pages, so
nothing may link to them. The CV PDFs still name TIENDAS DAKA C.A. and stay downloadable from
`/about` — accepted. `/now` drifted to the Q4 state (`0d03fc1`) and gained the CU Boulder Technical
Communication specialization. **Superseded in part** by the 2026-10-25 session above: the naming
ban now covers the case studies only.

## Done and committed

`develop` **through `ce982af` is pushed and live** (Cloudflare Pages builds from the repo,
`wrangler.toml` → `dist`, so a push *is* the production deploy). That covers the Oct refresh, the
CV ↔ site match, the Daka NDA pass and the Q4 `/now` drift.

## Decisions locked

- **Daka:** work-experience rows and the `/about` timeline **name Tiendas Daka C.A.** (2026-10-25,
  matching the CV). The three Daka **case studies** stay `hidden: true` and anonymised as
  `Retail Client (LatAm)`; nothing may link to them. They become public by removing `hidden: true`.
- **CV files:** the general pair only — `ivan_{en,es}-full-stack-general`. They still carry the
  Naguanagua header.
- **GCP:** removed entirely, not demoted; closers are cloud-agnostic reframes.
- **Availability:** `/now` and `/contact` say fully available / disponible desde ya. The employer
  stays only in the factual Work Experience and timeline entries.
- **Pricing & Timelines FAQ** on the home page: left untouched.
- **Semantichelp case study:** client named, full candour, links out. No invented metrics,
  customers or testimonials — `PRODUCT.md` forbids them.

## Unverified / open

- **Nothing is unpushed.** `origin/develop` is at `b5b9727`, deployed by Cloudflare Pages and
  verified live: `/blog/case-studies/semantichelp-rag-knowledge-base` answers 200, the blog index
  lists it, both `/now` locales link it, the home hero card links it, and `/about` + `/es/about`
  name Tiendas Daka C.A. with the `tiendasdaka.com` href on the home experience card.
- **§10 Batch 3 leftovers:** the ES copy pass on files not already touched, the RSS feed, the
  Lighthouse gate (§6 Sprint 4).
- **CV location sync to Valencia** — Curriculums `i18n.yml` + PDF regeneration, deferred by the user.
- `docs/brand-strategy.md` §1–2 still pivots on "GCP & DataOps 30%" and contradicts the positioning.
  Authoring job, not a sync.
- The Mermaid-fence issue above, if it is ever worth fixing.

## Next step

Nothing in flight. Pick the next §10 Batch 3 item — the cheapest is the ES copy pass — or the
Lighthouse gate, which has the most user-visible payoff.
