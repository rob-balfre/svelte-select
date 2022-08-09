<script>
    import Select from '$lib/Select.svelte';

    let items = [];
</script>

<Select {items}>
    <div slot="empty">Nothing to see here...</div>
</Select>

<style>
    div {
        padding: 10px;
        text-align: center;
    }
</style>
