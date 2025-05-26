<script lang="ts">
	import type { allCategories } from '$lib/_consts';
	import type { Mail } from '$lib/server/db/schemas/inbox';
	import CategoryCard from './CategoryCard.svelte';
	import InboxThumbnail from './inbox/InboxThumbnail.svelte';

	interface Props {
		inbox: Mail[] | undefined;
	}

	const { inbox }: Props = $props();
</script>

<section class="w-max-[1200px] flex w-full flex-wrap gap-4 p-12">
	{#each inbox ?? [] as mail}
		<InboxThumbnail {mail} />
	{/each}
</section>
