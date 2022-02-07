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

    // function getResults() {
    //     let prom = new Promise();
    //     setTimeout(() => {
    //         console.log('YO YO YO');
    //         return prom.resolve(['foo', 'boo', 'fee']);
    //     }, 300)

    //     return prom;
    // }

    function getResults() {
        return Promise.resolve(['foo', 'boo', 'fee']);
    }

    let value = null;

    let justValue;
</script>

<form>
    <Select loadOptions={getResults} bind:value />
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
</style>
