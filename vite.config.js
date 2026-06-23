import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const config = defineConfig({
    plugins: [
        sveltekit({
            vitePlugin: {
                compilerOptions: {
                    hydratable: true,
                    accessors: true,
                    dev: true,
                },
            },
        }),
    ],
    optimizeDeps: {
        include: ['highlight.js', 'highlight.js/lib/core'],
    },
    test: {
        include: ['test/src/tests.js'],
        browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
            headless: true,
        },
    },
});

export default config;
