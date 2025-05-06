import { db } from "@/db";
import { pushSubscription, transactions } from "@/db/schema";
import webpush from "web-push";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {
  isBefore,
  setDate,
  addMonths,
  differenceInCalendarDays,
} from "date-fns";

export const runtime = "nodejs";

webpush.setVapidDetails(
  "mailto:victoreleanya07@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function GET() {
  const upcomingBills = await db
    .select()
    .from(transactions)
    .where(eq(transactions.recurring, true));

  for (const bill of upcomingBills) {
    const originalDate = new Date(bill.date);
    const today = new Date();

    const dueDay = originalDate.getDate();

    let nextDueDate = setDate(today, dueDay);

    if (isBefore(nextDueDate, today)) {
      nextDueDate = addMonths(nextDueDate, 1);
    }
    const daysLeft = differenceInCalendarDays(nextDueDate, today);
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
