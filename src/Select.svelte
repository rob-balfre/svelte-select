<script>
  import {
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    onMount,
    tick
  } from "svelte";
  import ClearComponent from "./Clear.svelte";
  import ContainerComponent from "./Container.svelte";
  import IndicatorComponent from "./Indicator.svelte";
  import InputComponent from "./Input.svelte";
  import ItemComponent from "./Item.svelte";
  import List from "./List.svelte";
  import MultiSelectionComponent from "./MultiSelection.svelte";
  import SelectionComponent from "./Selection.svelte";
  import SelectionContainerComponent from "./SelectionContainer.svelte";
  import SpinnerComponent from "./Spinner.svelte";
  import isOutOfViewport from "./utils/isOutOfViewport";
  import debounce from "./utils/debounce";

  const dispatch = createEventDispatcher();
  export let container = undefined;
  export let input = undefined;
  export let Clear = ClearComponent;
  export let Container = ContainerComponent;
  export let Empty = undefined;
  export let GroupItem = undefined;
  export let Indicator = IndicatorComponent;
  export let Input = InputComponent;
  export let Item = ItemComponent;
  export let ItemContainer = undefined;
  export let ListContainer = undefined;
  export let MultiSelection = MultiSelectionComponent;
  export let Selection = SelectionComponent;
  export let SelectionContainer = SelectionContainerComponent;
  export let Spinner = SpinnerComponent;
  export let isMulti = false;
  export let multiFullItemClearable = false;
  export let isDisabled = false;
  export let isCreatable = false;
  export let isFocused = false;
  export let selectedValue = undefined;
  export let filterText = "";
  export let placeholder = "Select...";
  export let positionBuffer = 5;
  export let items = [];
  export let itemFilter = (label, filterText, option) =>
    label.toLowerCase().includes(filterText.toLowerCase());
  export let groupBy = undefined;
  export let groupFilter = groups => groups;
  export let isGroupHeaderSelectable = false;
  export let getGroupHeaderLabel = option => {
    return option.label;
  };
  export let getOptionLabel = (option, filterText) => {
    return option.isCreator ? `Create \"${filterText}\"` : option.label;
  };
  export let optionIdentifier = "value";
  export let loadOptions = undefined;
  export let hasError = false;
  export let containerStyles = "";
  export let getSelectionLabel = option => {
    if (option) return option.label;
  };

  export let createGroupHeaderItem = groupValue => {
    return {
      value: groupValue,
      label: groupValue
    };
  };

  export let createItem = filterText => {
    return {
      value: filterText,
      label: filterText
    };
  };

  export let isSearchable = true;
  export let inputStyles = "";
  export let isClearable = true;
  export let isWaiting = false;
  export let listPlacement = "auto";
  export let listOpen = false;
  export let list = undefined;
  export let isVirtualList = false;
  export let loadOptionsInterval = 300;
  export let noOptionsMessage = "No options";
  export let hideEmptyState = false;
  export let filteredItems = [];
  export let inputAttributes = {};
  export let listAutoWidth = true;
  export let itemHeight = 40;
  export let Icon = undefined;
  export let iconProps = {};
  export let showChevron = false;
  export let showIndicator = false;
  export let containerClasses = "";
  export let indicatorSvg = undefined;

  let target;
  let activeSelectedValue;
  let _items = [];
  let originalItemsClone;
  let prev_selectedValue;
  let prev_listOpen;
  let prev_filterText;
  let prev_isFocused;
  let prev_filteredItems;

  async function resetFilter() {
    await tick();
    filterText = "";
  }

  let getItemsHasInvoked = false;
  const getItems = debounce(async () => {
    getItemsHasInvoked = true;
    isWaiting = true;

    let res = await loadOptions(filterText).catch(err => {
      console.warn('svelte-select loadOptions error :>> ', err);
      dispatch("error", { type: 'loadOptions', details: err });
    });

    if (res) {
      items = [...res];
      dispatch("loaded", { items });
    } else {
      items = [];
    }

    isWaiting = false;
    isFocused = true;
    listOpen = true;
  }, loadOptionsInterval);

  $: disabled = isDisabled;

  $: updateSelectedValueDisplay(items);

  $: {
    if (typeof selectedValue === "string") {
      selectedValue = {
        [optionIdentifier]: selectedValue,
        label: selectedValue
      };
    } else if (isMulti && Array.isArray(selectedValue) && selectedValue.length > 0) {
      selectedValue = selectedValue.map(item => typeof item === "string" ? ({ value: item, label: item }) : item);
    }
  }

  $: {
    if (noOptionsMessage && list) list.$set({ noOptionsMessage });
  }

  $: showSelectedItem = selectedValue && filterText.length === 0;

  $: placeholderText = selectedValue ? "" : placeholder;

  let _inputAttributes = {};
  $: {
    _inputAttributes = Object.assign({
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: false
    }, inputAttributes);

    if (!isSearchable) {
      _inputAttributes.readonly = true;
    }
  }

  $: {
    let _filteredItems;
    let _items = items;

    if (items && items.length > 0 && typeof items[0] !== "object") {
      _items = items.map((item, index) => {
        return {
          index,
          value: item,
          label: item
        };
      });
    }

    if (loadOptions && filterText.length === 0 && originalItemsClone) {
      _filteredItems = JSON.parse(originalItemsClone);
      _items = JSON.parse(originalItemsClone);
    } else {
      _filteredItems = loadOptions
        ? filterText.length === 0
          ? []
          : _items
        : _items.filter(item => {
            let keepItem = true;

            if (isMulti && selectedValue) {
              keepItem = !selectedValue.some(value => {
                return value[optionIdentifier] === item[optionIdentifier];
              });
            }

            if (!keepItem) return false;
            if (filterText.length < 1) return true;
            return itemFilter(
              getOptionLabel(item, filterText),
              filterText,
              item
            );
          });
    }

    if (groupBy) {
      const groupValues = [];
      const groups = {};

      _filteredItems.forEach(item => {
        const groupValue = groupBy(item);

        if (!groupValues.includes(groupValue)) {
          groupValues.push(groupValue);
          groups[groupValue] = [];

          if (groupValue) {
            groups[groupValue].push(
              Object.assign(createGroupHeaderItem(groupValue, item), {
                id: groupValue,
                isGroupHeader: true,
                isSelectable: isGroupHeaderSelectable
              })
            );
          }
        }

        groups[groupValue].push(
          Object.assign({ isGroupItem: !!groupValue }, item)
        );
      });

      const sortedGroupedItems = [];

      groupFilter(groupValues).forEach(groupValue => {
        sortedGroupedItems.push(...groups[groupValue]);
      });

      filteredItems = sortedGroupedItems;
    } else {
      filteredItems = _filteredItems;
    }
  }

  beforeUpdate(() => {
    if (isMulti && selectedValue && selectedValue.length > 1) {
      checkSelectedValueForDuplicates();
    }

    if (!isMulti && selectedValue && prev_selectedValue !== selectedValue) {
      if (
        !prev_selectedValue ||
        JSON.stringify(selectedValue[optionIdentifier]) !==
          JSON.stringify(prev_selectedValue[optionIdentifier])
      ) {
        dispatch("select", selectedValue);
      }
    }

    if (
      isMulti &&
      JSON.stringify(selectedValue) !== JSON.stringify(prev_selectedValue)
    ) {
      if (checkSelectedValueForDuplicates()) {
        dispatch("select", selectedValue);
      }
    }

    if (container && listOpen !== prev_listOpen) {
      if (listOpen) {
        loadList();
      } else {
        removeList();
      }
    }

    if (filterText !== prev_filterText) {
      if (filterText.length > 0) {
        isFocused = true;
        listOpen = true;

        if (loadOptions) {
          getItems();
        } else {
          loadList();
          listOpen = true;

          if (isMulti) {
            activeSelectedValue = undefined;
          }
        }
      } else {
        setList([]);
      }

      if (list) {
        list.$set({
          filterText
        });
      }
    }

    if (isFocused !== prev_isFocused) {
      if (isFocused || listOpen) {
        handleFocus();
      } else {
        resetFilter();
        if (input) input.blur();
      }
    }

    if (prev_filteredItems !== filteredItems) {
      let _filteredItems = [...filteredItems];

      if (isCreatable && filterText) {
        const itemToCreate = createItem(filterText);
        itemToCreate.isCreator = true;

        const existingItemWithFilterValue = _filteredItems.find(item => {
          return item[optionIdentifier] === itemToCreate[optionIdentifier];
        });

        let existingSelectionWithFilterValue;

        if (selectedValue) {
          if (isMulti) {
            existingSelectionWithFilterValue = selectedValue.find(selection => {
              return (
                selection[optionIdentifier] === itemToCreate[optionIdentifier]
              );
            });
          } else if (
            selectedValue[optionIdentifier] === itemToCreate[optionIdentifier]
          ) {
            existingSelectionWithFilterValue = selectedValue;
          }
        }

        if (!existingItemWithFilterValue && !existingSelectionWithFilterValue) {
          _filteredItems = [..._filteredItems, itemToCreate];
        }
      }

      setList(_filteredItems);
    }

    prev_selectedValue = selectedValue;
    prev_listOpen = listOpen;
    prev_filterText = filterText;
    prev_isFocused = isFocused;
    prev_filteredItems = filteredItems;
  });

  function checkSelectedValueForDuplicates() {
    let noDuplicates = true;
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
      });

      if (!noDuplicates)
        selectedValue = uniqueValues;
    }
    return noDuplicates;
  }

  function findItem(selection) {
    let matchTo = selection ? selection[optionIdentifier] : selectedValue[optionIdentifier];
    return items.find(item => item[optionIdentifier] === matchTo);
  }

  function updateSelectedValueDisplay(items) {
    if (!items || items.length === 0 || items.some(item => typeof item !== "object")) return;
    if (!selectedValue || (isMulti ? selectedValue.some(selection => !selection || !selection[optionIdentifier]) : !selectedValue[optionIdentifier])) return;

    if (Array.isArray(selectedValue)) {
      selectedValue = selectedValue.map(selection => findItem(selection) || selection);
    } else {
      selectedValue = findItem() || selectedValue;
    }
  }

  async function setList(items) {
    await tick();
    if (!listOpen) return;
    if (list) return list.$set({ items });
    if (loadOptions && getItemsHasInvoked && items.length > 0) loadList();
  }

  function handleMultiItemClear(event) {
    const { detail } = event;
    const itemToRemove =
      selectedValue[detail ? detail.i : selectedValue.length - 1];

    if (selectedValue.length === 1) {
      selectedValue = undefined;
    } else {
      selectedValue = selectedValue.filter(item => {
        return item !== itemToRemove;
      });
    }

    dispatch("clear", itemToRemove);

    getPosition();
  }

  async function getPosition() {
    await tick();
    if (!target || !container) return;
    const { top, height, width } = container.getBoundingClientRect();

    target.style["min-width"] = `${width}px`;
    target.style.width = `${listAutoWidth ? "auto" : "100%"}`;
    target.style.left = "0";

    if (listPlacement === "top") {
      target.style.bottom = `${height + positionBuffer}px`;
    } else {
      target.style.top = `${height + positionBuffer}px`;
    }

    target = target;

    if (listPlacement === "auto" && isOutOfViewport(target).bottom) {
      target.style.top = ``;
      target.style.bottom = `${height + 5}px`;
    }

    target.style.visibility = "";
  }

  function handleKeyDown(e) {
    if (!isFocused) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        listOpen = true;
        activeSelectedValue = undefined;
        break;
      case "ArrowUp":
        e.preventDefault();
        listOpen = true;
        activeSelectedValue = undefined;
        break;
      case "Tab":
        if (!listOpen) isFocused = false;
        break;
      case "Backspace":
        if (!isMulti || filterText.length > 0) return;
        if (isMulti && selectedValue && selectedValue.length > 0) {
          handleMultiItemClear(
            activeSelectedValue !== undefined
              ? activeSelectedValue
              : selectedValue.length - 1
          );
          if (activeSelectedValue === 0 || activeSelectedValue === undefined)
            break;
          activeSelectedValue =
            selectedValue.length > activeSelectedValue
              ? activeSelectedValue - 1
              : undefined;
        }
        break;
      case "ArrowLeft":
        if (list) list.$set({ hoverItemIndex: -1 });
        if (!isMulti || filterText.length > 0) return;

        if (activeSelectedValue === undefined) {
          activeSelectedValue = selectedValue.length - 1;
        } else if (
          selectedValue.length > activeSelectedValue &&
          activeSelectedValue !== 0
        ) {
          activeSelectedValue -= 1;
        }
        break;
      case "ArrowRight":
        if (list) list.$set({ hoverItemIndex: -1 });
        if (
          !isMulti ||
          filterText.length > 0 ||
          activeSelectedValue === undefined
        )
          return;
        if (activeSelectedValue === selectedValue.length - 1) {
          activeSelectedValue = undefined;
        } else if (activeSelectedValue < selectedValue.length - 1) {
          activeSelectedValue += 1;
        }
        break;
    }
  }

  function handleFocus() {
    isFocused = true;
    if (input) input.focus();
  }

  function removeList() {
    resetFilter();
    activeSelectedValue = undefined;

    if (!list) return;
    list.$destroy();
    list = undefined;

    if (!target) return;
    if (target.parentNode) target.parentNode.removeChild(target);
    target = undefined;

    list = list;
    target = target;
  }

  function handleWindowClick(event) {
    if (!container) return;
    const eventTarget =
      event.path && event.path.length > 0 ? event.path[0] : event.target;
    if (container.contains(eventTarget)) return;
    isFocused = false;
    listOpen = false;
    activeSelectedValue = undefined;
    if (input) input.blur();
  }

  function handleClick() {
    if (isDisabled) return;
    isFocused = true;
    listOpen = !listOpen;
  }

  export function handleClear() {
    selectedValue = undefined;
    listOpen = false;
    dispatch("clear", selectedValue);
    handleFocus();
  }

  async function loadList() {
    await tick();
    if (target && list) return;

    const data = {
      Empty,
      GroupItem,
      Item,
      ItemContainer,
      ListContainer,
      filterText,
      optionIdentifier,
      noOptionsMessage,
      hideEmptyState,
      isVirtualList,
      selectedValue,
      isMulti,
      getGroupHeaderLabel,
      items: filteredItems,
      itemHeight
    };

    if (getOptionLabel) {
      data.getOptionLabel = getOptionLabel;
    }

    target = document.createElement("div");

    Object.assign(target.style, {
      position: "absolute",
      "z-index": 2,
      visibility: "hidden"
    });

    list = list;
    target = target;
    if (container) container.appendChild(target);

    list = new List({
      target,
      props: data
    });

    list.$on("itemSelected", event => {
      const { detail } = event;

      if (detail) {
        const item = Object.assign({}, detail);

        if (!item.isGroupHeader || item.isSelectable) {

          if (isMulti) {
            selectedValue = selectedValue ? selectedValue.concat([item]) : [item];
          } else {
            selectedValue = item;
          }

          resetFilter();
          selectedValue = selectedValue;

          setTimeout(() => {
            listOpen = false;
            activeSelectedValue = undefined;
          });
        }
      }
    });

    list.$on("itemCreated", event => {
      const { detail } = event;
      if (isMulti) {
        selectedValue = selectedValue || [];
        selectedValue = [...selectedValue, createItem(detail)];
      } else {
        selectedValue = createItem(detail);
      }

      filterText = "";
      listOpen = false;
      activeSelectedValue = undefined;
      resetFilter();
    });

    list.$on("closeList", () => {
      listOpen = false;
    });

    (list = list), (target = target);
    getPosition();
  }

  onMount(() => {
    if (isFocused) input.focus();
    if (listOpen) loadList();

    if (items && items.length > 0) {
      originalItemsClone = JSON.stringify(items);
    }
  });

  onDestroy(() => {
    removeList();
  });
