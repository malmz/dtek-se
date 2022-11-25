<script lang="ts">
	import Lunch from '$lib/components/lunch/Lunch.svelte';
	import Section from '$lib/components/Section.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Section prose>
	<h1>Veckomeny</h1>
	<p>
		Se veckans meny för {data.menu?.name} och annan cool info. Du kan också se din klimatpåverkan.
	</p>
	<div class="not-prose">
		{#if data.menu}
			<Lunch menu={data.menu} co2 allergen />
		{:else}
			<p>Ingen lunch idag</p>
		{/if}
		<h1>TODO: Lägg till veckomeny här</h1>
	</div>
</Section>
