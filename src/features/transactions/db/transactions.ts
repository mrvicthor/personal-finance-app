"use server";
import { decrypt } from "@/app/actions/session";
import {
  AddTransactionActionResponse,
  AddTransactionFormData,
  addTransactionFormSchema,
} from "@/app/lib/definition";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const getSessionId = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session?.userId;
};

export async function addTransaction(
  state: AddTransactionActionResponse | null,
  formData: FormData
) {
  const rawData: AddTransactionFormData = {
    sender: formData.get("sender") as string,
    category: formData.get("category") as string,
    transactionDate: formData.get("transactionDate") as unknown as Date,
    amount: Number(formData.get("amount")) as unknown as number,
    recurring:
      formData.get("recurring") === "true"
        ? true
        : (false as unknown as boolean),
  };
  const validateFields = addTransactionFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { sender, category, transactionDate, amount, recurring } =
    validateFields.data;
  const sessionId = await getSessionId();
  if (!sessionId) return null;

  await db.insert(transactions).values({
    userId: Number(sessionId),
    name: sender,
    category,
    date: new Date(transactionDate),
    amount,
    recurring,
  });
  return {
    success: true,
    message: "Transaction added successfully",
  };
}

export async function getTransactions() {
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  return await db.query.transactions.findMany({
    where: eq(transactions.userId, Number(sessionId)),
    columns: {
      id: true,
      name: true,
      category: true,
      date: true,
      amount: true,
      recurring: true,
    },
  });
}
