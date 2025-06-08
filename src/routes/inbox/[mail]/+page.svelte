<script lang="ts">
	import type { Mail } from "$lib/server/db/schemas/inbox";
	import type { Snippet } from "svelte";
	import type { PageProps } from "./$types";
	import { ArrowLeft } from "lucide-svelte";

	const { data }: PageProps = $props();

	const sentiment = $derived(data.mail?.sentiment || 0);
	const fraudIndicator = $derived(data.mail?.fraudIndicator || 0);
	const spamIndicator = $derived(data.mail?.spamIndicator || 0);
</script>

<main class="mx-auto mt-12 w-full max-w-[1200px] pt-20">
	<a
		href="/"
		class="mb-2 flex -translate-x-8 items-center gap-2
		opacity-80 hover:opacity-100 hover:[&_svg]:-translate-x-0.5"
	>
		<ArrowLeft class="opacity-70 transition-all" size="21" />
		back
	</a>
	<div class="text-xl">
		{#if data.mail?.mailFromName}
			<strong>from {data.mail?.mailFromName}</strong>
			<em class="opacity-75">{data.mail?.mailFrom}</em>
		{:else}
			<strong>from {data.mail?.mailFrom}</strong>
		{/if}
	</div>
	<h1 class="mt-4 mb-4 text-6xl leading-[1]">{data.mail?.subject}</h1>
	<article class="prose min-h-[400px] text-2xl leading-[1.15] text-[var(--text-color)]">
		{data.mail?.textBody}
	</article>
	<hr class="mt-12 mb-6 opacity-40" />
	<div class="flex flex-col gap-1 leading-[1]">
		<div>
			<strong>Sentiment:</strong>
			<span
				class={[
					sentiment > 50 && "text-green-200",
					sentiment >= 0 && sentiment <= 50 && "text-yellow-100",
					sentiment >= -50 && sentiment < 0 && "text-orange-200",
					sentiment < -50 && "text-red-200",
				]}
			>
				{sentiment}
			</span>
		</div>
		<div>
			<strong>Spam Indicator:</strong>
			<span
				class={[
					spamIndicator <= 10 && "text-green-200",
					spamIndicator > 10 && spamIndicator <= 25 && "text-yellow-100",
					spamIndicator > 25 && spamIndicator <= 50 && "text-orange-200",
					spamIndicator > 50 && "text-red-200",
				]}
			>
				{spamIndicator}%
			</span>
		</div>
		<div>
			<strong>Fraud Indicator:</strong><span
				class={[
					fraudIndicator <= 10 && "text-green-200",
					fraudIndicator > 10 && fraudIndicator <= 25 && "text-yellow-100",
					fraudIndicator > 25 && fraudIndicator <= 50 && "text-orange-200",
					fraudIndicator > 50 && "text-red-200",
				]}
			>
				{fraudIndicator}%
			</span>
		</div>
	</div>
</main>
