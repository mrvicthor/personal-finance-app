import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { UserData } from "@/lib/definition";
import { encrypt } from "@/app/actions/session";
import { cookies } from "next/headers";

export interface AuthAdapter {
  findUserByEmail(email: string): Promise<UserData | undefined>;
  hashPassword(password: string): Promise<string>;
  createUser(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<{ id: number } | null>;
  createSession(id: number, expiresAt: Date): Promise<{ id: number }>;
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
  deleteSession(id: number): Promise<void>;
  createSessionWithCookie(id: number): Promise<void>;
}

export const authAdapter: AuthAdapter = {
  async findUserByEmail(email) {
    return (
      db.query.users.findFirst({
        where: eq(users.email, email),
      }) ?? undefined
    );
  },

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  },

  async createUser(name, email, hashedPassword) {
    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id });
    return user ?? null;
  },

  async createSession(id, expiresAt) {
    const data = await db
      .insert(sessions)
      .values({ userId: id, expiresAt })
      .returning({ id: sessions.id });
    return data[0];
  },

  async comparePasswords(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Password comparison failed:", error);
      return false;
    }
  },

  async deleteSession(id) {
    await db.delete(sessions).where(eq(sessions.id, id));
  },

  async createSessionWithCookie(id: number) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const dataId = await this.createSession(id, expiresAt);

    const session = await encrypt({ id: dataId.id, userId: id, expiresAt });

    (await cookies()).set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  },
};
