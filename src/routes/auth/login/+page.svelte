<script lang="ts">
	import AuthForm from '$lib/auth/AuthForm.svelte';

	import Form from '$lib/auth/Form.svelte';
	import { UiNodeGroupEnum } from '@ory/kratos-client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col">
	<h1 class="text-xl text-center">Sign in</h1>

	<AuthForm
		ui={data.flow.ui}
		only={[UiNodeGroupEnum.Password, UiNodeGroupEnum.Oidc]}
	/>

	<a href="/auth/registration" class="mt-4 hover:text-orange-400"
		>Create account</a
	>
</div>
