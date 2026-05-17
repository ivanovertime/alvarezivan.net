---
title: "Rebuilding Daka's e-commerce on NestJS + Next.js + Medusa in three months"
date: "2026-05-14"
category: "case-study"
client: "Tiendas Daka"
year: 2025
pillar: "Full-Stack Architecture"
type: "greenfield"
stack: ["NestJS", "Next.js", "Medusa", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Greenfield e-commerce platform delivered inside the three-month window, reusing the SAP integration boundary built during the recovery"
featured: true
ogImage: "/blog/case-studies/daka-ecommerce-rescue/featuredImage.jpg"
image: "/blog/case-studies/daka-ecommerce-rescue/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
description: >
  After stabilizing the inherited storefront, Tiendas Daka asked the
  more interesting question: "if you had three months, how would you
  build this from scratch?" This is the answer — a from-scratch
  e-commerce platform on NestJS + Next.js + Medusa, delivered with a
  team of 4, with SAP as the unchanged source of truth and a planned
  cutover from day one.
---

> :u-icon{name="i-lucide-paperclip" class="inline mr-1 align-[-2px]"} **Part of a pair.** This is Act 2 of two consecutive Daka e-commerce engagements. The recovery that made it possible — stabilizing the inherited NestJS + Strapi platform — is here: [*Stabilizing a failing e-commerce platform inherited from a third party*](/blog/case-studies/daka-ecommerce-recovery).

## TL;DR

- After stabilizing the inherited storefront ([the recovery case study](/blog/case-studies/daka-ecommerce-recovery)), Tiendas Daka asked: *"if you had three months, how would you build this from scratch?"*
- I led the answer: a from-scratch e-commerce platform on **NestJS + Next.js + Medusa**, with a team of 4, delivered inside the three-month window.
- We **reused the SAP integration boundary** from the recovery as a contract, kept Medusa to commerce (not as a CMS), and **planned the cutover from day one** instead of letting it slip into "soft launch" purgatory.

## Context

The recovery had bought the platform back its credibility. The storefront released on a cadence, SAP incidents had dropped, the team was no longer spending Friday afternoons in the office "just in case." With the runtime stable, the question changed:

> *"If you started over, what would you build?"*

The business gave us three months.

That kind of brief — a real budget, a real deadline, a real reason to start fresh — is rare. The temptation is to spend it on novelty. The right answer was to spend it on the things that would still be true a year later.

## Constraints

| Constraint | Reality |
|---|---|
| Team size | 4 engineers, with me as tech lead |
| Calendar | Three months, set by the business |
| Inherited dependencies | None on the runtime — but **SAP stays** as catalog, pricing, and inventory source of truth |
| Co-existence | Had to run alongside the recovered storefront until cutover |
| Off-limits | Anything that broke continuity for customers |
| Reusable assets | The SAP integration boundary built during the recovery |

The non-negotiable: **a real ship date inside the three-month window** — no soft launch, no parallel-run-forever.

## Decisions

### Decision 1 — NestJS + Next.js + Medusa, not "the new shiny thing"

Three months and four engineers is not the budget for novelty risk. We picked tools the team could be productive in by week two.

| Option | Trade-off | Chose |
|---|---|---|
| Pick the most fashionable e-commerce framework of 2025 | Novelty risk on a three-month deadline; longer ramp; smaller community when stuck | |
| **NestJS** for the backend (we already knew it from the recovery), **Next.js** for the storefront, **Medusa** as the commerce engine | Each piece is mature, well-documented, and replaceable; the team could ramp in days, not weeks | <DecisionCheck /> |

The novelty budget went into the SAP integration and the cutover plan, not into the framework choice. **Boring on purpose.**

### Decision 2 — Reuse the SAP integration boundary, don't reinvent it

The integration module from the recovery had a clear contract: typed interface, observable, retry-aware, one place to change. The rebuild adopted the same contract.

| Option | Trade-off | Chose |
|---|---|---|
| Build a new SAP integration alongside the old one | Two places to maintain; long parallel-run window; two sets of bugs | |
| Lift the boundary contract from the recovery, port the implementation onto the new stack | Requires the recovery to actually be reusable; pays back the entire cost of having built it cleanly | <DecisionCheck /> |

This is the hidden return on the recovery work: **the integration boundary became an asset, not a sunk cost.** The same pattern carries into the [SAP quotation app](/blog/case-studies/daka-sap-quotation-app).

### Decision 3 — Medusa as a commerce engine, not a CMS

The previous build had let Strapi drift into a control plane for everything. We deliberately did not let Medusa repeat that pattern.

| Option | Trade-off | Chose |
|---|---|---|
| Stretch Medusa to cover editorial content, marketing pages, business logic | One tool for everything; everything becomes coupled to a commerce framework's release cycle | |
| Keep Medusa to commerce: catalog, cart, checkout, orders. Editorial content stays in a content tool. SAP stays the system of record. | Each piece has one job; each piece is replaceable | <DecisionCheck /> |

**One typed boundary per external system, one tool per job.** The discipline is the same as the SAP boundary, applied internally.

### Decision 4 — Cutover, not parallel-run-forever

Three months meant we couldn't afford to run both storefronts in parallel indefinitely. "Soft launch" is what platforms do when they don't trust their own ship date.

| Option | Trade-off | Chose |
|---|---|---|
| Soft launch behind a flag, indefinite parallel run | Delays the moment of truth; doubles ops cost; tempts the team to keep adding to both | |
| Plan the cutover from day one — same SAP source of truth, same payment surfaces, scheduled switchover | Forces honest scope; turns the deadline into a real ship date | <DecisionCheck /> |

Same SAP. Same payments. A real cutover date on the calendar from week one. The deadline became a feature.

## Outcome

By the end of the three months:

- A from-scratch **NestJS + Next.js + Medusa** platform was **delivered inside the window** the business had set.
- The **SAP integration boundary** built during the recovery was reused as the contract, validated by a second consumer, and is still the pattern reached for at Daka today.
- **Customer continuity was preserved** through cutover — same source of truth, scheduled switchover, no extended dual-run.
- The product team continued to plan a roadmap on a platform they could now actually ship against.
- The integration-module pattern became reusable across **the other Daka platforms** my team worked on — most directly the [SAP quotation app](/blog/case-studies/daka-sap-quotation-app).

<!-- > ⚠️ **Author note (please confirm before publishing):** drop in concrete numbers if you have them — release cadence on the new platform, time-to-cutover, Lighthouse / perf wins, conversion lift, anything customer-facing. Even rough numbers from memory beat adjectives. -->

The deeper lesson is the one that made the engagement work at all: **diagnose, contain, then \(only then\) consider rebuilding** — never all three on the same day. The recovery earned the right to do this.

## What I'd do on GCP today

Same brief in 2026, same team, same SAP, same three months. The architectural instincts wouldn't change — but the platform would do more of the work.

- **Backend runtime:** containerize NestJS for **Cloud Run**. Same artifact, no host-management work.
- **Storefront:** Next.js on **Cloud Run** for SSR, with static assets on **Firebase Hosting** in front. Lighthouse perf as a CI gate from day one.
- **SAP integration:** keep the single-module pattern. Put **Pub/Sub** between SAP events and the NestJS consumer so the storefront degrades gracefully when SAP is slow, and the integration module becomes a Pub/Sub consumer with retries and a dead-letter topic.
- **Catalog & pricing reads:** project SAP data into **Firestore** for hot reads and into **BigQuery** for analytics, with SAP unchanged as the system of record.
- **Observability:** **Cloud Logging + Cloud Trace + Error Reporting** from week one. A rebuild without observability is a recovery in waiting.
- **Delivery:** **GitHub Actions → Cloud Run + Firebase**, preview environment per PR, blue-green for the storefront. Cutover becomes a DNS flip rather than a maintenance window.

The pattern is the same as the recovery. The leverage is higher, and the cutover gets cheaper.

---

*If you're scoping a "build it properly this time" e-commerce engagement and the calendar is honest about the constraint, that's the kind of work I do best. Happy to talk through it — [get in touch](/contact).*
