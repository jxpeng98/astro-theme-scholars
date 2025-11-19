// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/vite';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-theme-scholars.pages.dev/', // Your production site URL here
	integrations: [icon(), sitemap()],
	vite: {
		plugins: [UnoCSS()]
	},
	prefetch: true
});
