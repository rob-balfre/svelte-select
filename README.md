# svelte-select

A select/autocomplete component for Svelte apps.  With support for grouping, filtering, async and more.

## Demos

🌱 [Simple demo](https://svelte.dev/repl/a859c2ba7d1744af9c95037c48989193?version=3.12.1)

🌻 [Advanced demo](https://svelte.dev/repl/3e032a58c3974d07b7818c0f817a06a3?version=3.20.1)

## Installation

```bash
yarn add svelte-select
```

**Note:** Install as a dev dependency (yarn add svelte-select --dev) if using [Sapper](https://sapper.svelte.dev/) to avoid a SSR error.


## Usage

```html
<script>
  import Select from 'svelte-select';

  let items = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Chips'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ];
  
  let selectedValue = undefined;
</script>

<Select {items} bind:selectedValue></Select>
```


## API

- `items: Array` Default: `[]`. List of selectable items that appear in the dropdown.
- `selectedValue: Any` Default: `undefined`. Selected item or items
- `filterText: String` Default: `''`. Text to filter `items` by.
- `placeholder: String` Default: `'Select...'`. Placeholder text.
- `noOptionsMessage: String` Default: `'No options'`. Message to display in list when there are no `items`.
- `optionIdentifier: String` Default: `'value;`. Override default identifier.
- `listOpen: Boolean` Default: `false`. Open/close list.
- `hideEmptyState: Boolean` Default: `false`. Hide list and don't show `noOptionsMessage` when there are no `items`.
- `containerClasses: String` Default: `''`. Add extra container classes, for example 'global-x local-y'.
- `containerStyles: String` Default: `''`. Add inline styles to container.
- `isClearable: Boolean` Default: `true`. Enable clearing of selected items.
- `isCreatable: Boolean` Default: `false`. Can create new item(s) to be added to `selectedValue`.
- `isDisabled: Boolean` Default: `false`. Disable select.
- `isMulti: Boolean` Default: `false`. Enable multi-select, `selectedValue` becomes an array of selected items.
- `isSearchable: Boolean` Default: `true`. Enable search/filtering of `items` via `filterText`.
- `isGroupHeaderSelectable: Boolean` Default: `false`. Enable selectable group headers in `items` (see adv demo).
- `listPlacement: String` Default: `'auto'`. When `'auto'` displays either `'top'` or `'bottom'` depending on viewport.
- `hasError: Boolean` Default: `false`. Show/hide error styles around select input (red border by default).
- `listAutoWidth: Boolean` Default: `true`. List width will grow wider than the Select container (depending on list item content length).
- `showIndicator: Boolean` Default: `false`. If true, the chevron indicator is always shown.
- `inputAttributes: Object` Default: `{}`. Useful for passing in HTML attributes like `'id'` to the Select input.

- `Item: Component` Default: `Item`. Item component.
- `Selection: Component` Default: `Selection`. Selection component.
- `MultiSelection: Component` Default: `MultiSelection`. Multi selection component.

- `indicatorSvg: @html` Default: `undefined`. Override default SVG chevron indicator.

- `isVirtualList: Boolean` Default: `false`. Uses [svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list) to render list (experimental).

### Exposed methods
If you really want to get your hands dirty these internal functions are exposed as props to override if needed. See the adv demo or look through the test file (test/src/index.js) for examples.

```js 
export let itemFilter = (label, filterText, option) => label.toLowerCase().includes(filterText.toLowerCase());
```

```js 
export let groupBy = undefined; // see adv demo for example
```

```js 
export let groupFilter = groups => groups;
```

```js 
export let createGroupHeaderItem = groupValue => {
  return {
    value: groupValue,
    label: groupValue
  };
};
```

```js 
export let createItem = filterText => {
  return {
    value: filterText,
    label: filterText
  };
};
```

```js 
export let getOptionLabel = (option, filterText) => {
  return option.isCreator ? `Create \"${filterText}\"` : option.label;
};
```

```js 
export let getSelectionLabel = option => {
  if (option) return option.label;
};
```

```js 
export let getGroupHeaderLabel = option => {
  return option.label;
};
```

```js 
export function handleClear() {
  selectedValue = undefined;
  listOpen = false;
  dispatch("clear", selectedValue);
  handleFocus();
}
```

```js 
export function handleClear() {
  selectedValue = undefined;
  listOpen = false;
  dispatch("clear", selectedValue);
  handleFocus();
}
```

```js 
export let loadOptions = undefined; // if used must return a Promise that updates 'items'
```

### Styling

You can style a component by overriding [the available CSS variables](/docs/theming_variables.md).

```html
<script>
  import Select from 'svelte-select';
  
  const items = ['One', 'Two', 'Three'];
</script>

<style>
  .themed {
    --border: 3px solid blue;
    --borderRadius: 10px;
    --placeholderColor: blue;
  }
</style>

<div class="themed">
  <h2>Theming</h2>
  <Select {items}></Select>  
</div>
```

You can also use the `inputStyles` prop to write in any override styles needed for the input.

```html
<script>
  import Select from 'svelte-select';
  
  const items = ['One', 'Two', 'Three'];
</script>

<Select {items} inputStyles="box-sizing: border-box;"></Select> 
```

## Events

| Event Name | Callback | Description |
|------|------|----------|
| select | selectedValue | fires when selectedValue changes
| clear | - | fires when clear all is invoked

```html
<script>
  import Select from 'svelte-select';

  let items = [...];
  function handleSelect(selectedVal) {
    ...
  }
  function onClear() {
    ...
  }
</script>

<Select {items} on:select={handleSelect} on:clear={handleClear}></Select>
```

## Development

```bash
yarn global add serve@8
yarn
yarn dev
yarn test:browser
```

In your favourite browser go to http://localhost:3000 and open devtools and see the console for the test output. When developing its handy to see the component on the page; comment out the `select.$destroy();` on the last test in /test/src/index.js or use the `test.only()` to target just one test.

For example: 

```js
test.only('when getSelectionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    props: {
      selectedValue: items[0],
      getSelectionLabel: (option) => `<p>${option.label}</p>`,
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === '<p>Chocolate</p>');

  //select.$destroy();
});

```


## Configuring webpack

If you're using webpack with [svelte-loader](https://github.com/sveltejs/svelte-loader), make sure that you add `"svelte"` to [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config. This ensures that webpack imports the uncompiled component (`src/index.html`) rather than the compiled version (`index.mjs`) — this is more efficient.

If you're using Rollup with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte), this will happen automatically.


## License

[LIL](LICENSE)
