# Scholar Pages Theme (Astro)

This repository contains a customizable Astro theme for academic and research portfolios. It is designed to help scholars sustain a consistent online presence with configurable content, publications sourced from BibTeX, YAML-driven profile data, and UnoCSS-powered styling.

## 📁 Structure Overview

```text
/
├── public/               # Static files served as-is
├── src/
│   ├── assets/           # Images, icons, and theme graphics
│   ├── components/       # Reusable UI components
│   ├── data/             # Content data (BibTeX & YAML sources)
│   │   ├── about.yml     # Personal profile, education, experience
│   │   ├── projects.yml  # Featured projects definition
│   │   ├── publications.bib # Publication metadata
│   │   └── teaching.yml  # Current & past teaching modules
│   ├── layouts/          # Site-wide layouts (header/footer)
│   ├── lib/              # Utility helpers (BibTeX parser, paper helpers)
│   ├── components/       # Reusable logic (YAML data loaders, UI pieces)
│   ├── pages/            # Route pages (home, about, posts, projects, researches, teaching)
│   └── side.config.ts    # Global site configuration (branding, links, hero)
├── uno.config.ts         # UnoCSS presets, shortcuts, and safelist
├── astro.config.mjs      # Astro configuration
└── bun.lock / package.json
```

## ⚙️ Customization Guide

### Branding & Navigation

- Edit `src/side.config.ts` to change site title, author name, hero copy, social links, navigation, and footer text.
- `hero.profileImage` accepts either a CDN URL or a relative path (e.g., `assets/profile.svg`).
- Social link icons can use UnoCSS icon class names (e.g., `i-logos:github-icon`). These are safelisted in `uno.config.ts`.

### About Page Content

- Modify `src/data/about.yml` to update profile highlights, education, experience entries, and selected service.
- The page at `src/pages/about.astro` parses this YAML—no code changes required after editing the data file.

### Publications & Projects

- Update `src/data/publications.bib` with BibTeX entries. Parsed entries are rendered on the Researches page.
- Define projects in `src/data/projects.yml`; the helper in `src/components/projects.ts` converts that YAML into the cards displayed on the Projects page.

### Blog Posts

- Content lives under `src/content/posts/`. Add Markdown/MDX files with frontmatter matching the schema in `src/content/config.ts`.

### Teaching Modules

- Edit `src/data/teaching.yml` to manage current and past modules. The Teaching page reads this data and groups modules by term with tag chips.

### Styling

- Utility classes come from UnoCSS. Modify shortcuts, presets, or safelist entries in `uno.config.ts` to adjust theme styling.
- Global layout styling (header/footer/grid) is located within `src/layouts/Layout.astro`.

## 🧞 Commands

Run from the project root:

| Command           | Action                                             |
| :---------------- | :------------------------------------------------- |
| `bun install`     | Install dependencies                               |
| `bun dev`         | Start the local dev server at `http://localhost:4321` |
| `bun build`       | Build the production site to `./dist/`              |
| `bun preview`     | Preview the production build locally                |
| `bun astro ...`   | Access Astro CLI commands (e.g., `bun astro check`) |

## 📄 License

This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute the theme under the terms described in the license.
