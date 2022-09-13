<script lang="ts">
	import { UiNodeGroupEnum, type UiContainer } from '@ory/kratos-client';
	import Messages from './Messages.svelte';
	import Node from './Node.svelte';

	export let ui: UiContainer;
	export let only: UiNodeGroupEnum | undefined = undefined;

	$: nodes = only
		? ui.nodes.filter(
				(node) => node.group === only || node.group === UiNodeGroupEnum.Default
		  )
		: ui.nodes;
</script>

<form action={ui.action} method={ui.method}>
	{#each nodes as node}
		<Node {node} />
	{/each}
</form>
