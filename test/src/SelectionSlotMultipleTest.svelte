<script>
    import Select from '../../src/lib/Select.svelte';

    let items = $state(['one', 'two']);
    let value = $state(['one', 'two']);
</script>

<Select bind:items bind:value multiple>
    {#snippet selection({ selection, index })}
        Index: {index} Slot: {selection.label}
    {/snippet}
</Select>
