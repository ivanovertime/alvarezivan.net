---
title: "Stabilizing an inherited e-commerce platform on NestJS + Strapi"
date: "2026-05-15"
category: "case-study"
client: "Tiendas Daka"
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
  A recovery-shaped engagement on an inherited NestJS + Strapi
  storefront: stabilize the runtime, contain the SAP integration
  behind a single boundary, containerize the deploy path, and keep
  Strapi to editorial content. This is the recovery half of a
  paired engagement; the rebuild that followed is its own story.
---

> :u-icon{name="i-lucide-paperclip" class="inline mr-1 align-[-2px]"} **Part of a pair.** This is Act 1 of two consecutive Daka e-commerce engagements. The follow-on — the from-scratch rebuild on NestJS + Next.js + Medusa — is here: [*Rebuilding Daka's e-commerce in three months*](/blog/case-studies/daka-ecommerce-rebuild).

## TL;DR

- Joined as tech lead on an inherited **NestJS + Strapi** e-commerce stack with a SAP source of truth.
- With a team of 4 we **stabilized the runtime first**, **contained SAP behind a single integration boundary**, **containerized the deploy path**, and **kept Strapi to editorial content** rather than letting it drift into a control plane for business logic.
- The result was a release cadence the team was comfortable shipping on, and an integration boundary clean enough to carry forward into the [rebuild case study](/blog/case-studies/daka-ecommerce-rebuild).

## Context

Tiendas Daka is one of Venezuela's largest retail chains. The engagement is a familiar shape to anyone who has done platform-recovery work:

- An inherited NestJS + Strapi codebase, with SAP behind it as the source of truth for catalog, pricing, and inventory.
- A release path that the team didn't fully trust, in the way platforms tend to drift when they've been built by hands no longer on the keyboard.
- A SAP integration spread across the codebase, each call site with its own retry logic and failure modes — a common shape, not anything specific to Daka.
- A roadmap that the team wanted to be able to plan against with confidence again.

The brief was simple to state and harder to do: *make this safe to release on a cadence.*

<!-- > ⚠️ **Author note (please confirm before publishing):** a scale indicator for the platform at the time — orders/week, GMV, MAU, anything you can share — would strengthen the Context. Even a rough order of magnitude beats adjectives. -->

## Constraints

| Constraint | Reality |
|---|---|
| Team size | 4 engineers, with me as tech lead |
| Calendar | One quarter to show measurable stability |
| Inherited stack | NestJS + Strapi |
| Source of truth | SAP — for catalog, pricing, inventory |
| Off-limits | A full rewrite. The storefront had to keep serving customers throughout. |
| Safety net | Whatever automated coverage we wanted to lean on, we'd be building as we went. |

The non-negotiable: **keep the storefront online for customers, every day, throughout the recovery.**

## Decisions

### Decision 1 — Stabilize the runtime before touching features

The first two weeks were diagnosis only. We wrote down what we found, what we'd touch, and what we'd explicitly leave alone.

| Option | Trade-off | Chose |
|---|---|---|
| Fix the highest-priority bug list first | Visible to stakeholders, but every fix on an unfamiliar runtime is its own risk | |
| Freeze features for two weeks, audit and instrument the runtime | Feels slow to the business; pays back the moment the next change lands | <DecisionCheck /> |

We bought predictability before we bought velocity. Every subsequent change landed on a runtime we actually understood.

### Decision 2 — Contain SAP integration behind a single explicit boundary

The SAP integration was the highest-leverage place to invest. Catalog and pricing reads were spread across the codebase, each call site with its own retry logic, timeouts, and failure modes — a pattern any engineer who has worked alongside an ERP will recognise.

| Option | Trade-off | Chose |
|---|---|---|
| Refactor the integration in place, file by file | Low blast radius per PR, but no clear "done" line | |
| Introduce a single integration module with a typed interface and route every call through it | Higher up-front cost; produces one place to harden, log, and (later) cache | <DecisionCheck /> |

The module became the seam that made everything else easier — observability, retries, caching. It also turned out to be the single most reusable artifact of the whole engagement: it survived the rebuild that followed, and the [SAP quotation app](/blog/case-studies/daka-sap-quotation-app) is built on the same pattern.

### Decision 3 — Containerize the deploy path, don't rebuild the platform

Rather than chase a new platform target during recovery, we containerized the existing services and standardized the deploy path.

| Option | Trade-off | Chose |
|---|---|---|
| Migrate to a managed PaaS in the middle of a recovery | Modern, but introduces a second migration on top of an unstable baseline | |
| Containerize in place + a thin CI/CD pipeline | Familiar tooling, fast payoff, leaves the door open for Kubernetes or Cloud Run later | <DecisionCheck /> |

The recurring pattern in this kind of work: **fewer moving parts at first, more options later.**

### Decision 4 — Make Strapi a content tool, not a control plane

Strapi had drifted into being used for things it isn't good at — pricing rules, inventory flags, business logic that lived behind editorial fields. Every content edit was, accidentally, a code change.

| Option | Trade-off | Chose |
|---|---|---|
| Leave the responsibilities where they were and document them | Cheaper now; pays the same incident tax forever | |
| Pull business logic back into NestJS; restrict Strapi to editorial content | More work now; clears a category of surprise entirely | <DecisionCheck /> |

This bought breathing room and — as it turned out — clarified what a follow-on rebuild would and would not need to replace.

## Outcome

By the end of the engagement:

- The storefront shipped on a **predictable, repeatable cadence**.
- Every SAP read and write flowed through the **single integration module**, which became the one place to harden, log, and cache.
- **Deployments became reproducible** — same artifact, same path, every time.
- The product team had a platform they could plan a roadmap against.
- The integration-module pattern became the **most reusable asset** of the engagement, carried forward into the rebuild and into the [SAP quotation app](/blog/case-studies/daka-sap-quotation-app).

The deeper outcome was the one that made Act 2 possible at all: with the runtime stable, the business asked the more interesting question — *"if you had three months, how would you build this from scratch?"* That answer is its own case study: [*Rebuilding Daka's e-commerce in three months*](/blog/case-studies/daka-ecommerce-rebuild).

## What I'd do on GCP today

Same brief in 2026, same inherited stack. The architectural instincts wouldn't change — the platform underneath would.

- **Runtime:** containerize for **Cloud Run** rather than self-managed Docker hosts. Same artifact, no host-management work.
- **SAP integration:** keep the single-module pattern, and put **Pub/Sub** between SAP events and the NestJS consumer so the storefront degrades gracefully when SAP is slow.
- **Catalog & pricing reads:** project SAP data into **Firestore** (or a small Postgres on Cloud SQL) for hot reads, with SAP staying the system of record. Stops the storefront from being coupled to SAP's response time.
- **Observability:** wire **Cloud Logging + Cloud Trace** from day one. The first thing a recovery needs is a working flashlight.
- **Delivery:** **GitHub Actions → Cloud Run**, with a preview environment per PR. The same predictability we earned manually, but for free.

The pattern is the same. The leverage is higher.

---

*If you're staring at an inherited platform that feels too risky to release and too expensive to rewrite, the answer is rarely either-or. Recover first, then earn the right to rebuild. Happy to talk through it — [get in touch](/contact).*
