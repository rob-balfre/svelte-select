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
    <Select {config} items={itemsWithGroup} listOpen={true} />
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

    :global(body) {
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        min-height: 100vh;
        background: blue;
    }
</style>
