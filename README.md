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

## Demos

🌱 [Simple demo](https://svelte.dev/repl/a859c2ba7d1744af9c95037c48989193?version=3.12.1)

🌻 [Advanced demo](https://svelte.dev/repl/3e032a58c3974d07b7818c0f817a06a3?version=3.20.1)

## Installation

```bash
npm install svelte-select
```

## Migrating for v4 to v5

v5 is a major release that that includes some ⚠️ BREAKING CHANGES ⚠️ 

Removed `isVirtualList` instead `npm i svelte-tiny-virtual-list -D` and

```svelte
<script>
  import VirtualList from 'svelte-tiny-virtual-list';
</script>

<Select VirtualList />
```

CSS classes and custom properties changed (just depreciated in v5) from camel to kebab case. For example `selectedItem` → `selected-item` and `--borderRadius` → `--border-radius`

### Other CSS class name changes:
`selectContainer` → `svelte-select`<br/>
`listContainer` → `list`<br/>
`indicator` → `chevron`<br/>
`virtual-list` removed

### Prop changes:
`containerClasses` → `class`<br/>
`MultiSelection` → `Multi`<br/>
`indicatorSvg` → `ChevronIcon`<br/>
`selectedValue` removed (was already deprecated in v4 in favour of `value`)<br/>
`loadOptionsInterval` → `debounceWait`


## Props


| Prop                    | Type      | Default         | Description                                        |
| ----------------------- | --------- | --------------- | -------------------------------------------------- |
| items                   | `array`   | `[]`            | Array items available to display / filter          |
| value                   | `any`     | `null`          | Selected value(s)                                  |
| justValue               | `any`     | `null`          | Selected value(s) excluding container object       |
| optionIdentifier        | `string`  | `value`         | Override default identifier                        |
| labelIdentifier         | `string`  | `label`         | Override default identifier                        |
| id                      | `string`  | `null`          | Add an id to the filter input field                |
| filterText              | `string`  | `''`            | Text to filter `items` by                          |
| placeholder             | `string`  | `Please select` | Placeholder text                                   |
| noOptionsMessage        | `string`  | `No options`    | Message displayed when no items                    |
| hideEmptyState          | `boolean` | `false`         | When no items hide list and `noOptionsMessage`     |
| listOpen                | `boolean` | `false`         | Open/close list                                    |
| class                   | `string`  | `''`            | container classes                                  |
| containerStyles         | `string`  | `''`            | Add inline styles to container                     |
| isClearable             | `boolean` | `true`          | Enable clearing of value(s)                        |
| isCreatable             | `boolean` | `false`         | Can create new item(s) to be added to `value`      |
| isDisabled              | `boolean` | `false`         | Disable select                                     |
| isMulti                 | `boolean` | `false`         | Enable multi-select                                |
| isSearchable            | `boolean` | `true`          | If `false` search/filtering is disabled            |
| isGroupHeaderSelectable | `boolean` | `false`         | Enable selectable group headers                    |
| listPlacement           | `string`  | `auto`          | Display list `'auto'`, `'top'` or `'bottom'`       |
| hasError                | `boolean` | `false`         | Show error styles around select input              |
| listAutoWidth           | `boolean` | `true`          | If `false` will ignore width of select             |
| showChevron             | `boolean` | `false`         | Show chevron at all times                          |
| inputAttributes         | `object`  | `{}`            | Pass in HTML attributes to Select's input          |
| iconProps               | `object`  | `{}`            | Icon props                                         |
| filteredItems           | `array`   | `[]`            | List of items after filtering (read only)          |
| placeholderAlwaysShow   | `boolean` | `false`         | When `isMulti` placeholder text will always show   |
| isWaiting               | `boolean` | `false`         | Show LoadingIcon. `loadOptions` will override this |
| listOffset              | `number`  | `5`             | `px` space between select and list                 |
| debounceWait            | `number`  | `300`           | `milliseconds` debounce wait                       |
| suggestions             | `array`   | `null`          | Show search suggestions before user input          |


### Replaceable components

| Import      | Type        | Description           |
| ----------- | ----------- | --------------------- |
| Item        | `component` | Item component        |
| Selection   | `component` | Selection component   |
| Multi       | `component` | Multi select support  |
| ChevronIcon | `component` | Chevron Icon          |
| ClearIcon   | `component` | Clear Icon            |
| LoadingIcon | `component` | Spinning Loading Icon |


### Optional component imports

| Import      | Type        | Description                                            |
| ----------- | ----------- | ------------------------------------------------------ |
| VirtualList | `component` | Virtual list support (uses `svelte-tiny-virtual-list`) |
| Icon        | `component` | Icon component                                         |


### Items

`items` can be simple arrays or collections.

```svelte
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

```svelte
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

```svelte
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

```svelte
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

```js
export function debounce(fn, wait = 1) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, ...args), wait);
    };
}
```

| debounce    | `function`  | Debounce function                                   |
| filter      | `function`  | Filter options function                             |
| loadOptions | `function`  | Return a `Promise` that resolves with items         |
| getItems    | `function`  | Take full control of async and loadOptions defaults |

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

You can style a component by overriding [the available CSS custom properties](/docs/theming_variables.md).

```svelte
<script>
  import Select from 'svelte-select';
</script>

<Select --border-radius= "10px" --placeholder-color="blue" />
```

You can also use the `inputStyles` prop to write in any override styles needed for the input.

```svelte
<script>
  import Select from 'svelte-select';

  const items = ['One', 'Two', 'Three'];
</script>

<Select {items} inputStyles="box-sizing: border-box;"></Select>
```

### Replace styles (Tailwind, Bootstrap, Bulma etc)
If you'd like to supply your own styles use: `import Select from 'svelte-select/no-styles/Select.svelte'`. Then somewhere in your code or build pipeline add your own. There is a tailwind stylesheet via `import 'svelte-select/tailwind.css'`. It uses `@extend` so PostCSS is required (experimental, feedback welcome). 

## Events

| Event Name | Callback          | Description                                                                    |
| ---------- | ----------------- | ------------------------------------------------------------------------------ |
| select     | { detail }        | fires when value changes                                                       |
| focus      | { detail }        | fires when select > input on:focus                                             |
| blur       | { detail }        | fires when select > input on:blur                                              |
| clear      | { detail }        | fires when clear all is invoked or item is removed (by user) from multi select |
| loaded     | { options }       | fires when `loadOptions` resolves                                              |
| error      | { type, details } | fires when error is caught                                                     |

## Development

```bash
npm i
npm run dev-tests
npm test:browser
```

Open http://localhost:3000 and see devtools console output. When developing it's useful to see the component on the page; comment out the `select.$destroy();` on test your debugging in /test/src/index.js and use `test.only()` to target just one test.

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


## License

[LIL](LICENSE)
