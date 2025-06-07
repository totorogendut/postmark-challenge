<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<nav class="fixed top-0 left-0 w-full">
	<div class="mx-auto flex w-full max-w-[1200px] justify-between p-4">
		<div></div>
		<form method="post" action="/auth?/logout">
			<button type="submit">Sign out</button>
		</form>
	</div>
</nav>
