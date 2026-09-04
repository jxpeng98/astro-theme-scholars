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

export const citationStyleLabels = {
	bibtex: 'BibTeX',
	apa: 'APA 7',
	chicago: 'Chicago',
	harvard: 'Harvard'
} as const;

export type CitationStyle = keyof typeof citationStyleLabels;

function nameParts(name: string): { given: string; family: string } {
	// ponytail: BibEntry stores display names; use CSL name parts if particles or suffixes matter.
	const parts = name.trim().split(/\s+/);
	return {
		given: parts.slice(0, -1).join(' '),
		family: parts.at(-1) ?? ''
	};
}

function initials(name: string): string {
	return name
		.split(/\s+/)
		.filter(Boolean)
		.map((part) =>
			part
				.split('-')
				.map((piece) => `${piece.charAt(0).toUpperCase()}.`)
				.join('-')
		)
		.join(' ');
}

function joinAuthors(authors: string[], conjunction: string, serialComma: boolean): string {
	if (authors.length < 2) return authors[0] ?? '';
	if (authors.length === 2) {
		return `${authors[0]}${serialComma ? ',' : ''} ${conjunction} ${authors[1]}`;
	}
	return `${authors.slice(0, -1).join(', ')}${serialComma ? ',' : ''} ${conjunction} ${authors.at(-1)}`;
}

function sentence(value?: string): string {
	const trimmed = value?.trim();
	if (!trimmed) return '';
	return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function toBibtex(paper: BibEntry): string {
	const type = paper.type?.toLowerCase() || 'article';
	const fields = [
		`@${type}{${paper.id},`,
		`  title = {${paper.title}},`,
		`  author = {${paper.authors.join(' and ')}},`
	];

	if (paper.venue) {
		fields.push(
			type === 'inproceedings'
				? `  booktitle = {${paper.venue}},`
				: `  journal = {${paper.venue}},`
		);
	}
	if (paper.year) fields.push(`  year = {${paper.year}},`);
	if (paper.url) fields.push(`  url = {${paper.url}},`);
	fields.push('}');

	return fields.join('\n');
}

export function formatCitations(paper: BibEntry): Record<CitationStyle, string> {
	const apaAuthors = joinAuthors(
		paper.authors.map((author) => {
			const { given, family } = nameParts(author);
			return [family, initials(given)].filter(Boolean).join(', ');
		}),
		'&',
		true,
	);
	const chicagoAuthors = joinAuthors(
		paper.authors.map((author, index) => {
			const { given, family } = nameParts(author);
			return index === 0 ? [family, given].filter(Boolean).join(', ') : author;
		}),
		'and',
		true,
	);
	const harvardAuthors = joinAuthors(
		paper.authors.map((author) => {
			const { given, family } = nameParts(author);
			return [family, initials(given)].filter(Boolean).join(', ');
		}),
		'and',
		false,
	);
	const year = paper.year ? String(paper.year) : 'n.d.';
	const url = paper.url?.trim();

	return {
		bibtex: toBibtex(paper),
		apa: [sentence(apaAuthors), `(${year}).`, sentence(paper.title), sentence(paper.venue), url]
			.filter(Boolean)
			.join(' '),
		chicago: [
			sentence(chicagoAuthors),
			`“${paper.title.replace(/[.!?]+$/, '')}.”`,
			sentence([paper.venue, paper.year ? `(${paper.year})` : ''].filter(Boolean).join(' ')),
			url
		]
			.filter(Boolean)
			.join(' '),
		harvard: [
			`${harvardAuthors ? `${harvardAuthors} ` : ''}(${year})`,
			`‘${paper.title.replace(/[.!?]+$/, '')}’,`,
			sentence(paper.venue),
			url ? `Available at: ${url}.` : ''
		]
			.filter(Boolean)
			.join(' ')
	};
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
