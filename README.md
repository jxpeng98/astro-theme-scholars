[English](./README.md) · [简体中文](./README.zh-CN.md)

# Scholar Pages

A refined Astro theme for academic portfolios, research profiles, and personal
scholar websites.

Scholar Pages keeps the site itself fast and focused while making the content
easy to maintain. Profile details live in one TypeScript configuration file;
publications stay in BibTeX, biography records in YAML, and projects, teaching,
and posts in Markdown.

![Scholar Pages desktop home page](./docs/screenshots/academic-home-desktop.png)

## Highlights

- **Designed for academic work** — present publications, appointments,
  teaching, projects, service, awards, and research notes in a consistent
  editorial layout.
- **Content-first workflow** — manage publications with BibTeX, structured
  biography records with YAML, and long-form work with Markdown or MDX.
- **Responsive and theme-aware** — polished desktop and mobile layouts with
  light and dark modes.
- **Useful research navigation** — filter publications, projects, and teaching
  records without duplicating page navigation.
- **Flexible home page** — enable or hide the hero, selected publications, and
  latest posts without editing page templates.
- **SEO-ready output** — canonical URLs, Open Graph metadata, JSON-LD, sitemap,
  and generated `robots.txt` are included.
- **Built for long-term use** — downstream sites can receive versioned template
  updates while preserving personal content.

## More previews

### Publications and filters

![Scholar Pages publications page](./docs/screenshots/publications-unified-desktop.jpg)

### Mobile dark mode

<p align="center">
  <img
    src="./docs/screenshots/academic-home-mobile-dark.png"
    alt="Scholar Pages mobile home page in dark mode"
    width="320"
  />
</p>

## Quick start

### Requirements

