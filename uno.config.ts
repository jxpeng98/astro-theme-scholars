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
			'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-800 text-white font-medium text-sm shadow-sm transition-all duration-200 hover:bg-accent-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70 focus-visible:ring-offset-2 no-underline dark:bg-accent-400 dark:text-slate-900 dark:hover:bg-accent-300',
		'btn-secondary':
			'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-700 font-medium text-sm shadow-sm transition-all duration-200 hover:bg-accent-100 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300/70 focus-visible:ring-offset-2 no-underline border-none dark:bg-transparent dark:text-accent-200 dark:hover:bg-accent-500/10',
		'surface-card':
			'rounded-3xl border border-slate-200/80 bg-white shadow-[0_16px_32px_rgba(15,23,42,0.05)] dark:border-slate-700 dark:bg-slate-900',
		'chips-row': 'flex flex-wrap gap-2 items-center list-none m-0 p-0',
		'chips-item': 'px-3 py-1 rounded-full bg-accent-50 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200'
	},
	theme: {
		colors: {
			accent: {
				50: '#FBF7FE',
                100: '#F3E4FD',
                200: '#E8C5FB',
                300: '#D99FF8',
                400: '#C979F5',
                500: '#B754E9',
                600: '#A033D4',
                700: '#851AB6',
                800: '#6B0099',
                900: '#58007E'
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
