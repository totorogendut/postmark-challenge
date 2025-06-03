<script lang="ts">
	import { mails } from "$lib/store.svelte";
	import { Switch } from "@skeletonlabs/skeleton-svelte";
	import { untrack } from "svelte";
</script>

<div class="flex items-center">
	<label class="flex items-center gap-3">
		Show only unread
		<Switch
			name="hasRead"
			checked={mails.state.onlyUnread}
			onCheckedChange={async () => {
				mails.state.onlyUnread = !mails.state.onlyUnread;
				mails.reset();
				await mails.get();
			}}
		></Switch>
	</label>
</div>
