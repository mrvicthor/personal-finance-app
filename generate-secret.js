import crypto from "crypto";

// Generate a 32-byte random string
const secret = crypto.randomBytes(32).toString("hex");

console.log("Your VERCEL_CRON_SECRET:");
console.log(secret);
