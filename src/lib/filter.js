export default function filter({
    loadOptions,
    filterText,
    items,
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
}) {
    if (loadOptions && filterText.length > 0) return;
    if (!items) return [];

    if (items && items.length > 0 && typeof items[0] !== 'object') {
        items = convertStringItemsToObjects(items);
    }

    let filterResults = items.filter((item) => {
        let matchesFilter = itemFilter(getOptionLabel(item, filterText), filterText, item);

        if (matchesFilter && isMulti && value && Array.isArray(value)) {
            matchesFilter = !value.some((x) => {
                return x[optionIdentifier] === item[optionIdentifier];
            });
        }

        return matchesFilter;
    });

    if (groupBy) {
        filterResults = filterGroupedItems(filterResults);
    }

    if (isCreatable) {
        filterResults = addCreatableItem(filterResults, filterText);
    }

    return filterResults;
}
