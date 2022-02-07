<script>
    import { beforeUpdate, createEventDispatcher, onMount, tick } from 'svelte';

    const dispatch = createEventDispatcher();

    export let Item;
    export let VirtualList;

    export let filterText;
    export let optionIdentifier;
    export let noOptionsMessage;
    export let hideEmptyState;
    export let value;
    export let isMulti;
    export let getGroupHeaderLabel;
    export let items;
    export let itemHeight;
    export let getOptionLabel;
    export let listPlacement;
    export let parent;
    export let listAutoWidth;
    export let listOffset;
    export let list = undefined;
    export let hoverItemIndex = 0;
    export let activeItemIndex = 0;
    export let suggestionMode;

    let isScrollingTimer = 0;
    let isScrolling = false;
    let prev_items;

    onMount(() => {
        if (items.length > 0 && !isMulti && value) {
            const _hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === value[optionIdentifier]);

            if (_hoverItemIndex) {
                hoverItemIndex = _hoverItemIndex;
            }
        }

        scrollToActiveItem('active');

        list.addEventListener(
            'scroll',
            () => {
                clearTimeout(isScrollingTimer);

                isScrollingTimer = setTimeout(() => {
                    isScrolling = false;
                }, 100);
            },
            false
        );
    });

    beforeUpdate(() => {
        if (!items) items = [];
        if (items !== prev_items && items.length > 0) {
            hoverItemIndex = 0;
        }

        prev_items = items;
    });

    function handleSelect(item) {
        if (item.isCreator) return;
        dispatch('itemSelected', item);
    }

    function handleHover(i) {
        if (isScrolling) return;
        hoverItemIndex = i;
    }

    function handleClick(args) {
        const { item, i, event } = args;
        // event.stopPropagation();

        if (value && !isMulti && value[optionIdentifier] === item[optionIdentifier]) return closeList();

        if (item.isCreator) {
            dispatch('itemCreated', filterText);
        } else if (isItemSelectable(item)) {
            activeItemIndex = i;
            hoverItemIndex = i;
            handleSelect(item);
        }
    }

    function closeList(args) {
        dispatch('closeList', args);
    }

    async function updateHoverItem(increment) {
        let isNonSelectableItem = true;

        while (isNonSelectableItem) {
            if (increment > 0 && hoverItemIndex === items.length - 1) {
                hoverItemIndex = 0;
            } else if (increment < 0 && hoverItemIndex === 0) {
                hoverItemIndex = items.length - 1;
            } else {
                hoverItemIndex = hoverItemIndex + increment;
            }

            isNonSelectableItem = !isItemSelectable(items[hoverItemIndex]);
        }

        await tick();

        scrollToActiveItem('hover');
    }

    function handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeList();
                break;
            case 'ArrowDown':
                e.preventDefault();
                items.length && updateHoverItem(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                items.length && updateHoverItem(-1);
                break;
            case 'Enter':
                e.preventDefault();
                if (items.length === 0) break;
                const hoverItem = items[hoverItemIndex];
                if (value && !isMulti && value[optionIdentifier] === hoverItem[optionIdentifier]) {
                    closeList();
                    break;
                }
                if (hoverItem.isCreator) {
                    dispatch('itemCreated', filterText);
                } else {
                    activeItemIndex = hoverItemIndex;
                    handleSelect(items[hoverItemIndex]);
                }
                break;
            case 'Tab':
                e.preventDefault();
                if (items.length === 0) {
                    return closeList();
                }
                if (value && value[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return closeList();
                activeItemIndex = hoverItemIndex;
                handleSelect(items[hoverItemIndex]);
                break;
        }
    }

    function scrollToActiveItem(className) {
        if (VirtualList || !list) return;

        let offsetBounding;
        const focusedElemBounding = list.querySelector(`.list-item .${className}`);

        if (focusedElemBounding) {
            offsetBounding = list.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
        }

        list.scrollTop -= offsetBounding;
    }

    function isItemActive(item, value, optionIdentifier) {
        return value && value[optionIdentifier] === item[optionIdentifier];
    }

    function isItemFirst(itemIndex) {
        return itemIndex === 0;
    }

    function isItemHover(hoverItemIndex, item, itemIndex, items) {
        return isItemSelectable(item) && (hoverItemIndex === itemIndex || items.length === 1);
    }

    function isItemSelectable(item) {
        return (item.isGroupHeader && item.isSelectable) || item.selectable || !item.hasOwnProperty('selectable');
    }

    let listStyle;
    function computePlacement() {
        if (!parent || !list) return;

        const { top, bottom, left, height, width } = parent.getBoundingClientRect();

        let styles;

        const base = `position:fixed;left:${left}px;min-width:${width}px;width:${
            listAutoWidth ? width + 'px' : 'auto'
        };`;

        const _top = `bottom:${window.innerHeight - bottom + height + listOffset}px;`;
        const _bottom = `top:${top + height + listOffset}px;`;

        if (listPlacement === 'top') {
            styles = base + _top;
        } else if (listPlacement === 'bottom') {
            styles = base + _bottom;
        } else {
            styles = base + _bottom;

            if (bottom + listOffset + list.offsetHeight > window.innerHeight) {
                styles = base + _top;
            }
        }

        listStyle = styles;
    }

    $: if (parent && list) computePlacement();
</script>

<svelte:window on:keydown={handleKeyDown} on:scroll={computePlacement} on:resize={computePlacement} />

<div class="list" class:suggestions={suggestionMode} bind:this={list} style={listStyle} on:mousedown|preventDefault>
    {#if items.length > 0}
        {#if VirtualList}
            <svelte:component
                this={VirtualList}
                width="100%"
                height={252}
                itemCount={items.length}
                itemSize={itemHeight}
                scrollToIndex={hoverItemIndex}>
                <div
                    slot="item"
                    let:index
                    let:style
                    {style}
                    on:mouseover={() => handleHover(index)}
                    on:focus={() => handleHover(index)}
                    on:click={(event) => handleClick({ item: items[index], i: index, event })}
                    class="list-item"
                    tabindex="-1">
                    <svelte:component
                        this={Item}
                        item={items[index]}
                        {filterText}
                        {getOptionLabel}
                        isFirst={isItemFirst(index)}
                        isActive={isItemActive(items[index], value, optionIdentifier)}
                        isHover={isItemHover(hoverItemIndex, items[index], index, items)}
                        isSelectable={isItemSelectable(items[index])} />
                </div>
            </svelte:component>
        {:else}
            {#each items as item, i}
                {#if item.isGroupHeader && !item.isSelectable}
                    <div class="list-group-title">{@html getGroupHeaderLabel(item)}</div>
                {:else}
                    <div
                        on:mouseover={() => handleHover(i)}
                        on:focus={() => handleHover(i)}
                        on:click={(event) => handleClick({ item, i, event })}
                        class="list-item"
                        tabindex="-1">
                        <svelte:component
                            this={Item}
                            {item}
                            {filterText}
                            {getOptionLabel}
                            isFirst={isItemFirst(i)}
                            isActive={isItemActive(item, value, optionIdentifier)}
                            isHover={isItemHover(hoverItemIndex, item, i, items)}
                            isSelectable={isItemSelectable(item)} />
                    </div>
                {/if}
            {/each}
        {/if}
    {:else if !hideEmptyState}
        <div class="empty">{noOptionsMessage}</div>
    {/if}
</div>


<style>
    .list {
        box-shadow: var(--list-shadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));
        border-radius: var(--list-border-radius, 4px);
        max-height: var(--list-max-height, 252px);
        overflow-y: auto;
        background: var(--list-background, #fff);
        position: var(--list-position, absolute);
        z-index: var(--list-z-index, 2);
        border: var(--list-border);
        box-sizing: border-box;
    }

    .list .list-group-title {
        color: var(--group-title-color, #8f8f8f);
        cursor: default;
        font-size: var(--group-title-font-size, 12px);
        font-weight: var(--group-title-font-weight, 600);
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--group-title-padding, 0 20px);
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
        text-transform: var(--group-title-text-transform, uppercase);
    }

    .list .empty {
        text-align: var(--list-empty-text-align, center);
        padding: var(--list-empty-padding, 20px 0);
        color: var(--list-empty-color, #78848f);
    }
</style>