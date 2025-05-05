import { db } from "@/db";
import { pushSubscription, transactions } from "@/db/schema";
import webpush from "web-push";
import { NextResponse } from "next/server";
import { eq, and, lte, gte } from "drizzle-orm";
import { addDays, startOfDay, endOfDay } from "date-fns";

export const runtime = "edge";

webpush.setVapidDetails(
  "mailto:victoreleanya07@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET() {
  const today = new Date();
  const startRange = startOfDay(today);
  const endRange = endOfDay(addDays(today, 3));

  const upcomingBills = await db
    .select()
    .from(transactions)
    .where(
      and(
        eq(transactions.recurring, true),
        gte(transactions.date, startRange),
        lte(transactions.date, endRange)
      )
    );

  for (const bill of upcomingBills) {
    const daysLeft = Math.ceil(
      (new Date(bill.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const messageMap: Record<number, string> = {
      3: "Your recurring bill is due in 3 days.",
      2: "Reminder: Your bill is due in 2 days.",
      1: "Heads up! Bill is due tomorrow.",
      0: "Your recurring bill is due today!",
    };

    const message = messageMap[daysLeft];
    if (!message) continue;

    const subs = await db
      .select()
      .from(pushSubscription)
      .where(eq(pushSubscription.userId, bill.userId));
    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys as { p256dh: string; auth: string },
          },
          JSON.stringify({ title: "Bill reminder", body: message })
        );
      } catch (error) {
        console.log("Failed to push notification:", error);
      }
    }
  }

  return NextResponse.json({ status: "notifications sent" });
}
