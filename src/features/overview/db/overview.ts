import { decrypt } from "@/app/actions/session";
import { db } from "@/db";
import { balance } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const getBalance = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const data = await db.query.balance.findMany({
    where: eq(balance.userId, Number(session?.userId)),
    columns: {
      current: true,
      income: true,
      expenses: true,
    },
  });
  return data[0];
};
