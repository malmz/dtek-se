<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<nav>
	<ul class="menu menu-compact sm:menu-normal menu-horizontal px-2">
		<li>
			<NavLink href="/news" class="">Events</NavLink>
		</li>
		<li>
			<NavLink href="/lunch" class="">Lunch</NavLink>
		</li>
		<li>
			<a href="https://wiki.dtek.se" target="_blank" rel="noreferrer"
				>Wiki<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 feather feather-external-link"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
						points="15 3 21 3 21 9"
					/><line x1="10" y1="14" x2="21" y2="3" /></svg
				>
			</a>
		</li>
		<li>
			<NavLink href="/about" class="">About</NavLink>
		</li>
	</ul>
</nav>
