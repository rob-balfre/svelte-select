<div align="center">
  <img src="https://raw.githubusercontent.com/rob-balfre/svelte-select/feature/v5/svelte-select.png" alt="Svelte Select" width="150" />
  <h1>Svelte Select</h1>
</div>

<div align="center">
  <a href="https://npmjs.org/package/svelte-select">
    <img src="https://badgen.now.sh/npm/v/svelte-select" alt="version" />
  </a>
  <a href="https://npmjs.org/package/svelte-select">
    <img src="https://badgen.now.sh/npm/dm/svelte-select" alt="downloads" />
  </a>
</div>
<div align="center">A select/autocomplete/typeahead Svelte component.</div>

## Examples

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/rob-balfre/svelte-select/tree/feature/v5?file=EXAMPLES.md)


## Installation

```bash
npm install svelte-select@beta
```

## Upgrading to v5
See [migration guide](/MIGRATION_GUIDE.md) if upgrading from v4 to v5.


## Rollup and low/no-build setups

List position and floating is powered by `floating-ui` see [package-entry-points](`https://github.com/floating-ui/floating-ui#package-entry-points`) docs if you encounter build errors.



## Props

| Prop                  | Type      | Default         | Description                                                |
| --------------------- | --------- | --------------- | ---------------------------------------------------------- |
| items                 | `any[]`   | `[]`            | Array of items available to display / filter               |
| value                 | `any`     | `null`          | Selected value(s)                                          |
| justValue             | `any`     | `null`          | **READ-ONLY** Selected value(s) excluding container object |
| itemId                | `string`  | `value`         | Override default identifier                                |
| label                 | `string`  | `label`         | Override default label                                     |
| id                    | `string`  | `null`          | id attr for input field                                    |
| filterText            | `string`  | `''`            | Text to filter `items` by                                  |
| placeholder           | `string`  | `Please select` | Placeholder text                                           |
| hideEmptyState        | `boolean` | `false`         | When no items hide list                                    |
| listOpen              | `boolean` | `false`         | Open/close list                                            |
| class                 | `string`  | `''`            | container classes                                          |
| containerStyles       | `string`  | `''`            | Add inline styles to container                             |
| clearable             | `boolean` | `true`          | Enable clearing of value(s)                                |
| disabled              | `boolean` | `false`         | Disable select                                             |
| multiple              | `boolean` | `false`         | Enable multi-select                                        |
| searchable            | `boolean` | `true`          | If `false` search/filtering is disabled                    |
| groupHeaderSelectable | `boolean` | `false`         | Enable selectable group headers                            |
| focused               | `boolean` | `false`         | Controls input focus                                       |
| listAutoWidth         | `boolean` | `true`          | If `false` will ignore width of select                     |
| showChevron           | `boolean` | `false`         | Show chevron                                               |
| inputAttributes       | `object`  | `{}`            | Pass in HTML attributes to Select's input                  |
| placeholderAlwaysShow | `boolean` | `false`         | When `multiple` placeholder text will always show          |
| loading               | `boolean` | `false`         | Shows `loading-icon`. `loadOptions` will override this     |
| listOffset            | `number`  | `5`             | `px` space between select and list                         |
| debounceWait          | `number`  | `300`           | `milliseconds` debounce wait                               |
| floatingConfig        | `object`  | `{}`            | Config for to handle advanced list floating                |


## Named slots

```svelte
<Select>
  <div slot="prepend" />
  <div slot="selection" let:selection />
  <div slot="clear-icon" />  
  <div slot="multi-clear-icon" />  
  <div slot="loading-icon" />  
  <div slot="chevron-icon" /> 
  <div slot="list" let:filteredItems />  
  <div slot="item" let:item let:index />  
  <!-- Remember you can also use `svelte:fragment` to avoid a container DOM element. -->
  <svelte:fragment slot="empty" />  
</Select>
```


## Events

| Event Name | Callback          | Description                                                                    |
| ---------- | ----------------- | ------------------------------------------------------------------------------ |
| select     | { detail }        | fires when item is selected                                                    |
| change     | { detail }        | fires when value changes                                                       |
| focus      | { detail }        | fires when select > input on:focus                                             |
| blur       | { detail }        | fires when select > input on:blur                                              |
| clear      | { detail }        | fires when clear all is invoked or item is removed (by user) from multi select |
| loaded     | { options }       | fires when `loadOptions` resolves                                              |
| error      | { type, details } | fires when error is caught                                                     |


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

  const itemId = 'id';
  const label = 'title';

  const items = [
    {id: 0, title: 'Foo'},
    {id: 1, title: 'Bar'},
  ];
</script>

<Select {itemId} {label} {items} />
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


### Advanced List Positioning / Floating 

`svelte-select` uses [floating-ui](https://floating-ui.com/) to control the list floating. See their docs and pass in your config via the `floatingConfig` prop.

```html
<script>
  import Select from 'svelte-select';

  let floatingConfig = {
    strategy: 'fixed'
  }
</script>

<Select {floatingConfig} />
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

```js
export function debounce(fn, wait = 1) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, ...args), wait);
    };
}
```

```js
export const sanitiseLabel = (text) => text && `${text}`.replace(/\</gi, '&lt;');
```

> Override core functionality at your own risk! See ([get-items.js](/src/lib/get-items.js) & [filter.js](/src/lib/filter.js))
```js
    // core replaceable methods...
    <Select 
      filter={...}
      getItems={...}
    />
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

## CSS custom properties (variables)

You can style a component by overriding [the available CSS custom properties](/docs/theming_variables.md).

```html
<script>
  import Select from 'svelte-select';
</script>

<Select --border-radius= "10px" --placeholder-color="blue" />
```

You can also use the `inputStyles` prop to write in any override styles needed for the input.

```html
<script>
  import Select from 'svelte-select';

  const items = ['One', 'Two', 'Three'];
</script>

<Select {items} inputStyles="box-sizing: border-box;"></Select>
```

### 🧪 Experimental: Replace styles (Tailwind, Bootstrap, Bulma etc)
If you'd like to supply your own styles use: `import Select from 'svelte-select/no-styles/Select.svelte'`. Then somewhere in your code or build pipeline add your own. There is a tailwind stylesheet via `import 'svelte-select/tailwind.css'`. It uses `@extend` so PostCSS is required.


## Development

```bash
npm i
npm run dev-tests
npm test:browser
```

Open http://localhost:3000 and see devtools console output. When developing it's useful to see the component on the page; comment out the `select.$destroy();` on test your debugging in /test/src/index.js and use `test.only()` to target just one test.

For example:

```js
test.only('...', async (t) => {
  const select = new Select({
    target,
    props: {
      ...
    }
  });

  t.ok(...);

  //select.$destroy();
});

```


## License

[LIL](LICENSE)
