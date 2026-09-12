"use client";

import { useRouterState } from "@tanstack/react-router";
import { BriefcaseBusiness, Plus } from "lucide-react";

import { ThemeToggle } from "#/components/theme-toggle";
import BetterAuthHeader from "#/integrations/better-auth/header-user";

const navigation = [
	{ href: "/", label: "Dashboard" },
	{ href: "/applications/new", label: "New Application" },
	{ href: "/settings", label: "Settings" },
];

export function Header() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	if (pathname === "/auth") return null;

	return (
		<header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl">
			<div className="page-wrap flex min-h-18 flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
				<a className="group flex items-center gap-3 no-underline" href="/">
					<span className="flex size-10 items-center justify-center rounded-2xl bg-[var(--sea-ink)] text-[var(--foam)] shadow-lg shadow-[rgba(23,58,64,0.15)] transition-transform group-hover:-rotate-3">
						<BriefcaseBusiness className="size-5" />
					</span>
					<span className="hidden sm:block">
						<span className="block font-serif text-lg font-bold tracking-tight text-[var(--sea-ink)]">
							Bewerbungstracker
						</span>
						<span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--kicker)]">
							Your next chapter
						</span>
					</span>
				</a>

				<nav
					aria-label="Main navigation"
					className="order-3 flex w-full items-center gap-7 overflow-x-auto pb-1 md:order-none md:w-auto md:pb-0"
				>
					{navigation.map((item) => {
						const isActive =
							item.href === "/"
								? pathname === "/"
								: pathname.startsWith(item.href);

						return (
							<a
								aria-current={isActive ? "page" : undefined}
								className={`nav-link text-sm font-semibold ${isActive ? "is-active" : ""}`}
								href={item.href}
								key={item.href}
							>
								{item.label}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<a
						className="hidden h-9 items-center gap-2 rounded-md bg-[var(--sea-ink)] px-3 text-sm font-bold text-[var(--foam)] no-underline shadow-sm transition-transform hover:-translate-y-0.5 sm:flex"
						href="/applications/new"
					>
						<Plus className="size-4" />
						Track an application
					</a>
					<ThemeToggle />
					<BetterAuthHeader />
				</div>
			</div>
		</header>
	);
}
