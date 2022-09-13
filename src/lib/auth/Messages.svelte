<script lang="ts">
	import type { UiText } from '@ory/kratos-client';

	export let messages: UiText[];
</script>

{#each messages as message}
	<p class="text-sm text-red-600 mt-2">
		{message.text}
	</p>
{/each}
