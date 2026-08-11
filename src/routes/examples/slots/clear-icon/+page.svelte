<script>
    import Select from '$lib/Select.svelte';

    const items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<Select {items}>
    {#snippet clearIcon()}
        <div>❌</div>
    {/snippet}
</Select>

<style>
    div {
        cursor: default;
    }
</style>
