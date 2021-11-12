<script>
  import Select from '../../../src/lib/Select.svelte';

  export let value;
  export let items;
  export let imports;
</script>

<div class="container">
  <Select bind:value {items} {imports}></Select>

  <p class="result">{value.label}</p>
</div>
