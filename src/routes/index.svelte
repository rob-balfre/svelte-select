<script>
    import Select from 'svelte-select';

    import imports from 'svelte-select/presets/vanilla';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    const suggestions = ['one', 'two', 'three'];

    let value;
    let suggestion;
    
    


    // function groupBy(item) {
    //     return item.group;
    // }

    // let value = null;

    function getResults() {
        return Promise.resolve(['foo', 'boo', 'fee']);
    }
</script>

<form>
    <Select {imports} suggestions={suggestions} listOpen={true} loadOptions={getResults} bind:value filterText={suggestion}>
    </Select>
</form>

<style>
    form {
        /* height: 80px; */
        overflow: hidden;
        width: 400px;
        display: flex;
        padding: 20px;
        background: red;
    }

    h1 {
        font-size: 12px;
    }

    /* :global(body) {
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        min-height: 100vh;
        background: blue;
    } */
</style>
