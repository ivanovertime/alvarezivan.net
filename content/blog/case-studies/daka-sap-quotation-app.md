---
title: "A nationwide mobile sales-quotation app, integrated with SAP"
date: "2025-08-01"
category: "case-study"
client: "Tiendas Daka"
year: 2025
pillar: "Full-Stack Architecture"
type: "greenfield"
stack: ["Laravel", "Filament", "SAP", "Mobile-first PWA", "Docker"]
team_size: 3
role: "Architect & Tech Lead"
outcome_headline: "Replaced a paper-and-spreadsheet quotation flow with a mobile-first app rolled out nationwide"
featured: true
ogImage: "/blog/case-studies/daka-sap-quotation-app/featuredImage.jpg"
image: "/blog/case-studies/daka-sap-quotation-app/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
description: >
  Architecting and shipping a mobile-first sales-quotation application
  on Laravel + Filament, integrated with SAP as the source of truth
  for catalog and pricing, and rolled out to sales teams across the
  country.
---

## TL;DR

- Daka's nationwide sales teams were quoting customers from paper, spreadsheets, and outdated catalogs — every quote was a guess.
- I led the architecture and led a team of 3 to ship a **mobile-first quotation app** on Laravel + Filament, with SAP as the source of truth.
- The app rolled out to sales staff across the country, replaced the manual flow, and gave the business a real-time view of demand it had never had before.

## Context

Tiendas Daka has sales teams across the country handling business-to-business and high-value retail quotations. The flow at the time was the kind of process every rescue engineer recognises:

- A salesperson pulled prices from a catalog that was sometimes days behind.
- Quotes were written on paper or built in Excel, then re-keyed into SAP later.
- Stock and pricing inconsistencies surfaced *after* the customer had been quoted.
- The business had no live picture of demand — only what eventually landed in SAP.

The mandate was different from the rescues: this one was **greenfield**, but with a hard integration constraint. SAP was the system of record and was not going to move. Anything new had to plug into it without becoming another fragile bridge.

## Constraints

| Constraint | Reality |
|---|---|
| Team size | 3 engineers, with me as architect and tech lead |
| Form factor | Mobile-first — sales staff work on phones in stores and on the road |
| Source of truth | SAP for catalog, pricing, customers, and quotation persistence |
| Connectivity | Sales sites with variable network quality — the app had to degrade gracefully |
| Rollout | Nationwide, across multiple sales teams with different habits |
| Adjacent systems | The same SAP integration patterns I'd built for the e-commerce rescue could be reused |

The non-negotiable: the salesperson on the floor must always be able to produce a credible quote, even on a flaky connection.

## Decisions

### Decision 1 — Laravel + Filament for speed-to-rollout, not for novelty

The temptation in 2025 was to reach for a fashionable stack. The right answer for a small team and a nationwide deadline was the one we could ship.

| Option | Trade-off | Chose |
|---|---|---|
| A bespoke SPA + custom admin | Months of UI work before the back-office could see anything | |
| Laravel + Filament for the back-office; a thin mobile-first PWA for the salesperson surface | Filament gives a production-grade admin in days; Laravel handles the SAP integration cleanly; the team already knew the stack | ✅ |

Boring on purpose. The novelty budget went into the SAP integration, not the framework choice.

### Decision 2 — Mobile-first PWA, not a native app

Same reasoning as the Biomercados PWA, applied at higher stakes.

| Option | Trade-off | Chose |
|---|---|---|
| Native iOS + Android | App-store gauntlet on every release; longer build cycles; device fragmentation | |
| Mobile-first PWA, installable from a link | Same codebase as the back-office; instant updates; deploys decoupled from app stores | ✅ |

For a tool used by employees rather than customers, a PWA was the obvious right answer — fewer moving parts, faster iteration, no rollout choreography.

### Decision 3 — Treat SAP as a contract, not as a runtime dependency

SAP was the system of record. It wasn't, however, fast or always available. If the app called SAP synchronously on every action, the salesperson on the floor would feel every SAP hiccup.

