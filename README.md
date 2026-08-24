[English](./README.md) · [简体中文](./README.zh-CN.md)

# Scholar Pages

A refined Astro theme for academic portfolios, research profiles, and personal
scholar websites.

Scholar Pages keeps the site itself fast and focused while making the content
easy to maintain. Profile details live in one TypeScript configuration file;
publications, projects, teaching records, and posts stay in familiar BibTeX,
YAML, and Markdown files.

![Scholar Pages desktop home page](./docs/screenshots/home-desktop.jpg)

## Highlights

- **Designed for academic work** — present publications, appointments,
  teaching, projects, service, awards, and research notes in a consistent
  editorial layout.
- **Content-first workflow** — manage publications with BibTeX, structured
  records with YAML, and posts with Markdown or MDX.
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

![Scholar Pages publications page](./docs/screenshots/research-desktop.jpg)

### Mobile dark mode

<p align="center">
  <img
    src="./docs/screenshots/home-mobile-dark.jpg"
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
4. Edit the YAML records in `src/data/`.
5. Replace or remove the sample posts in `src/content/posts/`.

Run `pnpm verify` when you are ready to deploy.

## Where to edit

| What you want to change | File |
| --- | --- |
| Name, profile, affiliations, links, SEO, and page introductions | `site.config.ts` |
| Publications and working papers | `src/data/publications.bib` |
| Biography, experience, education, service, and awards | `src/data/about.yml` |
| Research and software projects | `src/data/projects.yml` |
| Current and past teaching | `src/data/teaching.yml` |
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

### About, projects, and teaching

The files in `src/data/` use YAML so records remain readable and easy to
reorder. The included examples document the available fields:

- `about.yml` supports profile facts, experience, education, service, and
  custom sections such as awards or talks.
- `projects.yml` supports status, period, descriptions, badges, highlights,
  metadata, technologies, and multiple links.
- `teaching.yml` separates current and past terms and supports course codes,
  summaries, tags, highlights, and links.

Most optional fields can be omitted; empty elements are not rendered.

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
| `/projects` | Active and past projects with metadata and links |
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
│   ├── content/posts/        # Markdown and MDX posts
│   ├── data/                 # BibTeX and YAML content
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

Template releases use SemVer tags such as `v0.6.1`. Updates are delivered as
reviewable pull requests because repositories created from a GitHub template
have independent histories.

Check `.template-version` first. If the file is missing or reports a version
older than `0.6.0`, use the one-time migration below even if the repository
already contains an update workflow.

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
3. Review the generated `chore/template-update-X.Y.Z` pull request, wait for CI,
   and merge it when the changes are correct.

Do not change `.template-version` to the target version before running the
workflow; that would mark the site as already updated.

The paths listed under `protected` in `.template-sync.json` are left untouched.
By default this includes site configuration, YAML and BibTeX data, posts,
profile images, the favicon, and environment files. Other template-owned files
are replaced by the released versions. Review the complete pull request before
merging, especially if the site contains custom template code.

#### Push rejected while updating workflow files

The repository `GITHUB_TOKEN` is a GitHub App installation token. GitHub
requires a separate `Workflows` repository permission when a push creates or
changes files under `.github/workflows`, so enabling pull-request creation alone
does not prevent this error:

```text
refusing to allow a GitHub App to create or update workflow
`.github/workflows/ci.yml` without `workflows` permission
```

Choose one of these approaches, then rerun **Template Update**:

1. **Keep the default token and update workflows manually.** Add both
   `.template-sync.json` and `.github/workflows/**` to the `protected` list in
   `.template-sync.json`, commit that change to the default branch, and rerun
   the updater. The update PR will exclude workflow files; compare them with the
   target template release and apply the required workflow changes separately.
2. **Allow the updater to sync workflow files.** Create a fine-grained personal
   access token limited to this repository with `Contents: Read and write`,
   `Pull requests: Read and write`, and `Workflows: Write`. Save it as the
   repository Actions secret `TEMPLATE_UPDATE_TOKEN`; never put the token value
   in the workflow file. The current updater uses this secret automatically and
   falls back to `GITHUB_TOKEN` when it is absent. On sites created before this
   support was added, change both the checkout `token` and `GH_TOKEN` in
   `.github/workflows/template-update.yml` to:

   ```yaml
   ${{ secrets.TEMPLATE_UPDATE_TOKEN || github.token }}
   ```

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
git switch -c chore/template-update-v0.6.1

template_dir="$(mktemp -d)"
template_dir="$(cd "$template_dir" && pwd -P)"
git clone --depth 1 --branch v0.6.1 \
  https://github.com/jxpeng98/astro-theme-scholars.git \
  "$template_dir"

node "$template_dir/scripts/sync-template-release.mjs" \
  --source "$template_dir" \
  --target . \
  --config "$template_dir/.template-sync.json"

pnpm install --frozen-lockfile
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
node scripts/check-release.mjs --tag v0.6.1
git push origin main
git tag -a v0.6.1 -m "v0.6.1"
git push origin v0.6.1
```

Keep `package.json`, `.template-version`, and the latest `CHANGELOG.md` entry on
the same version. Pushing the tag runs the release workflow and creates the
GitHub Release automatically.

## Contributing

Issues and pull requests are welcome. For significant changes, open an issue
first so the intended behavior and scope can be discussed.

## License

Released under the [MIT License](./LICENSE).
