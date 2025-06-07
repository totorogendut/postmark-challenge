<script lang="ts">
	import { mails } from "$lib/store.svelte";
	import { Switch } from "@skeletonlabs/skeleton-svelte";
	import { untrack } from "svelte";
</script>

<div class="flex items-center gap-5">
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
	<label class=" mb-7 flex flex-col items-end">
		Sort by
		<select
			name="orderBy"
			class="text-primary-600/70 w-[150px] p-1 px-4"
			onchange={async (e) => {
				//@ts-ignore
				mails.state.orderBy = e.target?.value;
				mails.reset();
				await mails.get();
			}}
		>
			<option value="createdAt">Date created</option>
			<option value="sentiment">Email sentiment</option>
		</select>
	</label>
</div>
