import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import cleaner from 'rollup-plugin-cleaner';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import html from '@rollup/plugin-html';

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
    .replace(/^\w/, (m) => m.toUpperCase())
    .replace(/-\w/g, (m) => m[1].toUpperCase());

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
            dir: './dist/test',
        },
        plugins: [
            cleaner({
                targets: ['./dist/test'],
            }),
            svelte({
                emitCss: false,
                accessors: true,
                compilerOptions: {
                    accessors: true,
                    dev: true,
                },
            }),
            css({ output: { dir: './dist/test' } }),
            html(),
            resolve(),
        ],
    },
];
