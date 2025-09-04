import {
  BalanceData,
  BalanceResponse,
  ExistingBalanceResponse,
} from "@/types/balance";
import { db } from "@/db";
import { balance } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface BalanceAdapter {
  createBalance(data: BalanceData): Promise<void>;
  fetchBalance(id: number): Promise<Omit<BalanceResponse, "id"> | never>;
  findBalanceBySessionId(
    id: number
  ): Promise<ExistingBalanceResponse | undefined>;
  updateBalance(id: number, data: Partial<BalanceData>): Promise<void>;
}

export const balanceAdapter: BalanceAdapter = {
  async createBalance(data: BalanceData) {
    await db
      .insert(balance)
      .values({
        userId: data.userId,
        current: data.current,
        income: data.income,
        expenses: data.expenses,
      })
      .returning({
        id: balance.id,
        current: balance.current,
        income: balance.income,
        expenses: balance.expenses,
      });
  },

  async fetchBalance(id: number) {
    const data = await db.query.balance.findMany({
      where: eq(balance.userId, id),
      columns: {
        current: true,
        income: true,
        expenses: true,
      },
    });
    if (!data || data.length === 0) notFound();
    const result = data[0];
    return {
      current: result.current ?? 0,
      income: result.income ?? 0,
      expenses: result.expenses ?? 0,
    };
  },

  async findBalanceBySessionId(id: number) {
    const result = await db.query.balance.findFirst({
      where: eq(balance.userId, id),
    });

    if (!result) return undefined;

    return {
      id: result.id,
      userId: result.userId,
      current: result.current ?? 0,
      income: result.income ?? 0,
      expenses: result.expenses ?? 0,
    };
  },
  async updateBalance(id: number, data: Partial<BalanceData>) {
    await db
      .update(balance)
      .set({
        current: data.current,
        income: data.income,
        expenses: data.expenses,
      })
      .where(eq(balance.id, id));
  },
};
