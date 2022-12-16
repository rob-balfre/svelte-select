<script>
    import Select from '$lib/Select.svelte';

    let collection = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

</script>

<Select items={collection} placeholder="foo"  />


