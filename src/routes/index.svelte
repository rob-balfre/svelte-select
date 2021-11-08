<script>
    import Select from '$lib/Select.svelte';

    import config from '$lib/presets/vanilla';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    // function groupBy(item) {
    //     return item.group;
    // }

    // let value = null;

</script>

<form>
    <Select {config} items={itemsWithGroup} isMulti />
</form>