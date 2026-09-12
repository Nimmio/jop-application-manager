import { createServerFn } from "@tanstack/react-start";

import { prisma } from "#/lib/prisma";
import {
	type ApplicationFormValues,
	applicationFormSchema,
	applicationIdSchema,
} from "./application-schema";

const toDatabaseData = (data: ApplicationFormValues) => ({
	companyName: data.companyName,
	jobTitle: data.jobTitle,
	url: data.url || undefined,
	salary: data.salary || undefined,
	location: data.location || undefined,
	workMode: data.workMode,
	status: data.status,
	contactName: data.contactName || undefined,
	contactEmail: data.contactEmail || undefined,
	appliedAt: new Date(`${data.appliedAt}T00:00:00.000Z`),
	notes: data.notes || undefined,
});

export const createApplication = createServerFn({ method: "POST" })
	.validator(applicationFormSchema)
	.handler(async ({ data }) => {
		return prisma.application.create({ data: toDatabaseData(data) });
	});

export const updateApplication = createServerFn({ method: "POST" })
	.validator(
		applicationIdSchema.extend({
			data: applicationFormSchema,
		}),
	)
	.handler(async ({ data }) => {
		return prisma.application.update({
			where: { id: data.id },
			data: toDatabaseData(data.data),
		});
	});

export const getApplication = createServerFn({ method: "GET" })
	.validator(applicationIdSchema)
	.handler(async ({ data }) => {
		return prisma.application.findUniqueOrThrow({ where: { id: data.id } });
	});

export const getApplications = createServerFn({ method: "GET" }).handler(async () => {
		return prisma.application.findMany({ orderBy: { updatedAt: "desc" } });
	});

export const getGlobalSettings = createServerFn({ method: "GET" }).handler(async () => {
		return prisma.globalSettings.findFirst({
			orderBy: { id: "asc" },
			select: { stalledThresholdDays: true },
		});
	});
