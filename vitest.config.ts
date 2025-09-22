import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
    test: {
        exclude: [
            'node_modules/**',
            '.wrangler/**',
        ],
        coverage: {
            provider: 'istanbul',
            reportOnFailure: true,
            reporter: [
                'json',
                'json-summary',
                'text',
            ],
        },
        poolOptions: {
            workers: {
                // remoteBindings: false,
                wrangler: {
                    configPath: "./wrangler.jsonc",
                },
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
            },
        },
    },
})