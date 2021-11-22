<script>
    export let getSelectionLabel = undefined;
    export let item = undefined;
</script>

<div class="selection">
    {@html getSelectionLabel(item)}
</div>