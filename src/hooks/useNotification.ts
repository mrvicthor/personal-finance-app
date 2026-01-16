"use client";

import { subscribeUser } from "@/app/actions/push-notification";
import { convertSubscription } from "@/helpers/convertSubscription";
import { useEffect, useState } from "react";

function urlBase64ToUnit8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotificationManager() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js");
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Push notification denied");
      return;
    }
    const sub = await registration.pushManager.getSubscription();
    if (!sub) {
      const newSub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUnit8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      setSubscription(newSub);
      await subscribeUser(convertSubscription(newSub));
    } else {
      setSubscription(sub);
    }
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
    }
  }, []);

  return { subscription };
}
