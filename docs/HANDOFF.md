# Handoff — alvarezivan.net

_Updated 2026-10-27. Authoritative state for the next session._

## Session (2026-10-27, tenth) — the Mermaid chunk was three bugs, not one

The one call that opened the session: **the case-study TBT / Mermaid chunk**, the handoff's named
priority and the only thing keeping `npm run lh` red. The push stays a user decision.

### Root cause (measured, not guessed)

Three independent defects in `app/plugins/mermaid-render.client.ts`, all of them visible in the built
`dist/` before any edit:

- **The chunk loaded on every route.** `renderMermaidBlocks()` called `await ensureMermaid()` — the
  dynamic `import('mermaid')` — *before* it queried `pre.language-mermaid`. `/` and `/blog` have no
  fence, so both paid 140 KB gzip plus parse plus `initialize()` for nothing. Measured with
  `playwright-core` + the installed Chrome at a 412×915 viewport: the 606 KB raw (`CD5WG4Ry.js`)
  chunk was requested on `/`, `/blog`, `/blog/from-nuxt-to-hugo` **and** both case studies — 140 KB
  gzip on all of them. That is why the failing page was only ~57 KB heavier than `/` rather than
  140 KB lighter.
- **The diagram rendered twice.** `scheduleRender` set `pending = true` and cleared it *before*
  awaiting the async render, so `app:mounted` and `page:finish` both got through, both queried
  `:not([data-mermaid-rendered="true"])` before either had marked the fence, and both rendered it.
  The page settled with `data-mermaid-generated="true"` × **2** and two `<svg>` — two dagre layouts
  inside the TBT window.
- **It ran eagerly.** The render fired in a `requestAnimationFrame` immediately after mount, i.e.
  squarely inside the FCP→TTI window instead of after it.

The fence sits at y≈3280 on mobile (viewport 915, doc 12659) — about 3.6 screens below the fold — so
there was no reason for any of this work to happen during load.

### What shipped (one commit, unpushed)

- **Gate:** `renderPass` bails before the import when no fence is due, so a route without a diagram
  never downloads, parses or initialises mermaid.
- **De-dupe:** the `pending` flag is replaced by a single-flight `inFlight` promise plus a
  `rerunRequested` / `resetRequested` queue, so a theme flip or route change landing mid-render
  joins the pass in flight instead of racing it into a second layout.
- **Defer:** `dueBlocks()` — fence top above `innerHeight + 1600px` — checked on
  `scroll` / `resize` / `app:mounted` / `page:finish`, replacing the post-mount rAF.

### The dead end, recorded so it is not re-tried

This was implemented with an `IntersectionObserver` first, and **rejected on measurement**: IO only
fires on threshold *crossings*, so `window.scrollTo(bottom)` jumps a fence from below the viewport to
above it with no crossing, and the observer reports nothing — the diagram stayed as code
permanently (measured: `0` svg, `pre` not hidden). The horizon check treats a fence already *above*
the viewport as due, which is what fixes that case.

### Verified

- **TBT median on the failing page: ~830–890 ms → 411 ms** (hard cap 500). Full `npm run lh`
  (build + mobile + desktop) reports **zero assertion errors**. Mobile TBT medians now 277 / 211 /
  411 for `/`, `/blog`, the case study; desktop `/` TBT 2 ms, perf 93–95, a11y 100, bp 96, seo 100.
  FCP remains a `warn` (deliberately the aspiration, not the gate).
- **Mermaid chunk requests before scroll: 0** on `/`, `/blog`, `/blog/from-nuxt-to-hugo` and both
  locales of both case studies — including the case-study pages themselves, which no longer touch it
  until the diagram is approached.
- **Diagrams still render, exactly once** (`1` svg, `pre` hidden, `0` error containers): on gradual
  scroll, on an instant fling to the bottom, on client-side navigation from `/blog`, and on both
  locales of both case studies. A theme flip re-renders with a new id and still leaves exactly one
  container.
- `npm run lint` + `npm run typecheck` clean; hydration clean across UTC / `Pacific/Kiritimati` /
  `America/Caracas` on 12 routes; `impeccable detect --json` → `[]`.

### Defect closed

The recorded “Mermaid fence renders as code” item is **closed**. It was logged as “`MermaidDiagram.vue`
never fires because fenced code isn't mapped to it” — that predates `mermaid-render.client.ts`, which
handles `pre.language-mermaid` directly. That path now renders once, lazily, in both locales.

### Recorded, not fixed

- A hard fling still has a brief window where the fence is visible as code while the 140 KB chunk
  loads and lays out. No-JS still shows the highlighted code block by design (progressive
  enhancement: the fence is the fallback, swapped for a diagram when JS runs).
