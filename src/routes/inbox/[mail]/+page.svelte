<script lang="ts">
	import type { Mail } from '$lib/server/db/schemas/inbox';
	import type { Snippet } from 'svelte';
	import type { PageProps } from './$types';
	import { ArrowLeft } from 'lucide-svelte';

	const { data }: PageProps = $props();
</script>

<main class="mx-auto mt-12 w-full max-w-[1200px] pt-20">
	<a
		href="/"
		class="mb-4 flex -translate-x-8 items-center gap-2
		opacity-80 hover:opacity-100 hover:[&_svg]:-translate-x-0.5"
	>
		<ArrowLeft class="opacity-70 transition-all" size="21" />
		back
	</a>
	{#if data.mail?.mailFromName}
		<strong>from {data.mail?.mailFromName}</strong>
		<em class="opacity-75">{data.mail?.mailFrom}</em>
	{:else}
		<strong>from {data.mail?.mailFrom}</strong>
	{/if}
	<h1 class="mt-8 mb-4 text-6xl leading-[1]">{data.mail?.subject}</h1>
	<article class="prose text-2xl leading-[1.15] text-[var(--text-color)]">
		{data.mail?.textBody}
	</article>
</main>
