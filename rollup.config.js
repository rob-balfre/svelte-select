import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
    .replace(/^\w/, (m) => m.toUpperCase())
    .replace(/-\w/g, (m) => m[1].toUpperCase());

export default [
    {
        input: 'test/src/index.js',
        output: {
            dir: './test/public',
            inlineDynamicImports: true,
        },
        plugins: [
            svelte({
                emitCss: false,
                compilerOptions: {
                    accessors: true,
                    dev: true,
                },
            }),
            css(),
            resolve(),
        ],
    },
];
