import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Talks to Upstash's REST API directly with fetch rather than importing
// @vercel/kv here — that SDK pulls in a Node API that isn't supported in
// the Edge Runtime middleware runs on. The admin page (Node runtime) still
// uses the SDK normally to read these same counters.
async function incr(key: string): Promise<void> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return;

  await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function middleware(request: NextRequest) {
  const today = new Date().toISOString().slice(0, 10);

  try {
    await Promise.all([incr("pageviews:total"), incr(`pageviews:${today}`)]);
  } catch {
    // KV isn't configured yet, or is briefly unavailable — never let
    // analytics counting break the site itself.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|images|favicon.ico).*)"],
};
