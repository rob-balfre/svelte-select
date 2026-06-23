<script>
    import Select from '../../src/lib/Select.svelte';

    let items = $state(['one', 'two']);
    let value = $state('one');
</script>

<Select bind:items bind:value listOpen>
    {#snippet list({ filteredItems })}
        {#each filteredItems as item}
            {item.label}
        {/each}
    {/snippet}
</Select>
