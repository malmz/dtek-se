<script lang="ts">
	export let title = '';
	export let description = '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<slot />
