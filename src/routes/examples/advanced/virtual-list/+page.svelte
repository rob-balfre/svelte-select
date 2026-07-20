<script>
    import VirtualList from 'svelte-tiny-virtual-list';
    import { tick } from 'svelte';
    import Select from '$lib/Select.svelte';

    const items = [];

    for (let i = 0; i < 8000; i++) {
        items.push(i.toString());
    }

    let value = $state(undefined);
    let listOpen = $state(false);
    let activeIndex = $state(null);
    let hoverItemIndex = $state(0);

    function handleClick(i) {
        activeIndex = i;
        value = items[i];
        listOpen = false;
    }

    function handleHover(index) {
        hoverItemIndex = index;
    }

    async function handleListOpen() {
        if (!value) return;
        await tick();
        hoverItemIndex = activeIndex;
    }

    $effect(() => {
        if (listOpen) handleListOpen();
    });
</script>

<Select
    --list-max-height="300px"
    {items}
    bind:listOpen
    bind:value
    bind:hoverItemIndex
    onhoverItem={handleHover}>
    {#snippet list({ filteredItems })}
        {#if filteredItems.length > 0}
            <VirtualList
                width="100%"
                height={300}
                itemCount={filteredItems?.length}
                itemSize={50}
                scrollToIndex={hoverItemIndex}>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                {#snippet item({ index, style })}
                    <div
                        class="item"
                        class:active={activeIndex === index}
                        class:hover={hoverItemIndex === index}
                        {style}
                        onclick={() => handleClick(index)}
                        onfocus={() => handleHover(index)}
                        onmouseover={() => handleHover(index)}>
                        Item: {filteredItems[index].label}, Index: #{index}
                    </div>
                {/snippet}
            </VirtualList>
        {/if}
    {/snippet}
</Select>

<style>
    .item {
        height: 30px;
        display: flex;
        align-items: center;
        padding: 20px;
        cursor: default;
    }

    .item.hover {
        background: var(--item-hover-bg, #e7f2ff);
    }

    .item.active {
        background: var(--item-is-active-bg, #007aff);
        color: var(--item-is-active-color, #fff);
    }
</style>
