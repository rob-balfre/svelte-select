<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let disabled = false;
</script>

<button on:click={() => disabled = !disabled}>Toggle disabled</button>

<Select {items} {disabled} />

