<script>
    import Select from '../../src/lib/Select.svelte';

    let items = $state(['one', 'two']);
</script>

<Select bind:items listOpen>
    {#snippet item({ item })}
        * {item.label} *
    {/snippet}
</Select>
