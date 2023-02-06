<script>
    import Select from '$lib/Select.svelte';

    let filterText = '';

    let value = null;

    let items = [
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' },
        { value: 3, label: 'name 3' },
        { value: 4, label: 'name 4' },
        { value: 5, label: 'name 5' },
    ];

    function handleFilter(e) {        
        if (value?.find(i => i.label === filterText)) return;
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

<Select on:change={handleChange} multiple on:filter={handleFilter} bind:filterText bind:value {items}>
    <div slot="item" let:item>
        {item.created ? 'Add new: ' : ''}
        {item.label}
    </div>
</Select>
