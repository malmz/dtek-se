<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a {href} {...$$restProps} class:underline={$page.url.pathname === href}><slot /></a>
