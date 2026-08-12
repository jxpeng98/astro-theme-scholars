import { describe, expect, test } from "vitest";
import { parseBibtex } from "../src/lib/bibtex";
import { getFeaturedPapers } from "../src/lib/papers";

describe("parseBibtex", () => {
	test("parses nested braces in titles and abstracts", () => {
		const entries = parseBibtex(`
      @article{smith2025nested,
        title = {Keeping {AI} and {HCI} Capitalized},
        author = {Smith, Ada and Lee, Bo},
        journal = {Journal of Tests},
        year = {2025},
        abstract = {A study with {nested {brace}} content.},
        public = {yes}
      }
    `);

		expect(entries[0].title).toBe("Keeping AI and HCI Capitalized");
		expect(entries[0].abstract).toBe("A study with nested brace content.");
		expect(entries[0].authors).toEqual(["Ada Smith", "Bo Lee"]);
		expect(entries[0].category).toBe("Publication");
	});

	test("parses quoted values and working paper category", () => {
		const entries = parseBibtex(`
      @misc{doe2024quoted,
        title = "Quoted Field Paper",
        author = "Doe, Jane and Public, John Q.",
        year = "2024",
        public = "wp",
        url = "https://example.com/paper"
      }
    `);

		expect(entries[0].title).toBe("Quoted Field Paper");
		expect(entries[0].authors).toEqual(["Jane Doe", "John Q. Public"]);
		expect(entries[0].category).toBe("Working Paper");
		expect(entries[0].url).toBe("https://example.com/paper");
	});

	test("sorts entries by year descending", () => {
		const entries = parseBibtex(`
      @misc{old, title = {Old}, year = {2020}}
      @misc{new, title = {New}, year = {2026}}
    `);

		expect(entries.map((entry) => entry.id)).toEqual(["new", "old"]);
	});

	test("treats an omitted public field as other", () => {
		const [entry] = parseBibtex(`
      @misc{uncategorized, title = {Uncategorized}}
    `);

		expect(entry.category).toBe("Other");
	});

	test("selects only publications for the home page", () => {
		const entries = parseBibtex(`
      @misc{working, title = {Working}, year = {2026}, public = {wp}}
      @misc{published, title = {Published}, year = {2025}, public = {yes}}
      @misc{other, title = {Other}, year = {2024}}
    `);

		expect(getFeaturedPapers(3, entries).map((entry) => entry.id)).toEqual([
			"published",
		]);
	});
});
