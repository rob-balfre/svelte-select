<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value;
    let listOpen = true;
</script>

<Select bind:items bind:value bind:listOpen showChevron>
    <div slot="chevron">
        {#if listOpen}
            ⬆️
        {:else}
            ⬇️
        {/if}
    </div>
</Select>
