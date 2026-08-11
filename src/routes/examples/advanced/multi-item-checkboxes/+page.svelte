<script>
    import Select from '$lib/Select.svelte';

    const items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let checked = $state([]);
    let isChecked = $state({});

    $effect(() => {
        isChecked = {};
        checked.forEach((c) => (isChecked[c] = true));
    });

    const value = $derived(checked.map((c) => items.find((i) => i.value === c)));

    function handleSelect(selection) {
        checked.includes(selection.value)
            ? (checked = checked.filter((i) => i != selection.value))
            : (checked = [...checked, selection.value]);
    }

    function handleClear(detail) {
        if (Array.isArray(detail)) checked = [];
    }
</script>

<Select
    {items}
    {value}
    multiple={true}
    filterSelectedItems={false}
    closeListOnChange={false}
    onselect={handleSelect}
    onclear={handleClear}>
    {#snippet item({ item })}
        <div class="item">
            <label for={item.value}>
                <input type="checkbox" id={item.value} bind:checked={isChecked[item.value]} />
                {item.label}
            </label>
        </div>
    {/snippet}
</Select>

<style>
    .item {
        pointer-events: none;
    }
</style>
