<script>
    import Select from '../../src/lib/Select.svelte';

    export let filterText = ''; 
    
    let items = [
        { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    let value;
</script>

<Select {items} groupBy={(item) => item.group} bind:value bind:filterText />
