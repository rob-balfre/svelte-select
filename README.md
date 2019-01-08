# svelte-select ([demo](https://svelte.technology/repl?version=2.16.0&gist=7d765f6616d632702d2131a7dc48ee0d))

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

## Development

```bash
yarn global add serve@8
yarn
yarn dev
```



## Configuring webpack

If you're using webpack with [svelte-loader](https://github.com/sveltejs/svelte-loader), make sure that you add `"svelte"` to [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config. This ensures that webpack imports the uncompiled component (`src/index.html`) rather than the compiled version (`index.mjs`) — this is more efficient.

If you're using Rollup with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte), this will happen automatically.


## License

[LIL](LICENSE)
 