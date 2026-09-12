import type { Application } from "@prisma/client";
import { ArrowDown, ArrowUp, ArrowUpDown, ExternalLink } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { isApplicationStalled } from "#/lib/application";
import type { ApplicationStatus, WorkMode } from "../application-schema";
import {
	ApplicationFilters,
	type ApplicationFiltersValue,
} from "./application-filters";
import { StalledBadge } from "./stalled-badge";

export type DashboardApplication = Application;

type ApplicationTableProps = {
	applications: DashboardApplication[];
	stalledThresholdDays: number;
};

type SortKey =
	| "companyName"
	| "status"
	| "workMode"
	| "appliedAt"
	| "updatedAt";

const statusLabels: Record<ApplicationStatus, string> = {
	APPLIED: "Applied",
	INTERVIEWING: "Interviewing",
	OFFERED: "Offered",
	REJECTED: "Rejected",
	STALLED: "Stalled",
};

const workModeLabels: Record<WorkMode, string> = {
	REMOTE: "Remote",
	HYBRID: "Hybrid",
	ON_SITE: "On-site",
};

const statusVariants: Record<
	ApplicationStatus,
	"default" | "success" | "warning" | "danger" | "muted"
> = {
	APPLIED: "default",
	INTERVIEWING: "muted",
	OFFERED: "success",
	REJECTED: "danger",
	STALLED: "warning",
};

function isStalled(application: DashboardApplication, thresholdDays: number) {
	return (
		!["REJECTED", "OFFERED"].includes(application.status) &&
		isApplicationStalled(application.updatedAt, thresholdDays)
	);
}

export function ApplicationTable({
	applications,
	stalledThresholdDays,
}: ApplicationTableProps) {
	const [filters, setFilters] = useState<ApplicationFiltersValue>({
		query: "",
		status: "ALL",
		workMode: "ALL",
	});
	const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>(
		{ key: "updatedAt", direction: "desc" },
	);
	const deferredQuery = useDeferredValue(filters.query.trim().toLowerCase());

	const filteredApplications = useMemo(() => {
		const visible = applications.filter((application) => {
			const matchesQuery =
				!deferredQuery ||
				[
					application.companyName,
					application.jobTitle,
					application.location ?? "",
				].some((field) => field.toLowerCase().includes(deferredQuery));
			const matchesStatus =
				filters.status === "ALL" || application.status === filters.status;
			const matchesWorkMode =
				filters.workMode === "ALL" || application.workMode === filters.workMode;
			return matchesQuery && matchesStatus && matchesWorkMode;
		});

		return [...visible].sort((left, right) => {
			const leftValue = left[sort.key];
			const rightValue = right[sort.key];
			const result = String(leftValue).localeCompare(
				String(rightValue),
				undefined,
				{ numeric: true },
			);
			return sort.direction === "asc" ? result : -result;
		});
	}, [applications, deferredQuery, filters.status, filters.workMode, sort]);

	const updateSort = (key: SortKey) => {
		setSort((current) => ({
			key,
			direction:
				current.key === key && current.direction === "asc" ? "desc" : "asc",
		}));
	};

	return (
		<section aria-label="Applications" className="mt-8">
			<div className="mb-4 flex items-end justify-between gap-4">
				<div>
					<p className="island-kicker">Your pipeline</p>
					<h2 className="display-title mt-1 text-3xl font-bold text-[var(--sea-ink)]">
						All applications
					</h2>
				</div>
				<span className="text-sm font-semibold text-[var(--sea-ink-soft)]">
					{filteredApplications.length} shown
				</span>
			</div>
			<ApplicationFilters value={filters} onChange={setFilters} />

			<div className="island-shell mt-4 overflow-hidden rounded-3xl">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[760px] text-left text-sm">
						<thead className="border-b border-[var(--line)] bg-[var(--surface)] text-xs uppercase tracking-[0.1em] text-[var(--sea-ink-soft)]">
							<tr>
								{(
									[
										"companyName",
										"status",
										"workMode",
										"appliedAt",
										"updatedAt",
									] as const
								).map((key) => (
									<th className="px-5 py-4 font-bold" key={key}>
										<button
											className="inline-flex items-center gap-1.5"
											onClick={() => updateSort(key)}
											type="button"
										>
											{key === "companyName"
												? "Company / role"
												: key === "workMode"
													? "Work mode"
													: key === "appliedAt"
														? "Applied"
														: key === "updatedAt"
															? "Updated"
															: "Status"}
											{sort.key === key ? (
												sort.direction === "asc" ? (
													<ArrowUp className="size-3.5" />
												) : (
													<ArrowDown className="size-3.5" />
												)
											) : (
												<ArrowUpDown className="size-3.5 opacity-40" />
											)}
										</button>
									</th>
								))}
								<th className="px-5 py-4" />
							</tr>
						</thead>
						<tbody className="divide-y divide-[var(--line)]">
							{filteredApplications.map((application) => {
								const stalled = isStalled(application, stalledThresholdDays);
								return (
									<tr
										className="group transition-colors hover:bg-[var(--link-bg-hover)]"
										key={application.id}
									>
										<td className="px-5 py-4">
											<div className="font-bold text-[var(--sea-ink)]">
												{application.companyName}
											</div>
											<div className="mt-1 text-[var(--sea-ink-soft)]">
												{application.jobTitle}
											</div>
										</td>
										<td className="px-5 py-4">
											<div className="flex flex-wrap items-center gap-2">
												<Badge variant={statusVariants[application.status]}>
													{statusLabels[application.status]}
												</Badge>
												{stalled ? <StalledBadge /> : null}
											</div>
										</td>
										<td className="px-5 py-4 text-[var(--sea-ink-soft)]">
											{workModeLabels[application.workMode]}
										</td>
										<td className="px-5 py-4 whitespace-nowrap text-[var(--sea-ink-soft)]">
											{application.appliedAt.toLocaleDateString()}
										</td>
										<td className="px-5 py-4 whitespace-nowrap text-[var(--sea-ink-soft)]">
											{application.updatedAt.toLocaleDateString()}
										</td>
										<td className="px-5 py-4 text-right">
											<Button asChild size="icon-sm" variant="ghost">
												<a
													aria-label={`Edit ${application.companyName}`}
													href={`/applications/${application.id}/edit`}
												>
													<ExternalLink className="size-4" />
												</a>
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{filteredApplications.length === 0 ? (
						<p className="px-5 py-12 text-center text-sm text-[var(--sea-ink-soft)]">
							No applications match these filters.
						</p>
					) : null}
				</div>
			</div>
		</section>
	);
}
