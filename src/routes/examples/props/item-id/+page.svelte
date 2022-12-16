<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { foo: '1', label: 'One' },
        { foo: '2', label: 'Two' },
        { foo: '3', label: 'Three' },
    ];

    let justValue;
</script>

<Select {items} itemId="foo" bind:justValue />

<p>{justValue}</p>