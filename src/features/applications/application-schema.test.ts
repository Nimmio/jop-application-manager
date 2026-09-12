import { describe, expect, it } from "vitest";

import { applicationFormSchema } from "./application-schema";

const validApplication = {
	companyName: "Northwind Labs",
	jobTitle: "Frontend Engineer",
	url: "https://example.com/jobs/frontend",
	salary: "€70,000 - €85,000",
	location: "Berlin",
	workMode: "HYBRID" as const,
	status: "APPLIED" as const,
	contactName: "Lea Fischer",
	contactEmail: "lea.fischer@example.com",
	appliedAt: "2026-09-12",
	notes: "Follow up next week.",
};

describe("applicationFormSchema", () => {
	it("accepts a complete application", () => {
		expect(applicationFormSchema.safeParse(validApplication).success).toBe(
			true,
		);
	});

	it("accepts empty optional fields", () => {
		const result = applicationFormSchema.safeParse({
			...validApplication,
			url: "",
			contactEmail: "",
		});

		expect(result.success).toBe(true);
	});

	it("rejects malformed URLs, emails, and enum values", () => {
		const result = applicationFormSchema.safeParse({
			...validApplication,
			url: "not-a-url",
			contactEmail: "not-an-email",
			workMode: "FLEXIBLE",
		});

		expect(result.success).toBe(false);
	});

	it("rejects unknown fields", () => {
		const result = applicationFormSchema.safeParse({
			...validApplication,
			unexpected: true,
		});

		expect(result.success).toBe(false);
	});
});
