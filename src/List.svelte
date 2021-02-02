<script>
  import { beforeUpdate, createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  import EmptyComponent from './Empty.svelte';
  import GroupItemComponent from './GroupItem.svelte';
  import ListContainerComponent from './ListContainer.svelte';
  import ItemContainerComponent from './ItemContainer.svelte';

  const dispatch = createEventDispatcher();

  export let container = undefined;

  import ItemComponent from './Item.svelte';
  import VirtualList from './VirtualList.svelte';

  export let Empty = EmptyComponent;
  export let GroupItem = GroupItemComponent;
  export let Item = ItemComponent;
  export let ItemContainer = ItemContainerComponent;
  export let ListContainer = ListContainerComponent;
  export let isVirtualList = false;
  export let items = [];
  export let getOptionLabel = (option, filterText) => {
    if (option) return option.isCreator ? `Create \"${filterText}\"` : option.label;
  };
  export let getGroupHeaderLabel = (option) => { return option.label };
  export let itemHeight = 40;
  export let hoverItemIndex = 0;
  export let selectedValue = undefined;
  export let optionIdentifier = 'value';
  export let hideEmptyState = false;
  export let noOptionsMessage = 'No options';
  export let isMulti = false;
  export let activeItemIndex = 0;
  export let filterText = '';

  let isScrollingTimer = 0;
  let isScrolling = false;
  let prev_items;
  let prev_activeItemIndex;
  let prev_selectedValue;

  $: if (container) {
    container.addEventListener('scroll', () => {
      clearTimeout(isScrollingTimer);

      isScrollingTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    }, false);
  }

  onMount(() => {
    if (items.length > 0 && !isMulti && selectedValue) {
      const _hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);

      if (_hoverItemIndex) {
        hoverItemIndex = _hoverItemIndex;
      }
    }

    scrollToActiveItem('active');
  });

  onDestroy(() => {
    // clearTimeout(isScrollingTimer);
  });

  beforeUpdate(() => {

    if (items !== prev_items && items.length > 0) {
      hoverItemIndex = 0;
    }


    // if (prev_activeItemIndex && activeItemIndex > -1) {
    //   hoverItemIndex = activeItemIndex;

    //   scrollToActiveItem('active');
    // }
    // if (prev_selectedValue && selectedValue) {
    //   scrollToActiveItem('active');

    //   if (items && !isMulti) {
    //     const hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);

    //     if (hoverItemIndex) {
    //       hoverItemIndex = hoverItemIndex;
    //     }
    //   }
    // }

    prev_items = items;
    prev_activeItemIndex = activeItemIndex;
    prev_selectedValue = selectedValue;
  });

  function itemClasses(hoverItemIndex, item, itemIndex, items, selectedValue, optionIdentifier, isMulti) {
    return `${selectedValue && !isMulti && (selectedValue[optionIdentifier] === item[optionIdentifier]) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;
  }

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

    if (selectedValue && !isMulti && selectedValue[optionIdentifier] === item[optionIdentifier]) return closeList();

    if (item.isCreator) {
      dispatch('itemCreated', filterText);
    } else {
      activeItemIndex = i;
      hoverItemIndex = i;
      handleSelect(item);
    }
  }

  function closeList() {
    dispatch('closeList');
  }

  async function updateHoverItem(increment) {
    if (isVirtualList) return;

    let isNonSelectableItem = true;

    while (isNonSelectableItem) {
      if (increment > 0 && hoverItemIndex === (items.length - 1)) {
        hoverItemIndex = 0;
      }
      else if (increment < 0 && hoverItemIndex === 0) {
        hoverItemIndex = items.length - 1;
      }
      else {
        hoverItemIndex = hoverItemIndex + increment;
      }

      isNonSelectableItem = items[hoverItemIndex].isGroupHeader && !items[hoverItemIndex].isSelectable;
    }

    await tick();

    scrollToActiveItem('hover');
  }

  function handleKeyDown(e) {
    switch (e.key) {
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
        if (selectedValue && !isMulti && selectedValue[optionIdentifier] === hoverItem[optionIdentifier]) {
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
        if (items.length === 0) break;
        if (selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return closeList();
        activeItemIndex = hoverItemIndex;
        handleSelect(items[hoverItemIndex]);
        break;
    }
  }

  function scrollToActiveItem(className) {
    if (isVirtualList || !container) return;

    let offsetBounding;
    const focusedElemBounding = container.querySelector(`.listItem .${className}`);

    if (focusedElemBounding) {
      offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
    }

    container.scrollTop -= offsetBounding;
  }

  function isItemActive(item, selectedValue, optionIdentifier) {
    return selectedValue && (selectedValue[optionIdentifier] === item[optionIdentifier]);
  };

  function isItemFirst(itemIndex) {
    return itemIndex === 0;
  };

  function isItemHover(hoverItemIndex, item, itemIndex, items) {
    return hoverItemIndex === itemIndex || items.length === 1;
  }

</script>

<svelte:window on:keydown="{handleKeyDown}" />

{#if isVirtualList}
<svelte:component this={ListContainer || ListContainerComponent}
  isVirtual=true
  bind:instance={container}>
  <VirtualList {items} {itemHeight} let:item let:i>

    <svelte:component this={ItemContainer || ItemContainerComponent}
      on:mouseover="{() => handleHover(i)}"
      on:click="{event => handleClick({item, i, event})}">
        <svelte:component
          this={Item}
          {item}
          {filterText}
          {getOptionLabel}
          isFirst="{isItemFirst(i)}"
          isActive="{isItemActive(item, selectedValue, optionIdentifier)}"
          isHover="{isItemHover(hoverItemIndex, item, i, items)}"
        />
    </svelte:component>

  </VirtualList>
</svelte:component>
{/if}

{#if !isVirtualList}
<svelte:component this={ListContainer || ListContainerComponent} bind:instance={container}>
  {#each items as item, i}
    {#if item.isGroupHeader && !item.isSelectable}
      <svelte:component
        this={GroupItem || GroupItemComponent}
        {getGroupHeaderLabel}
        {item}/>
    { :else }
      <svelte:component this={ItemContainer || ItemContainerComponent}
        on:mouseover="{() => handleHover(i)}"
        on:click="{event => handleClick({item, i, event})}">
        <svelte:component
          this={Item}
          {item}
          {filterText}
          {getOptionLabel}
          isFirst="{isItemFirst(i)}"
          isActive="{isItemActive(item, selectedValue, optionIdentifier)}"
          isHover="{isItemHover(hoverItemIndex, item, i, items)}"
        />
      </svelte:component>
    {/if}
  {:else}
    {#if !hideEmptyState}
      <svelte:component this={Empty || EmptyComponent}>
        {noOptionsMessage}
      </svelte:component>
    {/if}
  {/each}
</svelte:component>
{/if}

<style>
  .listGroupTitle {
    color: var(--groupTitleColor, #8f8f8f);
    cursor: default;
    font-size: var(--groupTitleFontSize, 12px);
    font-weight: var(--groupTitleFontWeight, 600);
    height: var(--height, 42px);
    line-height: var(--height, 42px);
    padding: var(--groupTitlePadding, 0 20px);
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    text-transform: var(--groupTitleTextTransform, uppercase);
  }

</style>
