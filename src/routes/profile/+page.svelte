<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/Avatar.svelte';
	import type { PageData } from './$types';

	$: traits = $page.data.session.identity.traits;
	export let data: PageData;
</script>

<div class="m-8">
	<a href="/" class="text-lg font-bold">&leftarrow; Home</a>
</div>

<div
	class="max-w-lg mx-auto sm:border border-black p-8 flex flex-col items-center"
>
	<div class="mb-6">
		<Avatar src="" />
	</div>

	<p class="text-xl font-bold">{traits.name.first} {traits.name.last}</p>
	<p>{traits.email}</p>

	<a href={data.logoutFlow.logout_url}>Logout</a>
</div>
