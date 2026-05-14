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
---
# Situation
I originally migrated this site from Nuxt 2 to Hugo to simplify a content‑first build and reduce runtime complexity. Later, I moved back to Nuxt to regain a richer component system, content tooling, and a more flexible UI layer.

[Check the repo](https://github.com/ivanovertime/alvarezivan.net)

This post documents that round‑trip and highlights an additional goal: exploring Cloudflare Pages as the hosting target, including build limits, cache behavior, and deployment ergonomics.

# What changed
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
