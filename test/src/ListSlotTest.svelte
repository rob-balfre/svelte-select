<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = 'one';
</script>

<Select bind:items bind:value listOpen>
    <svelte:fragment slot="list" let:filteredItems>
        {#each filteredItems as item}
            {item.label}
        {/each}
    </svelte:fragment>
</Select>
