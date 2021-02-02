<script>
  import SvelteSelect from '../../../src/Select.svelte';

  import Container from './Container.svelte';
  import Empty from './Empty.svelte';
  import Item from './Item.svelte';
  import ItemContainer from './ItemContainer.svelte';
  import ListContainer from './ListContainer.svelte';
  import SelectionContainer from './SelectionContainer.svelte';
  // You can also override the GroupItem component if necessary

  export let selectedValue = null;

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
    {Container}
    {Empty}
    {Item}
    {ItemContainer}
    {ListContainer}
    {SelectionContainer}
    {getSelectionLabel}
    {inputAttributes}
    {items}
    {optionIdentifier}
    bind:selectedValue
    placeholder="Search Objects..."/>
</div>
