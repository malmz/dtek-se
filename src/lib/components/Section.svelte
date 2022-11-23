<script lang="ts">
	export let title: string | null = null;
</script>

<section class="py-8 px-4 sm:px-12">
	<div class="max-w-2xl mx-auto">
		{#if title}
			<h2 class="text-2xl font-bold mb-2">{title}</h2>
		{/if}
		<slot />
	</div>
</section>
