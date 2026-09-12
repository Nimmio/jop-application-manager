import { z } from "zod";

export const settingsSchema = z
	.object({
		stalledThresholdDays: z
			.number()
			.int("Use a whole number of days")
			.min(1, "Threshold must be at least 1 day")
			.max(365, "Threshold cannot exceed 365 days"),
	})
	.strict();

export type SettingsFormValues = z.infer<typeof settingsSchema>;
