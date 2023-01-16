<script>
    import Select from '$lib/Select.svelte';

    let filterText = '';

    let items = [
        { id: 1, label: 'name 1' },
        { id: 2, label: 'name 2' },
        { id: 3, label: 'name 3' },
        { id: 4, label: 'name 4' },
        { id: 5, label: 'name 5' },
    ];

    function handleFilter(e) {
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = items.filter((i) => !i.created);
            items = [...prev, { id: filterText, label: filterText, created: true }];
        }
    }
    
    function handleChange(e) {
        items = items.map((i) => {
            delete i.created;
            return i;
        });
    }
</script>

<Select itemId="id" on:change={handleChange} on:filter={handleFilter} bind:filterText {items}>
    <div slot="item" let:item>
        {item.created ? 'Add new: ' : ''}
        {item.label}
    </div>
</Select>
