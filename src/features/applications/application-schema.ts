import { z } from "zod";

export const workModeSchema = z.enum(["REMOTE", "HYBRID", "ON_SITE"]);
export const applicationStatusSchema = z.enum([
	"APPLIED",
	"INTERVIEWING",
	"OFFERED",
	"REJECTED",
	"STALLED",
]);

const optionalText = (max: number) =>
	z.string().trim().max(max).or(z.literal(""));

const optionalEmail = z.email("Enter a valid email address").or(z.literal(""));

const optionalUrl = z.url("Enter a valid URL").or(z.literal(""));

export const applicationFormSchema = z
	.object({
		companyName: z.string().trim().min(1, "Company name is required").max(120),
		jobTitle: z.string().trim().min(1, "Job title is required").max(120),
		url: optionalUrl.optional(),
		salary: optionalText(80).optional(),
		location: optionalText(120).optional(),
		workMode: workModeSchema,
		status: applicationStatusSchema,
		contactName: optionalText(120).optional(),
		contactEmail: optionalEmail.optional(),
		appliedAt: z
			.string()
			.regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid application date"),
		notes: optionalText(5000).optional(),
	})
	.strict();

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
export type WorkMode = z.infer<typeof workModeSchema>;
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;

export const applicationIdSchema = z.object({ id: z.string().cuid() }).strict();
