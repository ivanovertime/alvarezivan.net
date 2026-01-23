---
title: "From Nuxt to Hugo"
description: "Notes on migrating this site from Nuxt 2 to Hugo—why the switch made sense, what changed, and the steps that kept the move manageable."
date: "2024-05-12"
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
I had wanted to use Hugo for a while, and when it came time to move my Nuxt 2 site forward I chose to migrate instead of upgrading to Nuxt 3. Nuxt excels at dynamic Vue apps, but this project is a content-first site. Hugo's static build pipeline, multi-language support, and minimal runtime footprint were a much better fit.

# Solution
1. **Map the objectives**
   - Audit what Nuxt is doing for you: data fetching, dynamic routes, plugins, and middleware.
   - Decide what can become pre-generated content versus what still needs runtime logic.
2. **Move the content first**
   - Export Markdown from the Nuxt Content module (or your CMS) and drop it into Hugo's `content/` tree.
   - Translate front matter into TOML/YAML front matter so Hugo can read titles, dates, and taxonomies.
3. **Recreate layouts intentionally**
   - Identify Nuxt layouts and Vue components that map to Hugo templates or partials.
   - Rebuild only what adds value; Hugo's Go templates often need fewer abstractions.
4. **Replace dynamic features**
   - For features like search, consider Hugo's JSON outputs plus a lightweight client-side index.
   - For forms or comments, integrate external services or serverless functions instead of writing Vue logic.
5. **Tighten the build & deploy loop**
   - `hugo server -D` gives fast local previews; `hugo --gc --minify` mirrors production.
   - Deployment shrinks to uploading the `public/` folder or letting Netlify handle it.

> It's not DNS <br>
> It cannot be DNS <br>
> It was DNS

Good luck with your migration! If you hit a snag, it's probably DNS—check it anyway.
