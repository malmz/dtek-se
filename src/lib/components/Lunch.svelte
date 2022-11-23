<script lang="ts">
	import type { LunchMenu } from '$lib/api/types';
	import { formatDistanceToNow } from 'date-fns';
	import Co2Bar from './Co2Bar.svelte';

	$: relativeFormat = formatDistanceToNow(new Date(menu.fetched_at));

	export let menu: LunchMenu;
	export let full = false;
</script>

<h2 class="text-xl font-bold mb-3">{menu.name}</h2>

<div>
	{#each menu.items as item}
		<div class="mb-4">
			<h3 class="text-base font-semibold mb-1">{item.title}</h3>
			<div class="ml-1">
				<p>{item.body}</p>

				{#if full && item.emission}
					<div class="flex align-bottom">
						<Co2Bar label="CO2 Meter" value={item.emission} />
					</div>
				{/if}

				{#if full && item.allergen.length}
					<p class="ml-1 flex gap-1 text-gray-600">
						{#each item.allergen as allergen}
							<img class="h-4 w-4" src={allergen.imageUrl} alt={allergen.code} />
						{/each}
					</p>
				{/if}
			</div>
		</div>
	{:else}
		<p>Ingen lunch idag</p>
	{/each}
</div>

<div class="flex justify-between">
	<span class="text-sm text-gray-700">Fetched {relativeFormat} ago</span>
	{#if !full}
		<a href="/lunch/{menu.resturant}" class="inline-block bg-teal-200 px-3 py-1 rounded-full"
			>Se mer</a
		>
	{/if}
</div>
