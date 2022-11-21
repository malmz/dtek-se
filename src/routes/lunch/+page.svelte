<script lang="ts">
	import Lunch from '$lib/components/Lunch.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Lunch meny</title>
	<meta name="description" content="Dagens lunch meny" />
</svelte:head>

<a href="/">← Home</a>

<Section title="Dagens lunch">
	<div class="flex flex-row flex-wrap gap-6 justify-around sm:justify-start">
		{#each data.menus as menu}
			<a href={`/lunch/${menu.id}`} class="p-3 bg-orange-100 rounded-lg">
				<Lunch {menu} />
			</a>
		{:else}
			<span>Kunde inte hämta lunchmenyn.</span>
		{/each}
	</div>
</Section>
