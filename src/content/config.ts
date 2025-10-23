import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			publishedAt: z.date(),
			updatedAt: z.date().optional(),
			tags: z.array(z.string()).optional(),
			heroImage: image().optional(),
			draft: z.boolean().default(false)
		})
});

export const collections = { posts };
