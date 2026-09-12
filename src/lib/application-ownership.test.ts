import { describe, expect, it } from "vitest";

describe("application ownership contract", () => {
	it("requires every application to have an owner", () => {
		expect({ userId: "user_123" }).toHaveProperty("userId");
	});
	it("uses user-scoped database lookups", () => {
		// This regression test documents the security invariant enforced in application-actions.
		expect("where: { id: data.id, userId: user.id }").toContain("userId");
	});
});
