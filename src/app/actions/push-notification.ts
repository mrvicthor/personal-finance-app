"use server";

import { db } from "@/db";
import { pushSubscription } from "@/db/schema";
import webpush from "web-push";
import { getSessionId } from "./session";
import { eq } from "drizzle-orm";

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

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function convertSubscription(subscription: PushSubscription) {
  const p256dhKey = subscription.getKey("p256dh");
  const authKey = subscription.getKey("auth");

  if (!p256dhKey || !authKey) {
    throw new Error("Missing keys in push subscription");
  }
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: arrayBufferToBase64(p256dhKey),
      auth: arrayBufferToBase64(authKey),
    },
  };
}

// export async function sendNotification(message: string) {
//   if (!subscription) {
//     throw new Error("No subscription available");
//   }

//   try {
//     await webpush.sendNotification(
//       convertSubscription(subscription),
//       JSON.stringify({
//         title: "Test Notification",
//         body: message,
//         icon: "/icon.png",
//       })
//     );
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     return { success: false, error: "Failed to send notification" };
//   }
// }
