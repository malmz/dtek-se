<script lang="ts">
	import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	import Messages from './Messages.svelte';
	import { getNodeId, getNodeLabel } from './utils';

	export let node: UiNode;
	$: attributes = node.attributes as UiNodeInputAttributes;
</script>

<div>
	<input
		id={getNodeId(node)}
		name={attributes.name}
		disabled={attributes.disabled}
		type="checkbox"
	/>
	<label for={getNodeId(node)}>{getNodeLabel(node)}</label>
</div>
