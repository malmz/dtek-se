<script lang="ts">
	import type { UiContainer, UiNodeGroupEnum } from '@ory/kratos-client';
	import Form from './Form.svelte';
	import Messages from './Messages.svelte';

	export let ui: UiContainer;
	export let only: UiNodeGroupEnum[];
</script>

{#each only as group, i}
	<Form {ui} only={group} />
	{#if i !== only.length - 1}
		<div class="divider">OR</div>
	{/if}
{/each}

<Messages messages={ui.messages ?? []} />
