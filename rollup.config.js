import svelte from 'rollup-plugin-svelte';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';

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
            nodeResolve({
                browser: true,
                exportConditions: ['svelte', 'development', 'browser'],
                dedupe: ['svelte'],
            }),
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': 'null',
            }),
        ],
    },
];
