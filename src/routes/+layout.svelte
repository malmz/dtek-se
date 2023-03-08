<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';

	import dtek from '$lib/assets/images/logo.svg';
	import { page } from '$app/stores';
</script>

<header>
	<div class="navbar bg-base-100 flex-col sm:flex-row">
		<div class="flex-1">
			{#if $page.url.pathname !== '/'}
				<a href="/" class="group btn btn-ghost normal-case text-xl gap-2">
					<img class="h-2/3" src={dtek} alt="Logo" />
					<span
						class="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-red-300 group-hover:from-orange-400 group-hover:to-red-400 transition-colors duration-200 ease-in-out"
					>
						Datateknologsektionen
					</span>
				</a>
			{/if}
		</div>

		<div class="flex-none">
			<Nav />
		</div>
	</div>
</header>

<main>
	<slot />
</main>

<footer class="footer p-10 bg-base-200 text-base-content">
	<div>
		<img width="50" height="50" src={dtek} alt="Logo" />
		<p>Datateknologsektionen<br />Chalmers tekniska högskola</p>
		<p>Made with 🧡 by <a href="https://wiki.dtek.se/wiki/User:Cral" class="link">Cral</a></p>
	</div>
	<div>
		<span class="footer-title">Tjänster</span>
		<a href="https://irc.dtek.se/">IRC</a>
		<a href="https://soundboard.dtek.se">Soundboard</a>
		<a href="https://wiki.dtek.se">Wiki</a>
		<a href="https://rooms.dtek.se">Hitta rum</a>
		<a href="https://data101.dtek.se">Data101</a>
		<a href="https://dbus.dtek.se">Boka DBus</a>
		<a href="https://dfoto.dtek.se">D-Foto Galleri</a>
	</div>
	<div>
		<span class="footer-title">kommittéer</span>
		<div class="grid grid-cols-2 gap-x-9 gap-y-2">
			<a href="/committees/styret" class="link link-hover">Styret</a>
			<a href="/committees/dns" class="link link-hover">DNS</a>
			<a href="/committees/d6" class="link link-hover">D6</a>
			<a href="/committees/delta" class="link link-hover">Delta</a>
			<a href="/committees/drust" class="link link-hover">DRust</a>
			<a href="/committees/dnollk" class="link link-hover">DNollK</a>
			<a href="/committees/dag" class="link link-hover">DAG</a>
			<a href="/committees/dhack" class="link link-hover">dHack</a>
			<a href="/committees/stat" class="link link-hover">Ståthållarämbetet</a>
			<a href="/committees/idrott" class="link link-hover">iDrott</a>
			<a href="/committees/dlude" class="link link-hover">DLude</a>
			<a href="/committees/dfoto" class="link link-hover">D-Foto</a>
			<a href="/committees/dbus" class="link link-hover">DBus</a>
			<a href="/committees/dlirium" class="link link-hover">D-Lirium</a>
			<a href="/committees/dbrus" class="link link-hover">DBrus</a>
			<a href="/committees/dmnollk" class="link link-hover">DMNollK</a>
			<a href="/committees/dkock" class="link link-hover">DKock</a>
			<a href="/committees/jamnstalld" class="link link-hover">JämnställD</a>
			<a href="/committees/bakad">Bakad</a>
			<a href="/committees/daf" class="link link-hover">DAF</a>
		</div>
	</div>
</footer>
