<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { foo: '1', label: 'One' },
        { foo: '2', label: 'Two' },
        { foo: '3', label: 'Three' },
    ];

    let value = $state('2');
</script>

<Select {items} itemId="foo" valueMode="id" bind:value />

<p>{value}</p>
