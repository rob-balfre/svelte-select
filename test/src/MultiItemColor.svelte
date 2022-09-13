<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
</script>

<Select multiple bind:items value="one" listOpen --multi-item-color="red" />