<script>
    import Select from '../../src/lib/Select.svelte';

    const items = [
        { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet', selectable: false },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    export let filterText;
    export let value = undefined;

    async function loadOptions() {
        return items.filter((i) => i.label.toLowerCase().includes(filterText.toLowerCase()));
    }

    const groupBy = (i) => i.group;
</script>

<Select {loadOptions} bind:filterText {groupBy} {value} />
