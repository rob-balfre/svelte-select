<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];

    let value = $state([]);

    function handleClick(item) {
        if (!value) value = [item];
        else value = [...value, item];
    }
</script>

<Select {items} bind:value multiple>
    {#snippet list({ filteredItems })}
        <div>
            {#each filteredItems as item}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <span onclick={() => handleClick(item)}>{item.label}</span>
            {/each}
        </div>
    {/snippet}
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
