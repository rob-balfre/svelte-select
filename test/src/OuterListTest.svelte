<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = 'one';
</script>

<Select bind:items bind:value listOpen>
    <svelte:fragment slot="list-prepend">
        prepend
    </svelte:fragment>

    <svelte:fragment slot="list-append">
        append
    </svelte:fragment>
</Select>
