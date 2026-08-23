import {
	mkdtemp,
	mkdir,
	readFile,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, test } from "vitest";
import {
	isProtectedPath,
	syncTemplateRelease,
} from "../scripts/sync-template-release.mjs";

describe("template sync path protection", () => {
	test("protects user-owned content paths", () => {
		const patterns = [
			"site.config.ts",
			"src/data/**",
			"src/content/projects/**",
			"src/content/teaching/**",
			"src/assets/projects/**",
			"src/assets/teaching/**",
			"public/profile.*",
		];

		expect(isProtectedPath("src/data/about.yml", patterns)).toBe(true);
		expect(isProtectedPath("src/data/nested/file.yml", patterns)).toBe(true);
		expect(isProtectedPath("src/content/projects/my-project.md", patterns)).toBe(true);
		expect(isProtectedPath("src/content/teaching/my-course.md", patterns)).toBe(true);
		expect(isProtectedPath("src/assets/projects/cover.png", patterns)).toBe(true);
		expect(isProtectedPath("src/assets/teaching/cover.png", patterns)).toBe(true);
		expect(isProtectedPath("site.config.ts", patterns)).toBe(true);
		expect(isProtectedPath("public/profile.svg", patterns)).toBe(true);
	});

	test("allows template-owned source paths", () => {
		const patterns = [
			"site.config.ts",
			"src/data/**",
			"src/content/projects/**",
			"src/content/teaching/**",
			"public/profile.*",
		];

		expect(isProtectedPath("src/side.config.ts", patterns)).toBe(false);
		expect(isProtectedPath("src/pages/projects.astro", patterns)).toBe(false);
		expect(isProtectedPath("src/lib/projects.ts", patterns)).toBe(false);
		expect(isProtectedPath("public/robots.txt", patterns)).toBe(false);
	});

	test("preserves migrated collections and covers during a template sync", async () => {
		const root = await mkdtemp(join(tmpdir(), "scholars-content-sync-"));
		const sourceDir = join(root, "source");
		const targetDir = join(root, "target");
		const protectedPaths = [
			"src/content/projects/**",
			"src/content/teaching/**",
			"src/assets/projects/**",
			"src/assets/teaching/**",
		];

		try {
			const paths = [
				"src/content/projects/my-project.md",
				"src/content/teaching/my-course.md",
				"src/assets/projects/cover.png",
				"src/pages/projects.astro",
			];
			await Promise.all(
				paths.flatMap((path) => [
					mkdir(dirname(join(sourceDir, path)), { recursive: true }),
					mkdir(dirname(join(targetDir, path)), { recursive: true }),
				]),
			);
			await Promise.all(
				paths.flatMap((path) => [
					writeFile(join(sourceDir, path), `template ${path}\n`),
					writeFile(join(targetDir, path), `personal ${path}\n`),
				]),
			);

			await syncTemplateRelease({
				sourceDir,
				targetDir,
				protectedPaths,
				excludedPaths: [],
			});

			for (const path of paths.slice(0, 3)) {
				expect(await readFile(join(targetDir, path), "utf8")).toBe(
					`personal ${path}\n`,
				);
			}
			expect(
				await readFile(join(targetDir, "src/pages/projects.astro"), "utf8"),
			).toBe("template src/pages/projects.astro\n");
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});

	test("migrates the legacy configuration without changing personal values", async () => {
		const root = await mkdtemp(join(tmpdir(), "scholars-sync-"));
		const sourceDir = join(root, "source");
		const targetDir = join(root, "target");
		const shim = 'export { default } from "../site.config";\n';

		try {
			await Promise.all([
				mkdir(join(sourceDir, "src"), { recursive: true }),
				mkdir(join(targetDir, "src/content"), { recursive: true }),
				mkdir(join(targetDir, "public"), { recursive: true }),
			]);
			await Promise.all([
				writeFile(join(sourceDir, "src/side.config.ts"), shim),
				writeFile(join(sourceDir, "template.txt"), "updated\n"),
				writeFile(
					join(targetDir, "src/side.config.ts"),
					`import type { SiteConfig } from './types/config';

export const siteConfig: SiteConfig = {
	author: "Personal Scholar",
};

export default siteConfig;
`,
				),
				writeFile(join(targetDir, "public/robots.txt"), "legacy\n"),
				writeFile(join(targetDir, "src/content/config.ts"), "legacy\n"),
			]);

			const result = await syncTemplateRelease({
				sourceDir,
				targetDir,
				protectedPaths: ["site.config.ts", "src/side.config.ts"],
				excludedPaths: [],
			});

			expect(result.migratedLegacyConfig).toBe(true);
			const migratedConfig = await readFile(
				join(targetDir, "site.config.ts"),
				"utf8",
			);
			expect(migratedConfig).toContain('author: "Personal Scholar"');
			expect(migratedConfig).toContain("defineSiteConfig({");
			expect(
				await readFile(join(targetDir, "src/side.config.ts"), "utf8"),
			).toBe(shim);
			await expect(stat(join(targetDir, "public/robots.txt"))).rejects.toMatchObject({
				code: "ENOENT",
			});
			await expect(
				stat(join(targetDir, "src/content/config.ts")),
			).rejects.toMatchObject({ code: "ENOENT" });
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});
});
