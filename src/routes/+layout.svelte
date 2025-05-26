<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>HaloMail</title>
</svelte:head>

<NavBar />

{@render children()}
