<script>
    import Select from '$lib/Select.svelte';

    let items = ['One', 'Two', 'Three'];

    let collection = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<Select {items} />
<br />
<Select items={collection} />
