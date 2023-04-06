<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = 'one';
</script>

<Select bind:items name="test" bind:value>
    <svelte:fragment slot="input-hidden" let:inputName let:value>
        <input type="hidden" name={inputName} value={value.value} />
    </svelte:fragment>
</Select>
