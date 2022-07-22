<script>
    import { beforeUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    import _Item from './Item.svelte';
    import _List from './List.svelte';
    import _ClearIcon from './ClearIcon.svelte';
    import _ChevronIcon from './ChevronIcon.svelte';
    import _LoadingIcon from './LoadingIcon.svelte';

    import _filter from '$lib/filter';
    import _getItems from '$lib/get-items';
    import _computePlacement from '$lib/compute-placement';

    export let justValue = null; // read-only

    export let Item = _Item;
    export let List = _List;
    export let filter = _filter;
    export let getItems = _getItems;
    export let computePlacement = _computePlacement;

    export let ChevronIcon = _ChevronIcon;
    export let ClearIcon = _ClearIcon;
    export let LoadingIcon = _LoadingIcon;
    export let VirtualList = null;
    export let Icon = undefined;

    export let id = null;
    export let container = undefined;
    export let input = undefined;
    export let multiple = false;
    export let multiFullItemClearable = false;
    export let isDisabled = false;
    export let isCreatable = false;
    export let isFocused = false;
    export let value = null;
    export let filterText = '';
    export let placeholder = 'Please select';
    export let placeholderAlwaysShow = false;
    export let items = null;
    export let itemFilter = (label, filterText) => `${label}`.toLowerCase().includes(filterText.toLowerCase());
    export let groupBy = undefined;
    export let groupFilter = (groups) => groups;
    export let isGroupHeaderSelectable = false;
    export const sanitiseLabel = (text) => text && `${text}`.replace(/\</gi, '&lt;');
    export let getGroupHeaderLabel = (option) => {
        return sanitiseLabel(option[labelIdentifier]) || option.id;
    };
    export let labelIdentifier = 'label';
    export let getOptionLabel = (option, filterText) => {
        if (option.isCreator) {
            filterText = sanitiseLabel(filterText);
            return `Create \"${filterText}\"`;
        } else {
            return sanitiseLabel(option[labelIdentifier]);
        }
    };
    export let optionIdentifier = 'value';
    export let loadOptions = undefined;
    export let hasError = false;
    export let containerStyles = '';
    export let getSelectionLabel = (option) => {
        if (option) return sanitiseLabel(option[labelIdentifier]);
        else return null;
    };

    export let createGroupHeaderItem = (groupValue, item) => {
        return {
            value: groupValue,
            label: groupValue,
        };
    };

    export let createItem = (filterText) => {
        return {
            value: filterText,
            label: filterText,
        };
    };

    export const getFilteredItems = () => {
        return filteredItems;
    };

    export let isSearchable = true;
    export let inputStyles = '';
    export let isClearable = true;
    export let isWaiting = false;
    export let listPlacement = 'auto';
    export let listOpen = isFocused;

    let timeout;
    export let debounce = (fn, wait = 1) => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };

    export let debounceWait = 300;
    export let noOptionsMessage = 'No options';
    export let hideEmptyState = false;
    export let inputAttributes = {};
    export let listAutoWidth = true;
    export let itemHeight = 42;
    export let iconProps = {};
    export let showChevron = false;
    export let listOffset = 5;
    export let suggestions = null;

    export { containerClasses as class };

    function addCreatableItem(_items, _filterText) {
        if (_filterText.length === 0) return _items;
        const itemToCreate = createItem(_filterText);
        if (_items[0] && _filterText === _items[0][labelIdentifier]) return _items;
        itemToCreate.isCreator = true;
        return [..._items, itemToCreate];
    }

    let containerClasses = '';
    let activeValue;
    let prev_value;
    let prev_filterText;
    let prev_multiple;
    let hoverItemIndex;

    function setValue() {
        if (typeof value === 'string') {
            let item = items.find((item) => item[optionIdentifier] === value);
            value = item || {
                [optionIdentifier]: value,
                label: value,
            };
        } else if (multiple && Array.isArray(value) && value.length > 0) {
            value = value.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));
        }
    }

    let _inputAttributes;
    function assignInputAttributes() {
        _inputAttributes = Object.assign(
            {
                autocapitalize: 'none',
                autocomplete: 'off',
                autocorrect: 'off',
                spellcheck: false,
                tabindex: 0,
                type: 'text',
                'aria-autocomplete': 'list',
            },
            inputAttributes
        );

        if (id) {
            _inputAttributes['id'] = id;
        }

        if (!isSearchable) {
            _inputAttributes['readonly'] = true;
        }
    }

    function convertStringItemsToObjects(_items) {
        return _items.map((item, index) => {
            return {
                index,
                value: item,
                label: `${item}`,
            };
        });
    }

    function filterGroupedItems(_items) {
        const groupValues = [];
        const groups = {};

        _items.forEach((item) => {
            const groupValue = groupBy(item);

            if (!groupValues.includes(groupValue)) {
                groupValues.push(groupValue);
                groups[groupValue] = [];

                if (groupValue) {
                    groups[groupValue].push(
                        Object.assign(createGroupHeaderItem(groupValue, item), {
                            id: groupValue,
                            isGroupHeader: true,
                            isSelectable: isGroupHeaderSelectable,
                        })
                    );
                }
            }

            groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
        });

        const sortedGroupedItems = [];

        groupFilter(groupValues).forEach((groupValue) => {
            if (groups[groupValue]) sortedGroupedItems.push(...groups[groupValue]);
        });

        return sortedGroupedItems;
    }

    function dispatchSelectedItem() {
        if (multiple) {
            if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
                if (checkValueForDuplicates()) {
                    dispatch('change', value);
                }
            }
            return;
        }

        if (!prev_value || JSON.stringify(value[optionIdentifier]) !== JSON.stringify(prev_value[optionIdentifier])) {
            dispatch('change', value);
        }
    }

    function setupMulti() {
        if (value) {
            if (Array.isArray(value)) {
                value = [...value];
            } else {
                value = [value];
            }
        }
    }

    function setupSingle() {
        if (value) value = null;
    }

    $: if ((items, value)) setValue();
    $: if (inputAttributes || !isSearchable) assignInputAttributes();
    $: if (multiple) setupMulti();
    $: if (prev_multiple && !multiple) setupSingle();
    $: if (multiple && value && value.length > 1) checkValueForDuplicates();
    $: if (value) dispatchSelectedItem();
    $: if (!value && multiple && prev_value) dispatch('change', value);
    $: if (listOpen && input) handleFocus();
    $: if (!isFocused && input) listOpen = false;
    $: if (filterText !== prev_filterText) setupFilterText();
    $: if (!listOpen && listApp) destroyList();

    function setupFilterText() {
        if (filterText.length === 0) return;

        isFocused = true;
        listOpen = true;

        if (loadOptions) {
            debounce(async function () {
                isWaiting = true;
                let res = await getItems({
                    dispatch,
                    loadOptions,
                    convertStringItemsToObjects,
                    filterText,
                });

                if (res) {
                    isWaiting = res.isWaiting;
                    isFocused = res.isFocused;
                    listOpen = res.listOpen;
                    filteredItems = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;
                } else {
                    isWaiting = false;
                    isFocused = true;
                    listOpen = true;
                }

                if (isCreatable) {
                    filteredItems = addCreatableItem(filteredItems, filterText);
                }
            }, debounceWait);
        } else {
            listOpen = true;

            if (multiple) {
                activeValue = undefined;
            }
        }
    }

    $: hasValue = multiple ? value && value.length > 0 : value;
    $: _showChevron = showChevron && ChevronIcon;
    $: showSelectedItem = hasValue && (filterText.length === 0 || multiple);
    $: showClear = showSelectedItem && isClearable && !isDisabled && !isWaiting;
    $: placeholderText = placeholderAlwaysShow && multiple ? placeholder : value ? '' : placeholder;
    $: showMultiSelect = multiple && value && value.length > 0;
    $: suggestionMode = suggestions && filterText.length === 0;
    $: ariaSelection = value ? handleAriaSelection(multiple) : '';
    $: ariaContext = handleAriaContent({ filteredItems, hoverItemIndex, isFocused, listOpen });
    $: updateValueDisplay(items);
    $: if (multiple) justValue = value ? value.map((item) => item[optionIdentifier]) : null;
    $: if (!multiple) justValue = value ? value[optionIdentifier] : value;
    $: if (!multiple && prev_value && !value) dispatch('change', value);

    $: listProps = {
        Item,
        filterText,
        optionIdentifier,
        noOptionsMessage,
        hideEmptyState,
        VirtualList,
        value,
        multiple,
        getGroupHeaderLabel,
        items: filteredItems,
        itemHeight,
        getOptionLabel,
        listPlacement,
        parent: container,
        listAutoWidth,
        listOffset,
        suggestionMode,
        computePlacement,
    };

    $: filteredItems = filter({
        loadOptions,
        filterText,
        items: suggestionMode ? suggestions : items,
        multiple,
        value,
        optionIdentifier,
        groupBy,
        isCreatable,
        itemFilter,
        convertStringItemsToObjects,
        filterGroupedItems,
        addCreatableItem,
        getOptionLabel,
    });

    beforeUpdate(async () => {
        prev_value = value;
        prev_filterText = filterText;
        prev_multiple = multiple;
    });

    function checkValueForDuplicates() {
        let noDuplicates = true;
        if (value) {
            const ids = [];
            const uniqueValues = [];

            value.forEach((val) => {
                if (!ids.includes(val[optionIdentifier])) {
                    ids.push(val[optionIdentifier]);
                    uniqueValues.push(val);
                } else {
                    noDuplicates = false;
                }
            });

            if (!noDuplicates) value = uniqueValues;
        }
        return noDuplicates;
    }

    function findItem(selection) {
        let matchTo = selection ? selection[optionIdentifier] : value[optionIdentifier];
        return items.find((item) => item[optionIdentifier] === matchTo);
    }

    function updateValueDisplay(items) {
        if (!items || items.length === 0 || items.some((item) => typeof item !== 'object')) return;
        if (
            !value ||
            (multiple
                ? value.some((selection) => !selection || !selection[optionIdentifier])
                : !value[optionIdentifier])
        )
            return;

        if (Array.isArray(value)) {
            value = value.map((selection) => findItem(selection) || selection);
        } else {
            value = findItem() || value;
        }
    }

    function handleMultiItemClear(i) {
        const itemToRemove = value[i];

        if (value.length === 1) {
            value = undefined;
        } else {
            value = value.filter((item) => {
                return item !== itemToRemove;
            });
        }

        dispatch('clear', itemToRemove);
    }

    function handleKeyDown(e) {
        if (!isFocused) return;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!listOpen) {
                    listOpen = true;
                    activeValue = undefined;
                    e.stopPropagation();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                listOpen = true;
                activeValue = undefined;
                break;
            case 'Tab':
                if (!listOpen) isFocused = false;
                break;
            case 'Backspace':
                if (!multiple || filterText.length > 0) return;
                if (multiple && value && value.length > 0) {
                    handleMultiItemClear(activeValue !== undefined ? activeValue : value.length - 1);
                    if (activeValue === 0 || activeValue === undefined) break;
                    activeValue = value.length > activeValue ? activeValue - 1 : undefined;
                }
                break;
            case 'ArrowLeft':
                if (!multiple || filterText.length > 0) return;
                if (activeValue === undefined) {
                    activeValue = value.length - 1;
                } else if (value.length > activeValue && activeValue !== 0) {
                    activeValue -= 1;
                }
                break;
            case 'ArrowRight':
                if (!multiple || filterText.length > 0 || activeValue === undefined) return;
                if (activeValue === value.length - 1) {
                    activeValue = undefined;
                } else if (activeValue < value.length - 1) {
                    activeValue += 1;
                }
                break;
        }
    }

    function handleFocus(e) {
        dispatch('focus', e);

        isFocused = true;
        if (e) input.focus();
    }

    function handleBlur(e) {
        dispatch('blur', e);
        listOpen = false;
        isFocused = false;
        activeValue = undefined;
        input.blur();
    }

    function handleClick() {
        if (isDisabled) return;
        isFocused = true;
        listOpen = !listOpen;
        if (listOpen) {
            handleFocus();
        }
    }

    export function handleClear() {
        value = undefined;
        listOpen = false;
        dispatch('clear', value);
        handleFocus();
    }

    let mounted;
    onMount(() => {
        if (listOpen) isFocused = true;
        if (isFocused && input) input.focus();
        mounted = true;
    });

    function itemSelected(event) {
        if (suggestionMode) {
            filterText = event.detail.value;
            return;
        }

        const { detail } = event;

        if (detail) {
            filterText = '';
            const item = Object.assign({}, detail);

            if (!item.isGroupHeader || item.isSelectable) {
                if (multiple) {
                    value = value ? value.concat([item]) : [item];
                } else {
                    value = item;
                }

                value = value;

                setTimeout(() => {
                    listOpen = false;
                    activeValue = undefined;
                    dispatch('select', value);
                });
            }
        }
    }

    function itemCreated(event) {
        const { detail } = event;
        if (multiple) {
            value = value || [];
            value = [...value, createItem(detail)];
        } else {
            value = createItem(detail);
        }

        dispatch('itemCreated', detail);
        filterText = '';
        listOpen = false;
        activeValue = undefined;
    }

    function closeList() {
        filterText = '';
        listOpen = false;
    }

    export let ariaValues = (values) => {
        return `Option ${values}, selected.`;
    };

    export let ariaListOpen = (label, count) => {
        return `You are currently focused on option ${label}. There are ${count} results available.`;
    };

    export let ariaFocused = () => {
        return `Select is focused, type to refine list, press down to open the menu.`;
    };

    function handleAriaSelection(_multiple) {
        let selected = undefined;

        if (_multiple && value.length > 0) {
            selected = value.map((v) => getSelectionLabel(v)).join(', ');
        } else {
            selected = getSelectionLabel(value);
        }

        return ariaValues(selected);
    }

    function handleAriaContent() {
        if (!filteredItems || filteredItems.length === 0) return '';

        let _item = filteredItems[hoverItemIndex];

        if (listOpen && _item) {
            let label = getSelectionLabel(_item);
            let count = filteredItems ? filteredItems.length : 0;

            return ariaListOpen(label, count);
        } else {
            return ariaFocused();
        }
    }

    let listApp = null;
    let showList = false;

    $: {
        if (mounted && listOpen) {
            handleList();
        } else {
            destroyList();
        }
    }

    function destroyList() {
        showList = false;
    }

    async function handleList() {
        showList = true;
    }

    export let appendListTarget = null;
    $: if (listApp && !appendListTarget) appendListTarget = document.body;
    $: if (listApp && appendListTarget) appendListTarget.appendChild(listApp);

    function handleClickOutside(event) {
        if (container && !container.contains(event.target) && !listApp?.contains(event.target)) {
            handleBlur();
        }
    }

    onDestroy(() => {
        listApp?.remove();
    });
