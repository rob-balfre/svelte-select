<script>
  import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let container;

  import ItemComponent from './Item.svelte';
  import VirtualList from './VirtualList.svelte';

  export let Item = ItemComponent;
  export let isVirtualList = false;
  export let items = [];
  export let getOptionLabel = (option) => { if (option) return option.label };
  export let itemHeight = 40;
  export let hoverItemIndex = 0;
  export let selectedValue;
  export let start = 0;
  export let end = 0;
  export let optionIdentifier = 'value';
  export let hideEmptyState;
  export let noOptionsMessage = 'No options';
  export let getOptionString = (option) => option;
  export let activeItemIndex;
  export let isMulti;

  let isScrollingTimer = 0;
  let isScrolling = false;
  let prev_items;
  let prev_activeItemIndex;
  let prev_selectedValue;

  onMount(() => {
    if (items.length > 0 && !isMulti && selectedValue) {
      const _hoverItemIndex = items.findIndex((item) => item[optionIdentifier] === selectedValue[optionIdentifier]);

      if (_hoverItemIndex) {
        hoverItemIndex = _hoverItemIndex;
      }
    }

    scrollToActiveItem('active');


    container.addEventListener('scroll', () => {
      clearTimeout(isScrollingTimer);

      isScrollingTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    }, false);
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

  function itemClasses(hoverItemIndex, item, itemIndex, items, selectedValue, optionIdentifier) {
    return `${selectedValue && (selectedValue[optionIdentifier] === item[optionIdentifier]) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;
  }

  function handleSelect(item) {
    dispatch('itemSelected', item);
  }

  function handleHover(i) {
    if (isScrolling) return;
    hoverItemIndex = i;
  }

  function handleClick(args) {
    const { item, i, event } = args;
    event.stopPropagation();
    if (selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier]) return;
    activeItemIndex = i, hoverItemIndex = i;
    handleSelect(item);
  }

  function updateHoverItem(increment) {
    if (isVirtualList) return;

    if (increment > 0 && hoverItemIndex === (items.length - 1)) {
      hoverItemIndex = 0;
    }
    else if (increment < 0 && hoverItemIndex === 0) {
      hoverItemIndex = items.length - 1;
    }
    else {
      hoverItemIndex = hoverItemIndex + increment;
    }

    hoverItemIndex = hoverItemIndex;
    scrollToActiveItem('hover', increment);
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
      case 'Tab':
        e.preventDefault();
        if (items.length === 0) break;
        if (selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return;
        activeItemIndex = hoverItemIndex;
        handleSelect(items[hoverItemIndex]);
        break;
    }
  }

  function scrollToActiveItem(className, increment) {
    if (isVirtualList) return;

    let offsetBounding;
    const focusedElemBounding = container.querySelector(`.listItem.${className}`);

    if (focusedElemBounding) {
      offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
    }

    container.scrollTop -= offsetBounding;
  }
</script>

<svelte:window on:keydown="{handleKeyDown}" />

{#if isVirtualList}
<div class="listContainer virtualList" bind:this={container}>

  <VirtualList {items} {itemHeight} let:item let:i>
  
    <div on:mouseover="{() => handleHover(i)}" on:click="{event => handleClick({item, i, event})}"
        class="listItem {itemClasses(hoverItemIndex, item, i, items, selectedValue, optionIdentifier)}">
          <svelte:component this="{Item}" {item} {getOptionLabel}/>
    </div>
  
</VirtualList>
</div>
{/if}

{#if !isVirtualList}
<div class="listContainer" bind:this={container}>
  {#each items as item, i}
    {#if item && item.groupValue}
      <div class="listGroupTitle">
        {item.groupValue}
      </div>
    {/if}

    <div on:mouseover="{() => handleHover(i)}" on:click="{event => handleClick({item, i, event})}"
        class="listItem {itemClasses(hoverItemIndex, item, i, items, selectedValue, optionIdentifier)}">
          <svelte:component this="{Item}" {item} {getOptionLabel}/>
    </div>
  {:else}
    {#if !hideEmptyState}
      <div class="empty">{noOptionsMessage}</div>
    {/if}
  {/each}
</div>
{/if}

<style>
  .listContainer {
    box-shadow: 0 2px 3px 0 rgba(44, 62, 80, 0.24);
    border-radius: 4px;
    max-height: 250px;
    overflow-y: auto;
    background: #fff;
  }

  .virtualList {
    height: 200px;
  }

  .listGroupTitle {
    color: #8f8f8f;
    cursor: default;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    text-transform: uppercase;
  }

  .listItem {
    cursor: default;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .listItem.hover {
    background: #e7f2ff;
  }

  .listItem:active {
    background: #b9daff;
  }

  .listItem:first-child {
    border-radius: 4px 4px 0 0;
  }

  .listItem.active {
    background: #007aff;
    color: #fff;
  }

  .empty {
    text-align: center;
    padding: 20px 0;
    color: #78848F;
  }
</style>