<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    function handle(e) {
        console.log(e.detail);
    }
</script>

<Select {items} on:input={handle} />

