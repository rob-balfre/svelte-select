<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let value = [];

    function handleClick(item) {
        value = [...value, item]
    }
</script>

<Select {items} bind:value multiple>
    <div slot="list" let:filteredItems>
        {#each filteredItems as item }
            <span on:click={() => handleClick(item)}>{item.label}</span>
        {/each}
    </div>
</Select>


<style>
    div {
        display: flex;
        flex-direction: column;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }

    span {
        height: 50px;
        display: flex;
        align-items: center;
        padding: 20px;
    }
</style>