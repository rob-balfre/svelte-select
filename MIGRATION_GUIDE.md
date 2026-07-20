## Migrating from v5 to v6

`svelte-select` v6 requires **Svelte 5**.

### 1. Replace `on:` events with callback props

`svelte-select` no longer uses `createEventDispatcher`. Pass callback functions as props instead.

| Before (Svelte 4) | After (Svelte 5) |
| ----------------- | ---------------- |
| `on:change={handle}` | `onchange={handle}` |
| `on:input={handle}` | `oninput={handle}` |
| `on:select={handle}` | `onselect={handle}` |
| `on:clear={handle}` | `onclear={handle}` |
| `on:filter={handle}` | `onfilter={handle}` |
| `on:hoverItem={handle}` | `onhoverItem={handle}` |
| `on:focus={handle}` | `onfocus={handle}` |
| `on:blur={handle}` | `onblur={handle}` |
| `on:loaded={handle}` | `onloaded={handle}` |
| `on:error={handle}` | `onerror={handle}` |

**Before:**

```svelte
<Select {items} on:change={(e) => console.log(e.detail)} />
```

**After:**

```svelte
<Select {items} onchange={(value) => console.log(value)} />
```

Callbacks receive their payload directly. There is no `event.detail` wrapper. `onfocus` and `onblur` still receive the native `FocusEvent`.

### 2. Replace named slots with snippets

Named slots are now snippet props. Kebab-case slot names become camelCase snippet names.

| Before (slot name) | After (snippet prop) |
| ------------------ | -------------------- |
| `prepend` | `prepend` |
| `selection` | `selection` |
| `clear-icon` | `clearIcon` |
| `multi-clear-icon` | `multiClearIcon` |
| `loading-icon` | `loadingIcon` |
| `chevron-icon` | `chevronIcon` |
| `list-prepend` | `listPrepend` |
| `list` | `list` |
| `list-append` | `listAppend` |
| `item` | `item` |
| `empty` | `empty` |
| `input-hidden` | `inputHidden` |
| `required` | `requiredIndicator` |

The `required` slot was renamed to `requiredIndicator` because `required` is already a boolean prop on `<Select>`.

**Before:**

```svelte
<Select {items}>
  <div slot="clear-icon">❌</div>
  <div slot="item" let:item let:index>
    {index}: {item.label}
  </div>
</Select>
```

**After:**

```svelte
<Select {items}>
  {#snippet clearIcon()}
    <div>❌</div>
  {/snippet}

  {#snippet item({ item, index })}
    <div>{index}: {item.label}</div>
  {/snippet}
</Select>
```

Snippet parameters match the old `let:` bindings:

- `selection({ selection, index })` — `index` is only passed when `multiple`
- `list({ filteredItems })`
- `item({ item, index })`
- `chevronIcon({ listOpen })`
- `inputHidden({ value })`
- `requiredIndicator({ value })`

### 3. Update two-way bindings

These props still support `bind:` as before:

`value`, `filterText`, `items`, `loading`, `listOpen`, `focused`, `hoverItemIndex`, `container`, `input`

No changes are needed if you already use `bind:value`, `bind:filterText`, and so on.

Some of these props provide default values, so if you `bind:` them, you need to provide a value (other than `undefined`) yourself to avoid a Svelte validation error.

### 4. Replace `justValue` with `valueMode`

`justValue` has been removed. It used to expose the selected id(s) as a read-only derived prop while `value` held the full item object(s). That split was confusing because the component could also silently change the shape of `value` (for example upgrading a string to `{ value, label }`).

**Use `valueMode` instead.** It makes the contract explicit:

| `valueMode` | Default | `value` shape (single) | `value` shape (multiple) | On select |
| ----------- | ------- | ---------------------- | ------------------------ | --------- |
| `'item'`    | yes     | item object            | array of item objects    | stores a shallow copy of the selected item |
| `'id'`      | no      | primitive (`string`, `number`, …) | array of primitives | stores `item[itemId]` |

