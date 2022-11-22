<script lang="ts">
	import type { LunchMenu } from '$lib/api/types';
	import { formatDistanceToNow } from 'date-fns';
	import Co2Bar from './Co2Bar.svelte';

	$: relativeFormat = formatDistanceToNow(new Date(menu.fetched_at));

	export let menu: LunchMenu;
	export let full = false;

	console.log(menu);
</script>

<h2 class="text-xl font-bold mb-3">{menu.name}</h2>
<div>
	{#each menu.items as item}
		<div class="mb-4">
			<h3 class="text-base font-semibold mb-1">{item.title}</h3>
			<p class="ml-1">{item.body}</p>
			{#if full && item.allergen.length}
				<p class="ml-1 flex gap-1 text-gray-600">
					<span>Contains: {item.allergen.map(({ code }) => code).join(', ')}</span>
				</p>
			{/if}
			{#if item.emission != null}
				<div class="flex align-bottom">
					<Co2Bar label="CO2 Meter" value={item.emission} />
				</div>
			{/if}
		</div>
	{:else}
		<p>Ingen lunch idag</p>
	{/each}
</div>
<p class="text-sm text-gray-700">Fetched {relativeFormat} ago</p>
