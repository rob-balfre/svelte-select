<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
</script>

<Select bind:items listOpen>
    <svelte:fragment slot="item" let:item>
        * {item.label} *
    </svelte:fragment>
</Select>
