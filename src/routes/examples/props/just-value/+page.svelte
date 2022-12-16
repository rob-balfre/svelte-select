<script>
    import Select from '$lib/Select.svelte';

    let collection = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let justValue;
</script>


<Select items={collection} bind:justValue />

<p>justValue: {justValue}</p>