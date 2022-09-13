<script lang="ts">
	import type { UiNode, UiNodeTextAttributes } from '@ory/kratos-client';

	export let node: UiNode;
	$: attributes = node.attributes as UiNodeTextAttributes;
</script>

<pre><code>{attributes.text.text}</code></pre>
