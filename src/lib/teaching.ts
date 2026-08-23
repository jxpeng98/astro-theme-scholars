interface TeachingOffering {
	data: {
		code: string;
		term: string;
	};
}

export function groupTeachingLedger<T extends TeachingOffering>(offerings: T[]) {
	const families = new Map<string, { course: T; terms: string[] }>();

	for (const course of offerings) {
		const family = families.get(course.data.code);
		if (family) family.terms.push(course.data.term);
		else families.set(course.data.code, { course, terms: [course.data.term] });
	}

	return [...families.values()];
}