</script>

<svelte:window on:click={handleClickOutside} />

<div
    class="svelte-select {containerClasses}"
    class:error={hasError}
    class:multi={multiple}
    class:disabled={isDisabled}
    class:focused={isFocused}
    class:list-open={listOpen}
    class:two-icons={_showChevron && showClear}
    class:show-chevron={_showChevron}
    style={containerStyles}
    on:click={handleClick}
    bind:this={container}>
    {#if showList}
        <div class="svelte-select-list" bind:this={listApp}>
            {#if listApp}
                <svelte:component
                    this={List}
                    bind:hoverItemIndex
                    {...listProps}
                    on:itemSelected={itemSelected}
                    on:itemCreated={itemCreated}
                    on:closeList={closeList} />
            {/if}
        </div>
    {/if}

    <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="a11y-text">
        {#if isFocused}
            <span id="aria-selection">{ariaSelection}</span>
            <span id="aria-context">
                {ariaContext}
            </span>
        {/if}
    </span>

    {#if Icon}
        <svelte:component this={Icon} {...iconProps} />
    {/if}

    {#if showSelectedItem}
        {#if multiple}
            {#each value as item, i}
                <div
                    class="multi-item {activeValue === i ? 'active' : ''} {isDisabled ? 'disabled' : ''}"
                    on:click|preventDefault={() => (multiFullItemClearable ? handleMultiItemClear(i) : {})}>
                    <slot name="selection" selection={getSelectionLabel(item)}>
                        {getSelectionLabel(item)}
                    </slot>

                    {#if !isDisabled && !multiFullItemClearable && ClearIcon}
                        <div class="multi-item_clear" on:click={() => handleMultiItemClear(i)}>
                            <svelte:component this={ClearIcon} />
                        </div>
                    {/if}
                </div>
            {/each}
        {:else}
            <div class="selected-item">
                <slot name="selection" selection={getSelectionLabel(value)}>
                    {getSelectionLabel(value)}
                </slot>
            </div>
        {/if}
    {/if}

    <input
        on:keydown={handleKeyDown}
        on:blur={handleBlur}
        on:focus={handleFocus}
        readOnly={!isSearchable}
        {..._inputAttributes}
        bind:this={input}
        bind:value={filterText}
        placeholder={placeholderText}
        style={inputStyles}
        disabled={isDisabled} />

    

    <div class="icons">
        {#if showClear}
            <div class="clear-select" on:click|preventDefault={handleClear} aria-hidden="true">
                <svelte:component this={ClearIcon} />
            </div>
        {/if}

        {#if _showChevron}
            <div class="chevron" aria-hidden="true">
                <svelte:component this={ChevronIcon} />
            </div>
        {/if}

        {#if isWaiting}
            <svelte:component this={LoadingIcon} />
        {/if}
    </div>

    {#if !multiple || (multiple && !showMultiSelect)}
        <input name={inputAttributes.name} type="hidden" value={value ? value[optionIdentifier] : null} />
    {/if}

    {#if multiple && showMultiSelect}
        {#each value as item}
            <input name={inputAttributes.name} type="hidden" value={item ? item[optionIdentifier] : null} />
        {/each}
    {/if}
</div>

<style>
    .svelte-select {
        /* deprecating camelCase custom props in favour of kebab-case for v5 */
        --borderFocusColor: --border-focus-color;
        --borderHoverColor: --border-hover-color;
        --borderRadius: --border-radius;
        --clearSelectColor: --clear-select-color;
        --clearSelectWidth: --clear-select-width;
        --disabledBackground: --disabled-background;
        --disabledBorderColor: --disabled-border-color;
        --disabledColor: --disabled-color;
        --disabledPlaceholderColor: --disabled-placeholder-color;
        --disabledPlaceholderOpacity: --disabled-placeholder-opacity;
        --errorBackground: --error-background;
        --errorBorder: --error-border;
        --groupItemPaddingLeft: --group-item-padding-left;
        --groupTitleColor: --group-title-color;
        --groupTitleFontSize: --group-title-font-size;
        --groupTitleFontWeight: --group-title-font-weight;
        --groupTitlePadding: --group-title-padding;
        --groupTitleTextTransform: --group-title-text-transform;
        --indicatorColor: --chevron-color;
        --indicatorHeight: --chevron-height;
        --indicatorWidth: --chevron-width;
        --inputColor: --input-color;
        --inputFontSize: --input-font-size;
        --inputLeft: --input-left;
        --inputLetterSpacing: --input-letter-spacing;
        --inputMargin: --input-margin;
        --inputPadding: --input-padding;
        --itemActiveBackground: --item-active-background;
        --itemColor: --item-color;
        --itemFirstBorderRadius: --item-first-border-radius;
        --itemHoverBG: --item-hover-bg;
        --itemHoverColor: --item-hover-color;
        --itemIsActiveBG: --item-is-active-bg;
        --itemIsActiveColor: --item-is-active-color;
        --itemIsNotSelectableColor: --item-is-not-selectable-color;
        --itemPadding: --item-padding;
        --listBackground: --list-background;
        --listBorder: --list-border;
        --listBorderRadius: --list-border-radius;
        --listEmptyColor: --list-empty-color;
        --listEmptyPadding: --list-empty-padding;
        --listEmptyTextAlign: --list-empty-text-align;
        --listMaxHeight: --list-max-height;
        --listPosition: --list-position;
        --listShadow: --list-shadow;
        --listZIndex: --list-z-index;
        --multiItemBG: --multi-item-bg;
        --multiItemBorderRadius: --multi-item-border-radius;
        --multiItemDisabledHoverBg: --multi-item-disabled-hover-bg;
        --multiItemDisabledHoverColor: --multi-item-disabled-hover-color;
        --multiItemHeight: --multi-item-height;
        --multiItemMargin: --multi-item-margin;
        --multiItemPadding: --multi-item-padding;
        --multiLabelMargin: --multi-label-margin;
        --multiSelectInputMargin: --multi-select-input-margin;
        --multiSelectInputPadding: --multi-select-input-padding;
        --multiSelectPadding: --multi-select-padding;
        --placeholderColor: --placeholder-color;
        --placeholderOpacity: --placeholder-opacity;
        --selectedItemPadding: --selected-item-padding;
        --spinnerColor: --spinner-color;
        --spinnerHeight: --spinner-height;
        --spinnerWidth: --spinner-width;

        --internal-padding: 0 16px;

        border: var(--border, 1px solid #d8dbdf);
        border-radius: var(--border-radius, 3px);
        box-sizing: border-box;
        height: var(--height, 42px);
        position: relative;
        display: flex;
        align-items: center;
        padding: var(--padding, var(--internal-padding));
        background: var(--background, #fff);
        margin: var(--margin, 0);
        width: var(--width, auto);
        overflow: hidden;
    }

    .svelte-select input {
        cursor: default;
        border: none;
        color: var(--input-color, #3f4f5f);
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--input-padding, var(--padding, var(--internal-padding)));
        width: 100%;
        background: transparent;
        font-size: var(--input-font-size, 14px);
        letter-spacing: var(--input-letter-spacing, inherit);
        position: absolute;
        left: var(--input-left, 0);
        margin: var(--input-margin, 0);
        box-sizing: border-box;
    }

    .svelte-select input::placeholder {
        color: var(--placeholder-color, #78848f);
        opacity: var(--placeholder-opacity, 1);
    }

    .svelte-select input:focus {
        outline: none;
    }

    .svelte-select:hover {
        border-color: var(--border-hover-color, #b2b8bf);
    }

    .svelte-select.focused {
        border-color: var(--border-focus-color, #006fe8);
    }

    .svelte-select.disabled {
        background: var(--disabled-background, #ebedef);
        border-color: var(--disabled-border-color, #ebedef);
        color: var(--disabled-color, #c1c6cc);
    }

    .svelte-select.disabled input::placeholder {
        color: var(--disabled-placeholder-color, #c1c6cc);
        opacity: var(--disabled-placeholder-opacity, 1);
    }

    .svelte-select .selected-item {
        line-height: var(--height, 42px);
        height: var(--height, 42px);
        overflow-x: hidden;
        padding: var(--selected-item-padding, 0 20px 0 0);
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--selected-item-color, inherit);
    }

    .svelte-select .selected-item:focus {
        outline: none;
    }

    .svelte-select .icons {
        pointer-events: none;
        position: absolute;
        display: flex;
        align-items: center;
        justify-items: center;
        right: var(--icons-right, 0);
        top: var(--icons-top, 11px);
        bottom: var(--icons-bottom, 11px);
        color: var(--icons-color, #c5cacf);
        padding: var(--icon-padding, 0);
    }

    .svelte-select.focused .icons,
    .svelte-select .clear-select:hover,
    .svelte-select .chevron:hover {
        color: var(--icons-color-focused, #2c3e50);
    }

    .svelte-select .clear-select {
        display: flex;
        align-items: center;
        min-width: var(--clear-select-width, 20px);
        color: var(--clear-select-color, --icons-color);
        margin: var(--clear-select-margin, 0 8px 0 0);
        pointer-events: all;
    }

    .svelte-select .chevron {
        display: flex;
        min-width: var(--chevron-width, 20px);
        height: var(--chevron-height, 20px);
        color: var(--chevron-color, --icons-color);
        box-shadow: var(--chevron-box-shadow, -1px 0 0 0 #c5cacf);
        padding: var(--chevron-padding, 0 8px);
        pointer-events: var(--chevron-pointer-events, none);
    }

    .svelte-select.multi.two-icons {
        padding-right: 60px;
    }

    .svelte-select.show-chevron,
    .svelte-select.show-chevron input {
        padding-right: 40px;
    }

    .svelte-select.multi {
        padding: var(--multi-select-padding, 0 35px 0 16px);
        min-height: 38px;
        flex-wrap: wrap;
        display: flex;
        height: auto;
        align-items: center;
    }

    .svelte-select.multi input {
        padding: var(--multi-select-input-padding, 0);
        position: relative;
        margin: var(--multi-select-input-margin, 0);
    }

    .svelte-select.error {
        border: var(--error-border, 1px solid #ff2d55);
        background: var(--error-background, #fff);
    }

    .a11y-text {
        z-index: 9999;
        border: 0px;
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        width: 1px;
        position: absolute;
        overflow: hidden;
        padding: 0px;
        white-space: nowrap;
    }

    .multi input {
        flex: 1 1 40px;
    }

    .multi-item {
        background: var(--multi-item-bg, #ebedef);
        margin: var(--multi-item-margin, 4px 5px 0 0);
        border: var(--multi-item-border, 1px solid #ddd);
        border-radius: var(--multi-item-border-radius, 4px);
        height: var(--multi-item-height, 32px);
        line-height: var(--multi-item-height, 32px);
        display: flex;
        cursor: default;
        padding: var(--multi-item-padding, 0 6px 0 6px);
        max-width: var(--multi-max-width, calc(100% - 8px));
        box-sizing: border-box;
        margin: var(--multi-label-margin, 0 5px 0 0);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .multi-item.disabled:hover {
        background: var(--multi-item-disabled-hover-bg, #ebedef);
        color: var(--multi-item-disabled-hover-color, #c1c6cc);
    }

    .multi-item_clear {
        display: flex;
        align-items: center;
        justify-content: center;
        --clear-icon-color: var(--multi-item-clear-icon-color, #000);
    }
</style>
