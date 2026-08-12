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

function stripOuterBraces(value: string): string {
	return value.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}

function formatAuthor(name: string): string {
	const trimmed = name.replace(/\s+/g, ' ').trim();
	if (!trimmed.includes(',')) return trimmed;

	const [family, ...givenParts] = trimmed.split(',').map((part) => part.trim());
	const given = givenParts.join(' ');
	return [given, family].filter(Boolean).join(' ');
}

function splitAuthors(value: string): string[] {
	return value
		.split(/\s+and\s+/i)
		.map(formatAuthor)
		.filter(Boolean);
}

function parseFields(body: string): Record<string, string> {
	const fields: Record<string, string> = {};
	let index = 0;

	while (index < body.length) {
		const keyMatch = body.slice(index).match(/\s*([A-Za-z][\w-]*)\s*=\s*/);
		if (!keyMatch) break;

		const key = keyMatch[1].toLowerCase();
		index += keyMatch.index ?? 0;
		index += keyMatch[0].length;

		const opener = body[index];
		let value = '';

		if (opener === '{') {
			let depth = 0;
			const start = index + 1;
			for (; index < body.length; index++) {
				const char = body[index];
				if (char === '{') depth += 1;
				if (char === '}') depth -= 1;
				if (depth === 0) {
					value = body.slice(start, index);
					index += 1;
					break;
				}
			}
		} else if (opener === '"') {
			const start = index + 1;
			index += 1;
			for (; index < body.length; index++) {
				if (body[index] === '"' && body[index - 1] !== '\\') {
					value = body.slice(start, index);
					index += 1;
					break;
				}
			}
		} else {
			const end = body.indexOf(',', index);
			value = body.slice(index, end === -1 ? body.length : end);
			index = end === -1 ? body.length : end + 1;
		}

		fields[key] = stripOuterBraces(value);
		while (body[index] === ',' || /\s/.test(body[index] ?? '')) index += 1;
	}

	return fields;
}

export function parseBibtex(raw: string): BibEntry[] {
	const entries: BibEntry[] = [];
	const entryRegex = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)\}\s*(?=@|$)/g;
	let match: RegExpExecArray | null;

	while ((match = entryRegex.exec(raw)) !== null) {
		const [, type, id, body] = match;
		const fields = parseFields(body);

		if (!fields.title) continue;

		const authors = fields.author ? splitAuthors(fields.author) : [];

		const publicField = fields.public?.toLowerCase();
		let category = 'Other';

		if (publicField === 'yes' || publicField === 'pub') {
			category = 'Publication';
		} else if (publicField === 'wp') {
			category = 'Working Paper';
		} else if (publicField === 'wip') {
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
