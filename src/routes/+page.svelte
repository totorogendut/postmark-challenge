<script lang="ts">
	import CategoriesContainer from '$lib/components/CategoriesContainer.svelte';
	import MailInboxContainer from '$lib/components/MailInboxContainer.svelte';
	import { user } from '$lib/store.svelte';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';

	const mailCount = 4;
	const { data } = $props();

	console.log(data);
</script>

<header class="mx-auto mt-48 flex w-full max-w-[1200px] items-center gap-12">
	<Avatar size="128" src={user.avatar} name={user.name} />
	<div class="flex flex-col gap-2">
		<h1 class="text-7xl font-extrabold">Good Morning, {user.name}</h1>
		<strong class="text-2xl font-medium">We organized your inbox below</strong>
	</div>
</header>

<svelte:boundary>
	<CategoriesContainer categories={data.categories} />
	{#snippet failed()}
		Opps....
	{/snippet}
</svelte:boundary>

<svelte:boundary>
	<MailInboxContainer inbox={data.inbox} />
	{#snippet failed()}
		Opps....
	{/snippet}
</svelte:boundary>
