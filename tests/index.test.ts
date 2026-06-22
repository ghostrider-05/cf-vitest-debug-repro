import { test, expect } from 'vitest'

import { createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { env } from 'cloudflare:workers';

import worker from '../src/index'

async function fetchWorker(path: string, init?: RequestInit<IncomingRequestCfProperties<unknown>> | undefined) {
    // For now, you'll need to do something like this to get a correctly-typed
    // `Request` to pass to `worker.fetch()`.
    const request = new Request<unknown, IncomingRequestCfProperties>("http://example.com" + path, init)

    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext()

    const response = await worker.fetch(request, env, ctx);

    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx)

    return response
}

async function spamWorker (path: string, times: number) {
    return await Promise.all(Array.from({ length: times }, () => {
        return fetchWorker(path)
            .then(res => expect(res.status).toBe(200))
    }))
}

test('fetch worker without ratelimited', async () => {
    await spamWorker('/message', 10)
})

test('fetch worker without ratelimited by resetting the binding', async () => {
    await spamWorker('/message', 10)
})
