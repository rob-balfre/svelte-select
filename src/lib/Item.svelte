<script>
    export let isActive = false;
    export let isFirst = false;
    export let isHover = false;
    export let isSelectable = false;
    export let getOptionLabel = undefined;
    export let item = undefined;
    export let filterText = '';
    export let itemClass = 'item';
</script>

<div
    class={itemClass}
    class:active={isActive}
    class:first={isFirst}
    class:hover={isHover}
    class:group-item={item.isGroupItem}
    class:not-selectable={!isSelectable}>
    {@html getOptionLabel(item, filterText)}
</div>

<style>
    .item {
        cursor: default;
        height: var(--height, 42px);
        line-height: var(--height, 42px);
        padding: var(--itemPadding, 0 20px);
        color: var(--itemColor, inherit);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .item.group-item {
        padding-left: var(--groupItemPaddingLeft, 40px);
    }

    .item:active {
        background: var(--itemActiveBackground, #b9daff);
    }

    .item.active {
        background: var(--itemIsActiveBG, #007aff);
        color: var(--itemIsActiveColor, #fff);
    }

    .item.not-selectable {
        color: var(--itemIsNotSelectableColor, #999);
    }

    .item.first {
        border-radius: var(--itemFirstBorderRadius, 4px 4px 0 0);
    }

    .item.hover:not(.active) {
        background: var(--itemHoverBG, #e7f2ff);
        color: var(--itemHoverColor, inherit);
    }
</style>
