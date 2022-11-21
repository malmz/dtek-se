<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/components/Avatar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="m-8">
	<a href="/" class="text-lg font-bold">&leftarrow; Home</a>
</div>

<div
	class="max-w-lg mx-auto sm:border border-black p-8 flex flex-col items-center"
>
	<div class="mb-6">
		<Avatar src={data.user.avatar ?? ''} />
	</div>

	<p class="text-xl font-bold">{data.user.name}</p>

	<!-- 	<a href={data.logoutFlow.logout_url}>Logout</a>
 -->
</div>
