<script>
    import Select from '$lib/Select.svelte';

    let filterText = '';

    let items = [
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' },
        { value: 3, label: 'name 3' },
        { value: 4, label: 'name 4' },
        { value: 5, label: 'name 5' },
    ];

    function handleFilter(e) {        
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = items.filter((i) => !i.created);
            items = [...prev, { value: filterText, label: filterText, created: true }];
        }
    }
    
    function handleChange(e) {
        items = items.map((i) => {
            delete i.created;
            return i;
        });
    }
</script>

<Select on:change={handleChange} on:filter={handleFilter} bind:filterText {items}>
    <div slot="item" let:item>
        {item.created ? 'Add new: ' : ''}
        {item.label}
    </div>
</Select>
