import { describe, expect, test } from "vitest";
import { aboutDataSchema } from "../src/lib/about";

describe("content normalization", () => {
	test("rejects malformed about records before rendering", () => {
		expect(
			aboutDataSchema.safeParse({
				profile: [{ label: "Role", value: 42 }],
			}).success,
		).toBe(false);
	});
});
