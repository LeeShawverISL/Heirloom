
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Use in-memory storage when DATABASE_URL is not set
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  console.log("DATABASE_URL not set. Using in-memory storage fallback.");
  return null;
};

const databaseUrl = getDatabaseUrl();

// Export pool and db only if a database URL is available
export let pool = null;
export let db = null;

if (databaseUrl) {
  pool = new Pool({ connectionString: databaseUrl });
  db = drizzle({ client: pool, schema });
}
