<script lang="ts">
	import { user } from "$lib/store.svelte";
	import { CheckCheckIcon, CheckIcon, ClipboardIcon } from "lucide-svelte";

	let copied = $state(false);
	function copy() {
		copied = true;
		navigator.clipboard.writeText(user.inboundEmailAddress);
	}
</script>

<div class="flex translate-y-4 flex-col items-end">
	<strong>{copied ? "Copied!" : "Your email inbound address"}</strong>
	<div class="relative flex">
		<div
			class="scrollbar-hide w-[300px] overflow-x-scroll scroll-smooth
      rounded-md border-2 p-2 px-4"
		>
			{user.inboundEmailAddress}
		</div>
		<button
			onclick={copy}
			class={[
				"absolute top-0.5 -right-14 rounded-md p-2",
				copied ? "bg-green-600 text-white" : "bg-white/20 hover:bg-white/30",
			]}
		>
			{#if copied}
				<CheckIcon />
			{:else}
				<ClipboardIcon />
			{/if}
		</button>
	</div>
</div>
