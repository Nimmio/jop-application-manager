import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/lib/auth";
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

async function currentUser() {
	const session = await auth.api.getSession({ headers: getRequestHeaders() });
	if (!session?.user) throw new Error("Authentication required");
	return session.user;
}

export const createApplication = createServerFn({ method: "POST" })
	.validator(applicationFormSchema)
	.handler(async ({ data }) => {
		const user = await currentUser();
		return prisma.application.create({
			data: { ...toDatabaseData(data), userId: user.id },
		});
	});

export const updateApplication = createServerFn({ method: "POST" })
	.validator(
		applicationIdSchema.extend({
			data: applicationFormSchema,
		}),
	)
	.handler(async ({ data }) => {
		const user = await currentUser();
		return prisma.application.update({
			where: { id: data.id, userId: user.id },
			data: toDatabaseData(data.data),
		});
	});

export const getApplication = createServerFn({ method: "GET" })
	.validator(applicationIdSchema)
	.handler(async ({ data }) => {
		const user = await currentUser();
		return prisma.application.findFirstOrThrow({
			where: { id: data.id, userId: user.id },
		});
	});

export const getApplications = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = await currentUser();
		return prisma.application.findMany({
			where: { userId: user.id },
			orderBy: { updatedAt: "desc" },
		});
	},
);

export const getGlobalSettings = createServerFn({ method: "GET" }).handler(
	async () => {
		return prisma.globalSettings.findFirst({
			orderBy: { id: "asc" },
			select: { stalledThresholdDays: true },
		});
	},
);
