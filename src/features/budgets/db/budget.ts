"use server";
import { decrypt } from "@/app/actions/session";
import {
  AddBudgetActionResponse,
  AddBudgetFormData,
  addBudgetFormSchema,
} from "@/app/lib/definition";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function addBudget(
  state: AddBudgetActionResponse | null,
  formData: FormData
) {
  const rawData: AddBudgetFormData = {
    category: formData.get("category") as string,
    maximum: Number(formData.get("maximum")) as unknown as number,
    theme: formData.get("theme") as string,
  };
  console.log({ rawData });
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
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  await db
    .insert(budgets)
    .values({
      userId: Number(session?.userId),
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
