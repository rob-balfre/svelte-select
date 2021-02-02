<script>
  export let inputAttributes = {};
  export let inputStyles = '';
  export let instance;
  export let isDisabled = false;
  export let placeholderText = '';
  export let value = '';
</script>

<input
  {...inputAttributes}
  class="customInput"
  bind:this={instance}
  on:focus
  bind:value
  placeholder={placeholderText}
  style={inputStyles}
  disabled={isDisabled}/>
