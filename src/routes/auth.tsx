import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
	const [register, setRegister] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	async function submit(event: React.FormEvent) {
		event.preventDefault();
		setError("");
		const result = register
			? await authClient.signUp.email({ name, email, password })
			: await authClient.signIn.email({ email, password });
		if (result.error)
			setError(result.error.message ?? "Unable to authenticate");
		else await navigate({ to: "/" });
	}
	return (
		<main className="page-wrap flex min-h-[70vh] items-center justify-center py-12">
			<form
				onSubmit={submit}
				className="w-full max-w-md space-y-4 rounded-2xl border border-[var(--line)] bg-white p-8 shadow-sm dark:bg-neutral-950"
			>
				<h1 className="text-3xl font-bold">
					{register ? "Create your account" : "Welcome back"}
				</h1>
				{register && (
					<input
						required
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full rounded border bg-white p-3 dark:bg-neutral-900"
					/>
				)}
				<input
					required
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full rounded border bg-white p-3 dark:bg-neutral-900"
				/>
				<input
					required
					minLength={8}
					type="password"
					placeholder="Password (8+ characters)"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full rounded border bg-white p-3 dark:bg-neutral-900"
				/>
				{error && (
					<p role="alert" className="text-red-600">
						{error}
					</p>
				)}
				<button
					type="submit"
					className="w-full rounded bg-[var(--sea-ink)] p-3 font-bold text-white"
				>
					{register ? "Register" : "Log in"}
				</button>
				<button
					type="button"
					onClick={() => setRegister(!register)}
					className="w-full text-sm underline"
				>
					{register
						? "Already have an account? Log in"
						: "Need an account? Register"}
				</button>
			</form>
		</main>
	);
}
