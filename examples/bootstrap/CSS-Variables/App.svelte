<script>
  import SvelteSelect from '../../../src/Select.svelte';

  let selectedValue = null;

  const optionIdentifier = 'id';
  const getSelectionLabel = item => item.name;

  // apply the Bootstrap class to svelte-select's internal input
  const inputAttributes = {
    class: 'form-control'
  };

  const items = [
    {id: 1, name: 'First'},
    {id: 2, name: 'Second'},
    {id: 3, name: 'Third'}
  ];

</script>

<div class="form-group">
  <SvelteSelect
    {getSelectionLabel}
    {inputAttributes}
    {items}
    {optionIdentifier}
    bind:selectedValue
    placeholder="Search Objects..."/>
</div>

<!--
  Bootstrap < 5.0
    Options:
      1. (This method) Use Sass and map bootstrap variables to the
         CSS Variables used by svelte-slect
      2. Use custom components to make more use of Bootstrap classes
         within svelte-select (works with Sass or bootstrap.min.css)
      3. Duplicate the values of the Bootstrap variables for your theme
         for the items you need to map to CSS Variables in svelte-select
         (not recommended; works with bootstrap.min.css)

  Bootstrap >= 5.0
    Options:
      1. (Similar to this method) Map Bootstrap's CSS Variables to those
      used by svelte-select (works with Sass or bootstrap.min.css)
        e.g.: --background: var(--input-bg)
      2. Use custom components to make more use of Bootstrap classes
         within svelte-select (works with Sass or bootstrap.min.css)
-->
<style lang="scss" global>
  /* if you are using a bootswatch-esque theme, import the variables here */
  @import "bootstrap/scss/bootstrap.scss";
  /* if bootswatch, import the bootswatch.scss */

  .selectContainer {
    --background: #{$input-bg};
    --border: 1px solid #{$border-color};
    --placeholderColor: #{$input-placeholder-color};
    /* etc... */
  }
</style>

