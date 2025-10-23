// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/vite';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	integrations: [icon()],
	vite: {
		plugins: [UnoCSS()]
	}
});
