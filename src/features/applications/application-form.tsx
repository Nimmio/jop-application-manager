"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button";
import { DatePicker } from "#/components/ui/date-picker";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";
import { createApplication, updateApplication } from "./application-actions";
import {
	type ApplicationFormValues,
	type ApplicationStatus,
	applicationFormSchema,
	type WorkMode,
} from "./application-schema";

type ApplicationFormProps = {
	applicationId?: string;
	defaultValues?: ApplicationFormValues;
};

const today = new Date().toISOString().slice(0, 10);

const emptyValues: ApplicationFormValues = {
	companyName: "",
	jobTitle: "",
	url: undefined,
	salary: undefined,
	location: undefined,
	workMode: "HYBRID",
	status: "APPLIED",
	contactName: undefined,
	contactEmail: undefined,
	appliedAt: today,
	notes: undefined,
};

const workModes: Array<{ value: WorkMode; label: string }> = [
	{ value: "REMOTE", label: "Remote" },
	{ value: "HYBRID", label: "Hybrid" },
	{ value: "ON_SITE", label: "On-site" },
];

const statuses: Array<{ value: ApplicationStatus; label: string }> = [
	{ value: "APPLIED", label: "Applied" },
	{ value: "INTERVIEWING", label: "Interviewing" },
	{ value: "OFFERED", label: "Offered" },
	{ value: "REJECTED", label: "Rejected" },
	{ value: "STALLED", label: "Stalled" },
];

function FieldError({ errors }: { errors: Array<unknown> }) {
	const error = errors[0];
	return error ? (
		<p className="mt-1 text-xs font-semibold text-destructive">
			{String(error)}
		</p>
	) : null;
}

export function ApplicationForm({
	applicationId,
	defaultValues,
}: ApplicationFormProps) {
	const router = useRouter();
	const [hydrated, setHydrated] = useState(false);
	const [submitError, setSubmitError] = useState<string>();
	useEffect(() => setHydrated(true), []);
	const form = useForm({
		defaultValues: defaultValues ?? emptyValues,
		validators: { onSubmit: applicationFormSchema },
		onSubmit: async ({ value }) => {
			setSubmitError(undefined);
			try {
				if (applicationId) {
					await updateApplication({ data: { id: applicationId, data: value } });
				} else {
					await createApplication({ data: value });
				}

				await router.options.context.queryClient.invalidateQueries();
				await router.navigate({ to: "/" });
			} catch {
				setSubmitError("We could not save this application. Please try again.");
			}
		},
	});

	return (
		<form
			className="page-wrap max-w-4xl py-10 md:py-14"
			data-hydrated={hydrated}
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<div className="mb-8 max-w-2xl">
				<p className="island-kicker">
					{applicationId ? "Keep it current" : "A promising lead"}
				</p>
				<h1 className="display-title mt-2 text-4xl font-bold tracking-tight text-[var(--sea-ink)] md:text-5xl">
					{applicationId ? "Edit application" : "Track a new application"}
				</h1>
				<p className="mt-3 text-[var(--sea-ink-soft)]">
					{applicationId
						? "Keep your notes, contacts, and next steps in one calm place."
						: "Capture the details now, so your future self always knows what comes next."}
				</p>
			</div>

			<section className="island-shell rounded-3xl p-5 md:p-8">
				<div className="grid gap-5 md:grid-cols-2">
					<form.Field name="companyName">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Company name{" "}
								<span className="text-[var(--lagoon-deep)]">*</span>
								<Input
									id={field.name}
									aria-invalid={field.state.meta.errors.length > 0}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="e.g. Northwind Labs"
									value={field.state.value}
								/>
								<FieldError errors={field.state.meta.errors} />
							</label>
						)}
					</form.Field>

					<form.Field name="jobTitle">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Job title <span className="text-[var(--lagoon-deep)]">*</span>
								<Input
									id={field.name}
									aria-invalid={field.state.meta.errors.length > 0}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="e.g. Frontend Engineer"
									value={field.state.value}
								/>
								<FieldError errors={field.state.meta.errors} />
							</label>
						)}
					</form.Field>

					<form.Field name="url">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Job posting URL
								<Input
									id={field.name}
									aria-invalid={field.state.meta.errors.length > 0}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="https://..."
									value={field.state.value ?? ""}
								/>
								<FieldError errors={field.state.meta.errors} />
							</label>
						)}
					</form.Field>

					<form.Field name="salary">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Salary or range
								<Input
									id={field.name}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="e.g. €70,000 - €85,000"
									value={field.state.value ?? ""}
								/>
								<FieldError errors={field.state.meta.errors} />
							</label>
						)}
					</form.Field>

					<form.Field name="location">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Location
								<Input
									id={field.name}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="e.g. Berlin or Remote"
									value={field.state.value ?? ""}
								/>
							</label>
						)}
					</form.Field>

					<form.Field name="appliedAt">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Applied on <span className="text-[var(--lagoon-deep)]">*</span>
								<DatePicker
									id={field.name}
									aria-invalid={field.state.meta.errors.length > 0}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									value={field.state.value}
								/>
								<FieldError errors={field.state.meta.errors} />
							</label>
						)}
					</form.Field>

					<form.Field name="workMode">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Work mode <span className="text-[var(--lagoon-deep)]">*</span>
								<Select
									value={field.state.value}
									onValueChange={(value) =>
										field.handleChange(value as WorkMode)
									}
								>
									<SelectTrigger className="mt-2 w-full" id={field.name}>
										<SelectValue placeholder="Choose a work mode" />
									</SelectTrigger>
									<SelectContent>
										{workModes.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
						)}
					</form.Field>

					<form.Field name="status">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Status <span className="text-[var(--lagoon-deep)]">*</span>
								<Select
									value={field.state.value}
									onValueChange={(value) =>
										field.handleChange(value as ApplicationStatus)
									}
								>
									<SelectTrigger className="mt-2 w-full" id={field.name}>
										<SelectValue placeholder="Choose a status" />
									</SelectTrigger>
									<SelectContent>
										{statuses.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
						)}
					</form.Field>

					<form.Field name="contactName">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Contact name
								<Input
									id={field.name}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="e.g. Lea Fischer"
									value={field.state.value ?? ""}
								/>
							</label>
						)}
					</form.Field>

					<form.Field name="contactEmail">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)]"
								htmlFor={field.name}
							>
								Contact email
								<Input
									id={field.name}
									aria-invalid={field.state.meta.errors.length > 0}
									className="mt-2"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="name@company.com"
									value={field.state.value ?? ""}
								/>
								<FieldError errors={field.state.meta.errors} />
							</label>
						)}
					</form.Field>

					<form.Field name="notes">
						{(field) => (
							<label
								className="block text-sm font-semibold text-[var(--sea-ink)] md:col-span-2"
								htmlFor={field.name}
							>
								Notes
								<Textarea
									id={field.name}
									className="mt-2 min-h-32"
									name={field.name}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
									placeholder="Interview notes, follow-up reminders, or anything else worth remembering..."
									value={field.state.value ?? ""}
								/>
							</label>
						)}
					</form.Field>
				</div>

				{submitError ? (
					<p className="mt-5 text-sm font-semibold text-destructive">
						{submitError}
					</p>
				) : null}

				<div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-end">
					<Button asChild type="button" variant="ghost">
						<a href="/">Cancel</a>
					</Button>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button disabled={!canSubmit} type="submit">
								{isSubmitting
									? "Saving..."
									: applicationId
										? "Save changes"
										: "Save application"}
							</Button>
						)}
					</form.Subscribe>
				</div>
			</section>
		</form>
	);
}
