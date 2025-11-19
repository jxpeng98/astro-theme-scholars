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
			// Sketch-style warm grays and monochrome accents
			gray: {
				50: '#faf9f6', // Paper white
				100: '#f5f5f0',
				200: '#e6e6e0',
				300: '#d4d4cc',
				400: '#a8a8a0',
				500: '#787870',
				600: '#5c5c55',
				700: '#40403a',
				800: '#262624',
				900: '#1a1a19',
			},
			accent: {
				50: '#f5f5f5',
				100: '#e5e5e5',
				200: '#cccccc',
				300: '#b3b3b3',
				400: '#999999',
				500: '#808080',
				600: '#404040', // Pencil lead
				700: '#262626',
				800: '#171717',
				900: '#0a0a0a'
			},
		},
		fontFamily: {
			// Clean sans-serif for a technical sketch look
			sans:
				"-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
			heading:
				"-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
		},
		boxShadow: {
			'sketch': '2px 2px 0px 0px rgba(0,0,0,0.1)',
			'sketch-hover': '4px 4px 0px 0px rgba(0,0,0,0.15)',
		},
		animation: {
			'fade-in': 'fadeIn 0.5s ease-out forwards',
			'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
		},
		keyframes: {
			fadeIn: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			},
			fadeInUp: {
				'0%': { opacity: '0', transform: 'translateY(20px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			},
		}
	},
	transformers: [transformerDirectives()]
});
