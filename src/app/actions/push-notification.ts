"use server";

import { db } from "@/db";
import { pushSubscription } from "@/db/schema";
import { getSessionId } from "./session";
import { eq } from "drizzle-orm";
import { convertSubscription } from "@/helpers/convertSubscription";

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  const formatted = convertSubscription(subscription);
  const userId = await getSessionId();
  if (!userId) return;

  await db.insert(pushSubscription).values({
    userId: Number(userId),
    keys: formatted.keys,
    endpoint: formatted.endpoint,
  });

  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  const userId = await getSessionId();
  await db
    .delete(pushSubscription)
    .where(eq(pushSubscription.id, Number(userId)));
  return { success: true };
}
