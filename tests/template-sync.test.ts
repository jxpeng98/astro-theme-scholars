import {
	mkdtemp,
	mkdir,
	readFile,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
			"public/profile.*",
		];

		expect(isProtectedPath("src/data/about.yml", patterns)).toBe(true);
		expect(isProtectedPath("src/data/nested/file.yml", patterns)).toBe(true);
		expect(isProtectedPath("site.config.ts", patterns)).toBe(true);
		expect(isProtectedPath("public/profile.svg", patterns)).toBe(true);
	});

	test("allows template-owned source paths", () => {
		const patterns = [
			"site.config.ts",
			"src/data/**",
			"public/profile.*",
		];

		expect(isProtectedPath("src/side.config.ts", patterns)).toBe(false);
		expect(isProtectedPath("src/pages/projects.astro", patterns)).toBe(false);
		expect(isProtectedPath("src/lib/projects.ts", patterns)).toBe(false);
		expect(isProtectedPath("public/robots.txt", patterns)).toBe(false);
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
