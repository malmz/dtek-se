<script lang="ts">
	export let title: string | null = null;
	export let prose: boolean = false;
</script>

<section class="py-8 px-4 sm:px-12">
	<div class="max-w-2xl mx-auto" class:prose>
		{#if title}
			<h2 class="text-2xl font-bold mb-2">{title}</h2>
		{/if}
		<slot />
	</div>
</section>
