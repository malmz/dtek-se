<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="mt-24">
	<p class="block text-center text-6xl font-bold mb-4 funny">{$page.status}</p>
	{#if $page.status === 404}
		<p class="text-center block w-full">
			Här vare inge sida äna :&lpar; <br />Du kan testa hos
			<a href="https://chalmers.it" class="underline">IT</a>
		</p>
	{:else if $page.error?.message}
		<p class="text-center block w-full">{$page.error.message}</p>
	{:else}
		<p class="text-center block w-full">Woops something whent wrong</p>
	{/if}
	<div class="text-center mt-4">
		<a href="/">← <span class="underline">Back home</span></a>
	</div>
</div>

<style>
	.funny {
		font-family: 'Comic Sans MS', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}
</style>
