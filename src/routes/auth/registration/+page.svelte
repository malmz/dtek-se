<script lang="ts">
	import AuthForm from '$lib/auth/AuthForm.svelte';

	import Form from '$lib/auth/Form.svelte';
	import Messages from '$lib/auth/Messages.svelte';
	import { UiNodeGroupEnum } from '@ory/kratos-client';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes/auth/register/$types';

	export let data: PageData;
	console.log(data);
</script>

<div class="flex flex-col">
	<h1 class="text-xl text-center">Register</h1>

	<AuthForm
		ui={data.flow.ui}
		only={[UiNodeGroupEnum.Password, UiNodeGroupEnum.Oidc]}
	/>
</div>
