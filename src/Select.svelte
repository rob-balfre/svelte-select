<svelte:window
  on:click="handleWindowClick(event)"
  on:keydown="handleKeyDown(event)"
  on:resize="getPosition()"
/>

<div
  class="{containerClasses} {hasError ? 'hasError' : ''}"
  style="{containerStyles}"
  on:click="handleClick()"
  ref:container>

  {#if isMulti && selectedValue && selectedValue.length > 0}
  <svelte:component
    this="{MultiSelection}"
    {selectedValue}
    {getSelectionLabel}
    {activeSelectedValue}
    {isDisabled}
    on:multiItemClear="handleMultiItemClear(event.i)"
    on:focus="handleFocus()"
  />
  {/if}

  <input
    ref:input
    readonly="{!isSearchable}"
    on:focus="handleFocus()"
    bind:value="filterText"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    placeholder="{placeholderText}"
    disabled="{isDisabled}"
    style="{inputStyles}"
  >

  {#if !isMulti && showSelectedItem }
  <div class="selectedItem" on:focus="handleFocus()">
    <svelte:component this="{Selection}" item={selectedValue} {getSelectionLabel}/>
  </div>
  {/if}

  {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
  <div class="clearSelect" on:click="handleClear(event)">
    <svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false"
         role="presentation">
      <path fill="currentColor"
            d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path>
    </svg>
  </div>
  {/if}

  {#if !isSearchable && !isDisabled && !isWaiting && (showSelectedItem && !isClearable || !showSelectedItem)}
  <div class="indicator">
    <svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" class="css-19bqh2r">
      <path
        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  </div>
  {/if}

  {#if isWaiting}
  <div class="spinner">
    <svg class="spinner_icon" viewBox="25 25 50 50">
      <circle class="spinner_path" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5"
              stroke-miterlimit="10"></circle>
    </svg>
  </div>
  {/if}
</div>

<style>
  .selectContainer {
    border: 1px solid #D8DBDF;
    border-radius: 3px;
    height: 44px;
    position: relative;
    display: flex;
    padding: 0 16px;
    background: #fff;
  }

  .selectContainer input {
    cursor: default;
    border: none;
    color: #3F4F5F;
    height: 42px;
    line-height: 42px;
    padding: 0 16px;
    width: 100%;
    background: transparent;
    font-size: 14px;
    letter-spacing: -0.08px;
    position: absolute;
    left: 0;
  }

  .selectContainer input::placeholder {
    color: #78848F;
  }

  .selectContainer input:focus {
    outline: none;
  }

  .selectContainer:hover {
    border-color: #b2b8bf;
  }

  .selectContainer.focused {
    border-color: #006FE8;
  }

  .selectContainer.disabled {
    background: #F6F7F8;
    border-color: #F6F7F8;
    color: #C1C6CC;
  }

  .selectContainer.disabled input::placeholder {
    color: #C1C6CC;
  }

  .selectedItem {
    line-height: 42px;
    height: 42px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    padding-right: 20px;
  }

  .selectedItem:focus {
    outline: none;
  }

  .clearSelect {
    position: absolute;
    right: 10px;
    top: 11px;
    bottom: 11px;
    width: 20px;
    color: #c5cacf;
    flex: none !important;
  }

  .clearSelect:hover {
    color: #2c3e50;
  }

  .selectContainer.focused .clearSelect {
    color: #3F4F5F;
  }

  .indicator {
    position: absolute;
    right: 10px;
    top: 11px;
    width: 20px;
    height: 20px;
    color: #c5cacf;
  }

  .indicator svg {
    display: inline-block;
    fill: currentcolor;
    line-height: 1;
    stroke: currentcolor;
    stroke-width: 0;
  }

  .spinner {
    position: absolute;
    right: 10px;
    top: 11px;
    width: 20px;
    height: 20px;
    color: #51ce6c;
    animation: rotate 0.75s linear infinite;
  }

  .spinner_icon {
    display: block;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    -webkit-transform: none;
  }

  .spinner_path {
    stroke-dasharray: 90;
    stroke-linecap: round;
  }

  .multiSelect {
    display: flex;
    padding: 0 35px 0 16px;
    height: auto;
    flex-wrap: wrap;
  }

  .multiSelect > * {
    flex: 1 1 50px;
  }

  .selectContainer.multiSelect input {
    padding: 0;
    position: relative;
  }

  .hasError {
    border: 1px solid #FF2D55;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  import List from './List.svelte';
  import Item from './Item.svelte';
  import Selection from './Selection.svelte';
  import MultiSelection from './MultiSelection.svelte';
  import isOutOfViewport from './utils/isOutOfViewport';

  export default {
    data() {
      return {
        containerStyles: undefined,
        Item,
        Selection,
        MultiSelection,
        items: [],
        filterText: '',
        placeholder: 'Select...',
        listPlacement: 'auto',
        listOpen: false,
        list: undefined,
        target: undefined,
        selectedValue: undefined,
        activeSelectedValue: undefined,
        isClearable: true,
        isMulti: false,
        isSearchable: true,
        isDisabled: false,
        isVirtualList: false,
        optionIdentifier: 'value',
        groupBy: undefined,
        loadOptions: undefined,
        loadOptionsInterval: 200,
        noOptionsMessage: 'No options',
        hideEmptyState: false,
        groupFilter: (groups) => groups,
        getOptionLabel: (option) => {
          if (option) return option.label
         },
        getSelectionLabel: (option) => option.label,
        hasError: false
      }
    },
    computed: {
      containerClasses({isMulti, isDisabled, isFocused}) {
        let classes = `selectContainer`;
        classes += isMulti ? ' multiSelect' : '';
        classes += isDisabled ? ' disabled' : '';
        classes += isFocused ? ' focused' : '';

        return classes;
      },
      showSelectedItem({selectedValue, filterText}) {
        return selectedValue && filterText.length === 0;
      },
      placeholderText({selectedValue, placeholder}) {
        return selectedValue ? '' : placeholder
      },
      filteredItems({items, filterText, groupBy, groupFilter, getOptionLabel, isMulti, selectedValue, optionIdentifier, loadOptions}) {
        if (items && items.length > 0 && typeof items[0] !== 'object') {
          items = items.map((item, index) => {
            return {
              index,
              value: item,
              label: item
            }
          })
        }


        const filteredItems = loadOptions ? items : items.filter(item => {
          let keepItem = true;

          if (isMulti && selectedValue) {
            keepItem = !selectedValue.find(({value}) => {
              return value === item[optionIdentifier]
            });
          }

          if (keepItem && filterText.length < 1) return true;
          return keepItem && getOptionLabel(item).toLowerCase().includes(filterText.toLowerCase());
        });

        if (groupBy) {
          const groupValues = [];
          const groups = {};

          filteredItems.forEach((item) => {
            const groupValue = groupBy(item);

            if (!groupValues.includes(groupValue)) {
              groupValues.push(groupValue);
              groups[groupValue] = [];
              groups[groupValue].push(Object.assign({groupValue}, item));
            } else {
              groups[groupValue].push(Object.assign({}, item));
            }

            groups[groupValue].push();
          });

          const sortedGroupedItems = [];

          groupFilter(groupValues).forEach((groupValue) => {
            sortedGroupedItems.push(...groups[groupValue]);
          });

          return sortedGroupedItems;
        }

        return filteredItems;
      }
    },
    onstate({changed, current, previous}) {
      if (changed.selectedValue && current.isMulti && current.selectedValue && current.selectedValue.length > 1) {
        this.checkSelectedValueForDuplicates();
      }

      if (!previous) return;

      if (!current.isMulti && changed.selectedValue && current.selectedValue) {    
        if (!previous.selectedValue || JSON.stringify(current.selectedValue[current.optionIdentifier]) != JSON.stringify(previous.selectedValue[current.optionIdentifier])) {
          this.fire('select', current.selectedValue)
        }
      }

      if (current.isMulti && JSON.stringify(current.selectedValue) != JSON.stringify(previous.selectedValue)) {
        if (this.checkSelectedValueForDuplicates()) {
          this.fire('select', current.selectedValue)
        }
      }

      if (changed.listOpen) {
        if (current.listOpen) {
          this.loadList();
        } else {
          this.removeList();
        }
      }
      if (changed.filterText) {
        if (current.filterText.length > 0) {
          if(current.loadOptions) {
            clearTimeout(this.loadOptionsTimeout);
            this.set({isWaiting:true});

            this.loadOptionsTimeout = setTimeout(() => {
                current.loadOptions(current.filterText).then((response) => {
                  this.setList(response)
                })
                .catch(() => {  
                  this.setList([])
                });

                this.set({
                  isWaiting:false,
                  listOpen: true
                });  
            }, current.loadOptionsInterval);

          } else {
              this.loadList();
              this.set({listOpen: true});

              if (current.isMulti) {
                this.set({activeSelectedValue: undefined})
              }
          }
        } else {
          this.setList([])
        }
      }

      if (changed.isFocused) {
        const {isFocused} = current;
        if (isFocused) {
          this.handleFocus();
        } else {
          this.set({filterText: ''});
          if (this.refs.input) this.refs.input.blur();
        }
      }

      if (changed.filteredItems && current.list) {
        this.setList(current.filteredItems)
      }
    },

    methods: {
      checkSelectedValueForDuplicates() {
        let noDuplicates = true;
        const {selectedValue, optionIdentifier} = this.get();
        if (selectedValue) {
          const ids = [];
          const uniqueValues = [];
          
          selectedValue.forEach(val => {
            if (!ids.includes(val[optionIdentifier])) {
              ids.push(val[optionIdentifier]);
              uniqueValues.push(val);
            } else {
              noDuplicates = false;
            }
          })

          this.set({selectedValue: uniqueValues})
        }
        return noDuplicates;
      },
      setList(items) {
        const {list} = this.get();
        if (list) return list.set({items})
      },
      handleMultiItemClear(i) {
        const {selectedValue} = this.get();
        selectedValue.splice(i, 1);
        this.set({selectedValue: selectedValue.length > 0 ? selectedValue : undefined});
        this.getPosition();
      },
      getPosition() {
        const {listPlacement, target} = this.get();

        if (!target) return;
        const {top, height, width} = this.refs.container.getBoundingClientRect();

        target.style['min-width'] = `${width}px`;
        target.style.width = `auto`;
        target.style.left = '0';

        if(listPlacement === 'top') {
          target.style.bottom = `${height + 5}px`;
        } else {
          target.style.top = `${height + 5}px`;
        }

        this.set({target});

        if(listPlacement === 'auto' && isOutOfViewport(target).bottom) {
          target.style.top = ``;
          target.style.bottom = `${height + 5}px`;
        }

        target.style.visibility = '';
      },
      handleKeyDown(e) {
        let {isFocused, listOpen, selectedValue, filterText, isMulti, activeSelectedValue, list} = this.get();
        if (!isFocused) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            this.set({listOpen: true, activeSelectedValue: undefined});
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.set({listOpen: true, activeSelectedValue: undefined});
            break;
          case 'Tab':
            if (!listOpen) this.set({isFocused: false});
            break;
          case 'Backspace':
            if (!isMulti || filterText.length > 0) return;
            if (isMulti && selectedValue && selectedValue.length > 0) {
              this.handleMultiItemClear(activeSelectedValue !== undefined ? activeSelectedValue : selectedValue.length - 1);
              if (activeSelectedValue === 0) break;
              this.set({activeSelectedValue: selectedValue.length > activeSelectedValue ? activeSelectedValue - 1 : undefined });
            }
            break;
          case 'ArrowLeft':
            if (list) list.set({ hoverItemIndex: -1});  
            if (!isMulti || filterText.length > 0) return;

            if (activeSelectedValue === undefined) {
              activeSelectedValue = selectedValue.length - 1;
            } else if (selectedValue.length > activeSelectedValue && activeSelectedValue !== 0) {
              activeSelectedValue -= 1
            }
            this.set({activeSelectedValue});
            break;
          case 'ArrowRight':
            if (list) list.set({ hoverItemIndex: -1});
            if (!isMulti || filterText.length > 0 || activeSelectedValue === undefined) return;
            if (activeSelectedValue === selectedValue.length - 1) {
              activeSelectedValue = undefined;
            } else if (activeSelectedValue < selectedValue.length - 1) {
              activeSelectedValue += 1;
            }
            this.set({activeSelectedValue});
            break;
        }
      },
      handleFocus() {
        this.set({isFocused: true});
        if (this.refs.input) this.refs.input.focus();
      },
      removeList() {
        let {list, target} = this.get();
        this.set({filterText: '', activeSelectedValue: undefined});

        if (!list) return;
        list.destroy();
        list = undefined;

        if (!target) return;
        target.parentNode.removeChild(target);
        target = undefined;

        this.set({list, target});
      },
      handleWindowClick(event) {
        if (!this.refs.container) return;
        if (this.refs.container.contains(event.target)) return;
        this.set({isFocused: false, listOpen: false, activeSelectedValue: undefined});
        if (this.refs.input) this.refs.input.blur();
      },
      handleClick() {
        const {isDisabled, listOpen} = this.get();
        if (isDisabled) return;
        this.set({isFocused: true, listOpen: !listOpen});
      },
      handleClear(e) {
        e.stopPropagation();
        this.set({selectedValue: undefined, listOpen: false});
        this.handleFocus();
        this.fire('clear');
      },
      loadList() {
        let {
          target,
          list, 
          Item, 
          getOptionLabel,
          optionIdentifier,
          noOptionsMessage, 
          hideEmptyState,
          items,
          selectedValue,
          filteredItems,
          isMulti,
          isVirtualList } = this.get();
        if (target && list) return;

        const data = {Item, optionIdentifier, noOptionsMessage, hideEmptyState, isVirtualList};

        if (getOptionLabel) {
          data.getOptionLabel = getOptionLabel;
        }

        target = document.createElement('div');

        Object.assign(target.style, {
          position: 'absolute',
          'z-index': 2,
          'visibility': 'hidden'
        });

        this.set({list, target});
        this.refs.container.appendChild(target);

        list = new List({
          target,
          data
        });

        if (items) {
          list.set({items: filteredItems, selectedValue, isMulti});
        }

        list.on('itemSelected', (newSelection) => {          
          if (newSelection) {
            const item = Object.assign({}, newSelection);

            if (isMulti) {
              selectedValue = selectedValue ? selectedValue.concat([item]) : [item];
            } else {
              selectedValue = item;
            }

            this.set({
              selectedValue,
              listOpen: false,
              activeSelectedValue: undefined
            });
          }
        });

        this.set({list, target});
        this.getPosition();
      }
    },
    oncreate() {
      const {isFocused,listOpen} = this.get();
      this.loadOptionsTimeout = undefined;

      if (isFocused) this.refs.input.focus();
      if (listOpen) this.loadList();
    },
    ondestroy() {
      this.removeList()
    }
  }
</script>
