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

let isConfigured = false;
function getWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) {
    console.warn("Missing VAPID keys. Push notification will be skipped.");
    return null;
  }
  if (!isConfigured) {
    webpush.setVapidDetails(
      "mailto:victoreleanya07@gmail.com",
      publicKey,
      privateKey
    );
    isConfigured = true;
  }
  return webpush;
}

export async function GET() {
  const webpush = getWebPush();
  if (!webpush) {
    return NextResponse.json(
      {
        error: "VAPID keys not set",
      },
      { status: 500 }
    );
  }
  const upcomingBills = await db
    .select()
    .from(transactions)
    .where(eq(transactions.recurring, true));

  const today = new Date();
  for (const bill of upcomingBills) {
    const originalDate = new Date(bill.date);
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

    await Promise.all(
      subs.map((sub) =>
        webpush
          .sendNotification(
            {
              endpoint: sub.endpoint,
              keys: sub.keys as { p256dh: string; auth: string },
            },
            JSON.stringify({
              notification: { title: "Bill reminder", body: message },
            })
          )
          .catch(async (error) => {
            if (error.statusCode === 410 || error.statusCode === 404) {
              console.log("Cleaning up expired subscription:", sub.id);
              await db
                .delete(pushSubscription)
                .where(eq(pushSubscription.id, sub.id));
            } else {
              console.error("Push error:", error);
            }
          })
      )
    );
  }

  return NextResponse.json({ status: "notifications sent" });
}
