---
title: "Rescuing a NestJS + Strapi e-commerce platform"
date: "2026-05-15"
category: "case-study"
client: "Tiendas Daka"
year: 2025
pillar: "Full-Stack Architecture"
type: "rescue"
stack: ["NestJS", "Strapi", "Docker", "Laravel", "SAP"]
team_size: 4
role: "Tech Lead"
outcome_headline: "Restored delivery cadence and unblocked the roadmap"
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
  How a team of four diagnosed scalability and integration debt in a
  NestJS + Strapi e-commerce platform at one of Venezuela's largest
  retail chains, contained the bleeding, and handed back a stack the
  product team could ship on again.
---

## TL;DR

- A NestJS + Strapi storefront for a nationwide retail chain had stalled — every release introduced regressions and the roadmap was frozen.
- I joined a team of 4 as tech lead, and together we stabilized the runtime, contained the integration debt with SAP, and put a delivery process in place.
- Three months later the platform was shipping on a predictable cadence again, and product had a credible path forward without a full rewrite.

## Context

Tiendas Daka is one of Venezuela's largest retail chains. Its e‑commerce platform — a NestJS backend with Strapi as the CMS — had grown faster than the team that built it. By the time I joined as a consultant, the symptoms were the usual ones for a stalled platform:

- Releases were unpredictable; deploys often broke unrelated areas of the storefront.
- Integration with SAP (the source of truth for catalog, pricing, and inventory) was brittle and partially manual.
- The product team had stopped asking for new features because the engineering team couldn't promise dates.

The business had two options on the table: keep patching, or rewrite. Both were expensive. The third option — *rescue and re-architect in place* — was the one we ended up taking.

<!-- > ⚠️ **Author note (placeholder, please confirm):** the platform's monthly active users, GMV, or order volume at the time would strengthen this section. Replace this callout with a one-line scale indicator before publishing. -->

## Constraints

| Constraint | Reality |
|---|---|
| Team size | 4 engineers, including me |
| Calendar | One quarter to show measurable progress |
| Stack inherited | NestJS (backend), Strapi (CMS), SAP (system of record) |
| Off-limits | A full rewrite — the business needed continuity, not a 12-month freeze |
| Deployment | No standardized CI/CD; deploys were manual and tribal |

The non-negotiable: keep the stack intact throughout the rescue.

## Decisions

The first two weeks were diagnosis only — no feature work. We wrote down what we found, what we'd touch, and what we'd explicitly leave alone.

### Decision 1 — Stabilize the runtime before touching features

| Option | Trade-off | Chose |
|---|---|---|
| Fix the highest-priority bug list first | Visible to stakeholders, but each fix risked another regression on a fragile runtime | |
| Freeze features for two weeks, audit and instrument the runtime | Feels slow to the business; pays back the moment the next bug lands | ✅ |

We bought predictability before we bought velocity. Every subsequent change landed on a runtime we actually understood.

### Decision 2 — Contain SAP integration behind an explicit boundary

The SAP integration was the single biggest source of incidents. Catalog and pricing reads were scattered across the codebase, each with their own retry logic, timeouts, and failure modes.

| Option | Trade-off | Chose |
|---|---|---|
| Refactor the integration in place, file by file | Low blast radius per PR, but no clear "done" line | |
| Introduce a single integration module with a typed interface and route every call through it | Higher up-front cost; produces one place to harden, log, and (later) cache | ✅ |

The module became the seam that made everything else easier — observability, retries, caching, and eventually a swap-friendly contract.

### Decision 3 — Containerize the deploy path, don't rebuild the platform

We already had Docker experience on the team. Rather than chase a new platform target, we containerized the existing services and standardized the deploy path.

| Option | Trade-off | Chose |
|---|---|---|
| Migrate to a managed PaaS | Modern, but introduces a second migration on top of a rescue | |
| Containerize in place + a thin CI/CD pipeline | Familiar tooling, fast payoff, leaves the door open for Kubernetes or Cloud Run later | ✅ |

This is a recurring rescue pattern: fewer moving parts at first, more options later.

### Decision 4 — Make Strapi a content tool, not a control plane

Strapi had drifted into being used for things it isn't good at — pricing rules, inventory flags, business logic. We pulled those responsibilities back into NestJS and limited Strapi to what it does well: editorial content.

| Option | Trade-off | Chose |
|---|---|---|
| Replace Strapi outright | Months of work, none of it visible to customers | |
| Re-scope Strapi to content only; route business logic through the NestJS layer | Reduces the surface area of the riskiest dependency without a migration | ✅ |

## Outcome

By the end of the engagement:

- The platform shipped on a **predictable, repeatable cadence** for the first time in months.
- The SAP integration ran behind a **single, observable module** — incidents tied to it dropped sharply.
- Deployments moved from **tribal and manual** to **containerized and reproducible**.
- The product team **resumed planning a roadmap** instead of triaging a backlog.

<!-- > ⚠️ **Author note (placeholder, please confirm):** drop in concrete numbers before publishing if you have them — e.g. *"deploys went from N/month to N/week"*, *"P1 incidents dropped from N to N"*, *"page-load p95 improved by N%"*. Even rough numbers from memory are worth more than adjectives here. -->

This was one of six platforms my team and I worked on at Daka over the engagement, and it set the template for the others: diagnose, contain, then modernize — never all three at once.

## What I'd do on GCP today

If I were running this rescue today with the same team and constraints, the in-place philosophy wouldn't change — but the targets would.

- **Runtime:** containerize for **Cloud Run** rather than self-managed Docker hosts. Same container artifact, none of the host-management work.
- **SAP integration:** keep the single-module pattern, but add **Pub/Sub** between SAP events and the NestJS consumer so the storefront degrades gracefully when SAP is slow.
- **Catalog & pricing reads:** project SAP data into **BigQuery** for analytics and into **Firestore** (or a small Postgres on Cloud SQL) for hot reads, keeping SAP as the system of record. Stops the storefront from being coupled to SAP's response time.
- **Observability:** wire **Cloud Logging + Cloud Trace** from day one. The first thing a rescue needs is a working flashlight.
- **Delivery:** **GitHub Actions → Cloud Run** with a preview-environment per PR. The same predictability we earned manually, but for free.

The pattern is the same. The leverage is higher.

---

*If you're somewhere in this shape — a platform that feels too risky to release and too expensive to rewrite — I'm happy to compare notes. [Reach out here](/contact).*
