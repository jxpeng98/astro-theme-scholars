export interface BibEntry {
	id: string;
	type: string;
	title: string;
	authors: string[];
	year?: number;
	venue?: string;
	url?: string;
	abstract?: string;
	category: string;
	keywords: string[];
}

export function parseBibtex(raw: string): BibEntry[] {
	const entries: BibEntry[] = [];
	const entryRegex = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)\}\s*(?=@|$)/g;
	let match: RegExpExecArray | null;

	while ((match = entryRegex.exec(raw)) !== null) {
		const [, type, id, body] = match;
		const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
		const fields: Record<string, string> = {};
		let fieldMatch: RegExpExecArray | null;

		while ((fieldMatch = fieldRegex.exec(body)) !== null) {
			const [, key, value] = fieldMatch;
			fields[key.toLowerCase()] = value.trim();
		}

		if (!fields.title) continue;

		const authors = fields.author
			? fields.author
					.split(/\s+and\s+/i)
					.map((name) => name.trim())
					.filter(Boolean)
			: [];

		const publicField = fields.public?.toLowerCase();
		let category = 'Other';

		if (publicField === 'yes' || publicField === 'pub') {
			category = 'Publication';
		} else if (publicField === 'wp') {
			category = 'Working Paper';
		} else if (publicField === 'wip' || !publicField) {
			category = 'Work in Progress';
		}

		const entry: BibEntry = {
			id,
			type,
			title: fields.title,
			authors,
			year: fields.year ? Number.parseInt(fields.year, 10) : undefined,
			venue: fields.journal ?? fields.booktitle,
			url: fields.url,
			abstract: fields.abstract,
			category,
			keywords: fields.keywords
				? fields.keywords
						.split(',')
						.map((keyword) => keyword.trim())
						.filter(Boolean)
				: []
		};

		entries.push(entry);
	}

	return entries.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}
