<script lang="ts">
	import type { Mail } from '$lib/server/db/schemas/inbox';
	import InboxThumbnail from './inbox/InboxThumbnail.svelte';
	import { onMount } from 'svelte';
	import { mails } from '$lib/store.svelte';
	import InboxLoadMore from './InboxLoadMore.svelte';

	interface Props {
		inbox: Mail[] | undefined;
	}
	const { inbox }: Props = $props();
	onMount(() => {
		if (inbox) mails.init(inbox);
	});
</script>

<h2 class="mt-12 text-center text-4xl !font-medium">📧 Your inbox</h2>
<section
	class="mx-auto flex w-full max-w-[1200px]
	flex-nowrap gap-4 p-12"
>
	{#each Array(mails.columns) as item, idx}
		<div class="flex flex-col gap-3">
			{#each mails.columnsData[idx] ?? [] as mail}
				<InboxThumbnail {...mail} />
			{/each}
		</div>
	{/each}
</section>
<InboxLoadMore />
