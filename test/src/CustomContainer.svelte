<script>
  export let instance;
</script>

<div class="customContainer"
  on:click
  bind:this={instance}>
  <slot/>
</div>
