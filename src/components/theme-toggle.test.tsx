import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "#/components/theme-provider";
import { ThemeToggle } from "#/components/theme-toggle";

describe("ThemeToggle", () => {
	it("switches between light and dark themes", async () => {
		const { getByRole } = render(
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem={false}
			>
				<ThemeToggle />
			</ThemeProvider>,
		);

		const toggle = await waitFor(() => {
			const button = getByRole("button", { name: "Switch to dark mode" });
			expect(button.hasAttribute("disabled")).toBe(false);
			return button;
		});

		fireEvent.click(toggle);

		await waitFor(() => {
			expect(document.documentElement.classList.contains("dark")).toBe(true);
			expect(
				getByRole("button", { name: "Switch to light mode" }).hasAttribute(
					"disabled",
				),
			).toBe(false);
		});
	});
});