| Option | Trade-off | Chose |
|---|---|---|
| Call SAP synchronously for every read and write | Simplest mental model; the salesperson lives at SAP's mercy | |
| Project SAP catalog and pricing into the app's own store; queue writes back to SAP | More moving parts; the salesperson always sees a usable catalog and the system tolerates SAP outages | ✅ |

This is the pattern I carried over from the e-commerce rescue: a single integration module with a typed interface, observable, retry-aware, and replaceable. The app reads from a local projection and writes through the module — SAP is the contract, not the runtime.

### Decision 4 — Design for variable connectivity from day one

Sales sites don't have a uniform network story. Treating offline as an exception meant it would never be tested; treating it as a default meant it just worked.

| Option | Trade-off | Chose |
|---|---|---|
| Assume the network and add offline later | Offline becomes a perpetually-postponed Phase 2 | |
| Cache the catalog locally, queue quotes, sync when online | Up-front design cost; the app behaves the same in the warehouse and on a highway | ✅ |

The business outcome of this decision was simple: a salesperson on a bad connection still closes the quote.

### Decision 5 — Filament as the back-office, not as the strategy

Filament made the admin surface cheap to build. That meant we could spend the saved time on the SAP integration and the mobile experience — not on yet another bespoke admin.

| Option | Trade-off | Chose |
|---|---|---|
| Build a custom admin from scratch | Fully bespoke, fully ours, fully unfinished | |
| Lean on Filament for the back-office and put the engineering time into integration and mobile UX | The interesting work goes where the leverage is | ✅ |

## Outcome

By rollout:

- The app was **deployed nationwide**, across multiple sales teams.
- The manual paper-and-spreadsheet flow was **retired** for the use cases the app covered.
- Quotes were **consistent with SAP catalog and pricing** at the moment of generation, not days later.
- The business gained a **real-time view of quotation activity** — a data surface it had never had before.
- The SAP integration module became a **reusable pattern** for the other Daka platforms my team worked on.

<!-- > ⚠️ **Author note (placeholder, please confirm):** drop in concrete numbers before publishing — *number of stores or sales staff onboarded*, *quotes generated per week vs. before*, *time-to-quote reduction*, or *quote-to-order conversion lift*. Even rough numbers from memory are stronger than adjectives. -->

This was one of six platforms my team and I worked on at Daka, and the one that proved the integration-module pattern was generalizable: write the SAP boundary once, reuse it across products.

## What I'd do on GCP today

Same brief today, same constraints, same SAP. The architecture instincts wouldn't change; the platform underneath would.

- **Back-office runtime:** containerize the Laravel app for **Cloud Run**. Same artifact, no host-management work.
- **SAP integration:** keep the single-module pattern. Move the writes onto **Pub/Sub** so the app never blocks on SAP, and the integration module becomes a Pub/Sub consumer with retries and a dead-letter topic.
- **Catalog + pricing projection:** sync from SAP into **BigQuery** (analytics) and **Firestore** or **Cloud SQL** (hot reads). The mobile app reads from the projection; SAP stays the system of record.
- **Mobile surface:** the same PWA, hosted on **Firebase Hosting** with offline caching via service workers. Optionally wrapped with Capacitor and shipped through **Firebase App Distribution** for staged rollouts.
- **Real-time demand view:** stream quote events into BigQuery and surface them in **Looker Studio** for the business — the data surface that was a side-effect on-prem becomes a first-class deliverable.
- **Delivery:** **GitHub Actions → Cloud Run + Firebase**, preview environment per PR. The same predictability we earned manually, but for free.

The shape of the work is the same as the rescues — a boring framework, a single integration boundary, an offline-first surface, and observability from day one — but the platform underneath does most of the heavy lifting.

---

*If you have a SAP-coupled process running on paper and goodwill, I'd be glad to compare notes on what a small focused build could look like. [Reach out here](/contact).*
