<script>
  export let indicatorSvg = undefined;
</script>

<style>
  .indicator {
    position: absolute;
    right: var(--indicatorRight, 10px);
    top: var(--indicatorTop, 11px);
    width: var(--indicatorWidth, 20px);
    height: var(--indicatorHeight, 20px);
    color: var(--indicatorColor, #c5cacf);
  }

  .indicator svg {
    display: inline-block;
    fill: var(--indicatorFill, currentcolor);
    line-height: 1;
    stroke: var(--indicatorStroke, currentcolor);
    stroke-width: 0;
  }
</style>

<div class="indicator">
  {#if indicatorSvg}
    {@html indicatorSvg}
  {:else}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      focusable="false">
      <path
        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747
        3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0
        1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502
        0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0
        0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </svg>
  {/if}
</div>
