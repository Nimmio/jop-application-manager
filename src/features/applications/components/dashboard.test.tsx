import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Dashboard } from "./dashboard";

const applications = [
	{
		id: "cmj5w5j4u0000qz1n8h0z8j7a",
		userId: "test-user",
		companyName: "Northwind Labs",
		jobTitle: "Frontend Engineer",
		url: null,
		salary: "€70,000",
		location: "Berlin",
		workMode: "HYBRID" as const,
		status: "INTERVIEWING" as const,
		contactName: null,
		contactEmail: null,
		appliedAt: new Date("2026-09-01T00:00:00Z"),
		updatedAt: new Date("2026-09-01T00:00:00Z"),
		notes: null,
	},
	{
		id: "cmj5w5j4u0001qz1n8h0z8j7b",
		userId: "test-user",
		companyName: "Acme Digital",
		jobTitle: "Product Designer",
		url: null,
		salary: null,
		location: "Munich",
		workMode: "REMOTE" as const,
		status: "APPLIED" as const,
		contactName: null,
		contactEmail: null,
		appliedAt: new Date("2026-09-10T00:00:00Z"),
		updatedAt: new Date("2026-09-10T00:00:00Z"),
		notes: null,
	},
	{
		id: "cmj5w5j4u0002qz1n8h0z8j7c",
		userId: "test-user",
		companyName: "Cloud Harbor",
		jobTitle: "Backend Engineer",
		url: null,
		salary: null,
		location: "Remote",
		workMode: "REMOTE" as const,
		status: "REJECTED" as const,
		contactName: null,
		contactEmail: null,
		appliedAt: new Date("2026-09-08T00:00:00Z"),
		updatedAt: new Date("2026-09-08T00:00:00Z"),
		notes: null,
	},
];

describe("Dashboard", () => {
	afterEach(() => {
		cleanup();
		vi.useRealTimers();
	});

	it("renders KPI cards and marks only eligible old applications as stalled", () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-09-20T00:00:00Z"));

		render(
			<Dashboard
				applications={applications}
				settings={{ stalledThresholdDays: 14 }}
			/>,
		);

		expect(screen.getByText("Total")).not.toBeNull();
		expect(screen.getByText("3")).not.toBeNull();
		expect(screen.getByLabelText("Stalled application")).not.toBeNull();
		expect(screen.getAllByText("Stalled").length).toBeGreaterThan(0);
	});

	it("filters applications by search text", () => {
		render(
			<Dashboard
				applications={applications}
				settings={{ stalledThresholdDays: 14 }}
			/>,
		);

		fireEvent.change(
			screen.getByRole("textbox", { name: "Search applications" }),
			{
				target: { value: "Acme" },
			},
		);

		expect(screen.getByText("Acme Digital")).not.toBeNull();
		expect(screen.queryByText("Northwind Labs")).toBeNull();
		expect(screen.queryByText("Cloud Harbor")).toBeNull();
	});
});
