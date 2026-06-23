<script>
    import Select from '$lib/Select.svelte';

    let filterText = $state('');

    let items = $state([
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' },
        { value: 3, label: 'name 3' },
        { value: 4, label: 'name 4' },
        { value: 5, label: 'name 5' },
    ]);

    function handleFilter(filteredItems) {
        if (filteredItems.length === 0 && filterText.length > 0) {
            const prev = items.filter((i) => !i.created);
            items = [...prev, { value: filterText, label: filterText, created: true }];
        }
    }

    function handleChange() {
        items = items.map((i) => {
            delete i.created;
            return i;
        });
    }
</script>

<Select onchange={handleChange} onfilter={handleFilter} bind:filterText {items}>
    {#snippet item({ item })}
        <div>
            {item.created ? 'Add new: ' : ''}
            {item.label}
        </div>
    {/snippet}
</Select>
