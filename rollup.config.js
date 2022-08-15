import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import replace from 'rollup-plugin-replace';

export default [
    {
        input: 'test/src/tests.js',
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
            resolve({
                browser: true,
                exportConditions: ['development'],
            }),
            replace({
                'process.env.NODE_ENV': 'null',
            }),
        ],
    },
];
