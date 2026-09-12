import { createServerFn } from "@tanstack/react-start";

import { prisma } from "#/lib/prisma";
import { settingsSchema } from "./settings-schema";

export const updateGlobalSettings = createServerFn({ method: "POST" })
	.validator(settingsSchema)
	.handler(async ({ data }) => {
		const existingSettings = await prisma.globalSettings.findFirst({
			orderBy: { id: "asc" },
			select: { id: true },
		});

		if (existingSettings) {
			return prisma.globalSettings.update({
				where: { id: existingSettings.id },
				data,
			});
		}

		return prisma.globalSettings.create({ data });
	});
