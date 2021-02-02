<script>
  // the full default implementation is in src/ListContainer.svelte

  // minimally, we must provide a reference to the container back to the parent
  export let instance;
</script>

<div class="list-group shadow" bind:this={instance}>
  <slot/>
</div>
