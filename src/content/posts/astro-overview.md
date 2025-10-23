---
title: Launching the Scholars Site
description: Lessons learned while bootstrapping a personal academic website with Astro.
publishedAt: 2024-07-12
tags:
  - astro
  - web
---

I rebuilt my academic homepage on top of Astro to keep the authoring experience lightweight but fully programmable. The component model makes it easy to mix Markdown, MDX, and interactive islands when I need them.

A few takeaways from the migration:

1. Start with content collections. Strong typing for posts removes publishing friction.
2. Lean on the server entry for glue code. I use it to summarize paper metadata and normalize BibTeX fields.
3. Keep styling tokens in a single file; duplicating them across components grew painful quickly.
