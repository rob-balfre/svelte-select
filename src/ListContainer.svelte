<script>
  export let instance;
  export let isVirtual = false;
</script>

<style>
  .listContainer {
    box-shadow: var(--listShadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));
    border-radius: var(--listBorderRadius, 4px);
    max-height: var(--listMaxHeight, 250px);
    overflow-y: auto;
    background: var(--listBackground, #fff);
  }

  .virtualList {
    height: var(--virtualListHeight, 200px);
  }
</style>

<div class="listContainer"
  class:virtualList={isVirtual}
  bind:this={instance}>
  <slot/>
</div>
