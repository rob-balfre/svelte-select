<script>
  import {onMount} from 'svelte';

  let container;

  onMount(() => {
    // This is a touch weird. We want the spacing to match
    // .form-control, but without requiring bootstrap via sass
    // for the $input-padding-x/y variables.
    const input = document.querySelector('.selectContainer input');
    const style = window.getComputedStyle(input);
    container.style.padding = style.padding;
    container.style.margin = style.margin;
  });
</script>

<style>
  .selectionContainer {
    pointer-events: none;
    position: absolute;
  }
</style>

<div class="selectionContainer" on:focus bind:this={container}>
  <slot/>
</div>
