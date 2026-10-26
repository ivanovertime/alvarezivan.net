---
name: Ivan Over Time
description: A ruled, monochrome field notebook for a senior engineer's work and writing.
colors:
  paper: "#ffffff"
  paper-sunk: "oklch(98.5% 0 0)"
  paper-raised: "oklch(97% 0 0)"
  rule: "oklch(92.2% 0 0)"
  ink-faint: "oklch(70.8% 0 0)"
  ink-muted: "oklch(55.6% 0 0)"
  ink-body: "oklch(37.1% 0 0)"
  ink-raised: "oklch(26.9% 0 0)"
  ink: "oklch(20.5% 0 0)"
  accent: "oklch(55.2% 0.016 285.938)"
  accent-bright: "oklch(70.5% 0.015 286.067)"
  status-open: "oklch(72.3% 0.219 149.579)"
  status-closed: "oklch(63.7% 0.237 25.331)"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: "32px"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  body:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  meta:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "Atkinson Hyperlegible, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
rounded:
  base: "0.25rem"
  control: "6px"
  surface: "8px"
  pill: "9999px"
spacing:
  base: "0.25rem"
  gutter: "32px"
  section: "96px"
  column: "896px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.control}"
    padding: "6px 10px"
    height: "32px"
  button-ghost-hover:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
  chip-tag:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  nav-pill:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.pill}"
    padding: "0px 16px"
  surface-row:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.surface}"
    padding: "12px 16px"
---

# Design System: Ivan Over Time

## Overview

**Creative North Star: "The Field Notebook"**

This is a working notebook, not a brochure. The site is one narrow ruled column — 896px, hairline
borders down both edges — and everything inside it reads like an entry: a date, a role, a project, a
plain sentence about what happened. The rules are margins. The greys are ink on paper.

