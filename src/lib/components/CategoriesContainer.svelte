<script lang="ts">
	import { allCategories } from "$lib/_consts";
	import type { MailCategoryView } from "$lib/server/db/schemas/inbox";
	import { mails } from "$lib/store.svelte";
	import { fly } from "svelte/transition";
	import CategoryCard from "./CategoryCard.svelte";
	import { cubicIn, cubicOut } from "svelte/easing";
	import { untrack } from "svelte";

	interface Props {
		categories: MailCategoryView | undefined;
	}

	const { categories }: Props = $props();

	const list = $derived(categories ?? ({} as Partial<MailCategoryView>));
</script>

<section
	class="group/categories relative mx-auto mt-12 flex
	w-full max-w-[1500px] flex-wrap gap-4 gap-y-5 p-12"
>
	{#each allCategories as category}
		<CategoryCard {category} count={list[category] || 0} />
	{/each}
	{#if mails.selectedCategories.size}
		<button
			in:fly={{ y: 4, duration: 225, easing: cubicOut }}
			out:fly={{ y: 4, duration: 225, easing: cubicIn }}
			class="text-primary-100 absolute bottom-2 left-18
			 font-bold underline"
			onclick={() => mails.selectedCategories.clear()}>clear</button
		>
	{/if}
</section>
