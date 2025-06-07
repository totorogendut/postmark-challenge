<script lang="ts">
	import { enhance } from "$app/forms";
	import { ArrowLeft } from "lucide-svelte";
	import type { ActionData } from "./$types";
	import { untrack } from "svelte";
	import { user } from "$lib/store.svelte";
	import { goto } from "$app/navigation";

	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (!form?.user) return;
		untrack(() => {
			user.data = form.user;
			goto("/");
		});
	});
</script>

<main class="mx-auto mt-40 flex w-full max-w-[400px] flex-col">
	<a
		href="/"
		class="flex -translate-x-8 items-center gap-2 opacity-80
		hover:opacity-100 hover:[&_svg]:-translate-x-0.5"
	>
		<ArrowLeft class="opacity-70 transition-all" size="21" />
		back home</a
	>
	<h1 class="mt-4 mb-5 text-4xl">Login/Register</h1>
	<form
		class="flex flex-col gap-2 rounded-md bg-amber-50 p-4"
		method="post"
		action="?/login"
		use:enhance
	>
		<label class="text-secondary-400 flex flex-col font-bold">
			Username
			<input
				name="username"
				class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</label>
		<label class="text-secondary-400 flex flex-col font-bold">
			Password
			<input
				type="password"
				name="password"
				class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</label>
		<div class="mt-8"></div>
		<button class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>Login</button
		>
		<button
			formaction="?/register"
			class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>Register</button
		>
	</form>
	<p class="mt-2" style="color: red">{form?.message ?? ""}</p>
</main>
