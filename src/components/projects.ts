import projectsRaw from '../data/projects.yml?raw';
import { parse } from 'yaml';
import { normalizeProject, projectsSchema } from '../lib/projects';

export const projects = projectsSchema
	.parse(parse(projectsRaw) ?? [])
	.map(normalizeProject);
