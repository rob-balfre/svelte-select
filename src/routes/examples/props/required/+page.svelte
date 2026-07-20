<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<form
    onsubmit={(e) => {
        e.preventDefault();
    }}>
    <Select {items} required />
    <button type="submit">Submit</button>
</form>
