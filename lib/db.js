import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Global is used here to maintain a cached Prisma Client instance across
 * hot reloads in development and serverless invocations in production.
 */
const globalForPrisma = global;

function createPgPool(connectionString) {
  if (!connectionString) {
    throw new Error("Please define the DATABASE_URL environment variable");
  }

  // Parse the URL properly so special characters in passwords (e.g. @, #, !)
  // are decoded correctly. pg.Pool does NOT auto-decode percent-encoded passwords.
  try {
    const url = new URL(connectionString);
    return new pg.Pool({
      host: url.hostname,
      port: parseInt(url.port, 10) || 5432,
      database: url.pathname.replace(/^\//, ""),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      ssl: { rejectUnauthorized: false },
      // Keep pool small for serverless — each request reuses a slot
      max: process.env.NODE_ENV === "production" ? 2 : 10,
    });
  } catch {
    // Fallback: pass raw connection string and hope the driver handles it
    return new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
}

function createPrismaClient() {
  const pool = createPgPool(process.env.DATABASE_URL);
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

/**
 * Compatibility shim — keeps connectToDatabase() call signature intact.
 */
export async function connectToDatabase() {
  return prisma;
}
