"use client";

import type { Application, GlobalSettings } from "@prisma/client";
import { Plus, Sparkles } from "lucide-react";

import { Button } from "#/components/ui/button";
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
			<section className="island-shell relative overflow-hidden rounded-3xl p-6 md:p-10">
				<div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-end">
					<div className="max-w-2xl">
						<p className="island-kicker flex items-center gap-2">
							<Sparkles className="size-3.5" /> A clearer way forward
						</p>
						<h1 className="display-title mt-3 text-5xl font-bold leading-[0.98] tracking-tight text-[var(--sea-ink)] md:text-7xl">
							Keep every opportunity in view.
						</h1>
						<p className="mt-5 max-w-xl text-base leading-7 text-[var(--sea-ink-soft)]">
							A quiet command center for your job search. See what is moving,
							what needs a nudge, and where your next conversation could lead.
						</p>
					</div>
					<Button asChild className="self-start md:self-auto" size="lg">
						<a href="/applications/new">
							<Plus className="size-4" /> Add application
						</a>
					</Button>
				</div>
			</section>
			<DashboardStats applications={applications} stalledCount={stalledCount} />
			<ApplicationTable
				applications={applications}
				stalledThresholdDays={thresholdDays}
			/>
		</div>
	);
}
