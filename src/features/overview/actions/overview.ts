import { db } from "@/db";
import { balance } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const getBalance = async (id: number) => {
  const data = await db.query.balance.findMany({
    where: eq(balance.userId, id),
    columns: {
      current: true,
      income: true,
      expenses: true,
    },
  });
  if (!data) notFound();
  return data[0];
};
