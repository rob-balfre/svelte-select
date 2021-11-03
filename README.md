<div align="center">
  <img src="https://i.imgur.com/2Us5A4j.png" alt="Svelte Select" width="150" />
</div>

<br />

<div align="center">
  <a href="https://npmjs.org/package/svelte-select">
    <img src="https://badgen.now.sh/npm/v/svelte-select" alt="version" />
  </a>
  <a href="https://npmjs.org/package/svelte-select">
    <img src="https://badgen.now.sh/npm/dm/svelte-select" alt="downloads" />
  </a>
</div>

<br />

# svelte-select

A select/autocomplete component for Svelte apps.  With support for grouping, filtering, async and more.

## Demos

🌱 [Simple demo](https://svelte.dev/repl/a859c2ba7d1744af9c95037c48989193?version=3.12.1)

🌻 [Advanced demo](https://svelte.dev/repl/3e032a58c3974d07b7818c0f817a06a3?version=3.20.1)

## Installation

```bash
npm install svelte-select
```

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

  let value = {value: 'cake', label: 'Cake'};

  function handleSelect(event) {
    console.log('selected item', event.detail);
    // .. do something here 🙂
  }
</script>

<Select {items} {value} on:select={handleSelect}></Select>
```

## API

- `id: String` Default: `null`. Add an id to the input field.
- `items: Array` Default: `[]`. List of selectable items that appear in the dropdown.
- `value: Any` Default: `null`. Selected item or items.
- `filterText: String` Default: `''`. Text to filter `items` by.
- `placeholder: String` Default: `'Select...'`. Placeholder text.
- `noOptionsMessage: String` Default: `'No options'`. Message to display in list when there are no `items`.
- `optionIdentifier: String` Default: `'value'`. Override default identifier.
- `labelIdentifier: String` Default: `'label'`. Override default identifier.
- `listOpen: Boolean` Default: `false`. Open/close list.
- `hideEmptyState: Boolean` Default: `false`. Hide list and don't show `noOptionsMessage` when there are no `items`.
- `containerClasses: String` Default: `''`. Add extra container classes, for example 'global-x local-y'.
- `containerStyles: String` Default: `''`. Add inline styles to container.
- `isClearable: Boolean` Default: `true`. Enable clearing of selected items.
- `isCreatable: Boolean` Default: `false`. Can create new item(s) to be added to `value`.
- `isDisabled: Boolean` Default: `false`. Disable select.
- `isMulti: Boolean` Default: `false`. Enable multi-select, `value` becomes an array of selected items.
- `isSearchable: Boolean` Default: `true`. Enable search/filtering of `items` via `filterText`.
- `isGroupHeaderSelectable: Boolean` Default: `false`. Enable selectable group headers in `items` (see adv demo).
- `listPlacement: String` Default: `'auto'`. When `'auto'` displays either `'top'` or `'bottom'` depending on viewport.
- `hasError: Boolean` Default: `false`. Show/hide error styles around select input (red border by default).
- `listAutoWidth: Boolean` Default: `true`. List width will grow wider than the Select container (depending on list item content length).
- `showIndicator: Boolean` Default: `false`. If true, the chevron indicator is always shown.
- `inputAttributes: Object` Default: `{}`. Pass in HTML attributes to the Select input.
- `Item: Component` Default: `Item`. Item component.
- `Selection: Component` Default: `Selection`. Selection component.
- `Multi: Component` Default: `Multi`. Multi selection component.
- `Icon: Component` Default: `Icon`. Icon component.
- `iconProps: Object` Default: `{}`. Icon props.
- `indicatorSvg: @html` Default: `undefined`. Override default SVG chevron indicator.
- `ClearIcon` Default: `ClearIcon`. ClearIcon component.
- `isVirtualList: Boolean` Default: `false`. Uses [svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list) to render list (experimental).
- `filteredItems: Array` Default: `[]`. List of items that are filtered by `filterText`
- `placeholderAlwaysShow: Boolean` Default: `false`. When `isMulti` then placeholder text will always still show.
- `isWaiting: Boolean` Default: `false`. If true then loader shows. `loadOptions` will automatically set this as true until promise resolves.
- `listOffset: Number` Default: `5`. Controls the spacing offset between the list and the input.

### Items

`items` can be simple arrays or collections.

```html
<script>
  import Select from 'svelte-select';

  let simple = ['one', 'two', 'three'];

  let collection = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
  ];
</script>

<Select items={simple} />

<Select items={collection} />
```

They can also be grouped and include non-selectable items.

```html
<script>
  import Select from 'svelte-select';

  const items = [
    {value: 'chocolate', label: 'Chocolate', group: 'Sweet'},
    {value: 'pizza', label: 'Pizza', group: 'Savory'},
    {value: 'cake', label: 'Cake', group: 'Sweet', selectable: false},
    {value: 'chips', label: 'Chips', group: 'Savory'},
    {value: 'ice-cream', label: 'Ice Cream', group: 'Sweet'}
  ];

  const groupBy = (item) => item.group;
</script>

<Select {items} {groupBy} />

```

You can also use custom collections.

```html
<script>
  import Select from 'svelte-select';

  const optionIdentifier = 'id';
  const labelIdentifier = 'title';

  const items = [
    {id: 0, title: 'Foo'},
    {id: 1, title: 'Bar'},
  ];
</script>

<Select {optionIdentifier} {labelIdentifier} {items} />
```

### Async Items

To load items asynchronously then `loadOptions` is the simplest solution. Supply a function that returns a `Promise` that resolves with a list of items. `loadOptions` has debounce baked in and fires each time `filterText` is updated.

```html
<script>
  import Select from 'svelte-select';

  import { someApiCall } from './services';

  async function examplePromise(filterText) {
    // Put your async code here...
    // For example call an API using filterText as your search params
    // When your API responds resolve your Promise
    let res = await someApiCall(filterText);
    return res;
  }
</script>

<Select loadOptions={examplePromise} />
```

### Exposed methods
These internal functions are exposed to override if needed. See the adv demo or look through the test file (test/src/index.js) for examples.

```js
export let itemFilter = (label, filterText, option) => label.toLowerCase().includes(filterText.toLowerCase());
```

```js
export let groupBy = undefined;
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
  value = undefined;
  listOpen = false;
  dispatch("clear", value);
  handleFocus();
}
```

```js
export let loadOptions = undefined; // if used must return a Promise that updates 'items'
/* Return an object with { cancelled: true } to keep the loading state as active. */
```

```js
export const getFilteredItems = () => {
  return filteredItems;
};
```

## A11y (Accessibility)

Override these methods to change the `aria-context` and `aria-selection` text.

```js
export let ariaValues = (values) => {
  return `Option ${values}, selected.`;
}

export let ariaListOpen = (label, count) => {
  return `You are currently focused on option ${label}. There are ${count} results available.`;
}

export let ariaFocused = () => {
  return `Select is focused, type to refine list, press down to open the menu.`;
}
```

## Styling

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
| select | { detail } | fires when value changes
| clear | { detail } | fires when clear all is invoked or item is removed (by user) from multi select
| loaded | { items } | fires when `loadOptions` resolves
| error | { type, details } | fires when error is caught

```html
<script>
  import Select from 'svelte-select';

  let items = [...];
  function handleSelect(event) {
    // event.detail will contain the selected value
    ...
  }
  function handleClear(event) {
    // event.detail will be null unless isMulti is true and user has removed a single item
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
      value: items[0],
      getSelectionLabel: (option) => `<p>${option.label}</p>`,
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === '<p>Chocolate</p>');

  //select.$destroy();
});

```


## Configuring webpack

If you're using webpack with [svelte-loader](https://github.com/sveltejs/svelte-loader), make sure that you add `"svelte"` to [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config. This ensures that webpack imports the uncompiled component — this is more efficient.

If you're using Rollup with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte), this will happen automatically.


## License

[LIL](LICENSE)