`itemId` (default `'value'`) defines which field is used in `'id'` mode.

**Before (`justValue`):**

```svelte
<script>
  let value = $state({ value: 'one', label: 'One' });
  let justValue = $state();
</script>

<Select {items} bind:value bind:justValue />
<p>{justValue}</p>
```

**After (`valueMode="id"`):**

```svelte
<script>
  let value = $state('one');
</script>

<Select {items} valueMode="id" bind:value />
<p>{value}</p>
```

With a custom id field:

```svelte
<Select {items} itemId="foo" valueMode="id" bind:value />
```

#### Align `value`, `items`, and `valueMode`

The component no longer auto-repairs mismatched shapes. **`value`, `items`, and `valueMode` must agree**, or display, filtering, and selection can behave unexpectedly.

**`valueMode="item"` (default)** — use when you want the full selected row:

- `items` should be objects.
- `value` should be an item object, or an array of item objects when `multiple`.

**String / primitive item arrays** — no `valueMode` needed:

- `items={['Pizza', 'Chocolate']}` with `value="Pizza"` (or `bind:value` as a string) works with the default `valueMode`.
- String arrays are converted internally to `{ value, label }` for the list only; `value` stays the primitive and is **not** upgraded on select.

**`valueMode="id"`** — use when you only care about the identifier for **object** items (forms, APIs):

- `value` should be the primitive id: a string/number for single select, or an array of those for `multiple`.
- Each `value` entry must match `item[itemId]` for some item in `items`.
- On select, `value` stays a primitive — it is **not** upgraded to `{ value, label }`.

**Do not mix shapes within a mode.** For example, with object `items` and `valueMode="item"`, do not bind `value="'cake'"` and expect it to become an object. With `valueMode="id"`, do not bind `value={{ value: 'cake', label: 'Cake' }}` and expect `justValue`-style extraction — bind the id directly.

#### Snippets, hidden inputs, and events

- **`selection` snippet** — receives `value` in the active shape: an item object for object `items` in `'item'` mode; a primitive for `'id'` mode or string/primitive `items`.
- **`inputHidden` snippet** — same; default hidden input serializes objects as JSON for object `items` in `'item'` mode and writes the raw id (or JSON array of ids) for `'id'` mode or primitive `items`.
- **`onchange` / `oninput`** — payload matches `value` (`item` object vs primitive), not a separate `justValue`.

If you previously relied on `justValue` for form fields with object `items`, switch to `valueMode="id"` and bind `value`, or use the `inputHidden` snippet with the primitive directly.

### 5. Update imperative / programmatic usage

If you mount `<Select>` imperatively or access it via `bind:this`, note these changes:

**Component methods** — still available via `bind:this`:

```svelte
<Select bind:this={selectRef} {items} />

<button onclick={() => selectRef.handleClear()}>Clear</button>
<button onclick={() => selectRef.getFilteredItems()}>Log items</button>
```

**Tests and legacy mount APIs** — Svelte 5 uses `mount()` / `unmount()` instead of `new Component()` / `$destroy()`. Pass callback props in the `props` object instead of `$on()`:

```js
import { mount, unmount } from 'svelte';
import Select from 'svelte-select';

const select = mount(Select, {
  target: document.body,
  props: {
    items,
    onchange: (value) => { /* ... */ },
  },
});

// update props reactively (use a $state props object in .svelte.js test helpers)
unmount(select);
```

### 6. CamelCase CSS custom property aliases removed

In v5, camelCase CSS custom properties (for example `--borderRadius`) were kept as deprecated aliases that forwarded to kebab-case (`--border-radius`). Those aliases are **removed** in v6 — use kebab-case only.

**Before (still worked in v5 via aliases):**

```css
.svelte-select {
  --borderRadius: 8px;
  --itemHoverBG: #eee;
}
```

**After (v6):**

```css
.svelte-select {
  --border-radius: 8px;
  --item-hover-bg: #eee;
}
```

### 7. Update custom `getItems` overrides

