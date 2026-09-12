"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "#/components/ui/button";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			aria-label={
				mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
			}
			disabled={!mounted}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			size="icon"
			variant="outline"
		>
			<Sun className="size-4 dark:hidden" />
			<Moon className="hidden size-4 dark:block" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
