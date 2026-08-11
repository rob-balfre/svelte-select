<script>
    import Select from '$lib/Select.svelte';

    let items = [];
</script>

<Select {items}>
    {#snippet empty()}
        <div>Nothing to see here...</div>
    {/snippet}
</Select>

<style>
    div {
        padding: 10px;
        text-align: center;
    }
</style>
