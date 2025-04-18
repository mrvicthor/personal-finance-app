import { cookies } from "next/headers";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { decrypt } from "@/app/actions/session";

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
}

export const getUser = cache(async () => {
  const sesion = await verifySession();
  if (!sesion.userId) return null;

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, Number(sesion.userId)),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });
    const user = data[0];
    return user;
  } catch (error) {
    console.log("Failed to get user", error);
    return null;
  }
});
