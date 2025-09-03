import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession } from "../app/actions/session";
import { UserData } from "@/lib/definition";

export interface AuthAdapter {
  findUserByEmail(email: string): Promise<UserData | undefined>;
  hashPassword(password: string): Promise<string>;
  createUser(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<{ id: number } | null>;
  createSession(userId: number): Promise<void>;
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
      .values({ name, email, password: hashedPassword })
      .returning({ id: users.id });
    return user ?? null;
  },

  async createSession(userId) {
    return createSession(userId);
  },
};
