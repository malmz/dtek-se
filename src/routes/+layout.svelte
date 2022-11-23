<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<header class="flex flex-col items-center gap-4 h-72 justify-center mb-6 mt-8 px-4">
	<img class="w-24 h-24" src="images/logo.svg" alt="Logo" />
	<a
		href="/"
		class="flex flex-wrap justify-center text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-300 py-2"
	>
		<span>Datateknolog</span><span>sektionen</span>
	</a>
	<div class="mt-4" id="content">
		<Nav />
	</div>
</header>
<main>
	<slot />
</main>
<footer class="p-4 bg-orange-100">
	<p>Made with 🧡 by <a href="https://wiki.dtek.se/wiki/User:Cral" class="underline">Cral</a></p>
</footer>
