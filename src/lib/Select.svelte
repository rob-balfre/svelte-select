<script lang="ts">
    import { onDestroy, onMount, untrack } from 'svelte';
    import type { Action } from 'svelte/action';
    import type { Snippet } from 'svelte';
    import { offset, flip, shift } from 'svelte-floating-ui/dom';
    import { createFloatingActions, type ComputeConfig } from 'svelte-floating-ui';

    import _filter from './filter';
    import _getItems from './get-items';

    import ChevronIcon from './ChevronIcon.svelte';
    import ClearIcon from './ClearIcon.svelte';
    import LoadingIcon from './LoadingIcon.svelte';

    type SelectItem = Record<string, unknown>;
    type SelectValue = any;
    type InputAttributes = Record<string, string | number | boolean | undefined>;
    type ScrollActionParameters = { scroll: boolean; listDom?: boolean };

    type LoadOptionsFn = (
        filterText: string,
    ) => Promise<SelectItem[] | string[] | { cancelled: true } | null | undefined>;

    type ItemFilterFn = (label: unknown, filterText: string, option: SelectItem) => boolean;
    type GroupByFn = (item: SelectItem) => string | undefined;
    type GroupFilterFn = (groups: string[]) => string[];
    type CreateGroupHeaderItemFn = (groupValue: string, item: SelectItem) => SelectItem;
    type DebounceFn = (fn: () => void, wait?: number) => void;

    type ValueMode = 'item' | 'id';

    interface Props {
        valueMode?: ValueMode;
        filter?: typeof _filter;
        getItems?: typeof _getItems;
        id?: string | null;
        name?: string | null;
        container?: HTMLDivElement | null;
        input?: HTMLInputElement | null;
        multiple?: boolean;
        multiFullItemClearable?: boolean;
        disabled?: boolean;
        focused?: boolean;
        value?: SelectValue;
        filterText?: string;
        placeholder?: string;
        placeholderAlwaysShow?: boolean;
        items?: SelectItem[] | null;
        label?: string;
        itemFilter?: ItemFilterFn;
        groupBy?: GroupByFn;
        groupFilter?: GroupFilterFn;
        groupHeaderSelectable?: boolean;
        itemId?: string;
        loadOptions?: LoadOptionsFn;
        containerStyles?: string;
        hasError?: boolean;
        filterSelectedItems?: boolean;
        required?: boolean;
        closeListOnChange?: boolean;
        clearFilterTextOnBlur?: boolean;
        createGroupHeaderItem?: CreateGroupHeaderItemFn;
        searchable?: boolean;
        inputStyles?: string;
        clearable?: boolean;
        loading?: boolean;
        listOpen?: boolean;
        debounce?: DebounceFn;
        debounceWait?: number;
        hideEmptyState?: boolean;
        inputAttributes?: InputAttributes;
        listAutoWidth?: boolean;
        showChevron?: boolean;
        listOffset?: number;
        hoverItemIndex?: number;
        floatingConfig?: Partial<ComputeConfig>;
        class?: string;
        ariaValues?: (values: unknown) => string;
        ariaListOpen?: (label: unknown, count: number) => string;
        ariaFocused?: () => string;
        ariaClearButton?: () => string;
        oninput?: (value: SelectValue) => void;
        onchange?: (value: SelectValue) => void;
        onselect?: (selection: SelectItem) => void;
        onclear?: (value: SelectValue | SelectItem) => void;
        onfilter?: (filteredItems: SelectItem[]) => void;
        onhoverItem?: (hoverItemIndex: number) => void;
        onfocus?: (event: FocusEvent) => void;
        onblur?: (event: FocusEvent) => void;
        onerror?: (error: { type: string; details: unknown }) => void;
        onloaded?: (event: { items: SelectItem[] }) => void;
        listPrepend?: Snippet;
        list?: Snippet<[{ filteredItems: SelectItem[] }]>;
        item?: Snippet<[{ item: SelectItem; index: number }]>;
        empty?: Snippet;
        listAppend?: Snippet;
        prepend?: Snippet;
        selection?: Snippet<[{ selection: SelectValue; index?: number }]>;
        multiClearIcon?: Snippet;
        loadingIcon?: Snippet;
        clearIcon?: Snippet;
        chevronIcon?: Snippet<[{ listOpen: boolean }]>;
        inputHidden?: Snippet<[{ value: SelectValue }]>;
        requiredIndicator?: Snippet<[{ value: SelectValue }]>;
    }

    let timeout: ReturnType<typeof setTimeout> | undefined;

    let {
        valueMode = 'item',
        filter = _filter,
        getItems = _getItems,
        id = null,
        name = null,
        container = $bindable<HTMLDivElement | null>(null),
        input = $bindable<HTMLInputElement | null>(null),
        multiple = false,
        multiFullItemClearable = false,
        disabled = false,
        focused = $bindable(false),
        value = $bindable<any>(),
        filterText = $bindable(''),
        placeholder = 'Please select',
        placeholderAlwaysShow = false,
        items = $bindable<SelectItem[]>([]),
        label = 'label',
        itemFilter = (label, filterText, option) => `${label}`.toLowerCase().includes(filterText.toLowerCase()),
        groupBy = undefined,
        groupFilter = (groups) => groups,
        groupHeaderSelectable = false,
        itemId = 'value',
        loadOptions = undefined,
        containerStyles = '',
        hasError = false,
        filterSelectedItems = true,
        required = false,
        closeListOnChange = true,
        clearFilterTextOnBlur = true,
        createGroupHeaderItem = (groupValue, item) => {
            return {
                value: groupValue,
                [label]: groupValue,
            };
        },
        searchable = true,
        inputStyles = '',
        clearable = true,
        loading = $bindable(false),
        listOpen = $bindable(false),
        debounce = (fn, wait = 1) => {
            clearTimeout(timeout);
            timeout = setTimeout(fn, wait);
        },
        debounceWait = 300,
        hideEmptyState = false,
        inputAttributes = {},
        listAutoWidth = true,
        showChevron = false,
        listOffset = 5,
        hoverItemIndex = $bindable(0),
        floatingConfig = {},
        class: containerClasses = '',
        ariaValues = (values) => {
            return `Option ${values}, selected.`;
        },
        ariaListOpen = (label, count) => {
            return `You are currently focused on option ${label}. There are ${count} results available.`;
        },
        ariaFocused = () => {
            return `Select is focused, type to refine list, press down to open the menu.`;
        },
        ariaClearButton = () => {
            return `Clear selection`;
        },
        oninput,
        onchange,
        onselect,
        onclear,
        onfilter,
        onhoverItem,
        onfocus,
        onblur,
        onerror,
        onloaded,
        listPrepend,
        list: listSnippet,
        item: itemSnippet,
        empty,
        listAppend,
        prepend,
        selection,
        multiClearIcon,
        loadingIcon,
        clearIcon,
        chevronIcon,
        inputHidden,
        requiredIndicator,
    }: Props = $props();

    export function getFilteredItems() {
        return filteredItems;
    }

    let activeValue = $state<number | undefined>(undefined);
    let prev_value: SelectValue;
    let prev_filterText: string | undefined;
    let prev_multiple: boolean | undefined;
    let prev_focused: boolean | undefined;
    let listElement = $state<HTMLDivElement | null>(null);

    let __inputAttributes: InputAttributes = {};
    const _inputAttributes = $derived.by(() => {
        if (inputAttributes || !searchable) {
            const newAttributes = Object.assign(
                {
                    autocapitalize: 'none',
                    autocomplete: 'off',
                    autocorrect: 'off',
                    spellcheck: false,
                    tabindex: 0,
                    type: 'text',
                    'aria-autocomplete': 'list',
                },
                inputAttributes,
            );

            if (id) {
                newAttributes['id'] = id;
            }

            if (!searchable) {
                newAttributes['readonly'] = true;
            }

            if (JSON.stringify(newAttributes) !== JSON.stringify(__inputAttributes)) {
                __inputAttributes = newAttributes;
            }
        }
        return __inputAttributes;
    });

    function getValue(v: any) {
        if (v == null) return v;
        if (typeof v === 'object') return v[itemId];
        return v;
    }

    function isPrimitiveItems(currentItems: unknown[] | null | undefined) {
        return Array.isArray(currentItems) && currentItems.length > 0 && typeof currentItems[0] !== 'object';
    }

    // Primitive item arrays (e.g. string[]) use id-shaped values even when valueMode is the default 'item'.
    const useIdValue = $derived(valueMode === 'id' || isPrimitiveItems(items));

    function toSelectionValue(selection: SelectItem) {
        return useIdValue ? getValue(selection) : selection;
    }

    function getLabel(v: any) {
        if (v == null) return v;
        if (typeof v === 'object') return v[label];
        const item = items?.find((i) => i[itemId] === v);
        return item ? item[label] : v;
    }

    function hiddenFieldValue() {
        if (value == null) return null;
        if (useIdValue) {
            if (multiple && Array.isArray(value)) return JSON.stringify(value);
            return `${value}`;
        }
        return JSON.stringify(value);
    }

    function convertStringItemsToObjects(_items: unknown[]): SelectItem[] {
        return _items.map((item, index) => {
            return {
                index,
                value: item,
                label: `${item}`,
            };
        });
    }

    function filterGroupedItems(_items: SelectItem[]): SelectItem[] {
        if (!groupBy) return _items;

        const groupValues: string[] = [];
        const groups: Record<string, SelectItem[]> = {};

        _items.forEach((item) => {
            const groupValue = groupBy(item) ?? '';

            if (!groupValues.includes(groupValue)) {
                groupValues.push(groupValue);
                groups[groupValue] = [];

                if (groupValue) {
                    groups[groupValue].push(
                        Object.assign(createGroupHeaderItem(groupValue, item), {
                            id: groupValue,
                            groupHeader: true,
                            selectable: groupHeaderSelectable,
                        }),
                    );
                }
            }

            groups[groupValue].push(Object.assign({ groupItem: !!groupValue }, item));
        });

        const sortedGroupedItems: SelectItem[] = [];

        groupFilter(groupValues).forEach((groupValue) => {
            if (groups[groupValue]) sortedGroupedItems.push(...groups[groupValue]);
        });

        return sortedGroupedItems;
    }

    function dispatchSelectedItem() {
        if (multiple) {
            if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
                // Fire on change and on clear; skip when duplicates were stripped
                if (!value || checkValueForDuplicates()) {
                    oninput?.(value);
                }
            }
            return;
        }

        if (value) {
            if (!prev_value || JSON.stringify(getValue(value)) !== JSON.stringify(getValue(prev_value))) {
                oninput?.(value);
            }
        } else if (prev_value) {
            oninput?.(value);
        }
    }

    function setupMulti() {
        prev_multiple = true;
        if (!value) return;
        if (!Array.isArray(value)) {
            value = [value];
        }
    }

    function setupSingle() {
        prev_multiple = false;
        if (value) value = undefined;
    }

    function setValueIndexAsHoverIndex() {
        const valueIndex = filteredItems.findIndex((i: SelectItem) => {
            return i[itemId] === getValue(value);
        });

        checkHoverSelectable(valueIndex, true);
    }

    function checkHoverSelectable(startingIndex = 0, ignoreGroup?: boolean) {
        const newIndex = startingIndex < 0 ? 0 : startingIndex;
        if (hoverItemIndex !== newIndex) hoverItemIndex = newIndex;
        if (!ignoreGroup && groupBy && filteredItems[hoverItemIndex] && !filteredItems[hoverItemIndex].selectable) {
            setHoverIndex(1);
        }
    }

    function setupFilterText() {
        if (!loadOptions && filterText.length === 0) return;

        if (loadOptions) {
            debounce(async function () {
                loading = true;
                let res = await getItems({
                    onerror,
                    onloaded,
                    loadOptions,
                    convertStringItemsToObjects,
                    filterText,
                });

                if (res) {
                    loading = res.loading;
                    listOpen = listOpen ? res.listOpen : filterText.length > 0 ? true : false;
                    focused = listOpen && res.focused;
                    items = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;
                } else {
                    loading = false;
                    focused = true;
                    listOpen = true;
                }
            }, debounceWait);
        } else {
            if (!listOpen) listOpen = true;

            if (multiple) {
                activeValue = undefined;
            }
        }
    }

    const hasValue = $derived(multiple ? Array.isArray(value) && value.length > 0 : !!value);
    const hideSelectedItem = $derived(hasValue && filterText.length > 0);
    const showClear = $derived(hasValue && clearable && !disabled && !loading);
    const placeholderText = $derived(
        placeholderAlwaysShow && multiple
            ? placeholder
            : multiple && Array.isArray(value) && value.length === 0
              ? placeholder
              : value
                ? ''
                : placeholder,
    );
    const filteredItems = $derived(
        filter({
            loadOptions,
            filterText,
            items,
            multiple,
            value,
            itemId,
            groupBy,
            label,
            filterSelectedItems,
            itemFilter,
            convertStringItemsToObjects,
            filterGroupedItems,
        }),
    );

    const listDom = $derived(!!listElement);
    const scrollToHoverItem = $derived(hoverItemIndex);

    function handleAriaSelection(_multiple: boolean) {
        let selected: unknown = undefined;

        if (_multiple && Array.isArray(value) && value.length > 0) {
            selected = value.map((v) => getLabel(v)).join(', ');
        } else if (!Array.isArray(value) && value) {
            selected = getLabel(value);
        }

        return ariaValues(selected);
    }

    function handleAriaContent() {
        if (!filteredItems || filteredItems.length === 0) return '';
        let _item = filteredItems[hoverItemIndex];
        if (listOpen && _item) {
            let count = filteredItems ? filteredItems.length : 0;
            return ariaListOpen(_item[label], count);
        } else {
            return ariaFocused();
        }
    }

    const ariaSelection = $derived(value ? handleAriaSelection(multiple) : '');
    const ariaContext = $derived(handleAriaContent());

    let wasListOpen = false;

    $effect(() => {
        if (multiple) untrack(setupMulti);
    });

    $effect(() => {
        if (!multiple && prev_multiple) untrack(setupSingle);
    });

    $effect(() => {
        if (multiple && value && value.length > 1) untrack(checkValueForDuplicates);
    });

    $effect(() => {
        const currentItems = items;
        untrack(() => updateValueDisplay(currentItems));
    });

    // oninput for selection changes and clears (single + multiple)
    $effect(() => {
        value;
        untrack(dispatchSelectedItem);
    });

    $effect(() => {
        if (prev_focused && !focused && input) untrack(closeList);
    });

    $effect(() => {
        if (filterText !== prev_filterText) untrack(setupFilterText);
    });

    $effect(() => {
        if (!multiple && listOpen && value && filteredItems) untrack(setValueIndexAsHoverIndex);
    });

    $effect(() => {
        onhoverItem?.(hoverItemIndex);
    });

    $effect(() => {
        if (listOpen && filteredItems && !multiple && !value) untrack(checkHoverSelectable);
    });

    $effect(() => {
        if (listOpen) onfilter?.(filteredItems);
    });

    // Reset hover when the list opens for multiple (not while it stays open)
    $effect(() => {
        if (listOpen && multiple && !wasListOpen) {
            hoverItemIndex = 0;
        }
        wasListOpen = listOpen;
    });

    $effect(() => {
        if (input && listOpen && !focused) untrack(handleFocus);
    });

    $effect(() => {
        if (filterText !== prev_filterText && filterText) {
            untrack(checkHoverSelectable);
        }
    });

    $effect(() => {
        if (listOpen && container && listElement) untrack(setListWidth);
    });

    $effect(() => {
        if (container && floatingConfig?.autoUpdate === undefined) {
            _floatingConfig.autoUpdate = true;
        }
        if (container && floatingConfig) floatingUpdate(Object.assign(_floatingConfig, floatingConfig));
    });

    $effect(() => {
        listMounted(listElement, listOpen);
    });

    // Sync previous values after other effects so they can compare against last run
    $effect(() => {
        prev_value = value;
        prev_filterText = filterText;
        prev_multiple = multiple;
        prev_focused = focused;
    });

    function checkValueForDuplicates() {
        let noDuplicates = true;
        if (value && Array.isArray(value)) {
            const ids: unknown[] = [];
            const uniqueValues: SelectItem[] = [];

            value.forEach((val: SelectItem) => {
                if (!ids.includes(getValue(val))) {
                    ids.push(getValue(val));
                    uniqueValues.push(val);
                } else {
                    noDuplicates = false;
                }
            });

            if (!noDuplicates) value = uniqueValues;
        }
        return noDuplicates;
    }

    function findItem(selection?: SelectItem) {
        let matchTo = selection ? getValue(selection) : getValue(value);
        return items?.find((item) => item[itemId] === matchTo);
    }

    function updateValueDisplay(currentItems: SelectItem[] | null) {
        if (valueMode !== 'item') return;
        if (!currentItems || currentItems.length === 0 || currentItems.some((item) => typeof item !== 'object')) return;
        if (
            !value ||
            (multiple
                ? !Array.isArray(value) || value.some((selection) => !selection || typeof selection !== 'object')
                : typeof value !== 'object')
        )
            return;

        if (Array.isArray(value)) {
            const newValue = value.map((selection) => findItem(selection) || selection);
            if (JSON.stringify(newValue) !== JSON.stringify(value)) value = newValue;
        } else {
            const newValue = findItem() || value;
            if (JSON.stringify(newValue) !== JSON.stringify(value)) value = newValue;
        }
    }

    async function handleMultiItemClear(i: number) {
        if (!Array.isArray(value)) return;

        const itemToRemove = value[i];

        if (value.length === 1) {
            value = undefined;
        } else {
            value = value.filter((item) => {
                return item !== itemToRemove;
            });
        }

        onclear?.(itemToRemove);
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (!focused) return;
        e.stopPropagation();
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeList();
                break;
            case 'Enter':
                e.preventDefault();

                if (listOpen) {
                    if (filteredItems.length === 0) break;
                    const hoverItem = filteredItems[hoverItemIndex];

                    if (value && !multiple && getValue(value) === hoverItem[itemId]) {
                        closeList();
                        break;
                    } else {
                        handleSelect(filteredItems[hoverItemIndex]);
                    }
                }

                break;
            case 'ArrowDown':
                e.preventDefault();

                if (listOpen) {
                    setHoverIndex(1);
                } else {
                    listOpen = true;
                    activeValue = undefined;
                }

                break;
            case 'ArrowUp':
                e.preventDefault();

                if (listOpen) {
                    setHoverIndex(-1);
                } else {
                    listOpen = true;
                    activeValue = undefined;
                }

                break;
            case 'Tab':
                if (listOpen && focused) {
                    if (
                        filteredItems.length === 0 ||
                        (value && getValue(value) === filteredItems[hoverItemIndex][itemId])
                    )
                        return closeList();

                    e.preventDefault();
                    handleSelect(filteredItems[hoverItemIndex]);
                    closeList();
                }

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
                if (!value || !multiple || filterText.length > 0) return;
                if (activeValue === undefined) {
                    activeValue = value.length - 1;
                } else if (value.length > activeValue && activeValue !== 0) {
                    activeValue -= 1;
                }
                break;
            case 'ArrowRight':
                if (!value || !multiple || filterText.length > 0 || activeValue === undefined) return;
                if (activeValue === value.length - 1) {
                    activeValue = undefined;
                } else if (activeValue < value.length - 1) {
                    activeValue += 1;
                }
                break;
        }
    }

    function handleFocus(e?: FocusEvent) {
        if (focused && input === document?.activeElement) return;
        if (e) onfocus?.(e);
        input?.focus();
        focused = true;
    }

    async function handleBlur(e?: FocusEvent) {
        if (isScrolling) return;
        if (listOpen || focused) {
            if (e) onblur?.(e);
            closeList();
            focused = false;
            activeValue = undefined;
            input?.blur();
        }
    }

    function handleClick() {
        if (disabled) return;
        if (filterText.length > 0) return (listOpen = true);
        listOpen = !listOpen;
    }

    export function handleClear() {
        onclear?.(value);
        value = undefined;
        closeList();
        handleFocus();
    }

    onMount(() => {
        if (listOpen) focused = true;
        if (focused && input) input.focus();
    });

    function itemSelected(selection: SelectItem) {
        if (selection) {
            filterText = '';
            const item = Object.assign({}, selection);

            if (item.groupHeader && !item.selectable) return;
            const selectedValue = toSelectionValue(selection);
            value = multiple ? (value ? value.concat([selectedValue]) : [selectedValue]) : selectedValue;

            setTimeout(() => {
                if (closeListOnChange) closeList();
                activeValue = undefined;
                onchange?.(value);
                onselect?.(selection);
            });
        }
    }

    function closeList() {
        if (clearFilterTextOnBlur && filterText !== '') {
            filterText = '';
        }
        if (listOpen) {
            listOpen = false;
        }
    }

    let isScrollingTimer: ReturnType<typeof setTimeout> | undefined;
    function handleListScroll() {
        clearTimeout(isScrollingTimer);
        isScrollingTimer = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    onDestroy(() => {
        listElement?.remove();
    });

    let isScrolling = false;

    function handleSelect(item: SelectItem) {
        if (!item || item.selectable === false) return;
        itemSelected(item);
    }

    function handleHover(i: number) {
        if (isScrolling) return;
        hoverItemIndex = i;
    }

    function handleItemClick(args: { item: SelectItem; i: number }) {
        const { item, i } = args;
        if (item?.selectable === false) return;
        if (value && !multiple && getValue(value) === item[itemId]) return closeList();
        if (isItemSelectable(item)) {
            hoverItemIndex = i;
            handleSelect(item);
        }
    }

    function setHoverIndex(increment: number) {
        let selectableFilteredItems = filteredItems.filter(
            (item: SelectItem) => !Object.hasOwn(item, 'selectable') || item.selectable === true,
        );

        if (selectableFilteredItems.length === 0) {
            return (hoverItemIndex = 0);
        }

        if (increment > 0 && hoverItemIndex === filteredItems.length - 1) {
            hoverItemIndex = 0;
        } else if (increment < 0 && hoverItemIndex === 0) {
            hoverItemIndex = filteredItems.length - 1;
        } else {
            hoverItemIndex = hoverItemIndex + increment;
        }

        const hover = filteredItems[hoverItemIndex];

        if (hover && hover.selectable === false) {
            if (increment === 1 || increment === -1) setHoverIndex(increment);
            return;
        }
    }

    function isItemActive(item: SelectItem, currentValue: SelectValue, currentItemId: string) {
        if (multiple) return;
        return currentValue && getValue(currentValue) === item[currentItemId];
    }

    function isItemFirst(itemIndex: number) {
        return itemIndex === 0;
    }

    function isItemSelectable(item: SelectItem) {
        return (item.groupHeader && item.selectable) || item.selectable || !item.hasOwnProperty('selectable');
    }

    const scrollAction: Action<HTMLElement, ScrollActionParameters> = (node) => {
        return {
            update(args: ScrollActionParameters) {
                if (args.scroll) {
                    handleListScroll();
                    node.scrollIntoView({ behavior: 'auto', block: 'nearest' });
                }
            },
        };
    };

    const activeScroll = scrollAction;
    const hoverScroll = scrollAction;

    function setListWidth() {
        if (!container || !listElement) return;

        const { width } = container.getBoundingClientRect();
        listElement.style.width = listAutoWidth ? width + 'px' : 'auto';
    }

    let _floatingConfig: ComputeConfig = {
        strategy: 'absolute',
        placement: 'bottom-start',
        // svelte-ignore state_referenced_locally
        middleware: [offset(listOffset), flip(), shift()],
        autoUpdate: false,
    };

    const [floatingRef, floatingContent, floatingUpdate] = createFloatingActions(_floatingConfig);

    let prefloat = $state(true);
    function listMounted(list: HTMLDivElement | null, isListOpen: boolean) {
        if (!list || !isListOpen) return (prefloat = true);
        setTimeout(() => {
            prefloat = false;
        }, 0);
    }

    function handleContainerPointerUp(e: PointerEvent) {
        e.preventDefault();
        handleClick();
    }

    function preventDefaultStopPropagation(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    function stopPropagation(e: Event) {
        e.stopPropagation();
    }

    function preventDefault(e: Event) {
        e.preventDefault();
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div
    class="svelte-select {containerClasses}"
    class:multi={multiple}
    class:disabled
    class:focused
    class:list-open={listOpen}
    class:show-chevron={showChevron}
    class:error={hasError}
    style={containerStyles}
    onpointerup={handleContainerPointerUp}
    bind:this={container}
    use:floatingRef
    role="none">
    {#if listOpen}
        <div
            use:floatingContent
            bind:this={listElement}
            class="svelte-select-list"
            class:prefloat
            onscroll={handleListScroll}
            onpointerup={preventDefaultStopPropagation}
            onmousedown={preventDefaultStopPropagation}
            role="none">
            {#if listPrepend}{@render listPrepend()}{/if}
            {#if listSnippet}{@render listSnippet({ filteredItems })}
            {:else if filteredItems.length > 0}
                {#each filteredItems as item, i}
                    <div
                        onmouseover={() => handleHover(i)}
                        onfocus={() => handleHover(i)}
                        onclick={(e) => {
                            stopPropagation(e);
                            handleItemClick({ item, i });
                        }}
                        onkeydown={preventDefaultStopPropagation}
                        class="list-item"
                        tabindex="-1"
                        role="none">
                        <div
                            use:activeScroll={{ scroll: isItemActive(item, value, itemId), listDom }}
                            use:hoverScroll={{ scroll: scrollToHoverItem === i, listDom }}
                            class="item"
                            class:list-group-title={item.groupHeader}
                            class:active={isItemActive(item, value, itemId)}
                            class:first={isItemFirst(i)}
                            class:hover={hoverItemIndex === i}
                            class:group-item={item.groupItem}
                            class:not-selectable={item?.selectable === false}>
                            {#if itemSnippet}{@render itemSnippet({ item, index: i })}
                            {:else}
                                {item?.[label]}
                            {/if}
                        </div>
                    </div>
                {/each}
            {:else if !hideEmptyState}
                {#if empty}{@render empty()}
                {:else}
                    <div class="empty">No options</div>
                {/if}
            {/if}
            {#if listAppend}{@render listAppend()}{/if}
        </div>
    {/if}

    <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="a11y-text">
        {#if focused}
            <span id="aria-selection">{ariaSelection}</span>
            <span id="aria-context">
                {ariaContext}
            </span>
        {/if}
    </span>

    <div class="prepend">
        {#if prepend}{@render prepend()}{/if}
    </div>

    <div class="value-container">
        {#if hasValue}
            {#if multiple}
                {#each value as item, i}
                    <div
                        class="multi-item"
                        class:active={activeValue === i}
                        class:disabled
                        onclick={(e) => {
                            preventDefault(e);
                            if (multiFullItemClearable) handleMultiItemClear(i);
                        }}
                        onkeydown={preventDefaultStopPropagation}
                        role="none">
                        <span class="multi-item-text">
                            {#if selection}{@render selection({ selection: item, index: i })}
                            {:else}
                                {getLabel(item)}
                            {/if}
                        </span>

                        {#if !disabled && !multiFullItemClearable && ClearIcon}
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div
                                class="multi-item-clear"
                                onpointerup={(e) => {
                                    preventDefaultStopPropagation(e);
                                    handleMultiItemClear(i);
                                }}>
                                {#if multiClearIcon}{@render multiClearIcon()}
                                {:else}
                                    <ClearIcon />
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/each}
            {:else}
                <div class="selected-item" class:hide-selected-item={hideSelectedItem}>
                    {#if selection}{@render selection({ selection: value })}
                    {:else}
                        {getLabel(value)}
                    {/if}
                </div>
            {/if}
        {/if}

        <input
            onkeydown={handleKeyDown}
            onblur={handleBlur}
            onfocus={handleFocus}
            readOnly={!searchable}
            {..._inputAttributes}
            bind:this={input}
            bind:value={filterText}
            placeholder={placeholderText}
            style={inputStyles}
            {disabled} />
    </div>

    <div class="indicators">
        {#if loading}
            <div class="icon loading" aria-hidden="true">
                {#if loadingIcon}{@render loadingIcon()}
                {:else}
                    <LoadingIcon />
                {/if}
            </div>
        {/if}

        {#if showClear}
            <button type="button" class="icon clear-select" onclick={handleClear} aria-label={ariaClearButton()}>
                {#if clearIcon}{@render clearIcon()}
                {:else}
                    <ClearIcon />
                {/if}
            </button>
        {/if}

        {#if showChevron}
            <div class="icon chevron" aria-hidden="true">
                {#if chevronIcon}{@render chevronIcon({ listOpen })}
                {:else}
                    <ChevronIcon />
                {/if}
            </div>
        {/if}
    </div>

    {#if inputHidden}{@render inputHidden({ value })}
    {:else}
        <input {name} type="hidden" value={hiddenFieldValue()} />
    {/if}

    {#if required && (!value || (Array.isArray(value) ? value.length === 0 : false))}
        {#if requiredIndicator}{@render requiredIndicator({ value })}
        {:else}
            <select class="required" required tabindex="-1" aria-hidden="true"></select>
        {/if}
    {/if}
</div>

<style>
    .svelte-select {
        --internal-padding: 0 0 0 16px;

        border: var(--border, 1px solid #d8dbdf);
        border-radius: var(--border-radius, 6px);
        min-height: var(--height, 42px);
        position: relative;
        display: flex;
        align-items: stretch;
        padding: var(--padding, var(--internal-padding));
        background: var(--background, #fff);
        margin: var(--margin, 0);
        width: var(--width, 100%);
        font-size: var(--font-size, 16px);
        max-height: var(--max-height);
    }

    * {
        box-sizing: var(--box-sizing, border-box);
    }

    .svelte-select:hover {
        border: var(--border-hover, 1px solid #b2b8bf);
    }

    .value-container {
        display: flex;
        flex: 1 1 0%;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px 10px;
        padding: var(--value-container-padding, 5px 0);
        position: relative;
        overflow: var(--value-container-overflow, hidden);
        align-self: stretch;
    }

    .prepend,
    .indicators {
        display: flex;
        flex-shrink: 0;
        align-items: center;
    }

    .indicators {
        position: var(--indicators-position);
        top: var(--indicators-top);
        right: var(--indicators-right);
        bottom: var(--indicators-bottom);
    }

    input {
        position: absolute;
        cursor: default;
        border: none;
        color: var(--input-color, var(--item-color));
        padding: var(--input-padding, 0);
        letter-spacing: var(--input-letter-spacing, inherit);
        margin: var(--input-margin, 0);
        min-width: 10px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: transparent;
        font-size: var(--font-size, 16px);
    }

    :not(.multi) > .value-container > input {
        width: 100%;
        height: 100%;
    }

    input::placeholder {
        color: var(--placeholder-color, #78848f);
        opacity: var(--placeholder-opacity, 1);
    }

    input:focus {
        outline: none;
    }

    .svelte-select.focused {
        border: var(--border-focused, 1px solid #006fe8);
        border-radius: var(--border-radius-focused, var(--border-radius, 6px));
    }

    .disabled {
        background: var(--disabled-background, #ebedef);
        border-color: var(--disabled-border-color, #ebedef);
        color: var(--disabled-color, #c1c6cc);
    }

    .disabled input::placeholder {
        color: var(--disabled-placeholder-color, #c1c6cc);
        opacity: var(--disabled-placeholder-opacity, 1);
    }

    .selected-item {
        position: relative;
        overflow: var(--selected-item-overflow, hidden);
        padding: var(--selected-item-padding, 0 20px 0 0);
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--selected-item-color, inherit);
        font-size: var(--font-size, 16px);
    }

    .multi .selected-item {
        position: absolute;
        line-height: var(--height, 42px);
        height: var(--height, 42px);
    }

    .selected-item:focus {
        outline: none;
    }

    .hide-selected-item {
        opacity: 0;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .clear-select {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--clear-select-width, 40px);
        height: var(--clear-select-height, 100%);
        color: var(--clear-select-color, var(--icons-color));
        margin: var(--clear-select-margin, 0);
        pointer-events: all;
        flex-shrink: 0;
    }

    .clear-select:focus {
        outline: var(--clear-select-focus-outline, 1px solid #006fe8);
    }

    .loading {
        width: var(--loading-width, 40px);
        height: var(--loading-height);
        color: var(--loading-color, var(--icons-color));
        margin: var(--loading--margin, 0);
        flex-shrink: 0;
    }

    .chevron {
        width: var(--chevron-width, 40px);
        height: var(--chevron-height, 40px);
        background: var(--chevron-background, transparent);
        pointer-events: var(--chevron-pointer-events, none);
        color: var(--chevron-color, var(--icons-color));
        border: var(--chevron-border, 0 0 0 1px solid #d8dbdf);
        flex-shrink: 0;
    }

    .multi {
        padding: var(--multi-select-padding, var(--internal-padding));
    }

    .multi input {
        padding: var(--multi-select-input-padding, 0);
        position: relative;
        margin: var(--multi-select-input-margin, 5px 0);
        flex: 1 1 40px;
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

    .multi-item {
        background: var(--multi-item-bg, #ebedef);
        margin: var(--multi-item-margin, 0);
        outline: var(--multi-item-outline, 1px solid #ddd);
        border-radius: var(--multi-item-border-radius, 4px);
        height: var(--multi-item-height, 25px);
        line-height: var(--multi-item-height, 25px);
        display: flex;
        cursor: default;
        padding: var(--multi-item-padding, 0 5px);
        overflow: hidden;
        gap: var(--multi-item-gap, 4px);
        outline-offset: -1px;
        max-width: var(--multi-max-width, none);
        color: var(--multi-item-color, var(--item-color));
    }

    .multi-item.disabled:hover {
        background: var(--multi-item-disabled-hover-bg, #ebedef);
        color: var(--multi-item-disabled-hover-color, #c1c6cc);
    }

    .multi-item-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .multi-item-clear {
        display: flex;
        align-items: center;
        justify-content: center;
        --clear-icon-color: var(--multi-item-clear-icon-color, #000);
    }

    .multi-item.active {
        outline: var(--multi-item-active-outline, 1px solid #006fe8);
    }

    .svelte-select-list {
        box-shadow: var(--list-shadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));
        border-radius: var(--list-border-radius, 4px);
        max-height: var(--list-max-height, 252px);
        overflow-y: auto;
        background: var(--list-background, #fff);
        position: var(--list-position, absolute);
        z-index: var(--list-z-index, 2);
        border: var(--list-border);
    }

    .prefloat {
        opacity: 0;
        pointer-events: none;
    }

    .list-group-title {
        color: var(--group-title-color, #8f8f8f);
        cursor: default;
        font-size: var(--group-title-font-size, 16px);
        font-weight: var(--group-title-font-weight, 600);
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--group-title-padding, 0 20px);
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
        text-transform: var(--group-title-text-transform, uppercase);
        border-width: var(--group-title-border-width, medium);
        border-style: var(--group-title-border-style, none);
        border-color: var(--group-title-border-color, color);
    }

    .empty {
        text-align: var(--list-empty-text-align, center);
        padding: var(--list-empty-padding, 20px 0);
        color: var(--list-empty-color, #78848f);
    }

    .item {
        cursor: default;
        height: var(--item-height, var(--height, 42px));
        line-height: var(--item-line-height, var(--height, 42px));
        padding: var(--item-padding, 0 20px);
        color: var(--item-color, inherit);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        transition: var(--item-transition, all 0.2s);
        align-items: center;
        width: 100%;
    }

    .item.group-item {
        padding-left: var(--group-item-padding-left, 40px);
    }

    .item:active {
        background: var(--item-active-background, #b9daff);
    }

    .item.active {
        background: var(--item-is-active-bg, #007aff);
        color: var(--item-is-active-color, #fff);
    }

    .item.first {
        border-radius: var(--item-first-border-radius, 4px 4px 0 0);
    }

    .item.hover:not(.active) {
        background: var(--item-hover-bg, #e7f2ff);
        color: var(--item-hover-color, inherit);
    }

    .item.not-selectable,
    .item.hover.item.not-selectable,
    .item.active.item.not-selectable,
    .item.not-selectable:active {
        color: var(--item-is-not-selectable-color, #999);
        background: transparent;
    }

    .required {
        opacity: 0;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>
