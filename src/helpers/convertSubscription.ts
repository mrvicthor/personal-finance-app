import { SubscriptionPayload } from "@/types/subscription-payload";

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function convertSubscription(
  subscription: PushSubscription
): SubscriptionPayload {
  const p256dhKey = subscription.getKey("p256dh");
  const authKey = subscription.getKey("auth");

  if (!p256dhKey || !authKey) {
    throw new Error("Missing keys in push subscription");
  }
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: p256dhKey ? arrayBufferToBase64(p256dhKey) : "",
      auth: authKey ? arrayBufferToBase64(authKey) : "",
    },
  };
}
