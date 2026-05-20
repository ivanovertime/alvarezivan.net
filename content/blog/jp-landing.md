---
title: "Jhey Pi: an official landing site for an aspiring musician"
description: "Official landing site for Jhey Pi, built with Nuxt 4 and Nuxt UI to combine Spotify releases and YouTube videos into a single feed."
date: "2026-05-18"
category: "side-project"
minRead: 3
image: "/projects/jp-landing.png"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
  - "nuxt"
  - "side-project"
type: "side-project"
stack: ["Nuxt", "Vue", "Tailwind CSS"]
repoUrl: "https://github.com/ivanovertime/jp-landing"
team_size: 1
role: "Engineer"
year: 2026
outcome_headline: "Shipped a focused artist landing site with a single feed for music updates and video content"
featured: false
---
## TL;DR

Jhey Pi is the official landing site for an aspiring musician. I built it to keep the artist story, Spotify releases, and YouTube videos in one place, with a simple feed that stays easy to scan.

## Context

The goal was to make a landing site that felt like a proper home for the artist, not just another promo page. The site pulls the latest Spotify releases and YouTube videos into one feed, so the content stays current without turning the page into a manual update burden.

## Constraints

- Keep the experience lightweight and easy to update.
- Merge Spotify releases, artist profile data, and YouTube videos into one feed.
- Support bilingual copy without making the page feel crowded.

## Decisions

| Decision | Trade-off | Chose |
|---|---|---|
| Build a traditional promo site with separate pages for music and video | More room for content, but harder to keep current | |
| Build a single landing site with a merged, auto-sorted feed | Easier to scan and maintain; the artist updates in one place | <DecisionCheck /> |
| Keep the copy monolingual | Simpler, but weaker reach for bilingual audiences | |
| Support ES/EN copy | Better fit for the audience, with a little more content work | <DecisionCheck /> |

## Outcome

The project shipped as a clean landing site for Jhey Pi with a single content feed, artist profile data, and room for bilingual copy. It also made the update flow simpler: new releases and videos can surface without needing the whole page to be rewritten.

Feature-wise, the useful pieces were:

- Spotify releases and artist profile via Spotify API.
- YouTube latest videos via the channel feed.
- Auto-sorted, paginated feed with embeds.
- Bilingual copy in ES/EN.
- ISR caching for the feed endpoint.

## What I'd do on GCP today

If this needed to scale further, I would keep the feed endpoint cached with ISR-style behavior, move the integrations behind a small server layer, and host the front end on Cloud Run or Firebase Hosting with preview environments per pull request.
