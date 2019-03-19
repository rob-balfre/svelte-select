<svelte:window on:keydown="handleKeyDown(event)"/>

{#if isVirtualList}
<div class="listContainer virtualList" ref:container>
  <VirtualList 
    {items} 
    component={VirtualListItem} 
    {getOptionLabel}
    {itemHeight}
    on:hover="handleHover(event)"
    on:click="handleClick(event)"
    {hoverItemIndex}
    {selectedValue}
    bind:start 
    bind:end
  />
</div>
{/if}

{#if !isVirtualList}
<div class="listContainer" ref:container>
  {#each items as item, i}
    {#if item.groupValue}
      <div class="listGroupTitle">
        {item.groupValue}
      </div>
    {/if}

    <div on:mouseover="handleHover(i)" on:click="handleClick({item, i, event})"
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

<script>
  import VirtualList from './VirtualList.svelte';
  import Item from './Item.svelte';
  import VirtualListItem from './VirtualListItem.svelte';

  export default {
    components: {
      VirtualList
    },
    data() {
      return {
        isVirtualList: false,
        hoverItemIndex: 0,
        optionIdentifier: 'value',
        items: [],
        Item,
        VirtualListItem,
        selectedValue: undefined,
        getOptionLabel: (option) => { if (option) return option.label },
        noOptionsMessage: 'No options',
        getOptionString: (option) => option,
        itemHeight: 40,
        start: 0,
        end: 0,
      }
    },
    oncreate() {
      this.isScrollingTimer = 0;

      this.refs.container.addEventListener('scroll', () => {
        clearTimeout(this.isScrollingTimer);

        this.set({
          isScrolling: true
        });

        this.isScrollingTimer = setTimeout(() => {
          this.set({
            isScrolling: false
          });
        }, 100);
      }, false);
    },
    ondestroy() {
      clearTimeout(this.isScrollingTimer);
    },
    onupdate({changed, current}) {
      if (changed.items && current.items.length > 0) {
        this.set({
            hoverItemIndex: 0
        });
      }
      if (changed.activeItemIndex && current.activeItemIndex > -1) {
        this.set({
          hoverItemIndex: current.activeItemIndex,
        });

        this.scrollToActiveItem('active');
      }
      if (changed.selectedValue && current.selectedValue) {
        this.scrollToActiveItem('active');

        if (current.items && !current.isMulti) {
          const hoverItemIndex = current.items.findIndex((item) => item[current.optionIdentifier] === current.selectedValue[current.optionIdentifier]);

          if (hoverItemIndex) {
            this.set({hoverItemIndex});
          }
        }
      }
    },
    helpers: {
      itemClasses(hoverItemIndex, item, itemIndex, items, selectedValue, optionIdentifier) {
        return `${selectedValue && (selectedValue[optionIdentifier] === item[optionIdentifier]) ? 'active ' : ''}${hoverItemIndex === itemIndex || items.length === 1 ? 'hover' : ''}`;
      }
    },
    methods: {
      handleSelect(item) {
        this.fire('itemSelected', item);
      },
      handleHover(i) {
        if(this.get().isScrolling) return;
        this.set({hoverItemIndex: i});
      },
      handleClick(args) {
        const {item, i, event} = args;
        event.stopPropagation();
        const {optionIdentifier, selectedValue} = this.get();
        if(selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier]) return;
        this.set({activeItemIndex: i, hoverItemIndex: i});
        this.handleSelect(item);
      },
      updateHoverItem(increment) {
        let {items, hoverItemIndex, isVirtualList} = this.get();
        
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

        this.set({hoverItemIndex});
        this.scrollToActiveItem('hover', increment);
      },
      handleKeyDown(e) {
        const {items, hoverItemIndex, optionIdentifier, selectedValue} = this.get();

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            items.length && this.updateHoverItem(1);
            break;
          case 'ArrowUp':
            e.preventDefault();
            items.length && this.updateHoverItem(-1);
            break;
          case 'Enter':
            e.preventDefault();
            if (items.length === 0) break;
            if(selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return;
            this.set({activeItemIndex: hoverItemIndex});
            this.handleSelect(items[hoverItemIndex]);
            break;
          case 'Tab':
            e.preventDefault();

            this.set({activeItemIndex: hoverItemIndex});
            this.handleSelect(items[hoverItemIndex]);
            break;
        }
      },
      scrollToActiveItem(className, increment) {
        const {container} = this.refs;
        let {isVirtualList, start, end, hoverItemIndex, items} = this.get();
        
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
    }
  }
</script>
