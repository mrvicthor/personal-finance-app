import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { sessions } from "@/db/schema";
import { db } from "@/db";
import { cookies } from "next/headers";
import { SessionPayload } from "../lib/definition";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const data = await db
    .insert(sessions)
    .values({ userId: id, expiresAt })
    .returning({ user_id: sessions.userId });

  const sessionId = data[0]?.user_id;

  const session = await encrypt({ userId: sessionId, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  const now = Date.now();
  if (!session || !payload) {
    return null;
  }

  // check for session in db and update it
  const sessionInDatabase = await db.query.sessions.findFirst({
    where: eq(sessions.id, Number(payload.userId)),
  });

  if (sessionInDatabase && sessionInDatabase?.expiresAt.getTime() > now) {
    return {
      message: "Session expired",
    };
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const refreshSession =
    Number(sessionInDatabase?.expiresAt.getTime()) - now <= 24 * 60 * 60 * 1000;
  if (refreshSession && sessionInDatabase) {
    await db
      .update(sessions)
      .set({ expiresAt })
      .where(eq(sessions.id, sessionInDatabase.id));
  }

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (session) {
    await db.delete(sessions).where(eq(sessions.id, Number(session.userId)));
  }
  (await cookies()).delete("session");
  redirect("/login");
}
