"use server";

import { db } from "@/db";
import { pushSubscription } from "@/db/schema";
import { getSessionId } from "./session";
import { eq } from "drizzle-orm";
import webpush from "web-push";
import { SubscriptionPayload } from "@/types/subscription-payload";

webpush.setVapidDetails(
  "mailto:victoreleanya07@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeUser(sub: SubscriptionPayload) {
  const userId = await getSessionId();
  if (!userId) return;
  await db.insert(pushSubscription).values({
    userId: Number(userId),
    keys: sub.keys,
    endpoint: sub.endpoint,
  });

  return { success: true };
}

export async function unsubscribeUser() {
  const userId = await getSessionId();
  await db
    .delete(pushSubscription)
    .where(eq(pushSubscription.id, Number(userId)));
  return { success: true };
}
