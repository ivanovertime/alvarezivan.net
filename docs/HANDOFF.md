# Handoff — alvarezivan.net

_Updated 2026-10-26. Authoritative state for the next session._

## Session (2026-10-26, third) — the Spanish feed, and the durable record is tracked

Two user calls opened the session: take the cheapest §10 Batch 3 item (**`/es/rss.xml`**), and
**track `PRODUCT.md` + `DESIGN.md`** (yes — the third one-commit decision below). The push was
**held** on purpose: nothing ships to production until this work + the ES pass go together.

### What shipped (two commits on `develop`, still unpushed)

- **`e272889` — `feat(i18n)`: the Spanish feed.** One feed builder in `server/utils/rss.ts` now
  serves both channels. `server/routes/rss.xml.ts` is a thin `buildRssFeed(event, 'en')`; the new
  `server/routes/es/rss.xml.ts` is `buildRssFeed(event, 'es')`. The Spanish channel carries
  `<language>es-ES</language>`, a translated description, and its own `Ivan Over Time (Español)`
  title so a reader can tell the two apart. `app.vue` advertises `/es/rss.xml` on Spanish pages
  and `/rss.xml` elsewhere; `/es/rss.xml` joins the `nuxt.config.ts` prerender list. The locale
  filter stays in JS — same reason as the ES pass: a Zod `default` is not materialised in the
  queryable column, so a `.where()` would blank the channel.
- **`de1603d` — `docs(product,design)`: PRODUCT.md + DESIGN.md are tracked.** This resolves the
  last standing one-commit decision. `.impeccable/` stays gitignored; the sidecar is regenerable
  and these two are the durable record.

### Verified

- `npm run lint`, `npm run typecheck`, `npm run build` all clean.
- **On the built `dist/`**: `dist/rss.xml` and `dist/es/rss.xml` each carry exactly **9 items**
  (the 3 hidden Daka studies absent in both), correct `<language>` and titles, and **zero**
  cross-locale link leaks in either direction.
- **Per-locale `<link rel="alternate">`** present in the prerendered HTML — confirmed in
  `dist/index.html` + `dist/blog/japanese-input.html` (`/rss.xml`) and `dist/es.html` +
  `dist/es/blog/japanese-input.html` (`/es/rss.xml`).
- Live curls against the dev server agreed with the build before the build ran.

### Still open (unchanged by this session)

- **The push.** Five commits now sit on `develop` (`ca114eb`, `33dc8de`, `de1603d`, `e272889`, plus
  this handoff commit). A push is the production deploy.
- **The Lighthouse gate** (§6 Sprint 4) — the other main candidate, most user-visible payoff.
- **The six recorded defects** — none touched. The prerendered `opacity: 0` was the user's defect
  pick but was never started because the RSS item won.
- **The ES client strings**: `client: "Retail Client (LatAm)"` / `"Supermarket Client (LatAm)"`
  are still English on the Spanish pages. Reviewed, not resolved — PRODUCT.md records the
  anonymisation as a fixed decision, so translating the label is a copy call the user still owes.

## Session (2026-10-26, second) — the ES copy pass lands

`/impeccable harden` scoped to the ES copy pass: the §10 Batch 3 leftover that PRODUCT.md sharpened
by recording full en/es parity as a standing rule. This session closed it — **all 12 posts now have a
Spanish counterpart.**

### The four scope calls (asked before any edit)

1. **Boundary: full ES migration, all 12 posts** — not shells only, and not a metadata-only layer.
2. **`/es/blog` filters out untranslated posts** — the Spanish index never lists an English body
   behind a Spanish route, which is the constraint PRODUCT.md states in words.
