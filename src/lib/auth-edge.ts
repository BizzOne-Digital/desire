// Edge-safe session verification (Web Crypto only). Used by middleware.ts,
// which runs on the Edge runtime where node:crypto is unavailable.
export const adminCookieName = "only_admin_session";

type SessionPayload = {
  email: string;
  role: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production.");
  }
  return secret || "development-only-change-this-secret";
}

function toBase64Url(bytes: ArrayBuffer) {
  let binary = "";
  new Uint8Array(bytes).forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

export async function verifySessionTokenEdge(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature || (await sign(body)) !== signature) return null;

  try {
    const payload = JSON.parse(fromBase64Url(body)) as SessionPayload;
    return payload.exp < Math.floor(Date.now() / 1000) ? null : payload;
  } catch {
    return null;
  }
}
