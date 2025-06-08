<script lang="ts">
	import InboxThumbnail from "./inbox/InboxThumbnail.svelte";
	import { onMount } from "svelte";
	import { mails } from "$lib/store.svelte";
	import InboxLoadMore from "./InboxLoadMore.svelte";
	import { Switch } from "@skeletonlabs/skeleton-svelte";
	import MailInboxState from "./MailInboxState.svelte";
	import Tutorial from "./Tutorial.svelte";
	import type { Mail } from "$lib/server/db/schemas/inbox";

	interface Props {
		inbox: Mail[] | undefined;
	}
	const { inbox }: Props = $props();
	onMount(() => {
		if (inbox) {
			mails.reset();
			mails.insert(inbox);
		}
	});
</script>

<section class="mx-auto w-full max-w-[1200px] p-12">
	<div class="flex justify-between">
		<h2 class="mb-4 text-4xl !font-medium">📧 Your inbox</h2>
		<MailInboxState />
	</div>
	<div class="flex min-h-[400px] flex-nowrap gap-4">
		{#if mails.isEmpty && !mails.loading && !mails.selectedCategories?.size}
			<Tutorial />
		{:else}
			{#each Array(mails.columns) as item, idx}
				<div class="flex flex-col gap-3">
					{#each mails.columnsData[idx] ?? [] as mail}
						<InboxThumbnail {...mail} />
					{/each}
				</div>
			{/each}
		{/if}
	</div>
</section>
{#if !mails.isEmpty}
	<InboxLoadMore />
{/if}
