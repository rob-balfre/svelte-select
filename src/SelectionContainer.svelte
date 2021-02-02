<style>
  .selectedItem {
    line-height: var(--height, 42px);
    height: var(--height, 42px);
    overflow-x: hidden;
    padding: var(--selectedItemPadding, 0 20px 0 0);
  }

  .selectedItem:focus {
    outline: none;
  }
</style>

<div class="selectedItem" on:focus>
  <slot/>
</div>
