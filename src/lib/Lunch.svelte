<script lang="ts">
	import type { LunchMenu } from './api/lunch';
	import { formatDistanceToNow } from 'date-fns';

	$: relativeFormat = formatDistanceToNow(new Date(menu.fetched_at));

	export let menu: LunchMenu;
</script>

<div>
	<h2 class="text-lg font-semibold">{menu.name}</h2>
	<div class="my-1">
		{#each menu.items as item}
			<h3 class="text-lg">{item.title}</h3>
			<p>{item.body}</p>
		{:else}
			<p>Ingen lunch idag</p>
		{/each}
	</div>
	<p class="text-sm text-gray-700">Fetched {relativeFormat} ago</p>
</div>