3. **`.impeccable/` is gitignored** (resolves the prior session's open decision, below) — the sidecar
   is regenerable, so `PRODUCT.md` + `DESIGN.md` are the durable record. Those two stay untracked on
   purpose; this commit carries the ES pass only.
4. **Commit the ES pass only, no push.**

### What shipped

- **12 Spanish posts** under `content/es/blog/**`, mirroring the English tree path for path (same
  slug, date, tags, stack, repoUrl, image, ogImage, year, team_size, featured, hidden, minRead).
  Frontmatter is byte-identical to the English original except `locale: "es"` plus the translated
  `title` / `description` / `outcome_headline` / `role`. The three Daka studies stay `hidden: true`.
- **Code fences are verbatim** — including mermaid `classDef` lines, node ids and file trees. Only
  mermaid node labels and image alt text were translated.
- **`content.config.ts`**: the `blog` collection takes two `include` sources and gains a `locale`
  field defaulting to `en` — the same shape the `home` collection already used.
- **One predicate for parity.** `hasSpanishCounterpart()` in `app/utils/links.ts` (shell routes plus
  every `/blog/…` path) now feeds **both** the footer switcher and `app.vue`'s `hreflang` block, so
  they cannot drift. The ES index and a post's surround links filter by locale.
- **ES copy fixes**: `Artículo`, `Limpiar etiquetas`, `Sobre mí`, `Página no encontrada`, and
  `uses.md`'s `día a día` / `días` / `está` / `configuración`.
- **Two Spanish shells linked to English post routes** — `content/es/about.md` → the supermarket PWA
  study, `content/es/now.md` → Semantichelp — now point at `/es/blog/…`.

### Two things the migration broke or exposed (both fixed)

- **RSS regression.** The feed is a single English channel declaring `<language>en-US</language>`.
  Adding ES posts silently made it **18 items, every post duplicated**. `server/routes/rss.xml.ts`
  now filters to the default locale; back to 9 items. An `/es/rss.xml` is the parity fix and is still
  open — noted under §10 Batch 3 below.
- **`locale` is not filterable in SQL.** A Zod `default` is **not** materialised in the queryable
  column, so `.where('locale', '=', 'en')` matched nothing and **blanked the English blog index** —
  while the identical pattern on `hidden` works fine. Both pages filter in JS instead, with a comment
  saying why. Do not "simplify" that back into a `.where()`.

### Verified

- `npm run lint`, `npm run typecheck`, `npm run build` all clean.
- `dist/`: 9 ES post pages (the 3 hidden ones correctly absent, matching English), the ES index lists
  exactly 9 `/es/blog/…` cards and **0** `/blog/…`, `hreflang` pairs en↔es with `x-default` on both
  locales and self-canonicalises per locale, the sitemap carries all 30 URLs (both locales), RSS is
  back to 9 items with no `/es/blog` leaks.
- **Real-browser checks at 1893px and 390px** (throwaway static server over `dist/`): no horizontal
  overflow on the ES post, the ES index, or `/es/uses`; ES tables widen only 295→309px and stay inside
  their scroll container; the ES Semantichelp post renders one `h1`, 7 `h2`, 6 tables, 1 code block
  and **zero** literal `DecisionCheck` / `:u-icon` leakage. Spanish expansion is safe at 390px.
- Detector: `impeccable detect --json` over all five changed UI files returned `[]`.
- No English content file was modified (`git status content/blog/` is empty).

### Observed, not fixed (deliberate — each is site-wide or pre-existing)

- **Prerendered `opacity: 0`.** motion-v's `initial` state ships in the static HTML — 12 nodes on the
  home page, 9 on the ES blog index. So the list is genuinely **invisible without JS**. This settles
  the prior session's question: a fast programmatic scroll does skip IntersectionObserver callbacks
  (confirmed: 3 nodes stayed hidden), but it is *also* really in the HTML. Fixing it means changing
  how motion initialises, which brushes the Once Rule — the user chose record-not-fix.
- **A post body can contain several `h1`s.** Posts open with `# Situation` / `# References` under the
  page's own `<h1>`. Pre-existing in English; reproduced faithfully in Spanish rather than diverging.
- **Blog cards carry a broken `aria-label`** (`"v-ifv-ifv-if" + title`) and a `role="Engineer"`
  attribute leaked from frontmatter through `v-bind="post"`. Both locales, pre-existing.
- **`bcv-scraper.md` has an orphan `# References` heading** immediately before `## Outcome`, plus a
  duplicate `## References`. Reproduced faithfully in ES — fix in both locales together, or not at all.
- **`supermarket-pwa-recovery.md` still carries a hidden HTML placeholder comment** asking the author
  for metrics. PRODUCT.md forbids fabricated numbers, so it stays empty and is reproduced in ES.
- **`theme-color` mismatch** and the **Mermaid-fence-renders-as-code** issue are unchanged from the
  prior session.

### Operational note for the next session

**The dev server on `:3000` (pid 161021) is stale and needs a restart.** Running `npm run build`
regenerates `.data/content/contents.sqlite`, and the running dev server then 404s *everything*,
including pages that worked minutes earlier. Verified against the built `dist/` instead. Nothing is
wrong with the code — restart the dev server and it recovers.

**Verifying the built artifact without a dev server.** `browser_read` is a real headed Chrome with a
persistent profile, so it is the fastest way to check a page — but it only speaks to a URL, and the
dev server may be down. Point it at `dist/` instead: serve the directory with a ~20-line node static
server that also maps `/foo` → `foo.html` (Nitro writes `about.html`, not `about/index.html`). Two
things learned the hard way: `browser_read`'s `eval` and `scroll` options **only work when `mode`
names them** (`mode: "eval,shot"`), and two `browser_read` calls in one turn collide on the same
Chrome profile and fail — call it sequentially. For a mobile-width layout check, iframe the page at
390px and read `scrollWidth` vs `clientWidth` from the iframe's document; Chrome is at
`/etc/profiles/per-user/ivan/bin/google-chrome` if you prefer `--headless --dump-dom`.

### Open decisions from this session

- **`/es/rss.xml`** — the feed is English-only by design, so Spanish posts are unreachable by feed.
  A second feed plus a per-locale `<link rel="alternate">` is the parity fix.
- **`PRODUCT.md` + `DESIGN.md`** are still untracked. Tracking them is a one-commit decision, not a
  review of this pass.

## Session (2026-10-26) — the Impeccable design context lands

The goal was to try the `impeccable` skill on this repo. It ran `context` → `init` → `document`, and
the session ended at a context checkpoint, so **no UI files were touched and nothing is committed.**
`PRODUCT.md`, `DESIGN.md` and `.impeccable/` are all untracked working-tree files.

### Three new files

- **`PRODUCT.md`** (new, `impeccable:product-schema 1`) — durable product truth. Its whole point is
  that it settles the contradiction `docs/brand-strategy.md` §1–2 has been carrying since May 2026:
  those docs still push *"e-commerce rescue + GCP & DataOps"* and a `/case-studies/` URL structure.
  PRODUCT.md records the shipped reality instead and marks the old docs as historical thinking.
- **`DESIGN.md`** (new) — the incumbent visual system, extracted in scan mode. Eight canonical
  sections in order, 13 named rules, YAML frontmatter parsing clean.
- **`.impeccable/design.json`** (new) — the sidecar (schemaVersion 2, 7 renderable components). Its
  `narrative.rules` reconcile one-for-one with DESIGN.md's named rules.

### The four user calls that went into PRODUCT.md

1. **Audience:** both hiring managers and clients, with **hiring leading** when the two compete.
2. **Positioning:** **one arc — rescue, then build.** Not the docs' GCP/DataOps story, and not the
   current copy's platform-only framing either; recovery is the proof that makes the platform work
   credible.
3. **Availability:** open to **both roles and projects** right now — so the existing `available: true`
   and the calendar CTA are accurate as shipped.
4. **North Star:** *"The Field Notebook"* — the `sm:border-x` hairlines re-read as margins, the dated
   work log as entries. Monochrome is confirmed **deliberate identity**, not an unfinished palette.
   Depth is **flat by default** with the nav pill and photo frames as the only two lifts. Components
   should feel **plainspoken and utilitarian**.

### Design decisions now on record in DESIGN.md

- **The Zero-Hue Rule** — interface chrome never carries saturation. The accent is literally a grey
  (`zinc`-500 light / `zinc`-400 dark) and now says so. Only two exemptions: the availability dot and
  a named company's brand mark.
- **The Inverted Ramp Rule** — dark mode is the same grey ramp read backwards, which is how the
  measurements actually fell out (`--ui-text` dark ≈ `--ui-bg` light steps). Adding a colour means
  adding it to both directions or neither.
- **The Two Lifts Rule** — only the floating nav and framed media carry a shadow. A third is a defect.
- **The Ruled Column Rule / The Floating Pill Rule / The Breath Rule** — 896px column with hairlines,
  one floating blurred nav pill, sections separated by 96px of space rather than borders.
- **The Once Rule** — motion is a one-shot entrance (`once: true`), never a loop; the availability
  dot is the single exception.
- Confirmed anti-references, all four chosen: recruiter/agency template · developer-terminal pastiche ·
  generic SaaS marketing page · motion as decoration.

### Two real defects found while measuring (recorded, not fixed)

- **`theme-color` does not match the dark page.** `app/app.vue:9` sets `#020618`; the actual dark
  background is `oklch(20.5% 0 0)` ≈ `#171717`. Noted in DESIGN.md with a "don't carry this forward"
  line.
- **In-view motion did not render in a full-page capture.** The work-experience rows sat at
  `opacity: 0` in the light-mode screenshot. This may be a screenshot artefact (`while-in-view` not
  firing during a fast programmatic scroll) rather than a real bug — **verify with a real scroll
  before "fixing" anything.** Everything else on the page was present in the same capture.
- Also observed: `app/components/PolaroidItem.vue` is referenced by **no page** (grep count 0). It is
  documented as unused so nobody mistakes its `font-serif` captions and `drop-shadow-2xl` for the
  live photo treatment.

### Verified vs unverified

**Verified:** DESIGN.md frontmatter parses and carries 13 colours / 6 typography roles / 4 radii /
7 components; all eight canonical headings present in the right order; 13 named rules agree with the
sidecar; `.impeccable/design.json` is valid JSON; token values sampled from the running dev server in
**both** colour modes (dev server was already up on `:3000`, pid 161021); no user-facing form fields
exist anywhere in `app/` or `content/`; `PolaroidItem` has zero references; `testimonials` is an
empty array.

**Unverified:** anything about the live site — no build or typecheck was run this session, because no
UI file changed. The ES parity gap in PRODUCT.md is recorded from reading the repo, not from a build.

### Open decision

`.impeccable/` is untracked and **not listed in `.gitignore`**. Decide whether the sidecar ships with
the repo (useful to a future agent) or gets ignored (regenerable). Nothing has been committed either
way, so this is still a free choice.

> **Resolved 2026-10-26 (second session, above):** `.impeccable/` is gitignored — the sidecar is
> regenerable and `PRODUCT.md` + `DESIGN.md` are the durable record.

### Next step

Run `/impeccable harden` scoped to the **ES copy pass** — the §10 Batch 3 leftover that PRODUCT.md
now sharpens, because full en/es parity is a recorded rule while **no blog post or case study has a
Spanish counterpart**. Start it in a fresh session; this one ended at 162k tokens and the work was
deliberately deferred rather than started.

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
- **§10 Batch 3 leftovers:** ~~the ES copy pass~~ (done 2026-10-26, above), **`/es/rss.xml`** — the
  English feed is now correctly English-only, so Spanish posts have no feed at all — and the
  Lighthouse gate (§6 Sprint 4).
- **CV location sync to Valencia** — Curriculums `i18n.yml` + PDF regeneration, deferred by the user.
- `docs/brand-strategy.md` §1–2 still pivots on "GCP & DataOps 30%" and contradicts the positioning.
  Authoring job, not a sync.
- The Mermaid-fence issue above, if it is ever worth fixing.

## Next step

The ES copy pass is committed (not pushed). Restart the dev server on `:3000` if you need it.

The cheapest remaining §10 Batch 3 item is **`/es/rss.xml`**; the **Lighthouse gate** has the most
user-visible payoff. The recorded-but-unfixed defects above are all site-wide authoring or styling
jobs — pick one deliberately rather than folding it into a copy pass.
