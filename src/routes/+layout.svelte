<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";
	import "../app.css";
	import { setContext } from "svelte";
	import type { LayoutProps } from "./$types";

	let { children, data }: LayoutProps = $props();
	setContext("user", () => data.user);
</script>

<svelte:head>
	<title>HaloMail</title>
</svelte:head>

<NavBar />

{@render children()}
