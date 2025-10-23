import publicationsRaw from '../data/publications.bib?raw';
import { parseBibtex, type BibEntry } from './bibtex';

const papersCache: BibEntry[] = parseBibtex(publicationsRaw);

export function getAllPapers(): BibEntry[] {
	return papersCache;
}

export function getFeaturedPapers(limit = 3): BibEntry[] {
	return papersCache.slice(0, limit);
}
