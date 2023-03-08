<script lang="ts">
	export let primary = false;
	export let secondary = false;
	export let accent = false;
	export let ghost = false;
	export let link = false;
</script>

<button
	class="btn"
	class:btn-primary={primary}
	class:btn-secondary={secondary}
	class:btn-accent={accent}
	class:btn-ghost={ghost}
	class:btn-link={link}
>
	<slot />
</button>
