import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Global is used here to maintain a cached Prisma Client instance across
 * hot reloads in development and serverless invocations in production.
 */
const globalForPrisma = global;

function createPrismaClient() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: process.env.NODE_ENV === "production" ? 2 : 10,
  });
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
