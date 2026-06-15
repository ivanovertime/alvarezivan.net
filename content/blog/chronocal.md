---
title: "ChronoCal: Time tracking inside Google Calendar"
description: "A Google Calendar add-on built with Apps Script that tracks real time spent on events directly in Google Workspace—no external backend, no third-party storage, and no browser-side timer dependency."
date: "2026-06-15"
category: "side-project"
minRead: 6
image: "/blog/chronocal/featuredImage.jpg"
author:
  name: "Iván Álvarez"
  username: "ivanovertime"
  to: "https://github.com/ivanovertime"
  avatar:
    src: "/avatar.jpg"
    alt: "Iván Álvarez"
tags:
  - "google-workspace"
  - "time-tracking"
type: "side-project"
stack: ["Google Apps Script", "JavaScript", "Google Calendar API", "Google Sheets API"]
repoUrl: "https://github.com/ivanovertime/ChronoCal"
team_size: 1
role: "Engineer"
year: 2026
outcome_headline: "Published a functional MVP that brings real-time tracking directly into Google Calendar without external infrastructure"
featured: false
---

## Situation

As part of an ongoing effort to simplify my development setup and leverage Google solutions as much as possible—including migrating from Outlook to Google Calendar as I transition to NixOS—I needed a time-tracking solution that lived entirely within Google Workspace.

If you live in Google Workspace (Calendar, Drive, Meet), context-switching between apps to track time on calendar events creates friction. You're already in Calendar to manage your day—why leave it to start a timer?

Most time-tracking solutions require either:
- A separate app you need to remember to open
- A backend service to persist state
- A third-party integration that adds OAuth complexity
- A browser timer that depends on the tab staying active

## Problem

Calendar events are already a reliable source of truth for your time commitment. What if you could:
- Start/pause/stop tracking directly from the Calendar event card
- Keep state in Apps Script UserProperties (no backend needed)
- Optionally write the tracked duration back to the event description
- Export sessions to Google Sheets for reporting or analysis

## Solution: ChronoCal

ChronoCal is a Google Calendar add-on built entirely with Google Apps Script. It provides:

### Core Features

**In-Event Tracking**
- Open any calendar event on desktop Calendar and a contextual card appears
- Buttons to start, pause, resume, and stop tracking from the card itself
- Session state persists using Apps Script UserProperties—survives browser refresh and tab close

**Flexible Session States**
- Running: timer is actively tracking
- Paused: stopped but not finalized
- Stopped: finalized session ready for export

**Event Description Integration**
- Toggle option to write the final tracked duration directly to event descriptions
- Handles recurring event instances correctly
- Resolves the event across all calendars in your Google Account

**Google Sheets Export**
- Export completed sessions to a Google Sheet for reporting, billing, or analysis
- Minimal setup: the add-on can create the Sheet or append to an existing one

### Technical Approach

The implementation is split across six core modules:

```
src/
├── main.gs           # Entry point and onOpen handler
├── cards.gs          # Card UI construction and button handlers
├── session.gs        # Session state management and timing logic
├── calendar.gs       # Calendar API interactions and event resolution
├── sheets.gs         # Google Sheets export logic
└── config.gs         # Configuration constants and toggles
```

**No External Backend**
Everything runs inside Google Apps Script. UserProperties store the session state, so it survives across browser sessions and tabs.

**OAuth Scope Minimization**
The manifest declares Calendar (read/write), Sheets, and Calendar add-on execution scopes only. No external API calls or third-party storage.

**Event Resolution**
Correctly handles recurring events and calendar resolution, so you can track time on the same event across multiple calendars without duplication.

## Why This Approach

The friction in traditional time tracking comes from context-switching. If you're already in Google Calendar (which most knowledge workers are), triggering a timer from the event card removes a step.

Apps Script is ideal for this because:
- Native access to Calendar and Sheets without additional APIs
- UserProperties provide persistent client-side state
- Contextual cards integrate directly into Calendar's UI
- Zero infrastructure: no servers to maintain, no databases to back up
- Tight integration with Google Workspace

## Current State

ChronoCal is a functional MVP with pause/resume and Sheets export flows. Planned evolution includes:
- Keyboard shortcuts for faster access
- Bulk session export options
- Integration with other Workspace apps (Gmail, Tasks)
- Analytics dashboard within Sheets
- More granular state management (e.g., session notes, billing codes)

## Development & Deployment

The repo includes a complete deployment workflow using `clasp` (Google Apps Script CLI). Prerequisites are minimal:
- Node.js and npm
- Google account with Apps Script access
- Optional: Nix + direnv (dev environment files included)

```bash
direnv allow
npx @google/clasp login
npx @google/clasp create --type standalone --title "ChronoCal" --rootDir .
npx @google/clasp push
npx @google/clasp open
```

The project also includes contribution guidelines, PR templates, and issue templates for collaborators.

## Key Takeaway

ChronoCal proves that powerful productivity tools don't need complex infrastructure. By leveraging Google Apps Script and UserProperties, you can build a tracking system that lives inside the tool you already use every day—Calendar—without adding operational burden or privacy concerns.

If you use Google Workspace and find yourself constantly switching between Calendar and time trackers, give ChronoCal a try: [github.com/ivanovertime/ChronoCal](https://github.com/ivanovertime/ChronoCal)

---

**Image attribution:** Featured image is from Outlook. Photo by <a href="https://unsplash.com/@edhardie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ed Hardie</a> on <a href="https://unsplash.com/photos/a-computer-screen-with-a-calendar-on-it-4BnNnEtAGP0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
