# svelte-select ([demo](https://stackblitz.com/edit/svelte-rhbzxj))

A select/autocomplete component for Svelte apps.  With support for grouping, filtering, async and more.

## Installation

```bash
yarn add svelte-select
```


## Usage

```html
<Select {items}></Select>

<script>
  import Select from 'svelte-select';

  export default {
    components: { Select },

    data() {
      return {
         items: [
          {value: 'chocolate', label: 'Chocolate'},
          {value: 'pizza', label: 'Pizza'},
          {value: 'cake', label: 'Cake'},
          {value: 'chips', label: 'Chips'},
          {value: 'ice-cream', label: 'Ice Cream'},
        ]
      };
    }
  };
</script>
```


## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | String | - | array of items
| filterText | String | - | text to filter list labels by
| placeholder | String | - | placeholder text
| optionIdentifier | String | 'value' | override default identifier
| listOpen | Boolean | false | open/close list
| containerStyles | String | - | add/override container styles 
| selectedValue | - | - | Selected value(s)
| groupBy | Function | - | Function to group list items
| isClearable | Boolean | true | Enable clearing selected items
| isDisabled | Boolean | false | Disable select
| isMulti | Boolean | false | Enable multi select
| isSearchable | Boolean | true | Disable search/filtering
| groupFilter | Function | (groups) => groups | group filter function
| getOptionLabel | Function | (option) => option.label | get option label function
| getSelectionLabel | Function | (option) => option.label | get selection label function
| Item | Component | Item | item component
| Selection | Component | Selection | selection component
| MultiSelection | Component | MultiSelection | multi selection component
| loadOptions | Promise | - | Method that returns a Promise that updates items
| noOptionsMessage | String | 'No options' | Message to display when there are no items  
| hideEmptyState | Boolean | false | Hide list when no options


## Events

| Event Name | Callback | Description |
|------|------|----------|
| select | selectedValue | fires when selectedValue changes
| clear | - | fires when clear all is invoked

```html
<Select {items} on:select="handleSelect(event)" on:clear="handleClear()"></Select>

<script>
  import Select from 'svelte-select';

  export default {
    components: { Select },

    data() {
      return {
         items: [...]
      };
    },
    methods: {
      handleSelect(selectedVal) {
        ...
      },
      onClear() {
        ...
      }
    }
  };
</script>
```

## Development

```bash
yarn global add serve@8
yarn
yarn dev
yarn test:browser
```


## Configuring webpack

If you're using webpack with [svelte-loader](https://github.com/sveltejs/svelte-loader), make sure that you add `"svelte"` to [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config. This ensures that webpack imports the uncompiled component (`src/index.html`) rather than the compiled version (`index.mjs`) — this is more efficient.

If you're using Rollup with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte), this will happen automatically.


## License

[LIL](LICENSE)
