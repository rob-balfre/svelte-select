export default async function getItems({ onerror, onloaded, loadOptions, convertStringItemsToObjects, filterText }) {
    let res = await loadOptions(filterText).catch((err) => {
        console.warn('svelte-select loadOptions error :>> ', err);
        onerror?.({ type: 'loadOptions', details: err });
    });

    if (res && !res.cancelled) {
        if (res) {
            if (res && res.length > 0 && typeof res[0] !== 'object') {
                res = convertStringItemsToObjects(res);
            }

            onloaded?.({ items: res });
        } else {
            res = [];
        }

        return {
            filteredItems: res,
            loading: false,
            focused: true,
            listOpen: true,
        };
    }
}
