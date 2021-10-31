<script>
    import { beforeUpdate, createEventDispatcher, onMount, tick } from 'svelte';
    import isOutOfViewport from './isOutOfViewport';

    const dispatch = createEventDispatcher();

    export let Item;
    export let VirtualList;

    export let listClass;
    export let itemClass;
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

    export let hoverItemIndex = 0;
    export let activeItemIndex = 0;

    let container = undefined;
    let isScrollingTimer = 0;
    let isScrolling = false;
    let prev_items;

    onMount(() => {
        if (items.length > 0 && !isMulti && value) {
            const _hoverItemIndex = items.findIndex(
                (item) => item[optionIdentifier] === value[optionIdentifier]
            );

            if (_hoverItemIndex) {
                hoverItemIndex = _hoverItemIndex;
            }
        }

        scrollToActiveItem('active');

        container.addEventListener(
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
        event.stopPropagation();

        if (
            value &&
            !isMulti &&
            value[optionIdentifier] === item[optionIdentifier]
        )
            return closeList();

        if (item.isCreator) {
            dispatch('itemCreated', filterText);
        } else if (isItemSelectable(item)) {
            activeItemIndex = i;
            hoverItemIndex = i;
            handleSelect(item);
        }
    }

    function closeList() {
        dispatch('closeList');
    }

    async function updateHoverItem(increment) {
        if (VirtualList) return;

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
                if (
                    value &&
                    !isMulti &&
                    value[optionIdentifier] === hoverItem[optionIdentifier]
                ) {
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
                if (
                    value &&
                    value[optionIdentifier] ===
                        items[hoverItemIndex][optionIdentifier]
                )
                    return closeList();
                activeItemIndex = hoverItemIndex;
                handleSelect(items[hoverItemIndex]);
                break;
        }
    }

    function scrollToActiveItem(className) {
        if (VirtualList || !container) return;

        let offsetBounding;
        const focusedElemBounding = container.querySelector(
            `.listItem .${className}`
        );

        if (focusedElemBounding) {
            offsetBounding =
                container.getBoundingClientRect().bottom -
                focusedElemBounding.getBoundingClientRect().bottom;
        }

        container.scrollTop -= offsetBounding;
    }

    function isItemActive(item, value, optionIdentifier) {
        return value && value[optionIdentifier] === item[optionIdentifier];
    }

    function isItemFirst(itemIndex) {
        return itemIndex === 0;
    }

    function isItemHover(hoverItemIndex, item, itemIndex, items) {
        return (
            isItemSelectable(item) &&
            (hoverItemIndex === itemIndex || items.length === 1)
        );
    }

    function isItemSelectable(item) {
        return (
            (item.isGroupHeader && item.isSelectable) ||
            item.selectable ||
            !item.hasOwnProperty('selectable')
        );
    }

    let listStyle;
    function computePlacement() {
        const { top, height, width } = parent.getBoundingClientRect();

        listStyle = '';
        listStyle += `min-width:${width}px;width:${
            listAutoWidth ? 'auto' : '100%'
        };`;

        if (
            listPlacement === 'top' ||
            (listPlacement === 'auto' && isOutOfViewport(parent).bottom)
        ) {
            listStyle += `bottom:${height + listOffset}px;`;
        } else {
            listStyle += `top:${height + listOffset}px;`;
        }
    }

    $: {
        if (parent && container) computePlacement();
    }
</script>

<svelte:window on:keydown={handleKeyDown} on:resize={computePlacement} />

<div
    class={listClass}
    class:virtual-list={VirtualList}
    bind:this={container}
    style={listStyle}>
    {#if VirtualList}
        <svelte:component
            this={VirtualList}
            {items}
            {itemHeight}
            let:item
            let:i>
            <div
                on:mouseover={() => handleHover(i)}
                on:focus={() => handleHover(i)}
                on:click={(event) => handleClick({ item, i, event })}
                class="listItem"
                tabindex="-1">
                <svelte:component
                    this={Item}
                    {item}
                    {itemClass}
                    {filterText}
                    {getOptionLabel}
                    isFirst={isItemFirst(i)}
                    isActive={isItemActive(item, value, optionIdentifier)}
                    isHover={isItemHover(hoverItemIndex, item, i, items)}
                    isSelectable={isItemSelectable(item)} />
            </div>
        </svelte:component>
    {:else}
        {#each items as item, i}
            {#if item.isGroupHeader && !item.isSelectable}
                <div class="list-group-title">{getGroupHeaderLabel(item)}</div>
            {:else}
                <div
                    on:mouseover={() => handleHover(i)}
                    on:focus={() => handleHover(i)}
                    on:click={(event) => handleClick({ item, i, event })}
                    class="listItem"
                    tabindex="-1">
                    <svelte:component
                        this={Item}
                        {item}
                        {itemClass}
                        {filterText}
                        {getOptionLabel}
                        isFirst={isItemFirst(i)}
                        isActive={isItemActive(item, value, optionIdentifier)}
                        isHover={isItemHover(hoverItemIndex, item, i, items)}
                        isSelectable={isItemSelectable(item)} />
                </div>
            {/if}
        {:else}
            {#if !hideEmptyState}
                <div class="empty">{noOptionsMessage}</div>
            {/if}
        {/each}
    {/if}
</div>