- `app/components/content/MermaidDiagram.vue` is **dead code** — no reference anywhere in the repo
  and no occurrence in the built JS. Left alone; it is the unused second render path.

### Next step

Start fresh on a clean tree. The remaining recorded defects are now the hidden metrics placeholder in
`supermarket-pwa-recovery.md` and the `valid-source-maps` failure on first-party JS. The push stays a
user decision.

## Session (2026-10-26, ninth) — one `h1` per post, and the gate's Mermaid-shaped ceiling

The one call that opened the session: take **multiple `h1`s per post body**, the next-smallest of
the recorded defects. The push stays a user decision.

### Root cause

The four older articles used `#` for their top-level sections, while the post template already
renders the title as the page's `h1`. So every section heading shipped as a second (and third, and
fourth) `h1` on the page. The case studies and `jp-landing` already used `##`; the older articles
predated that convention. `bcv-scraper.md` additionally carried an orphan `# References` sitting
empty immediately above `## Outcome` — the separately-recorded orphan-heading defect.

### What shipped (one commit, unpushed)

- Eight content files (the four articles × en/es): `from-nuxt-to-hugo`, `intern-movie-torrent`,
  `japanese-input`, `bcv-scraper`. Top-level sections demoted one level (`#` → `##`, their `##`
  subsections → `###`), and the orphan `# References` / `# Referencias` line deleted. No code change.
- Deliberately **not** a render-time `ProseH1 → h2` override: standalone pages (`contact`, `now`,
  `uses`) render only `ContentRenderer`, so their body `h1` **is** the page's single heading — a
  blanket override would have left those pages with zero `h1`.

### Verified

- All 18 rendered posts (en + es) now have exactly **one `h1`**; hierarchy descends correctly
  (`from-nuxt-to-hugo`: 3×`h2` / 5×`h3`; `intern-movie-torrent`: 3×`h2` / 2×`h3`). The extra `h2`
  “Footnotes” is Content's own.
- Zero body `h1` left in the blog collections; no internal `#`-anchor links existed, so no deep link
  broke. `npm run lint` clean; hydration stayed clean (content is payload data, not JS).
  `impeccable detect --json` → `[]`.

### Newly recorded — the Lighthouse gate's hard `total-blocking-time` now fails

`npm run lh` fails the hard `total-blocking-time ≤ 500ms` assertion on
`/blog/case-studies/semantichelp-rag-knowledge-base` (medians ~830–890ms over three runs; `/` and
`/blog` pass). **That page is untouched by this session's diff.** Its TBT is dominated by a **606 KB
Mermaid + dagre + katex chunk** (`CD5WG4Ry.js`) that loads on it. The same gate passed earlier in
this session, so the bar is borderline; it failed consistently afterwards. The `h1` fix does not
regress it — but the gate is not green today.

### Next step

Start fresh on a clean tree. **Priority: the case-study TBT / Mermaid chunk** — it is the only thing
keeping `npm run lh` red, and it likely overlaps the recorded “Mermaid fence renders as code” defect.
After that: the orphan `# References` is now closed, so the remaining recorded defects are the hidden
metrics placeholder in `supermarket-pwa-recovery.md` and the Mermaid fence; plus `valid-source-maps`.
The push stays a user decision.

## Session (2026-10-26, eighth) — the hydration mismatch was a timezone, not a template

The one call that opened the session: take the **blog hydration mismatch**, the most user-visible
remaining failure. The push stays a user decision.

### Root cause (measured, not guessed)

Content dates are date-only values (`date: "2026-06-15"`) that Content parses to a `Date` at **UTC
midnight**. Both the post page's `formatDate` and `UBlogPost`'s internal reka-ui `useDateFormatter`
formatted that instant in the **runtime's own timezone**. Cloudflare's build prerendered in UTC; the
reader's browser uses theirs, so in any negative-offset timezone the two formatted the adjacent
calendar day. Vue reports that as a hydration **text** mismatch, and production's only symptom is
the generic `Hydration completed but contains mismatches.` — the same message the earlier sessions
recorded, with no details to explain it.

This reproduced on the live site but never against a local build, because a local prerender and the
test browser share the machine's `America/Caracas` offset. Forcing a foreign browser timezone
(`playwright-core` + the installed Chrome, `timezoneId: 'UTC'`) surfaced it immediately:
`rendered on server: "Jun 14, 2026" / expected on client: "Jun 15, 2026"`.

### What shipped (one commit, unpushed)

