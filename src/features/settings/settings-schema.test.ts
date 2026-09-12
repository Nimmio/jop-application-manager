import { describe, expect, it } from "vitest";

import { settingsSchema } from "./settings-schema";

describe("settingsSchema", () => {
	it("accepts a valid stalled threshold", () => {
		expect(settingsSchema.safeParse({ stalledThresholdDays: 14 }).success).toBe(
			true,
		);
	});

	it("rejects thresholds outside the supported range or with unknown fields", () => {
		expect(settingsSchema.safeParse({ stalledThresholdDays: 0 }).success).toBe(
			false,
		);
		expect(
			settingsSchema.safeParse({ stalledThresholdDays: 366 }).success,
		).toBe(false);
		expect(
			settingsSchema.safeParse({ stalledThresholdDays: 14, unexpected: true })
				.success,
		).toBe(false);
	});
});
