/**
 * Scholar Pages - primary configuration
 *
 * Start here for identity, profile, links, and page introductions.
 * Publications, CV records, projects, courses, and posts live in src/data
 * and src/content so this file stays quick to scan.
 */
import { defineSiteConfig } from "./src/config/site";

export const siteConfig = defineSiteConfig({
	// Required: the four values most sites should personalize first.
	author: "Scholar Pages Demo",
	siteUrl: "https://astro-theme-scholars.pages.dev",
	hero: {
		headline:
			"Scholarship at the intersection of learning analytics and web infrastructure.",
		subheadline:
			"This sample profile demonstrates how Scholar Pages presents research, teaching, projects, and notes in one maintainable academic site.",
		profileImage: "/profile.svg",
		profileAlt: "Generic profile illustration",
		statusBadge: "Demo content",
	},

	// Common profile and discovery settings.
	description:
		"Live demonstration of Scholar Pages, an Astro theme for academic portfolios and research profiles.",
	keywords: [
		"learning analytics",
		"open scholarship",
		"web infrastructure",
		"academic website",
		"research",
	],
	// Optional social-preview overrides:
	// language: "en",
	// locale: "en_US",
	// ogImage: "/social-card.png", // Prefer a 1200 × 630 raster image.
	// ogImageAlt: "Scholar name - academic portfolio",
	// ogImageWidth: 1200,
	// ogImageHeight: 630,
	affiliations: [
		{
			role: "Sample academic profile",
			institution: "Example University",
		},
	],
	researchInterests: [
		"Learning Analytics",
		"Human-Computer Interaction",
		"Open Scholarship",
		"Civic Technology",
	],
	socialLinks: [
		{
			label: "Repository",
			href: "https://github.com/jxpeng98/astro-theme-scholars",
			icon: "i-mdi:github",
		},
		{
			label: "Documentation",
			href: "https://github.com/jxpeng98/astro-theme-scholars#readme",
			icon: "i-mdi:bookshelf",
		},
		{
			label: "Releases",
			href: "https://github.com/jxpeng98/astro-theme-scholars/releases",
			icon: "i-mdi:tag-outline",
		},
	],

	// Optional: omit any entry to use the concise academic default copy.
	pageTitles: {
		about: {
			description:
				"Scholar, educator, and builder focused on learning analytics, humane computing, and tools that support open collaboration.",
		},
		researches: {
			description:
				"Peer-reviewed publications, working papers, and essays on learning analytics, open scholarship, and civic technology.",
		},
		projects: {
			description:
				"Open-source tools and research infrastructure projects for the academic community.",
		},
		teaching: {
			description:
				"Courses designed to bridge technical skills with critical inquiry in learning sciences and information studies.",
		},
		posts: {
			description:
				"Thoughts on academia, research methods, technology, and the spaces in between.",
		},
	},

	// Homepage composition: switch off any block you do not want to display.
	homeBlocks: {
		hero: { enabled: true },
		publications: { enabled: true },
		posts: { enabled: true },
	},
});

export default siteConfig;
