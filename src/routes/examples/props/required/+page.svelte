<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<form on:submit|preventDefault>
    <Select {items} required />
    <button type="submit">Submit</button>
</form>
