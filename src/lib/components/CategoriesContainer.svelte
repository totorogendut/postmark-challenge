<script lang="ts">
	import { allCategories } from '$lib/_consts';
	import CategoryCard from './CategoryCard.svelte';

	const { categories } = $props();

	const list = $derived<Record<(typeof allCategories)[number], number>>(categories);
</script>

<section class="mx-auto mt-12 flex w-full max-w-[1500px] flex-wrap gap-4 p-12">
	{#each allCategories as category}
		<CategoryCard {category} count={0} />
	{/each}
</section>
