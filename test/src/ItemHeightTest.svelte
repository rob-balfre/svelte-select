<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
</script>

<Select bind:items listOpen --item-height="50px" />