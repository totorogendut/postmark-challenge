<script lang="ts">
	import { allCategories } from '$lib/_consts';
	import type { MailCategoryView } from '$lib/server/db/schemas/inbox';
	import CategoryCard from './CategoryCard.svelte';

	interface Props {
		categories: MailCategoryView | undefined;
	}

	const { categories }: Props = $props();

	const list = $derived(categories ?? ({} as Partial<MailCategoryView>));
</script>

<section class="mx-auto mt-12 flex w-full max-w-[1500px] flex-wrap gap-4 p-12">
	{#each allCategories as category}
		<CategoryCard {category} count={list[category] || 0} />
	{/each}
</section>
