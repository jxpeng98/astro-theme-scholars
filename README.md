[English](./README.md) · [简体中文](./README.zh-CN.md)

# Scholar Pages

An Astro theme for academics who want a polished website without turning every
content update into a frontend task.

Scholar Pages separates content from presentation: site-wide details live in one
TypeScript configuration file, publications stay in BibTeX, biography records
use YAML, and projects, courses, and posts are written in Markdown. The bundled
Mira Latticewell profile is entirely fictional and exists only to demonstrate
the theme.

![Scholar Pages desktop home page](./docs/screenshots/academic-home-desktop.png)

## Highlights

- **A complete academic structure** — publish a profile, appointments,
  publications, projects, teaching, service, awards, and research notes.
- **Straightforward editing** — keep publication data in BibTeX, profile records
  in YAML, and longer writing in Markdown or MDX.
- **Better publication tools** — filter records, expand abstracts in place, and
  copy BibTeX, APA 7, Chicago, or Harvard citations from one compact dialog.
- **A distinct editorial blog** — feature one post, add optional cover images,
  show reading time automatically, and keep the archive visually separate from
  the portfolio grids.
- **A configurable home page** — show or hide the profile hero, featured
  initiatives, selected publications, and recent posts from `site.config.ts`.
- **Responsive by default** — desktop and mobile layouts include light and dark
  modes, keyboard focus states, and accessible native controls.
- **Ready to publish and maintain** — canonical URLs, Open Graph metadata,
  JSON-LD, sitemap, `robots.txt`, and versioned template updates are included.

## More previews

### Editorial blog

![Scholar Pages editorial blog](./docs/screenshots/blog-editorial-desktop.png)

### Publications, abstracts, and citations

![Scholar Pages publications page](./docs/screenshots/publications-unified-desktop.jpg)

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

The included identity, institutions, publications, projects, courses, and posts
are fictional. Replace them before publishing your own site. The quickest order
is:

1. Update `author`, `siteUrl`, and `hero` in `site.config.ts`.
2. Replace `public/profile.svg` with your portrait or update `hero.profileImage`.
3. Add your publications to `src/data/publications.bib`.
4. Edit the profile records in `src/data/about.yml`.
5. Replace the project, teaching, and post entries in `src/content/`.
6. Replace the matching cover images in `src/assets/`, or remove their image
   fields.

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
| Profile image, favicon, and other public files | `public/` |
| Project, teaching, and post cover images | `src/assets/` |
| Colors, typography, icons, and reusable style tokens | `uno.config.ts` |

## Site configuration

Most site-wide changes begin in `site.config.ts`. You provide the identity and
the details you care about; `defineSiteConfig` supplies stable defaults for
navigation, page titles, footer copy, image dimensions, and home-page labels.

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
    showcase: {
      enabled: true,
      title: "Featured Initiatives",
    },
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

Add publications to `src/data/publications.bib`. The theme reads standard
BibTeX fields and uses the extra `public` field to group records on the Research
page.

```bibtex
@inproceedings{latticewell2026signalatlas,
  title = {Signal Atlas for an Imaginary Archive},
  author = {Latticewell, Mira},
  booktitle = {Proceedings of the Fictional Systems Forum},
  year = {2026},
  url = {https://example.com/signal-atlas},
  abstract = {A fictional paper used to demonstrate citation metadata.},
  public = {yes},
  keywords = {fictional archives, demo data}
}
```

| `public` value | Display group |
| --- | --- |
| `yes` | Publication |
| `wp` | Working Paper |
| `wip` | Work in Progress |
| Any other value or omitted | Other |

Entries marked `public = {yes}` are eligible for the selected-publications
section on the home page. When an entry includes an `abstract`, readers can
expand it without leaving the list. The Cite action prepares BibTeX, APA 7,
Chicago, and Harvard versions from the same record. Add a `url` to link the
title and show the compact PDF action.

### About

`src/data/about.yml` holds profile facts, experience, education, service, and
custom sections such as awards or talks. Reorder the entries to change their
display order; remove a top-level list, or set it to `[]`, to hide that block.
Empty optional records are ignored, so routine edits do not require changes to
the Astro page. Keep the page title and introduction in `site.config.ts`. On
wide screens, the first custom section sits beside Service.

### Projects and teaching

Each project or course is a Markdown file with validated YAML frontmatter. Put
one record in each file under `src/content/projects/` or
`src/content/teaching/`; the filename becomes its detail-page URL. Add external
resources through the `links` field. The full
[content authoring guide](./docs/content-authoring.md) covers every field,
images, internal links, and migration from the earlier YAML format.

### Posts

Create a Markdown or MDX file in `src/content/posts/`:

```yaml
---
title: "Post title"
description: "A short summary."
publishedAt: 2026-01-15
updatedAt: 2026-02-03
featured: true
heroImage: ../../assets/posts/post-cover.jpg
heroImageAlt: "Describe the cover image"
tags:
  - methods
  - open-science
draft: false
---
```

