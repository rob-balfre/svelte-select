const http = require("http");
const ports = require("port-authority");
const rollup = require("rollup");
const svelte = require("rollup-plugin-svelte");
const resolve = require("rollup-plugin-node-resolve");
const css = require("rollup-plugin-css-only");
const serve = require("rollup-plugin-serve");

module.exports = async () => {
  const port = await ports.find(1234);
  process.env.SERVER_PORT = port;

  const bundle = await rollup.rollup({
    input: "./spec/page/src/index.js",
    plugins: [
      svelte({
        emitCss: true,
        compilerOptions: {
          accessors: true,
          dev: true,
        },
      }),
      css({ output: { dir: "./spec/page/public/build" } }),
      resolve(),
      serve({
        contentBase: "./spec/page/public",
        host: "localhost",
        port,
      }),
    ],
  });

  await bundle.write({
    output: {
      dir: "./spec/page/public/build",
      inlineDynamicImports: true,
    },
  });

  return () => bundle.close();
};
