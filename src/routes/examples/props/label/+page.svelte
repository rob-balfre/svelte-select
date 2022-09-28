<script>
    import Select from '$lib/Select.svelte';

    let collection = [
        { value: 'one', foo: 'One' },
        { value: 'two', foo: 'Two' },
        { value: 'three', foo: 'Three' },
    ];

    let value;
</script>

<Select items={collection} label="foo" bind:value />

<p>value: {value?.['foo']}</p>
