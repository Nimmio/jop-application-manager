import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getGlobalSettings } from "#/features/applications/application-actions";
import { SettingsForm } from "#/features/settings/settings-form";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
	const settingsQuery = useQuery({
		queryKey: ["global-settings"],
		queryFn: () => getGlobalSettings(),
	});

	return (
		<div className="page-wrap py-10 md:py-14">
			<div className="mb-8 max-w-2xl">
				<p className="island-kicker">Workspace preferences</p>
				<h1 className="display-title mt-2 text-5xl font-bold tracking-tight text-[var(--sea-ink)]">
					Settings
				</h1>
				<p className="mt-3 text-[var(--sea-ink-soft)]">
					Tune the signals that help you keep momentum in your job search.
				</p>
			</div>

			{settingsQuery.isPending ? (
				<output
					aria-label="Loading settings"
					className="block h-56 w-full animate-pulse rounded-3xl bg-[var(--surface)]"
				/>
			) : settingsQuery.isError ? (
				<p className="text-sm font-semibold text-destructive">
					Could not load your settings.
				</p>
			) : (
				<SettingsForm
					initialValues={{
						stalledThresholdDays:
							settingsQuery.data?.stalledThresholdDays ?? 14,
					}}
				/>
			)}
		</div>
	);
}
