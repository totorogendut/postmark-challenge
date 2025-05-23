<script lang="ts">
	import { user } from '$lib/store.svelte';
</script>

<main class="mx-auto mt-48 w-full max-w-[1200px]">
	<div class="flex items-center gap-12">
		<img height="128" width="128" class="radius" src={user.avatar} alt={user.name} />
		<h1 class="text-7xl">Good Morning, {user.name}</h1>
	</div>
</main>
