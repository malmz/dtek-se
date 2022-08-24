<script lang="ts">
	import type { LunchMenu } from '$lib/api/lunch';
	import Lunch from '$lib/Lunch.svelte';

	export let menus: LunchMenu[] = [];
</script>

{#each menus as menu}
	<Lunch menu={menu} />
{/each}