- **`app/utils/date.ts`** — `formatPostDate(date, locale)`, an `Intl.DateTimeFormat` pinned to
  `timeZone: 'UTC'`. Date-only content is a calendar date, not an instant; formatting it in UTC
  always renders the authored day. Locale is `es-ES` / `en-US`.
- The three date render sites now use it: the blog-index card (`#date` slot on `UBlogPost`, whose
  built-in formatter cannot be told a timezone), the home blog preview (`#date` slot,
  `app/components/landing/Blog.vue`, which now calls `useI18n`), and the post-page header
  (`app/pages/blog/[...slug].vue`, its local `formatDate` deleted).
- `UBlogPost` still receives `:date` for the `<time datetime>` attribute — `toISOString()` is
  timezone-independent, so that attribute never mismatched.

### Verified

- Production build (no debug flag), client TZ `UTC`, `Pacific/Kiritimati` (+14) and
  `America/Caracas` (−04), **all 17 primary routes and locales**: zero hydration output. This is the
  exact condition that broke before the fix (server prerendered in −04, client in UTC).
- Card and post dates identical across every timezone (`Oct 25, 2026`, `Jun 15, 2026`); prerendered
  HTML carries the authored day with `datetime` intact.
- `npm run lint` and `npm run typecheck` clean; `npm run lh` **passes (0 errors)** — desktop `/`
  perf 96–97, a11y 100, best-practices 96, SEO 100; `impeccable detect --json` → `[]`.

### Side effect, noted

The `/es` blog index now renders Spanish months (`25 oct 2026`). `UBlogPost`'s own formatter had
fallen back to English while the post pages already localized; the index now matches the post pages
and the already-localized category/tag badges.

### Recorded, not fixed

A pre-existing reka-ui **attribute** mismatch on `/`: `id="reka-accordion-trigger-v-0-0-5-…"` on the
server vs `v-0-0-0-…` on the client (accordion / collapsible / tabs). It is a dev/details-only
diagnostic — Vue's production bundle does not check attribute mismatches, so it produces **no**
console error and was not the recorded defect. It survived the date fix.

### Next step

Start fresh on a clean tree. The blog hydration mismatch is closed; the open list is the four
recorded defects (multiple `h1`s per post body is next-smallest, then the orphan `# References` in
`bcv-scraper.md`, the hidden metrics placeholder in `supermarket-pwa-recovery.md`, the Mermaid
fence) and `valid-source-maps` on first-party JS. The push stays a user decision.

## Session (2026-10-26, seventh) — motion polish: the blog flicker is dead, the Once Rule survives

