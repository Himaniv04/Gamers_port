import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Load env manually since prisma.config.ts runs outside Next.js
import { config } from "dotenv";
config();

// Use DATABASE_URL (pooler port 6543) for both runtime and migrations
// since the direct port 5432 may be blocked by network/firewall.
const connectionString = process.env.DATABASE_URL;

export default defineConfig({
  earlyAccess: true,
  schema: "./prisma/schema.prisma",
  datasource: {
    url: connectionString!,
  },
  migrate: {
    async adapter() {
      const pool = new pg.Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
      });
      return new PrismaPg(pool);
    },
  },
});
