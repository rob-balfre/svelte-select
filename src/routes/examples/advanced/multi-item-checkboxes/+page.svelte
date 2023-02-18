<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let value = [];
    let checked = [];
    let isChecked = {};

    $: computeValue(checked);
    $: computeIsChecked(checked);

    function computeIsChecked() {
        isChecked = {};
        checked.forEach((c) => (isChecked[c] = true));
    }

    function computeValue() {
        value = checked.map((c) => items.find((i) => i.value === c));
    }

    function handleChange(e) {
        if (e.type === 'clear' && Array.isArray(e.detail)) checked = [];
        else
            checked.includes(e.detail.value)
                ? (checked = checked.filter((i) => i != e.detail.value))
                : (checked = [...checked, e.detail.value]);
    }
</script>

<Select
    {items}
    {value}
    multiple={true}
    filterSelectedItems={false}
    closeListOnChange={false}
    on:select={handleChange}
    on:clear={handleChange}>
    <div class="item" slot="item" let:item>
        <label for={item.value}>
            <input type="checkbox" id={item.value} bind:checked={isChecked[item.value]} />
            {item.label}
        </label>
    </div>
</Select>

<style>
    .item {
        pointer-events: none;
    }
</style>
