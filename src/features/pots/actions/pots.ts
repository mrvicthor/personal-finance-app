"use server";
import { getSessionId } from "@/app/actions/session";
import {
  AddMoneyActionResponse,
  AddMoneyFormData,
  addMoneyFormSchema,
  AddPotActionResponse,
  AddPotFormData,
  addPotFormSchema,
  DeletePotActionResponse,
  DeletePotFormData,
  deletePotFormSchema,
  editPotFormSchema,
  EditPotsActionResponse,
  EditPotsFormData,
} from "@/lib/definition";
import { db } from "@/db";
import { balance, pots } from "@/db/schema";
import { capitaliseFirstLetters } from "@/helpers/capitaliseFirstLetters";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addPot(
  state: AddPotActionResponse | null,
  formData: FormData
) {
  const rawData: AddPotFormData = {
    potName: formData.get("potName") as string,
    target: Number(formData.get("target")) as unknown as number,
    total: Number(formData.get("total")) as unknown as number,
    theme: formData.get("theme") as string,
  };

  const validateFields = addPotFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const { potName, target, total, theme } = validateFields.data;
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  await db
    .insert(pots)
    .values({
      userId: Number(sessionId),
      name: capitaliseFirstLetters(potName),
      target,
      total,
      theme,
    })
    .returning({
      id: pots.id,
      name: pots.name,
      target: pots.target,
      total: pots.total,
      theme: pots.theme,
    });
  revalidatePath("/pots");
  return {
    success: true,
    message: "Pot added successfully",
  };
}

export async function getPots() {
  const sessionId = await getSessionId();
  return db.query.pots.findMany({
    where: eq(pots.userId, Number(sessionId)),
    columns: {
      id: true,
      name: true,
      target: true,
      total: true,
      theme: true,
    },
  });
}

export async function editPot(
  state: EditPotsActionResponse | null,
  formData: FormData
) {
  const rawData: EditPotsFormData = {
    id: Number(formData.get("id")) as number,
    potName: formData.get("potName") as string,
    target: Number(formData.get("target")) as unknown as number,
    total: Number(formData.get("total")) as unknown as number,
    theme: formData.get("theme") as string,
  };

  const validateFields = editPotFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id, potName, target, total, theme } = validateFields.data;
  await db
    .update(pots)
    .set({ name: capitaliseFirstLetters(potName), target, total, theme })
    .where(eq(pots.id, id));

  revalidatePath("/pots");
  return {
    success: true,
    message: "Pot edit successful",
  };
}

export async function deletePot(
  state: DeletePotActionResponse | null,
  formData: FormData
) {
  const rawData: DeletePotFormData = {
    id: Number(formData.get("id")) as number,
  };

  const validateFields = deletePotFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Pot not found",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validateFields.data;
  await db.delete(pots).where(eq(pots.id, id));
  revalidatePath("/pots");
  return {
    success: true,
    message: "Pot deleted successfully",
  };
}

export async function addMoney(
  state: AddMoneyActionResponse,
  formData: FormData
) {
  const rawData: AddMoneyFormData = {
    id: Number(formData.get("id")),
    total: Number(formData.get("total")),
    target: Number(formData.get("target")),
  };

  const validateFields = addMoneyFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id, target, total: newAmount } = validateFields.data;
  const sessionId = await getSessionId();
  const [existingPot] = await db.select().from(pots).where(eq(pots.id, id));
  const [currentBalance] = await db
    .select()
    .from(balance)
    .where(eq(balance.userId, Number(sessionId)));

  await db
    .update(pots)
    .set({
      target,
      total: Number(existingPot.total) + newAmount,
    })
    .where(eq(pots.id, id));
  await db
    .update(balance)
    .set({
      current: Number(currentBalance.current) - newAmount,
    })
    .where(eq(balance.id, Number(sessionId)));

  revalidatePath("/pots");
  return {
    success: true,
    message: "Money added successfully",
  };
}

export async function withdrawMoney(
  state: AddMoneyActionResponse | null,
  formData: FormData
) {
  const rawData: AddMoneyFormData = {
    id: Number(formData.get("id")),
    total: Number(formData.get("total")),
    target: Number(formData.get("target")),
  };

  const validateFields = addMoneyFormSchema.safeParse(rawData);
  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fill in all the required fields",
      inputs: rawData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const { id, target, total: newAmount } = validateFields.data;
  const sessionId = await getSessionId();
  const [existingPot] = await db.select().from(pots).where(eq(pots.id, id));
  const [currentBalance] = await db
    .select()
    .from(balance)
    .where(eq(balance.userId, Number(sessionId)));

  await db
    .update(pots)
    .set({
      target,
      total: Number(existingPot.total) - newAmount,
    })
    .where(eq(pots.id, id));
  await db
    .update(balance)
    .set({
      current: Number(currentBalance.current) + newAmount,
    })
    .where(eq(balance.id, Number(sessionId)));

  revalidatePath("/pots");
  return {
    success: true,
    message: "Money withdrawn successfully",
  };
}
