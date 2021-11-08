<script>
  import Select from '../../../src/lib/Select.svelte';

  export let value;
  export let items;
  export let config;
</script>

<div class="container">
  <Select bind:value {items} {config}></Select>

  <p class="result">{value.label}</p>
</div>