</script>


<svelte:window
  on:click={handleWindowClick}
  on:keydown={handleKeyDown}
  on:resize={getPosition} />

<svelte:component
  this={Container}
  {containerClasses}
  {containerStyles}
  {hasError}
  {isMulti}
  {isDisabled}
  {isFocused}
  on:click={handleClick}
  bind:instance={container}>

  {#if Icon}
    <svelte:component this={Icon} {...iconProps} />
  {/if}

  {#if isMulti && selectedValue && selectedValue.length > 0}
    <svelte:component
      this={MultiSelection}
      {selectedValue}
      {getSelectionLabel}
      {activeSelectedValue}
      {isDisabled}
      {multiFullItemClearable}
      on:multiItemClear={handleMultiItemClear}
      on:focus={handleFocus} />
  {/if}

  <svelte:component
    this={Input}
    inputAttributes={_inputAttributes}
    {isDisabled}
    {inputStyles}
    {placeholderText}
    on:focus={handleFocus}
    bind:value={filterText}
    bind:instance={input}/>

  {#if !isMulti && showSelectedItem}
    <svelte:component this={SelectionContainer} on:focus={handleFocus}>
      <svelte:component
        this={Selection}
        item={selectedValue}
        {getSelectionLabel} />
    </svelte:component>
  {/if}

  {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
    <svelte:component this={Clear} on:click={handleClear}/>
  {/if}

  {#if showIndicator || (showChevron && !selectedValue || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem)))}
    <svelte:component this={Indicator} {indicatorSvg}/>
  {/if}

  {#if isWaiting}
    <svelte:component this={Spinner}/>
  {/if}
</svelte:component>
