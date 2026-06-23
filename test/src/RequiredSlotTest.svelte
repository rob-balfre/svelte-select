<script>
    import Select from '../../src/lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
    ];
</script>

<Select {items} required>
    <div class="custom-required" slot="required">REQUIRED</div>
</Select>
