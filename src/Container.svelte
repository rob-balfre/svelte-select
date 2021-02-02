<script>
  export let containerClasses = '';
  export let containerStyles = '';
  export let hasError = false;
  export let instance;
  export let isDisabled = false;
  export let isFocused = false;
  export let isMulti = false;
</script>

<style>
  .selectContainer {
    --padding: 0 16px;

    border: var(--border, 1px solid #d8dbdf);
    border-radius: var(--borderRadius, 3px);
    height: var(--height, 42px);
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--padding);
    background: var(--background, #fff);
  }

  .selectContainer :global(input) {
    cursor: default;
    border: none;
    color: var(--inputColor, #3f4f5f);
    height: var(--height, 42px);
    line-height: var(--height, 42px);
    padding: var(--inputPadding, var(--padding));
    width: 100%;
    background: transparent;
    font-size: var(--inputFontSize, 14px);
    letter-spacing: var(--inputLetterSpacing, -0.08px);
    position: absolute;
    left: var(--inputLeft, 0);
  }

  .selectContainer :global(input::placeholder) {
    color: var(--placeholderColor, #78848f);
    opacity: var(--placeholderOpacity, 1);
  }

  .selectContainer :global(input:focus) {
    outline: none;
  }

  .selectContainer:hover {
    border-color: var(--borderHoverColor, #b2b8bf);
  }

  .selectContainer.focused {
    border-color: var(--borderFocusColor, #006fe8);
  }

  .selectContainer.disabled {
    background: var(--disabledBackground, #ebedef);
    border-color: var(--disabledBorderColor, #ebedef);
    color: var(--disabledColor, #c1c6cc);
  }

  .selectContainer.disabled :global(input::placeholder) {
    color: var(--disabledPlaceholderColor, #c1c6cc);
    opacity: var(--disabledPlaceholderOpacity, 1);
  }

  .selectContainer.multiSelect :global(input) {
    padding: var(--multiSelectInputPadding, 0);
    position: relative;
    margin: var(--multiSelectInputMargin, 0);
  }

  .selectContainer.focused :global(.clearSelect) {
    color: var(--clearSelectFocusColor, #3f4f5f);
  }

  .hasError {
    border: var(--errorBorder, 1px solid #ff2d55);
    background: var(--errorBackground, #fff);
  }

  .multiSelect {
    display: flex;
    padding: var(--multiSelectPadding, 0 35px 0 16px);
    height: auto;
    flex-wrap: wrap;
    align-items: stretch;
  }

  .multiSelect > * {
    flex: 1 1 50px;
  }
</style>

<div class="selectContainer {containerClasses}"
  class:hasError
  class:multiSelect={isMulti}
  class:disabled={isDisabled}
  class:focused={isFocused}
  style={containerStyles}
  on:click
  bind:this={instance}>
  <slot/>
</div>