The one call that opened the session: the user reported a **flicker when the blog cards appear on
scroll** and asked for a motion polish pass while at it. The push stays **held** (user's call).

### Root cause (measured, not guessed)

Live-site rAF sampling showed three cooperating defects, all in the framer `while-in-view` pattern:

1. **The list-index stagger was the flicker.** `:transition="{ delay: 0.1 * index }"` delays each
   card by its position in the whole list (up to 1.2s). After a scroll burst, cards popped in on a
   100ms cascade — several fully in view or already passed — reading exactly as a flicker.
2. **Cards could strand invisible.** A fast jump skips IntersectionObserver enter events; one card
   stayed `opacity: 0` for the whole 6.5s sampled run, with `once: true` never firing.
3. **Prerendered `opacity: 0`.** The whole list shipped invisible until hydration — the recorded
   no-JS defect, and the reason the first screen of cards popped in after load.

### What shipped (two commits, unpushed)

- **`app/components/RevealOnce.vue`** — the new system's single reveal mechanism, replacing framer
  `while-in-view` on the blog index, `WorkExperience`, `FAQ` and `/about`:
  - prerendered HTML is the **visible resting state** — no inline `opacity: 0` ships with content;
  - on mount, only content below `fold + max(5%·vh, 48px)` goes hidden (the buffer absorbs
    font/layout settling, so fold-adjacent content is never re-hidden — this exact bug burned a
    first draft in dev);
  - a bare `IntersectionObserver` (threshold 0.05, bottom `rootMargin` 64px) fires just before
    entry; the reveal is a 450ms `cubic-bezier(0.16, 1, 0.3, 1)` fade with a 12px rise;
  - stagger is local and capped (`70ms × index ≤ 210ms` for the experience rows; no delay on blog
    cards — entry timing is the stagger);
  - `prefers-reduced-motion` skips the entrance entirely (content stays visible).
- **`app.vue`** wraps the app in `MotionConfig reduced-motion="user"`, so the framer-driven hero
  respects the OS setting (framer jumps positional keys, keeps opacity).
- **Hover fix found along the way:** `ui.root` passed a bare `group`, which tailwind-merge keeps
  over the theme's `group/blog-post`, silently killing every `group-hover/blog-post:` compound
  (the card image zoom among them). Root now `group/blog-post`; the image got
  `transition-transform duration-300` so the zoom isn't a snap.
- **Hero** keeps its authored entrance, now on `ease [0.16, 1, 0.3, 1]`; it remains SSR-hidden on
  purpose — that is the one gesture the system claims.
- **`DESIGN.md`** — the Motion section now documents `RevealOnce` semantics, the Once Rule's
  “already-visible content never animates” addition, and the named-group hover trap.

### Verified

- rAF samplers against the built `dist/` (served Pages-faithfully): cards reveal in one 450ms ramp
  the moment their edge approaches the fold (0.53 → 0.64 → 0.90 → 0.98 → 1 over ~300ms sampled),
  no cascade, no pop-while-fully-visible; after scrolling back to the top everything stays
  `opacity: 1` — revealed content never re-hides (Once Rule intact). SSR ships zero hidden cards
  on `/blog` (the only `opacity: 0` in `dist/blog.html` is the `reveal-pending` CSS rule).
- Home: 6 `reveal-once` wrappers (5 experience rows + FAQ), first-viewport one visible, rest
  pending below the fold.
- `npm run lint` and `npm run typecheck` clean; `impeccable detect --json` → `[]`.
- Lighthouse probe (1 run each config, the quick mode): `/` 65/100/96/100 mobile, 97 desktop;
  `/blog` 61 mobile; a11y 100 and CLS 0 everywhere — the SSR-visible change shifted nothing.
  Full 3-run gate not re-run this session.
- Screenshots were taken but this session's model cannot view them; the telemetry above is the
  visual evidence. Worth one human look after deploy.

### Recorded, not fixed

- **Reduced-motion path is code-verified only** — the test browser couldn't force the OS setting.
- The **blog hydration mismatch** (console error, pre-existing) is still open and unrelated to the
  reveal change.
- The four other recorded defects (multiple `h1`s, orphan `# References`, hidden metrics
  placeholder, Mermaid fence), plus `valid-source-maps`, remain open.
- The recorded “prerendered `opacity: 0`” defect is **closed by this session**.

### Open decisions

- **The push — resolved.** Shipped on the session's close: `develop` pushed (1394ea2..32cbac4), Cloudflare
  Pages deployed within ~6 minutes, and the live `/blog` now serves the `reveal-once` markup with no
  hidden cards in the prerendered HTML (verified by polling until the build flipped). One human look
  at the deployed reveal is still pending per the screenshot note above.

### Next step

Start fresh on a clean tree. Ask which to take: the **blog hydration mismatch** (now the most
user-visible of the failures), one of the four remaining recorded defects (`opacity: 0` is dead;
multiple `h1`s is the next smallest), or `valid-source-maps`. The push stays a user decision.

## Session (2026-10-26, sixth) — the contrast pair is fixed: a11y is 100 wherever it is measured

The one call that opened the session: take the **colour-contrast pair** over a recorded defect. The
push stayed **held** again. Both defects the fifth session recorded are now fixed, and the gate's
`color-contrast` warning is silent.

### What shipped (one commit, unpushed)

- **The availability badge stops being green.** `app/components/landing/Hero.vue` had
  `:color="global.available ? 'success' : 'error'" variant="ghost"`, so the *label* rendered
  `#00c950` on white — **2.21:1**. It is now `color="neutral"`, which is what `DESIGN.md`
  ("Signature: the Availability Badge") already described: a ghost button whose leading icon is the
  two-layer `bg-success` / `bg-error` dot. The dot is untouched — both spans are still there, so the
  One Dot rule still holds and the label is body ink. This also silently fixes the latent
  `Not available at the moment` state, whose red label was low-contrast too.
- **The active blog filter stops being zinc-on-zinc.** `app/pages/blog/index.vue` renders active
  filters as `color="primary" variant="soft"` (as DESIGN.md records). The soft fill is
  `bg-primary/10` (`#f1f1f2`) and the soft label is `text-primary` (`#71717b`), which at the 12px
  `size="xs"` tag size is **4.27:1**. The two active cases (category and tag) now pass
  `:ui="{ base: 'text-default' }"`, so the label reads body ink (`neutral-700`, 9.09:1 on that fill)
  while `bg-primary/10` still carries the accent grey — the fill, not the text, stays the accent.
  Only the active button changes: `undefined` for the rest, and the diff proves it (old `dist` had
  33 `text-default` + 1 `text-primary` on /blog; the new render has 34 + 0).
- `lighthouserc.cjs`'s stale comment is rewritten; the assertion stays **`warn`** — this session does
  not re-open the gate decision.

### Verified (Lighthouse 12.6.1, `npm run lh` on the built `dist/`, 3 runs each)

| URL | perf | a11y | `color-contrast` |
|---|---|---|---|
| `/` mobile | 65 | **97 → 100** | 1 (0 failing nodes) |
| `/blog` mobile | 62–68 | **96 → 100** | 1 (0 failing nodes) |
| case study mobile | 56–57 | 100 (was 100) | 1 |
| `/` desktop | 96 | **97 → 100** | 1 |

`npm run lh` exits 0 on both configs. `npm run lint` and `npm run typecheck` clean.
`impeccable detect --json` returns `[]`. Against the dev server, both locales check out: the
availability button is a neutral ghost with its two `bg-success` spans intact and zero
`text-success` anywhere on `/`; `/blog` and `/es/blog` both render the active filter as
`bg-primary/10` + `text-default`.

### Recorded not fixed — a wrong line in DESIGN.md

`DESIGN.md` ("Ghost") says a ghost label is `text-muted` (`ink-muted`, `oklch(55.6% 0 0)`). Nuxt UI
4.3 renders a **neutral** ghost as `text-default` (body ink) — verified in the dev HTML for the
social links, the colour-mode toggle and the inactive filters, all of which were already
`text-default` before this session. It is harmless (they pass contrast), but the doc is wrong and was
not edited here.

### What this did not do

Mobile perf is unchanged at 56–68 with FCP 3.3–4.6 s under 4× CPU — the JS bundle dominates, not
images. Colour contrast is no longer a gate warning; performance still is what it is.

### Open decisions

- **The push.** Now **fourteen commits** on `develop` (`ca114eb` … this fix, plus the handoff
  commit) are unpushed; a push is the production deploy. Held deliberately again.
- **The five remaining recorded defects** — the prerendered `opacity: 0` is the prior pick, then
  multiple `h1`s per post body, the orphan `# References` in `bcv-scraper.md`, the hidden metrics
  placeholder in `supermarket-pwa-recovery.md`, and the Mermaid fence.
- **Two other recorded failures** — `valid-source-maps` on first-party JS, and the blog hydration
  mismatch. The contrast pair is off this list.
- **Stale in `PRODUCT.md`**: "A Lighthouse performance gate is discussed but not documented or
  enforced" is false since `43785b8` (the gate exists and is documented), and "Pillar/filter UX on
  `/blog` is planned but unbuilt" was already false — the filters ship. Both predate this session;
  neither was touched.

### Next step

*(Superseded by the seventh session, which took the flicker/motion report and closed the
prerendered `opacity: 0` defect. Kept as the record of what was open that day.)*

Start fresh on a clean tree. Ask which to take: the **prerendered `opacity: 0`** (prior pick), one of
**four other recorded defects** (multiple `h1`s, orphan `# References`, hidden metrics placeholder,
Mermaid fence), the **`valid-source-maps`** failure, or the **blog hydration mismatch**. The push
stays a user decision.

## Session (2026-10-26, fifth) — the Lighthouse gate is real: a measured floor, not the plan's bar

The one call that opened the session: take the **Lighthouse gate thresholds** (§6 Sprint 4) rather than
one of the recorded defects. The push stayed **held** again. The decision the last session deferred —
"measure, then propose" — is now **made and asserted**: the gate exists and passes from the built
artifact.

### What shipped (one commit, `43785b8`, still unpushed)

- **`scripts/serve-dist.mjs`** — a Pages-faithful static server for `dist/` (gzip + `dist/_headers`
cache rules) that maps `/foo` → `foo.html`. This is the piece `@lhci/cli`'s built-in `staticDistDir`
lacks: Nitro writes `about.html`, not `about/index.html`, so the built-in server 404s every page.
- **`lighthouserc.cjs`** (mobile) and **`lighthouserc.desktop.cjs`**. The plan's §6 bar is perf ≥ 95,
a11y ≥ 95 — met on desktop, nowhere near on mobile (57–67). So the gate is a **floor plus an
aspiration**, not a rewritten target:
  - hard anywhere: a11y ≥ 0.95, best-practices ≥ 0.90, SEO ≥ 0.90, TBT ≤ 500 ms, CLS ≤ 0.1, LCP ≤ 10 s;
  - mobile perf hard floor **≥ 0.50** (catastrophe guard), `FCP ≤ 2.5 s` and colour contrast as **warnings**;
  - desktop: perf ≥ 0.90, LCP ≤ 2.5 s hard.
- **`npm run lh`** builds, then runs both configs; `lh:mobile` / `lh:desktop` assume a fresh `dist/`.
`.lighthouseci/` is gitignored. **Local-only by choice** — the repo still has no `.github/workflows`,
and deploy is Cloudflare Pages.

### Verified (Lighthouse 12.6.1, 3 runs each, on the built `dist/` via the new server)

| URL | perf | a11y | BP | SEO | LCP | FCP | TBT | CLS | bytes |
|---|---|---|---|---|---|---|---|---|---|
| `/` mobile | 65 | 97 | 96 | 100 | 6.14 s | 3.92 s | 85 ms | 0 | 671 KiB |
| `/blog` mobile | 67 | **96** | 96 | 100 | 6.01 s | 3.35 s | 167 ms | 0 | 958 KiB |
| case study mobile | 57 | 100 | 96 | 100 | 6.93 s | 4.54 s | 279 ms | 0 | 874 KiB |
| `/` desktop | 97 | 97 | 96 | 100 | 1.23 s | 0.73 s | 6 ms | 0 | 664 KiB |

`npm run lh` and `npm run lh:desktop` both exit **0**; the only output is the FCP and colour-contrast
warnings. `npm run lint` and `npm run typecheck` clean. Two `maxLength`-vs-`maxNumericValue` notes worth
keeping: LHCI's `maxLength` counts `details.items.length`, so LCP/TBT/CLS/FCP **must** use
`maxNumericValue` (the first draft silently asserted "items ≤ 0.1" and failed CLS).

### New finding, recorded not fixed

**`/blog` a11y is 96, not the 100 the previous session recorded.** The verdict is a
`<span data-slot="label" class="truncate">` at **4.27:1** (needs 4.5) — a *second* contrast defect,
distinct from the 2.21:1 "Available for new projects" pill on `/`. Both are `warn` in the gate, which
is why the ≥ 0.95 floor still passes. Worth folding into whatever fix takes the 2.21:1 pill.

### Open decisions

- **The push.** Now **eleven commits of work** on `develop` (`ca114eb` … `43785b8`, plus this handoff
commit) are unpushed; a push is the production deploy. Held deliberately again.
- **The five remaining recorded defects** — #3 (card `aria-label`) is fixed; the prerendered
`opacity: 0` is still the prior pick, then multiple `h1`s per post, the orphan `# References` in
`bcv-scraper.md`, the hidden metrics placeholder in `supermarket-pwa-recovery.md`, and the Mermaid
fence.
- **Three other recorded failures** — the 2.21:1 pill / now also the 4.27:1 label, `valid-source-maps`
on first-party JS, and the blog hydration mismatch. Mobile perf stays 57–67 because the JS bundle
dominates (FCP 3.3–4.5 s), not images.

### Next step

*(Superseded by the sixth session, which took the colour-contrast pair. Kept as the record of what
was open that day.)*

Start fresh on a clean tree. Ask which to take: one of the **five recorded defects** (the prerendered
`opacity: 0` is the prior pick), the **colour-contrast pair** (2.21:1 pill + 4.27:1 label) so home and
blog a11y can reach 100, or one of the other two recorded failures. The gate no longer needs a decision;
it is committed and reproducible with `npm run lh`. The push stays a user decision.

## Session (2026-10-26, fourth) — the Spanish meta line, and a false alarm about icons

Two user calls opened the session: run the **Lighthouse gate** (§6 Sprint 4) first, then — after that
turned up the copy question — take the **ES meta line copy**. The push stayed **held** on purpose.

The perf half produced three real fixes plus an installed `@lhci/cli` harness. **Update from the fifth
session: those three fixes were committed as `a906ce2`, the tree is clean, and the harness is now a
working gate (`43785b8`). The "uncommitted" wording below is historical.**

### What shipped

- **`client:` is Spanish on the Spanish case studies.** Only four posts carry the field and only one is
  public: `supermarket-pwa-recovery` → `Cadena de supermercados (LatAm)`; the three hidden Daka
  studies → `Empresa reconocida en el sector de retail (LatAm)`. `Vertex Plus Group` stays as-is — it
  is a real name. The English labels are unchanged, so the two locales deliberately differ.
- **`· Team of N` is locale-aware.** It was hardcoded English in
  `app/pages/blog/[...slug].vue:218`; now `Equipo de` / `Team of`. That line was the *only* place
  `client:` renders anywhere in the app (checked: no JSON-LD, OG image or search-index consumer).
- **`PRODUCT.md` records both label sets**, and its "bilingual parity is not achieved … all 12 posts
  are English-only" constraint — stale since the ES pass landed — now says what is true.

### Where that string actually was (the question that prompted this)

`content/blog/case-studies/*.md` + `content/es/blog/case-studies/*.md` frontmatter, rendered by the
single `<span v-if="page.client">` in the case-study meta line. Reachability, measured against the
dev server:

| post | labels | reachable |
|---|---|---|
| `supermarket-pwa-recovery` | `Supermarket Client` / `Cadena de supermercados (LatAm)` | **public**, both locales |
| `retail-ecommerce-recovery`, `retail-ecommerce-rebuild`, `retail-sap-quotation-app` | `Retail Client` / `Empresa reconocida en el sector de retail (LatAm)` | `hidden: true` → **404 on both locales**, absent from indices + RSS |

So the Daka label never reaches a reader. The CV boundary holds as PRODUCT.md states it: `/about` and
`/es/about` name **Tiendas Daka C.A.** and **Biomercados (Alimentos FM)** in the timeline, and
`home.yml` names both in the experience rows — named in the CV surface, anonymous in the case studies
only.

### Verified

- Dev server, both locales: ES renders `2022 · Cadena de supermercados (LatAm) · Programador ·
  Equipo de 2`; EN still renders `2022 · Supermarket Client (LatAm) · Programmer · Team of 2`. The
  Daka descriptor cannot be verified by rendering — all three routes 404 (re-checked).
- No other English leak in the ES meta line (`Team of`, `View Repository`, `Copy link`, `MIN READ`,
  `Read Article` → 0 matches on `/es/blog/case-studies/supermarket-pwa-recovery`).
- `npm run lint`, `npm run typecheck` clean. 12 EN / 12 ES posts, identical slug trees (verified).

### The icons were not broken — do not chase this again

A user report ("the icons don't show up") was investigated and **is a false alarm about the site**.
What was established, so it is not re-litigated:

- `@nuxt/icon` 2.1.1 defaults to `mode: 'css'`, so icons are **mask-based spans, never `<svg>`**. An
  empty `span.iconify` with a `url("data:image/svg+xml…")` `-webkit-mask-image` is a *working* icon.
  Counting `<svg>` and concluding "0 icons" is simply the wrong test.
- Against **production**, every icon span on nine pages is painted: `/` 35/35, `/blog` 37/37,
  the Semantichelp study 31/31, `/about` 17/17, `/uses` 16/16, `/contact` 26/26, `/now` 18/18,
  `/es` 35/35, `/es/blog` 37/37. A screenshot of the live home page shows the nav sun, the arrow,
  the GitHub/LinkedIn marks and the accordion glyphs. The dev server renders them too.
- The *only* place they genuinely 404 is a plain static server over `dist/`: icons resolve through
  `/api/_nuxt_icon/*`, which the Nitro worker serves in production (200) but a static-only server
  cannot. **Icon checks must run against the dev server or `npx wrangler pages dev dist`.**
- Real, recorded-not-fixed fragility underneath it: `@nuxt/icon`'s generated client bundle is
  `export function init() {}` — `clientBundle.scan` defaults to `false` and this project sets no
  `icon` config at all, so nothing is bundled and every icon outside the prerendered CSS depends on a
  runtime request to the worker (which fetches the collection from jsdelivr). It works, but it is one
  worker bug away from a site-wide icon outage.

### Perf work — measured (committed as `a906ce2` after this session)

Baseline and result, Lighthouse 12.2.1, mobile unless noted, against the built `dist/` served
statically with gzip + the `dist/_headers` cache rules (a Pages-faithful stand-in):

| page | perf | a11y | BP | LCP | TBT | bytes |
|---|---|---|---|---|---|---|
| `/` before → after | 56 → **65** | 93 → **97** | 96 → 96 | 11.5 → **6.1 s** | 260 → **80 ms** | 1709 → **671 KiB** |
| `/blog` before → after | 53 → **65** | 100 | 89 → **96** | 19.6 → **7.3 s** | 510 → **210 ms** | 6937 → **1175 KiB** |
| case study before → after | 54 → **58** | 100 | 89 → **96** | 8.9 → **8.2 s** | 440 → **340 ms** | 1562 → **1380 KiB** |
| `/` desktop before → after | 89 → **96** | 93 → **97** | 96 → 96 | 2.1 → **1.2 s** | 0 | 1709 → **664 KiB** |

`/es/blog` measures the same as `/blog` (64 perf), so locale parity holds.

Three fixes, all in the tree:

1. **Card markup.** `v-bind="post"` → explicit `:title/:description/:date/:image` in
   `app/pages/blog/index.vue` and `app/components/landing/Blog.vue`. It was leaking all frontmatter
   onto the `<a>` (`role="Engineer"`, `category`, `client`, `team_size`, `__hash__` …), which is
   **recorded defect #3** and was also the source of the `aria-roles` Lighthouse failure. Fixed here.
2. **Images.** `nuxt.config.ts` gains `image: { provider: 'ipxStatic', quality: 80 }` and the index
   cards pass a `sizes` preset (`sm:92vw md:50vw xl:620px`) plus `format: 'webp'`. The home cards drop
   the image entirely — `ui.header` was already `hidden`, so they were downloading ~500 KiB nobody
   saw. `ipxStatic` was verified to generate `dist/_ipx/**` for the `cloudflare_pages` preset; plain
   `ipx` **cannot** work there (sharp does not run in a Worker). Note `widths` is not a NuxtImg v2
   prop — `sizes` is the preset string that drives both the media queries and the srcset variants.
3. **The content client DB.** `app/app.vue` ran `queryCollectionSearchSections('blog')` inside
   `useLazyAsyncData(…, { server: false })`, i.e. **in the browser on every page load** — which is what
   dragged in `sqlite3.wasm` (~380 KiB), every collection's `sql_dump.txt` (~75 KiB) and a main-thread
   SQLite boot. Replaced by a prerendered `server/routes/search.json.ts` (170 KiB raw, ~48 KiB gzipped)
   fetched the first time the ⌘K dialog opens via `useContentSearch().open`. Verified: no
   sqlite/dump request on page load, and the dialog still opens (ctrl+K on Linux — Nuxt UI remaps
   `meta_k`) and returns real sections.

**Harness, not yet a gate (superseded by the fifth session).** `@lhci/cli` 0.15.1 was a devDependency
with no `lighthouserc`, no `lh` script and no thresholds. The user chose "measure, then propose"; the
fifth session delivered the gate — a floor-plus-aspiration bar, not the plan's strict 95. Note `lhci`'s built-in `staticDistDir` server will **404**
`/about` and friends: Nitro writes `about.html`, not `about/index.html`, and express.static does not map
one to the other — the gate needs a ~40-line static server that does (or `wrangler pages dev dist`).

**Still failing, recorded not fixed:** colour contrast **2.21:1** on the "Available for new projects"
pill (the reason home a11y is 97 and not 100), `valid-source-maps` on first-party JS, and a
`Hydration completed but contains mismatches` console error on the blog index and post pages. Mobile
perf stays 58–65 because FCP is ~3.5–3.9 s under 4× CPU: the JS bundle dominates now, not images.
Two "failures" are **sandbox artifacts, not site bugs**: GTM does not resolve in this environment, and
`/api/_nuxt_icon/*` 404s on any static-only server.

### Open decisions

- ~~**The push.**~~ Superseded: eleven commits by the fifth session, still held.
- ~~**The uncommitted perf work**~~ Committed as `a906ce2`.
- ~~**The Lighthouse gate thresholds**~~ Delivered as the gate in `43785b8`.
- **The six recorded defects** — #3 is fixed in the tree; the other five are untouched, except the
  prerendered `opacity: 0` was re-confirmed on the local static build (a blank page body when the
  in-view animations never fire) and remains the strongest candidate.

### Next step

*(Superseded by the fifth session.)* The perf work is committed (`a906ce2`), the tree was clean, and
the Lighthouse gate was taken and delivered (`43785b8`). The live next step is the one at the top of
this file.

The copy judgement is settled: `Cadena de supermercados (LatAm)` (echoes the Spanish body copy) and,
for the hidden Daka studies only, `Empresa reconocida en el sector de retail (LatAm)`. Both locales are
allowed to differ on purpose — the English labels stay `Retail Client` / `Supermarket Client`.

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
- **The ES client strings** — ~~`client: "Retail Client (LatAm)"` / `"Supermarket Client (LatAm)"`
  are still English on the Spanish pages~~ **Resolved in the fourth session** (see above): the Spanish
  labels are `Cadena de supermercados (LatAm)` / `Empresa reconocida en el sector de retail (LatAm)`.

### Next step

Start fresh. Ask which to take: the **Lighthouse gate** (§6 Sprint 4), or **one of the six recorded
 defects** (the prerendered `opacity: 0` was the prior pick, deferred by this session's RSS item).
Both are separate deliverables. The five unpushed commits and the ES client-string copy call remain
user decisions; nothing was pushed.

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
