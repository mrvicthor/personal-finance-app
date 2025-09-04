import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "../../lib/definition";
import { redirect } from "next/navigation";
import { AuthAdapter, authAdapter } from "@/lib/adapters/auth.adapter";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to decrypt session", error);
  }
}

export async function updateSession(
  dependencies: {
    cookies: () => ReturnType<typeof cookies>;
    decrypt: typeof decrypt;
    authAdapter: Partial<AuthAdapter>;
  } = { cookies, decrypt, authAdapter }
) {
  const {
    cookies: cookiesFn,
    decrypt: decryptFn,
    authAdapter: adapter,
  } = dependencies;
  const session = (await cookiesFn()).get("session")?.value;
  const payload = await decryptFn(session);
  const now = Date.now();
  if (!session || !payload) {
    return null;
  }

  // check for session in db and update it
  const sessionInDatabase = adapter.findUserSessionById
    ? await adapter.findUserSessionById(Number(payload.id))
    : null;

  if (sessionInDatabase && sessionInDatabase?.expiresAt.getTime() <= now) {
    return {
      message: "Session expired",
    };
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const refreshSession =
    Number(sessionInDatabase?.expiresAt.getTime()) - now <= 24 * 60 * 60 * 1000;
  if (refreshSession && sessionInDatabase && adapter.updateSession) {
    await adapter.updateSession(sessionInDatabase.id, expiresAt);
  }

  (await cookiesFn()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function deleteSession(dependencies?: {
  cookies?: typeof cookies;
  decrypt?: typeof decrypt;
  authAdapter?: Partial<AuthAdapter>;
}) {
  const {
    cookies: cookiesFn = cookies,
    decrypt: decryptFn = decrypt,
    authAdapter: adapter = authAdapter,
  } = dependencies ?? {};

  const cookie = (await cookiesFn()).get("session")?.value;
  const session = await decryptFn(cookie);
  if (session) {
    if (adapter.deleteSession) {
      adapter.deleteSession(Number(session.id));
    }
  }
  (await cookiesFn()).delete("session");
  redirect("/login");
}

export const getSessionId = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session?.userId;
};