Set `draft: true` to keep a post out of the generated site. The newest post with
`featured: true` becomes the lead story; if none is featured, the newest
published post is used. Reading time is calculated from the Markdown body. A
`heroImageAlt` value is required whenever `heroImage` is present.

## Included pages

| Route | Purpose |
| --- | --- |
| `/` | Profile, featured initiatives, selected publications, and recent posts |
| `/about` | Profile facts, experience, education, service, and custom sections |
| `/researches` | Filterable publications grouped by research status |
| `/teaching` | Current and past teaching grouped by term |
| `/teaching/[slug]` | Individual course details and external resources |
| `/projects` | Active and past projects with metadata and links |
| `/projects/[slug]` | Individual project details and external resources |
| `/posts` | Featured story and editorial post archive |
| `/posts/[slug]` | Individual article with reading metadata and sharing links |

## Project structure

```text
.
├── public/                    # Static images and icons
├── docs/screenshots/         # README previews
├── site.config.ts            # Main site configuration
├── src/
│   ├── assets/               # Optimized project, teaching, and post images
│   ├── components/           # Shared page, card, and filter components
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

Run the full verification before deploying. It runs the tests and type checks,
then creates the static site in `dist/`:

```bash
pnpm verify
```

Deploy `dist/` to any static host, including Cloudflare Pages, Vercel, Netlify,
or GitHub Pages. In a hosting dashboard, set the build command to `pnpm build`
and the output directory to `dist`.

## Template updates

Template releases use SemVer tags such as `v0.8.0`. A site created from the
GitHub template has its own history, so updates arrive as pull requests that you
can review instead of direct merges from this repository.

Check `.template-version` first. If the file is missing or reports a version
older than `0.6.0`, use the one-time migration below even if the repository
already contains an update workflow.

Sites on `v0.6.x` must first copy
`.github/workflows/template-update.yml` from `v0.7.0` into their default branch.
This one-time bootstrap is necessary because the older updater cannot replace
workflow files with its default GitHub token. From `v0.7.0` onward, the updater
runs the migration logic included in the target release, so later data
migrations do not require another workflow replacement.

### Sites on v0.6.0 or newer

Automated updates require these three files:

- `.github/workflows/template-update.yml`
- `.template-sync.json`
- `.template-version`

To apply a template update:

1. Open **Settings → Actions → General → Workflow permissions** and enable
   **Allow GitHub Actions to create and approve pull requests**. This setting
   is disabled by default for new personal repositories; see GitHub's
   [workflow permissions documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests).
2. Open **Actions → Template Update → Run workflow**. The same workflow also
   checks for releases every Monday.
3. Review the generated `chore/template-update-X.Y.Z` pull request. The updater
   installs dependencies and runs the full verification suite before it opens or
   updates the pull request; merge only after the diff also looks right for your
   site.

Do not change `.template-version` to the target version before running the
workflow; that would mark the site as already updated.

The updater leaves every path listed under `protected` in `.template-sync.json`
untouched. The default list covers site configuration, YAML and BibTeX data,
content entries, project and teaching images, profile images, the favicon, and
environment files. Released versions replace the remaining template-owned
files. Review the complete pull request before merging, especially if you have
edited template code.

When updating to `v0.7.0`, the updater detects the retired
`src/data/projects.yml` and `src/data/teaching.yml` files before syncing. It
keeps template demo entries out of the update, converts each personal record to
a Markdown content entry, and leaves the original YAML files unchanged for
comparison or rollback. Existing Markdown entries are never overwritten. After
reviewing the generated entries and detail pages, the retired YAML files can be
deleted.

#### Push rejected while updating workflow files

The repository's `GITHUB_TOKEN` is a GitHub App installation token. GitHub
requires a separate `Workflows` permission when a push creates or changes files
under `.github/workflows`; permission to create pull requests is not enough.

Without `TEMPLATE_UPDATE_TOKEN`, the updater therefore excludes
`.github/workflows/**` automatically. The default token can still update every
other template-owned file. Review and apply workflow changes manually.

To include workflow files, create a fine-grained personal access token limited
to this repository with `Contents: Read and write`, `Pull requests: Read and
write`, and `Workflows: Write`. Save it as the Actions secret
`TEMPLATE_UPDATE_TOKEN`; never write the token itself into a workflow file. The
updater detects the secret automatically.

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

Start with a clean working tree, then run this one-time migration from the old
site's repository root in a Bash-compatible shell. The sync script moves the
legacy personal configuration to `site.config.ts`, installs the compatibility
entry, and removes obsolete template-owned content and robots files without
changing personal content:

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

Review and commit the migration on this branch, then open a pull request. It also
installs the automatic update files, so later releases can use the workflow
above. If the script reports an unsupported legacy configuration, migrate that
customized file by hand instead of forcing the sync. Before committing, restore
any additional user-owned files that fall outside the default protected paths.

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

Issues and pull requests are welcome. For a substantial change, open an issue
first so we can agree on the intended behavior and scope.

## License

Released under the [MIT License](./LICENSE).
