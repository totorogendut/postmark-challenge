<script lang="ts">
	import type { Mail } from '$lib/server/db/schemas/inbox';
	import { formatDistance } from 'date-fns';

	interface Props extends Mail {}

	const { id, subject, summary, mailFrom, mailFromName, createdAt }: Props = $props();
</script>

<a
	href="/inbox/{id}/"
	class="text-primary-100 rounded-md bg-[var(--bg-color-2)]
	p-4"
>
	<section class="flex items-center gap-2 font-sans text-[0.75em]">
		{#if mailFromName}
			<strong>from {mailFromName}</strong>
			<em class="opacity-75">{mailFrom}</em>
		{:else}
			<strong>from {mailFrom}</strong>
		{/if}
	</section>
	<strong class="prose text-primary-50 block">
		{subject}
	</strong>
	<div class="text-primary-50 mt-1 text-[0.88em] leading-[1.1] opacity-75">
		{summary}
	</div>
	<small class="mt-4 block opacity-70">
		{formatDistance(createdAt!, new Date(), { addSuffix: true })}
	</small>
</a>
