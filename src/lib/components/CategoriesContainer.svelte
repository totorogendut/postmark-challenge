<script lang="ts">
	import { allCategories } from '$lib/_consts';
	import type { MailCategoryView } from '$lib/server/db/schemas/inbox';
	import CategoryCard from './CategoryCard.svelte';

	interface Props {
		categories: MailCategoryView;
	}

	const { categories }: Props = $props();

	$inspect(categories);

	const list = $derived(categories);
</script>

<section class="mx-auto mt-12 flex w-full max-w-[1500px] flex-wrap gap-4 p-12">
	{#each allCategories as category}
		<CategoryCard {category} count={list} />
	{/each}
</section>
