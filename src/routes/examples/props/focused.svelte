<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let focused = true;

    function handleFocus() {
        focused = !focused;
    }
</script>

<p>{focused} <button on:click|stopPropagation={handleFocus}>toggle focus</button></p>

<Select {items} bind:focused />
