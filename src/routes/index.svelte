
<svelte:head>
	<title>Dtek</title>
	<meta name="description" content="Datateknologsektionen" />
</svelte:head>

<script lang="ts">
	import Committees from '$lib/Committees.svelte';
	import Lunch from '$lib/Lunch.svelte';
	
	import type { LunchMenu } from '$lib/api/lunch';

	export let menus: LunchMenu[] = [];
</script>



<section class="flex flex-col items-center gap-4 h-72 justify-center mb-6 mt-8 px-4">
	<img class="w-24 h-24" src="images/logo.svg" alt="Logo" />
	<h1
		class="flex flex-wrap justify-center text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-300 py-2"
	>
		<span>Datateknolog</span><span>sektionen</span>
	</h1>
	<div>
		<nav>
			<a href="/news/create">Compose news</a>
		</nav>
	</div>
</section>

<!-- <section class="max-w-3xl mx-auto space-y-10 px-4">
	<p class="lg:text-xl">
		Det här är Dtek-portalen som innehåller användbara länkar och information om studentlivet på
		chalmers. Här kan du läsa om kommande evenemang, ta reda på vad som finns till lunch och mycket
		mer.
	</p>
	<p class="lg:text-xl">
		Datateknologssektionen är en ideell organisation vars uppdrag är att förbättra studentlivet för
		alla studenter på datavetenskaps- och ingenjörsprogrammet. Vi anordnar mottagningen för nya
		studenter, håller i fester, ger studentfeedback till Chalmers och mycket mer.
	</p>
</section> -->

<section>
	<div class="max-w-3xl mx-auto">
		<h1 class="text-2xl font-bold mb-4">Dagens Lunch</h1>
		<div class="flex flex-wrap gap-6">
			{#each menus as menu}
				<Lunch menu={menu} />
			{:else}
				<span>Kunde inte hämta lunchmenyn.</span>
			{/each}
		</div>
	</div>
</section>

<section class="py-8 mt-24">
	<Committees />
</section>

<section class="py-8 space-y-8">
	<div class="max-w-3xl mx-auto">
		<h2 class="text-2xl font-bold mb-12 text-center">Sponsrade av</h2>
		<div class="flex justify-center">
			<img class="h-12" src="images/cpac.png" alt="CPAC" />
		</div>
	</div>
	<div class="max-w-3xl mx-auto">
		<img class="w-52 mx-auto" src="images/DAG_logga.webp" alt="DAG Logga" />
		<p>
			<strong>Are you a company</strong> looking to get in contact with students or a student looking
			for job offerings? Check out DAG for more info!
		</p>
	</div>
</section>
