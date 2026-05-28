---
title: "Rebuilding an e-commerce platform on NestJS + Next.js + Medusa in three months"
date: "2026-05-14"
hidden: true
category: "case-study"
client: " Retail Client (LatAm)"
year: 2025
tags:
  - "e-commerce"
  - "nestjs"
  - "nuxt"
type: "greenfield"
stack: ["NestJS", "Next.js", "Medusa", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Greenfield e-commerce platform delivered inside the three-month window, reusing the SAP integration boundary built during the recovery"
featured: true
ogImage: "/blog/case-studies/retail-ecommerce-core/featuredImage.jpg"
image: "/blog/case-studies/retail-ecommerce-core/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
description: >
  Act 2 of a two-part engagement: a three-month rebuild on NestJS +
  Next.js + Medusa that worked because the recovery phase had already
  established a stable SAP integration boundary and release cadence.
---

> :u-icon{name="i-lucide-paperclip" class="inline mr-1 align-[-2px]"} **Part of a pair.** This is Act 2 (rebuild when ready). Act 1 (fix first) is [*Stabilizing an inherited e-commerce platform on NestJS + Strapi*](/blog/case-studies/retail-ecommerce-recovery).

## TL;DR

- Follow-on to [the recovery case study](/blog/case-studies/retail-ecommerce-recovery): a from-scratch **NestJS + Next.js + Medusa** platform delivered by a team of 4 in three months.
- This only worked because Act 1 had already restored release predictability and isolated SAP behind one contract.
- We reused that contract, kept Medusa scoped to commerce, and planned a hard cutover from day one.

## Situation

- Recovery had already done the hard part: predictable releases and a stable SAP boundary.
- New brief: deliver a from-scratch storefront in three months with a team of 4.
- Constraints: SAP stayed system of record, customer continuity was non-negotiable, and the cutover had to be real.

The key decision was not whether to rebuild. It was whether conditions were ready. They were.

## Decisions

### Decision 1 — NestJS + Next.js + Medusa, not "the new shiny thing"

Three months and four engineers left no novelty budget.

| Option | Trade-off | Chose |
|---|---|---|
| Pick a fashionable but unfamiliar stack | Higher novelty risk and longer ramp time | |
| **NestJS + Next.js + Medusa** | Mature tooling, faster ramp, replaceable pieces | <DecisionCheck /> |

We spent risk budget on integration and cutover, not framework novelty.

### Decision 2 — Reuse the SAP integration boundary, don't reinvent it

The SAP boundary from recovery already had a proven contract. We reused it.

| Option | Trade-off | Chose |
|---|---|---|
| Build a new SAP integration from scratch | Duplicated maintenance and longer dual-run risk | |
| Reuse the recovery boundary contract in the new stack | Requires clean recovery work; strong payoff in speed and safety | <DecisionCheck /> |

This was the return on Act 1: the integration boundary became an asset, not sunk cost. The same pattern appears in the [SAP quotation app](/blog/case-studies/retail-sap-quotation-app).

### Decision 3 — Medusa as a commerce engine, not a CMS

We avoided repeating the earlier "one tool for everything" drift.

| Option | Trade-off | Chose |
|---|---|---|
| Stretch Medusa into CMS and business logic | Coupling and release friction | |
| Keep Medusa commerce-only; keep editorial separate; keep SAP as source of truth | Clear ownership and replaceable parts | <DecisionCheck /> |

Rule: one boundary per external system, one tool per job.

### Decision 4 — Cutover, not parallel-run-forever

Three months meant no indefinite dual-run.

| Option | Trade-off | Chose |
|---|---|---|
| Soft launch + open-ended parallel run | Defers risk and doubles operating cost | |
| Plan hard cutover from day one | Forces honest scope and a real ship date | <DecisionCheck /> |

Same SAP, same payment surfaces, scheduled switchover.

## Outcome

By the end of three months:

- The new **NestJS + Next.js + Medusa** platform shipped inside the target window.
- The **SAP boundary from recovery** was reused and validated by a second consumer.
- Cutover preserved customer continuity without extended dual-run.

Core lesson: **fix first, then rebuild when conditions are ready**. Recovery earned this timeline.

## What I'd do on GCP today

Same strategy, faster execution:

- **Cloud Run** for backend and storefront runtime.
- **Pub/Sub** for SAP event buffering and retries.
- **Firestore + BigQuery** for read models and analytics.
- **Cloud Logging + Trace + Error Reporting** from week one.
- **GitHub Actions → Cloud Run/Firebase** with preview environments and blue-green cutover.

---

*If you're planning a serious e-commerce rebuild, first make sure the preconditions exist. If they do, three months can be enough. Happy to talk through it — [get in touch](/contact).*
