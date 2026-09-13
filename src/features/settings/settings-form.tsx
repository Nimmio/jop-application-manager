"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Check, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { updateGlobalSettings } from "./settings-actions";
import { type SettingsFormValues, settingsSchema } from "./settings-schema";

type SettingsFormProps = {
	initialValues: SettingsFormValues;
};

export function SettingsForm({ initialValues }: SettingsFormProps) {
	const queryClient = useQueryClient();
	const [hydrated, setHydrated] = useState(false);
	const [saved, setSaved] = useState(false);
	const [submitError, setSubmitError] = useState<string>();
	useEffect(() => setHydrated(true), []);
	const form = useForm({
		defaultValues: initialValues,
		validators: { onSubmit: settingsSchema },
		onSubmit: async ({ value }) => {
			setSaved(false);
			setSubmitError(undefined);

			try {
				await updateGlobalSettings({ data: value });
				await Promise.all([
					queryClient.invalidateQueries({ queryKey: ["global-settings"] }),
					queryClient.invalidateQueries({ queryKey: ["applications"] }),
				]);
				setSaved(true);
			} catch {
				setSubmitError("We could not save your settings. Please try again.");
			}
		},
	});

	return (
		<form
			className="island-shell w-full rounded-3xl p-6 md:p-8"
			data-hydrated={hydrated}
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<div className="flex items-start gap-4">
				<span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--sand)] text-[var(--palm)] dark:bg-[var(--chip-bg)]">
					<SlidersHorizontal className="size-5" />
				</span>
				<div>
					<h2 className="text-xl font-bold text-[var(--sea-ink)]">
						Stalled applications
					</h2>
					<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
						Choose how long an application can be quiet before it needs your
						attention.
					</p>
				</div>
			</div>

			<div className="mt-8 flex items-end gap-4">
				<form.Field name="stalledThresholdDays">
					{(field) => (
						<label
							className="block max-w-xs flex-1 text-sm font-semibold text-[var(--sea-ink)]"
							htmlFor={field.name}
						>
							Days before an application is stalled
							<Input
								aria-describedby="threshold-help"
								aria-invalid={field.state.meta.errors.length > 0}
								className="mt-2"
								id={field.name}
								max={365}
								min={1}
								onBlur={field.handleBlur}
								onChange={(event) =>
									field.handleChange(Number(event.target.value))
								}
								type="number"
								value={field.state.value}
							/>
							<span
								className="mt-2 block text-xs font-normal text-[var(--sea-ink-soft)]"
								id="threshold-help"
							>
								Active applications older than this will show a warning on the
								dashboard.
							</span>
							{field.state.meta.errors[0] ? (
								<span className="mt-1 block text-xs text-destructive">
									{String(field.state.meta.errors[0])}
								</span>
							) : null}
						</label>
					)}
				</form.Field>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button disabled={!canSubmit} type="submit">
							{isSubmitting ? "Saving..." : "Save settings"}
						</Button>
					)}
				</form.Subscribe>
			</div>

			{saved ? (
				<p className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
					<Check className="size-4" /> Settings saved.
				</p>
			) : null}
			{submitError ? (
				<p className="mt-5 text-sm font-semibold text-destructive">
					{submitError}
				</p>
			) : null}
		</form>
	);
}
