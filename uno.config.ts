import { defineConfig, presetWind, presetTypography, transformerDirectives, presetIcons } from 'unocss';
import siteConfig from './src/side.config';

// Extract icons from social links
const iconSafelist = siteConfig.socialLinks
	.map((link) => link.icon)
	.filter((icon): icon is string => Boolean(icon && icon.startsWith('i-')));

// Add theme toggle and UI icons
iconSafelist.push(
	// Theme icons
	'i-ph-moon-stars-duotone',
	'i-ph-sun-dim-duotone',
	// Navigation icons
	'i-ph-list-bold',
	'i-ph-x-bold',
	'i-ph-arrow-up-bold',
	// Page section icons
	'i-mdi:account-circle',
	'i-mdi:school',
	'i-mdi:briefcase',
	'i-mdi:account-group',
	'i-mdi:trophy-award',
	'i-mdi:check-circle',
	'i-mdi:star-outline',
	'i-mdi:medal',
	'i-mdi:bookshelf',
	'i-mdi:file-document-check',
	'i-mdi:file-document-edit',
	'i-mdi:file-document-outline',
	'i-mdi:file-document',
	'i-mdi:file-document-multiple',
	'i-mdi:text-box-outline',
	'i-mdi:open-in-new',
	'i-mdi:arrow-right',
	'i-mdi:arrow-left',
	'i-mdi:arrow-top-right',
	'i-mdi:folder-open',
	'i-mdi:code-braces',
	'i-mdi:circle',
	'i-mdi:rocket-launch',
	'i-mdi:archive',
	'i-mdi:book-education',
	'i-mdi:calendar',
	'i-mdi:calendar-blank',
	'i-mdi:calendar-check',
	'i-mdi:calendar-range',
	'i-mdi:history',
	'i-mdi:post-outline',
	'i-mdi:clock-outline',
	'i-mdi:update',
	'i-mdi:twitter',
	'i-mdi:linkedin',
);

export default defineConfig({
	safelist: iconSafelist,
	presets: [
		presetWind(),
		presetTypography({
			cssExtend: {
				':where(p, li, blockquote)': {
					'font-family':
						"'Inter', 'Noto Sans SC', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
				},
			}
		}),
		presetIcons({
			scale: 1.1,
			warn: true,
			cdn: 'https://esm.sh/',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		})
	],
	shortcuts: {
		// Buttons
		'btn-primary':
			'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-600 text-white font-medium text-sm shadow-sm transition-all duration-200 hover:bg-accent-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70 focus-visible:ring-offset-2 no-underline dark:bg-accent-500 dark:hover:bg-accent-400',
		'btn-secondary':
			'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm transition-all duration-200 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/70 focus-visible:ring-offset-2 no-underline border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700',
		'btn-ghost':
			'inline-flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 font-medium text-sm transition-all duration-200 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 no-underline',

		// Cards
		'card':
			'rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900',
		'card-hover':
			'rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-lg hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700',
		'card-accent':
			'rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 p-5 dark:from-accent-900/20 dark:to-accent-800/20 dark:border-accent-800/50',

		// Chips/Tags
		'chip':
			'px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
		'chip-accent':
			'px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200',
		'chip-success':
			'px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',

		// Section headers
		'section-title':
			'font-heading text-2xl font-bold text-gray-900 dark:text-gray-50',
		'section-subtitle':
			'text-sm text-gray-600 dark:text-gray-400',

		// Links
		'link':
			'text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200 no-underline transition-colors',
		'link-muted':
			'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 no-underline transition-colors',
	},
	theme: {
		colors: {
			// Academic-inspired color palette
			gray: {
				50: '#fafafa',   // Nearly white
				100: '#f5f5f5',
				200: '#e5e5e5',
				300: '#d4d4d4',
				400: '#a3a3a3',
				500: '#737373',
				600: '#525252',
				700: '#404040',
				800: '#262626',
				900: '#171717',
			},
			// Scholarly blue-gray accent
			accent: {
				50: '#f0f4f8',
				100: '#d9e2ec',
				200: '#bcccdc',
				300: '#9fb3c8',
				400: '#829ab1',
				500: '#627d98',
				600: '#486581',  // Primary academic blue
				700: '#334e68',
				800: '#243b53',
				900: '#102a43'
			},
			// Success/Active states (for current courses, active projects)
			emerald: {
				50: '#ecfdf5',
				100: '#d1fae5',
				200: '#a7f3d0',
				300: '#6ee7b7',
				400: '#34d399',
				500: '#10b981',
				600: '#059669',
				700: '#047857',
				800: '#065f46',
				900: '#064e3b',
			},
			// Awards/Recognition
			amber: {
				50: '#fffbeb',
				100: '#fef3c7',
				200: '#fde68a',
				300: '#fcd34d',
				400: '#fbbf24',
				500: '#f59e0b',
				600: '#d97706',
				700: '#b45309',
				800: '#92400e',
				900: '#78350f',
			},
		},
		fontFamily: {
			// Professional academic typography
			sans:
				"'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Noto Sans SC', 'Helvetica Neue', Arial, sans-serif",
			heading:
				"'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, 'Noto Sans SC', 'Helvetica Neue', Arial, sans-serif",
			mono:
				"'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, monospace",
		},
		boxShadow: {
			'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
			'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
			'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
			'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
			'sketch': '2px 2px 0px 0px rgba(0,0,0,0.08)',
			'sketch-hover': '4px 4px 0px 0px rgba(0,0,0,0.12)',
		},
		animation: {
			'fade-in': 'fadeIn 0.5s ease-out forwards',
			'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
			'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		},
		keyframes: {
			fadeIn: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			},
			fadeInUp: {
				'0%': { opacity: '0', transform: 'translateY(16px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			},
			pulse: {
				'0%, 100%': { opacity: '1' },
				'50%': { opacity: '0.5' },
			},
		}
	},
	transformers: [transformerDirectives()]
});
