<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let selectedValue = [];
  export let activeSelectedValue = undefined;
  export let isDisabled = false;
  export let getSelectionLabel = undefined;

  function handleClear(i, event) {
    event.stopPropagation();
    dispatch('multiItemClear', {i});
  }
</script>

{#each selectedValue as value, i}
<div class="multiSelectItem {activeSelectedValue === i ? 'active' : ''} {isDisabled ? 'disabled' : ''}">
  <div class="multiSelectItem_label">
    {getSelectionLabel(value)}
  </div>
  {#if !isDisabled}
  <div class="multiSelectItem_clear" on:click="{event => handleClear(i, event)}">
    <svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" role="presentation">
      <path
        d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path>
    </svg>
  </div>
  {/if}
</div>
{/each}



<style>
  .multiSelectItem {
    background: #EBEDEF;
    margin-right: 5px;
    border-radius: 16px;
    line-height: 32px;
    display: flex;
    cursor: default;
    height: 32px;
    margin-top: 5px;
    padding: 0 10px 0 15px;
  }

  .multiSelectItem_label {
    margin-right: 5px;
  }

  .multiSelectItem_clear {
    border-radius: 0 4px 4px 0;
    width: 20px;
    text-align: center;
  }

  .multiSelectItem:hover,
  .multiSelectItem.active {
    background-color: #006FFF;
    color: #fff;
  }

  .multiSelectItem.disabled:hover {
    background: #EBEDEF;
    color: #C1C6CC;
  }

  .multiSelectItem_clear {
    border-radius: 50%;
    background: #52616F;
    width: 16px;
    height: 16px;
    position: relative;
    top: 8px;
    text-align: center;
    padding: 1px;
  }

  .multiSelectItem_clear:hover,
  .active .multiSelectItem_clear {
    background: #fff;
  }

  .multiSelectItem_clear:hover svg,
  .active .multiSelectItem_clear svg {
    fill: #006FFF;
  }

  .multiSelectItem_clear svg {
    fill: #EBEDEF;
    vertical-align: top;
  }
</style>
