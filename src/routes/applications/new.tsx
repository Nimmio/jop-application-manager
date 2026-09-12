import { createFileRoute } from "@tanstack/react-router";

import { ApplicationForm } from "#/features/applications/application-form";

export const Route = createFileRoute("/applications/new")({
	component: NewApplicationPage,
});

function NewApplicationPage() {
	return <ApplicationForm />;
}
