<script lang="ts">
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<main class="mx-auto mt-32 w-full max-w-[600px]">
	<form method="POST" class="flex flex-col gap-6">
		<label class="flex flex-col gap-1">
			Postmark Inbound Email Address
			<input
				type="text"
				name="email"
				placeholder="yourhash@inbound.postmarkapp.com"
				class="text-primary-700/90 font-bold placeholder:font-bold"
				value={data.email || ""}
			/>
		</label>
		<button type="submit" class="bg-primary-500 rounded-md p-2 text-white">Okay</button>
	</form>
	<small class="mt-4 block w-[400px] text-sm leading-[1.1] opacity-80"
		>NOTE: Your inbound email address should be the same as the inbound email address sent to the
		webhook.
	</small>
</main>
