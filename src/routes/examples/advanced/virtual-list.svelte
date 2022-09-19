<script>
    import VirtualList from 'svelte-tiny-virtual-list';
    import { tick } from 'svelte';
    import Select from '$lib/Select.svelte';

    const items = [];

    for (let i = 0; i < 8000; i++) {
        items.push(i.toString());
    }

    let value = undefined;
    let listOpen = false;
    let activeIndex = null;
    let justValue;
    let hoverItemIndex = 0;

    function handleClick(i) {
        activeIndex = i;
        value = items[i];
        listOpen = false;
    }

    function handleHover(e) {
        hoverItemIndex = e;
    }

    async function handleListOpen() {
        if (!value) return;
        await tick();
        hoverItemIndex = activeIndex;
    }

    $: handleListOpen(listOpen);
</script>

<Select
    --list-max-height="300px"
    {items}
    bind:listOpen
    bind:value
    bind:justValue
    bind:hoverItemIndex
    on:hoverItem={(e) => handleHover(e.detail)}>
    <svelte:fragment slot="list" let:filteredItems>
        <VirtualList
            width="100%"
            height={300}
            itemCount={filteredItems.length}
            itemSize={50}
            scrollToIndex={hoverItemIndex}>
            <div
                class="item"
                class:active={activeIndex === index}
                class:hover={hoverItemIndex === index}
                slot="item"
                let:index
                let:style
                {style}
                on:click={() => handleClick(index)}
                on:focus={() => handleHover(index)}
                on:mouseover={() => handleHover(index)}>
                Item: {filteredItems[index].label}, Index: #{index}
            </div>
        </VirtualList>
    </svelte:fragment>
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
