# Projects and teaching content

Projects and courses are Astro Content Collection entries. Each entry is one Markdown file with YAML frontmatter followed by the long-form detail content.

- Projects live in `src/content/projects/`.
- Teaching entries live in `src/content/teaching/`.
- The filename becomes the internal detail URL. For example, `scholars-portal.md` is published at `/projects/scholars-portal`.
- Do not add that internal URL to frontmatter. Index pages generate it automatically.
- `order` controls list order. Lower numbers appear first.
- `draft: true` hides an entry from both the index and generated routes.

## Project entry

```md
---
title: Example Research Tool
summary: One sentence that explains the work and its value.
status: active
period: 2025 to Present
order: 4
featured: false
badges:
  - Open source
tech:
  - Astro
highlights:
  - A concise, evidence-based outcome.
metadata:
  - label: Role
    value: Principal investigator
links:
  - label: Repository
    href: https://github.com/example/project
---

## Why it exists

Write the project narrative in Markdown here.
```

Required project fields are `title`, `summary`, `status`, `period`, and `order`. `status` accepts `active`, `past`, or `unspecified`. Optional arrays default to empty.

To add a cover, place the source image under `src/assets/` and add both fields:

```yaml
cover: ../../assets/projects/example.png
coverAlt: Screenshot showing the project dashboard
```

`coverAlt` is required whenever `cover` is present.

## Teaching entry

```md
---
title: Example Course
code: INFO 500
summary: One sentence describing the course focus.
term: Autumn 2026
status: current
order: 7
badges:
  - Graduate
tags:
  - studio
highlights:
  - Students publish a documented final project.
links:
  - label: Public syllabus
    href: https://example.edu/course/syllabus
---

## Course premise

Write the course overview, learning goals, and assessment details here.
```

Required teaching fields are `title`, `code`, `summary`, `term`, `status`, and `order`. `status` accepts `current` or `past`.

## Internal and external links

The whole project or course row on an index page links to its generated internal detail page. The `links` frontmatter field is reserved for external resources and accepts absolute `http://` or `https://` URLs only. External resources appear on the detail page, open in a new tab, and are ordered by their position in the array; the first resource receives primary visual emphasis.

For another internal page referenced inside the long-form content, use a normal root-relative Markdown link:

```md
See the [research overview](/researches) for related work.
```

## What happened to the old YAML files?

YAML is still used for frontmatter and remains fully validated. Only the former centralized files, `src/data/projects.yml` and `src/data/teaching.yml`, are retired. Other data files under `src/data/` continue to work as before.

### Migrating an existing site

The `v0.7.0` template updater handles the former centralized YAML format:

1. Before syncing, it detects `src/data/projects.yml` and `src/data/teaching.yml` and prevents template demo entries and images from replacing personal content.
2. It creates one Markdown file for every project and course, preserving order, metadata, tags, highlights, and valid external links.
3. It leaves both original YAML files unchanged for comparison or rollback.
4. It runs the complete verification suite before opening the update pull request.

If collection entries already exist, the migrator leaves them untouched. After reviewing the generated pages, delete the retired YAML files so there is only one content source.

To run the conversion manually after installing dependencies:

```bash
node scripts/migrate-legacy-content.mjs
pnpm verify
```

Template sync protects both collection directories and their project/teaching asset folders, so later theme updates do not overwrite personal entries or covers.
