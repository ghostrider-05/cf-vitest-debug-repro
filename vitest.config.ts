import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
    // Some test configuration
    test: {
        exclude: [
            'node_modules/**',
            '.wrangler/**',
        ],
        watch: false,
        setupFiles: ['./tests/setup.ts'],
        coverage: {
            provider: 'istanbul',
            reportOnFailure: true,
            reporter: [
                'json',
                'json-summary',
                'text',
            ],
        },
    },
    plugins: [
        cloudflareTest({
            wrangler: { configPath: "./wrangler.jsonc" },
            miniflare: {
                compatibilityFlags: [
                    'nodejs_compat',
                ],
                d1Databases: {
                    'TEST_PROJECT_BINDING': {
                        id: 'some_id',
                    },
                },
            },
        }),
    ],
})
