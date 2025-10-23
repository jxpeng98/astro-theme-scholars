// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/vite';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-theme-scholars.pages.dev/', // Your production site URL here
	integrations: [icon()],
	vite: {
		plugins: [UnoCSS()]
	}
});
