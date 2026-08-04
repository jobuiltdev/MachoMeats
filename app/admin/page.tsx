import type { Metadata } from "next";
import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/admin-auth";
import { loginAdmin, logoutAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function dateKey(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

async function getPageviewStats(): Promise<{
  total: number;
  days: { date: string; count: number }[];
  kvConfigured: boolean;
}> {
  const dayKeys = Array.from({ length: 7 }, (_, i) => dateKey(i));

  try {
    const [total, ...dayCounts] = await Promise.all([
      kv.get<number>("pageviews:total"),
      ...dayKeys.map((key) => kv.get<number>(`pageviews:${key}`)),
    ]);

    return {
      total: total ?? 0,
      days: dayKeys.map((date, i) => ({ date, count: dayCounts[i] ?? 0 })),
      kvConfigured: true,
    };
  } catch {
    // KV hasn't been provisioned/connected yet — show zeros instead of crashing.
    return {
      total: 0,
      days: dayKeys.map((date) => ({ date, count: 0 })),
      kvConfigured: false,
    };
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const authed = Boolean(session) && session === getAdminSessionToken();
  const { error } = await searchParams;

  if (!authed) {
    return (
      <main className="bg-paper pt-20 sm:pt-24 min-h-[80vh] px-6 sm:px-10 md:px-16">
        <div className="max-w-sm mx-auto mt-16">
          <h1 className="font-display text-2xl">Admin</h1>
          <form action={loginAdmin} className="flex flex-col gap-4 mt-6">
            <div>
              <label htmlFor="admin-password" className="font-utility text-xs text-olive-mute">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                name="password"
                required
                autoFocus
                className="w-full border border-olive-mute bg-paper px-4 py-3 font-body text-base focus:outline-none mt-2"
              />
            </div>
            {error ? (
              <p className="font-body text-sm text-chili">Wrong password — try again.</p>
            ) : null}
            <button
              type="submit"
              className="font-utility text-xs sm:text-sm bg-chili text-paper border border-chili hover:bg-olive-deep hover:border-olive-deep transition-colors duration-200 ease-brand px-6 py-3.5"
            >
              Log in
            </button>
          </form>
        </div>
      </main>
    );
  }

  const stats = await getPageviewStats();
  const todayCount = stats.days[0]?.count ?? 0;

  return (
    <main className="bg-paper pt-20 sm:pt-24 min-h-screen px-6 sm:px-10 md:px-16 pb-20">
      <div className="flex items-center justify-between max-w-2xl">
        <h1 className="font-display text-2xl">Site analytics</h1>
        <form action={logoutAdmin}>
          <button type="submit" className="font-utility text-xs text-olive-mute hover:text-chili">
            Log out
          </button>
        </form>
      </div>

      {!stats.kvConfigured && (
        <p className="font-body text-sm text-chili mt-6 max-w-2xl">
          Analytics storage isn&apos;t connected yet, so these are all zero. See the setup
          note below.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-2xl">
        <div className="border border-olive-mute px-6 py-5">
          <p className="font-utility text-xs text-olive-mute">Total pageviews</p>
          <p className="font-display text-3xl mt-2">{stats.total.toLocaleString()}</p>
        </div>
        <div className="border border-olive-mute px-6 py-5">
          <p className="font-utility text-xs text-olive-mute">Today</p>
          <p className="font-display text-3xl mt-2">{todayCount.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="font-utility text-xs text-olive-mute">Last 7 days</p>
        <ul className="mt-3 flex flex-col gap-2">
          {stats.days.map((day) => (
            <li
              key={day.date}
              className="flex justify-between font-body text-sm border-b border-olive-mute/30 pb-2"
            >
              <span>{day.date}</span>
              <span className="font-utility">{day.count.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-sm text-olive-mute mt-10 max-w-2xl">
        This counts pageviews across the site. For deeper detail — top pages, referrers,
        devices — check the Vercel Analytics dashboard for this project.
      </p>

      {!stats.kvConfigured && (
        <p className="font-body text-sm text-olive-mute mt-4 max-w-2xl">
          Setup: in Vercel → Storage, create a KV database and connect it to this project
          — the env vars wire up automatically. Redeploy afterward and counts will start
          showing up here.
        </p>
      )}
    </main>
  );
}
