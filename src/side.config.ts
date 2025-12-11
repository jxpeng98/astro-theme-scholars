/**
 * Scholar Pages - Site Configuration
 * ================================
 * This file contains all configuration options for your academic website.
 * Simply fill in your information below to personalize your site.
 * 
 * 📖 Documentation: https://github.com/jxpeng98/astro-scholars
 */

import type { SiteConfig } from './types/config';

// ============================================================================
// YOUR CONFIGURATION - Edit the values below
// ============================================================================

export const siteConfig: SiteConfig = {
	// ---------------------------------------------------------------------------
	// 🏠 BASIC INFORMATION
	// ---------------------------------------------------------------------------

	/** Site title shown in browser tab */
	title: 'Your Name | Academic Portfolio',

	/** Your full name */
	author: 'Your Name',

	/** Brief description for SEO (appears in search results) */
	description:
		'Scholarship at the intersection of learning analytics and web infrastructure, building equitable tooling for open scholarship.',

	/** Path to favicon in /public directory */
	favicon: '/favicon.svg',

	/** Keywords for SEO */
	keywords: [
		'learning analytics',
		'open scholarship',
		'web infrastructure',
		'academic website',
		'research',
	],

	// ---------------------------------------------------------------------------
	// 🎓 ACADEMIC PROFILE
	// ---------------------------------------------------------------------------

	/** Your current academic affiliations */
	affiliations: [
		{
			role: 'Assistant Professor',
			department: 'School of Information',
			institution: 'University Name',
			url: 'https://example.edu/info',
		},
		// Add more affiliations:
		// { role: 'Research Affiliate', institution: 'Lab Name', url: 'https://...' },
	],

	/** Your research interests (displayed as tags on home page) */
	researchInterests: [
		'Learning Analytics',
		'Human-Computer Interaction',
		'Open Scholarship',
		'Civic Technology',
	],

	// ---------------------------------------------------------------------------
	// 🔗 SOCIAL & CONTACT LINKS
	// Find icons at: https://icones.js.org
	// Academic icons: 'academicons' collection | General: 'mdi' collection
	// ---------------------------------------------------------------------------
	socialLinks: [
		{
			label: 'Google Scholar',
			href: 'https://scholar.google.com/citations?user=YOUR_ID',
			icon: 'i-academicons:google-scholar'
		},
		{
			label: 'ORCID',
			href: 'https://orcid.org/0000-0000-0000-0000',
			icon: 'i-academicons:orcid'
		},
		{
			label: 'GitHub',
			href: 'https://github.com/your-handle',
			icon: 'i-mdi:github'
		},
		{
			label: 'Email',
			href: 'mailto:you@example.edu',
			icon: 'i-mdi:email-outline'
		},
		{
			label: 'Twitter',
			href: 'https://twitter.com/your-handle',
			icon: 'i-mdi:twitter'
		},
		// More options:
		// { label: 'ResearchGate', href: '...', icon: 'i-academicons:researchgate' },
		// { label: 'Semantic Scholar', href: '...', icon: 'i-academicons:semantic-scholar' },
		// { label: 'LinkedIn', href: '...', icon: 'i-mdi:linkedin' },
	],

	// ---------------------------------------------------------------------------
	// 🧭 NAVIGATION
	// ---------------------------------------------------------------------------
	navLinks: [
		{ href: '/about', label: 'About' },
		{ href: '/researches', label: 'Research' },
		{ href: '/teaching', label: 'Teaching' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/posts', label: 'Blog' },
	],

	// ---------------------------------------------------------------------------
	// 📝 FOOTER
	// ---------------------------------------------------------------------------
	footer: {
		copyright: 'All rights reserved.',
	},

	// ---------------------------------------------------------------------------
	// 🏠 HERO SECTION (Home Page)
	// ---------------------------------------------------------------------------
	hero: {
		/** Main headline - your research focus in one sentence */
		headline: 'Scholarship at the intersection of learning analytics and web infrastructure.',

		/** Detailed bio/description */
		subheadline:
			'I am a researcher focused on building equitable tooling for open scholarship. My group studies how learning signals travel across platforms, and we ship practical infrastructure for sharing data, publications, and code.',

		/** Alt text for profile image (for accessibility) */
		profileAlt: 'Portrait of Your Name',

		/** Profile image: use '/image.jpg' for public folder, or full URL */
		profileImage: '/profile.svg',

		/** Optional: Profile image dimensions in pixels */
		profileImageHeight: 160,
		profileImageWidth: 160,

		/** Optional: Status badge (e.g., "📬 Open to collaboration", "🎓 PhD Candidate") */
		statusBadge: '📬 Open to collaboration',
	},

	// ---------------------------------------------------------------------------
	// 📄 PAGE TITLES AND DESCRIPTIONS
	// These appear as titles and subtitles on each page and in SEO meta tags
	// ---------------------------------------------------------------------------
	pageTitles: {
		about: {
			title: 'About',
			description: 'Scholar, educator, and builder focused on learning analytics, humane computing, and tools that support open collaboration.',
		},
		researches: {
			title: 'Publications',
			description: 'Peer-reviewed publications, working papers, and essays on learning analytics, open scholarship, and civic technology.',
		},
		projects: {
			title: 'Projects',
			description: 'Open-source tools and research infrastructure projects for the academic community.',
		},
		teaching: {
			title: 'Teaching',
			description: 'Courses designed to bridge technical skills with critical inquiry in learning sciences and information studies.',
		},
		posts: {
			title: 'Blog',
			description: 'Thoughts on academia, research methods, technology, and the spaces in between.',
		},
	},

	// ---------------------------------------------------------------------------
	// 🏠 HOME PAGE BLOCKS
	// Customize titles and descriptions for sections on the home page
	// ---------------------------------------------------------------------------
	homeBlocks: {
		publications: {
			title: 'Selected Publications',
			description: 'Recent peer-reviewed work',
		},
		posts: {
			title: 'Latest Posts',
			description: 'Thoughts and updates',
		},
	},
};

export default siteConfig;
