
export interface SocialLink {
	label: string;
	href: string;
	icon?: string;
}

export interface NavLink {
	href: string;
	label: string;
}

export interface SiteConfig {
	title: string;
	author: string;
	description: string;
	favicon: string;
	keywords: string[];
	socialLinks: SocialLink[];
	navLinks: NavLink[];
	footer: {
		copyright: string;
	};
	hero: {
		headline: string;
		subheadline: string;
		profileAlt: string;
		profileImage: string;
	};
}

export const siteConfig: SiteConfig = {
	title: 'Your Name | Academic Portfolio',
	author: 'Your Name',
	description:
		'Scholarship at the intersection of learning analytics and web infrastructure, building equitable tooling for open scholarship.',
	favicon: '/favicon.svg', // Path to favicon in the public directory
	keywords: ['learning analytics', 'open scholarship', 'web infrastructure', 'academic website'],
	// find the icon name from https://icon-sets.iconify.design
	// most icons are from 'mdi', https://icones.js.org/collection/mdi
	// double check the icon set from https://icones.js.org/
	// copy icon name as the following style 'i+<icon-name>'
	socialLinks: [
		{ label: 'Google Scholar', href: 'https://scholar.google.com', icon: 'i-academicons:google-scholar'},
		{ label: 'GitHub', href: 'https://github.com/your-handle', icon: 'i-logos:github-icon'},
		{ label: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000', icon: 'i-academicons:orcid'},
		{ label: 'Email', href: 'mailto:you.name@example.com', icon: 'i-mdi:email-outline'}
	],
	navLinks: [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/researches', label: 'Researches' },
		{ href: '/teaching', label: 'Teaching' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/posts', label: 'Posts' }
	],
	footer: {
		copyright: 'All rights reserved.'
	},
	hero: {
		headline: 'Scholarship at the intersection of learning analytics and web infrastructure.',
		subheadline:
			'I am a researcher focused on building equitable tooling for open scholarship. My group studies how learning signals travel across platforms, and we ship practical infrastructure for sharing data, publications, and code.',
		profileAlt: 'Portrait of Your Name',
		profileImage: '/profile.svg' // Must be an absolute path starting with '/', a full URL, or a path relative to import.meta.url
	}
};

export default siteConfig;
