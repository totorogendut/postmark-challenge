<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";
	import "../app.css";
	import { setContext } from "svelte";
	import type { LayoutProps } from "./$types";
	import { user } from "$lib/store.svelte";

	let { children, data }: LayoutProps = $props();
	setContext("user", () => data.user);
	user.data = data.user;
</script>

<svelte:head>
	<title>HaloMail</title>
</svelte:head>

<NavBar />

{@render children()}
