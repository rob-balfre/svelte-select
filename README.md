<div align="center">
  <img src="https://raw.githubusercontent.com/rob-balfre/svelte-select/master/svelte-select.png" alt="Svelte Select" width="150" />
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

[💥 Examples of every prop, callback, snippet and more 💥](https://svelte-select-examples.vercel.app)

[✨ REPL: Simple ✨](https://svelte.dev/repl/c3bbe052fdfc4e87a46ccd9091ee002b)

[💃 REPL: Show me everything 🕺](https://svelte.dev/repl/3df87e32340e4e9e85bf371becae2af0)

## Installation

```bash
npm install svelte-select
```

## Svelte 5

`svelte-select` v6+ requires **Svelte 5**. The component uses runes, callback props instead of `createEventDispatcher`, and snippet props instead of named slots.

If you are upgrading from an older version, see the [migration guide](/MIGRATION_GUIDE.md).


## Rollup and low/no-build setups

List position and floating is powered by `floating-ui`, see their [package-entry-points](https://github.com/floating-ui/floating-ui#package-entry-points) docs if you encounter build errors.



## Props

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| items                  | `any[]`   | `[]`            | Array of items available to display / filter                   |
| value                  | `any`     | `undefined`     | Selected value(s). Shape depends on `valueMode` — see below.   |
| valueMode              | `string`  | `item`          | `item`: full item object(s). `id`: primitive id(s) via `itemId`. String/primitive `items` keep primitive `value` without setting `id`. |
| itemId                 | `string`  | `value`         | Override default identifier                                    |
| label                  | `string`  | `label`         | Override default label                                         |
| id                     | `string`  | `null`          | id attr for input field                                        |
| filterText             | `string`  | `''`            | Text to filter `items` by                                      |
| placeholder            | `string`  | `Please select` | Placeholder text                                               |
| hideEmptyState         | `boolean` | `false`         | When no items hide list                                        |
| listOpen               | `boolean` | `false`         | Open/close list                                                |
| class                  | `string`  | `''`            | container classes                                              |
| containerStyles        | `string`  | `''`            | Add inline styles to container                                 |
| clearable              | `boolean` | `true`          | Enable clearing of value(s)                                    |
| disabled               | `boolean` | `false`         | Disable select                                                 |
| multiple               | `boolean` | `false`         | Enable multi-select                                            |
| searchable             | `boolean` | `true`          | If `false` search/filtering is disabled                        |
| groupHeaderSelectable  | `boolean` | `false`         | Enable selectable group headers                                |
| focused                | `boolean` | `false`         | Controls input focus                                           |
| listAutoWidth          | `boolean` | `true`          | If `false` will ignore width of select                         |
| showChevron            | `boolean` | `false`         | Show chevron                                                   |
| inputAttributes        | `object`  | `{}`            | Pass in HTML attributes to Select's input                      |
| placeholderAlwaysShow  | `boolean` | `false`         | When `multiple` placeholder text will always show              |
| loading                | `boolean` | `false`         | Shows `loading-icon`. `loadOptions` will override this         |
| listOffset             | `number`  | `5`             | `px` space between select and list                             |
| debounceWait           | `number`  | `300`           | `milliseconds` debounce wait                                   |
| floatingConfig         | `object`  | `{}`            | [Floating UI Config](https://floating-ui.com/)                 |
| hasError               | `boolean` | `false`         | If `true` sets error class and styles                          |
| name                   | `string`  | `null`          | Name attribute of hidden input, helpful for form actions       |
| required               | `boolean` | `false`         | If `Select` is within a `<form>` will restrict form submission |
| multiFullItemClearable | `boolean` | `false`         | When `multiple` selected items will clear on click             |
| closeListOnChange      | `boolean` | `true`          | After `onchange` list will close                               |
| clearFilterTextOnBlur  | `boolean` | `true`          | If `false`, `filterText` value is preserved on blur            |

These props support two-way binding: `value`, `filterText`, `items`, `loading`, `listOpen`, `focused`, `hoverItemIndex`, `container`, and `input`.


## Snippets

Customize parts of the select by passing snippet props. Kebab-case slot names from v4 map to camelCase snippet names (for example `clear-icon` → `clearIcon`, `list-prepend` → `listPrepend`). The `required` slot is now `requiredIndicator` to avoid clashing with the `required` prop.

```svelte
<Select {items}>
  {#snippet prepend()}{/snippet}
  {#snippet selection({ selection, index })}{/snippet} <!-- index only available when multiple -->
  {#snippet clearIcon()}{/snippet}
  {#snippet multiClearIcon()}{/snippet}
  {#snippet loadingIcon()}{/snippet}
  {#snippet chevronIcon({ listOpen })}{/snippet}
  {#snippet listPrepend()}{/snippet}
  {#snippet list({ filteredItems })}{/snippet}
  {#snippet listAppend()}{/snippet}
  {#snippet item({ item, index })}{/snippet}
  {#snippet empty()}{/snippet}
  {#snippet inputHidden({ value })}{/snippet}
  {#snippet requiredIndicator({ value })}{/snippet}
</Select>
```


## Callback props

Pass functions as props to respond to select behaviour. Callbacks receive their payload directly.

| Callback     | Payload                              | Description                                                                |
| ------------ | ------------------------------------ | -------------------------------------------------------------------------- |
| onchange     | `value`                              | Fires when the user selects an option                                      |
| oninput      | `value`                              | Fires when the bound value changes                                         |
| onselect     | `selection`                          | Fires with the selected item when an option is chosen                       |
| onfocus      | `FocusEvent`                         | Fires when the select input receives focus                                 |
| onblur       | `FocusEvent`                         | Fires when the select input loses focus                                    |
| onclear      | `value` or removed item              | Fires when clear is invoked or an item is removed from a multi select      |
| onloaded     | `{ items }`                          | Fires when `loadOptions` resolves                                          |
| onerror      | `{ type, details }`                  | Fires when an error is caught (for example a rejected `loadOptions`)       |
| onfilter     | `filteredItems`                    | Fires when `listOpen: true` and items are filtered                         |
| onhoverItem  | `hoverItemIndex`                     | Fires when the hovered list item index changes                             |

```svelte
<script>
  import Select from 'svelte-select';

  let items = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ];

  function handleChange(value) {
    console.log(value);
  }
</script>

<Select {items} onchange={handleChange} />
```


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

### valueMode

`valueMode` controls what shape `bind:value` uses. It must match how you pass `value` and how your `items` identify options (`itemId`, default `'value'`).

| Mode | `value` (single) | `value` (`multiple`) | On select |
| ---- | ---------------- | -------------------- | --------- |
| `item` (default) | item object | item object[] | list item |
| `id` | primitive id | primitive id[] | `item[itemId]` only |

- **`item`** — `value` is the full row. Use with object `items`. Labels come from `value.label` (or `label` prop).
- **`id`** — `value` is just the identifier. Use for forms/APIs when `items` are objects. Labels are resolved from `items` by matching `itemId`.

**String / primitive `items`:** when `items` is a string (or other primitive) array, `value` stays a matching primitive automatically — you do **not** need `valueMode="id"`. On select, `value` is not upgraded to `{ value, label }`.

For object `items`, `value` and `valueMode` must align — the component does not convert between shapes. Object `items` with `valueMode="id"` means `value` should be `'cake'`, not `{ value: 'cake', label: 'Cake' }`.

```html
<!-- string items → bind a string (no valueMode needed) -->
<Select items={['one', 'two']} bind:value />

<!-- object items, bind the id only -->
<Select items={collection} valueMode="id" bind:value />

<!-- object items, bind the full item (default) -->
<Select items={collection} bind:value />
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

### Exposed methods and overridable props

These props and methods are exposed for advanced customization. See `test/src/tests.js` for examples.

Override filtering, grouping, or async loading:

```svelte
<Select
  itemFilter={(label, filterText) => label.toLowerCase().includes(filterText.toLowerCase())}
  groupBy={(item) => item.group}
  groupFilter={(groups) => groups}
  createGroupHeaderItem={(groupValue) => ({ value: groupValue, label: groupValue })}
  loadOptions={async (filterText) => []}
  debounce={(fn, wait = 1) => setTimeout(fn, wait)}
  filter={customFilter}
  getItems={customGetItems}
/>
```

Imperative methods (via `bind:this`):

```js
// Returns the current filtered list items
getFilteredItems();

// Clears the current value and focuses the input
handleClear();
```

`loadOptions` must return a `Promise` that resolves with a list of items. Return `{ cancelled: true }` to keep the loading state active.

Core replaceable helpers live in [`get-items.js`](/src/lib/get-items.js) and [`filter.js`](/src/lib/filter.js).

## A11y (Accessibility)

Override these props to change the `aria-context` and `aria-selection` text.

```svelte
<Select
  ariaValues={(values) => `Option ${values}, selected.`}
  ariaListOpen={(label, count) =>
    `You are currently focused on option ${label}. There are ${count} results available.`}
  ariaFocused={() => `Select is focused, type to refine list, press down to open the menu.`}
/>
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
If you'd like to supply your own styles use: `import Select from 'svelte-select/no-styles'`. Then somewhere in your code or build pipeline add your own. There is a tailwind stylesheet via `import 'svelte-select/tailwind.css'`. It uses `@extend` so PostCSS is required.


## License

[LIL](LICENSE)
