<script>
    import Select from '$lib/Select.svelte';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza Pizza Pizza Pizza Pizza Pizza Pizza Pizza Pizza ', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    const suggestions = ['one', 'two', 'three'];

    // function groupBy(item) {
    //     return item.group;
    // }

    // let value = null;

    function getResults() {
        return Promise.resolve(['foo', 'boo', 'fee']);
    }

    // let value = [
    //     { value: 'pizza', label: 'Pizza', group: 'Savory' },
    //     { value: 'cake', label: 'Cake', group: 'Sweet' },
    //     { value: 'chips', label: 'Chips', group: 'Savory' },
    //     { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    // ];

    let value;

    let justValue;
    $: console.log('justValue :>> ', justValue);
    $: console.log('value :>> ', value);
</script>

<form>
    <Select bind:justValue items={itemsWithGroup} listOpen bind:value showChevron listAutoWidth={false}/>
</form>

<style>
    :global(body, input) {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
            'Helvetica Neue', sans-serif;
    }

    form {
        padding: 40px;
        display: flex;
        width: 400px;
        background: violet;
    }

    h1 {
        font-size: 12px;
    }
</style>
