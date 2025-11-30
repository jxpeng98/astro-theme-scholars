/**
 * Scholar Pages - Type Definitions
 * ================================
 * Type definitions for site configuration.
 */

export interface SocialLink {
	/** Display label for the social link */
	label: string;
	/** Full URL to your profile */
	href: string;
	/** UnoCSS icon class. Find icons at: https://icones.js.org */
	icon?: string;
}

export interface NavLink {
	/** URL path for the navigation link */
	href: string;
	/** Display label for the navigation link */
	label: string;
}

export interface Affiliation {
	/** Your role/title at this institution */
	role: string;
	/** Name of the department */
	department?: string;
	/** Name of the institution */
	institution: string;
	/** URL to the institution or department page */
	url?: string;
}

export interface SiteConfig {
	// --- Basic Information ---
	title: string;
	author: string;
	description: string;
	favicon: string;
	keywords: string[];
	// --- Academic Profile ---
	affiliations: Affiliation[];
	researchInterests: string[];
	// --- Links & Navigation ---
	socialLinks: SocialLink[];
	navLinks: NavLink[];
	// --- Footer ---
	footer: {
		copyright: string;
	};
	// --- Hero Section ---
	hero: {
		headline: string;
		subheadline: string;
		profileAlt: string;
		profileImage: string;
		statusBadge?: string;
	};
	// --- Page Descriptions ---
	pageDescriptions: {
		about: string;
		researches: string;
		projects: string;
		teaching: string;
		posts: string;
	};
}
