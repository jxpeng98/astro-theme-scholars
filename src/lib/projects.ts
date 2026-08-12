import {
	contentLinkSchema,
	contentMetadataSchema,
	contentTextSchema,
	normalizeLinks,
	normalizeMetadata,
	normalizeStringArray,
	type ContentLink,
	type ContentMetadata,
} from "./content";
import { z } from "astro/zod";

const projectStatusSchema = z.enum(["active", "past", "unspecified"]);

export const projectEntrySchema = z
	.object({
		title: contentTextSchema,
		subtitle: contentTextSchema.optional(),
		period: contentTextSchema.optional(),
		description: contentTextSchema,
		tech: z.array(contentTextSchema),
		url: contentTextSchema.optional(),
		links: z.array(contentLinkSchema).optional(),
		badges: z.array(contentTextSchema).optional(),
		highlights: z.array(contentTextSchema).optional(),
		metadata: z.array(contentMetadataSchema).optional(),
		featured: z.boolean().optional(),
		status: projectStatusSchema.optional(),
	})
	.strict();

export const projectsSchema = z.array(projectEntrySchema);

export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type ProjectEntry = z.infer<typeof projectEntrySchema>;

export interface NormalizedProjectEntry extends ProjectEntry {
	tech: string[];
	links: ContentLink[];
	badges: string[];
	highlights: string[];
	metadata: ContentMetadata[];
}

export function getProjectStatus(project: ProjectEntry): ProjectStatus {
	if (project.status) return project.status;
	if (!project.period) return "unspecified";
	return /\bpresent\b/i.test(project.period) ? "active" : "past";
}

export function normalizeProject(project: ProjectEntry): NormalizedProjectEntry {
	return {
		...project,
		tech: normalizeStringArray(project.tech),
		links: normalizeLinks(
			project.links,
			project.url ? { label: "View Project", href: project.url } : undefined,
		),
		badges: normalizeStringArray(project.badges),
		highlights: normalizeStringArray(project.highlights),
		metadata: normalizeMetadata(project.metadata),
	};
}