The defining decision is that the interface contributes **no hue at all**. There is no brand accent,
no gradient, no coloured button. The two modes are the same nine-step grey ramp read in opposite
directions, and the palette is deliberately achromatic — a deliberate identity choice, not an
unfinished one. Colour enters the page in exactly two ways: from a single semantic status dot, and
from content itself (a company's own brand mark on its icon). When everything is grey, those two
moments carry real weight.

Depth is near-zero and rhythm does the work instead. Surfaces separate by tonal step and hairlines,
not by elevation; only the floating navigation pill and photographic frames are lifted off the page.
Type is one family at every size — Atkinson Hyperlegible, chosen for legibility — so the hierarchy is
built from size, weight and restraint rather than from a second voice. The overall effect should
read as competent and unhurried: an engineer's record, written plainly, that happens to be beautiful
because nothing in it is shouting.

**Key Characteristics:**

- One 896px column with hairline side rules, centred, on every page.
- Achromatic throughout: an eleven-step grey ramp, no accent hue.
- Depth only twice: the floating nav pill and photographic media frames.
- A single typographic voice (Atkinson Hyperlegible), differentiated by size and weight.
- Small radii on controls (6px) and surfaces (8px); full pills for nav, chips and avatars.
- Motion is an entrance, not a decoration: reveal once, then stop.

## Colors

The palette is a single neutral ramp used twice — once forward, once reversed — plus two status
hues that appear only as a dot.

### Primary

- **Accent Grey** (`oklch(55.2% 0.016 285.938)` light / `oklch(70.5% 0.015 286.067)` dark): the
  `primary` role. It is literally a grey — zinc — and that is the point. It appears on active filter
  chips, the trailing arrow on "Read Article", and hover states on footer links. It is never a
  background for anything large, and never the colour of the main call to action.

### Neutral

The ramp is the system. Each step serves one role in light mode and the mirrored role in dark mode,
which is why the token list is shorter than the number of things it dresses:

- **Paper** (`#ffffff`): the light-mode page. In dark mode this value returns as
  `text-highlighted`, so pure white exists in both modes — as page or as ink.
- **Ink** (`oklch(20.5% 0 0)`): light-mode `text-highlighted` and the dark-mode page background.
- **Raised Ink** (`oklch(26.9% 0 0)`): the dark-mode muted/elevated surface and hairline.
- **Body Ink** (`oklch(37.1% 0 0)`): light-mode body text; dark-mode muted borders.
- **Muted Ink** (`oklch(55.6% 0 0)`): light-mode `text-muted` (dates, leads, metadata).
- **Faint Ink** (`oklch(70.8% 0 0)`): light-mode `text-dimmed`; dark-mode `text-muted`.
- **Rule** (`oklch(92.2% 0 0)`): the hairline. Column edges, separators, card borders.
- **Sunken Paper** (`oklch(98.5% 0 0)`) / **Raised Paper** (`oklch(97% 0 0)`): the two tonal steps
  that lift a surface without a shadow — accordion rows, tab indicators, hover fills.
- **Status Open** (`oklch(72.3% 0.219 149.579`) and **Status Closed** (`oklch(63.7% 0.237 25.331)`):
  the only saturated colours in the system, and they appear exclusively as an 8px dot in the
  availability badge.

**The Zero-Hue Rule.** The interface chrome never carries saturation. If a new surface seems to need
an accent colour to work, it needs better hierarchy instead. The two exemptions are the availability
dot and the brand mark of a named company, which belongs to the content, not to the system.

**The Inverted Ramp Rule.** Dark mode is not a second palette; it is the same ramp read backwards.
Adding a colour means adding it to both directions or to neither.

**The One Dot Rule.** Saturation is budgeted at one 8px element per viewport. A second saturated
element anywhere on the page is a defect.

**Observed inconsistency (do not copy):** `theme-color` is set to `#020618` in dark mode and
`#ffffff` in light, while the actual dark page background is `oklch(20.5% 0 0)` (≈ `#171717`). The
browser chrome colour and the page therefore do not match in dark mode.

## Typography

**Display Font:** Atkinson Hyperlegible (400, 700, with italics)
**Body Font:** the same family
**Label/Mono Font:** the system monospace stack, used only for tag chips

**Character:** A single voice, everywhere. Atkinson Hyperlegible was designed by the Braille
Institute for maximum character disambiguation, which gives the whole site a slightly documentary,
plainly-legible register — closer to a technical report than to a fashion magazine. Latin accents
(Á, í) render properly, which matters when the site's own name is `Iván Álvarez`. The absence of a
second typeface is a deliberate signal: no display font is performing for you.

### Hierarchy

- **Display** (700, 48px/48px, `-0.025em`): the page hero (`text-3xl sm:text-4xl lg:text-5xl`).
  Exactly one per page. On the home page it is the name; elsewhere it is the page title.
- **Headline** (500, 24px/32px, `-0.025em`; 20px/28px below `lg`): section titles — "What I do and
  how I work", "Work Experience", "Latest Articles". Left-aligned, never centred.
- **Title** (600, 20px/28px): article and case-study card titles, and in-prose headings.
- **Body** (400, 16px/24px): running text. Hero leads and section descriptions drop to
  **Meta** (400, 14px/20px) and sit in `text-muted`.
- **Label** (500, 12px/16px): buttons, "Read Article", dates, and tag chips (the chips add the mono
  stack and a 12px `i-lucide-tag`).

### Named Rules

**The Single Voice Rule.** One family, everywhere. Weight and size carry hierarchy; a second
typeface does not. The only exception is the mono stack on tag chips, where it signals "keyword".

**The Tighter-Larger Rule.** Display and headline sizes take `-0.025em` tracking; body text takes
none. Never tighten running text to buy space.

## Layout

One column, always. `--ui-container` is `56rem` (896px, `--container-4xl`), centred with `px-4
sm:px-6 lg:px-8` (32px gutter at `lg`). From the `sm` breakpoint up, the column draws a 1px
hairline on both edges (`sm:border-x border-default`) — this is the single most identifying
structural mark in the system and it should survive any new surface. The container carries `pt-10`.

The header is not in flow: `AppHeader` positions a centred, floating navigation pill `fixed top-2
sm:top-4` with `z-10`, so pages that begin with a hero add `mt-20` to clear it. Page bodies are
constrained further inside the column — `max-w-3xl mx-auto` on article-like pages (`/about`,
`/contact`, `/now`, `/uses`).

Vertical rhythm is generous and section-based. Heroes use `py-18 sm:py-24 lg:py-32` (72/96/128px);
content sections close with 96px of bottom padding at `lg`. Sections never use dividers or boxes to
separate themselves — the gap does the work.

### Named Rules

**The Ruled Column Rule.** Every page lives in the 896px column with `sm:border-x`. A surface that
needs to be wider must justify breaking the rule, not merely want to.

**The Floating Pill Rule.** Navigation is one centred pill that floats above the content, blurred and
translucent, never a full-width bar. Content begins at `mt-20` and scrolls under it.

**The Breath Rule.** Sections separate by 96px of space, not by borders, backgrounds or rules.

## Elevation & Depth

Overwhelmingly flat. Depth is carried by tonal layering and hairlines: `bg-default` pages, `bg-muted`
and `bg-elevated` for recessed or raised surfaces, `bg-accented` for the strongest step, and 1px
`border-default` rules for edges. Shadows are reserved for exactly two jobs — making the floating
navigation pill sit above scrolling content, and giving photographic media a physical frame.

This is confirmed intent, not an accident of the current build: flat by default, with the nav and
photos as the only lifts.

### Shadow Vocabulary

- **Floating nav** (`box-shadow: 0 10px 15px -3px rgb(2 6 24 / 0.05), 0 4px 6px -4px rgb(2 6 24 /
  0.05)`): `shadow-lg shadow-neutral-950/5`. A whisper — it should read as separation from the page
  beneath it, never as a card.
- **Media frame** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`):
  `shadow-lg` on blog and case-study images, alongside `rounded-lg`, `border-4 border-muted` and
  `ring-2 ring-default`.
- **Polaroid** (`filter: drop-shadow-2xl` = `0 25px 25px #00000026`): present in
  `app/components/PolaroidItem.vue` only. That component is **not rendered by any page** — see
  Components.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows are not a way to group content; use
a tonal step or more space.

**The Two Lifts Rule.** Only the floating nav and photographic media may carry a shadow. A third
shadow in the system is a defect.

## Shapes

Small, restrained radii and honest rectangles. The base token is `--ui-radius: 0.25rem` (4px), and
Nuxt UI multiplies it: controls land at **6px** (`rounded-md`, `calc(var(--ui-radius) * 1.5)`) and
surfaces at **8px** (`rounded-lg`, `calc(var(--ui-radius) * 2)`). Nothing in the middle of the page is
a rounded rectangle larger than that.

The counter-shape is the full pill: the navigation bar, the tag chips, avatars and the colour-mode
button are all `rounded-full`. So the system has exactly two silhouette registers — small-radius
rectangles for things you click or read, pills for things that float or label — and no third.

Hairlines are 1px and low-contrast (`border-default`, `oklch(92.2% 0 0)` light). Media is framed
rather than bordered: `border-4 border-muted` plus `ring-2 ring-default` gives images a matte, print-
like edge. On the blog index, alternating card images carry a ±1° rotation and the `/about` avatar
carries `sm:rotate-4` — a small, deliberate dose of hand-placed informality in an otherwise rigid
grid.

### Named Rules

**The Small-Radius Rule.** Controls 6px, surfaces 8px, or a full pill. No 12px and no 16px corners.

**The Framed Media Rule.** Photographs are framed (`border-4 border-muted ring-2 ring-default`) and
may tilt by 1–4°, never more. They are objects on the page, not full-bleed backgrounds.

## Components

The component vocabulary comes from Nuxt UI, restyled by two conventions: every section wrapper sets
`container: 'px-0 !pt-0'` and left-aligns its title, and the app config maps `primary` to `zinc` and
`neutral` to `neutral`.

### Buttons

The primary action is the **inverted-ink button**: near-black on light, white on dark, with the
opposite ink for its label. It is the only high-contrast element on the page, and it is deliberately
not a colour.

- **Shape:** 6px radius (`rounded-md`), 32px tall at `md`, 28px at `sm`.
- **Primary:** `bg-inverted text-inverted`, padding `8px 12px`, weight 500, 14px. The home hero CTA
  is additionally pinned to `min-w-[12rem]` and centre-justified so single- and two-word labels align.
- **Hover / Focus:** background and text transition over 150ms with `cubic-bezier(0.4, 0, 0.2, 1)`;
  focus is a visible ring, never a glow.
- **Ghost:** transparent background, `text-muted` label, fills with `bg-elevated` on hover. Used for
  social icons, the colour-mode toggle, and inactive blog filters.
- **Soft:** used for the *active* filter state (`color="primary" variant="soft"`), which is the one
  place the grey accent is visible as a filled surface.
- **Link:** no background, no underline; the trailing arrow is `text-primary` and animates from
  `opacity-0` to `opacity-100` with a 4px `translate-x` on card hover — the arrow reward pattern in
  `landing/Blog.vue`.

### Chips

- **Style:** `BlogTag` is a `UBadge` with `color="neutral" variant="soft"` — a raised tonal fill
  (light `oklch(97% 0 0)`, dark `oklch(26.9% 0 0)`), no border, full pill radius, and `font-mono`
  with a 12px `i-lucide-tag` leading icon. The mono stack is the chip's identity.
- **State:** on the blog index, filters use `Button` rather than a badge: active is
  `color="primary" variant="soft"` (grey fill), inactive is `color="neutral" variant="ghost"`. Tag
  chips are `size="xs"` and only appear when more than one visible post carries the tag.

### Cards / Containers

- **Corner Style:** 8px on framed media (`rounded-lg`); the card shell itself is `variant="naked"` —
  no background, no border, no shadow.
- **Background:** transparent on the card, `bg-muted`/`bg-elevated` only when a row needs to read as
  a discrete object (accordion rows, and the `bg-elevated/50` testimonial viewport).
- **Shadow Strategy:** none on cards. See Elevation & Depth.
- **Border:** none on cards. Media carries `border-4 border-muted ring-2 ring-default`.
- **Internal Padding:** body content is `!px-0`; the layout is carried by the column and gap, not by
  card padding. Accordion rows use `px-4` with `mb-2` between rows.

### Inputs / Fields

There are no user-facing form fields on the site. The only text input is the Nuxt Content search
dialog (`UContentSearch`, opened with ⌘K), which inherits Nuxt UI defaults: `bg-default`, 1px
`border-default`, 6px radius, and a focus ring. Any new input should follow those defaults rather
than introduce a new field style.

### Navigation

- **Style:** a single centred pill, `fixed`, `bg-muted/80` with `backdrop-blur-sm`, `rounded-full`,
  `border border-muted/50`, `shadow-lg shadow-neutral-950/5`, `px-2 sm:px-4`. Links are
  `variant="link" color="neutral"` at `px-2 py-1`, with leading icons suppressed
  (`linkLeadingIcon: 'hidden'`).
- **Typography:** body size (16px) at default weight; the active route is distinguished by Nuxt UI's
  own active treatment, not by colour.
- **Trailing slot:** the colour-mode toggle sits inside the pill as a ghost, `rounded-full`,
  `size="sm"` button.
- **Mobile treatment:** the same pill persists; horizontal padding drops from `sm:px-4` to `px-2`
  and the pill already wraps its own items, so there is no hamburger and no drawer. Link labels stay
  as-is (Home, Blog, Now, About, Contact).

### Signature: the Availability Badge

Directly under the hero CTA sits a ghost `UButton` whose label is the availability state —
"Available for new projects" or "Not available at the moment" — linked to the booking calendar. Its
leading icon is a two-layer 8px dot: a static `bg-success` (or `bg-error`) circle, plus an identical
`animate-ping` circle at `opacity-75` behind it. It is the only saturated colour on the page and the
only looping animation in the system. Treat both facts as load-bearing.

### Motion

Motion is an entrance, never a decoration, and it never replays. The hero enters as one gesture:
avatar, title, description and CTA each animate `scale 1.1 → 1`, `opacity 0 → 1`, `blur(20px) →
blur(0)` over 600ms at 0.1s / 0.1s / 0.3s / 0.5s. In-view content uses `translateY(20px) → 0`
with `once: true` at `0.4 + 0.2 × index`; blog cards use a shallower `translateY(10px)` at `0.1 ×
index`. The one flourish in the system is the theme flip, and the one loop is the availability dot.

**The Once Rule.** Motion is a one-shot entrance: reveal on first in-view (`once: true`), then stop.
The only looping animation permitted is the availability dot. Nothing may animate in a way that
delays content the visitor came for.

### Unused: PolaroidItem

`app/components/PolaroidItem.vue` renders a rotated white photo card (`-rotate-5` / `rotate-5`,
`drop-shadow-2xl`, `font-serif` caption, straightens and scales to 1.05 on hover). It is **not
referenced by any page**, and it is the one place in the repo that uses `font-serif` and
`drop-shadow-2xl`. Do not treat it as the established photo treatment; the live treatment is the
framed media rect above.

## Do's and Don'ts

### Do:

- **Do** keep the 896px ruled column and the `sm:border-x` hairlines on any new page. The Ruled Column Rule.
- **Do** let grey do the work. Reach for a tonal step, tighter tracking or more space before reaching for a colour. The Zero-Hue Rule.
- **Do** keep the primary CTA as the inverted-ink button (`bg-inverted text-inverted`, 6px, `min-w-[12rem]` on the hero).
- **Do** hold saturation to a single 8px dot in the viewport. The One Dot Rule.
- **Do** use one type family at every size; differentiate by weight and size only. The Single Voice Rule.
- **Do** frame photographs (`rounded-lg border-4 border-muted ring-2 ring-default shadow-lg`) and allow at most a 1–4° tilt. The Framed Media Rule.
- **Do** keep motion to a one-shot entrance: reveal on first in-view (`once: true`), then stop. The hero uses scale 1.1 → 1 with `blur(20px)` → `blur(0)` over 600ms at 0.1/0.3/0.5s; sections use `translateY(20px)` → 0 at `0.4 + 0.2 × index`. The Once Rule.
- **Do** write dates, roles and outcomes plainly and in the first person, in the existing warm, unsalesy register.

### Don't:

- **Don't** add gradient hero text, stock photography, logo walls, testimonial carousels or "passionate developer" copy — the recruiter/agency template is the confirmed anti-reference.
- **Don't** drift toward a developer-terminal pastiche: no neon on black, no monospace body copy, no terminal chrome, no matrix greens.
- **Don't** introduce gradient blobs, giant coloured feature blocks, floating 3D shapes or a metrics bar.
- **Don't** add decorative animation, auto-playing media, or any motion that delays the content the visitor came for.
- **Don't** add a third shadow. Only the floating nav and framed media carry one (the unused `PolaroidItem` is not a licence).
- **Don't** render testimonials, client logos, or metrics that do not exist — `testimonials` is an empty array and both named clients are anonymised on purpose.
- **Don't** carry the `theme-color` mismatch forward: if you touch the dark page background, correct `#020618` to match it.
