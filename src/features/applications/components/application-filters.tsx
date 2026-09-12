import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import type { ApplicationStatus, WorkMode } from "../application-schema";

export type ApplicationFiltersValue = {
	query: string;
	status: ApplicationStatus | "ALL";
	workMode: WorkMode | "ALL";
};

type ApplicationFiltersProps = {
	value: ApplicationFiltersValue;
	onChange: (value: ApplicationFiltersValue) => void;
};

export function ApplicationFilters({
	value,
	onChange,
}: ApplicationFiltersProps) {
	return (
		<div className="flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 md:flex-row">
			<label className="relative min-w-0 flex-1" htmlFor="search-applications">
				<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" />
				<span className="sr-only">Search applications</span>
				<Input
					aria-label="Search applications"
					className="pl-9"
					id="search-applications"
					onChange={(event) =>
						onChange({ ...value, query: event.target.value })
					}
					placeholder="Search companies, roles, or locations..."
					value={value.query}
				/>
			</label>
			<div className="flex flex-col gap-3 sm:flex-row">
				<div className="flex items-center gap-2">
					<SlidersHorizontal className="hidden size-4 text-[var(--sea-ink-soft)] sm:block" />
					<Select
						value={value.status}
						onValueChange={(status) =>
							onChange({
								...value,
								status: status as ApplicationFiltersValue["status"],
							})
						}
					>
						<SelectTrigger
							aria-label="Filter by status"
							className="w-full sm:w-40"
						>
							<SelectValue placeholder="All statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ALL">All statuses</SelectItem>
							<SelectItem value="APPLIED">Applied</SelectItem>
							<SelectItem value="INTERVIEWING">Interviewing</SelectItem>
							<SelectItem value="OFFERED">Offered</SelectItem>
							<SelectItem value="REJECTED">Rejected</SelectItem>
							<SelectItem value="STALLED">Stalled</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Select
					value={value.workMode}
					onValueChange={(workMode) =>
						onChange({
							...value,
							workMode: workMode as ApplicationFiltersValue["workMode"],
						})
					}
				>
					<SelectTrigger
						aria-label="Filter by work mode"
						className="w-full sm:w-36"
					>
						<SelectValue placeholder="All work modes" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ALL">All work modes</SelectItem>
						<SelectItem value="REMOTE">Remote</SelectItem>
						<SelectItem value="HYBRID">Hybrid</SelectItem>
						<SelectItem value="ON_SITE">On-site</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
