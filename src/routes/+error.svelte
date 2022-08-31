
<script lang="ts">
    import { page } from "$app/stores";
</script>

<div>
    <span class="block text-center text-5xl">{$page.status}</span>
    <span class="text-center block w-full">Woops something whent wrong</span>
    <pre>{JSON.stringify($page.error)}</pre>
</div>