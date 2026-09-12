import { expect, test } from "@playwright/test";

test("submits a new application and returns to the dashboard", async ({ page }) => {
	await page.goto("/applications/new");
	await expect(page.locator("form")).toHaveAttribute("data-hydrated", "true");

	await page.getByLabel("Company name").fill("Northwind Labs");
	await page.getByLabel("Job title").fill("Frontend Engineer");
	await page.getByLabel("Job posting URL").fill("https://example.com/jobs/frontend");
	await page.getByLabel("Salary or range").fill("€70,000 - €85,000");
	await page.getByLabel("Location").fill("Berlin");
	await page.getByLabel("Applied on").fill("2026-09-12");
	await page.getByLabel("Contact name").fill("Lea Fischer");
	await page.getByLabel("Contact email").fill("lea.fischer@example.com");
	await page.getByLabel("Notes").fill("Follow up next week.");

	await page.getByRole("button", { name: "Save application" }).click();

	await expect(page).toHaveURL(/\/$/);

	await page.goto("/settings");
	await expect(page.locator("form")).toHaveAttribute("data-hydrated", "true");
	const thresholdInput = page.getByLabel("Days before an application is stalled");
	await expect(thresholdInput).toHaveValue(/\d+/);
	await thresholdInput.fill("21");
	await page.getByRole("button", { name: "Save settings" }).click();
	await expect(page.getByText("Settings saved.")).toBeVisible();
	await page.reload();
	await expect(page.locator("form")).toHaveAttribute("data-hydrated", "true");
	await expect(page.getByLabel("Days before an application is stalled")).toHaveValue("21");

	await page.goto("/");
	await expect(page.getByRole("heading", { name: "Keep every opportunity in view." })).toBeVisible();
});
