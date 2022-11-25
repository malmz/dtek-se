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
			<NavLink href="https://wiki.dtek.se" class="">Wiki</NavLink>
		</li>
		<li>
			<NavLink href="/about" class="">About</NavLink>
		</li>
	</ul>
</nav>
