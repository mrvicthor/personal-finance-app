"use server";
import { decrypt } from "@/app/actions/session";
import {
  AddBudgetActionResponse,
  AddBudgetFormData,
  addBudgetFormSchema,
  EditBudgetActionResponse,
  EditBudgetFormData,
  editBudgetFormSchema,
} from "@/app/lib/definition";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const getSessionId = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session?.userId;
};

export async function getBudget() {
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  const data = await db.query.budgets.findMany({
    where: eq(budgets.userId, Number(sessionId)),
    columns: {
      id: true,
      category: true,
      maximum: true,
      theme: true,
    },
  });
  return data;
}

export default async function addBudget(
  state: AddBudgetActionResponse | null,
  formData: FormData
) {
  const rawData: AddBudgetFormData = {
    category: formData.get("category") as string,
    maximum: Number(formData.get("maximum")) as unknown as number,
    theme: formData.get("theme") as string,
  };
  const validateFields = addBudgetFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { category, maximum, theme } = validateFields.data;
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  await db
    .insert(budgets)
    .values({
      userId: Number(sessionId),
      category,
      maximum,
      theme,
    })
    .returning({
      id: budgets.id,
      category: budgets.category,
      maximum: budgets.maximum,
      theme: budgets.theme,
    });
  revalidatePath("/budgets");
  return {
    success: true,
    message: "Budget added successfully",
  };
}

export async function editBudget(
  state: EditBudgetActionResponse | null,
  formData: FormData
) {
  const rawData: EditBudgetFormData = {
    id: Number(formData.get("id")) as number,
    category: formData.get("category") as string,
    maximum: Number(formData.get("maximum")) as unknown as number,
    theme: formData.get("theme") as string,
  };

  const validateFields = editBudgetFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const { id, category, maximum, theme } = validateFields.data;
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  await db
    .update(budgets)
    .set({
      category,
      maximum,
      theme,
    })
    .where(eq(budgets.id, id));

  revalidatePath("/budgets");
  return {
    success: true,
    message: "Budget edited successfully",
  };
}
