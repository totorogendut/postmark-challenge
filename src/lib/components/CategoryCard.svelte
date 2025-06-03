<script lang="ts">
	import { allCategories, categoriesColor } from "$lib/_consts";
	import { mails } from "$lib/store.svelte";
	interface Props {
		category: (typeof allCategories)[number];
		count: number;
	}

	const { category, count }: Props = $props();
	let selected = $derived(mails.selectedCategories.has(category));
</script>

<button
	onclick={() => {
		mails.toggleCategory(category);
	}}
	class={[
		`isolate flex h-12 cursor-pointer gap-12 rounded-sm bg-gradient-to-br
		from-40% pt-1
	pr-4 pb-1 pl-4 text-2xl leading-[1] transition-transform`,
		categoriesColor[category].from,
		categoriesColor[category].to,
		categoriesColor[category].text,
		!selected && "hover:-translate-y-0.5 hover:brightness-110",
		!!selected && "outline-2 outline-white/80",
		mails.selectedCategories.size && !selected && "not-hover:grayscale-50 not-hover:saturate-40",
	]}
>
	<span class="first-letter:uppercase">{category}</span>
	<strong class="z-10 -mt-8 text-6xl text-shadow-[3px_3px_#fff7]">{count}</strong>
</button>
