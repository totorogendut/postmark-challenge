<script lang="ts">
	function loadMore() {}
</script>

<div class="mb-12 flex justify-center">
	<button
		onclick={loadMore}
		class="load-more rounded-full px-8 py-2
    hover:brightness-110"
	>
		Load more
	</button>
</div>

<style lang="postcss">
	.load-more {
		--base-color-percentage: 75%;
		background-color: color-mix(in oklch, var(--bg-color-1) var(--base-color-percentage), black);
		&:hover {
			--base-color-percentage: 66%;
		}
	}
</style>
