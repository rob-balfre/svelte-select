<script>
    import Select from '$lib/Select.svelte';

    import vanilla from '$lib/presets/vanilla';

    import Multi from '$lib/Multi.svelte';

    const itemsWithGroup = [
        { value: 'pizza', label: 'Pizza', group: 'Savory' },
        { value: 'cake', label: 'Cake', group: 'Sweet' },
        { value: 'chips', label: 'Chips', group: 'Savory' },
        { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
    ];

    const suggestions = ['one', 'two', 'three'];

    let value;
    let suggestion;

    let imports = {...vanilla, Multi}

    // function groupBy(item) {
    //     return item.group;
    // }

    // let value = null;

    function getResults() {
        return Promise.resolve(['foo', 'boo', 'fee']);
    }

    let justValue;

</script>

<form>
    <Select bind:justValue {imports} items={itemsWithGroup} bind:value isMulti  />
</form>

<style>
    form {
        height: 150vh;
        overflow: hidden;
        width: 400px;
        display: flex;
        padding: 20px;
        
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
