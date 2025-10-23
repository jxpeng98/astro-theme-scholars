
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
	title: 'Riley Ashford | Academic Portfolio',
	author: 'Riley Ashford',
	description:
		'Scholarship at the intersection of learning analytics and web infrastructure, building equitable tooling for open scholarship.',
	favicon: '/favicon.svg', // Path to favicon in the public directory
	keywords: ['learning analytics', 'open scholarship', 'web infrastructure', 'academic website'],
	// find the icon name from https://icon-sets.iconify.design
	// double check the icon set from https://icones.js.org/
	// copy icon name as the following style 'i+<icon-name>'
	socialLinks: [
		{ label: 'Google Scholar', href: 'https://scholar.google.com', icon: 'i-academicons:google-scholar'},
		{ label: 'GitHub', href: 'https://github.com/rileyashford', icon: 'i-logos:github-icon'},
		{ label: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000', icon: 'i-academicons:orcid'},
		{ label: 'Email', href: 'mailto:riley.ashford@example.com', icon: 'i-mdi:email-outline'}
	],
	navLinks: [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/researches', label: 'Researches' },
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
		profileAlt: 'Portrait of Riley Ashford',
		profileImage: 'profile.svg' // Path relative to src/ or /public, or full URL
	}
};

export default siteConfig;
