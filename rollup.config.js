import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';
import path from 'path';

export default [
    {
        input: 'test/src/tests.js',
        output: {
            dir: './test/public',
            inlineDynamicImports: true,
        },
        plugins: [
            alias({
                resolve: ['.svelte', '.js'],
                entries: [
                    {
                        find: /\$lib\/(.*)/,
                        replacement: path.join(__dirname, 'src/lib/$1'),
                    },
                    {
                        find: '$app/env',
                        replacement: path.join(__dirname, 'test/src/env'),
                    }
                ],
            }),
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
