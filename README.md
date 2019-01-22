# svelte-select ([demo](https://stackblitz.com/edit/svelte-rhbzxj))

A select component for Svelte apps.

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

## Select API options (props)

Common props you may want to specify include:

* `filterText` - text to filter list labels by
* `placeholder` - placeholder text
* `listOpen` - open/close list
* `containerStyles` - add/override container styles 
* `selectedValue` - Selected value(s) 
* `groupBy` - Function to group list items
* `isClearable` - Defaults true set to false to disable clear all
* `isMulti` - Enable multi select
* `isSearchable` - Defaults true set to false to disable search/filtering
* `groupFilter` - Override default groupFilter function
* `getOptionLabel` - Override default getOptionLabel function
* `getSelectionLabel` - Override default getSelectionLabel function



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
