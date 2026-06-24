export default function filter({
    loadOptions,
    filterText,
    items,
    multiple,
    value,
    itemId,
    groupBy,
    filterSelectedItems,
    itemFilter,
    convertStringItemsToObjects,
    filterGroupedItems,
    label,
}) {
    if (items && loadOptions) return items;
    if (!items) return [];

    if (items && items.length > 0 && typeof items[0] !== 'object') {
        items = convertStringItemsToObjects(items);
    }

    let filterResults = items.filter((item) => {
        let matchesFilter = itemFilter(item[label], filterText, item);
        if (matchesFilter && multiple && Array.isArray(value) && value.length) {
            matchesFilter = !value.some((x) => {
                const xValue = typeof x === 'object' && x != null ? x[itemId] : x;
                return filterSelectedItems ? xValue === item[itemId] : false;
            });
        }

        return matchesFilter;
    });

    if (groupBy) {
        filterResults = filterGroupedItems(filterResults);
    }

    return filterResults;
}