- [Node.js](https://nodejs.org/) 22.13 or newer
- [pnpm](https://pnpm.io/) 11 or newer

### Create your site

Use the repository's
[**Use this template**](https://github.com/jxpeng98/astro-theme-scholars/generate)
button, or create the same project from the command line:

```bash
pnpm create astro@latest my-scholar-site --template jxpeng98/astro-theme-scholars
cd my-scholar-site
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

### Develop the template itself

```bash
git clone https://github.com/jxpeng98/astro-theme-scholars.git
cd astro-theme-scholars
pnpm install
pnpm dev
```

Before publishing, replace the sample identity, links, and content. A useful
order is:

1. Update `author`, `siteUrl`, and `hero` in `site.config.ts`.
2. Replace `public/profile.svg` with your portrait or update `hero.profileImage`.
3. Add your publications to `src/data/publications.bib`.
4. Edit `src/data/about.yml`, then replace the project and teaching entries in
   `src/content/`.
5. Replace or remove the sample posts in `src/content/posts/`.

Run `pnpm verify` when you are ready to deploy.

## Where to edit

| What you want to change | File |
| --- | --- |
| Name, profile, affiliations, links, SEO, and page introductions | `site.config.ts` |
| Publications and working papers | `src/data/publications.bib` |
| Biography, experience, education, service, and awards | `src/data/about.yml` |
| Research and software projects | `src/content/projects/*.md` |
| Current and past teaching | `src/content/teaching/*.md` |
| Blog posts and research notes | `src/content/posts/*.{md,mdx}` |
| Profile image and other static assets | `public/` |
| Colors, typography, icons, and reusable style tokens | `uno.config.ts` |

## Site configuration

`site.config.ts` is the main entry point for routine personalization.
`defineSiteConfig` fills in sensible defaults for navigation, page titles,
footer copy, image dimensions, and home-page section labels.

```ts
import { defineSiteConfig } from "./src/config/site";

export const siteConfig = defineSiteConfig({
  author: "Your Name",
  siteUrl: "https://your-site.example",
  hero: {
    headline: "A concise statement of your research focus.",
    subheadline: "A short biography describing your work and interests.",
    profileImage: "/profile.jpg",
    statusBadge: "Open to collaboration",
  },
  affiliations: [
    {
      role: "Assistant Professor",
      department: "School of Information",
      institution: "University Name",
      url: "https://example.edu",
    },
  ],
  researchInterests: [
    "Learning Analytics",
    "Human-Computer Interaction",
  ],
  socialLinks: [
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/...",
      icon: "i-academicons:google-scholar",
    },
    {
      label: "GitHub",
      href: "https://github.com/your-handle",
      icon: "i-mdi:github",
    },
  ],
  homeBlocks: {
    hero: { enabled: true },
    publications: { enabled: true },
    posts: { enabled: true },
  },
});

export default siteConfig;
```

`siteUrl` is the source of truth for canonical URLs, Open Graph URLs,
`robots.txt`, and the sitemap. Set it to the final production address before
deploying.

## Managing content

### Publications

Add publications to `src/data/publications.bib`. Standard BibTeX fields are
supported, plus a `public` field used to group records on the research page.

```bibtex
@inproceedings{key2026paper,
  title = {Your Paper Title},
  author = {Last, First and Other, Author},
  booktitle = {Conference Name},
  year = {2026},
  url = {https://doi.org/...},
  abstract = {A short abstract.},
  public = {yes},
  keywords = {keyword1, keyword2}
}
```

| `public` value | Display group |
| --- | --- |
| `yes` | Publication |
| `wp` | Working Paper |
| `wip` | Work in Progress |
| Any other value or omitted | Other |

Entries marked `public = {yes}` are eligible for the selected-publications
section on the home page.

### About

`src/data/about.yml` keeps profile facts, experience, education, service, and
custom sections such as awards or talks in one structured YAML file. Routine
editing does not require touching Astro components: remove a top-level list to
hide it, and arrange entries in the order you want them displayed. The About
page title and introduction remain in `site.config.ts`; the first custom section
appears beside Service on wide screens.

### Projects and teaching

Projects and courses are Markdown content entries with validated YAML
frontmatter. Store one record per file in `src/content/projects/` or
`src/content/teaching/`; its filename becomes the internal detail-page URL.
External resources remain in the `links` frontmatter field. See the complete
[content authoring guide](./docs/content-authoring.md) for fields, examples,
images, internal links, and migration guidance.

### Posts

Create a Markdown or MDX file in `src/content/posts/`:

```yaml
---
title: "Post title"
description: "A short summary."
publishedAt: 2026-01-15
updatedAt: 2026-02-03
tags:
  - methods
  - open-science
draft: false
---
```

Set `draft: true` to keep a post out of the generated site.

## Included pages

| Route | Purpose |
| --- | --- |
| `/` | Profile, research interests, selected publications, and latest posts |
| `/about` | Profile facts, experience, education, service, and custom sections |
| `/researches` | Filterable publications grouped by research status |
| `/teaching` | Current and past teaching grouped by term |
| `/teaching/[slug]` | Individual course details and external resources |
| `/projects` | Active and past projects with metadata and links |
| `/projects/[slug]` | Individual project details and external resources |
| `/posts` | Posts grouped by year |
| `/posts/[slug]` | Individual Markdown or MDX post |

## Project structure

```text
.
├── public/                    # Static images and icons
├── docs/screenshots/         # README previews
├── site.config.ts            # Main site configuration
├── src/
│   ├── components/           # Shared page and filter components
│   ├── config/               # Configuration defaults
│   ├── content/              # Project, teaching, and post entries
│   ├── data/                 # BibTeX publications and YAML biography data
│   ├── layouts/              # Shared page shell
│   ├── lib/                  # Content and SEO helpers
│   └── pages/                # Astro routes
├── astro.config.ts
├── uno.config.ts
└── package.json
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the static site into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run unit tests |
| `pnpm astro check` | Run Astro and TypeScript checks |
| `pnpm verify` | Run tests, checks, build, and generated-site assertions |

## Deployment

Scholar Pages builds to a static `dist/` directory:

```bash
pnpm verify
pnpm build
```

Deploy `dist/` to any static host, including Cloudflare Pages, Vercel, Netlify,
or GitHub Pages. Use `pnpm build` as the build command and `dist` as the output
directory.

## Template updates

Template releases use SemVer tags such as `v0.8.0`. Updates are delivered as
reviewable pull requests because repositories created from a GitHub template
have independent histories.

Check `.template-version` first. If the file is missing or reports a version
older than `0.6.0`, use the one-time migration below even if the repository
already contains an update workflow.

Sites on `v0.6.x` should first copy the `v0.7.0`
`.github/workflows/template-update.yml` into their default branch. This is a
one-time bootstrap: the older updater cannot update workflow files with its
default GitHub token. From `v0.7.0` onward, the updater executes the migration
logic shipped by the target release, so future data migrations do not require
another workflow replacement.

### Sites on v0.6.0 or newer

These sites contain all three update files:

- `.github/workflows/template-update.yml`
- `.template-sync.json`
- `.template-version`

To update one of these sites:

1. Open **Settings → Actions → General → Workflow permissions** and enable
   **Allow GitHub Actions to create and approve pull requests**. This setting
   is disabled by default for new personal repositories; see GitHub's
   [workflow permissions documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests).
2. Open **Actions → Template Update → Run workflow**. The same workflow also
   checks for releases every Monday.
3. Review the generated `chore/template-update-X.Y.Z` pull request and merge it
   when the changes are correct. The updater installs dependencies and runs the
   full verification suite before opening or updating the pull request.

Do not change `.template-version` to the target version before running the
workflow; that would mark the site as already updated.

The paths listed under `protected` in `.template-sync.json` are left untouched.
By default this includes site configuration, YAML and BibTeX data, content
entries, project and teaching images, profile images, the favicon, and
environment files. Other template-owned files are replaced by the released
versions. Review the complete pull request before merging, especially if the
site contains custom template code.

When updating to `v0.7.0`, the updater detects the retired
`src/data/projects.yml` and `src/data/teaching.yml` files before syncing. It
keeps template demo entries out of the update, converts each personal record to
a Markdown content entry, and leaves the original YAML files unchanged for
comparison or rollback. Existing Markdown entries are never overwritten. After
reviewing the generated entries and detail pages, the retired YAML files can be
deleted.

#### Push rejected while updating workflow files

The repository `GITHUB_TOKEN` is a GitHub App installation token. GitHub
requires a separate `Workflows` repository permission when a push creates or
changes files under `.github/workflows`, so enabling pull-request creation alone
does not grant that access.

The template updater therefore excludes `.github/workflows/**` automatically
when `TEMPLATE_UPDATE_TOKEN` is not configured. New repositories created from
this template can update all other template-owned files with the default token
without hitting the workflow-permission rejection. Apply workflow changes
manually after reviewing them.

To let the updater include workflow files, create a fine-grained personal access
token limited to this repository with `Contents: Read and write`, `Pull
requests: Read and write`, and `Workflows: Write`. Save it as the repository
Actions secret `TEMPLATE_UPDATE_TOKEN`; never put the token value in the
workflow file. The updater detects this secret automatically.

Sites whose installed updater predates `v0.7.0` need the one-time workflow
bootstrap described above, then can rerun **Template Update**. Alternatively, add
`.github/workflows/**` to the site's `.template-sync.json` `protected` list to
keep managing workflows manually.

Use an expiring, repository-scoped token and revoke it when it is no longer
needed. Organization repositories may require an administrator to approve the
token. See GitHub's documentation for
[personal access token permissions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens),
[Actions secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets),
and the GitHub App
[`Workflows` permission](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app#choosing-permissions-for-git-access).

### Sites older than v0.6.0

Start from a clean working tree and run this one-time migration from the old
site's repository root in a Bash-compatible shell. The current sync script
moves the legacy personal configuration to `site.config.ts`, installs the new
compatibility entry, and removes obsolete template-owned content and robots
files without changing personal content:

```bash
git switch -c chore/template-update-v0.8.0

template_dir="$(mktemp -d)"
template_dir="$(cd "$template_dir" && pwd -P)"
git clone --depth 1 --branch v0.8.0 \
  https://github.com/jxpeng98/astro-theme-scholars.git \
  "$template_dir"

node "$template_dir/scripts/sync-template-release.mjs" \
  --source "$template_dir" \
  --target . \
  --config "$template_dir/.template-sync.json"

pnpm install --frozen-lockfile
node scripts/migrate-legacy-content.mjs
pnpm verify
git status --short
git diff
```

Review and commit the migration on this branch, then open a pull request. The
migration installs the automatic update files, so future releases can use the
workflow above. If the script reports an unsupported legacy configuration,
migrate that customized file manually instead of forcing the sync. Restore any
additional user-owned files that are not covered by the default protected paths
before committing.

Avoid merging the template repository directly with
`--allow-unrelated-histories`; GitHub documents that
[repositories generated from templates have unrelated histories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository#about-template-repositories).

### Publishing template releases

Template maintainers can validate and publish a release with:

```bash
pnpm verify
node scripts/check-release.mjs --tag v0.8.0
git push origin main
git tag -a v0.8.0 -m "v0.8.0"
git push origin v0.8.0
```

Keep `package.json`, `.template-version`, and the latest `CHANGELOG.md` entry on
the same version. Pushing the tag runs the release workflow and creates the
GitHub Release automatically.

## Contributing

Issues and pull requests are welcome. For significant changes, open an issue
first so the intended behavior and scope can be discussed.

## License

Released under the [MIT License](./LICENSE).
