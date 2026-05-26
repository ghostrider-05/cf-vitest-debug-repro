import { MockAgent } from "cloudflare:test";
import { beforeEach } from "vitest";

const fetchMock = new class extends MockAgent {
    public constructor () {
        super()
    }
}

beforeEach(() => {
    fetchMock.activate()
})
