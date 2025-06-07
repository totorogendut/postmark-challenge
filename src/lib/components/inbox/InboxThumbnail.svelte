<script lang="ts">
	import type { Mail } from "$lib/server/db/schemas/inbox";
	import { formatDistance } from "date-fns";

	interface Props extends Mail {}

	const {
		id,
		subject,
		summary,
		mailFrom,
		mailFromName,
		createdAt,
		hasRead,
		categories,
		sentiment,
	}: Props = $props();
</script>

<a
	href="/inbox/{id}/"
	class={[
		`text-primary-100 outline-secondary-300 flex flex-col
	rounded-md bg-[var(--bg-color-2)] p-4 hover:outline-2`,
		hasRead && `opacity-80 saturate-50 `,
	]}
>
	<section
		class="flex items-center gap-2 font-sans
		text-[0.75em]"
	>
		{#if mailFromName}
			<strong>from {mailFromName}</strong>
			<span class="opacity-75">{mailFrom}</span>
		{:else}
			<strong>from {mailFrom}</strong>
		{/if}
	</section>
	<strong class="text-primary-50 leading-[1]">
		{subject}
	</strong>
	<div class="text-primary-50 mt-3 text-[0.88em] leading-[1.1] opacity-75">
		{summary}
	</div>
	<div class="flex flex-wrap gap-2">
		{#each categories || [] as category}
			<div class={[`mt-2 rounded-sm bg-amber-200 px-1 text-[0.75em] text-black/60`]}>
				{category}
			</div>
		{/each}
	</div>
	<div class="mt-4 flex justify-between">
		<small class=" opacity-70">
			{formatDistance(createdAt!, new Date(), { addSuffix: true })}
		</small>
		<small
			class={[
				(sentiment || 0) > 50 && "text-green-200",
				(sentiment || 0) >= 0 && (sentiment || 0) <= 50 && "text-yellow-100",
				(sentiment || 0) >= -50 && (sentiment || 0) < 0 && "text-orange-200",
				(sentiment || 0) < -50 && "text-red-200",
			]}>sentiment {sentiment}</small
		>
	</div>
</a>
