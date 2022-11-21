<script lang="ts">
	import type { LunchMenu } from '$lib/api/lunch';
	import Lunch from '$lib/components/Lunch.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Section>
	{#if data.menu}
		<Lunch menu={data.menu} full={true} />
	{:else}
		<p>Ingen lunch idag</p>
	{/if}
</Section>
