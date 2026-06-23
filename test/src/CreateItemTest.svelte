<script>
    import Select from '../../src/lib/Select.svelte';

    export let filterText = '';
    export let value;

    let items = [
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' },
    ];

    function handleFilter(e) {
        if (e.detail.length === 0 && filterText.length > 0) {
            items = [
                ...items.filter((i) => !i.created),
                { value: filterText, label: filterText, created: true },
            ];
        }
    }
</script>

<Select on:filter={handleFilter} bind:filterText bind:value {items} />
