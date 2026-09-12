"use client";

import type { Application, GlobalSettings } from "@prisma/client";

import { isApplicationStalled } from "#/lib/application";
import { ApplicationTable } from "./application-table";
import { DashboardStats } from "./dashboard-stats";

type DashboardProps = {
	applications: Application[];
	settings: Pick<GlobalSettings, "stalledThresholdDays">;
};

export function Dashboard({ applications, settings }: DashboardProps) {
	const thresholdDays = settings.stalledThresholdDays;
	const stalledCount = applications.filter(
		(application) =>
			!["REJECTED", "OFFERED"].includes(application.status) &&
			isApplicationStalled(application.updatedAt, thresholdDays),
	).length;

	return (
		<div className="page-wrap py-10 md:py-14">
			<DashboardStats applications={applications} stalledCount={stalledCount} />
			<ApplicationTable
				applications={applications}
				stalledThresholdDays={thresholdDays}
			/>
		</div>
	);
}
