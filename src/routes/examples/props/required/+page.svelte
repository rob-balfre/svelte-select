<script>
    import { createBubbler, preventDefault } from 'svelte/legacy';

    const bubble = createBubbler();
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<form onsubmit={preventDefault(bubble('submit'))}>
    <Select {items} required />
    <button type="submit">Submit</button>
</form>
