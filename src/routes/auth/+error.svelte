<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<span class="block text-center text-5xl">{$page.status}</span>
	<span class="text-center block w-full">Big sad no login</span>
	<pre>{JSON.stringify($page.error, undefined, 2)}</pre>
</div>
