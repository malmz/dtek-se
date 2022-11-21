<script lang="ts">
	export let title: string | null = null;
</script>

<section class="py-8 px-4">
	<div class="max-w-3xl mx-auto">
		{#if title}
			<h2 class="text-2xl font-bold mb-8 sm:text-center">{title}</h2>
		{/if}
		<slot />
	</div>
</section>
