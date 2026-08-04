import { createHash } from "crypto";

export const ADMIN_COOKIE_NAME = "mm_admin_session";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

/** Session cookie value — a hash rather than the raw password, so a leaked cookie doesn't leak the password itself. */
export function getAdminSessionToken(): string {
  return createHash("sha256").update(`macho-meats-admin:${getAdminPassword()}`).digest("hex");
}

export function checkAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  return expected.length > 0 && password === expected;
}
