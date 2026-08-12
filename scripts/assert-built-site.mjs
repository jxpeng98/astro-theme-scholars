import { access, readdir, readFile } from "node:fs/promises";

const root = new URL("../dist/", import.meta.url);

async function readDist(path) {
	return readFile(new URL(path, root), "utf8");
}

async function existsInDist(path) {
	try {
		await access(new URL(path, root));
		return true;
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}
}

async function readDistCss() {
	const assetRoot = new URL("_astro/", root);
	const entries = await readdir(assetRoot);
	const cssFiles = entries.filter((entry) => entry.endsWith(".css"));
	const contents = await Promise.all(
		cssFiles.map((file) => readFile(new URL(file, assetRoot), "utf8")),
	);
	return contents.join("\n");
}

async function readDistJs() {
	const assetRoot = new URL("_astro/", root);
	const entries = await readdir(assetRoot);
	const jsFiles = entries.filter((entry) => entry.endsWith(".js"));
	const contents = await Promise.all(
		jsFiles.map((file) => readFile(new URL(file, assetRoot), "utf8")),
	);
	return contents.join("\n");
}

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function titles(html) {
	return [...html.matchAll(/<title>(.*?)<\/title>/g)].map((match) => match[1]);
}

function countMatches(html, value) {
	return html.split(value).length - 1;
}

function footer(html) {
	return html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? "";
}

function assertFilterGroup(html, pageName, filters) {
	assert(
		html.includes('role="group"') &&
			html.includes('aria-label="Filter sections"') &&
			!html.includes('role="toolbar"'),
		`${pageName} page should render filter controls as a labeled button group`,
	);
	assert(
		countMatches(html, 'data-filter="all"') === 1 &&
			html.includes('data-active="true"') &&
			html.includes('aria-pressed="true"'),
		`${pageName} page should render one active all filter button`,
	);
	assert(
		html.includes("data-filter-icon") &&
			html.includes("data-filter-count") &&
			html.includes("data-filter-label"),
		`${pageName} page should render semantic filter button markers`,
	);

	for (const filter of filters) {
		assert(
			html.includes(`data-filter="${filter}"`),
			`${pageName} page should render the ${filter} filter button`,
		);
	}
}

const index = await readDist("index.html");
const siteTitleLink = index.match(/<a[^>]*data-site-title[^>]*>/)?.[0] ?? "";
assert(
	siteTitleLink && !siteTitleLink.includes("aria-label"),
	"site title link should use its visible text as its accessible name",
);
assert(
	titles(index)[0] === "Scholar Pages Demo | Academic Portfolio",
	"home page title should use the concise configured site title",
);
assert(
	index.includes('link rel="canonical" href="https://astro-theme-scholars.pages.dev/"'),
	"home page canonical should use the configured production URL",
);
assert(
	index.includes('property="og:image" content="https://astro-theme-scholars.pages.dev/profile.svg"'),
	"home page OG image should be absolute",
);
assert(
	index.includes(
		'meta property="og:url" content="https://astro-theme-scholars.pages.dev/"',
	) &&
		index.includes('meta property="og:image:alt" content="Generic profile illustration"') &&
		index.includes('meta name="twitter:card" content="summary"') &&
		index.includes('meta name="author" content="Scholar Pages Demo"'),
	"home page should render complete Open Graph, Twitter, and author metadata",
);
assert(
	countMatches(index, 'meta name="keywords"') === 1,
	"home page should emit one keywords meta tag",
);
assert(
	index.includes('"@type":"ProfilePage"') &&
		index.includes('"@type":"Person"') &&
		index.includes('"@type":"WebSite"'),
	"home page should render linked profile and website structured data",
);
assert(
	index.includes('meta name="astro-view-transitions-enabled" content="true"'),
	"pages should enable Astro client-side navigation",
);
assert(
	index.includes('data-astro-image="constrained"') &&
		index.includes('fetchpriority="high"') &&
		index.includes('loading="eager"'),
	"home profile image should use Astro responsive image priority hints",
);
assert(
	index.includes('id="selected-publications"') &&
		index.includes('id="latest-posts"') &&
		index.includes("01 / Research") &&
		index.includes("02 / Notes"),
	"default configuration should render all enabled home page blocks in order",
);
assert(
	index.includes("ScholarHub: A Configurable Academic Homepage Generator") &&
		!index.includes("Tracing Learners Across Platforms Through Lightweight Signals"),
	"home page should select only entries marked as publications",
);
assert(
	index.includes("<details") &&
		index.includes("<summary") &&
		!index.includes("data-abstract-toggle"),
	"home page abstracts should use native disclosure elements",
);

