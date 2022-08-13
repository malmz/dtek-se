
<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';

    export const load: Load = async ({status, error}) => {
		return {

			props: {
				status: status,
                error: error,
			}
		};
	};
</script>

<script lang="ts">
    export let status: number;
    export let error: Error;
</script>

<div>
    <span class="block text-center text-5xl">{status}</span>
    <span class="text-center block w-full">Woops something whent wrong</span>
    <pre>{JSON.stringify(error)}</pre>
</div>