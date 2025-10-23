import { defineConfig, presetWind, presetTypography, transformerDirectives, presetIcons } from 'unocss';
import siteConfig from './src/side.config';

const iconSafelist = siteConfig.socialLinks
	.map((link) => link.icon)
	.filter((icon): icon is string => Boolean(icon && icon.startsWith('i-')));

iconSafelist.push('i-ph-moon-stars-duotone', 'i-ph-sun-dim-duotone');

export default defineConfig({
	safelist: iconSafelist,
	presets: [
		presetWind(),
		presetTypography({
			cssExtend: {
				':where(p, li, blockquote)': {
					'font-family':
						"'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
				},
				':where(h1, h2, h3, h4, h5, h6)': {
					'font-family': "'Playfair Display', Georgia, 'Times New Roman', serif"
				}
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
		'btn-primary':
			'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500 text-white font-medium shadow-sm transition-all duration-200 hover:bg-accent-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70 focus-visible:ring-offset-2 no-underline dark:bg-accent-400 dark:text-slate-900 dark:hover:bg-accent-300',
		'btn-secondary':
			'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-600 border border-accent-200/70 font-medium shadow-sm transition-all duration-200 hover:bg-accent-100 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300/70 focus-visible:ring-offset-2 no-underline dark:bg-transparent dark:text-accent-200 dark:border-accent-300/60 dark:hover:bg-accent-500/10',
		'surface-card':
			'rounded-3xl border border-slate-200/80 bg-white shadow-[0_16px_32px_rgba(15,23,42,0.05)] dark:border-slate-700 dark:bg-slate-900',
		'chips-row': 'flex flex-wrap gap-2 items-center list-none m-0 p-0',
		'chips-item': 'px-3 py-1 rounded-full bg-white border border-slate-200 text-sm text-slate-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200'
	},
	theme: {
		colors: {
			accent: {
				50: '#faf5ff',
				100: '#f3e8ff',
				200: '#e9d5ff',
				300: '#d8b4fe',
				400: '#c084fc',
				500: '#a855f7',
				600: '#9333ea'
			},
			muted: '#475569'
		},
		fontFamily: {
			sans:
				"'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
			heading: "'Playfair Display', Georgia, 'Times New Roman', serif"
		},
		boxShadow: {
			card: '0 16px 32px rgba(15, 23, 42, 0.05)'
		}
	},
	transformers: [transformerDirectives()]
});
