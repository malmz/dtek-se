<script lang="ts">
	import type { LunchMenu } from '$lib/api/lunch';
	import Lunch from '$lib/Lunch.svelte';

	export let express: LunchMenu;
</script>

{#if express}
	<Lunch menu={express} />
{/if}
