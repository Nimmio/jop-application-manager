import { afterEach, describe, expect, it, vi } from "vitest";
import { isApplicationStalled } from "./application";

describe("isApplicationStalled", () => {
	const now = new Date("2026-09-12T12:00:00.000Z");

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns true when an application reaches the threshold", () => {
		vi.useFakeTimers();
		vi.setSystemTime(now);

		const updatedAt = new Date("2026-08-29T12:00:00.000Z");

		expect(isApplicationStalled(updatedAt, 14)).toBe(true);
	});

	it("returns false when an application is newer than the threshold", () => {
		vi.useFakeTimers();
		vi.setSystemTime(now);

		const updatedAt = new Date("2026-09-01T12:00:00.000Z");

		expect(isApplicationStalled(updatedAt, 14)).toBe(false);
	});
});
