import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/message", async (c) => {
  const { success } = await c.env.LIMITER.limit({ key: 'global' })
  if (!success) return c.text('Ratelimit', 429)
  return c.text("Hello Hono!");
});

export default app;
