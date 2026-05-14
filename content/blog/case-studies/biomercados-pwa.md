---
title: "Shipping a 30,000-user PWA from a stalled e-commerce project"
date: "2022-11-30"
category: "case-study"
client: "Biomercados (Alimentos FM, C.A.)"
year: 2022
pillar: "Platform & DevOps"
type: "rescue"
stack: ["Node.js", "Angular", "PWA", "Docker", "CI/CD"]
team_size: 1
role: "Programmer"
outcome_headline: "Recovered a stalled project and shipped to 30,000+ customers"
featured: true
ogImage: "/og/biomercados-pwa.png"
image: "/og/biomercados-pwa.png"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
description: >
  How a stalled Node.js + Angular e-commerce project was diagnosed,
  recovered, and shipped end-to-end as a PWA and mobile apps for
  30,000+ customers — with a Docker registry and CI/CD pipeline that
  made continuous delivery possible for the team that came after.
---

## TL;DR

- A Node.js + Angular e-commerce project at a regional supermarket chain had stalled before launch — code existed, but nothing was reliably deployable.
- I picked it up as a single engineer, finished the platform, and shipped it as a **PWA + mobile apps to 30,000+ customers**.
- Along the way I built the **Docker image registry and CI/CD pipeline** that made continuous delivery possible — for this project and the ones that followed.

## Context

Biomercados (Alimentos FM, C.A.) is a Venezuelan supermarket chain. The e‑commerce initiative had been in flight for a while when I joined: there was a Node.js backend, an Angular frontend, and a customer base waiting for it. What was missing was the path from "code in a repo" to "an app customers actually use."

The symptoms were the ones a stalled greenfield project usually has:

- The code worked on a developer's machine and almost nowhere else.
- There was no repeatable build or deploy — every environment was a snowflake.
- Nobody had decided whether the customer surface was a PWA, native apps, or both.
- Adjacent business needs (customer segmentation, exchange-rate ingestion) were stuck in a queue that had no owner.

The brief was simple in one sentence and hard in practice: *finish it and ship it.*

## Constraints

| Constraint | Reality |
|---|---|
| Team size | 1 engineer (me), embedded with the business |
| Calendar | Months, not quarters — the chain had already waited too long |
| Stack inherited | Node.js backend, Angular frontend, no deploy story |
| Customer surface | Needed to reach customers on phones, fast, without an app-store gauntlet |
| Adjacent work | Customer segmentation and exchange-rate ingestion were also on the table |

The non-negotiable: ship something customers could use, then build the platform underneath that made the next thing easy.

## Decisions

### Decision 1 — Ship a PWA first, native apps second

The fastest path to a phone screen wasn't an iOS/Android binary — it was a Progressive Web App that customers could install from a link.

| Option | Trade-off | Chose |
|---|---|---|
| Build native iOS + Android apps from day one | Months of platform-specific work; app-store review on every change | |
| Ship a PWA from the existing Angular code, wrap as mobile apps later | Web-first surface available in days, not months; one codebase to maintain | ✅ |

The mobile apps came after, on the foundation the PWA had already proven.

### Decision 2 — Build the deploy path before finishing the features

Tempting as it was to chase the feature backlog, the bottleneck wasn't features — it was that nothing could be deployed reliably.

| Option | Trade-off | Chose |
|---|---|---|
| Hand-deploy until launch, automate later | Faster on day one; every deploy after that costs the same hour | |
| Stand up a private Docker registry + a thin CI/CD pipeline first | Two weeks of platform work before any new feature shipped; every deploy after that was free | ✅ |

This is the same principle as the Daka rescue, applied earlier: **stabilize the runtime before you race the roadmap.** The pipeline I built outlived the project — the team after me kept using it for the Node.js and Angular services that came next.

### Decision 3 — Treat customer segmentation as a small, useful side-quest

Marketing wanted to know which customers to talk to and when. I ran an **RFM analysis** (Recency, Frequency, Monetary) on the order data the new platform was already collecting.

| Option | Trade-off | Chose |
|---|---|---|
| Wait until a dedicated data team exists | Months of waiting on insight the business needed now | |
| Run RFM on the existing data, hand the segments to marketing | Lightweight, immediately useful, and proved the new platform's data was worth something | ✅ |

It wasn't a "data platform." It was a one-engineer analysis that paid for itself the first week marketing used it.

### Decision 4 — Automate exchange-rate ingestion instead of typing it in

Pricing in Venezuela depends on the official exchange rate, which someone on the team was copy-pasting daily. Manual rate entry was both error-prone and beneath the pay grade of every person doing it.

| Option | Trade-off | Chose |
|---|---|---|
| Keep doing it manually | Free until it isn't — a single typo moves prices on a whole catalog | |
| Scrape the official rate on a schedule and push it into the platform | A small ingestion job; removes a daily chore and a class of pricing bugs | ✅ |

This is the seed of the BCV-scraper work I later wrote about publicly. The lesson it taught: **the smallest automations are often the highest-leverage ones**, because they remove a recurring human failure mode.

## Outcome

By the end of the engagement:

- The platform shipped as a **PWA + mobile apps used by 30,000+ customers**.
- The company had a **private Docker registry and a working CI/CD pipeline** for Node.js and Angular services — the foundation for everything that came after.
- Marketing had **RFM-based customer segments** they could act on, drawn from the platform's own data.
- Pricing ran on an **automated exchange-rate feed** instead of a daily copy-paste.

> ⚠️ **Author note (placeholder, please confirm):** if you have any of these handy, drop them in to replace this callout — *time-from-takeover-to-launch*, *number of releases per week after CI/CD landed*, *uptime numbers*, or *order volume in the first month*. Even rough numbers from memory beat adjectives.

The single-engineer scope is part of the point: with the right sequencing — **deploy path first, customer surface second, side-quests third** — one person can move a stalled platform across the line.

## What I'd do on GCP today

Same brief in 2026, same team size, same constraints. The instincts wouldn't change; the targets would.

- **Frontend:** ship the PWA the same way, but host it on **Firebase Hosting** or **Cloudflare Pages** with a CDN edge in front. Lighthouse perf as a CI gate, not an afterthought.
- **Backend:** containerize the Node.js services for **Cloud Run**. No private registry to maintain — **Artifact Registry** comes with the platform.
- **CI/CD:** **GitHub Actions → Cloud Run**, preview environment per PR. The pipeline I hand-built in 2022 is now ten lines of YAML.
- **RFM and segmentation:** land the orders in **BigQuery** via a Cloud Run job, run the RFM query as a scheduled view, and surface the segments to marketing through **Looker Studio** instead of a CSV. Same analysis, no engineer in the loop after week one.
- **Exchange-rate ingestion:** **Cloud Scheduler → Cloud Run job → Pub/Sub → BigQuery + the storefront cache**. The scraper still runs; everything around it stops being a cron on a single VM.
- **Mobile apps:** Capacitor or PWABuilder wrapping the same PWA, signed and shipped through **Firebase App Distribution** for staged rollouts.

The shape of the rescue stays the same: **one engineer, deploy path first, then the customer surface, then the side-quests that pay for themselves.** GCP just removes most of the platform work that used to be the job.

---

*If your e-commerce project has been "almost ready" for longer than anyone is comfortable admitting, that's usually the moment a rescue is cheaper than a restart. [Get in touch](/contact) — I do this work.*
