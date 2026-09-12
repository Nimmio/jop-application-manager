import {
	BriefcaseBusiness,
	CircleDashed,
	CircleX,
	Clock3,
	Gift,
	MessagesSquare,
} from "lucide-react";

import type { DashboardApplication } from "./application-table";

type DashboardStatsProps = {
	applications: DashboardApplication[];
	stalledCount: number;
};

const statStyles = [
	{
		label: "Total",
		key: "total",
		icon: BriefcaseBusiness,
		tone: "text-[var(--sea-ink)]",
	},
	{
		label: "Active",
		key: "active",
		icon: CircleDashed,
		tone: "text-sky-700 dark:text-sky-300",
	},
	{
		label: "Interviewing",
		key: "interviewing",
		icon: MessagesSquare,
		tone: "text-violet-700 dark:text-violet-300",
	},
	{
		label: "Offers",
		key: "offers",
		icon: Gift,
		tone: "text-emerald-700 dark:text-emerald-300",
	},
	{
		label: "Rejected",
		key: "rejected",
		icon: CircleX,
		tone: "text-rose-700 dark:text-rose-300",
	},
	{
		label: "Stalled",
		key: "stalled",
		icon: Clock3,
		tone: "text-amber-700 dark:text-amber-300",
	},
] as const;

export function DashboardStats({
	applications,
	stalledCount,
}: DashboardStatsProps) {
	const counts = {
		total: applications.length,
		active: applications.filter(
			({ status }) => status === "APPLIED" || status === "INTERVIEWING",
		).length,
		interviewing: applications.filter(({ status }) => status === "INTERVIEWING")
			.length,
		offers: applications.filter(({ status }) => status === "OFFERED").length,
		rejected: applications.filter(({ status }) => status === "REJECTED").length,
		stalled: stalledCount,
	};

	return (
		<section
			aria-label="Application statistics"
			className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
		>
			{statStyles.map(({ label, key, icon: Icon, tone }) => (
				<div
					className="feature-card rounded-2xl border border-[var(--line)] p-4"
					key={key}
				>
					<div className="flex items-center justify-between gap-3">
						<span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
							{label}
						</span>
						<Icon className={`size-4 ${tone}`} />
					</div>
					<p className="mt-3 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
						{counts[key]}
					</p>
				</div>
			))}
		</section>
	);
}
