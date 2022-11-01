<script>
    import Select from '$lib/Select.svelte';
    import Fuse from 'fuse.js';

    let items = ['one', 'two', 'three'];

    async function handleOptions(filterText) {
        const fuse = new Fuse([...items]);

        return fuse.search(filterText).map(({ item }) => item);
    }

    function reset() {
        items = [...items];
    }
</script>

<Select {items} loadOptions={handleOptions} debounceWait="0" on:select={reset} on:clear={reset} />
