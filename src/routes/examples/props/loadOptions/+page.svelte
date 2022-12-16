<script>
    import Select from '$lib/Select.svelte';
    import Fuse from 'fuse.js';

    let items = ['one', 'two', 'three'];

    async function handleOptions(filterText) {
        if (filterText.length === 0) return [...items];
        
        const fuse = new Fuse([...items]);

        return fuse.search(filterText).map(({ item }) => item);
    }
</script>

<Select loadOptions={handleOptions} debounceWait="0" />
