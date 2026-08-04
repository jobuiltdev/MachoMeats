import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function POST() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 200 });
  }

  const today = new Date().toISOString().slice(0, 10);

  try {
    await Promise.all([redis.incr("pageviews:total"), redis.incr(`pageviews:${today}`)]);
    return NextResponse.json({ ok: true });
  } catch {
    // Never let analytics failures surface to the visitor.
    return NextResponse.json({ ok: false, reason: "error" }, { status: 200 });
  }
}
