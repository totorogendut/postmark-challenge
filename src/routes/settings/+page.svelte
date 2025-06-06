<script lang="ts">
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<main class="mx-auto mt-32 w-full max-w-[1000px]">
	<form method="POST" class="flex flex-col gap-2">
		<input type="text" name="mailboxHash" value={data.mailboxHash || ""} />
		<button type="submit">Okay</button>
	</form>
</main>
