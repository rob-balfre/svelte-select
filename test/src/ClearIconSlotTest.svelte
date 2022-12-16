<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value = 'one';
</script>

<Select bind:items bind:value>
    <div slot="clear-icon">
        x
    </div>
</Select>
