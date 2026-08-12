import { describe, expect, test } from "vitest";
import { aboutDataSchema } from "../src/lib/about";
import { normalizeProject, projectsSchema } from "../src/lib/projects";
import {
	normalizeTeachingModule,
	teachingDataSchema,
} from "../src/lib/teaching";

describe("content normalization", () => {
	test("turns a project url into a default link", () => {
		const project = normalizeProject({
			title: "Portal",
			description: "A project",
			tech: ["Astro"],
			url: "https://example.com",
		});

		expect(project.links).toEqual([
			{ label: "View Project", href: "https://example.com" },
		]);
	});

	test("keeps explicit project links ahead of url fallback", () => {
		const project = normalizeProject({
			title: "Portal",
			description: "A project",
			tech: [],
			url: "https://fallback.example.com",
			links: [{ label: "Demo", href: "https://demo.example.com" }],
		});

		expect(project.links).toEqual([
			{ label: "Demo", href: "https://demo.example.com" },
		]);
	});

	test("normalizes optional project arrays", () => {
		const project = normalizeProject({
			title: "Portal",
			description: "A project",
			tech: [],
			badges: ["featured"],
			highlights: ["Ships reusable academic components"],
			metadata: [{ label: "Role", value: "Maintainer" }],
		});

		expect(project.badges).toEqual(["featured"]);
		expect(project.highlights).toEqual(["Ships reusable academic components"]);
		expect(project.metadata).toEqual([{ label: "Role", value: "Maintainer" }]);
	});

	test("turns a teaching link into normalized links", () => {
		const module = normalizeTeachingModule({
			title: "Studio",
			link: { label: "Syllabus", href: "https://example.edu" },
		});

		expect(module.links).toEqual([
			{ label: "Syllabus", href: "https://example.edu" },
		]);
	});

	test("keeps explicit teaching links ahead of single link fallback", () => {
		const module = normalizeTeachingModule({
			title: "Studio",
			link: { label: "Syllabus", href: "https://example.edu" },
			links: [{ label: "Archive", href: "https://archive.example.edu" }],
		});

		expect(module.links).toEqual([
			{ label: "Archive", href: "https://archive.example.edu" },
		]);
	});

	test("rejects malformed YAML records before rendering", () => {
		expect(
			aboutDataSchema.safeParse({
				profile: [{ label: "Role", value: 42 }],
			}).success,
		).toBe(false);
		expect(
			projectsSchema.safeParse([
				{ title: "Broken project", description: "Missing technology list" },
			]).success,
		).toBe(false);
		expect(
			teachingDataSchema.safeParse({
				current: [{ modules: [{ tags: "not-an-array" }] }],
			}).success,
		).toBe(false);
	});
});
