import { cn } from "cn";
import type { ComponentProps } from "react";

type BadgeProps = ComponentProps<"span"> & {
	variant?: "default" | "success" | "warning" | "danger" | "muted";
};

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
	default: "bg-[var(--sea-ink)] text-[var(--foam)]",
	success:
		"bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
	warning:
		"bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
	danger: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300",
	muted: "bg-muted text-muted-foreground",
};

export function Badge({
	className,
	variant = "default",
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tracking-wide",
				variants[variant],
				className,
			)}
			{...props}
		/>
	);
}
