<script lang="ts">
	import CategoriesContainer from "$lib/components/CategoriesContainer.svelte";
	import MailInboxContainer from "$lib/components/MailInboxContainer.svelte";
	import { user } from "$lib/store.svelte";
	import { Avatar } from "@skeletonlabs/skeleton-svelte";
	import type { MailCategoryView } from "$lib/server/db/schemas/inbox";
	import InboxEmailAddress from "$lib/components/InboxEmailAddress.svelte";

	const mailCount = 4;
	const { data } = $props();
</script>

<header class="mx-auto mt-48 flex w-full max-w-[1200px] items-center gap-12">
	<img
		class="rounded-full bg-amber-400"
		width="128"
		height="128"
		src={user.avatarURL}
		alt={user.data?.username}
	/>
	<div class="flex flex-col gap-2">
		<h1 class="text-7xl font-extrabold">Good Morning, {user.data?.username}</h1>
		<div class="flex justify-between">
			<strong class="text-2xl font-medium">We organized your inbox below</strong>
			<InboxEmailAddress />
		</div>
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
