"use server";
import { db } from "@/db";
import {
  AddBalanceActionResponse,
  AddBalanceFormData,
  addBalanceFormSchema,
} from "../../lib/definition";
import { balance, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSessionId } from "./session";

export async function addBalance(
  state: AddBalanceActionResponse | null,
  formData: FormData
) {
  const rawData: AddBalanceFormData = {
    current: Number(formData.get("current")) as unknown as number,
    income: Number(formData.get("income")) as unknown as number,
    expenses: Number(formData.get("expenses")) as unknown as number,
  };

  const validateFields = addBalanceFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { current, income, expenses } = validateFields.data;
  // get user from session
  const sessionId = await getSessionId();
  await db.query.users.findFirst({
    where: eq(users.id, Number(sessionId)),
  });
  const existingBalance = await db.query.balance.findFirst({
    where: eq(balance.userId, Number(sessionId)),
  });
  if (existingBalance) {
    await db
      .update(balance)
      .set({
        current,
        income,
        expenses,
      })
      .where(eq(balance.id, existingBalance.id));
    revalidatePath("/");
    return {
      success: true,
      message: "Balance updated successfully",
    };
  }
  await db
    .insert(balance)
    .values({
      userId: Number(sessionId),
      current,
      income,
      expenses,
    })
    .returning({
      id: balance.id,
      current: balance.current,
      income: balance.income,
      expenses: balance.expenses,
    });
  revalidatePath("/");
  return {
    success: true,
    message: "Balance added successfully",
  };
}
