<script lang="ts">
	interface Props {
		category: string;
		count: number;
	}

	const { category, count }: Props = $props();
</script>

<article
	class="flex gap-12 rounded-sm bg-white
	pt-2 pr-12 pb-6 pl-4 text-2xl text-green-700"
>
	<strong class="first-letter:uppercase">{category}</strong>
	<span>{count}</span>
</article>
