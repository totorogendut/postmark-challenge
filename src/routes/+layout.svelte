<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>HaloMail</title>
</svelte:head>

{@render children()}
