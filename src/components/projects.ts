import projectsRaw from '../data/projects.yml?raw';
import { parse } from 'yaml';

export interface ProjectEntry {
	title: string;
	period: string;
	description: string;
	tech: string[];
	url?: string;
}

export const projects = parse(projectsRaw) as ProjectEntry[];
