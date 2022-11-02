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

CSS classes and custom properties changed (only depreciated, no need to update if upgrading from v4) from camel to kebab case. For example `selectedItem` → `selected-item` and `--borderRadius` → `--border-radius`

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
`labelIdentifier` -> `label`<br/>
`optionIdentifier` -> `itemId`<br/>
`selectedValue` removed (was already deprecated in v4 in favour of `value`)<br/>
