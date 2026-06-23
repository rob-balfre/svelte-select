<script>
    import Select from '../../src/lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
    ];
</script>

<Select {items} multiple value={[items[0]]}>
    <div slot="multi-clear-icon">❌</div>
</Select>
