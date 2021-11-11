<script>
    import Select from '$lib/Select.svelte';

    import config from '$lib/presets/vanilla';
    import SuggestionHeader from '$lib/SuggestionHeader.svelte';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    const suggestions = ['one', 'two', 'three'];

    let value;
    let suggestion;

    async function setSuggestion(e) {
        suggestion = e.detail.value;
        
        value = null;
    }


    // function groupBy(item) {
    //     return item.group;
    // }

    // let value = null;

    function getResults() {
        return Promise.resolve(['foo', 'boo', 'fee']);
    }
</script>

<form>
    <Select {config} suggestions={suggestions} listOpen={true} loadOptions={getResults} on:select={setSuggestion} bind:value filterText={suggestion}>
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
