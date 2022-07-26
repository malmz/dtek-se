<script lang="ts">
	import type { LunchMenu } from '$lib/api/lunch';

	export let express: LunchMenu;
</script>

<div>
	{@debug express}
	<h2>Express</h2>
	{#each express.items as item}
		<h3>{item.title}</h3>
		<p>{item.body}</p>
	{/each}
</div>
