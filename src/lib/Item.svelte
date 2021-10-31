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