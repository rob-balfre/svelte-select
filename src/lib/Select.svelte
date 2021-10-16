<script>
    import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';

    import _List from './List.svelte';
    import _Item from './Item.svelte';
    import _Selection from './Selection.svelte';
    import _debounce from './debounce';

    const dispatch = createEventDispatcher();

    export { containerClasses as class };

    export let id = null;
    export let container = undefined;
    export let input = undefined;
    export let isMulti = false;
    export let multiFullItemClearable = false;
    export let isDisabled = false;
    export let isCreatable = false;
    export let isFocused = false;
    export let value = null;
    export let filterText = '';
    export let placeholder = 'Select...';
    export let placeholderAlwaysShow = false;
    export let items = null;
    export let itemFilter = (label, filterText) =>
        `${label}`.toLowerCase().includes(filterText.toLowerCase());
    export let groupBy = undefined;
    export let groupFilter = (groups) => groups;
    export let isGroupHeaderSelectable = false;
    export let getGroupHeaderLabel = (option) => {
        return option[labelIdentifier] || option.id;
    };
    export let labelIdentifier = 'label';
    export let getOptionLabel = (option, filterText) => {
        return option.isCreator
            ? `Create \"${filterText}\"`
            : option[labelIdentifier];
    };
    export let optionIdentifier = 'value';
    export let loadOptions = undefined;
    export let hasError = false;
    export let containerStyles = '';
    export let getSelectionLabel = (option) => {
        if (option) return option[labelIdentifier];
        else return null;
    };

    export let createGroupHeaderItem = (groupValue) => {
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
    export let listOpen = false;
    export let loadOptionsInterval = 300;
    export let noOptionsMessage = 'No options';
    export let hideEmptyState = false;
    export let inputAttributes = {};
    export let listAutoWidth = true;
    export let itemHeight = 40;
    export let Icon = undefined;
    export let iconProps = {};
    export let showChevron = false;
    export let listOffset = 5;
    export let Item = _Item;
    export let List = _List;
    export let Selection = _Selection;
    export let MultiSelection = null;
    export let VirtualList = null;
    export let ChevronIcon = null;
    export let ClearIcon = null;
    export let LoadingIcon = null;
    export let listClass = 'list';
    export let itemClass = 'item';
    export let debounce = _debounce;

    function filterMethod(args) {
        if (args.loadOptions && args.filterText.length > 0) return;
        if (!args.items) return [];

        if (
            args.items &&
            args.items.length > 0 &&
            typeof args.items[0] !== 'object'
        ) {
            args.items = convertStringItemsToObjects(args.items);
        }

        let filterResults = args.items.filter((item) => {
            let matchesFilter = itemFilter(
                getOptionLabel(item, args.filterText),
                args.filterText,
                item
            );

            if (
                matchesFilter &&
                args.isMulti &&
                args.value &&
                Array.isArray(args.value)
            ) {
                matchesFilter = !args.value.some((x) => {
                    return (
                        x[args.optionIdentifier] === item[args.optionIdentifier]
                    );
                });
            }

            return matchesFilter;
        });

        if (args.groupBy) {
            filterResults = filterGroupedItems(filterResults);
        }

        if (args.isCreatable) {
            filterResults = addCreatableItem(filterResults, args.filterText);
        }

        return filterResults;
    }

    function addCreatableItem(_items, _filterText) {
        if (_filterText.length === 0) return _items;
        const itemToCreate = createItem(_filterText);
        if (_items[0] && _filterText === _items[0][labelIdentifier])
            return _items;
        itemToCreate.isCreator = true;
        return [..._items, itemToCreate];
    }

    $: filteredItems = filterMethod({
        loadOptions,
        filterText,
        items,
        value,
        isMulti,
        optionIdentifier,
        groupBy,
        isCreatable,
    });

    export let selectedValue = null;
    $: {
        if (selectedValue)
            console.warn(
                'selectedValue is no longer used. Please use value instead.'
            );
    }

    let containerClasses = 'select-container';
    let activeValue;
    let prev_value;
    let prev_filterText;
    let prev_isFocused;
    let prev_isMulti;
    let hoverItemIndex;

    const getItems = debounce(async () => {
        isWaiting = true;
        let res = await loadOptions(filterText).catch((err) => {
            console.warn('svelte-select loadOptions error :>> ', err);
            dispatch('error', { type: 'loadOptions', details: err });
        });

        if (res && !res.cancelled) {
            if (res) {
                if (res && res.length > 0 && typeof res[0] !== 'object') {
                    res = convertStringItemsToObjects(res);
                }
                filteredItems = [...res];
                dispatch('loaded', { items: filteredItems });
            } else {
                filteredItems = [];
            }

            if (isCreatable) {
                filteredItems = addCreatableItem(filteredItems, filterText);
            }

            isWaiting = false;
            isFocused = true;
            listOpen = true;
        }
    }, loadOptionsInterval);

    $: updateValueDisplay(items);

    function setValue() {
        if (typeof value === 'string') {
            value = {
                [optionIdentifier]: value,
                label: value,
            };
        } else if (isMulti && Array.isArray(value) && value.length > 0) {
            value = value.map((item) =>
                typeof item === 'string' ? { value: item, label: item } : item
            );
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
            _inputAttributes.id = id;
        }

        if (!isSearchable) {
            _inputAttributes.readonly = true;
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

            groups[groupValue].push(
                Object.assign({ isGroupItem: !!groupValue }, item)
            );
        });

        const sortedGroupedItems = [];

        groupFilter(groupValues).forEach((groupValue) => {
            sortedGroupedItems.push(...groups[groupValue]);
        });

        return sortedGroupedItems;
    }

    function dispatchSelectedItem() {
        if (isMulti) {
            if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
                if (checkValueForDuplicates()) {
                    dispatch('select', value);
                }
            }
            return;
        }

        if (
            !prev_value ||
            JSON.stringify(value[optionIdentifier]) !==
                JSON.stringify(prev_value[optionIdentifier])
        ) {
            dispatch('select', value);
        }
    }

    function setupFocus() {
        if (isFocused || listOpen) {
            handleFocus();
        } else {
            if (input) input.blur();
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

    $: {
        if (value) setValue();
    }

    $: {
        if (inputAttributes || !isSearchable) assignInputAttributes();
    }

    $: {
        if (isMulti) {
            setupMulti();
        }

        if (prev_isMulti && !isMulti) {
            setupSingle();
        }
    }

    $: {
        if (isMulti && value && value.length > 1) {
            checkValueForDuplicates();
        }
    }

    $: {
        if (value) dispatchSelectedItem();
    }

    $: {
        if (!value && isMulti && prev_value) {
            dispatch('select', value);
        }
    }

    $: {
        if (isFocused !== prev_isFocused) {
            setupFocus();
        }
    }

    $: {
        if (filterText !== prev_filterText) {
            setupFilterText();
        }
    }

    function setupFilterText() {
        if (filterText.length === 0) return;

        isFocused = true;
        listOpen = true;

        if (loadOptions) {
            getItems();
        } else {
            listOpen = true;

            if (isMulti) {
                activeValue = undefined;
            }
        }
    }

    $: hasValue = isMulti ? value && value.length > 1 : value;
    $: _showChevron = showChevron && ChevronIcon;
    $: showSelectedItem = hasValue && filterText.length === 0;
    $: showClear = showSelectedItem && isClearable && !isDisabled && !isWaiting;
    $: placeholderText =
        placeholderAlwaysShow && isMulti
            ? placeholder
            : value
            ? ''
            : placeholder;
    $: showMultiSelect = isMulti && value && value.length > 0;

    beforeUpdate(async () => {
        prev_value = value;
        prev_filterText = filterText;
        prev_isFocused = isFocused;
        prev_isMulti = isMulti;
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
        let matchTo = selection
            ? selection[optionIdentifier]
            : value[optionIdentifier];
        return items.find((item) => item[optionIdentifier] === matchTo);
    }

    function updateValueDisplay(items) {
        if (
            !items ||
            items.length === 0 ||
            items.some((item) => typeof item !== 'object')
        )
            return;
        if (
            !value ||
            (isMulti
                ? value.some(
                      (selection) => !selection || !selection[optionIdentifier]
                  )
                : !value[optionIdentifier])
        )
            return;

        if (Array.isArray(value)) {
            value = value.map((selection) => findItem(selection) || selection);
        } else {
            value = findItem() || value;
        }
    }

    function handleMultiItemClear(event) {
        const { detail } = event;
        const itemToRemove = value[detail ? detail.i : value.length - 1];

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
            case 'ArrowDown':
                e.preventDefault();
                listOpen = true;
                activeValue = undefined;
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
                if (!isMulti || filterText.length > 0) return;
                if (isMulti && value && value.length > 0) {
                    handleMultiItemClear(
                        activeValue !== undefined
                            ? activeValue
                            : value.length - 1
                    );
                    if (activeValue === 0 || activeValue === undefined) break;
                    activeValue =
                        value.length > activeValue
                            ? activeValue - 1
                            : undefined;
                }
                break;
            case 'ArrowLeft':
                if (!isMulti || filterText.length > 0) return;
                if (activeValue === undefined) {
                    activeValue = value.length - 1;
                } else if (value.length > activeValue && activeValue !== 0) {
                    activeValue -= 1;
                }
                break;
            case 'ArrowRight':
                if (
                    !isMulti ||
                    filterText.length > 0 ||
                    activeValue === undefined
                )
                    return;
                if (activeValue === value.length - 1) {
                    activeValue = undefined;
                } else if (activeValue < value.length - 1) {
                    activeValue += 1;
                }
                break;
        }
    }

    function handleFocus() {
        isFocused = true;
        if (input) input.focus();
    }

    function handleWindowEvent(event) {
        if (!container) return;
        const eventTarget =
            event.path && event.path.length > 0 ? event.path[0] : event.target;
        if (container.contains(eventTarget)) return;
        isFocused = false;
        listOpen = false;
        activeValue = undefined;
        if (input) input.blur();
    }

    function handleClick() {
        if (isDisabled) return;
        isFocused = true;
        listOpen = !listOpen;
    }

    export function handleClear() {
        value = undefined;
        listOpen = false;
        dispatch('clear', value);
        handleFocus();
    }

    onMount(() => {
        if (isFocused && input) input.focus();
    });

    $: listProps = {
        Item,
        filterText,
        optionIdentifier,
        noOptionsMessage,
        hideEmptyState,
        VirtualList,
        value,
        isMulti,
        getGroupHeaderLabel,
        items: filteredItems,
        itemHeight,
        getOptionLabel,
        listPlacement,
        parent: container,
        listAutoWidth,
        listOffset,
        listClass,
        itemClass
    };

    function itemSelected(event) {
        const { detail } = event;

        if (detail) {
            filterText = '';
            const item = Object.assign({}, detail);

            if (!item.isGroupHeader || item.isSelectable) {
                if (isMulti) {
                    value = value ? value.concat([item]) : [item];
                } else {
                    value = item;
                }

                value = value;

                setTimeout(() => {
                    listOpen = false;
                    activeValue = undefined;
                });
            }
        }
    }

    function itemCreated(event) {
        const { detail } = event;
        if (isMulti) {
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

    function handleAriaSelection() {
        let selected = undefined;

        if (isMulti && value.length > 0) {
            selected = value.map((v) => getSelectionLabel(v)).join(', ');
        } else {
            selected = getSelectionLabel(value);
        }

        return ariaValues(selected);
    }

    function handleAriaContent() {
        if (!isFocused || !filteredItems || filteredItems.length === 0)
            return '';

        let _item = filteredItems[hoverItemIndex];
        if (listOpen && _item) {
            let label = getSelectionLabel(_item);
            let count = filteredItems ? filteredItems.length : 0;

            return ariaListOpen(label, count);
        } else {
            return ariaFocused();
        }
    }

    $: ariaSelection = value ? handleAriaSelection(isMulti) : '';
    $: ariaContext = handleAriaContent(
        filteredItems,
        hoverItemIndex,
        isFocused,
        listOpen
    );
</script>

<svelte:window
    on:click={handleWindowEvent}
    on:focusin={handleWindowEvent}
    on:keydown={handleKeyDown} />

<div
    class={containerClasses}
    class:error={hasError}
    class:multi={isMulti}
    class:disabled={isDisabled}
    class:focused={isFocused}
    style={containerStyles}
    on:click={handleClick}
    bind:this={container}>
    <span
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions text"
        class="a11yText">
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

    {#if showMultiSelect}
        <svelte:component
            this={MultiSelection}
            {value}
            {getSelectionLabel}
            {activeValue}
            {isDisabled}
            {multiFullItemClearable}
            on:multiItemClear={handleMultiItemClear}
            on:focus={handleFocus} />
    {/if}

    <input
        readOnly={!isSearchable}
        {..._inputAttributes}
        bind:this={input}
        on:focus={handleFocus}
        bind:value={filterText}
        placeholder={placeholderText}
        style={inputStyles}
        disabled={isDisabled} />

    {#if !isMulti && showSelectedItem}
        <div class="selected-item" on:focus={handleFocus}>
            <svelte:component
                this={Selection}
                item={value}
                {getSelectionLabel} />
        </div>
    {/if}

    <div class="icons">
        {#if showClear}
            <div
                class="clearSelect"
                on:click|preventDefault={handleClear}
                aria-hidden="true">
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

    {#if listOpen}
        <svelte:component
            this={List}
            {...listProps}
            bind:hoverItemIndex
            on:itemSelected={itemSelected}
            on:itemCreated={itemCreated}
            on:closeList={closeList} />
    {/if}

    {#if !isMulti || (isMulti && !showMultiSelect)}
        <input
            name={inputAttributes.name}
            type="hidden"
            value={value ? getSelectionLabel(value) : null} />
    {/if}

    {#if isMulti && showMultiSelect}
        {#each value as item}
            <input
                name={inputAttributes.name}
                type="hidden"
                value={item ? getSelectionLabel(item) : null} />
        {/each}
    {/if}
</div>

<style>
    .select-container {
        border: var(--border, 1px solid #d8dbdf);
        border-radius: var(--borderRadius, 3px);
        box-sizing: border-box;
        height: var(--height, 42px);
        position: relative;
        display: flex;
        align-items: center;
        padding: var(--padding, 0 16px);
        background: var(--background, #fff);
        margin: var(--margin, 0);
        width: var(--width, 100%);
    }

    .select-container input {
        cursor: default;
        border: none;
        color: var(--inputColor, #3f4f5f);
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--inputPadding, var(--padding, 0 16px));
        width: 100%;
        background: transparent;
        font-size: var(--inputFontSize, 14px);
        letter-spacing: var(--inputLetterSpacing, inherit);
        position: absolute;
        left: var(--inputLeft, 0);
        margin: var(--inputMargin, 0);
    }

    .select-container input::placeholder {
        color: var(--placeholderColor, #78848f);
        opacity: var(--placeholderOpacity, 1);
    }

    .select-container input:focus {
        outline: none;
    }

    .select-container:hover {
        border-color: var(--borderHoverColor, #b2b8bf);
    }

    .select-container.focused {
        border-color: var(--borderFocusColor, #006fe8);
    }

    .select-container.disabled {
        background: var(--disabledBackground, #ebedef);
        border-color: var(--disabledBorderColor, #ebedef);
        color: var(--disabledColor, #c1c6cc);
    }

    .select-container.disabled input::placeholder {
        color: var(--disabledPlaceholderColor, #c1c6cc);
        opacity: var(--disabledPlaceholderOpacity, 1);
    }

    .select-container .selected-item {
        line-height: var(--height, 42px);
        height: var(--height, 42px);
        overflow-x: hidden;
        padding: var(--selected-item-padding, 0 20px 0 0);
    }

    .select-container .selected-item:focus {
        outline: none;
    }

    .select-container .icons {
        position: absolute;
        display: flex;
        right: var(--iconsRight, 0);
        top: var(--iconsTop, 11px);
        bottom: var(--iconsBottom, 11px);
        color: var(--iconsColor, #c5cacf);
    }

    .select-container .icons > * {
        transition: color 0.2s ease-in-out;
    }

    .select-container.focused .icons,
    .select-container .chevron:hover,
    .select-container .clearSelect:hover {
        color: var(--iconsColorFocused, #2c3e50);
    }

    .select-container .clearSelect {
        padding: 0 7px;
        width: var(--clearSelectWidth, 35px);
        height: 20px;
        color: var(--clearSelectColor, --iconsColor);
        flex: none !important;
    }

    .select-container .chevron {
        display: flex;
        padding: 0 7px;
        box-shadow: -1px 0 0 0 #c5cacf;
        width: var(--indicatorWidth, 35px);
        height: var(--indicatorHeight, 20px);
        color: var(--indicatorColor, --iconsColor);
    }

    .select-container.multi {
        padding: var(--multiSelectPadding, 0 35px 0 16px);
        height: auto;
        flex-wrap: wrap;
        align-items: stretch;
    }

    .select-container.multi > * {
        flex: 1 1 auto;
        width: 50px;
    }

    .select-container.multi input {
        padding: var(--multiSelectInputPadding, 0);
        position: relative;
        margin: var(--multiSelectInputMargin, 0);
    }

    .select-container.error {
        border: var(--errorBorder, 1px solid #ff2d55);
        background: var(--errorBackground, #fff);
    }

    .a11yText {
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
</style>
