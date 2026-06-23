<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
</script>

<Select {items} loading>
    <div slot="loading-icon">★</div>
</Select>
