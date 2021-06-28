import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';


export default [
    {
        input: 'src/index.js',
        output: {
            dir: './dist',
        },
        plugins: [
            cleaner({
                targets: ['./dist/'],
            }),
            svelte({
                emitCss: true,
            }),
            css({ output: { dir: './dist' } }),
            terser(),
            resolve(),
        ],
    },
    {
        input: 'test/src/index.js',
        output: {
            dir: './test/public',
            inlineDynamicImports: true,
        },
        plugins: [
            svelte({
                emitCss: true,
                compilerOptions: {
                    accessors: true,
                    dev: true,
                },
            }),
            css({ output: { dir: './test/public' } }),
            resolve(),
        ],
    },
];
