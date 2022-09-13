<script lang="ts">
	import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	import Checkbox from './Checkbox.svelte';
	import Messages from './Messages.svelte';
	import NodeButton from './NodeButton.svelte';
	import { getNodeId, getNodeLabel } from './utils';

	export let node: UiNode;
	$: attributes = node.attributes as UiNodeInputAttributes;
</script>

{#if attributes.type === 'submit'}
	<NodeButton {node} />
{:else if attributes.type === 'hidden'}
	<input type="hidden" name={attributes.name} value={attributes.value} />
{:else if attributes.type === 'checkbox'}
	<Checkbox {node} />
{:else}
	<div class="mb-6">
		<div class="flex justify-between items-center">
			<label class="block text-sm font-medium mb-2" for={getNodeId(node)}
				>{getNodeLabel(node)}</label
			>
			{#if !attributes.required}
				<span class="block text-sm text-gray-500 mb-2">Optional</span>
			{/if}
		</div>
		<input
			id={getNodeId(node)}
			name={attributes.name}
			type={attributes.type}
			value={attributes.value ?? ''}
			disabled={attributes.disabled}
			required={attributes.required}
			placeholder={getNodeLabel(node)}
			class="w-full input invalid:border-red-400"
		/>

		<Messages messages={node.messages} />
	</div>
{/if}
