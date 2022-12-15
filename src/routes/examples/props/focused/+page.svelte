<script>
    import Select from '$lib/Select.svelte';
    import { tick } from 'svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let focused = true;
</script>

<p>focused: {focused}</p>

<Select {items} bind:focused />
