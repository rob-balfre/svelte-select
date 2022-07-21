<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = 'one';
</script>

<Select bind:items bind:value>
    <svelte:fragment slot="selection" let:selection>
        Slot: {selection}
    </svelte:fragment>
</Select>
