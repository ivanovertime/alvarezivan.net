---
title: "Stabilizing a failing e-commerce platform inherited from a third party"
date: "2026-05-15"
category: "case-study"
client: "Tiendas Daka"
year: 2025
pillar: "Full-Stack Architecture"
type: "recovery"
stack: ["NestJS", "Strapi", "Docker", "SAP", "CI/CD"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Turned a fragile third-party storefront into a predictable, releasable system — and earned the trust to be asked the next, harder question"
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
  Tiendas Daka inherited a NestJS + Strapi storefront built by a
  third-party provider that nobody was confident enough to release.
  We stabilized the runtime, contained the SAP integration behind a
  single boundary, containerized the deploy path, and pulled Strapi
  back to being a content tool. This is the recovery half of a
  paired engagement; the rebuild that followed is its own story.
---

> 📎 **Part of a pair.** This is Act 1 of two consecutive Daka e-commerce engagements. The follow-on — the from-scratch rebuild on NestJS + Next.js + Medusa — is here: [*Rebuilding Daka's e-commerce in three months*](/blog/case-studies/daka-ecommerce-rebuild).

## TL;DR

- Tiendas Daka inherited a **NestJS + Strapi** storefront from a third-party provider. It nominally worked, but every release introduced regressions, the SAP integration was brittle, and the product team had stopped asking for new features.
- Over the engagement, with a team of 4, we **stabilized the runtime first**, **contained SAP behind a single integration boundary**, **containerized the deploy path**, and **pulled Strapi back to being a content tool** rather than a control plane for business logic.
- The result: a storefront the team was confident to release, and a clean enough integration boundary that the business could ask the next, harder question — which became the [rebuild case study](/blog/case-studies/daka-ecommerce-rebuild).

## Context

Tiendas Daka is one of Venezuela's largest retail chains. When I joined as a consultant, the e-commerce situation was the kind of thing every senior engineer recognises:

- A previous third-party provider had delivered a NestJS backend with a Strapi CMS. It nominally worked.
- Every release introduced regressions. People had learned to deploy on Friday afternoon and then *not* go home.
- The SAP integration — catalog, pricing, inventory — was brittle and partially manual. Discrepancies surfaced in front of the customer.
- The product team had stopped asking for new features because nothing could be promised.

The brief was simple to state and harder to do: *make this thing safe to release again.*

> ⚠️ **Author note (please confirm before publishing):** a scale indicator for the platform at the time — orders/week, GMV, MAU, anything you can share — would strengthen the Context. Even a rough order of magnitude beats adjectives.

## Constraints

| Constraint | Reality |
|---|---|
| Team size | 4 engineers, with me as tech lead |
| Calendar | One quarter to show measurable stability |
| Inherited stack | NestJS + Strapi from a third-party provider |
| Source of truth | SAP — for catalog, pricing, inventory |
| Off-limits | A full rewrite. The storefront had to keep serving customers throughout. |
| Existing test coverage | Sparse. Most of the safety net had to be built before it could be relied on. |

The non-negotiable: **keep the storefront online for customers, every day, throughout the recovery.**

## Decisions

### Decision 1 — Stabilize the runtime before touching features

The first two weeks were diagnosis only. We wrote down what we found, what we'd touch, and what we'd explicitly leave alone.

| Option | Trade-off | Chose |
|---|---|---|
| Fix the highest-priority bug list first | Visible to stakeholders, but each fix risked another regression on a fragile runtime | |
| Freeze features for two weeks, audit and instrument the runtime | Feels slow to the business; pays back the moment the next bug lands | ✅ |

We bought predictability before we bought velocity. Every subsequent change landed on a runtime we actually understood.

### Decision 2 — Contain SAP integration behind a single explicit boundary

The SAP integration was the single biggest source of incidents. Catalog and pricing reads were scattered across the codebase, each with its own retry logic, timeouts, and failure modes.

| Option | Trade-off | Chose |
|---|---|---|
| Refactor the integration in place, file by file | Low blast radius per PR, but no clear "done" line | |
| Introduce a single integration module with a typed interface and route every call through it | Higher up-front cost; produces one place to harden, log, and (later) cache | ✅ |

The module became the seam that made everything else easier — observability, retries, caching. It also turned out to be the single most reusable artifact of the whole engagement: it survived the rebuild that followed, and the [SAP quotation app](/blog/case-studies/daka-sap-quotation-app) is built on the same pattern.

### Decision 3 — Containerize the deploy path, don't rebuild the platform

Rather than chase a new platform target during recovery, we containerized the existing services and standardized the deploy path.

| Option | Trade-off | Chose |
|---|---|---|
| Migrate to a managed PaaS in the middle of a recovery | Modern, but introduces a second migration on top of an unstable baseline | |
| Containerize in place + a thin CI/CD pipeline | Familiar tooling, fast payoff, leaves the door open for Kubernetes or Cloud Run later | ✅ |

The recurring pattern in this kind of work: **fewer moving parts at first, more options later.**

### Decision 4 — Make Strapi a content tool, not a control plane

Strapi had drifted into being used for things it isn't good at — pricing rules, inventory flags, business logic that lived behind editorial fields. Every content edit was, accidentally, a code change.

| Option | Trade-off | Chose |
|---|---|---|
| Leave the responsibilities where they were and document them | Cheaper now; pays the same incident tax forever | |
| Pull business logic back into NestJS; restrict Strapi to editorial content | More work now; clears a category of surprise entirely | ✅ |

This bought breathing room and — as it turned out — clarified what a follow-on rebuild would and would not need to replace.

## Outcome

By the end of the engagement:

- The storefront shipped on a **predictable, repeatable cadence** — releases stopped being events.
- **SAP-related incidents dropped sharply** once every read and write went through the integration module.
- **Deployments became reproducible** — same artifact, same path, every time.
- The product team **resumed planning a roadmap** instead of triaging a backlog.
- The integration-module pattern became the **single most reusable asset** of the engagement, carried forward into the rebuild and into the [SAP quotation app](/blog/case-studies/daka-sap-quotation-app).

> ⚠️ **Author note (please confirm before publishing):** drop in concrete numbers if you have them — release cadence before/after, P1 incidents avoided, mean-time-to-recover. Even rough numbers from memory beat adjectives.

The deeper outcome was the one that made Act 2 possible at all: once the runtime was no longer on fire, the business asked the more interesting question — *"if you had three months, how would you build this from scratch?"* That answer is its own case study: [*Rebuilding Daka's e-commerce in three months*](/blog/case-studies/daka-ecommerce-rebuild).

## What I'd do on GCP today

Same brief in 2026, same inherited stack. The architectural instincts wouldn't change — the platform underneath would.

- **Runtime:** containerize for **Cloud Run** rather than self-managed Docker hosts. Same artifact, no host-management work.
- **SAP integration:** keep the single-module pattern, and put **Pub/Sub** between SAP events and the NestJS consumer so the storefront degrades gracefully when SAP is slow.
- **Catalog & pricing reads:** project SAP data into **Firestore** (or a small Postgres on Cloud SQL) for hot reads, with SAP staying the system of record. Stops the storefront from being coupled to SAP's response time.
- **Observability:** wire **Cloud Logging + Cloud Trace** from day one. The first thing a recovery needs is a working flashlight.
- **Delivery:** **GitHub Actions → Cloud Run**, with a preview environment per PR. The same predictability we earned manually, but for free.

The pattern is the same. The leverage is higher.

---

*If you're staring at a third-party platform that feels too risky to release and too expensive to rewrite, the answer is rarely either-or. Recover first, then earn the right to rebuild. Happy to talk through it — [get in touch](/contact).*
