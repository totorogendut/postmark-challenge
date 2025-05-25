<script lang="ts">
	import { user } from '$lib/store.svelte';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';

	const mailCount = 4;
</script>

<header class="mx-auto mt-48 flex w-full max-w-[1200px] items-center gap-12">
	<Avatar size="128" src={user.avatar} name={user.name} />
	<h1 class="text-7xl font-extrabold">Good Morning, {user.name}</h1>
</header>

<main class="mx-auto w-full max-w-[1200px]">
	<strong class="mt-6 block text-2xl font-medium opacity-95">📧 You have {mailCount} mails.</strong>
</main>
