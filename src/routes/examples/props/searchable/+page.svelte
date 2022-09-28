<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let searchable = true;
</script>

<button on:click={() => searchable = !searchable}>Searchable: {searchable}</button>

<Select {items} {searchable} />

