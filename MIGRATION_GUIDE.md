## Migrating for v4 to v5

v5 is a major release that that includes some ⚠️ BREAKING CHANGES ⚠️ 


Removed `Selection`, `ChevronIcon`, `ClearIcon`, `LoadingIcon`, `Icon` components, use named slots instead.

```html
<Select bind:items bind:value>
  <div slot="prepend" />
  <div slot="selection" let:selection />
  <div slot="clear-icon" />  
  <div slot="loading-icon" />  
  <div slot="chevron-icon" />  
</Select>
```

Removed `isVirtualList` instead `npm i svelte-tiny-virtual-list -D` and

```html
<script>
  import VirtualList from 'svelte-tiny-virtual-list';
</script>

<Select {VirtualList} />
```

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
`selectedValue` removed (was already deprecated in v4 in favour of `value`)<br/>
`loadOptionsInterval` → `debounceWait`
`isMulti` → `multiple`
`isWaiting` → `loading`
`isClearable` → `clearable`
`isCreatable` → `creatable`
`isFocused` → `focused`
`isGroupHeaderSelectable` → `groupHeaderSelectable`
`isDisabled` → `disabled`


### Event change:
The `select` event now only fires when the user selects an item. If you also want to track programmatic changes use the new `change` event.