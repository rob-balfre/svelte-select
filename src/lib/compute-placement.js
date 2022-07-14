export default function computePlacement({ parent, list, listPlacement, listOffset, listAutoWidth }) {
    const { top, bottom, left, height, width } = parent.getBoundingClientRect();

    let listStyle;
    let placementClass;

    const base = `position:fixed;left:${left}px;min-width:${width}px;width:${listAutoWidth ? width + 'px' : 'auto'};`;
    const _top = `bottom:${window.innerHeight - bottom + height + listOffset}px;`;
    const _bottom = `top:${top + height + listOffset}px;`;

    if (listPlacement === 'top') {
        listStyle = base + _top;
        placementClass = 'top';
    } else if (listPlacement === 'bottom') {
        listStyle = base + _bottom;
        placementClass = 'bottom';
    } else {
        listStyle = base + _bottom;
        placementClass = 'bottom';
        if (bottom + listOffset + list.offsetHeight > window.innerHeight) {
            listStyle = base + _top;
            placementClass = 'top';
        }
    }

    return {
        placementClass,
        listStyle,
    };
}
