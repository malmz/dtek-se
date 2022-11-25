<script lang="ts">
	import type { LunchMenuItem } from '$lib/api/types';

	export let allergen: LunchMenuItem['allergen'];
</script>

{#if allergen.length}
	<div class="flex gap-1">
		{#each allergen as a}
			<img class="h-4 w-4" src={a.imageUrl} alt={a.code} />
		{/each}
	</div>
{/if}