const research = await readDist("researches/index.html");
assert(titles(research).length === 1, "research page should emit one <title>");
assert(
	titles(research)[0] === "Publications | Scholar Pages Demo | Academic Portfolio",
	"research page title should include page title",
);
assertFilterGroup(research, "research", [
	"publication",
	"working-paper",
	"work-in-progress",
]);
assert(
	!research.includes('aria-label="Page sections"') &&
		research.includes('id="publication"') &&
		research.includes("<details") &&
		!research.includes("data-abstract-toggle"),
	"research filters should not duplicate section navigation and abstracts should work natively",
);

const post = await readDist("posts/astro-overview/index.html");
assert(titles(post).length === 1, "post page should emit one <title>");
assert(
	titles(post)[0] === "Launching the Scholars Site | Scholar Pages Demo | Academic Portfolio",
	"post page title should use post title",
);
assert(
	post.includes(
		'meta name="description" content="Lessons learned while bootstrapping a personal academic website with Astro.',
	),
	"post page should use post description metadata",
);
assert(
	post.includes(
		'link rel="canonical" href="https://astro-theme-scholars.pages.dev/posts/astro-overview/"',
	) &&
		post.includes('meta property="og:type" content="article"') &&
		post.includes(
			'meta property="article:published_time" content="2024-07-12T00:00:00.000Z"',
		) &&
		post.includes('"@type":"BlogPosting"') &&
		post.includes('"@type":"BreadcrumbList"'),
	"post page should render canonical article metadata and structured data",
);

try {
	await access(new URL("posts/draft-only/index.html", root));
	throw new Error("draft post route should not be generated");
} catch (error) {
	if (error.code !== "ENOENT") throw error;
}

const about = await readDist("about/index.html");
assert(about.includes("Current Role"), "about page should render profile data");
assert(
	footer(index) === footer(about) &&
		footer(index).includes('class="flex justify-end text-right"') &&
		footer(index).includes(
			`&copy; ${new Date().getFullYear()} Scholar Pages Demo. All rights reserved.`,
		),
	"all pages should render the same right-aligned author and copyright footer",
);
assert(
	about.includes("Research Areas"),
	"about page should render research areas profile data",
);
assert(
	about.includes('aria-label="Page sections"') &&
		about.includes('href="#profile"') &&
		about.includes('id="profile"'),
	"about page should render section jump links with matching anchors",
);

const aboutCanonical = 'link rel="canonical" href="https://astro-theme-scholars.pages.dev/about/"';
const researchCanonical = 'link rel="canonical" href="https://astro-theme-scholars.pages.dev/researches/"';

assert(about.includes(aboutCanonical), "about page canonical should use siteConfig.siteUrl");
assert(research.includes(researchCanonical), "research page canonical should use siteConfig.siteUrl");

const projects = await readDist("projects/index.html");
const projectStatusFilters = ["active", "past", "unspecified"];
const visibleProjectStatusFilters = projectStatusFilters.filter((filter) =>
	projects.includes(`data-filter-section="${filter}"`),
);
if (visibleProjectStatusFilters.length > 1) {
	assertFilterGroup(projects, "projects", visibleProjectStatusFilters);
} else {
	assert(
		!projects.includes('role="toolbar"') && !projects.includes('data-filter="all"'),
		"projects page should hide filter controls when only one status group has items",
	);
}

const teaching = await readDist("teaching/index.html");
assertFilterGroup(teaching, "teaching", ["current", "past"]);
assert(
	!teaching.includes('aria-label="Page sections"') && teaching.includes('id="current"'),
	"teaching filters should not duplicate section navigation",
);

const sitemap = await readDist("sitemap-0.xml");
assert(
	sitemap.includes("https://astro-theme-scholars.pages.dev/about/"),
	"sitemap should use the configured production URL",
);
const robots = await readDist("robots.txt");
assert(
	robots.includes("User-agent: *") &&
		robots.includes("Allow: /") &&
		robots.includes(
			"Sitemap: https://astro-theme-scholars.pages.dev/sitemap-index.xml",
		),
	"robots.txt should be generated from the configured production URL",
);

assert(await existsInDist("profile.svg"), "default profile image should exist in dist");

const css = await readDistCss();
assert(
	css.includes(".min-h-10{min-height:2.5rem}"),
	"filter button touch target utility should be generated in CSS",
);
assert(
	/@media\s*\(prefers-reduced-motion:reduce\)/.test(css) &&
		css.includes("animation-duration:.01ms!important") &&
		css.includes("animation-iteration-count:1!important") &&
		css.includes("scroll-behavior:auto!important") &&
		css.includes("transition-duration:.01ms!important"),
	"layout should include global reduced-motion overrides",
);

const js = await readDistJs();
assert(
	js.includes("mobile-menu-toggle") &&
		js.includes("back-to-top") &&
		js.includes("prefers-reduced-motion: reduce") &&
		js.includes("astro:page-load") &&
		js.includes("AbortController"),
	"layout browser behavior should be bundled in generated JavaScript",
);
