---
title: "From Nuxt to Hugo and Back Again"
description: "Why I migrated this site from Nuxt 2 to Hugo and later returned to Nuxt—what changed, what stayed, and the decisions that kept the rebuild manageable."
date: "2024-05-12"
category: "side-project"
minRead: 4
image: "/blog/from-nuxt-to-hugo/featuredImage.png"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
   - "nuxt"
   - "platform-recovery"
type: "side-project"
stack: ["Hugo", "Nuxt", "Vue", "Tailwind CSS", "Cloudflare Pages"]
repoUrl: "https://github.com/ivanovertime/alvarezivan.net"
team_size: 1
role: "Engineer"
year: 2024
outcome_headline: "Learned the right moment to reach for static, and the value of component systems when they justify their weight"
featured: false
---
# Situation

## TL;DR

I migrated this site from Nuxt 2 to Hugo to reduce complexity and improve build speed (static generation). Later I realized I missed component reuse and content flexibility, so I moved back to Nuxt 4. The lesson: understand the trade-offs between static generation and component systems, and don't over-engineer until the problem is real.

## Context
I originally migrated this site from Nuxt 2 to Hugo to simplify a content‑first build and reduce runtime complexity. Later, I moved back to Nuxt to regain a richer component system, content tooling, and a more flexible UI layer.

[Check the repo](https://github.com/ivanovertime/alvarezivan.net)

This post documents that round‑trip and highlights an additional goal: exploring Cloudflare Pages as the hosting target, including build limits, cache behavior, and deployment ergonomics.

# What changed

## Decisions Made

| Decision | Trade-off | Chose |
|---|---|---|
| Use Hugo for this site | Fast builds, simple deployment; limited component reuse and markdown composition | (Temporary) |
| Return to Nuxt 4 + Nuxt Content | More flexible, better for rich components; slightly heavier build; component-first instead of static-first | <DecisionCheck /> |

## What Changed
1. **Content model**
   - Hugo proved fast and lean for static content, but the authoring workflow and UI composition were more constrained than I wanted.
2. **Rendering strategy**
   - Moving back to Nuxt restored dynamic layouts, component reuse, and flexible data sourcing without sacrificing static performance.
3. **Deploy & hosting**
   - Cloudflare Pages made preview deployments frictionless, with simple caching rules and edge delivery that fit a static‑first site.

# Tech used
- **Frameworks:** Hugo, Nuxt (Vue)
- **Content:** Markdown with front matter
- **Styling:** Tailwind CSS
- **Hosting:** Cloudflare Pages
- **Tooling:** pnpm, GitHub Actions

> It's not DNS <br>
> It cannot be DNS <br>
> It was DNS

Good luck with your migration! If you hit a snag, it's probably DNS—check it anyway.

## Outcome

The lesson wasn't about Hugo vs. Nuxt — it was about understanding the trade-offs. Hugo was the right tool for a content-first static site when the authoring workflow and deployment needed to be simple. Later, when I wanted richer components and more flexible content sourcing, Nuxt's component system and Nuxt Content justified the added complexity.

The hosted outcome: faster lighthouse scores, simpler preview deployments on Cloudflare Pages, and the freedom to embed rich Vue components directly in markdown when it makes sense. No over-engineering, just the right tool at the right moment.
