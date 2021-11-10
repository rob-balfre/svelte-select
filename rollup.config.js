import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import postcss from 'rollup-plugin-postcss'


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
            postcss({
                extract: true
            }),
            // css(),
            resolve(),
        ],
    },
];
