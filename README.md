# svelte-select ([demo](https://svelte.technology/repl?version=2&gist=f5a127d9c21f529016d434dcbe405c3f))

A select component for Svelte apps.

## Installation

```bash
yarn add todo
```


## Usage

```html

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
 