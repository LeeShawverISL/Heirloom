
import { defineConfig } from "drizzle-kit";

// Allow running without DATABASE_URL for development
const databaseUrl = process.env.DATABASE_URL || "postgres://placeholder";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
