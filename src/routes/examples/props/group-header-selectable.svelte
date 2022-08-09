<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    let value;
</script>

<Select {items} groupHeaderSelectable groupBy={(item) => item.group} bind:value />
<p>
    {value?.label}
</p>
