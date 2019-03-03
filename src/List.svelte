<svelte:window on:keydown="handleKeyDown(event)"/>

<div class="listContainer" ref:container>
  {#each items as item, i}
  {#if item.groupValue}
  <div class="listGroupTitle">
    {item.groupValue}
  </div>
  {/if}

  <div on:mouseover="handleHover(i)" on:click="handleClick(item, i, event)"
       class="listItem {itemClasses(hoverItemIndex, item, i, items, selectedValue, optionIdentifier)}">
    <svelte:component this="{Item}" {item} {getOptionLabel}/>
  </div>
  {:else}
    {#if !hideEmptyState}
    <div class="empty">{noOptionsMessage}</div>
    {/if}
  {/each}
</div>

<style>
  .listContainer {
    box-shadow: 0 2px 3px 0 rgba(44, 62, 80, 0.24);
    border-radius: 4px;
    max-height: 250px;
    overflow-y: auto;
    background: #fff;
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
    pointer-events: none;
  }

  .empty {
    text-align: center;
    padding: 20px 0;
    color: #78848F;
  }
</style>

<script>
  import Item from './Item.svelte';

  export default {
    data() {
      return {
        hoverItemIndex: 0,
        optionIdentifier: 'value',
        items: [],
        Item,
        selectedValue: undefined,
        getOptionLabel: (option) => option.label,
        noOptionsMessage: 'No options'
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
      handleClick(item, i, event) {
        event.stopPropagation();

        const {optionIdentifier, selectedValue} = this.get();
        if(selectedValue && selectedValue[optionIdentifier] === item[optionIdentifier]) return;

        this.set({activeItemIndex: i, hoverItemIndex: i});
        this.handleSelect(item);
      },
      updateHoverItem(increment) {
        let {items, hoverItemIndex} = this.get();

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
        this.scrollToActiveItem('hover');
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

            if(selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return;

            this.set({activeItemIndex: hoverItemIndex});
            this.handleSelect(items[hoverItemIndex]);
            break;
          case 'Tab':
            e.preventDefault();

            if(selectedValue && selectedValue[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return;

            this.set({activeItemIndex: hoverItemIndex});
            this.handleSelect(items[hoverItemIndex]);
            break;
        }
      },
      scrollToActiveItem(className) {
        const {container} = this.refs;
        let offsetBounding;
        const focusedElemBounding = container.querySelector(`.listItem.${className}`);

        if (focusedElemBounding) {
          offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
        }

        container.scrollTop -= offsetBounding;
      }
    }
  }
</script>
