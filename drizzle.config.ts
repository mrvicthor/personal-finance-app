import "dotenv/config";
import type { Config } from "drizzle-kit";
console.log(process.env.DATABASE_URL!, "victor");

export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
