const APP_ORIGIN = "https://personal-finance-app-orpin.vercel.app/";
self.addEventListener("push", function (event) {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.notification.body || "New notification",
    icon: data.notification.icon || "/icons/bill.png",
    badge: "/icons/bill.png",
  };

  event.waitUntil(
    self.registration.showNotification(
      data.notification?.title || "Reminder",
      options
    )
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received");
  event.notification.close();
  event.waitUntil(clients.openWindow(APP_ORIGIN));
});
