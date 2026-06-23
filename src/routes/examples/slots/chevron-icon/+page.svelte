<script>
    import Select from '$lib/Select.svelte';

    const items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<Select {items} showChevron>
    {#snippet chevronIcon()}
        <div>⬇️</div>
    {/snippet}
</Select>
