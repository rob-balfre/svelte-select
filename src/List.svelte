<script>
  import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let container;

  import VirtualList from './VirtualList.svelte';
  import Item from './Item.svelte';
  import VirtualListItem from './VirtualListItem.svelte';

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
  let isScrollingTimer = 0;
  let isScrolling = true;

  onMount(() => {
    container.addEventListener('scroll', () => {
      clearTimeout(isScrollingTimer);

      isScrollingTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    }, false);
  });

  onDestroy(() => {
    clearTimeout(isScrollingTimer);
  });

  // [svelte-upgrade warning]
  // beforeUpdate and afterUpdate handlers behave
  // differently to their v2 counterparts
  afterUpdate(() => {
    if (changed.items && current.items.length > 0) {
      hoverItemIndex = 0;
    }
    if (changed.activeItemIndex && current.activeItemIndex > -1) {
      hoverItemIndex = current.activeItemIndex;

      scrollToActiveItem('active');
    }
    if (changed.selectedValue && current.selectedValue) {
      scrollToActiveItem('active');

      if (current.items && !current.isMulti) {
        const hoverItemIndex = current.items.findIndex((item) => item[current.optionIdentifier] === current.selectedValue[current.optionIdentifier]);

        if (hoverItemIndex) {
          hoverItemIndex = hoverItemIndex;
        }
      }
    }
  });

  function itemClasses(hoverItemIndex, item, itemIndex, items, selectedValue, optionIdentifier) {
    return `${selectedValue && (selectedValue[optionIdentifier] === item[optionIdentifier]) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;
  }

  // [svelte-upgrade suggestion]
  // review these functions and remove unnecessary 'export' keywords
  export function handleSelect(item) {
    dispatch('itemSelected', item);
  }

  export function handleHover(i) {
    if(isScrolling) return;
    hoverItemIndex = i;
  }

  export function handleClick(args) {
    const {item, i, event} = args;
    event.stopPropagation();
    if(selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier]) return;
    activeItemIndex = i, hoverItemIndex = i;
    handleSelect(item);
  }

  export function updateHoverItem(increment) {
    
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

  export function handleKeyDown(e) {

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
        if(selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return;
        activeItemIndex = hoverItemIndex;
        handleSelect(items[hoverItemIndex]);
        break;
      case 'Tab':
        e.preventDefault();

        activeItemIndex = hoverItemIndex;
        handleSelect(items[hoverItemIndex]);
        break;
    }
  }

  export function scrollToActiveItem(className, increment) {
    
    if (isVirtualList) return;

    let offsetBounding;
    const focusedElemBounding = container.querySelector(`.listItem.${className}`);

    if (focusedElemBounding) {
      offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
    }

    container.scrollTop -= offsetBounding;

    // isVirtualList and scrollToActiveItem WIP...
    // if (isVirtualList & !focusedElemBounding) {
    //   const virtualContainer = container.querySelector('div').querySelector('div');

    //   if (increment > 0 && end < items.length ) {
    //     start += 1;
    //     end = start + 5;
    //   }

    //   if (end > hoverItemIndex && increment === -1) {
    //     start -= 1;
    //     end = start + 5;
    //   }

    //   if (end < hoverItemIndex && increment === -1) {
    //     start = items.length - 5;
    //     end = items.length;
    //   }

    //   if (hoverItemIndex === 0) {
    //     start = 0;
    //     end = 5;
    //   }

    //   this.set({
    //     start,
    //     end
    //   })
    // } else {
    //  container.scrollTop -= offsetBounding;
    // }
  }
</script>

<svelte:window on:keydown="{handleKeyDown}"/>

{#if isVirtualList}
<div class="listContainer virtualList" bind:this={container}>
  <VirtualList 
    {items} 
    component={VirtualListItem} 
    {getOptionLabel}
    {itemHeight}
    on:hover="{handleHover}"
    on:click="{handleClick}"
    {hoverItemIndex}
    {selectedValue}
    bind:start 
    bind:end
  />
</div>
{/if}

{#if !isVirtualList}
<div class="listContainer" bind:this={container}>
  {#each items as item, i}
    {#if item.groupValue}
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
