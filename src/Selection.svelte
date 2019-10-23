<script>
  export let getSelectionLabel = undefined;
  export let item = undefined;
</script>

<style>
  .selection {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
</style>

<div class="selection">
  {@html getSelectionLabel(item)} 
</div>
