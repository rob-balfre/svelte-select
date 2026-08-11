<script>
    import Select from '../../src/lib/Select.svelte';

    /** @type {{filterText?: string, value: any}} */
    let { filterText = $bindable(''), value = $bindable() } = $props();

    let items = $state([
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' },
    ]);

    function handleFilter(filteredItems) {
        if (filteredItems.length === 0 && filterText.length > 0) {
            items = [...items.filter((i) => !i.created), { value: filterText, label: filterText, created: true }];
        }
    }
</script>

<Select onfilter={handleFilter} bind:filterText bind:value {items} />
