import { createFileRoute } from "@tanstack/react-router";
import { getApplication } from "#/features/applications/application-actions";
import { ApplicationForm } from "#/features/applications/application-form";
import type { ApplicationFormValues } from "#/features/applications/application-schema";

export const Route = createFileRoute("/applications/$applicationId/edit")({
	loader: ({ params }) =>
		getApplication({ data: { id: params.applicationId } }),
	component: EditApplicationPage,
});

function EditApplicationPage() {
	const application = Route.useLoaderData();
	const defaultValues: ApplicationFormValues = {
		companyName: application.companyName,
		jobTitle: application.jobTitle,
		url: application.url ?? undefined,
		salary: application.salary ?? undefined,
		location: application.location ?? undefined,
		workMode: application.workMode,
		status: application.status,
		contactName: application.contactName ?? undefined,
		contactEmail: application.contactEmail ?? undefined,
		appliedAt: application.appliedAt.toISOString().slice(0, 10),
		notes: application.notes ?? undefined,
	};

	return (
		<ApplicationForm
			applicationId={application.id}
			defaultValues={defaultValues}
		/>
	);
}
