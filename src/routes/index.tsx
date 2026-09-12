import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	getApplications,
	getGlobalSettings,
} from "#/features/applications/application-actions";
import { Dashboard } from "#/features/applications/components/dashboard";

export const Route = createFileRoute("/")({ component: DashboardRoute });

function DashboardRoute() {
	const applicationsQuery = useQuery({
		queryKey: ["applications"],
		queryFn: () => getApplications(),
	});
	const settingsQuery = useQuery({
		queryKey: ["global-settings"],
		queryFn: () => getGlobalSettings(),
	});

	if (applicationsQuery.isPending || settingsQuery.isPending) {
		return <DashboardLoading />;
	}

	if (applicationsQuery.isError || settingsQuery.isError) {
		return (
			<div className="page-wrap py-20 text-center">
				<h1 className="display-title text-4xl font-bold text-[var(--sea-ink)]">
					Could not load your applications
				</h1>
				<p className="mt-3 text-[var(--sea-ink-soft)]">
					Check your database connection and try again.
				</p>
			</div>
		);
	}

	return (
		<Dashboard
			applications={applicationsQuery.data}
			settings={settingsQuery.data ?? { stalledThresholdDays: 14 }}
		/>
	);
}

function DashboardLoading() {
	return (
		<output
			aria-label="Loading dashboard"
			className="page-wrap block space-y-6 py-14"
		>
			<div className="h-72 animate-pulse rounded-3xl bg-[var(--surface)]" />
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
				{[
					"total",
					"active",
					"interviewing",
					"offers",
					"rejected",
					"stalled",
				].map((key) => (
					<div
						className="h-28 animate-pulse rounded-2xl bg-[var(--surface)]"
						key={key}
					/>
				))}
			</div>
		</output>
	);
}