If you override async loading with a custom `getItems` function, replace the `dispatch` argument with callback props:

**Before:**

```js
getItems({ dispatch, loadOptions, filterText, convertStringItemsToObjects })
// dispatch('loaded', { items })
// dispatch('error', { type: 'loadOptions', details: err })
```

**After:**

```js
getItems({ onloaded, onerror, loadOptions, filterText, convertStringItemsToObjects })
// onloaded?.({ items })
// onerror?.({ type: 'loadOptions', details: err })
```

---

## Migrating for v4 to v5

v5 is a major release that that includes some ⚠️ BREAKING CHANGES ⚠️ 

### Event changes:
Updated in `5.0.0-beta.39`

`on:change` event fires when the user selects an option.

`on:input` event fires when the value has been changed.

### Removed
Removed `getOptionLabel`, `getGroupHeaderLabel` and `noOptionsMessage`.

Removed `Selection`, `ChevronIcon`, `ClearIcon`, `LoadingIcon`, `Icon`, `List` and `Item` components. Please use named slots instead:

```html
<Select bind:items bind:value>
  <div slot="prepend" />
  <div slot="selection" let:selection />
  <div slot="clear-icon" />  
  <div slot="multi-clear-icon" />
  <div slot="loading-icon" />  
  <div slot="chevron-icon" />  
  <div slot="list" let:filteredItems />  
  <div slot="item" let:item let:index />  
  <div slot="empty" />  
</Select>
```

### `isVirtualList` Removed
You can use named slots to achieve the same results, with more flexibility.
Example at [svelte-select-examples](https://svelte-select-examples.vercel.app/examples/advanced/virtual-list)

### `isCreatable` Removed
Removed `isCreatable` prop and `itemCreated` event, named slots can be used to build your own create method.
Example at [svelte-select-examples](https://svelte-select-examples.vercel.app/examples/advanced/create-item)

### CSS Camel to kebab:

CSS classes and custom properties changed (only depreciated, no need to update if upgrading from v4) from camel to kebab case. For example `selectedItem` → `selected-item` and `--borderRadius` → `--border-radius`.

> **Note for later upgrades:** the camelCase CSS custom property *aliases* that made the old names still work were removed in v6. See [Migrating from v5 to v6](#migrating-from-v5-to-v6) §6.

### Redundant CSS custom properties:

The following CSS custom properties were removed in v5.

```css
--clearSelectColor
--clearSelectFocusColor
--clearSelectHoverColor
--groupTitleTextTransform
--indicatorColor
--indicatorFill
--indicatorHeight
--listLeft
--listRight
--multiClearBG
--multiClearFill
--multiClearHeight
--multiClearHoverBG
--multiClearHoverFill
--multiClearPadding
--multiClearRadius
--multiClearTextAlign
--multiClearTop
--multiClearWidth
--multiItemActiveBG
--multiItemActiveColor
--spinnerLeft
--spinnerRight
--virtualListHeight
```


### Other CSS class name changes:
`selectContainer` → `svelte-select`<br/>
`listContainer` → `svelte-select-list`<br/>
`indicator` → `chevron`<br/>
`--clear-icon-colour` → `--clear-icon-color`<br/>
`virtual-list` removed


### Prop changes:
`containerClasses` → `class`<br/>
`MultiSelection` → `Multi`<br/>
`indicatorSvg` → `ChevronIcon`<br/>
`showIndicator` → `showChevron`<br/>
`loadOptionsInterval` → `debounceWait`<br/>
`isMulti` → `multiple`<br/>
`isWaiting` → `loading`<br/>
`isClearable` → `clearable`<br/>
`isFocused` → `focused`<br/>
`isGroupHeaderSelectable` → `groupHeaderSelectable`<br/>
`isDisabled` → `disabled`<br/>
`isSearchable` → `searchable`<br/>
`labelIdentifier` -> `label`<br/>
`optionIdentifier` -> `itemId`<br/>
`selectedValue` removed (was already deprecated in v4 in favour of `value`)<br/>
