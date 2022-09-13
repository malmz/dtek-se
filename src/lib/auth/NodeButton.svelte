<script lang="ts">
	import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	import Messages from './Messages.svelte';
	import { getNodeId, getNodeLabel } from './utils';

	export let node: UiNode;
	$: attributes = node.attributes as UiNodeInputAttributes;
</script>

<button
	class="btn btn-primary w-full"
	name={attributes.name}
	type={attributes.type}
	value={attributes.value}
	disabled={attributes.disabled}>{getNodeLabel(node)}</button
>

<Messages messages={node.messages} />
