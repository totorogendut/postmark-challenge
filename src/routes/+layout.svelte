<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";
	import "../app.css";
	import { setContext } from "svelte";
	import type { LayoutProps } from "./$types";
	import { user } from "$lib/store.svelte";
	import { ProgressBar } from "@prgm/sveltekit-progress-bar";

	let { children, data }: LayoutProps = $props();
	user.data = data.user;
</script>

<svelte:head>
	<title>HaloMail</title>
</svelte:head>

<ProgressBar class="text-secondary-100" />
<NavBar />

{@render children()}
