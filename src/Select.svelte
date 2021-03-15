<script>
    import {
        beforeUpdate,
        createEventDispatcher,
        onDestroy,
        onMount,
        tick,
    } from 'svelte';
    import List from './List.svelte';
    import ItemComponent from './Item.svelte';
    import SelectionComponent from './Selection.svelte';
    import MultiSelectionComponent from './MultiSelection.svelte';
    import isOutOfViewport from './utils/isOutOfViewport';
    import debounce from './utils/debounce';
    import DefaultClearIcon from './ClearIcon.svelte';

    const dispatch = createEventDispatcher();
    export let container = undefined;
    export let input = undefined;
    export let Item = ItemComponent;
    export let Selection = SelectionComponent;
    export let MultiSelection = MultiSelectionComponent;
    export let isMulti = false;
    export let multiFullItemClearable = false;
    export let isDisabled = false;
    export let isCreatable = false;
    export let isFocused = false;
    export let selectedValue = undefined;
    export let filterText = '';
    export let placeholder = 'Select...';
    export let items = [];
    export let itemFilter = (label, filterText, option) =>
        label.toLowerCase().includes(filterText.toLowerCase());
    export let groupBy = undefined;
    export let groupFilter = (groups) => groups;
    export let isGroupHeaderSelectable = false;
    export let getGroupHeaderLabel = (option) => {
        return option.label;
    };
    export let getOptionLabel = (option, filterText) => {
        return option.isCreator ? `Create \"${filterText}\"` : option.label;
    };
    export let optionIdentifier = 'value';
    export let loadOptions = undefined;
    export let hasError = false;
    export let containerStyles = '';
    export let getSelectionLabel = (option) => {
        if (option) return option.label;
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

    export let isSearchable = true;
    export let inputStyles = '';
    export let isClearable = true;
    export let isWaiting = false;
    export let listPlacement = 'auto';
    export let listOpen = false;
    export let list = undefined;
    export let isVirtualList = false;
    export let loadOptionsInterval = 300;
    export let noOptionsMessage = 'No options';
    export let hideEmptyState = false;
    export let filteredItems = [];
    export let inputAttributes = {};
    export let listAutoWidth = true;
    export let itemHeight = 40;
    export let Icon = undefined;
    export let iconProps = {};
    export let showChevron = false;
    export let showIndicator = false;
    export let containerClasses = '';
    export let indicatorSvg = undefined;
    export let ClearIcon = DefaultClearIcon;

    let target;
    let activeSelectedValue;
    let originalItemsClone;
    let VirtualList;
    let prev_selectedValue;
    let prev_filterText;
    let prev_isFocused;
    let prev_filteredItems;

    async function resetFilter() {
        await tick();
        filterText = '';
    }

    let getItemsHasInvoked = false;
    const getItems = debounce(async () => {
        getItemsHasInvoked = true;
        isWaiting = true;

        let res = await loadOptions(filterText).catch((err) => {
            console.warn('svelte-select loadOptions error :>> ', err);
            dispatch('error', { type: 'loadOptions', details: err });
        });

        if (res && !res.cancelled) {
            if (res) {
                items = [...res];
                dispatch('loaded', { items });
            } else {
                items = [];
            }

            isWaiting = false;
            isFocused = true;
            listOpen = true;
        }
    }, loadOptionsInterval);

    $: updateSelectedValueDisplay(items);

    function setSelectedValue() {
        if (typeof selectedValue === 'string') {
            selectedValue = {
                [optionIdentifier]: selectedValue,
                label: selectedValue,
            };
        } else if (
            isMulti &&
            Array.isArray(selectedValue) &&
            selectedValue.length > 0
        ) {
            selectedValue = selectedValue.map((item) =>
                typeof item === 'string' ? { value: item, label: item } : item
            );
        }
    }

    let _inputAttributes;
    function assignInputAttributes() {
        _inputAttributes = Object.assign(
            {
                autocomplete: 'off',
                autocorrect: 'off',
                spellcheck: false,
            },
            inputAttributes
        );

        if (!isSearchable) {
            _inputAttributes.readonly = true;
        }
    }

    function convertStringItemsToObjects() {
        items = items.map((item, index) => {
            return {
                index,
                value: item,
                label: item,
            };
        });
    }

    function resetFilteredItems() {
        filteredItems = JSON.parse(originalItemsClone);
    }

    function filterItem(item) {
        let keepItem = true;

        if (isMulti && selectedValue) {
            keepItem = !selectedValue.some((value) => {
                return value[optionIdentifier] === item[optionIdentifier];
            });
        }

        if (!keepItem) return false;
        if (filterText.length < 1) return true;
        return itemFilter(getOptionLabel(item, filterText), filterText, item);
    }

    function setupFilteredItems() {
        filteredItems = loadOptions
            ? filterText.length === 0
                ? []
                : items
            : items.filter((item) => filterItem(item));
    }

    function filterGroupedItems() {
        const groupValues = [];
        const groups = {};

        filteredItems.forEach((item) => {
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

        filteredItems = sortedGroupedItems;
    }

    function dispatchSelectedItem() {
        if (isMulti) {
            if (
                JSON.stringify(selectedValue) !==
                JSON.stringify(prev_selectedValue)
            ) {
                if (checkSelectedValueForDuplicates()) {
                    dispatch('select', selectedValue);
                }
            }
            return;
        }

        if (
            !prev_selectedValue ||
            JSON.stringify(selectedValue[optionIdentifier]) !==
                JSON.stringify(prev_selectedValue[optionIdentifier])
        ) {
            dispatch('select', selectedValue);
        }
    }

    function setupFilterText() {
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
                filterText,
            });
        }
    }

    function setupFocus() {
        if (isFocused || listOpen) {
            handleFocus();
        } else {
            resetFilter();
            if (input) input.blur();
        }
    }

    let VirtualListComponent;
    async function setupVirtualList() {
        VirtualListComponent = await import('./VirtualList.svelte');
        VirtualList = VirtualListComponent.default;
    }

    $: {
        if (selectedValue) setSelectedValue();
    }

    $: {
        if (noOptionsMessage && list) list.$set({ noOptionsMessage });
    }

    $: {
        if (inputAttributes || !isSearchable) assignInputAttributes();
    }

    $: {
        if (items && items.length > 0 && typeof items[0] !== 'object') {
            convertStringItemsToObjects();
        }

        if (loadOptions && filterText.length === 0 && originalItemsClone) {
            resetFilteredItems();
        } else {
            setupFilteredItems();
        }

        if (groupBy) {
            filterGroupedItems();
        }
    }

    $: {
        if (isMulti && selectedValue && selectedValue.length > 1) {
            checkSelectedValueForDuplicates();
        }
    }

    $: {
        if (selectedValue) {
            dispatchSelectedItem();
        }
    }

    $: {
        if (container) {
            if (listOpen) {
                loadList();
            } else {
                removeList();
            }
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

    function setupFilteredItem() {
        let _filteredItems = [...filteredItems];

        if (isCreatable && filterText) {
            const itemToCreate = createItem(filterText);
            itemToCreate.isCreator = true;

            const existingItemWithFilterValue = _filteredItems.find((item) => {
                return (
                    item[optionIdentifier] === itemToCreate[optionIdentifier]
                );
            });

            let existingSelectionWithFilterValue;

            if (selectedValue) {
                if (isMulti) {
                    existingSelectionWithFilterValue = selectedValue.find(
                        (selection) => {
                            return (
                                selection[optionIdentifier] ===
                                itemToCreate[optionIdentifier]
                            );
                        }
                    );
                } else if (
                    selectedValue[optionIdentifier] ===
                    itemToCreate[optionIdentifier]
                ) {
                    existingSelectionWithFilterValue = selectedValue;
                }
            }

            if (
                !existingItemWithFilterValue &&
                !existingSelectionWithFilterValue
            ) {
                _filteredItems = [..._filteredItems, itemToCreate];
            }
        }

        setList(_filteredItems);
    }

    $: {
        if (prev_filteredItems !== filteredItems) {
            setupFilteredItem();
        }
    }

    $: showSelectedItem = selectedValue && filterText.length === 0;
    $: placeholderText = selectedValue ? '' : placeholder;

    beforeUpdate(() => {
        prev_selectedValue = selectedValue;
        prev_filterText = filterText;
        prev_isFocused = isFocused;
        prev_filteredItems = filteredItems;
    });

    function checkSelectedValueForDuplicates() {
        let noDuplicates = true;
        if (selectedValue) {
            const ids = [];
            const uniqueValues = [];

            selectedValue.forEach((val) => {
                if (!ids.includes(val[optionIdentifier])) {
                    ids.push(val[optionIdentifier]);
                    uniqueValues.push(val);
                } else {
                    noDuplicates = false;
                }
            });

            if (!noDuplicates) selectedValue = uniqueValues;
        }
        return noDuplicates;
    }

    function findItem(selection) {
        let matchTo = selection
            ? selection[optionIdentifier]
            : selectedValue[optionIdentifier];
        return items.find((item) => item[optionIdentifier] === matchTo);
    }

    function updateSelectedValueDisplay(items) {
        if (
            !items ||
            items.length === 0 ||
            items.some((item) => typeof item !== 'object')
        )
            return;
        if (
            !selectedValue ||
            (isMulti
                ? selectedValue.some(
                      (selection) => !selection || !selection[optionIdentifier]
                  )
                : !selectedValue[optionIdentifier])
        )
            return;

        if (Array.isArray(selectedValue)) {
            selectedValue = selectedValue.map(
                (selection) => findItem(selection) || selection
            );
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
            selectedValue = selectedValue.filter((item) => {
                return item !== itemToRemove;
            });
        }

        dispatch('clear', itemToRemove);

        getPosition();
    }

    async function getPosition() {
        await tick();
        if (!target || !container) return;
        const { top, height, width } = container.getBoundingClientRect();

        target.style['min-width'] = `${width}px`;
        target.style.width = `${listAutoWidth ? 'auto' : '100%'}`;
        target.style.left = '0';

        if (listPlacement === 'top') {
            target.style.bottom = `${height + 5}px`;
        } else {
            target.style.top = `${height + 5}px`;
        }

        target = target;

        if (listPlacement === 'auto' && isOutOfViewport(target).bottom) {
            target.style.top = ``;
            target.style.bottom = `${height + 5}px`;
        }

        target.style.visibility = '';
    }

    function handleKeyDown(e) {
        if (!isFocused) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                listOpen = true;
                activeSelectedValue = undefined;
                break;
            case 'ArrowUp':
                e.preventDefault();
                listOpen = true;
                activeSelectedValue = undefined;
                break;
            case 'Tab':
                if (!listOpen) isFocused = false;
                break;
            case 'Backspace':
                if (!isMulti || filterText.length > 0) return;
                if (isMulti && selectedValue && selectedValue.length > 0) {
                    handleMultiItemClear(
                        activeSelectedValue !== undefined
                            ? activeSelectedValue
                            : selectedValue.length - 1
                    );
                    if (
                        activeSelectedValue === 0 ||
                        activeSelectedValue === undefined
                    )
                        break;
                    activeSelectedValue =
                        selectedValue.length > activeSelectedValue
                            ? activeSelectedValue - 1
                            : undefined;
                }
                break;
            case 'ArrowLeft':
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
            case 'ArrowRight':
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
        dispatch('clear', selectedValue);
        handleFocus();
    }

    async function loadList() {
        await tick();
        if (target && list) return;

        if (isVirtualList && !VirtualListComponent) await setupVirtualList();

        const data = {
            Item,
            filterText,
            optionIdentifier,
            noOptionsMessage,
            hideEmptyState,
            isVirtualList,
            VirtualList,
            selectedValue,
            isMulti,
            getGroupHeaderLabel,
            items: filteredItems,
            itemHeight,
        };

        if (getOptionLabel) {
            data.getOptionLabel = getOptionLabel;
        }

        if (target) target.remove();
        target = document.createElement('div');

        Object.assign(target.style, {
            position: 'absolute',
            'z-index': 2,
            visibility: 'hidden',
        });

        if (list) list.$destroy();
        list = list;

        target = target;
        if (container) container.appendChild(target);

        list = new List({
            target,
            props: data,
        });

        list.$on('itemSelected', (event) => {
            const { detail } = event;

            if (detail) {
                const item = Object.assign({}, detail);

                if (!item.isGroupHeader || item.isSelectable) {
                    if (isMulti) {
                        selectedValue = selectedValue
                            ? selectedValue.concat([item])
                            : [item];
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

        list.$on('itemCreated', (event) => {
            const { detail } = event;
            if (isMulti) {
                selectedValue = selectedValue || [];
                selectedValue = [...selectedValue, createItem(detail)];
            } else {
                selectedValue = createItem(detail);
            }

            dispatch('itemCreated', detail);
            filterText = '';
            listOpen = false;
            activeSelectedValue = undefined;
            resetFilter();
        });

        list.$on('closeList', () => {
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

<style>
    .selectContainer {
        --padding: 0 16px;

        border: var(--border, 1px solid #d8dbdf);
        border-radius: var(--borderRadius, 3px);
        height: var(--height, 42px);
        position: relative;
        display: flex;
        align-items: center;
        padding: var(--padding);
        background: var(--background, #fff);
    }

    .selectContainer input {
        cursor: default;
        border: none;
        color: var(--inputColor, #3f4f5f);
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--inputPadding, var(--padding));
        width: 100%;
        background: transparent;
        font-size: var(--inputFontSize, 14px);
        letter-spacing: var(--inputLetterSpacing, -0.08px);
        position: absolute;
        left: var(--inputLeft, 0);
    }

    .selectContainer input::placeholder {
        color: var(--placeholderColor, #78848f);
        opacity: var(--placeholderOpacity, 1);
    }

    .selectContainer input:focus {
        outline: none;
    }

    .selectContainer:hover {
        border-color: var(--borderHoverColor, #b2b8bf);
    }

    .selectContainer.focused {
        border-color: var(--borderFocusColor, #006fe8);
    }

    .selectContainer.disabled {
        background: var(--disabledBackground, #ebedef);
        border-color: var(--disabledBorderColor, #ebedef);
        color: var(--disabledColor, #c1c6cc);
    }

    .selectContainer.disabled input::placeholder {
        color: var(--disabledPlaceholderColor, #c1c6cc);
        opacity: var(--disabledPlaceholderOpacity, 1);
    }

    .selectedItem {
        line-height: var(--height, 42px);
        height: var(--height, 42px);
        overflow-x: hidden;
        padding: var(--selectedItemPadding, 0 20px 0 0);
    }

    .selectedItem:focus {
        outline: none;
    }

    .clearSelect {
        position: absolute;
        right: var(--clearSelectRight, 10px);
        top: var(--clearSelectTop, 11px);
        bottom: var(--clearSelectBottom, 11px);
        width: var(--clearSelectWidth, 20px);
        color: var(--clearSelectColor, #c5cacf);
        flex: none !important;
    }

    .clearSelect:hover {
        color: var(--clearSelectHoverColor, #2c3e50);
    }

    .selectContainer.focused .clearSelect {
        color: var(--clearSelectFocusColor, #3f4f5f);
    }

    .indicator {
        position: absolute;
        right: var(--indicatorRight, 10px);
        top: var(--indicatorTop, 11px);
        width: var(--indicatorWidth, 20px);
        height: var(--indicatorHeight, 20px);
        color: var(--indicatorColor, #c5cacf);
    }

    .indicator svg {
        display: inline-block;
        fill: var(--indicatorFill, currentcolor);
        line-height: 1;
        stroke: var(--indicatorStroke, currentcolor);
        stroke-width: 0;
    }

    .spinner {
        position: absolute;
        right: var(--spinnerRight, 10px);
        top: var(--spinnerLeft, 11px);
        width: var(--spinnerWidth, 20px);
        height: var(--spinnerHeight, 20px);
        color: var(--spinnerColor, #51ce6c);
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
        padding: var(--multiSelectPadding, 0 35px 0 16px);
        height: auto;
        flex-wrap: wrap;
        align-items: stretch;
    }

    .multiSelect > * {
        flex: 1 1 50px;
    }

    .selectContainer.multiSelect input {
        padding: var(--multiSelectInputPadding, 0);
        position: relative;
        margin: var(--multiSelectInputMargin, 0);
    }

    .hasError {
        border: var(--errorBorder, 1px solid #ff2d55);
        background: var(--errorBackground, #fff);
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<svelte:window
    on:click={handleWindowClick}
    on:keydown={handleKeyDown}
    on:resize={getPosition}
/>

<div
    class="selectContainer {containerClasses}"
    class:hasError
    class:multiSelect={isMulti}
    class:disabled={isDisabled}
    class:focused={isFocused}
    style={containerStyles}
    on:click={handleClick}
    bind:this={container}
>
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
            on:focus={handleFocus}
        />
    {/if}

    {#if isDisabled}
        <input
            {..._inputAttributes}
            bind:this={input}
            on:focus={handleFocus}
            bind:value={filterText}
            placeholder={placeholderText}
            style={inputStyles}
            disabled
        />
    {:else}
        <input
            {..._inputAttributes}
            bind:this={input}
            on:focus={handleFocus}
            bind:value={filterText}
            placeholder={placeholderText}
            style={inputStyles}
        />
    {/if}

    {#if !isMulti && showSelectedItem}
        <div class="selectedItem" on:focus={handleFocus}>
            <svelte:component
                this={Selection}
                item={selectedValue}
                {getSelectionLabel}
            />
        </div>
    {/if}

    {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
        <div class="clearSelect" on:click|preventDefault={handleClear}>
            <svelte:component this={ClearIcon} />
        </div>
    {/if}

    {#if showIndicator || (showChevron && !selectedValue) || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem))}
        <div class="indicator">
            {#if indicatorSvg}
                {@html indicatorSvg}
            {:else}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 20 20"
                    focusable="false"
                >
                    <path
                        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747
            3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0
            1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502
            0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0
            0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                    />
                </svg>
            {/if}
        </div>
    {/if}

    {#if isWaiting}
        <div class="spinner">
            <svg class="spinner_icon" viewBox="25 25 50 50">
                <circle
                    class="spinner_path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-miterlimit="10"
                />
            </svg>
        </div>
    {/if}
</div>
