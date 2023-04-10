<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = 'one';
</script>

<Select bind:items name="test" bind:value>
    <svelte:fragment slot="input-hidden" let:value>
        <input type="hidden" name="test" value={value.value} />
    </svelte:fragment>
</Select>
