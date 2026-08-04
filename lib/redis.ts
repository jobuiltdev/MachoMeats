import Redis from "ioredis";

// Reused across invocations on the same warm serverless instance instead of
// opening a new TCP connection per request.
let client: Redis | null = null;

export function getRedis(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  if (!client) {
    client = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
    client.on("error", () => {
      // Swallow connection errors here — callers already guard with try/catch
      // and an unhandled 'error' event would otherwise crash the process.
    });
  }

  return client;
}
