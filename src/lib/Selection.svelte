<script>
    export let getSelectionLabel = undefined;
    export let item = undefined;
</script>

<div class="selection">
    {@html getSelectionLabel(item)}
</div>

<style>
    .selection {
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
        color: var(--selected-item-color, inherit);
    }
</style>
