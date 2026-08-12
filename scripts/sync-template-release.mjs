#!/usr/bin/env node
import {
	copyFile,
	mkdir,
	readdir,
	readFile,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

function toPosixPath(path) {
	return path.split(sep).join("/");
}

function globToRegExp(pattern) {
	const normalized = toPosixPath(pattern);
	let source = "";

	for (let index = 0; index < normalized.length; index += 1) {
		const char = normalized[index];
		const next = normalized[index + 1];

		if (char === "*" && next === "*") {
			source += ".*";
			index += 1;
			continue;
		}

		if (char === "*") {
			source += "[^/]*";
			continue;
		}

		source += char.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
	}

	return new RegExp(`^${source}$`);
}

function matchesPattern(path, pattern) {
	const normalizedPath = toPosixPath(path);

	if (pattern.endsWith("/**")) {
		const prefix = toPosixPath(pattern.slice(0, -3));
		return normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`);
	}

	return globToRegExp(pattern).test(normalizedPath);
}

export function isProtectedPath(path, patterns) {
	return patterns.some((pattern) => matchesPattern(path, pattern));
}

async function listFiles(root, current = root) {
	const entries = await readdir(current, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const absolute = join(current, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await listFiles(root, absolute)));
		} else if (entry.isFile()) {
			files.push(toPosixPath(relative(root, absolute)));
		}
	}

	return files;
}

async function migrateLegacySiteConfig(sourceDir, targetDir) {
	const rootConfig = join(targetDir, "site.config.ts");
	const legacyConfig = join(targetDir, "src/side.config.ts");

	try {
		await stat(rootConfig);
		return false;
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}

	let legacySource;
	try {
		legacySource = await readFile(legacyConfig, "utf8");
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}

	const importPattern =
		/import\s+type\s+\{\s*SiteConfig\s*\}\s+from\s+["']\.\/types\/config["'];?/;
	const declarationPattern =
		/export\s+const\s+siteConfig\s*:\s*SiteConfig\s*=\s*\{/;
	const closingPattern = /\n};(\s*\n\s*export default siteConfig;?\s*)$/;

	if (
		!importPattern.test(legacySource) ||
		!declarationPattern.test(legacySource) ||
		!closingPattern.test(legacySource)
	) {
		throw new Error(
			"Legacy src/side.config.ts uses an unsupported shape; migrate it to site.config.ts manually before syncing.",
		);
	}

	const migratedSource = legacySource
		.replace(importPattern, 'import { defineSiteConfig } from "./src/config/site";')
		.replace(
			declarationPattern,
			"export const siteConfig = defineSiteConfig({",
		)
		.replace(closingPattern, "\n});$1");

	await writeFile(rootConfig, migratedSource);
	await copyFile(
		join(sourceDir, "src/side.config.ts"),
		join(targetDir, "src/side.config.ts"),
	);
	await Promise.all(
		["public/robots.txt", "src/content/config.ts"].map((path) =>
			rm(join(targetDir, path), { force: true }),
		),
	);

	return true;
}

export async function syncTemplateRelease({
	sourceDir,
	targetDir,
	protectedPaths,
	excludedPaths,
}) {
	const migratedLegacyConfig = await migrateLegacySiteConfig(
		sourceDir,
		targetDir,
	);
	const sourceFiles = await listFiles(sourceDir);
	let copied = 0;
	let skipped = 0;

	for (const file of sourceFiles) {
		if (isProtectedPath(file, protectedPaths) || isProtectedPath(file, excludedPaths)) {
			skipped += 1;
			continue;
		}

		const source = join(sourceDir, file);
		const target = join(targetDir, file);
		const sourceStat = await stat(source);

		if (!sourceStat.isFile()) {
			skipped += 1;
			continue;
		}

		await mkdir(dirname(target), { recursive: true });
		await copyFile(source, target);
		copied += 1;
	}

	return { copied, skipped, migratedLegacyConfig };
}

function readArg(name) {
	const index = process.argv.indexOf(name);
	if (index < 0) return null;
	return process.argv[index + 1] ?? null;
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
	const sourceDir = readArg("--source");
	const targetDir = readArg("--target") ?? process.cwd();
	const configPath = readArg("--config") ?? ".template-sync.json";

	if (!sourceDir) {
		console.error("Missing --source path.");
		process.exit(1);
	}

	const config = JSON.parse(await readFile(configPath, "utf8"));
	const result = await syncTemplateRelease({
		sourceDir,
		targetDir,
		protectedPaths: config.protected ?? [],
		excludedPaths: config.exclude ?? [],
	});

	console.log(
		`Template sync copied ${result.copied} file(s), skipped ${result.skipped} file(s)${result.migratedLegacyConfig ? ", and migrated the legacy site configuration" : ""}.`,
	);
}
