<script>
    import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';

    export let imports = {};

    const {
        Item,
        List,
        Selection,
        Multi,
        VirtualList,
        ChevronIcon,
        ClearIcon,
        LoadingIcon,
        debounce,
        filter,
        getItems,
    } = imports;

    const dispatch = createEventDispatcher();

    export let id = null;
    export let container = undefined;
    export let input = undefined;
    export let isMulti = false;
    export let multiFullItemClearable = false;
    export let isDisabled = false;
    export let isCreatable = false;
    export let isFocused = false;
    export let value = null;
    export let justValue = null;
    export let filterText = '';
    export let placeholder = 'Please select';
    export let placeholderAlwaysShow = false;
    export let items = null;
    export let itemFilter = (label, filterText) => `${label}`.toLowerCase().includes(filterText.toLowerCase());
    export let groupBy = undefined;
    export let groupFilter = (groups) => groups;
    export let isGroupHeaderSelectable = false;
    export let getGroupHeaderLabel = (option) => {
        return option[labelIdentifier] || option.id;
    };
    export let labelIdentifier = 'label';
    export let getOptionLabel = (option, filterText) => {
        return option.isCreator ? `Create \"${filterText}\"` : option[labelIdentifier];
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
    export let debounceWait = 300;
    export let noOptionsMessage = 'No options';
    export let hideEmptyState = false;
    export let inputAttributes = {};
    export let listAutoWidth = true;
    export let itemHeight = 40;
    export let Icon = undefined;
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

    let containerClasses = 'select-container';
    let activeValue;
    let prev_value;
    let prev_filterText;
    let prev_isFocused;
    let prev_isMulti;
    let hoverItemIndex;
    let list;

    function setValue() {
        if (typeof value === 'string') {
            let item = items.find((item) => item[optionIdentifier] === value);
            value = item || {
                [optionIdentifier]: value,
                label: value,
            };
        } else if (isMulti && Array.isArray(value) && value.length > 0) {
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

            groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
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

        if (!prev_value || JSON.stringify(value[optionIdentifier]) !== JSON.stringify(prev_value[optionIdentifier])) {
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

    $: if ((items, value)) setValue();
    $: if (inputAttributes || !isSearchable) assignInputAttributes();
    $: if (isMulti) setupMulti();
    $: if (prev_isMulti && !isMulti) setupSingle();
    $: if (isMulti && value && value.length > 1) checkValueForDuplicates();
    $: if (value) dispatchSelectedItem();
    $: if (!value && isMulti && prev_value) dispatch('select', value);
    $: if (isFocused !== prev_isFocused) setupFocus();
    $: if (filterText !== prev_filterText) setupFilterText();

    function setupFilterText() {
        if (filterText.length === 0) return;

        isFocused = true;
        listOpen = true;

        if (loadOptions) {
            const load = async function () {
                isWaiting = true;
                let res = await getItems({
                    dispatch,
                    loadOptions,
                    convertStringItemsToObjects,
                    filteredItems,
                    filterText,
                });

                if (res) {
                    isWaiting = res.isWaiting;
                    isFocused = res.isFocused;
                    listOpen = res.listOpen;
                    filteredItems = res.filteredItems;
                } else {
                    isWaiting = false;
                    isFocused = true;
                    listOpen = true;
                }

                if (isCreatable) {
                    filteredItems = addCreatableItem(filteredItems, filterText);
                }
            };

            debounce(load(), debounceWait);
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
    $: placeholderText = placeholderAlwaysShow && isMulti ? placeholder : value ? '' : placeholder;
    $: showMultiSelect = isMulti && value && value.length > 0;
    $: suggestionMode = suggestions && filterText.length === 0;
    $: ariaSelection = value ? handleAriaSelection(isMulti) : '';
    $: ariaContext = handleAriaContent(filteredItems, hoverItemIndex, isFocused, listOpen);
    $: updateValueDisplay(items);
    $: if (value) justValue = value ? value[optionIdentifier] : value;
    $: if (isMulti && !Multi) console.warn('isMulti is true but Multi is not imported');
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
        suggestionMode,
    };
    $: filteredItems = filter({
        loadOptions,
        filterText,
        items: suggestionMode ? suggestions : items,
        isMulti,
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
        let matchTo = selection ? selection[optionIdentifier] : value[optionIdentifier];
        return items.find((item) => item[optionIdentifier] === matchTo);
    }

    function updateValueDisplay(items) {
        if (!items || items.length === 0 || items.some((item) => typeof item !== 'object')) return;
        if (
            !value ||
            (isMulti ? value.some((selection) => !selection || !selection[optionIdentifier]) : !value[optionIdentifier])
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
            case 'Enter':
                e.preventDefault();
                break;
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
                    handleMultiItemClear(activeValue !== undefined ? activeValue : value.length - 1);
                    if (activeValue === 0 || activeValue === undefined) break;
                    activeValue = value.length > activeValue ? activeValue - 1 : undefined;
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
                if (!isMulti || filterText.length > 0 || activeValue === undefined) return;
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
        if (input) input.focus();
    }

    function handleBlur(e) {
        dispatch('blur', e);

        isFocused = false;
        activeValue = undefined;

        if (list && !container.contains(e.relatedTarget) && !list.contains(e.relatedTarget)) {
            closeList();
        }
    }

    function handleClick() {
        if (isDisabled) return;
        isFocused = true;
        listOpen = !listOpen;
        if (listOpen) handleFocus();
    }

    export function handleClear() {
        value = undefined;
        listOpen = false;
        dispatch('clear', value);
        handleFocus();
    }

    let mounted;
    onMount(() => {
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
        if (!isFocused || !filteredItems || filteredItems.length === 0) return '';

        let _item = filteredItems[hoverItemIndex];
        if (listOpen && _item) {
            let label = getSelectionLabel(_item);
            let count = filteredItems ? filteredItems.length : 0;

            return ariaListOpen(label, count);
        } else {
            return ariaFocused();
        }
    }
</script>

<div
    class={containerClasses}
    class:error={hasError}
    class:multi={isMulti}
    class:disabled={isDisabled}
    class:focused={isFocused}
    class:list-open={listOpen}
    style={containerStyles}
    on:click={handleClick}
    bind:this={container}>
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

    {#if showMultiSelect}
        <svelte:component
            this={Multi}
            {value}
            {getSelectionLabel}
            {activeValue}
            {isDisabled}
            {ClearIcon}
            {multiFullItemClearable}
            on:multiItemClear={handleMultiItemClear}
            on:focus={handleFocus} />
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

    {#if !isMulti && showSelectedItem}
        <div class="selected-item">
            <svelte:component this={Selection} item={value} {getSelectionLabel} />
        </div>
    {/if}

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

    {#if !isMulti || (isMulti && !showMultiSelect)}
        <input name={inputAttributes.name} type="hidden" value={value ? getSelectionLabel(value) : null} />
    {/if}

    {#if isMulti && showMultiSelect}
        {#each value as item}
            <input name={inputAttributes.name} type="hidden" value={item ? getSelectionLabel(item) : null} />
        {/each}
    {/if}
</div>

{#if mounted && listOpen}
    <svelte:component
        this={List}
        {...listProps}
        bind:hoverItemIndex
        bind:list
        on:itemSelected={itemSelected}
        on:itemCreated={itemCreated}
        on:closeList={closeList} />
{/if}
