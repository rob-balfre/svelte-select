<script>
  export let hasError = false;
  export let instance;

  // our minimal example just uses the above; you could also integrate these
  /* export let isDisabled = false; */
  /* export let isFocused = false; */
</script>

<style>
  .selectContainer {
    position: relative;
    display: flex;
    align-items: center;
  }
</style>

<div class="selectContainer"
  class:hasError
  class:border-danger={hasError}
  on:click
  bind:this={instance}>
  <slot/>
</div>
