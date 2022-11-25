<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Lunch from '$lib/components/lunch/Lunch.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Lunch meny</title>
	<meta name="description" content="Dagens lunch meny" />
</svelte:head>

<Section prose>
	<h1>Dagens lunch</h1>
	<p>Hitta dagens lunch för olika restauranger runt på campus</p>

	<div class="divide-y-4 not-prose">
		{#each data.menus as menu}
			<div class="py-4">
				<Lunch {menu} link />
			</div>
		{:else}
			<span>Kunde inte hämta lunchmenyn.</span>
		{/each}
	</div>
</Section>
