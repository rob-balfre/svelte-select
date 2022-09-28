<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One', checked: true },
        { value: 'two', label: 'Two', checked: false },
        { value: 'three', label: 'Three', checked: false },
    ];

    let value = [];
    function handleChecked(e) {
        let itemIndex = items.findIndex((item) => item.value === e.value);
        items[itemIndex].checked = !items[itemIndex].checked;
    }

    $: computeValue(items);

    function computeValue(items) {
        value = items.filter((item) => item.checked);
    }
</script>

<Select {items} multiple bind:value filterSelectedItems={false} on:clear={(e) => handleChecked(e.detail)}>
    <div class="list" slot="list" let:filteredItems>
        {#each filteredItems as item}
            <label for={item.value} on:click|preventDefault|stopPropagation={() => handleChecked(item)}>
                <input type="checkbox" id={item.value} checked={item.checked} />
                {item.label}
            </label>
        {/each}
    </div>
</Select>

<style>
    .list {
        display: flex;
        flex-direction: column;
    }

    label {
        padding: 5px;
    }

    input {
        pointer-events: none;
    }
</style>
