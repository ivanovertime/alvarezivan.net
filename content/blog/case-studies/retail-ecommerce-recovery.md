---
title: "Stabilizing an inherited e-commerce platform on NestJS + Strapi"
date: "2026-05-15"
hidden: true
category: "case-study"
client: " Retail Client (LatAm)"
year: 2025
tags:
  - "e-commerce"
  - "platform-recovery"
  - "integrations"
  - "nestjs"
type: "recovery"
stack: ["NestJS", "Strapi", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Built a predictable release path on an inherited stack and a clean SAP integration boundary that set up the work that came next"
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
  Act 1 of a two-part e-commerce engagement: stabilize an inherited
  NestJS + Strapi stack, isolate SAP behind one boundary, and restore
  a predictable release path before considering a rebuild.
---

> :u-icon{name="i-lucide-paperclip" class="inline mr-1 align-[-2px]"} **Part of a pair.** This is Act 1 (fix first). Act 2 (rebuild when ready) is [*Rebuilding an e-commerce platform in three months*](/blog/case-studies/retail-ecommerce-rebuild).

## TL;DR

- Inherited **NestJS + Strapi** storefront with SAP as system of record and a release path the team did not trust.
- We fixed first: stabilized runtime, moved SAP calls behind one typed boundary, and standardized deployment with containers + CI/CD.
- Result: a predictable shipping cadence and a reusable integration contract that made the [rebuild case study](/blog/case-studies/retail-ecommerce-rebuild) viable.

## Situation

- Inherited platform: **NestJS + Strapi**, with SAP as source of truth for catalog, pricing, and inventory.
- Main risk: integration behavior was spread across the codebase, so each release carried surprise risk.
- Constraints: team of 4, one quarter, storefront had to stay online, and no full rewrite.

The job was not to build something new. The job was to make this one safe to ship again.

## Decisions

### Decision 1 — Stabilize the runtime before touching features

We used the first two weeks for diagnosis and instrumentation only.

| Option | Trade-off | Chose |
|---|---|---|
| Fix bug backlog immediately | Looks faster, but compounds risk on an unfamiliar runtime | |
| Freeze features briefly, audit and instrument first | Slower first impression, faster and safer every week after | <DecisionCheck /> |

Predictability came first. Velocity followed.

### Decision 2 — Contain SAP integration behind a single explicit boundary

The highest-leverage move was to centralize SAP integration behavior.

| Option | Trade-off | Chose |
|---|---|---|
| Refactor call sites piecemeal | Small PR risk, but no clear finish line | |
| Route all calls through one typed integration module | Higher up-front cost; one place to harden, observe, and cache | <DecisionCheck /> |

That boundary became the reusable asset: it survived the rebuild and informed the [SAP quotation app](/blog/case-studies/retail-sap-quotation-app).

### Decision 3 — Containerize the deploy path, don't rebuild the platform

We avoided a second migration during recovery and standardized delivery first.

| Option | Trade-off | Chose |
|---|---|---|
| Migrate platform target mid-recovery | Adds migration risk to existing runtime risk | |
| Containerize in place + thin CI/CD | Fast payoff now, portability later | <DecisionCheck /> |

Rule of thumb: **fewer moving parts now, more options later.**

### Decision 4 — Make Strapi a content tool, not a control plane

Strapi had drifted into business logic and pricing behavior, which made content edits risky.

| Option | Trade-off | Chose |
|---|---|---|
| Leave responsibilities mixed and document them | Cheaper now; keeps incident risk | |
| Move business logic back to NestJS; keep Strapi editorial-only | More work now; removes a recurring failure mode | <DecisionCheck /> |

This clarified what a future rebuild would actually need to replace.

## Outcome

By the end of the engagement:

- Releases became **predictable and repeatable**.
- SAP reads and writes moved behind **one integration boundary**.
- Deployments became **reproducible**.
- The team had enough stability to plan with confidence again.

Most importantly, recovery created the preconditions for Act 2: *rebuild by choice, not by panic.* See [*Rebuilding an e-commerce platform in three months*](/blog/case-studies/retail-ecommerce-rebuild).

## What I'd do on GCP today

Same strategy, less platform toil:

- **Cloud Run** for runtime and deploy consistency.
- **Pub/Sub** in front of SAP-driven events for resilience.
- **Firestore or Cloud SQL** for hot reads, with SAP still as source of truth.
- **Cloud Logging + Cloud Trace** from day one.
- **GitHub Actions → Cloud Run** with preview environments per PR.

---

*If your platform feels too risky to release and too expensive to replace, start with recovery. Rebuild after you earn the right. Happy to talk through it — [get in touch](/contact).*
