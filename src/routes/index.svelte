<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Committees from '$lib/Committees.svelte';
</script>

<svelte:head>
	<title>Dtek</title>
	<meta name="description" content="Datateknologsektionen" />
</svelte:head>

<section class="flex flex-col items-center gap-4 h-72 justify-center mb-6 mt-8 px-4">
	<img class="w-24 h-24" src="images/logo.svg" alt="Logo" />
	<h1
		class="text-4xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-300 leading-relaxed py-2"
	>
		Datateknolog&shy;sektionen
	</h1>
</section>

<div class="bg-gradient-to-t via-white from-orange-100 pb-8">
	<section class="max-w-3xl mx-auto space-y-10 px-4">
		<p class="leading-relaxed text-xl">
			Det här är Dtek-portalen som innehåller användbara länkar och information om studentlivet på
			chalmers. Här kan du läsa om kommande evenemang, ta reda på vad som finns till lunch och
			mycket mer.
		</p>
		<p class="leading-relaxed text-xl">
			Datateknologssektionen är en ideell organisation vars uppdrag är att förbättra studentlivet
			för alla studenter på datavetenskaps- och ingenjörsprogrammet. Vi anordnar mottagningen för
			nya studenter, håller i fester, ger studentfeedback till Chalmers och mycket mer.
		</p>
	</section>
</div>

<section class="bg-orange-100 py-8">
	<Committees />
</section>

<section class="bg-orange-100 py-8">
	<div class="max-w-3xl mx-auto">
		<h2 class="text-2xl font-bold mb-12 text-center">Sponsrade av</h2>
		<div class="flex justify-center">
			<img class="h-12" src="images/cpac.png" alt="CPAC" />
		</div>
	</div>
</section>
