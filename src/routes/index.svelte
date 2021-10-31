<script>
    import Select from '$lib/Select.svelte';
    import ChevronIcon from '$lib/ChevronIcon.svelte';
    import ClearIcon from '$lib/ClearIcon.svelte';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    function groupBy(item) {
        return item.group;
    }

    let value = null;
</script>

<div class="flex-it">
    <Select items={itemsWithGroup} showChevron />
</div>

<div class="flex-it">
    <Select
        {groupBy}
        items={itemsWithGroup}
        showChevron
        {ChevronIcon}
        {ClearIcon}
        isClearable
        {value}
        class="tw-select"
        listClass="tw-list"
        itemClass="tw-item" />
</div>

<div class="flex-it">
    <Select
        {groupBy}
        items={itemsWithGroup}
        showChevron
        {ChevronIcon}
        {ClearIcon}
        isClearable
        {value} />
</div>

<style global lang="postcss">
    @import '../lib/default.css';
    /* @import '../lib/tailwind.css'; */

    .flex-it {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 20px;
        display: flex;
        margin: 0 0 20px;
    }
</style>
