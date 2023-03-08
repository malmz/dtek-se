<script lang="ts">
	import Lunch from '$lib/components/lunch/Lunch.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Section from '$lib/components/Section.svelte';
	import { logos } from '$lib/logos';
	import type { PageData } from './$types';

	import dtek from '$lib/assets/images/logo.svg';
	// @ts-ignore
	import cpac from '$lib/assets/sponsors/cpac.png?h=48?format=webp';
	import saab from '$lib/assets/sponsors/saab.svg';
	// @ts-ignore
	import dag from '$lib/assets/images/dag.svg';
	import Test from './test.svx';

	export let data: PageData;
</script>

<svelte:head>
	<title>Dtek</title>
	<meta name="description" content="Datateknologsektionen" />
</svelte:head>

<div class="flex flex-col items-center gap-4 h-72 justify-center mb-6 mt-8 px-4">
	<img class="w-24 h-24" src={dtek} alt="Logo" />
	<div
		class="flex flex-wrap justify-center text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-300 py-2"
	>
		<span>Datateknolog</span>
		<span>sektionen</span>
	</div>
</div>

<Test />

<Section prose>
	<p>
		Det här är Dtek-portalen som innehåller användbara länkar och information om studentlivet på
		Chalmers. Här kan du läsa om kommande evenemang, ta reda på vad som finns till lunch och mycket
		mer.
	</p>
	<p>
		Datateknologssektionen är en ideell organisation vars uppdrag är att förbättra studentlivet för
		alla studenter på datavetenskaps- och ingenjörsprogrammet. Vi anordnar mottagningen för nya
		studenter, håller i fester, ger studentfeedback till Chalmers och mycket mer.
	</p>
</Section>

<Section prose>
	<div class="flex items-baseline gap-8">
		<h2>Dagens Lunch</h2>
		<a href="/lunch" class="btn btn-primary btn-sm">Se alla</a>
	</div>
	<div class="flex flex-col gap-6 not-prose divide-y-4">
		{#each data.menus as menu}
			<div class="py-4">
				<Lunch {menu} link />
			</div>
		{:else}
			<span>Kunde inte hämta lunchmenyn.</span>
		{/each}
	</div>
</Section>

<Section prose>
	<h2>Möt kommittéerna</h2>
	<p>
		Lär känna alla underbara studentstyrda kommittéer som hjälper till att förbättra kvaliteten på
		din utbildning när du studerar och tillför mycket roligt när du inte gör det det.
	</p>
	<div class="flex flex-wrap gap-2 justify-center p-8 max-w-lg mx-auto not-prose">
		{#each logos as logo}
			<img
				loading="lazy"
				decoding="async"
				width="36"
				height="36"
				class="object-contain"
				src={logo}
				alt="Committee Logo"
			/>
		{/each}
	</div>
	<div class="flex justify-center">
		<a href="/committees" class="btn btn-secondary">Läs mer</a>
	</div>
</Section>
<Section prose>
	<h2>Sponsrade av</h2>
	<div class="flex flex-col sm:flex-row gap-8 justify-center mb-8">
		<a href="https://cpacsystems.se">
			<img height="48" class="h-12 object-contain" src={cpac} alt="CPAC" />
		</a>
		<a href="https://saab.com">
			<img height="48" class="h-12 object-contain" src={saab} alt="SAAB" />
		</a>
	</div>

	<div class="flex gap-8">
		<img
			height="64"
			class="h-16 mx-auto fill-orange-500 stroke-orange-500"
			src={dag}
			alt="DAG Logga"
		/>
		<p>
			<strong>Är du ett företag</strong> som vill komma i kontakt med studenter eller en student som
			letar efter ett jobb? Se
			<a href="https://datateknologer.se/en" class="link">DAGs</a>
			hemmsida för mer info!
		</p>
	</div>
</Section>
