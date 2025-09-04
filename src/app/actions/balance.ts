"use server";
import {
  AddBalanceActionResponse,
  AddBalanceFormData,
  addBalanceFormSchema,
} from "../../lib/definition";

import { revalidatePath } from "next/cache";
import { getSessionId } from "./session";
import { balanceAdapter } from "@/adapters/balance.adapter";

export async function addBalance(
  state: AddBalanceActionResponse | null,
  formData: FormData
) {
  const rawData: AddBalanceFormData = {
    currentBalance: formData.get("current") as string,
    income: formData.get("income") as string,
    expenses: formData.get("expenses") as string,
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

  const { currentBalance, income, expenses } = validateFields.data;
  // get user from session
  const sessionId = await getSessionId();

  const existingBalance = await balanceAdapter.findBalanceBySessionId(
    Number(sessionId)
  );
  if (existingBalance) {
    await balanceAdapter.updateBalance(existingBalance.id, {
      current: currentBalance,
      income,
      expenses,
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Balance updated successfully",
    };
  }
  await balanceAdapter.createBalance({
    userId: Number(sessionId),
    current: currentBalance,
    income,
    expenses,
  });
  revalidatePath("/");
  return {
    success: true,
    message: "Balance added successfully",
  };
}
