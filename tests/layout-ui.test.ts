import { describe, expect, it } from "vitest";
import {
	getBackToTopScrollBehavior,
	updateBackToTopVisibility,
	updateThemeToggleLabels,
} from "../src/scripts/layout-ui";

describe("layout UI helpers", () => {
	it("uses instant scroll when reduced motion is requested", () => {
		expect(getBackToTopScrollBehavior(true)).toBe("auto");
	});

	it("uses smooth scroll when reduced motion is not requested", () => {
		expect(getBackToTopScrollBehavior(false)).toBe("smooth");
	});

	it("keeps the hidden back-to-top action out of the tab order", () => {
		const attributes = new Map<string, string>();
		const button = {
			tabIndex: 0,
			setAttribute: (name: string, value: string) => attributes.set(name, value),
		} as unknown as HTMLElement;

		updateBackToTopVisibility(button, false);

		expect(button.tabIndex).toBe(-1);
		expect(attributes.get("data-visible")).toBe("false");
	});

	it("uses an action label without toggle-button state", () => {
		const attributes = new Map<string, string>();
		const visibleLabel = { textContent: "Dark mode" };
		const button = {
			setAttribute: (name: string, value: string) => attributes.set(name, value),
			querySelectorAll: () => [visibleLabel],
		};
		const root = {
			querySelectorAll: () => [button],
		} as unknown as ParentNode;

		updateThemeToggleLabels(root, "dark");

		expect(Object.fromEntries(attributes)).toEqual({
			"aria-label": "Switch to light mode",
			title: "Switch to light mode",
		});
		expect(visibleLabel.textContent).toBe("Light mode");
	});
});
