<script lang="ts">
	import type { LunchMenu } from '$lib/api/types';
	import { formatDistanceToNow } from 'date-fns';
	import Allergen from './Allergen.svelte';
	import Co2Bar from './Co2Bar.svelte';

	$: relativeFormat = formatDistanceToNow(new Date(menu.fetched_at));

	export let menu: LunchMenu;
	export let allergen = false;
	export let co2 = false;
	export let link = false;
</script>

<div>
	<div class="flex gap-8 mt-4">
		<h3 class="text-xl font-bold text-base-content mb-2">{menu.name}</h3>
		{#if link}
			<a href="/lunch/{menu.resturant}" class="btn btn-sm btn-secondary">Läs mer</a>
		{/if}
	</div>

	<div>
		{#each menu.items as item}
			<div class="mb-2">
				<h4 class="font-semibold text-base-content">{item.title}</h4>
				<div class="mt-1">
					<div class="ml-1 mt-1">
						<p>{item.body}</p>

						{#if co2 && item.emission}
							<div class="w-56 mb-2">
								<Co2Bar value={item.emission} />
							</div>
						{/if}

						{#if allergen}
							<Allergen allergen={item.allergen} />
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<p>Ingen lunch idag</p>
		{/each}
	</div>
</div>
