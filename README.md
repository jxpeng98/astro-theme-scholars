[简体中文](./README.zh-CN.md)

# Scholar Pages Theme for Astro

Your academic and research portfolio, beautifully crafted. This Astro theme helps you build a professional, fast, and content-driven personal website with ease.

![Desktop and Mobile Previews of Scholar Pages Theme](https://r2imga.jxpeng.dev/2025/10/9dfa4106fa05badc9f5e80b4694c9309.png)

## Introduction

Welcome to Scholar Pages! This feature-rich Astro theme is designed to give academics, researchers, and students a compelling online presence. We blend the power of Astro's static site generation with simple data-driven content management, so you can focus on your work while we handle the heavy lifting of building your site.

The theme is built with performance and customization in mind, featuring automatic BibTeX parsing, YAML-based content for your profile and projects, and utility-first styling with UnoCSS.

## Features

- **Astro Framework**: Built with Astro for fast, optimized static site generation.
- **Sketch Style Design**: A unique, minimalist aesthetic featuring warm gray tones, paper-like textures, and hand-drawn style shadows.
- **BibTeX Integration**: Automatically parse and display publications from a BibTeX file.
- **YAML Data Sources**: Manage profile, projects, and teaching data through easy-to-edit YAML files.
- **UnoCSS Styling**: Utilize UnoCSS for utility-first styling with customizable themes.
- **Modular Components**: Reusable components for easy customization and extension.
- **Responsive Design**: Mobile-friendly layouts with a smart navigation menu that adapts to screen size.
- **SEO Optimized**: Built-in SEO best practices to enhance discoverability.
- **Dark Mode Support**: Automatic dark mode styling for improved readability in low-light environments.
- **Easy Deployment**: Ready for deployment on popular static site hosting platforms.

## Getting Started

### What You'll Need

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Bun](https://bun.sh/)

### 1. Set Up Your Site

Clone the repository and install the dependencies:

```bash
git clone https://github.com/jxpeng98/astro-scholars.git
cd astro-scholars
bun install
```

### 2. Run in Development Mode

Start the local development server and see your site in action:

```bash
bun dev
```

Your site will be available at `http://localhost:4321`.

## Available Commands

| Command           | Action                                             |
| :---------------- | :------------------------------------------------- |
| `bun install`     | Install dependencies                               |
| `bun dev`         | Start the local dev server at `http://localhost:4321` |
| `bun build`       | Build the production site to `./dist/`              |
| `bun preview`     | Preview the production build locally                |
| `bun astro ...`   | Access Astro CLI commands (e.g., `bun astro check`) |

## Customization Guide

Make it your own! Customize your site by editing the configuration and data files.

### Branding & Navigation

- Edit `src/side.config.ts` to change site title, author name, hero copy, social links, navigation, and footer text.
- `hero.profileImage` accepts either a CDN URL or a relative path (e.g., `assets/profile.svg`).
- Social link icons can use UnoCSS icon class names (e.g., `i-logos:github-icon`). These are safelisted in `uno.config.ts`.

### About Page Content

Modify `src/data/about.yml` to update your profile. This file supports standard sections and custom expandable sections.

**Standard Sections:**

- `hero`: Page title and introduction.
- `profile`: Key-value pairs displayed in the sidebar (e.g., Role, Research Areas).
- `education`: List of degrees.
- `experience`: Professional history with bullet points.
- `service`: Academic service (supports simple strings or structured objects with role/organization).

**Custom Sections (New):**
You can add arbitrary sections like "Awards", "Invited Talks", or "Press" using the `sections` key.

```yaml
sections:
  - title: Awards
    items:
      - title: Best Paper Award
        subtitle: ACM CHI 2023
        date: 2023
        description: For the paper "Social Learning Signals in the Wild"
        link: https://example.com/award
      - title: NSF Graduate Research Fellowship
        date: 2016 — 2021
      # Simple string items are also supported
      - Dean's List, Clearwater College (2010-2014)
```

The page at `src/pages/about.astro` automatically renders these sections—no code changes required.

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

## Project Structure

```text
/
├── public/               # Static files served as-is
├── src/
│   ├── assets/           # Images, icons, and theme graphics
│   ├── components/       # Reusable UI components
│   ├── content/          # Markdown/MDX blog posts
│   │   └── posts/
│   ├── data/             # Content data (BibTeX & YAML sources)
│   │   ├── about.yml
│   │   ├── projects.yml
│   │   ├── publications.bib
│   │   └── teaching.yml
│   ├── layouts/          # Site-wide layouts (header/footer)
│   ├── lib/              # Utility helpers (BibTeX parser, paper helpers)
│   ├── pages/            # Route pages (home, about, posts, projects, researches, teaching)
│   └── side.config.ts    # Global site configuration (branding, links, hero)
├── uno.config.ts         # UnoCSS presets, shortcuts, and safelist
├── astro.config.mjs      # Astro configuration
└── bun.lock / package.json
```

## Deployment

This Astro project is a static site. To deploy, run `bun build` and upload the contents of the `dist/` directory to any static hosting provider, such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Contributing

We love contributions! Please feel free to submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute the theme under the terms described in the license.
