<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let loading = true;
</script>

<button on:click={() => (loading = !loading)}>Toggle Loading</button>

<Select {items} bind:loading />
