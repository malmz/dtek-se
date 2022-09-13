<script lang="ts">
	import type { UiNode } from '@ory/kratos-client';
	import Messages from './Messages.svelte';
	import NodeInput from './NodeInput.svelte';
	import {
		getNodeId,
		getNodeLabel,
		isUiNodeAnchorAttributes,
		isUiNodeInputAttributes,
		isUiNodeTextAttributes
	} from './utils';

	export let node: UiNode;
</script>

{#if isUiNodeTextAttributes(node.attributes)}
	<pre><code>{node.attributes.text.text}</code></pre>
{/if}

{#if isUiNodeInputAttributes(node.attributes)}
	<NodeInput {node} />
{/if}

{#if isUiNodeAnchorAttributes(node.attributes)}
	<a href={node.attributes.href} class="btn btn-primary w-full"
		>{node.attributes.title.text}</a
	>
	<Messages messages={node.messages} />
{/if}
