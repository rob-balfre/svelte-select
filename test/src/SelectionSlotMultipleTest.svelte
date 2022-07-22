<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = ['one', 'two'];
</script>

<Select bind:items bind:value multiple>
    <svelte:fragment slot="selection" let:selection>
        Slot: {selection}
    </svelte:fragment>
</Select>
