<script lang="ts">
	import Lunch from '$lib/components/Lunch.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Section from '$lib/components/Section.svelte';
	import { logos } from '$lib/logos';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Dtek</title>
	<meta name="description" content="Datateknologsektionen" />
</svelte:head>

<!-- <header>
	<nav class="flex justify-end px-8 pt-8">
		{#if data.tokens}
			<a href="/profile" class="text-lg font-bold">Profile &rightarrow;</a>
		{:else}
			<a href="/auth/sign-in" class="text-lg font-bold">Login &rightarrow;</a>
		{/if}
	</nav>
</header> -->

<Section>
	<div class="space-y-4">
		<p class="lg:text-xl">
			Det här är Dtek-portalen som innehåller användbara länkar och information om studentlivet på
			Chalmers. Här kan du läsa om kommande evenemang, ta reda på vad som finns till lunch och
			mycket mer.
		</p>
		<p class="lg:text-xl">
			Datateknologssektionen är en ideell organisation vars uppdrag är att förbättra studentlivet
			för alla studenter på datavetenskaps- och ingenjörsprogrammet. Vi anordnar mottagningen för
			nya studenter, håller i fester, ger studentfeedback till Chalmers och mycket mer.
		</p>
	</div>
</Section>

<Section title="Dagens Lunch">
	<div class="flex flex-col gap-6">
		{#each data.menus as menu}
			<a href={`/lunch/${menu.id}`} class="p-3 bg-zinc-100 rounded-lg">
				<Lunch {menu} />
			</a>
		{:else}
			<span>Kunde inte hämta lunchmenyn.</span>
		{/each}
	</div>
</Section>

<Section title="Möt kommittérna">
	<p>
		Lär känna alla underbara studentstyrda kommittéer som hjälper till att förbättra kvaliteten på
		din utbildning när du studerar och tillför mycket roligt när du inte gör det det.
	</p>
	<div class="flex flex-wrap gap-2 justify-center p-8 max-w-lg mx-auto">
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
		<a href="/committees" class="bg-teal-200 px-4 py-2 rounded-full">Läs mer</a>
	</div>
</Section>

<Section title="Sponsrade av">
	<div class="flex flex-col gap-12 mt-6">
		<div class="flex flex-col sm:flex-row gap-8 justify-center">
			<img height="48" class="h-12 object-contain" src="images/cpac.png" alt="CPAC" />
			<img height="48" class="h-12 object-contain" src="images/saab.svg" alt="SAAB" />
		</div>
		<div class="space-y-4 bg-orange-100 p-2 rounded-lg">
			<img class="h-16 mx-auto" src="images/DAG_logga.webp" alt="DAG Logga" />
			<p>
				<strong>Are you a company</strong> looking to get in contact with students or a student
				looking for job offerings? Check out
				<a href="https://datateknologer.se/en" class="text-teal-700 font-semibold underline">DAG</a>
				for more info!
			</p>
		</div>
	</div>
</Section>
