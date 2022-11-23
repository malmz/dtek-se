<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Lunch from '$lib/components/Lunch.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Lunch meny</title>
	<meta name="description" content="Dagens lunch meny" />
</svelte:head>

<Section title="Dagens lunch">
	<div class="flex flex-col gap-6">
		{#each data.menus as menu}
			<Card>
				<Lunch {menu} />
			</Card>
		{:else}
			<span>Kunde inte hämta lunchmenyn.</span>
		{/each}
	</div>
</Section>
