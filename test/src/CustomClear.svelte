<style>
  .customClear {
    position: absolute;
    right: var(--clearSelectRight, 10px);
    top: var(--clearSelectTop, 11px);
    bottom: var(--clearSelectBottom, 11px);
    width: var(--clearSelectWidth, 20px);
    color: var(--clearSelectColor, #c5cacf);
    flex: none !important;
  }

  .customClear:hover {
    color: var(--clearSelectHoverColor, #2c3e50);
  }
</style>

<div class="customClear" on:click|preventDefault>Clear</div>

